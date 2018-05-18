//PHYSICS SCHEME

//Bullets are fast moving objects - therefore, their hitbox is a line between their previous location and thier updated location
//projectiles people are slow-moving objects. People and projectiles have circular hitboxes, objects have square hitboxes.
// if collision, move it back AND update the velocity
// in people/projectiles, collision occurs with both previous and updated, to keep the state "locked" 
// if an updated person collides with my previous location, and I didn't count it as collision, but then I have to move back,
// then me and the updated person would cooccupy the same space = bad
// will not be using three body problem (https://docs.google.com/document/d/1x40NhEqfuzmVtLgXhUuZXa9bUptC4x8aFF3zKoXctwk)
// , will just resolve every collision sequentially


function updateCanDieYetBullet(thebullet){
    if(thebullet.t<=0){return true;}
    if(thebullet.t<1){                     //effective range
        thebullet.vx*=thebullet.t;
        thebullet.vy+=thebullet.t;
    }
    thebullet.t--;
    thebullet.x+=thebullet.vx;
    thebullet.y+=thebullet.vy;
    return false;
}

function updateCanDieYetPlayer(theply){
    if(theply.hull.t<=0) return true;
    if(theply.hull.t<theply.hull.st) theply.hull.t+=theply.hull.regen;
    
    theply.px = theply.x;
    theply.py = theply.y;
    theply.x+=theply.vx;
    theply.y+=theply.vy; 
    if(theply.canacc){
        theply.vx += theply.moveax; 
        theply.vy += theply.moveay;
    } else {
        theply.canacc = true;
        //collision just happened, accelleration can only go in direction of velocity
        let scalingfactor = (theply.moveax*theply.vx+theply.moveay*theply.vy)/
                            (theply.vx*theply.vx+theply.vy*theply.vy);
        //theply.vx += scalingfactor*theply.vx;
        //theply.vy += scalingfactor*theply.vy;
        //broken :(
    }
    theply.vx *= theply.getFriction;
    theply.vy *= theply.getFriction;
    if(Math.abs(theply.vx)<0.005) theply.vx = 0;
    if(Math.abs(theply.vy)<0.005) theply.vy = 0;
}
function movebackPerson(theply){
    theply.x = theply.px;
    theply.y = theply.py;
    theply.canacc = false;
}

function bbBox(x1,y1,x2,y2,type,si,ei){
    this.x1=x1;this.y1=y1;this.x2=x2;this.y2=y2; //corners
    this.type=type;        //0=object, 1=player, 2=projectile, 3=bullet
    this.si=si;this.ei=ei; //this points to the objects in the array from si<= ... <ei
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
        return new bbBox(x1,y1,x2,y2,3,0,b);
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
        return new bbBox(x1,y1,x2,y2,3,b,bullets.length);
    }  
}
function setupbbPeoples(){
    if(peoples.length<1) return;
    let x1=Math.min(peoples[0].x,peoples[0].px)-peoples[0].d*0.5,
        y1=Math.min(peoples[0].y,peoples[0].py)-peoples[0].d*0.5,
        x2=Math.max(peoples[0].x,peoples[0].px)+peoples[0].d*0.5,
        y2=Math.max(peoples[0].y,peoples[0].py)+peoples[0].d*0.5;
    for(let a=0;a<peoples.length;a++){
        if(Math.min(peoples[a].x,peoples[a].px)-peoples[a].d*0.5<x1) x1=Math.min(peoples[a].x,peoples[a].px)-peoples[a].d*0.5;
        if(Math.min(peoples[a].y,peoples[a].py)-peoples[a].d*0.5<y1) y1=Math.min(peoples[a].y,peoples[a].py)-peoples[a].d*0.5;
        if(Math.max(peoples[a].x,peoples[a].px)+peoples[a].d*0.5>x2) x2=Math.max(peoples[a].x,peoples[a].px)+peoples[a].d*0.5;
        if(Math.max(peoples[a].y,peoples[a].py)+peoples[a].d*0.5>y2) y2=Math.max(peoples[a].y,peoples[a].py)+peoples[a].d*0.5;
    }
    return new bbBox(x1,y1,x2,y2,1,0,peoples.length);
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
    return new bbBox(x1,y1,x2,y2,0,0,objects.length);
}


function collidingB1O(thebullet,theobject){
}
function collidingB1P(thebullet,theobject){
}



/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//under construction VVVV
/////////////////////////////////////////////////////////////////////////////////////////////////////////////

function collidingbbBox(collidingInternals,ar1,ar2,firstbox,secondbox){ 
    (function resolveboxes(boxa,boxb){
        collidingInternals(boxa,boxb);                //going to be a quadtree recursive function
    })(firstbox,secondbox);
}

