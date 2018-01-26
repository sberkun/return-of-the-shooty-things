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



function sortBullets(){
    //partitioned by speed>avg : speed<=avg, then sorted by bounding box
    var a=0,b=0,c=0,h = null;
    var avg = 0; for(b in bullets) avg+=bullets[b].s; avg = avg/bullets.length;
    for(a=0,b=bullets.length-1;a<b;a++){
        if(bullets[a].s>avg){ 
            while(b>=0&&bullets[b]>avg)b--; 
            if(b>=0){h=bullets[b];bullets[b]=bullets[a];bullets[a]=h;}
        }
    }
    //sort by bounding box
}
