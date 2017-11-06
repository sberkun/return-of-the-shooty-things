function player(){
      var ply = this;
      this.controls = {
        mouse_control: true,
        turret_control: false,
        www:false, aaa:false, sss:false, ddd:false,
        zzz:false, xxx:false, cmc:false, cpc:false,
        clc:false, cuc:false, cdc:false, crc:false,
        csc:false,
        brl:false, brr:false,
        fireon: false,
        fireready: true,
        firetime: 0,
      };
      this.vx=0;this.vy=0;
      this.friction=0.9;this.getFriction=0.9;
      this.x=0;this.y=0;
      this.rt=0;this.speed=0.4;this.rspeed=2*Math.PI/180;
      this.d=64; //diameter
      
      this.hull={
        st: 50000,
        t:  50000,
        regen: 200,
      };
      this.turret1={
          numshots:5,
          accuracy:0.6,
          shaftlength:64,
          reloadtime:0,
          bulletspeed:6
      };
      this.turret2={
          //add stuff later, defence weapon............................................................ 
      };
}


var fireTurret1 = function(theply, fff153vvb){
    if(theply.controls.fireready){if(fff153vvb){
      for(var a=theply.turret1.numshots;a>0;a--){
        bullets.push(new bullet(
            theply.x-theply.turret1.shaftlength*(Math.sin(theply.rt)),
            theply.y-theply.turret1.shaftlength*(Math.cos(theply.rt)),
            theply.turret1.bulletspeed,
            (((theply.rt+(Math.random()-0.5)*theply.turret1.accuracy)
              %(2*Math.PI))+(2*Math.PI))%(2*Math.PI),
            100,10
        ));
        theply.hull.t--;
      }
      theply.controls.fireready = false;
    }}
    else if(theply.controls.firetime++>theply.turret1.reloadtime)
      {theply.controls.fireready = true;theply.controls.firetime=0;}
};
var fireTurret2 = function(theply, fff153vvb){
};
var diePlayer = function(theply){
};
var drawPlayer = function(theplayer){
  //circle(CENTERSCREEN.x,CENTERSCREEN.y,ply.d*0.5);
  DRAW.drawImage(spriteSheet,0,0,128,128,CENTERSCREEN.x-64,CENTERSCREEN.y-64,128,128);
};
var updateCanDieYetPlayer = function(theply){
    if(theply.hull.t<0) return true;
    if(theply.hull.t<theply.hull.st) theply.hull.t+=theply.hull.regen;
  
    var tttvx = 0;
    var tttvy = 0;
    
    if(theply.controls.mouse_control){
      if(theply.controls.www){tttvx-=theply.speed*Math.sin(theply.rt);tttvy-=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.sss){tttvx+=theply.speed*Math.sin(theply.rt);tttvy+=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.aaa){tttvy+=theply.speed*Math.sin(theply.rt);tttvx-=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.ddd){tttvy-=theply.speed*Math.sin(theply.rt);tttvx+=theply.speed*Math.cos(theply.rt);}
      if(true){theply.turret1.fire(theply.controls.cuc);}
      if(true){theply.turret2.fire(theply.controls.cdc);}
      if(theply.controls.clc){theply.rt+=theply.rspeed;}
      if(theply.controls.crc){theply.rt-=theply.rspeed;}
    }else{
      if(theply.controls.cuc){tttvx-=theply.speed*Math.sin(theply.rt);tttvy-=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.cdc){tttvx+=theply.speed*Math.sin(theply.rt);tttvy+=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.clc){tttvy+=theply.speed*Math.sin(theply.rt);tttvx-=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.crc){tttvy-=theply.speed*Math.sin(theply.rt);tttvx+=theply.speed*Math.cos(theply.rt);}
      if(true){theply.turret1.fire(theply.controls.www);}
      if(true){theply.turret2.fire(theply.controls.sss);}
      if(theply.controls.aaa){theply.rt+=theply.rspeed;}
      if(theply.controls.ddd){theply.rt-=theply.rspeed;}
    }
  
    if(tttvx*tttvx+tttvy*tttvy-theply.speed*theply.speed>0.005){tttvx*=0.707106781;tttvy*=0.707106781;}
    theply.vx+=tttvx;
    theply.vy+=tttvy;
    theply.x+=theply.vx;
    theply.y+=theply.vy;
          
    theply.vx = theply.vx*theply.getFriction;
    theply.vy = theply.vy*theply.getFriction;
    if(Math.abs(theply.vx)<0.005) theply.vx = 0;
    if(Math.abs(theply.vy)<0.005) theply.vy = 0;
};































var ply = {
    vx:0,vy:0,friction:0.9,getFriction:0.9,
    x:0,y:0,rt:0,speed:0.4,rspeed:2*Math.PI/180,
    d:64, //diameter
    drawingIMG:new Image(),
    hull:{
      st: 50000,
      t:  50000,
      regen: 200,
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
var drawPlayer = function(theplayer){
  //circle(CENTERSCREEN.x,CENTERSCREEN.y,ply.d*0.5);
  DRAW.drawImage(theplayer.drawingIMG,0,0,128,128,CENTERSCREEN.x-64,CENTERSCREEN.y-64,128,128);
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
            100,10
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
updateCanDieYetPlayer = function(theply){
  if(theply.hull.t<0) return true;
  if(theply.hull.t<theply.hull.st) theply.hull.t+=theply.hull.regen;
  
  var tttvx = 0;
  var tttvy = 0;
    
  if(mouse_control){
    if(www){tttvx-=ply.speed*Math.sin(ply.rt);tttvy-=ply.speed*Math.cos(ply.rt);}
    if(sss){tttvx+=ply.speed*Math.sin(ply.rt);tttvy+=ply.speed*Math.cos(ply.rt);}
    if(aaa){tttvy+=ply.speed*Math.sin(ply.rt);tttvx-=ply.speed*Math.cos(ply.rt);}
    if(ddd){tttvy-=ply.speed*Math.sin(ply.rt);tttvx+=ply.speed*Math.cos(ply.rt);}
    if(true){ply.turret1.fire(cuc);}
    if(true){ply.turret2.fire(cdc);}
    if(clc){ply.rt+=ply.rspeed;}
    if(crc){ply.rt-=ply.rspeed;}
  }else{
    if(cuc){tttvx-=ply.speed*Math.sin(ply.rt);tttvy-=ply.speed*Math.cos(ply.rt);}
    if(cdc){tttvx+=ply.speed*Math.sin(ply.rt);tttvy+=ply.speed*Math.cos(ply.rt);}
    if(clc){tttvy+=ply.speed*Math.sin(ply.rt);tttvx-=ply.speed*Math.cos(ply.rt);}
    if(crc){tttvy-=ply.speed*Math.sin(ply.rt);tttvx+=ply.speed*Math.cos(ply.rt);}
    if(true){ply.turret1.fire(www);}
    if(true){ply.turret2.fire(sss);}
    if(aaa){ply.rt+=ply.rspeed;}
    if(ddd){ply.rt-=ply.rspeed;}
  }
  

  if(tttvx*tttvx+tttvy*tttvy-ply.speed*ply.speed>0.005){tttvx*=0.707106781;tttvy*=0.707106781;}
  ply.vx+=tttvx;
  ply.vy+=tttvy;
  ply.x+=ply.vx;
  ply.y+=ply.vy;
  

  ply.vx = ply.vx*ply.getFriction;
  ply.vy = ply.vy*ply.getFriction;
  if(Math.abs(ply.vx)<0.005) ply.vx = 0;
  if(Math.abs(ply.vy)<0.005) ply.vy = 0;
};