const physicsPO = (function(){
    let coRest = 0.05;
    let applyCollisionToPO = function(theperson,collisionAngle){
        let sinj = Math.sin(collisionAngle);
        let cosj = Math.cos(collisionAngle);
        let magOfDeltaV = -(coRest+1)*(theperson.vx*cosj+theperson.vy*sinj);
        theperson.vx+=magOfDeltaV*cosj;
        theperson.vy+=magOfDeltaV*sinj;
        movebackPerson(theperson);
    }
    let collidingPO = function(theperson,theobject){
        if(
            theperson.x+theperson.d*0.5<theobject.x||
            theperson.y+theperson.d*0.5<theobject.y||
            theperson.x-theperson.d*0.5>theobject.x+theobject.w||
            theperson.y-theperson.d*0.5>theobject.y+theobject.h
        ) return false;
        
        else if(theperson.x<theobject.x){
            if(theperson.y<theobject.y){
                if(distsqrd(theperson.x,theperson.y,theobject.x,theobject.y)
                       <=theperson.d*theperson.d*0.25){
                    applyCollisionToPO(theperson, 
                                       Math.atan((theperson.y-theobject.y)/(theperson.x-theobject.x))
                                      );
                    return true;
                }else return false;
            }
            else if(theperson.y>theobject.y+theobject.h){
                if(distsqrd(theperson.x,theperson.y,theobject.x,theobject.y+theobject.h)
                       <=theperson.d*theperson.d*0.25){
                    applyCollisionToPO(theperson, 
                                       Math.atan((theperson.y-theobject.y-theobject.h)/(theperson.x-theobject.x))
                                      );
                    return true;
                }else return false;
            }
        }
        else if(theperson.x>theobject.x+theobject.w){
            if(theperson.y<theobject.y){ 
                if(distsqrd(theperson.x,theperson.y,theobject.x+theobject.w,theobject.y)
                       <=theperson.d*theperson.d*0.25){
                    applyCollisionToPO(theperson, 
                                       Math.atan((theperson.y-theobject.y)/(theperson.x-theobject.x-theobject.w))
                                      );
                    return true;
                }else return false;
            }
            else if(theperson.y>theobject.y+theobject.h){
                if(distsqrd(theperson.x,theperson.y,theobject.x+theobject.w,theobject.y+theobject.h)
                       <=theperson.d*theperson.d*0.25){
                    applyCollisionToPO(theperson, 
                                       Math.atan((theperson.y-theobject.y-theobject.h)/(theperson.x-theobject.x-theobject.w))
                                      );
                    return true;
                }else return false;
            }
        }
        
        
        //inside the plus sign box
        if(theperson.x<theobject.x)                     applyCollisionToPO(theperson,0);
        else if(theperson.y<theobject.y)                applyCollisionToPO(theperson,Math.PI*0.5);
        else if(theperson.x>theobject.x+theobject.w)    applyCollisionToPO(theperson,Math.PI);
        else if(theperson.y>theobject.y+theobject.h)    applyCollisionToPO(theperson,Math.PI*1.5);
        else alert("uh ohs in collision detection, are we in the middle of a block?");
        
        return true;
        
        
    }
    let collidingInternals = function(boxa,boxb){
        for(let a=boxa.si;a<boxa.ei;a++)
        for(let b=boxb.si;b<boxb.ei;b++)
            if(collidingPO(peoples[a],objects[b]));
    };
    return function(){
        collidingbbBox(collidingInternals,peoples,objects,setupbbPeoples(),setupbbObjects());
    };
})();

const physicsPP = (function(){
    let coRest = 0.05;
    let applyCollisionToPP = function(p1,p2,collisionAngle){
        let sinj = Math.sin(collisionAngle);
        let cosj = Math.cos(collisionAngle);
        let impulseMag = (coRest+1)*
                         ((p1.vx-p2.vx)*cosj+(p1.vy-p2.vy)*sinj)*
                         p1.mass*p2.mass / (p1.mass+p2.mass);
        p1.vx-=impulseMag/p1.mass*cosj;
        p1.vy-=impulseMag/p1.mass*sinj;
        p2.vx+=impulseMag/p2.mass*cosj;
        p2.vy+=impulseMag/p2.mass*sinj;
        
        movebackPerson(p1);
        movebackPerson(p2);
    }
    let collidingPO = function(person1,person2){
        if(Math.min(
                distsqrd(person1.x,person1.y,person2.x,person2.y),
                distsqrd(person1.px,person1.py,person2.x,person2.y),
                distsqrd(person1.x,person1.y,person2.px,person2.py)
            )<=(person1.d+person2.d)*(person1.d+person2.d)*0.25){
            applyCollisionToPP(person1,person2,Math.atan((person1.y-person2.y)/(person1.x-person2.x)));
            return true;
        }
        else return false;
    }
    let collidingInternals = function(boxa,boxb){
        for(let a=boxa.si;a<boxa.ei;a++)
        for(let b=boxb.si;b<boxb.ei;b++)
            if(a<b&&collidingPO(peoples[a],peoples[b]));
            //a<b so objects don't collide twice, and they don't collide with themselves
    };
    return function(){
        collidingbbBox(collidingInternals,peoples,peoples,setupbbPeoples(),setupbbPeoples());
    };
})();

/////////////////////////////////////////////////////////////////////////////////////////////////////////////
//under construction ^^^^
/////////////////////////////////////////////////////////////////////////////////////////////////////////////



function updatePhysics(){
    physicsPP();
    physicsPO();
}
