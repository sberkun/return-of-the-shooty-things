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
function bbBox(x1,y1,x2,y2,type,si,ei){
    this.x1=x1;this.y1=y1;this.x2=x2;this.y2=y2; //corners
    this.type=type;        //0=object, 1=player, 2=slow bullet, 3=fast bullet
    this.si=si;this.ei=ei; //this points to the objects in the array from si<= ... <ei
    bounds.push(this);
}

function setupbbBullets(){
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
        let x1=bullets[0].x,
            y1=bullets[0].y,
            x2=bullets[0].x+bullets[0].vx,
            y2=bullets[0].y+bullets[0].vy;                                                                           //NOPE: fix
        for(a=1;a<b;a++){
            if(bullets[a].x<x) x  = bullets[a].x;
            if(bullets[a].y<y) y  = bullets[a].y;
            if(bullets[a].x+bullets[a].vx>w) w = bullets[a].vx;
            if(bullets[a].y+bullets[a].vy>h) h = bullets[a].vy;
        }
        new bbBox(x1,y1,x2-x1,y2-y1,2,0,b);
    }
    if(bullets.length>b){
        let x=bullets[b].x,y=bullets[b].y,w=bullets[b].x+bullets[b].vx,h=bullets[b].y+bullets[b].vy;                //NOPE: fix
        for(a=b;a<bullets.length;a++){
            if(bullets[a].x<x) x  = bullets[a].x;
            if(bullets[a].y<y) y  = bullets[a].y;
            if(bullets[a].x+bullets[a].vx>w) w = bullets[a].vx;
            if(bullets[a].y+bullets[a].vy>h) h = bullets[a].vy;
        }
        new bbBox(x,y,w,h,3,b,bullets.length);
    }  
}
function setupbbPeople(){
    if(people.length<1) return;
    let x1=people[0].x-people[0].d*0.5,
        y1=people[0].y-people[0].d*0.5,
        x2=people[0].x+people[0].d*0.5,
        y2=people[0].y+people[0].d*0.5,
    for(let a=0;a<people.length;a++){
        if(people[a].x-people[a].d*0.5<x1) x1=people[a].x-people[a].d*0.5;
        if(people[a].y-people[a].d*0.5<y1) y1=people[a].y-people[a].d*0.5;
        if(people[a].x+people[a].d*0.5>x2) x2=people[a].x+people[a].d*0.5;
        if(people[a].y+people[a].d*0.5>y2) y2=people[a].y+people[a].d*0.5;
    }
    new bbBox(x1,y1,x2,y2,1,0,people.length);
}
function setupbbObjects(){
    if(objects.length<1) return;
    let x1=objects[0].x,
        y1=objects[0].y,
        x2=objects[0].x+objects[0].w,
        y2=objects[0].y+objects[0].h,
    for(let a=0;a<people.length;a++){
        if(objects[a].x               <x1) x1=objects[a].x;
        if(objects[a].y               <y1) y1=objects[a].y;
        if(objects[a].x+objects[a].w  >x2) x2=objects[a].x+objects[a].w;
        if(objects[a].y+objects[a].h  >y2) y2=objects[a].y+objects[a].h;
    new bbBox(x1,y1,x2,y2,0,0,objects.length);
}

function updatePhysics(){
    //setupbbBullets();
    setupbbPeople();
    setupbbObjects();
    
    //collisions
    
    bounds = [];
}
