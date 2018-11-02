//土地类

	//创建农田
	//farmland=new Farmland();
	//farmland.init();

const FarmlandH=4;
const FarmlandW=5;

function Farmland(){
	this.tile=new Array();//土地块
	
	this.img=new Image();
	this.img.src="img/土地.png";
	this.carrot=new Image();
	this.carrot.src="img/4_胡萝卜3.png";
	this.putao=new Image();
	this.putao.src="img/15.葡萄+3.png";
	
	this.i=0;
	this.j=0;
}

function FarmlandTile(){
	this.type=0;//作物类型，0表示没有
	this.period=0;
	this.time=0;//作物种植时间
	
	this.pest=false;//害虫
	this.drought=false;//干旱
}

Farmland.prototype.init=function(){
	for(var i=0;i<FarmlandH;i++){
		this.tile[i]=new Array();
		for(var j=0;j<FarmlandW;j++){
			this.tile[i][j]=new FarmlandTile();
		}
	}
	canv.onmousemove=function(evt){
		farmland.i=Math.floor((160-evt.offsetX+2*evt.offsetY)/180);
		farmland.j=Math.floor((evt.offsetX+2*evt.offsetY-660)/180);
	}
}

Farmland.prototype.dotick=function(){
	for(var i=0;i<FarmlandH;i++){
		for(var j=0;j<FarmlandW;j++){
			//计算生长周期
		}
	}
}
//调试专用
Farmland.prototype.drawtest=function(){
	ctx.fillText("mouse at:"+this.i+","+this.j,0,24);
	for(var i=0;i<FarmlandH;i++){
		for(var j=0;j<FarmlandW;j++){
			ctx.drawImage(this.img,90*j-90*i+320,45*i+45*j+128);
			if(i+j<4){
				ctx.drawImage(this.carrot,90*j-90*i+346,45*i+45*j+113);
			}else{
				ctx.drawImage(this.putao,90*j-90*i+346,45*i+45*j+100);
			}
		}
	}
}

Farmland.prototype.draw=function(){
	for(var i=0;i<FarmlandH;i++){
		for(var j=0;j<FarmlandW;j++){
			//绘制
		}
	}
}

Farmland.prototype.grow=function(){
	//种植物功能
	
}
