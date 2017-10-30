module.exports.exportFunction = function(inputPeoples){
  var returnOBJ = {
    peoples:inputPeoples,
    bullets:[],
    objects:[],
  };
  returnOBJ.ply=function(){
  };
  returnOBJ.RO=function(x,y,w,h){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.cx = this.x+this.w/2; //centerX
        this.cy = this.y+this.h/2; //centerY
        this.bubbleR = Math.sqrt(this.w*this.w+this.h*this.h)/2;
  };
  returnOBJ.bullet=function(x,y,s,r,t,d){
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
  returnOBJ.createOBsArena=function(){
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
  returnOBJ.updateAll=function(){
      ////**************************************this is the game, runs on a loop
        for(var b in bullets){
          if(bullets[b].updateCanDieYet()){
            bullets.splice(b,1);
          }
        }
      
  };
  returnOBJ.createOBsArena();
  return returnOBJ;
};
