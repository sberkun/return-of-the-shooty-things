var CENTERSCREEN = {statswidth:200,x:myCanvas.width/2,y:3*myCanvas.height/4,zoom:false,};//feel free to change
  CENTERSCREEN.x+=CENTERSCREEN.statswidth*0.5;

var objects = [];
var bullets = [];
var peoples = [];

var RO = function(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.cx = this.x+this.w/2; //centerX
    this.cy = this.y+this.h/2; //centerY
    this.bubbleR = Math.sqrt(this.w*this.w+this.h*this.h)/2;
    this.drawing = function(){
        DRAW.lineWidth = 3;
        rect(this.x-ply.x+CENTERSCREEN.x,this.y - ply.y+CENTERSCREEN.y,
            this.w,this.h);
        DRAW.lineWidth = 1;
    };
};
var bullet = function(x,y,s,r,t,d,owner){
    this.owner = owner;
    this.x = x;
    this.y = y;
    this.s = s;//speed
    this.r = r;//rotation
    this.t = t;//time
    this.d = d;//diameter
    this.vx = 0-this.s*Math.sin(this.r);
    this.vy = 0-this.s*Math.cos(this.r);
    this.updateCanDieYet = function(){
        if(this.t--<0){return true;}
        this.x+=this.vx;
        this.y+=this.vy;
        return false;
    };
    this.drawing = function(){
        circle(this.x-ply.x+CENTERSCREEN.x,this.y-ply.y+CENTERSCREEN.y,this.d);
    };
};

var createOBsArena = function(){
  for(var a = 0;a<5;a+=2){for(var b=0;b<5;b+=2){
      var ss = 70-10*Math.abs(2-a)-5*Math.abs(2-b);
      objects.push(new RO(a*200-400-ss,b*200-400-ss,ss*2,ss*2));
  }}
  objects.splice(4,1);
  var wt = 20;
  var ws = 1000;
  objects.push(new RO(-ws-wt,-ws-wt,wt,2*ws+wt));
  objects.push(new RO(-ws-wt,ws,2*ws+wt,wt));
  objects.push(new RO(ws,-ws,wt,2*ws+wt));
  objects.push(new RO(-ws,-ws-wt,2*ws+wt,wt));
};
createOBsArena();

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

