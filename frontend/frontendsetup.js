
  const HOST = location.origin.replace(/^http/, 'ws');
  const WS = new WebSocket(HOST);
  var bForCCC=true;const ccc = function(mmm){if(bForCCC) bForCCC=confirm(mmm);};
  //WS.onmessage = function (event){}; //how to use

  
  const myCanvas = document.getElementById("myCanvas");
    myCanvas.width = window.innerWidth;
    myCanvas.height = window.innerHeight;
  const DRAW = myCanvas.getContext("2d");
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
  
  
  function loadingScreen(){
    DRAW.fillStyle = "rgb(0,0,255)";
    DRAW.strokeStyle = "rgb(0,255,0)";
    DRAW.lineWidth = 5;
    circle(100,100,50);
    rect(100,100,200,200);
    circle(250,250,1);
    line(100,50,200,50);
    line(200,50,200,200);
    line(25,375,375,25);
  }
  loadingScreen();
