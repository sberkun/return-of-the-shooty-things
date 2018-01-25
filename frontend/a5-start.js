
var UPDATEALL = function() {

    for(var p in peoples) updateCanDieYetPlayer(p);
    ply.update();
    
    for(var b in bullets){
        if(updateCanDieYetBullet(bullets[b])){
            bullets.splice(b,1);
        }
    }
    
};


window.setTimeout(function(){window.setInterval(UPDATEALL,15);}, 500);
window.setTimeout(function(){window.requestAnimationFrame(drawScene);}, 500);
