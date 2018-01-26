//PHYSICS SCHEME

//Bullets are fast moving objects - therefore, their hitbox is a line between their previous location and thier current location
//people and objects are slow-moving objects. People have circular hitboxes, objects have square hitboxes.

function updateCanDieYetBullet(thebullet){
    if(thebullet.t--<0){return true;}
    thebullet.x+=thebullet.vx;
    thebullet.y+=thebullet.vy;
    return false;
};

function updateCanDieYetPlayer(theply){
    if(theply.hull.t<0) return true;
    if(theply.hull.t<theply.hull.st) theply.hull.t+=theply.hull.regen;
    theply.x+=theply.vx;
    theply.y+=theply.vy;   
};



va
