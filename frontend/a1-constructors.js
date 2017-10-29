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
