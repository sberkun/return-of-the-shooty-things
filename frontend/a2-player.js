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



var ply = new player(); peoples.push(ply);
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
            var tttvx = 0;
            var tttvy = 0;
    
            if(ply.controls.turret_control){
              if(ply.controls.www){tttvx-=ply.speed*Math.sin(ply.rt);tttvy-=ply.speed*Math.cos(ply.rt);}
              if(ply.controls.sss){tttvx+=ply.speed*Math.sin(ply.rt);tttvy+=ply.speed*Math.cos(ply.rt);}
              if(ply.controls.aaa){tttvy+=ply.speed*Math.sin(ply.rt);tttvx-=ply.speed*Math.cos(ply.rt);}
              if(ply.controls.ddd){tttvy-=ply.speed*Math.sin(ply.rt);tttvx+=ply.speed*Math.cos(ply.rt);}
            }else{
              if(ply.controls.cuc){tttvx-=ply.speed*Math.sin(ply.rt);tttvy-=ply.speed*Math.cos(ply.rt);}
              if(ply.controls.cdc){tttvx+=ply.speed*Math.sin(ply.rt);tttvy+=ply.speed*Math.cos(ply.rt);}
              if(ply.controls.clc){tttvy+=ply.speed*Math.sin(ply.rt);tttvx-=ply.speed*Math.cos(ply.rt);}
              if(ply.controls.crc){tttvy-=ply.speed*Math.sin(ply.rt);tttvx+=ply.speed*Math.cos(ply.rt);} 
            }

            //control with mouse
            if(true){ply.turret1.fire(ply.controls.clm);}
            if(true){ply.turret2.fire(ply.controls.clm);}
            //players should be allowed to turn as fast as they want - NOTE: make a slider for rspeed
            ply.rt-=ply.controls.rspeed*0.1*ply.controls.mousehm;
            ply.controls.mousehm = 0;
  
            if(tttvx*tttvx+tttvy*tttvy-ply.speed*ply.speed>0.005){tttvx*=0.707106781;tttvy*=0.707106781;}
            ply.vx+=tttvx;
            ply.vy+=tttvy;
            ply.vx = ply.vx*ply.getFriction;
            ply.vy = ply.vy*ply.getFriction;
            if(Math.abs(ply.vx)<0.005) ply.vx = 0;
            if(Math.abs(ply.vy)<0.005) ply.vy = 0;
      }
      ply.update = function(){
            ply.updateControls();
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
var drawPlayer = function(theply){
  //circle(CENTERSCREEN.x,CENTERSCREEN.y,ply.d*0.5);
  DRAW.save();
  //DRAW.translate(theplayer.x-ply.x+CENTERSCREEN.x)
  //DRAW.rotate(theplayer.rt);
  DRAW.drawImage(spriteSheet,0,0,128,128,theply.x-ply.x+CENTERSCREEN.x-64,theply.y-ply.y+CENTERSCREEN.y-64,128,128);
  DRAW.restore();
};
var updateCanDieYetPlayer = function(theply){
    if(theply.hull.t<0) return true;
    if(theply.hull.t<theply.hull.st) theply.hull.t+=theply.hull.regen;
    ply.x+=ply.vx;
    ply.y+=ply.vy;   
};










