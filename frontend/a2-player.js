var ply = {
    vx:0,vy:0,friction:0.9,getFriction:0.9,
    x:0,y:0,vr:0,rt:0,speed:0.4,rspeed:0.005,
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
ply.drawing = function(){
  //circle(CENTERSCREEN.x,CENTERSCREEN.y,ply.d*0.5);
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
ply.updateCanDieYet = function(){
  if(this.hull.t<0) return true;
  if(this.hull.t<this.hull.st) this.hull.t+=this.hull.regen;
  
  var tttvx = 0;
  var tttvy = 0;
    
  if(mouse_control){
    if(www){tttvx-=ply.speed*Math.sin(ply.rt);tttvy-=ply.speed*Math.cos(ply.rt);}
    if(sss){tttvx+=ply.speed*Math.sin(ply.rt);tttvy+=ply.speed*Math.cos(ply.rt);}
    if(aaa){tttvy+=ply.speed*Math.sin(ply.rt);tttvx-=ply.speed*Math.cos(ply.rt);}
    if(ddd){tttvy-=ply.speed*Math.sin(ply.rt);tttvx+=ply.speed*Math.cos(ply.rt);}
    if(true){ply.turret1.fire(cuc);}
    if(true){ply.turret2.fire(cdc);}
    if(clc){ply.vr+=ply.rspeed;}
    if(crc){ply.vr-=ply.rspeed;}
  }else{
    if(cuc){tttvx-=ply.speed*Math.sin(ply.rt);tttvy-=ply.speed*Math.cos(ply.rt);}
    if(cdc){tttvx+=ply.speed*Math.sin(ply.rt);tttvy+=ply.speed*Math.cos(ply.rt);}
    if(clc){tttvy+=ply.speed*Math.sin(ply.rt);tttvx-=ply.speed*Math.cos(ply.rt);}
    if(crc){tttvy-=ply.speed*Math.sin(ply.rt);tttvx+=ply.speed*Math.cos(ply.rt);}
    if(true){ply.turret1.fire(www);}
    if(true){ply.turret2.fire(sss);}
    if(aaa){ply.vr+=ply.rspeed;}
    if(ddd){ply.vr-=ply.rspeed;}
  }
  

  if(tttvx*tttvx+tttvy*tttvy-ply.speed*ply.speed>0.005){tttvx*=0.707106781;tttvy*=0.707106781;}
  ply.vx+=tttvx;
  ply.vy+=tttvy;
  ply.x+=ply.vx;
  ply.y+=ply.vy;
  ply.rt+=ply.vr;
  

  ply.vx = ply.vx*ply.getFriction;
  ply.vy = ply.vy*ply.getFriction;
  ply.vr = ply.vr*ply.getFriction;
  if(Math.abs(ply.vx)<0.005) ply.vx = 0;
  if(Math.abs(ply.vy)<0.005) ply.vy = 0;
  if(Math.abs(ply.vr)<0.0005) ply.vr = 0;
};
