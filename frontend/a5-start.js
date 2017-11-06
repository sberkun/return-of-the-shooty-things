
var UPDATEALL = function() {

    updateCanDieYetPlayer(ply);
    
    for(var b in bullets){
        if(updateCanDieYetBullet(bullets[b])){
            bullets.splice(b,1);
        }
    }
    
    drawScene();
    
};


window.setTimeout(function(){window.setInterval(UPDATEALL,15);}, 500);
