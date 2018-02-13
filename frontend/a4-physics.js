//PHYSICS SCHEME

//Bullets are fast moving objects - therefore, their hitbox is a line between their previous location and thier next location
//projectiles people are slow-moving objects. People and projectiles have circular hitboxes, objects have square hitboxes.

function updateCanDieYetBullet(thebullet){
    if(thebullet.t<=0){return true;}
    if(thebullet.t<1){                     //effective range
        thebullet.vx*=thebullet.t;
        thebullet.vy+=thebullet.t;
    }
    t--;
    thebullet.x+=thebullet.vx;
    thebullet.y+=thebullet.vy;
    return false;
}

function updateCanDieYetPlayer(theply){
    if(theply.hull.t<=0) return true;
    if(theply.hull.t<theply.hull.st) theply.hull.t+=theply.hull.regen;
    theply.x+=theply.vx;
    theply.y+=theply.vy;   
}

var bounds = []; //at the very worst case, will be bullets.length+players.length+objects.length
function bbBox(x1,y1,x2,y2,type,si,ei){
    this.x1=x1;this.y1=y1;this.x2=x2;this.y2=y2; //corners
    this.type=type;        //0=object, 1=player, 2=projectile, 3=bullet
    this.si=si;this.ei=ei; //this points to the objects in the array from si<= ... <ei
    bounds.push(this);
}

function setupbbBullets(){
    if(bullets.length===0) return;
    
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
        let x1=Math.min(bullets[0].x,bullets[0].x-bullets[0].vx),
            y1=Math.min(bullets[0].y,bullets[0].y-bullets[0].vy),
            x2=Math.max(bullets[0].x,bullets[0].x-bullets[0].vx),
            y2=Math.max(bullets[0].y,bullets[0].y-bullets[0].vy); 
        for(a=1;a<b;a++){
            if(Math.min(bullets[a].x,bullets[a].x-bullets[a].vx)<x1) x1=Math.min(bullets[a].x,bullets[a].x-bullets[a].vx);
            if(Math.min(bullets[a].y,bullets[a].y-bullets[a].vy)<y1) y1=Math.min(bullets[a].y,bullets[a].y-bullets[a].vy);
            if(Math.max(bullets[a].x,bullets[a].x-bullets[a].vx)>x2) x2=Math.max(bullets[a].x,bullets[a].x-bullets[a].vx);
            if(Math.max(bullets[a].y,bullets[a].y-bullets[a].vy)>y2) y2=Math.max(bullets[a].y,bullets[a].y-bullets[a].vy);
        }
        new bbBox(x1,y1,x2,y2,3,0,b);
    }
    if(bullets.length>b){
        let x1=Math.min(bullets[b].x,bullets[b].x-bullets[b].vx),
            y1=Math.min(bullets[b].y,bullets[b].y-bullets[b].vy),
            x2=Math.max(bullets[b].x,bullets[b].x-bullets[b].vx),
            y2=Math.max(bullets[b].y,bullets[b].y-bullets[b].vy);
        for(a=b;a<bullets.length;a++){
            if(Math.min(bullets[a].x,bullets[a].x-bullets[a].vx)<x1) x1=Math.min(bullets[a].x,bullets[a].x-bullets[a].vx);
            if(Math.min(bullets[a].y,bullets[a].y-bullets[a].vy)<y1) y1=Math.min(bullets[a].y,bullets[a].y-bullets[a].vy);
            if(Math.max(bullets[a].x,bullets[a].x-bullets[a].vx)>x2) x2=Math.max(bullets[a].x,bullets[a].x-bullets[a].vx);
            if(Math.max(bullets[a].y,bullets[a].y-bullets[a].vy)>y2) y2=Math.max(bullets[a].y,bullets[a].y-bullets[a].vy);
        }
        new bbBox(x1,y1,x2,y2,3,b,bullets.length);
    }  
}
function setupbbPeoples(){
    if(peoples.length<1) return;
    let x1=peoples[0].x-peoples[0].d*0.5,
        y1=peoples[0].y-peoples[0].d*0.5,
        x2=peoples[0].x+peoples[0].d*0.5,
        y2=peoples[0].y+peoples[0].d*0.5;
    for(let a=0;a<peoples.length;a++){
        if(peoples[a].x-peoples[a].d*0.5<x1) x1=peoples[a].x-peoples[a].d*0.5;
        if(peoples[a].y-peoples[a].d*0.5<y1) y1=peoples[a].y-peoples[a].d*0.5;
        if(peoples[a].x+peoples[a].d*0.5>x2) x2=peoples[a].x+peoples[a].d*0.5;
        if(peoples[a].y+peoples[a].d*0.5>y2) y2=peoples[a].y+peoples[a].d*0.5;
    }
    new bbBox(x1,y1,x2,y2,1,0,peoples.length);
}
function setupbbObjects(){
    if(objects.length<1) return;
    let x1=objects[0].x,
        y1=objects[0].y,
        x2=objects[0].x+objects[0].w,
        y2=objects[0].y+objects[0].h;
    for(let a=0;a<objects.length;a++){
        if(objects[a].x               <x1) x1=objects[a].x;
        if(objects[a].y               <y1) y1=objects[a].y;
        if(objects[a].x+objects[a].w  >x2) x2=objects[a].x+objects[a].w;
        if(objects[a].y+objects[a].h  >y2) y2=objects[a].y+objects[a].h;
    }
    new bbBox(x1,y1,x2,y2,0,0,objects.length);
}
function collidingPO(theperson,theobject){
    if(
        theperson.x+theperson.d*0.5<theobject.x||
        theperson.y+theperson.d*0.5<theobject.y||
        theperson.x-theperson.d*0.5>theobject.x+theobject.w||
        theperson.y-theperson.d*0.5>theobject.y+theobject.h
    ) return false;
    
    if(theperson.x<theobject.x){
        if(theperson.y<theobject.y) 
            return distsqrd(theperson.x,theperson.y,theobject.x,theobject.y)
                   <=theperson.d*theperson.d*0.25;
        if(theperson.y>theobject.y+theobject.h)
            return distsqrd(theperson.x,theperson.y,theobject.x,theobject.y+theobject.h)
                   <=theperson.d*theperson.d*0.25;
    }
    else if(theperson.x>theobject.x+theobject.w){
        if(theperson.y<theobject.y) 
            return distsqrd(theperson.x,theperson.y,theobject.x+theobject.w,theobject.y)
                   <=theperson.d*theperson.d*0.25;
        if(theperson.y>theobject.y+theobject.h)
            return distsqrd(theperson.x,theperson.y,theobject.x+theobject.w,theobject.y+theobject.h)
                   <=theperson.d*theperson.d*0.25;
    }
    
    return true;
}
function collidingPP(person1,person2){
    return distsqrd(person1.x,person1.y,person2.x,person2.y)<=
        (person1.d+person2.d)*(person1.d+person2.d)*0.25;
}
function collidingB1O(thebullet,theobject){
}
function collidingB1P(thebullet,theobject){
}

function updatePhysics(){
    
    bounds = [];
    
    setupbbBullets();
    setupbbPeoples();
    setupbbObjects();
    
    //collisions
    

}
