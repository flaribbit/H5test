//玩家类

const MAX_WIDTH=10;

function Player(){
	this.id=0;
	this.name="我是npc";
	this.img=imgPeople1;//贴图
	this.x=0;
	this.y=0;
	this.vx=0;
	this.vy=0;
	this.speed=2;//移动速度
	this.moving=false;//正在移动
	this.dir=2;//朝向
	this.target={
		x:0,
		y:0
	};
	
	this.aniStand=false;//踏步动画
	this.aniMove=true;//行走动画
	
	this.showName=false;//显示名字
	
	this.bubble={
		msg:[],
		time:0
	}
}

Player.prototype.distanceTo=function(obj){
	var dx=obj.x-this.x;
	var dy=obj.y-this.y;
	return Math.sqrt(dx*dx+dy*dy);
}

Player.prototype.setTarget=function(x,y){
	var dx=x-this.x;
	var dy=y-this.y;
	var dd=Math.sqrt(dx*dx+dy*dy);
	if(dd==0)return;//神经病啊一个地方点两次
	this.target.x=x;
	this.target.y=y;
	this.vx=dx/dd*this.speed;
	this.vy=dy/dd*this.speed;
	if(dx>dy){
		this.dir=dx>-dy?6:8;
	}else{
		this.dir=dx>-dy?2:4;
	}
}

Player.prototype.move=function(){
	if(this.distanceTo(this.target)>this.speed){
		this.moving=true;
		this.x+=this.vx;
		this.y+=this.vy;
	}else{
		this.moving=false;
		this.x=this.target.x;
		this.y=this.target.y;
	}
}

Player.prototype.draw=function(){
	if(this.showName){
		var pos=this.x+16-ctx.measureText(this.name).width/2;
		ctx.fillText(this.name,pos<<0,this.y+48);
	}
	if(this.moving&&this.aniMove||this.aniStand){
		var tmp=Math.floor(frameCount/12)%4;
		if(tmp==3)tmp=1;
		ctx.drawImage(this.img,tmp*32,this.dir*16-31,32,32,this.x<<0,this.y<<0,32,32);
	}else{
		ctx.drawImage(this.img,32,this.dir*16-32,32,32,this.x<<0,this.y<<0,32,32);
	}
	if(this.bubble.time>0){
		this._drawMessage(this.bubble.msg);
		this.bubble.time--;
	}
}

Player.prototype._drawMessage=function(msg){
	var x,y,w,h;
	
	x=this.x+16<<0;
	y=this.y<<0;
	w=msg.length>1?120:ctx.measureText(msg).width;
	h=12*msg.length;
	
	ctx.beginPath()
	ctx.moveTo(x,y);
	ctx.lineTo(x+5,y-5);
	ctx.arcTo(x,y-5,x,y-10,5);
	ctx.lineTo(x,y-10-h);
	ctx.arcTo(x,y-15-h,x+5,y-15-h,5);
	ctx.lineTo(x+5+w,y-15-h);
	ctx.arcTo(x+10+w,y-15-h,x+10+w,y-10-h,5);
	ctx.lineTo(x+10+w,y-10);
	ctx.arcTo(x+10+w,y-5,x+5+w,y-5,5);
	ctx.lineTo(x+10,y-5);
	ctx.closePath();
	ctx.stroke();
	for(var i=0;i<msg.length;i++){
		ctx.fillText(msg[i],x+5,y-h+12*i);
	}
}

Player.prototype.say=function(raw){
	var p=0,q,tmp;
	this.bubble.msg.length=0;
	while(1){
		for(q=p+8;ctx.measureText(tmp=raw.substring(p,q+1)).width<120&&q<raw.length;q++){
			//console.log(q);
		}
		if(tmp.length==0)break;
		this.bubble.msg.push(tmp);
		this.bubble.time=180;
		p=q+1;
	}
}
