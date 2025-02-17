const fs = require('fs-extra');
const debug = require('debug')('server-connect:setup:routes');
const config = require('./config');
const { map } = require('../core/async');
const { posix, extname } = require('path');
const { cache, serverConnect, templateView } = require('../core/middleware');
const database = require('./database');
const webhooks = require('./webhooks');

module.exports = async function (app) {
    app.use((req, res, next) => {
        req.fragment = (req.headers['accept'] || '*/*').includes('fragment');
        next();
    });

    if (fs.existsSync('extensions/server_connect/routes')) {
        const entries = fs.readdirSync('extensions/server_connect/routes', { withFileTypes: true });

        for (let entry of entries) {
            if (entry.isFile() && extname(entry.name) == '.js') {
                let hook = require(`../../extensions/server_connect/routes/${entry.name}`);
                if (hook.before) hook.before(app);
                if (hook.handler) hook.handler(app);
                debug(`Custom router ${entry.name} loaded`);
            }
        }
    }

    database(app);
    webhooks(app);

    if (config.createApiRoutes) {
        fs.ensureDirSync('app/api');
        createApiRoutes('app/api');
    }

    if (fs.existsSync('app/config/routes.json')) {
        const { routes, layouts } = fs.readJSONSync('app/config/routes.json');

        parseRoutes(routes, null);

        function parseRoutes(routes, parent) {
            for (let route of routes) {
                if (!route.path) continue;

                createRoute(route, parent);

                if (Array.isArray(route.routes)) {
                    parseRoutes(route.routes, route);
                }
            }
        }

        function createRoute({ auth, path, method, redirect, url, page, layout, exec, data, ttl, status, proxy }, parent) {
            method = method || 'all';
            data = data || {};
            if (page) page = page.replace(/^\//, '');
            if (layout) layout = layout.replace(/^\//, '');
            if (parent && parent.path) path = parent.path + path;

            if (auth) {
                app.use(path, (req, res, next) => {
                    if (typeof auth == 'string' && req.session && req.session[auth + 'Id']) {
                        next();
                    } else if (typeof auth == 'object' && auth.user) {
                        const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
                        const [user, password] = Buffer.from(b64auth, 'base64').toString().split(':');
                        if (user && password && user === auth.user && password === auth.password) {
                            next();
                        } else {
                            res.set('WWW-Authenticate', 'Basic realm="401"');
                            res.status(401).json({ error: 'Unauthorized' });
                        }
                    } else {
                        res.status(401).json({ error: 'Unauthorized' });
                    }
                });
            }

            if (proxy) {
                const httpProxy = require('http-proxy');
                const proxyServer = httpProxy.createProxyServer(proxy);
                app.use(path, (req, res) => {
                    proxyServer.web(req, res);
                });
            } else if (redirect) {
                app.get(path, (req, res) => res.redirect(status == 302 ? 302 : 301, redirect));
            } else if (url) {
                app[method](path, (req, res, next) => {
                    next(parent && !req.fragment ? 'route' : null);
                }, (req, res) => {
                    res.sendFile(url, { root: 'public' })
                });

                if (parent) {
                    createRoute({
                        path,
                        method: parent.method,
                        redirect: parent.redirect,
                        url: parent.url,
                        page: parent.page,
                        layout: parent.layout,
                        exec: parent.exec,
                        data: parent.data
                    });
                }
            } else if (page) {
                if (path == '/404') {
                    app.set('has404', true);
                }

                if (path == '/500') {
                    app.set('has500', true);
                }

                if (exec) {
                    if (fs.existsSync(`app/${exec}.json`)) {
                        let json = fs.readJSONSync(`app/${exec}.json`);

                        if (json.exec && json.exec.steps) {
                            json = json.exec.steps;
                        } else if (json.steps) {
                            json = json.steps;
                        }
                        
                        if (!Array.isArray(json)) {
                            json = [json];
                        }


                        if (layout && layouts && layouts[layout]) {
                            if (layouts[layout].data) {
                                data = Object.assign({}, layouts[layout].data, data);
                            }

                            if (layouts[layout].exec) {
                                if (fs.existsSync(`app/${layouts[layout].exec}.json`)) {
                                    let _json = fs.readJSONSync(`app/${layouts[layout].exec}.json`);

                                    if (_json.exec && _json.exec.steps) {
                                        _json = _json.exec.steps;
                                    } else if (_json.steps) {
                                        _json = _json.steps;
                                    }
                                    
                                    if (!Array.isArray(_json)) {
                                        _json = [_json];
                                    }

                                    json = _json.concat(json);
                                } else {
                                    debug(`Route ${path} skipped, "app/${exec}.json" not found`);
                                    return;
                                }
                            }
                        }

                        app[method](path, (req, res, next) => {
                            next(parent && !req.fragment ? 'route' : null);
                        }, cache({ttl}), templateView(layout, page, data, json));
                    } else {
                        debug(`Route ${path} skipped, "app/${exec}.json" not found`);
                        return;
                    }
                } else {
                    let json = [];

                    if (layout && layouts && layouts[layout]) {
                        if (layouts[layout].data) {
                            data = Object.assign({}, layouts[layout].data, data);
                        }

                        if (layouts[layout].exec) {
                            if (fs.existsSync(`app/${layouts[layout].exec}.json`)) {
                                let _json = fs.readJSONSync(`app/${layouts[layout].exec}.json`);

                                if (_json.exec && _json.exec.steps) {
                                    _json = _json.exec.steps;
                                } else if (_json.steps) {
                                    _json = _json.steps;
                                }
                                
                                if (!Array.isArray(_json)) {
                                    _json = [_json];
                                }

                                json = _json.concat(json);
                            } else {
                                debug(`Route ${path} skipped, "app/${exec}.json" not found`);
                                return;
                            }
                        }
                    }

                    app[method](path, (req, res, next) => {
                        next(parent && !req.fragment ? 'route' : null);
                    }, cache({ttl}), templateView(layout, page, data, json));
                }

                if (parent) {
                    createRoute({
                        path,
                        method: parent.method,
                        redirect: parent.redirect,
                        url: parent.url,
                        page: parent.page,
                        layout: parent.layout,
                        exec: parent.exec,
                        data: parent.data
                    });
                }
            } else if (exec) {
                if (fs.existsSync(`app/${exec}.json`)) {
                    let json = fs.readJSONSync(`app/${exec}.json`);

                    app[method](path, cache({ttl}), serverConnect(json));

                    return;
                }
            }
        }
    }

    if (fs.existsSync('extensions/server_connect/routes')) {
        const entries = fs.readdirSync('extensions/server_connect/routes', { withFileTypes: true });

        for (let entry of entries) {
            if (entry.isFile() && extname(entry.name) == '.js') {
                let hook = require(`../../extensions/server_connect/routes/${entry.name}`);
                if (hook.after) hook.after(app);
                debug(`Custom router ${entry.name} loaded`);
            }
        }
    }

    function createApiRoutes(dir) {
        const entries = fs.readdirSync(dir, { withFileTypes: true });
    
        return map(entries, async (entry) => {
            if (entry.name.startsWith('_')) return;

            let path = posix.join(dir, entry.name);
    
            if (entry.isFile() && extname(path) == '.json') {
                let json = fs.readJSONSync(path);
                let routePath = (json.settings && json.settings.options && json.settings.options.path) ? json.settings.options.path : path.replace(/^app/i, '').replace(/.json$/, '(.json)?');
                let routeMethod = (json.settings && json.settings.options && json.settings.options.method) ? json.settings.options.method : 'all';
                let ttl = (json.settings && json.settings.options && json.settings.options.ttl) ? json.settings.options.ttl : 0;
                
                app[routeMethod](routePath.replace(/\/\(.*?\)\//gi, '/'), cache({ttl}), serverConnect(json));

                debug(`Api route ${routePath} created`);
            }
    
            if (entry.isDirectory()) {
                return createApiRoutes(path);
            }
        });
    }
};
