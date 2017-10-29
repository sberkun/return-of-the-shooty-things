


var mouse_control = true;
var turret_control = false;
var mouseX = 0;
var mouseY = 0;
var www = false;
var aaa = false;
var sss = false;
var ddd = false;
var zzz = false;
var xxx = false;
var cmc = false;
var cpc = false;
var clc = false;
var cuc = false;
var cdc = false;
var crc = false;
var csc = false;
var brl = false;
var brr = false;

var fireon = false;
var fireready = true;
var firetime = 0;


document.addEventListener('keydown',function(event){
    if(event.keyCode === 87){www = true;}//'w'
    if(event.keyCode === 65){aaa = true;}//'a'
    if(event.keyCode === 83){sss = true;}//'s'
    if(event.keyCode === 68){ddd = true;}//'d'
    if(event.keyCode === 90){zzz = true;}//'z'
    if(event.keyCode === 88){xxx = true;}//'x'
    if(event.keyCode ===188){cmc = true;}//','
    if(event.keyCode ===190){cpc = true;}//'.'
    if(event.keyCode === 37){clc = true;}// <
    if(event.keyCode === 38){cuc = true;}// ^
    if(event.keyCode === 40){cdc = true;}// v
    if(event.keyCode === 39){crc = true;}// >
    if(event.keyCode === 16){csc = true;}// shift
    if(event.keyCode === 66){CENTERSCREEN.zoom = true;}
         
    if(event.keyCode === 32){fireon = !fireon;}
    if(event.keyCode ===219){brl = true;}
    if(event.keyCode ===221){brr = true;}
});
document.addEventListener('keyup',function(evant){
    if(evant.keyCode === 87){www = false;}
    if(evant.keyCode === 65){aaa = false;}
    if(evant.keyCode === 83){sss = false;}
    if(evant.keyCode === 68){ddd = false;}
    if(evant.keyCode === 90){zzz = false;}
    if(evant.keyCode === 88){xxx = false;}
    if(evant.keyCode ===188){cmc = false;}
    if(evant.keyCode ===190){cpc = false;}
    if(evant.keyCode === 37){clc = false;}
    if(evant.keyCode === 38){cuc = false;}
    if(evant.keyCode === 40){cdc = false;}
    if(evant.keyCode === 39){crc = false;}
    if(evant.keyCode === 16){csc = false;}
    if(evant.keyCode === 66){CENTERSCREEN.zoom = false;}
    if(evant.keyCode ===219){brl = false;}
    if(evant.keyCode ===221){brr = false;}
});
document.addEventListener('click',function(mouseE){
  if(mouseE.clientX<CENTERSCREEN.statswidth) mouse_control = !mouse_control;
  if(mouseE.clientY<myCanvas.height/2)  turret_control = !turret_control;
});
document.addEventListener('mousemove',function(mouseE){
  mouseX = mouseE.clientX;
  mouseY = mouseE.clientY;
});


