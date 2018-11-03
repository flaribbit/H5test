var time,frameCount,framePerSec;//计数器
var imgmole01,imgmole02,imgscene;
var player;//玩家
var players=[];//其他玩家
var farmland;
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
	//imgPeople1=new Image();
	//imgPeople1.src="img/People1.png";
	imgmole01=new Image();
	imgmole01.src="img/mole01.png";
	imgmole02=new Image();
	imgmole02.src="img/mole02.png";
	imgscene=new Image();
	imgscene.src="img/scene/map01.png";
	
	//创建玩家
	player=new Player();
	player.id=new Date().getTime();
	
	//创建网络连接
	//ws=new WebSocket('ws://127.0.0.1:3000');
	ws=new WebSocket('wss://flyz-mole-server.herokuapp.com');
	ws.onopen=function(e){
		ws.send('{"action":"setID","data":'+player.id+'}');
		ws.send('{"action":"player.getInfo"}');
	}
	ws.onmessage=function(e){
		var msg;
		console.log(e);
		try{
			msg=JSON.parse(e.data);
			if(msg.action=='player.new'){
				//创建新的玩家
				var p=new Player();
				p.id=msg.id;
				p.target.x=p.x=msg.data[0];
				p.target.y=p.y=msg.data[1];
				players.push(p);
			}else if(msg.action=='player.getInfo'){
				//发送自己的信息 message.data是请求者id
				ws.send('{"action":"player.myInfo","id":'+msg.data+',"data":['+player.x+','+player.y+']}');
			}else if(msg.action=='player.setTarget'){
				//其他玩家移动
				for(i=0;i<players.length;i++){
					if(players[i].id==msg.id){
						players[i].setTarget(msg.data[0],msg.data[1]);
						break;
					}
				}
			}else if(msg.action=='player.leave'){
				//其他玩家离开
				for(i=0;players.length;i++){
					if(players[i].id==msg.id){
						players.splice(i,1);
						break;
					}
				}
			}else if(msg.action=='player.say'){
				//显示消息
				for(i=0;players.length;i++){
					if(players[i].id==msg.id){
						players[i].say(msg.data);
						break;
					}
				}
			}
		}catch(error){
			console.log(error);
		}
	}
	
	//设置目的地
	canv.onclick=function(evt){
		//新版本使用绘制偏移
		player.setTarget(evt.offsetX,evt.offsetY);
		ws.send('{"action":"player.setTarget","id":'+player.id+',"data":['+evt.offsetX+','+evt.offsetY+']}');
		//ws.send(JSON.stringify(player));
	}
	//document.addEventListener("keydown",keyDown);
	setInterval(main,17);//60fps
}
//在这里初始化
function main(){
	//清除画布
	//ctx.clearRect(0,0,gc.width,gc.height);
	//ctx.strokeRect(0,0,gc.width,gc.height);
	//绘制背景
	ctx.drawImage(imgscene,0,0);
	
	//farmland.drawtest();
	
	player.move();
	player.draw();
	for(i=0;i<players.length;i++){
		players[i].move();
		players[i].draw();
	}
	
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
