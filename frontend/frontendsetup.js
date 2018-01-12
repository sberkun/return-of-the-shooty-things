

 
const canvas = document.getElementById("myCanvas");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const DRAW = canvas.getContext("2d");
const BGcanvas = document.getElementById("BGcanvas");
  BGcanvas.width = window.innerWidth;
  BGcanvas.height = window.innerHeight;
  const BGDRAW = BGcanvas.getContext("2d");
  


function line(x1,y1,x2,y2){
  DRAW.beginPath();
  DRAW.moveTo(x1,y1);
  DRAW.lineTo(x2,y2);
  DRAW.stroke();
}
function circle(x,y,r){
  DRAW.beginPath();
  DRAW.arc(x,y,r,0,2*Math.PI);
  DRAW.fill();
  DRAW.stroke();
}
function rect(x1,y1,w,h){
  DRAW.beginPath();
  DRAW.rect(x1,y1,w,h);
  DRAW.fill();
  DRAW.stroke();
}
function distsqrd(x1,y1,x2,y2){
  return (x1-x2)*(x1-x2)+(y1-y2)*(y1-y2);
}


(function loadingScreen(){
  DRAW.fillStyle = "rgb(0,0,255)";
  DRAW.strokeStyle = "rgb(0,255,0)";
  DRAW.lineWidth = 5;
  circle(100,100,50);
  rect(100,100,200,200);
  circle(250,250,1);
  line(100,50,200,50);
  line(200,50,200,200);
  line(25,375,375,25);
  DRAW.fillStyle = "rgb(255,255,255)";
  DRAW.strokeStyle = "rgb(0,0,0)";
  DRAW.lineWidth = 1;
})();
  




  //this section of comments is a little outdated, becuase 
    //all collidable objects are circles and 
    //there are more controls
    //  \(:/)/
  
  //inspired by Tanki Online
  //move with WASD or arrow keys
  //turn your turret with ZX or ,. keys
  //turn on firing stream with spacebar
  //turn off firing stream with spacebar

  //If you're having trouble with the controls, try switching hands. So if you were using WASD to move and ., to control the turret, switch to arrow keys and ZX, or vice versa.


    
  //the square thingys are stored in the objects array
  //bullets are stored in bullets array
  //the triangle thingy has its own variable, called ply
  //
  //keyboard: 
  //when you press on a key, the variable for that key is turned on
  //when you release the key, the variable is turned off
  //except spacebar, which does its own thing
  //
  //collisions:
  //first, every object is checked with every other object to see if the distance is close enough that there might be a collision.
  //so imagine each object has a privacy bubble around it
  //if it's possible, than we check first if object A collides with B
  //so we check to see if a CORNER of A is inside of B
  //then we check if object B collides with A
  //so we check to see if a CORNER of B is inside of A
  //on contact, bullets disapear and the player is not allowed to move in that direction
  //
    
//here i explain to myself how this is supposed to work ^


