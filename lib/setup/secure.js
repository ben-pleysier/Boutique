const debug = require('debug')('server-connect:secure');
const config = require('./config');

module.exports = function (app) {
  const { randomBytes } = require('crypto');
  const generateToken = (req, overwrite) => {
    const sessionToken = req.session.csrfToken;

    if (!overwrite && typeof sessionToken === 'string') {
      return sessionToken;
    }

    const token = randomBytes(32).toString('hex');
    req.session.csrfToken = token;

    return token;
  }
  const getTokenFromRequest = (req) => req.headers['x-csrf-token'] || req.body.CSRFToken;
  const isValidToken = (req) => {
    const token = getTokenFromRequest(req);
    const sessionToken = req.session.csrfToken;
    return typeof token === 'string' && typeof sessionToken === 'string' && token === sessionToken;
  }
  
  app.get('/__csrf', (req, res) => {
    res.json({ csrfToken: generateToken(req, true) });
  });

  app.use((req, res, next) => {
    req.csrfToken = (overwrite) => generateToken(req, overwrite);

    const { enabled, exclude } = config.csrf;

    if (!enabled) {
      return next();
    }

    if (exclude.split(',').includes(req.method)) {
      return next();
    }

    if (!isValidToken(req)) {
      return res.status(403).send('Invalid CSRF token');
    }

    next();
  });

  debug('CSRF Protection initialized');

  if (config.passport) {
    const passport = require('passport');
    const ServerConnectStrategy = require('../auth/passport');

    passport.use(new ServerConnectStrategy({ provider: 'security' }));

    app.use(passport.initialize());
    app.use(passport.session());
    app.use(passport.authenticate('server-connect'));

    debug('Passport initialized', passport.strategies);
    
    app.use((req, res, next) => {
      debug('auth', req.isAuthenticated());
      debug('Session', req.session);
      if (req.user) {
        debug('User', req.user);
      }
      next();
    });

    app.use('/api/secure', restrict());
  }
};

// restrict middleware
function restrict (options = {}) {
  return async function (req, res, next) {
    if (req.isAuthenticated()) {
      return next();
    }

    if (req.is('json')) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (options.redirect) {
      return res.redirect(options.redirect);
    }

    res.status(401).send('Unauthorized');
  };
}