/*!
 App Connect Bootstrap 5 Offcanvas
 Version: 2.0.0-beta.1
 (c) 2023 Wappler.io
 @build 2023-09-12 15:55:38
 */
dmx.Component("bs5-offcanvas",{initialData:{open:!1},attributes:{show:{type:Boolean,default:!1},nobackdrop:{type:Boolean,default:!1},nokeyboard:{type:Boolean,default:!1},scroll:{type:Boolean,default:!1}},methods:{toggle(){requestAnimationFrame((()=>this._instance.toggle()))},show(){requestAnimationFrame((()=>this._instance.show()))},hide(){requestAnimationFrame((()=>this._instance.hide()))}},events:{show:Event,shown:Event,hide:Event,hidden:Event},init(s){s.addEventListener("show.bs.offcanvas",this.dispatchEvent.bind(this,"show")),s.addEventListener("shown.bs.offcanvas",this.dispatchEvent.bind(this,"shown")),s.addEventListener("hide.bs.offcanvas",this.dispatchEvent.bind(this,"hide")),s.addEventListener("hidden.bs.offcanvas",this.dispatchEvent.bind(this,"hidden")),s.addEventListener("shown.bs.offcanvas",this._shownHandler.bind(this)),s.addEventListener("hidden.bs.offcanvas",this._hiddenHandler.bind(this)),s.classList.toggle("show",this.props.show),this._instance=new bootstrap.Offcanvas(s,{backdrop:!this.props.nobackdrop,keyboard:!this.props.nokeyboard,scroll:this.props.scroll})},performUpdate(s){s.has("show")&&(this.$node.classList.toggle("show",this.props.show),this.set("open",this.props.show))},_shownHandler(){this.set("open",!0)},_hiddenHandler(){this.set("open",!1)}});
//# sourceMappingURL=dmxBootstrap5Offcanvas.js.map
