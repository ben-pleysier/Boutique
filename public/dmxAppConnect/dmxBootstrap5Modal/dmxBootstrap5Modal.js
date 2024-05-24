/*!
 App Connect Bootstrap 5 Modal
 Version: 2.0.0-beta.2
 (c) 2024 Wappler.io
 @build 2024-01-15 11:52:24
 */
dmx.Component("bs5-modal",{attributes:{nobackdrop:{type:Boolean,default:!1},nocloseonclick:{type:Boolean,default:!1},nokeyboard:{type:Boolean,default:!1},nofocus:{type:Boolean,default:!1},show:{type:Boolean,default:!1}},methods:{toggle(){this._instance.toggle()},show(){this._instance.show()},hide(){this._instance.hide()},update(){this._instance.handleUpdate()}},events:{show:Event,shown:Event,hide:Event,hidden:Event},init(s){s.addEventListener("show.bs.modal",this.dispatchEvent.bind(this,"show")),s.addEventListener("shown.bs.modal",this.dispatchEvent.bind(this,"shown")),s.addEventListener("hide.bs.modal",this.dispatchEvent.bind(this,"hide")),s.addEventListener("hidden.bs.modal",this.dispatchEvent.bind(this,"hidden")),this._instance=new bootstrap.Modal(s,{backdrop:!this.props.nobackdrop&&this.props.nocloseonclick?"static":!this.props.nobackdrop,keyboard:!this.props.nokeyboard,focus:!this.props.nofocus}),this.props.show&&requestAnimationFrame((()=>{this._instance.show()}))},performUpdate(s){(s.has("nobackdrop")||s.has("nocloseonclick")||s.has("nokeyboard")||s.has("nofocus"))&&(this._instance.dispose(),this._instance=new bootstrap.Modal(this.$node,{backdrop:!this.props.nobackdrop&&this.props.nocloseonclick?"static":!this.props.nobackdrop,keyboard:!this.props.nokeyboard,focus:!this.props.nofocus})),s.has("show")&&this._instance[this.props.show?"show":"hide"]()}});
//# sourceMappingURL=dmxBootstrap5Modal.js.map
