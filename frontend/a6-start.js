
var UPDATEALL = function() {
        
    ply.update();
    //implementServerUpdate();
        
    for(var p in peoples){
        if(updateCanDieYetPlayer(peoples[p])){
            peoples.splice(p,1);
            p--;
        }
    }
    for(var b in bullets){
        if(updateCanDieYetBullet(bullets[b])){
            bullets.splice(b,1);
            b--;
        }
    }
        
    alertMe("hi");
    
    updatePhysics();
};


window.setTimeout(function(){window.setInterval(UPDATEALL,15);}, 500);
window.setTimeout(function(){window.requestAnimationFrame(drawScene);}, 500);
