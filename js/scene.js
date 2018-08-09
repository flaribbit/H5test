var time,frameCount,framePerSec;
var imgPeople1;
var player;
var farmland;

window.onload=function() {
	//初始化主要变量
	canv=document.getElementById("gc");
	ctx=canv.getContext("2d");
	//禁止图片平滑
	ctx.imageSmoothingEnabled=false;
	ctx.font="12px 微软雅黑";
	//初始化frameCount参数
	frameCount=0;
	framePerSec=0;
	time=new Date().getTime();
	
	//载入玩家贴图
	imgPeople1=new Image();
	imgPeople1.src="img/People1.png";
	
	player=new Player();
	
	farmland=new Farmland();
	farmland.init();
	
	//设置目的地
	canv.onclick=function(evt){
		player.setTarget(evt.offsetX-16,evt.offsetY-28);
		//console.log(player);
	}
	//document.addEventListener("keydown",keyDown);
	setInterval(main,17);//60fps
}
//在这里初始化
function main(){
	//清屏
	ctx.clearRect(0,0,gc.width,gc.height);
	ctx.strokeRect(0,0,gc.width,gc.height);
	
	farmland.drawtest();
	
	player.move();
	player.draw();
	
	displayFPS();
}

function displayFPS(){
	frameCount++;
	if(frameCount%60==0){
		var t=new Date().getTime();
		framePerSec=(60/(t-time)*1000).toFixed(3);
		time=t;
	}
	ctx.fillText(framePerSec+"fps",0,12);
}