function player(){
      var ply = this;
      this.controls = {
        mouseX:0,
        mouseY:0,
        mouse_control: true,
        turret_control: false,
        clm:false, crm:false, mousemh:0,
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
    
    if(theply.controls.turret_control){
      if(theply.controls.www){tttvx-=theply.speed*Math.sin(theply.rt);tttvy-=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.sss){tttvx+=theply.speed*Math.sin(theply.rt);tttvy+=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.aaa){tttvy+=theply.speed*Math.sin(theply.rt);tttvx-=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.ddd){tttvy-=theply.speed*Math.sin(theply.rt);tttvx+=theply.speed*Math.cos(theply.rt);}
    }else{
      if(theply.controls.cuc){tttvx-=theply.speed*Math.sin(theply.rt);tttvy-=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.cdc){tttvx+=theply.speed*Math.sin(theply.rt);tttvy+=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.clc){tttvy+=theply.speed*Math.sin(theply.rt);tttvx-=theply.speed*Math.cos(theply.rt);}
      if(theply.controls.crc){tttvy-=theply.speed*Math.sin(theply.rt);tttvx+=theply.speed*Math.cos(theply.rt);} 
    }
    if(theply.controls.mouse_control){
      //control with mouse
      if(true){fireTurret1(theply,theply.controls.clm);}
      if(true){fireTurret2(theply,theply.controls.crm);}
      //players should be allowed to turn as fast as they want - NOTE: make a slider for rspeed
      theply.rt-=theply.rspeed*0.1*theply.controls.mousehm;
      theply.controls.mousehm = 0;
    }else if(theply.controls.turret_control){
      if(true){fireTurret1(theply,theply.controls.cuc);}
      if(true){fireTurret2(theply,theply.controls.cdc);}
      if(theply.controls.clc){theply.rt+=theply.rspeed;}
      if(theply.controls.crc){theply.rt-=theply.rspeed;}
    }else{
      if(true){fireTurret1(theply,theply.controls.www);}
      if(true){fireTurret2(theply,theply.controls.sss);}
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










var ply = new player();
