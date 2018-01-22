function player(){
      this.vx=0;this.vy=0;
      this.friction=0.9;this.getFriction=0.9;
      this.x=0;this.y=0;
      this.rt=0;this.speed=0.4;
      this.d=64; //diameter of circular hitbox
      this.hull={
        st: 50000,
        t:  50000,
        regen: 200,
      };
}



var ply = new player();
      ply.controls = {
        mouseX:0,
        mouseY:0,
        mouse_control: true,
        turret_control: true,
        rspeed:2*Math.PI/180,
        clm:false, crm:false, mousehm:0,
        www:false, aaa:false, sss:false, ddd:false,
        zzz:false, xxx:false, cmc:false, cpc:false,
        clc:false, cuc:false, cdc:false, crc:false,
        csc:false,
        brl:false, brr:false,
        fireon: false,
        fireready: true,
        firetime: 0,
      };
      ply.updateControls = function(){
          
      }
      ply.update = function(){
      }
      ply.turret1={
          numshots:5,
          accuracy:0.6,
          shaftlength:64,
          reloadtime:0,
          bulletspeed:6
      };
      ply.turret2={
          //add stuff later, defence weapon............................................................ 
      };
      ply.turret1.fire = function(fff153vvb){
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
            ply.controls.fireready = false;
          }}
          else if(ply.controls.firetime++>ply.turret1.reloadtime)
            {ply.controls.fireready = true;ply.controls.firetime=0;}              
      };
      ply.turret2.fire = function(fff153vvb){};



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

    //control with mouse
    if(true){theply.turret1.fire(theply.controls.clm);}
    if(true){theply.turret2.fire(theply.controls.clm);}
    //players should be allowed to turn as fast as they want - NOTE: make a slider for rspeed
    theply.rt-=theply.controls.rspeed*0.1*theply.controls.mousehm;
    theply.controls.mousehm = 0;
  
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










