//PHYSICS SCHEME

//Bullets are fast moving objects - therefore, their hitbox is a line between their previous location and thier next location
//people and objects are slow-moving objects. People have circular hitboxes, objects have square hitboxes.

function updateCanDieYetBullet(thebullet){
    if(thebullet.t--<0){return true;}
    //previous is (x,y), next is (x+vx,y+vy)
    
    
    thebullet.x+=thebullet.vx;
    thebullet.y+=thebullet.vy;
    return false;
}

function updateCanDieYetPlayer(theply){
    if(theply.hull.t<0) return true;
    if(theply.hull.t<theply.hull.st) theply.hull.t+=theply.hull.regen;
    theply.x+=theply.vx;
    theply.y+=theply.vy;   
}

var bounds = []; //at the very worst case, will be bullets.length+players.length+objects.length
function bbBox(x,y,w,h,type,si,ei){
    this.x=x;this.y=y;this.w=w;this.h=h;
    this.type=type;//0=object, 1=player, 2=slow bullet, 3=fast bullet
    this.si=si;this.ei=ei; //this points to the objects in the array from si<= ... <ei
    bounds.push(this);
}

function sortBullets(){
    if(bullets.length=0) return;
    
    //partitioned by speed>avg : speed<=avg, then sorted by bounding box
    var a=0,b=0,h = null;
    var avg = 0; for(b in bullets) avg+=bullets[b].s; avg = avg/bullets.length;
    for(a=0,b=bullets.length-1;a<b;a++){
        if(bullets[a].s>avg){ 
            while(b>=0&&bullets[b]>avg)b--; 
            if(b>=0){h=bullets[b];bullets[b]=bullets[a];bullets[a]=h;}
        }
    }
    
    //set up initial bounding boxes
    if(b>0){ 
        let x=bullets[0].x,y=bullets[0].y,w=bullets[0].x+bullets[0].vx,h=bullets[0].y+bullets[0].vy;
        for(a=1;a<b;a++){
            if(bullets[a].x<x) x  = bullets[a].x;
            if(bullets[a].y<y) y  = bullets[a].y;
            if(bullets[a].x+bullets[a].vx>w) vx = bullets[a].vx;
            if(bullets[a].y+bullets[a].vy>h) vy = bullets[a].vy;
        }
        new bbBox(x,y,w,h,2,0,b);
    }
    if(bullets.length>b){
        let x=bullets[b].x,y=bullets[b].y,w=bullets[b].x+bullets[b].vx,h=bullets[b].y+bullets[b].vy;
        for(a=b;a<bullets.length;a++){
            if(bullets[a].x<x) x  = bullets[a].x;
            if(bullets[a].y<y) y  = bullets[a].y;
            if(bullets[a].x+bullets[a].vx>w) vx = bullets[a].vx;
            if(bullets[a].y+bullets[a].vy>h) vy = bullets[a].vy;
        }
        new bbBox(x,y,w,h,3,b,bullets.length);
    }  
}
