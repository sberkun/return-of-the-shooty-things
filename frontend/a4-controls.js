

document.addEventListener('keydown',function(event){
    if(event.keyCode === 87){ply.controls.www = true;}//'w'
    if(event.keyCode === 65){ply.controls.aaa = true;}//'a'
    if(event.keyCode === 83){ply.controls.sss = true;}//'s'
    if(event.keyCode === 68){ply.controls.ddd = true;}//'d'
    if(event.keyCode === 90){ply.controls.zzz = true;}//'z'
    if(event.keyCode === 88){ply.controls.xxx = true;}//'x'
    if(event.keyCode ===188){ply.controls.cmc = true;}//','
    if(event.keyCode ===190){ply.controls.cpc = true;}//'.'
    if(event.keyCode === 37){ply.controls.clc = true;}// <
    if(event.keyCode === 38){ply.controls.cuc = true;}// ^
    if(event.keyCode === 40){ply.controls.cdc = true;}// v
    if(event.keyCode === 39){ply.controls.crc = true;}// >
    if(event.keyCode === 16){ply.controls.csc = true;}// shift
    if(event.keyCode === 66){CENTERSCREEN.zoom = true;}
    if(event.keyCode === 32){ply.controls.fireon = !ply.controls.fireon;}
    if(event.keyCode ===219){ply.controls.brl = true;}
    if(event.keyCode ===221){ply.controls.brr = true;}
});
document.addEventListener('keyup',function(evant){
    if(evant.keyCode === 87){ply.controls.www = false;}
    if(evant.keyCode === 65){ply.controls.aaa = false;}
    if(evant.keyCode === 83){ply.controls.sss = false;}
    if(evant.keyCode === 68){ply.controls.ddd = false;}
    if(evant.keyCode === 90){ply.controls.zzz = false;}
    if(evant.keyCode === 88){ply.controls.xxx = false;}
    if(evant.keyCode ===188){ply.controls.cmc = false;}
    if(evant.keyCode ===190){ply.controls.cpc = false;}
    if(evant.keyCode === 37){ply.controls.clc = false;}
    if(evant.keyCode === 38){ply.controls.cuc = false;}
    if(evant.keyCode === 40){ply.controls.cdc = false;}
    if(evant.keyCode === 39){ply.controls.crc = false;}
    if(evant.keyCode === 16){ply.controls.csc = false;}
    if(evant.keyCode === 66){CENTERSCREEN.zoom = false;}
    if(evant.keyCode ===219){ply.controls.brl = false;}
    if(evant.keyCode ===221){ply.controls.brr = false;}
});
document.addEventListener('click',function(mouseE){
  if(mouseE.clientX<CENTERSCREEN.statswidth) canvas.requestPointerLock();
  if(mouseE.clientY<myCanvas.height/2)  ply.controls.turret_control = !ply.controls.turret_control;
});
document.addEventListener('pointerlockchange',function(mouseE){
    if(document.pointerLockElement === canvas) ply.controls.mouse_control = true;
    else ply.controls.mouse_control = false;
});
document.addEventListener('mousemove',function(mouseE){
  ply.controls.mouseX = mouseE.clientX;
  ply.controls.mouseY = mouseE.clientY;
  ply.controls.mousehm = mouseE.movementX;
});
document.addEventListener('mousedown',function(mouseE){
  if(mouseE.button===0) ply.controls.clm = true;
  if(mouseE.button===2) ply.controls.crm = true;
});
document.addEventListener('mouseup',function(mouseE){
  if(mouseE.button===0) ply.controls.clm = false;
  if(mouseE.button===2) ply.controls.crm = false;
});

