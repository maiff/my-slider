function Bar(target,content,warp){
	this.new_bar=function(){
		var slider_contain=document.createElement('div');
		var bar=document.createElement('div');
		bar.className='bar';
		//slider_contain.innerHTML="<div class='bar'></div>";
		slider_contain.className='slider-contain';
		slider_contain.appendChild(bar);
		return bar;
	};
	this.target=this.bar_tool.$(target);
	this.content=this.bar_tool.$(content);
	this.oWarp=this.bar_tool.$(warp);
	this.bar=this.new_bar();
	this.oParent=this.bar.parentNode;
	var that=this;
	this.bar.onmousedown=function(ev){
		var e=ev||event;
		var disY=e.clientY-that.bar.offsetTop;
		document.onmousemove=function(ev){
			var e=ev||event;
			var l=e.clientY-disY;
			that.setTop(l);
		}
		document.onmouseup=function(){
			document.onmouseup=null;
			document.onmousemove=null;
		}
		return false;
	};
	this.init();
}

Bar.prototype={
	init:function(){
		var mousewheel =this.bar_tool.isFirefox()? "DOMMouseScroll" : "mousewheel";
		this.render();
		var mouseWheel=this.mouseWheel();
		this.setBarHeight(this.content.offsetHeight-this.oWarp.offsetHeight);
		this.bar_tool.addEvent(this.oWarp,mousewheel,mouseWheel);
		this.bar_tool.addEvent(this.oParent,mousewheel,mouseWheel);
	},
	render:function(){
		this.target.appendChild(this.oParent);
	},	
	setBarHeight:function(h){
		var barHeight;
		if(h<0) {
			barHeight=0;
			this.bar.style.height=barHeight;
			this.setTop=function(){};
		}
		else{
			barHeight=this.oParent.offsetHeight-h;
  			this.bar.style.height = barHeight < 30 ? '30px' : barHeight + 'px';
  		}
	},
	setTop:function(l){
		//console.log(this);
		if(l<0)l=0;

		else if(l>this.oParent.offsetHeight-this.bar.offsetHeight){
			l=this.oParent.offsetHeight-this.bar.offsetHeight;
		}
		this.bar.style.top=l+'px';
		var n=l/(this.oParent.offsetHeight-this.bar.offsetHeight);
		this.content.style.top =- (this.content.offsetHeight - this.oWarp.offsetHeight)*n + 'px';
	},
	mouseWheel:function(){
		var that=this;
  	 	return function(ev){
  	 		var oEv = ev || event;
 	 		var bDown = oEv.wheelDelta ? oEv.wheelDelta < 0 : oEv.detail > 0;
 	 		
 	 		alert(that)
  	 		if(bDown){
   				that.setTop(that.bar.offsetTop + 10);
  			}else{
    // setLeft(oBox.offsetLeft - 10);
    			that.setTop(that.bar.offsetTop - 10);
 			 }
  			if(oEv.preventDefault){
    			oEv.preventDefault();
  			}
  			return false;
  		}
	},
	setBarAttr:function(){
		var obj_sty=arguments[0];
		for(var i in obj_sty){
			this.bar.style[i]=obj_sty[i];
		}
	},
	setSliderAttr:function(){
		var obj_sty=arguments[0];
		for(var i in obj_sty){
			this.oParent.style[i]=obj_sty[i];
		}
	},
	bar_tool:{
		isFirefox:function (){
			return navigator.userAgent.toLowerCase().match(/firefox\/([\d.]+)/)?true:false;
	},
		addEvent:function(obj,sEv,fn){
			if(obj.addEventListener){
			obj.addEventListener(sEv,fn,false);
			}
			else obj.attachEvent('on'+sEv,fn);
		},
		$:function(id){
			return document.querySelector(id);
		}
	}
}