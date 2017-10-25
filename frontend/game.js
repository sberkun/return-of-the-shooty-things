
(function(){
var CENTERSCREEN = {statswidth:200,x:myCanvas.width/2,y:3*myCanvas.height/4,zoom:false,screen_centering:0,};//feel free to change
  CENTERSCREEN.x+=CENTERSCREEN.statswidth*0.5;
//screencentering 0 is turretcentered, 1 is hull centered

var objects = [];
var bullets = [];
var NPCs = [];
var NPC = function(x,y,s,t,d){
  this.x = x;
  this.y = y;
  this.s = s;//speed
  this.t = t;//time
  this.d = d;//diameter
  this.st = t;
  this.drawing = function(){
    DRAW.save();
    DRAW.fillStyle = "rgb("+
      parseInt(100+155*(this.t/(this.st+0.1)))+","+
      parseInt(100-100*(this.t/(this.st+0.1)))+","+
      parseInt(100-100*(this.t/(this.st+0.1)))+")";
    circle(this.x-ply.x+CENTERSCREEN.x,this.y-ply.y+CENTERSCREEN.y,this.d*0.5);
    DRAW.restore();
  };
  this.collideOB = function(){
    for(var b in objects){
      if(objects[b].collideWithCircle(this)) return true;
    }
    return false;
  };
  this.updateCanDieYet = function(){
    var rr = Math.atan((this.x-ply.x)/(this.y-ply.y));
    var sign = (this.y<ply.y)?1:-1;
    

    this.x+=this.s*Math.sin(rr)*sign;
    this.y+=this.s*Math.cos(rr)*sign;
    if(this.collideOB()){
      this.x-=this.s*Math.sin(rr)*sign;
      this.y-=this.s*Math.cos(rr)*sign;
    }
    
    
    if(Math.random()<0.1) bullets.push(new bullet(
        this.x+this.d*0.5*(Math.sin(rr))*sign,
        this.y+this.d*0.5*(Math.cos(rr))*sign,
        6,
        (ply.y<this.y)?rr:rr+Math.PI,
        100,5,"NPC"
    ));
    
    if(this.t<=0){
      document.getElementById("score").innerHTML = parseInt(document.getElementById("score").innerHTML)
        +2000-parseInt(Math.sqrt(distsqrd(500,500,ply.x,ply.y)));
      return true;
    }else{
      return false;
    }
  };
};
var RO = function(x,y,w,h){
    this.x = x;
    this.y = y;
    this.w = w;
    this.h = h;
    this.cx = this.x+this.w/2;
    this.cy = this.y+this.h/2;
    this.bubbleR = Math.sqrt(this.w*this.w+this.h*this.h)/2;
    this.drawing = function(){
        DRAW.lineWidth = 3;
        rect(this.x-ply.x+CENTERSCREEN.x,this.y - ply.y+CENTERSCREEN.y,
            this.w,this.h);
        DRAW.lineWidth = 1;
    };
    this.collideWithCircle = function(crasher){
      if(distsqrd(this.cx,this.cy,crasher.x,crasher.y)<=
        (this.bubbleR+crasher.d*0.5)*(this.bubbleR+crasher.d*0.5)){
          if(
              crasher.x>this.x&&
              crasher.x<this.x+this.w&&
              crasher.y+crasher.d*0.5>this.y&&
              crasher.y-crasher.d*0.5<this.y+this.h
          ){return true;}
          if( 
              crasher.y>this.y&&
              crasher.y<this.y+this.h&&
              crasher.x+crasher.d/2>this.x&&
              crasher.x-crasher.d/2<this.x+this.w
          ){return true;}
          var rrsqrd = crasher.d*crasher.d*0.25;
          if(distsqrd(crasher.x,crasher.y,this.x,this.y)<rrsqrd){return true;}
          if(distsqrd(crasher.x,crasher.y,this.x,this.y+this.h)<rrsqrd){return true;}
          if(distsqrd(crasher.x,crasher.y,this.x+this.w,this.y)<rrsqrd){return true;}
          if(distsqrd(crasher.x,crasher.y,this.x+this.w,this.y+this.h)<rrsqrd){return true;}
      }
      return false;
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
    this.collideable = true;
    this.collideWithNPC = function(crasher){
        if(distsqrd(this.x,this.y,crasher.x,crasher.y)
          <=((crasher.d+this.d)*0.5)*((crasher.d+this.d)*0.5)){
            crasher.t-= this.d*this.d;
            return true;
        }
        return false;
    };
    this.updateCanDieYet = function(){
        if(this.t--<0){return true;}
        this.x+=this.vx;
        this.y+=this.vy;
        if(this.collideable){
          for(var a in objects){
              if(objects[a].collideWithCircle(this)) return true;
          }
          if(this.owner=="ply") for(var c in NPCs){
            if(this.collideWithNPC(NPCs[c])) return true;
          }
          if(this.owner=="NPC"){
            if(distsqrd(this.x,this.y,ply.x,ply.y)
              <=((ply.d+this.d)*0.5)*((ply.d+this.d)*0.5)){
                ply.hull.t-= this.d*this.d;
                return true;
            }
          }
        }
        this.collideable = true;
        return false;
    };
    this.drawing = function(){
        circle(this.x-ply.x+CENTERSCREEN.x,this.y-ply.y+CENTERSCREEN.y,this.d);
    };
};


var bulletCollisionPruning = function(){
  /*for(var ba in bullets) for(var bb in bullets){
    if(distsqrd(bullets[ba].x,bullets[ba].y,bullets[bb].x,bullets[bb].y)
        <(bullets[ba].d+bullets[bb].d)*(bullets[ba].d+bullets[bb].d)*0.25
        &&bullets[ba].owner!=bullets[bb].owner){
        bullets[ba].t-=bullets[bb].d*bullets[bb].d;bullets[bb].t-=bullets[ba].d*bullets[ba].d;  
    }
  }*/
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
}());//set everything up

                                                                              alert("0");

(function(){
var ply = {
    vx:0,vy:0,friction:0.9,getFriction:Math.random(),
    x:0,y:0,rc:0,rt:0,speed:0.4,
    d:60,

    hull:{
      drawing:function(){
          DRAW.fillStyle = "rgb(200,200,255)";
          circle(CENTERSCREEN.x,CENTERSCREEN.y,ply.d*0.5);
          DRAW.beginPath();
          DRAW.moveTo(CENTERSCREEN.x,CENTERSCREEN.y-30);
          DRAW.lineTo(CENTERSCREEN.x-15,CENTERSCREEN.y+20);
          DRAW.lineTo(CENTERSCREEN.x+15,CENTERSCREEN.y+20);
          DRAW.closePath();
          DRAW.fillStyle = "rgb(255,0,255)";
          DRAW.fill();
          DRAW.stroke();
          DRAW.fillStyle = "rgb(255,255,255)";
      },
      st: 50000,
      t:  50000,
      regen: 200
    },
    turret:{
        numshots:5,
        accuracy:0.6,
        shaftlength:30,
        reloadtime:0,
        bulletspeed:6
    }
};
ply.collideOB = function(){
  for(var b in objects){
    if(objects[b].collideWithCircle(this)) return true;
  }
  return false;
};
ply.updateCanDieYet = function(){
  if(this.hull.t<0){ document.body.innerHTML = "ur bad kid"; return true;}
  if(this.hull.t<this.hull.st) this.hull.t+=this.hull.regen;
  
  var turnnn = Math.PI/180;
  var friccc = 1-0.6*(ply.getFriction-ply.friction)/(1-ply.friction);
  
  if(mouse_control&&!turret_control){
    ////////////////////////////////////////////////////////////////////////////////
  }
  else{
      if(www||cuc){
          ply.vx-=ply.speed*Math.sin(ply.rc)*friccc;
          ply.vy-=ply.speed*Math.cos(ply.rc)*friccc;
      }
      if(sss||cdc){
          ply.vx+=ply.speed*Math.sin(ply.rc)*friccc;
          ply.vy+=ply.speed*Math.cos(ply.rc)*friccc;
      }
      if(aaa||clc) ply.rc+=turnnn;
      if(ddd||crc) ply.rc-=turnnn;
  }
  if(mouse_control&&turret_control){
      if(CENTERSCREEN.screen_centering===0){
          if(mouseX>CENTERSCREEN.x) ply.rt-=turnnn*Math.min(1,(mouseX-CENTERSCREEN.x)/50);
          else                      ply.rt+=turnnn*Math.min(1,(CENTERSCREEN.x-mouseX)/50);
      }
      if(CENTERSCREEN.screen_centering===1){
          var themouseangle = 
            Math.atan((mouseX-CENTERSCREEN.x)/(mouseY-CENTERSCREEN.y-75))
            +(mouseY>=CENTERSCREEN.y+75?Math.PI:0);
          if(true) ply.rt+=turnnn;/////////////////////////////////////////////////////////////////
      }
  }
  else{
      if(zzz||cmc) ply.rt+=turnnn;
      if(xxx||cpc) ply.rt-=turnnn;
  }
  
  if(csc) ply.getFriction = 0.99;
    else  ply.getFriction =ply.friction;
    
  if(fireready){if(fireon){
      for(var a=ply.turret.numshots;a>0;a--){
        bullets.push(new bullet(
            ply.x-ply.turret.shaftlength*(Math.sin(ply.rc+ply.rt)),
            ply.y-ply.turret.shaftlength*(Math.cos(ply.rc+ply.rt)),
            ply.turret.bulletspeed,
            (((ply.rt+ply.rc+(Math.random()-0.5)*ply.turret.accuracy)
              %(2*Math.PI))+(2*Math.PI))%(2*Math.PI),
            100,50,"ply"
        ));
        ply.hull.t--;
      }
      fireready = false;
  }}
  else if(firetime++>ply.turret.reloadtime){fireready = true;firetime=0;}
  
  
  
  ply.x+=ply.vx;
  ply.y+=ply.vy;
  
  if(ply.collideOB()){
    ply.x-=ply.vx;
    ply.y-=ply.vy;
    ply.vx = 0;
    ply.vy = 0;
  }
  else{
    ply.vx = ply.vx*ply.getFriction;
    ply.vy = ply.vy*ply.getFriction;
    if(Math.abs(ply.vx)<0.005) ply.vx = 0;
    if(Math.abs(ply.vy)<0.005) ply.vy = 0;
  }
};



}());//player constructors

                                                                                                  alert("1");


(function(){
var drawActionSubFunction = function(rrr){
  rect(-10,-10,canvas.width+20,canvas.width+20);
  
  if(CENTERSCREEN.zoom){
      DRAW.scale(0.5,0.5);
      DRAW.translate((canvas.width+200)*0.5,canvas.height*0.5);
  }
  
  DRAW.save();
    DRAW.translate(CENTERSCREEN.x,CENTERSCREEN.y);
    DRAW.rotate(rrr);
    DRAW.translate(-CENTERSCREEN.x,-CENTERSCREEN.y);
    
    var sp = 100;
    for(var ax = -1000-ply.x%sp,bx = 1000-ply.x%sp;ax<=bx;ax+=sp){
      for(var ay = -1000-ply.y%sp,by = 1000-ply.y%sp;ay<=by;ay+=sp){
        rect(ax-1,ay-1,2,2);
    }}
    
    for(var a in objects){objects[a].drawing();}
    for(var b in bullets){bullets[b].drawing();}
    for(var c in NPCs){NPCs[c].drawing();}
  DRAW.restore();
  
};
var drawStatsSubFunction = function(){
  
  DRAW.save();
  
    DRAW.lineWidth = 1;
    rect(-10,-10,CENTERSCREEN.statswidth+10,canvas.height+20);
  
    rect(10,50,CENTERSCREEN.statswidth-20,20);
    DRAW.fillStyle = "rgb(100,100,255)";
    rect(10,50,
      Math.max((CENTERSCREEN.statswidth-20)*(ply.hull.t/ply.hull.st),0)
      ,20);
  
  DRAW.restore();
  
};

var drawScene = function(){
    DRAW.save();
    
      drawActionSubFunction(ply.rc+ply.rt*(1-CENTERSCREEN.screen_centering));
    
      DRAW.save();
        DRAW.translate(CENTERSCREEN.x,CENTERSCREEN.y);
        DRAW.rotate(ply.rt*(1-CENTERSCREEN.screen_centering));
        DRAW.translate(-CENTERSCREEN.x,-CENTERSCREEN.y);
        ply.hull.drawing();
      DRAW.restore();
    
      DRAW.save();
        DRAW.translate(CENTERSCREEN.x,CENTERSCREEN.y);
        DRAW.rotate(-ply.rt*CENTERSCREEN.screen_centering);
        DRAW.translate(-CENTERSCREEN.x,-CENTERSCREEN.y);
        DRAW.lineWidth = 3;
        line(CENTERSCREEN.x,CENTERSCREEN.y,
          CENTERSCREEN.x,CENTERSCREEN.y-ply.turret.shaftlength);
      DRAW.restore();
    
    
    DRAW.restore();
    
    drawStatsSubFunction();
};

}());//drawScene function

                                                                                          alert("2");

(function(){
var mouse_control = false;
var turret_control = true;
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
  if(mouseE.clientY<canvas.height/2)  turret_control = !turret_control;
});
document.addEventListener('mousemove',function(mouseE){
  mouseX = mouseE.clientX;
  mouseY = mouseE.clientY;
});
}());//keyboard input


var UPDATEALL = function() {

    ply.updateCanDieYet();
    bulletCollisionPruning();
    
    for(var b in bullets){
        if(bullets[b].updateCanDieYet()){
            bullets.splice(b,1);
        }
    }
    for(var c in NPCs){
        if(NPCs[c].updateCanDieYet()){
            NPCs.splice(c,1);
        }
    }
    if(NPCs.length<6+parseInt(document.getElementById("score").innerHTML)*0.001){
        var ss = Math.random()*25+8;
        
        var newNPC = new NPC(Math.random()*1000-500,Math.random()*1000-500,24.0/ss,ss*200,ss*2);
        while(newNPC.collideOB()){
          newNPC = new NPC(Math.random()*1000-500,Math.random()*1000-500,24.0/ss,ss*200,ss*2);
        }
        
        NPCs.push(newNPC);
    }
    
    
    if(brl){if(CENTERSCREEN.screen_centering>0)CENTERSCREEN.screen_centering-=0.01;}
    if(brr){if(CENTERSCREEN.screen_centering<1)CENTERSCREEN.screen_centering+=0.01;}
    drawScene();
};


window.setTimeout(function(){window.setInterval(UPDATEALL,15);}, 500);

alert("game set up all good");
