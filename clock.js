/** 
 * function to get a Date object given a specific
 * UTC offset
 */

 //CODEPEN CODE 
function newDateWithTimezone(offset) {
    // create Date object for current location
    var d = new Date();

    // convert to msec
    // add local time zone offset
    // get UTC time in msec
    var utc = d.getTime() + (d.getTimezoneOffset() * 60000); 
    //getTimezoneOffset get time zone difference in minutes

   
    return new Date(utc + (3600000*offset));
}

var usr_color = 160; //Change value to change color scheme

window.requestAnimFrame = (function(){
  return  window.requestAnimationFrame || 
    window.webkitRequestAnimationFrame || 
    window.mozRequestAnimationFrame    || 
    window.oRequestAnimationFrame      || 
    window.msRequestAnimationFrame     ||  
    function( callback ){
    window.setTimeout(callback, 1000 / 60);
  };
})();

var canvas = document.getElementsByTagName("canvas")[0];
var ctx = canvas.getContext("2d");

var w = 600, h = 600;
canvas.width = w;
canvas.height = h;

var arcs = [];

function init(){
  console.log("init called");
  reset();
  arcs = [];
  var m = new arc();
  m.class = "month";
  arcs.push(m);
  
  var d = new arc();
  d.class = "date";
  d.r = 135;
  arcs.push(d);
  
  var d = new arc();
  d.class = "day";
  d.r = 170;
  arcs.push(d);
  
  var h = new arc();
  h.class = "hours";
  h.r = 205;
  arcs.push(h);
  
  var m = new arc();
  m.class = "mins";
  m.r = 240;
  arcs.push(m);
  
  var s = new arc();
  s.class = "secs";
  s.r = 275;
  arcs.push(s);
}

function arc(){
  this.class = "month";
  this.r = 100;
  this.rot = 1;
  
  this.draw = function(){
    ctx.beginPath();
    ctx.arc(300,300,this.r,(Math.PI/(2/3)),this.rot,false);
    ctx.lineWidth = 30;
    ctx.strokeStyle = "hsla("+(this.rot*(180/Math.PI)+usr_color)+",60%,50%,1)";
    ctx.stroke();
    
    ctx.save();
    ctx.fillStyle = "#333";
    ctx.translate(300, 300);
    ctx.rotate(this.rot);
    ctx.font="14px Arial Rounded MT Bold";
    if(this.class == "secs"){
      var d = newDateWithTimezone(+11);
      ctx.fillText(d.getSeconds(), 267, -5);
    }
    else if(this.class == "mins"){
      var d = newDateWithTimezone(+11);
      ctx.fillText(d.getMinutes(), 233, -5);
    }
    else if(this.class == "hours"){
      var d = newDateWithTimezone(+11);
      ctx.fillText(d.getHours(), 197, -5);
    }
    else if(this.class == "day"){
      var d = newDateWithTimezone(+11);
      var day = d.getDay();
      if(day == 0){
        var day = "Sun"
      }
      else if(day == 1){
        var day = "Mon"
      }
      else if(day == 2){
        var day = "Tue"
      }
      else if(day == 3){
        var day = "Wed"
      }
      else if(day == 4){
        var day = "Thu"
      }
      else if(day == 5){
        var day = "Fri"
      }
      else if(day == 6){
        var day = "Sat"
      }
      ctx.fillText(day, 158, -5);
    }
    else if(this.class == "date"){
      var d = newDateWithTimezone(+11);
      ctx.fillText(d.getDate(), 127, -5);
    }
    else if(this.class == "month"){
      var d = newDateWithTimezone(+11);
      ctx.fillText(d.getMonth()+1, 97, -5);
    }
    ctx.restore();
  }
}

function reset(){
  ctx.fillStyle = "#333";
  ctx.fillRect(0,0,w,h);
}

function draw(){
  reset();
  ctx.fillStyle = "rgba(255,255,255,0.5)";
  ctx.font = "12px Arial"
  ctx.fillText("seconds", 250, 27);
  ctx.fillText("minutes", 252, 63);
  ctx.fillText("hours", 264, 98);
  ctx.fillText("day", 274, 134);
  ctx.fillText("date", 270, 168);
  ctx.fillText("month", 260, 203);
  
  for(var i=0;i<arcs.length;i++){
    var a = arcs[i];
    var d = newDateWithTimezone(+11);
    if(a.class == "month"){
      var n = d.getMonth()+1;
      a.rot = (n/12)*(Math.PI*2) - (Math.PI/2);
    }
    else if(a.class == "date"){
      var n = d.getDate();
      a.rot = (n/31)*(Math.PI*2) - (Math.PI/2);
    }
    else if(a.class == "day"){
      var n = d.getDay();
      a.rot = (n/7)*(Math.PI*2) - (Math.PI/2);
    }
    else if(a.class == "hours"){
      var n = d.getHours();
      var m = d.getMinutes();
      a.rot = ((n/12)*(Math.PI*2) - (Math.PI/2)) + ((m/3600)*(Math.PI*2));
    }
    else if(a.class == "mins"){
      var n = d.getMinutes();
      var s = d.getSeconds();
      a.rot = ((n/60)*(Math.PI*2) - (Math.PI/2)) + ((s/3600)*(Math.PI*2));
    }
    else if(a.class == "secs"){
      var n = d.getSeconds();
      var m = d.getMilliseconds();
      a.rot = ((n/60)*(Math.PI*2) - (Math.PI/2)) + ((m/60000)*(Math.PI*2));
    }
    a.draw();
  }
}

function animloop() {
  draw();
  requestAnimFrame(animloop); 
}

document.addEventListener('DOMContentLoaded', function () {
  init();
  animloop();
}, false);

//CODEPEN CODE 

function clock() {

var tday=new Array("Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday");
var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var time = new Date(),
    hours = time.getHours(),
    minutes = time.getMinutes(),
    seconds = time.getSeconds(),
    month = time.getMonth(),
    date = time.getDate(),
    day = time.getDay();

document.querySelectorAll('.clock')[0].innerHTML =  pclock(tday[day]) + ", " + pclock(tmonth[month]) + " " + pclock(date) + " " + pclock(hours) + ":" + pclock(minutes) + ":" + pclock(seconds) + " PST";
  
  function pclock(standIn) {
    if (standIn < 10) {
      standIn = '0' + standIn
    }
    return standIn;
  }
}

clock();

setInterval(clock, 1000);
