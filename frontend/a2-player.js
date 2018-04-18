function player(){
      this.vx=0;this.vy=0;this.mass=10;
      this.friction=0.9;this.getFriction=0.9;
      this.x=0;this.y=0;
      this.px=0;this.py=0;
      this.moveax=0;this.moveay=0;
      this.canacc = true;
      this.rt=0;
      this.d=64; //diameter of circular hitbox
      this.hull={
        st: 50000,
        t:  50000,
        regen: 200,
      };
      peoples.push(this);
}

var testJim = new player();
testJim.x = 100; testJim.y = -100; testJim.rt = 10;

var ply = new player(); 
      ply.controls = {
        speed:0.4,
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
            //updates the rt, and resets the acceleration to where the player wants to move
            
            var tttvx = 0; //actually acceleration
            var tttvy = 0; 
            var ctr = ply.controls;
    
            if(ply.controls.turret_control){
              if(ctr.www){tttvx-=ctr.speed*Math.sin(ply.rt);tttvy-=ctr.speed*Math.cos(ply.rt);}
              if(ctr.sss){tttvx+=ctr.speed*Math.sin(ply.rt);tttvy+=ctr.speed*Math.cos(ply.rt);}
              if(ctr.aaa){tttvy+=ctr.speed*Math.sin(ply.rt);tttvx-=ctr.speed*Math.cos(ply.rt);}
              if(ctr.ddd){tttvy-=ctr.speed*Math.sin(ply.rt);tttvx+=ctr.speed*Math.cos(ply.rt);}
            }else{
              if(ctr.cuc){tttvx-=ctr.speed*Math.sin(ply.rt);tttvy-=ctr.speed*Math.cos(ply.rt);}
              if(ctr.cdc){tttvx+=ctr.speed*Math.sin(ply.rt);tttvy+=ctr.speed*Math.cos(ply.rt);}
              if(ctr.clc){tttvy+=ctr.speed*Math.sin(ply.rt);tttvx-=ctr.speed*Math.cos(ply.rt);}
              if(ctr.crc){tttvy-=ctr.speed*Math.sin(ply.rt);tttvx+=ctr.speed*Math.cos(ply.rt);} 
            }
            
            //control with mouse
            if(true){ply.turret1.fire(ply.controls.clm);}
            if(true){ply.turret2.fire(ply.controls.clm);}
            //players should be allowed to turn as fast as they want - NOTE: make a slider for rspeed
            ply.rt-=ply.controls.rspeed*0.1*ply.controls.mousehm;
            ply.controls.mousehm = 0;
  
            if(tttvx*tttvx+tttvy*tttvy-ply.speed*ply.speed>0.01){tttvx*=0.707106781;tttvy*=0.707106781;}
            
            ply.moveax=tttvx;
            ply.moveay=tttvy;
            //ply.vx = ply.vx*ply.getFriction;
            //ply.vy = ply.vy*ply.getFriction;
            //if(Math.abs(ply.vx)<0.005) ply.vx = 0;
            //if(Math.abs(ply.vy)<0.005) ply.vy = 0;
      }
      ply.update = function(){
            ply.updateControls();
      }
      ply.turret1={
          numshots:1,
          accuracy:0,
          shaftlength:64,
          reloadtime:0,
          bulletspeed:60
      };
      ply.turret2={
          //add stuff later, defence weapon............................................................ 
      };
      ply.turret1.fire = function(fff153vvb){
          if(ply.controls.fireready){if(fff153vvb){
            for(var a=ply.turret1.numshots;a>0;a--){
              new bullet(
                  ply.x-ply.turret1.shaftlength*(Math.sin(ply.rt)),
                  ply.y-ply.turret1.shaftlength*(Math.cos(ply.rt)),
                  ply.turret1.bulletspeed,
                  (((ply.rt+(Math.random()-0.5)*ply.turret1.accuracy)
                    %(2*Math.PI))+(2*Math.PI))%(2*Math.PI),
                  10,5
              );
              ply.hull.t--;
            }
            ply.controls.fireready = false;
          }}
          else if(ply.controls.firetime++>ply.turret1.reloadtime)
            {ply.controls.fireready = true;ply.controls.firetime=0;}              
      };
      ply.turret2.fire = function(fff153vvb){};


var drawPlayer = function(theply){
  DRAW.save();
      DRAW.translate(theply.x-ply.x+CENTERSCREEN.x,theply.y-ply.y+CENTERSCREEN.y);
      DRAW.rotate(-theply.rt);
      DRAW.fillStyle = "rgb(128,128,255)";
      circle(0,0,theply.d*0.5);
      DRAW.drawImage(spriteSheet,0,0,128,128,-64,-64,128,128);
  DRAW.restore();
};