var ply = {
    vx:0,vy:0,friction:0.9,getFriction:0.9,
    x:0,y:0,rt:0,speed:0.4,
    d:64, //diameter
    drawingIMG:new Image(),
    hull:{
      st: 50000,
      t:  50000,
      regen: 200,
      turnnn: Math.PI/180,
    },
    turret1:{
        numshots:5,
        accuracy:0.6,
        shaftlength:64,
        reloadtime:0,
        bulletspeed:6
    },
    turret2:{
        //add stuff later, defence weapon............................................................ 
    },
};
ply.drawingIMG.src = "ppl2.png";
ply.drawing = function(){
  circle(CENTERSCREEN.x,CENTERSCREEN.y,ply.d*0.5);
  DRAW.drawImage(ply.drawingIMG,0,0,128,128,CENTERSCREEN.x-64,CENTERSCREEN.y-64,128,128);
};
ply.turret1.fire = function(fff){
    if(fireready){if(fff){
      for(var a=ply.turret1.numshots;a>0;a--){
        bullets.push(new bullet(
            ply.x-ply.turret1.shaftlength*(Math.sin(ply.rt)),
            ply.y-ply.turret1.shaftlength*(Math.cos(ply.rt)),
            ply.turret1.bulletspeed,
            (((ply.rt+(Math.random()-0.5)*ply.turret1.accuracy)
              %(2*Math.PI))+(2*Math.PI))%(2*Math.PI),
            100,10,"ply"
        ));
        ply.hull.t--;
      }
      fireready = false;
  }}
  else if(firetime++>ply.turret1.reloadtime){fireready = true;firetime=0;}
};
ply.turret2.fire = function(fff){
}
ply.die = function(){
  document.body.innerHTML = "ur bad kid";
};
ply.updateCanDieYet = function(){
  if(this.hull.t<0) return true;
  if(this.hull.t<this.hull.st) this.hull.t+=this.hull.regen;
  
  var friccc = 1; //later, environmental friction
  
  if(mouse_control){
    if(www){ply.vx-=ply.speed*Math.sin(ply.rt)*friccc;ply.vy-=ply.speed*Math.cos(ply.rt)*friccc;}
    if(sss){ply.vx+=ply.speed*Math.sin(ply.rt)*friccc;ply.vy+=ply.speed*Math.cos(ply.rt)*friccc;}
    if(aaa){ply.vy+=ply.speed*Math.sin(ply.rt)*friccc;ply.vx-=ply.speed*Math.cos(ply.rt)*friccc;}
    if(ddd){ply.vy-=ply.speed*Math.sin(ply.rt)*friccc;ply.vx+=ply.speed*Math.cos(ply.rt)*friccc;}
    if(true){ply.turret1.fire(cuc);}
    if(true){ply.turret2.fire(cdc);}
    if(clc){ply.rt+=ply.hull.turnnn;}
    if(crc){ply.rt-=ply.hull.turnnn;}
  }else{
    if(cuc){ply.vx-=ply.speed*Math.sin(ply.rt)*friccc;ply.vy-=ply.speed*Math.cos(ply.rt)*friccc;}
    if(cdc){ply.vx+=ply.speed*Math.sin(ply.rt)*friccc;ply.vy+=ply.speed*Math.cos(ply.rt)*friccc;}
    if(clc){ply.vy+=ply.speed*Math.sin(ply.rt)*friccc;ply.vx-=ply.speed*Math.cos(ply.rt)*friccc;}
    if(crc){ply.vy-=ply.speed*Math.sin(ply.rt)*friccc;ply.vx+=ply.speed*Math.cos(ply.rt)*friccc;}
    if(true){ply.turret1.fire(www);}
    if(true){ply.turret2.fire(sss);}
    if(aaa){ply.rt+=ply.hull.turnnn;}
    if(ddd){ply.rt-=ply.hull.turnnn;}
  }
  
  ply.x+=ply.vx;
  ply.y+=ply.vy;
  

  ply.vx = ply.vx*ply.getFriction;
  ply.vy = ply.vy*ply.getFriction;
  if(Math.abs(ply.vx)<0.005) ply.vx = 0;
  if(Math.abs(ply.vy)<0.005) ply.vy = 0;
};


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var drawActionSubFunction = function(rrr){
  rect(-10,-10,myCanvas.width+20,myCanvas.width+20);
  
  if(CENTERSCREEN.zoom){
      DRAW.scale(0.5,0.5);
      DRAW.translate((myCanvas.width+200)*0.5,myCanvas.height*0.5);
  }
  
  DRAW.save();
    DRAW.translate(CENTERSCREEN.x,CENTERSCREEN.y);
    DRAW.rotate(rrr);
    DRAW.translate(-CENTERSCREEN.x,-CENTERSCREEN.y);
    
    var sp = 100;
    for(var ax = -myCanvas.width-ply.x%sp,bx = myCanvas.width*2;ax<=bx;ax+=sp){
      for(var ay = -myCanvas.width-ply.y%sp,by = myCanvas.height*2;ay<=by;ay+=sp){
        rect(ax-1,ay-1,2,2);
    }}
    
    for(var a in objects){objects[a].drawing();}
    for(var b in bullets){bullets[b].drawing();}
    for(var c in peoples){peoples[c].drawing();}
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
    ply.drawing();
    drawStatsSubFunction();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var mouse_control = true;
var turret_control = false;
var mouseX = 0;
var mouseY = 0;
var www = false;
var aaa = false;
var sss = false;
var ddd = false;
var zzz = false;
var xxx = false;
var cmc = false;
var cpc = false;
var clc = false;
var cuc = false;
var cdc = false;
var crc = false;
var csc = false;
var brl = false;
var brr = false;

var fireon = false;
var fireready = true;
var firetime = 0;


document.addEventListener('keydown',function(event){
    if(event.keyCode === 87){www = true;}//'w'
    if(event.keyCode === 65){aaa = true;}//'a'
    if(event.keyCode === 83){sss = true;}//'s'
    if(event.keyCode === 68){ddd = true;}//'d'
    if(event.keyCode === 90){zzz = true;}//'z'
    if(event.keyCode === 88){xxx = true;}//'x'
    if(event.keyCode ===188){cmc = true;}//','
    if(event.keyCode ===190){cpc = true;}//'.'
    if(event.keyCode === 37){clc = true;}// <
    if(event.keyCode === 38){cuc = true;}// ^
    if(event.keyCode === 40){cdc = true;}// v
    if(event.keyCode === 39){crc = true;}// >
    if(event.keyCode === 16){csc = true;}// shift
    if(event.keyCode === 66){CENTERSCREEN.zoom = true;}
         
    if(event.keyCode === 32){fireon = !fireon;}
    if(event.keyCode ===219){brl = true;}
    if(event.keyCode ===221){brr = true;}
});
document.addEventListener('keyup',function(evant){
    if(evant.keyCode === 87){www = false;}
    if(evant.keyCode === 65){aaa = false;}
    if(evant.keyCode === 83){sss = false;}
    if(evant.keyCode === 68){ddd = false;}
    if(evant.keyCode === 90){zzz = false;}
    if(evant.keyCode === 88){xxx = false;}
    if(evant.keyCode ===188){cmc = false;}
    if(evant.keyCode ===190){cpc = false;}
    if(evant.keyCode === 37){clc = false;}
    if(evant.keyCode === 38){cuc = false;}
    if(evant.keyCode === 40){cdc = false;}
    if(evant.keyCode === 39){crc = false;}
    if(evant.keyCode === 16){csc = false;}
    if(evant.keyCode === 66){CENTERSCREEN.zoom = false;}
    if(evant.keyCode ===219){brl = false;}
    if(evant.keyCode ===221){brr = false;}
});
document.addEventListener('click',function(mouseE){
  if(mouseE.clientX<CENTERSCREEN.statswidth) mouse_control = !mouse_control;
  if(mouseE.clientY<myCanvas.height/2)  turret_control = !turret_control;
});
document.addEventListener('mousemove',function(mouseE){
  mouseX = mouseE.clientX;
  mouseY = mouseE.clientY;
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var UPDATEALL = function() {

    ply.updateCanDieYet();
    
    for(var b in bullets){
        if(bullets[b].updateCanDieYet()){
            bullets.splice(b,1);
        }
    }

    drawScene();
};


window.setTimeout(function(){window.setInterval(UPDATEALL,15);}, 500);

