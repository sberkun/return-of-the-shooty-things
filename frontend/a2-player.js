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
      this.turret1.fire = function(fff153vvb){
          if(ply.controls.fireready){if(fff153vvb){
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
      this.die = function(){
      };
      this.updateCanDieYet = function(){
          if(ply.hull.t<0) return true;
          if(ply.hull.t<ply.hull.st) ply.hull.t+=ply.hull.regen;
  
          var tttvx = 0;
          var tttvy = 0;
    
          if(mouse_control){
            if(ply.controls.www){tttvx-=ply.speed*Math.sin(ply.rt);tttvy-=ply.speed*Math.cos(ply.rt);}
            if(ply.controls.sss){tttvx+=ply.speed*Math.sin(ply.rt);tttvy+=ply.speed*Math.cos(ply.rt);}
            if(ply.controls.aaa){tttvy+=ply.speed*Math.sin(ply.rt);tttvx-=ply.speed*Math.cos(ply.rt);}
            if(ply.controls.ddd){tttvy-=ply.speed*Math.sin(ply.rt);tttvx+=ply.speed*Math.cos(ply.rt);}
            if(true){ply.turret1.fire(ply.controls.cuc);}
            if(true){ply.turret2.fire(ply.controls.cdc);}
            if(ply.controls.clc){ply.rt+=ply.rspeed;}
            if(ply.controls.crc){ply.rt-=ply.rspeed;}
          }else{
            if(ply.controls.cuc){tttvx-=ply.speed*Math.sin(ply.rt);tttvy-=ply.speed*Math.cos(ply.rt);}
            if(ply.controls.cdc){tttvx+=ply.speed*Math.sin(ply.rt);tttvy+=ply.speed*Math.cos(ply.rt);}
            if(ply.controls.clc){tttvy+=ply.speed*Math.sin(ply.rt);tttvx-=ply.speed*Math.cos(ply.rt);}
            if(ply.controls.crc){tttvy-=ply.speed*Math.sin(ply.rt);tttvx+=ply.speed*Math.cos(ply.rt);}
            if(true){ply.turret1.fire(ply.controls.www);}
            if(true){ply.turret2.fire(ply.controls.sss);}
            if(ply.controls.aaa){ply.rt+=ply.rspeed;}
            if(ply.controls.ddd){ply.rt-=ply.rspeed;}
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
}




































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
var updateCanDieYetPlayer = function(theply){
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
