var time,frameCount,framePerSec;
var imgPeople1;
var player;
var farmland;
var players=[];
var ws;

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
	imgmole01=new Image();
	imgmole01.src="img/mole01.png";
	//创建玩家
	player=new Player();
	//创建农田
	farmland=new Farmland();
	farmland.init();
	
	//创建网络连接
	ws=new WebSocket('ws://localhost:8080/','echo-protocol');
	if(!ws){
		alert("服务器连接失败！");
	}
	
	//设置目的地
	canv.onclick=function(evt){
		//ws.send({move:{x:evt.offsetX-16,y:evt.offsetY-28}});
		//新版本使用绘制偏移
		//player.setTarget(evt.offsetX-16,evt.offsetY-28);
		player.setTarget(evt.offsetX,evt.offsetY);
		ws.send(JSON.stringify(player));
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