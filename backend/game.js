module.exports.exportFunction = function(inputPeoples){
  var OBJ = {
      peoples:inputPeoples,
      bullets:[],
      objects:[],
  };
  OBJ.ply=function(){
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
      this.friction=0.9;this.getFriction:0.9;
      this.x=0,this.y=0;
      this.rt=0;this.speed=0.4;this.rspeed=Math.PI/180;
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
      this.turret1.fire = function(fff){
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
      this.die = function(){
      };
      this.updateCanDieYet = function(){
          if(this.hull.t<0) return true;
          if(this.hull.t<this.hull.st) this.hull.t+=this.hull.regen;
  
          var tttvx = 0;
          var tttvy = 0;
    
          if(mouse_control){
            if(this.controls.www){tttvx-=this.speed*Math.sin(this.rt);tttvy-=this.speed*Math.cos(this.rt);}
            if(this.controls.sss){tttvx+=this.speed*Math.sin(this.rt);tttvy+=this.speed*Math.cos(this.rt);}
            if(this.controls.aaa){tttvy+=this.speed*Math.sin(this.rt);tttvx-=this.speed*Math.cos(this.rt);}
            if(this.controls.ddd){tttvy-=this.speed*Math.sin(this.rt);tttvx+=this.speed*Math.cos(this.rt);}
            if(true){this.turret1.fire(this.controls.cuc);}
            if(true){this.turret2.fire(this.controls.cdc);}
            if(this.controls.clc){this.rt+=this.rspeed;}
            if(this.controls.crc){this.rt-=this.rspeed;}
          }else{
            if(this.controls.cuc){tttvx-=this.speed*Math.sin(this.rt);tttvy-=this.speed*Math.cos(this.rt);}
            if(this.controls.cdc){tttvx+=this.speed*Math.sin(this.rt);tttvy+=this.speed*Math.cos(this.rt);}
            if(this.controls.clc){tttvy+=this.speed*Math.sin(this.rt);tttvx-=this.speed*Math.cos(this.rt);}
            if(this.controls.crc){tttvy-=this.speed*Math.sin(this.rt);tttvx+=this.speed*Math.cos(this.rt);}
            if(true){this.turret1.fire(this.controls.www);}
            if(true){this.turret2.fire(this.controls.sss);}
            if(this.controls.aaa){this.rt+=this.rspeed;}
            if(this.controls.ddd){this.rt-=this.rspeed;}
          }
  

          if(tttvx*tttvx+tttvy*tttvy-this.speed*this.speed>0.005){tttvx*=0.707106781;tttvy*=0.707106781;}
          this.vx+=tttvx;
          this.vy+=tttvy;
          this.x+=this.vx;
          this.y+=this.vy;
          

          this.vx = this.vx*this.getFriction;
          this.vy = this.vy*this.getFriction;
          if(Math.abs(this.vx)<0.005) this.vx = 0;
          if(Math.abs(this.vy)<0.005) this.vy = 0;
      };
  };
  OBJ.RO=function(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cx = this.x+this.w/2; //centerX
        this.cy = this.y+this.h/2; //centerY
        this.bubbleR = Math.sqrt(this.w*this.w+this.h*this.h)/2;
  };
  OBJ.bullet=function(x,y,s,r,t,d){
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
  };
  OBJ.createOBsArena=function(){
        for(var a = 0;a<5;a+=2){for(var b=0;b<5;b+=2){
          var ss = 70-10*Math.abs(2-a)-5*Math.abs(2-b);
          OBJ.objects.push(new OBJ.RO(a*200-400-ss,b*200-400-ss,ss*2,ss*2));
        }}
        OBJ.objects.splice(4,1);
        var wt = 20;
        var ws = 1000;
        OBJ.objects.push(new OBJ.RO(-ws-wt,-ws-wt,wt,2*ws+wt));
        OBJ.objects.push(new OBJ.RO(-ws-wt,ws,2*ws+wt,wt));
        OBJ.objects.push(new OBJ.RO(ws,-ws,wt,2*ws+wt));
        OBJ.objects.push(new OBJ.RO(-ws,-ws-wt,2*ws+wt,wt));
  };
  OBJ.updateAll=function(){
      ////**************************************this is the game, runs on a loop
        for(var b in OBJ.bullets){
          if(OBJ.bullets[b].updateCanDieYet()){
            OBJ.bullets.splice(b,1);
          }
        }
      
  };
  OBJ.createOBsArena();
  return OBJ;
};
