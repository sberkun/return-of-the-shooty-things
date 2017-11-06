var spriteSheet = new Image();
    spriteSheet.src = "ppl2.png";

var drawActionSubFunction = function(rrr){
  DRAW.save();
    DRAW.clearRect(0,0,myCanvas.width,myCanvas.height);
  
    DRAW.translate(CENTERSCREEN.x,CENTERSCREEN.y);
    DRAW.rotate(rrr);
    DRAW.translate(-CENTERSCREEN.x,-CENTERSCREEN.y);
    
    var sp = 100;
    for(var ax = -myCanvas.width-ply.x%sp,bx = myCanvas.width*2;ax<=bx;ax+=sp){
      for(var ay = -myCanvas.width-ply.y%sp,by = myCanvas.height*2;ay<=by;ay+=sp){
        rect(ax-1,ay-1,2,2);
    }}
    
    for(var a in objects){drawRO(objects[a]);}
    for(var b in bullets){drawBullet(bullets[b]);}
    for(var c in peoples){drawPlayer(peoples[c]);}
  DRAW.restore();
  
};
var drawStatsSubFunction = function(){
  
  DRAW.save();
  
    DRAW.lineWidth = 1;
    rect(-10,-10,CENTERSCREEN.statswidth+10,myCanvas.height+20);
  
    rect(10,50,CENTERSCREEN.statswidth-20,20);
    DRAW.fillStyle = "rgb(100,100,255)";
    rect(10,50,
      Math.max((CENTERSCREEN.statswidth-20)*(ply.hull.t/ply.hull.st),0)
      ,20);
    DRAW.fillText("controls:",20,100);
    if(!mouse_control){
      DRAW.fillText("w is shoot",20,120);
      DRAW.fillText("ad is turn",20,140);
      DRAW.fillText("arrow keys are move",20,160);
      DRAW.fillText("click HERE to switch the controls",20,180);
    }else{
      DRAW.fillText("up arrow is shoot",20,120);
      DRAW.fillText("left/right arrows are turn",20,140);
      DRAW.fillText("wasd keys are move",20,160);
      DRAW.fillText("click HERE to switch the controls",20,180);      
    }
  
  
  DRAW.restore();
  
};

var drawScene = function(){
    drawActionSubFunction(ply.rt);
    drawPlayer(ply);
    drawStatsSubFunction();
};
