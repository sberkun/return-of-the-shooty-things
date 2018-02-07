
var UPDATEALL = function() {
    
    updatePhysics();
    
    for(var p in peoples){
        if(updateCanDieYetPlayer(peoples[p])){
            peoples.splice(p,1);
            p--;
        }
    }
    ply.update();
    
    for(var b in bullets){
        if(updateCanDieYetBullet(bullets[b])){
            bullets.splice(b,1);
            b--;
        }
    }
    
};


window.setTimeout(function(){window.setInterval(UPDATEALL,15);}, 500);
window.setTimeout(function(){window.requestAnimationFrame(drawScene);}, 500);
