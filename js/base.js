function dist(x1,y1,x2,y2){
	return Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
}
function dirq(deltax,deltay){
	if(deltax>deltay){
		if(deltax>-deltay){
			return 6;
		}else{
			return 8;
		}
	}else{
		if(deltax>-deltay){
			return 2;
		}else{
			return 4;
		}
	}
}
