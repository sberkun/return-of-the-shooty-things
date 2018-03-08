var spriteSheet = new Image();
    spriteSheet.src = "ppl2.png";
var setPatternTiles = function(){
    let maxwh = setPatternTiles.maxwh;
    let sp = setPatternTiles.sp; 
    let tiles = setPatternTiles.img;
    for(var ax = maxwh-ply.x%sp,bx = maxwh*2;ax<=bx;ax+=sp){
      for(var ay = maxwh-ply.y%sp,by = maxwh*2;ay<=by;ay+=sp){
        DRAW.drawImage(tiles,0,0,64,64,ax,ay,sp,sp);
    }}
};
    setPatternTiles.sp = 128;
    setPatternTiles.maxwh = Math.max(myCanvas.width,myCanvas.height);
    setPatternTiles.img = new Image(setPatternTiles.sp,setPatternTiles.sp);
    setPatternTiles.img.src = "New Piskel.png"; 


var drawActionSubFunction = function(rrr){
  DRAW.save();
    DRAW.clearRect(0,0,myCanvas.width,myCanvas.height);
  
    DRAW.translate(CENTERSCREEN.x,CENTERSCREEN.y);
    DRAW.rotate(rrr);
    DRAW.translate(-CENTERSCREEN.x,-CENTERSCREEN.y);
    
    setPatternTiles();
    /*
    let sp = 128; 
    for(var ax = -myCanvas.width-ply.x%sp,bx = myCanvas.width*2;ax<=bx;ax+=sp){
      for(var ay = -myCanvas.height-ply.y%sp,by = myCanvas.height*2;ay<=by;ay+=sp){
        DRAW.drawImage(tiles,0,0,64,64,ax,ay,sp,sp);
    }}*/
   
    
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
    if(!ply.controls.mouse_control){
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
    drawStatsSubFunction();
    window.requestAnimationFrame(drawScene);
};
