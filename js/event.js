//事件类

const EVENT_TYPE_AUTO=0,//自动执行
      EVENT_TYPE_TOUCH=1,//接触时执行
	  EVENT_TYPE_COINDENT=2;//重合时执行

function Event(){
	this.id=0;
	this.name="别碰我 会死";
	this.x=0;
	this.y=0;
	this.w=32;
	this.h=32;
	this.type=EVENT_TYPE_TOUCH;
	this.time=0;
	this.data=null;
}
