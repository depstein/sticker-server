//Get URL parameters
var minutes = new URL(window.location.href).searchParams.get("m");
//console.log(minutes);

// set up initial variables
var canvas = document.getElementById("myCanvas");
var myImage = document.getElementById("myImg");
var context = canvas.getContext("2d");

var animDuration = 1000;
var waitOnLastFrame = 1000;
var startTime;


function drawClock() {
    requestAnimationFrame(drawClock);
    var currentTime = new Date;
    var elapsed = currentTime.getTime() - startTime;
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgb(0,0,0)';
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = 'rgb(255,0,0)';
    context.font = "30px Courier New";
    var minutesSofar = Math.min((1.0*elapsed)/animDuration, 1)*minutes;
    var h = (""+Math.floor(minutesSofar/60)).padStart(2, "0");
    var m = (""+Math.floor(minutesSofar%60)).padStart(2, "0");
    var s = (""+Math.floor(60*(minutesSofar%1))).padStart(2, "0");
    // draw image
    context.drawImage(myImage,0,0,canvas.width,canvas.height);
    // draw time
    context.fillText(h + ":" + m + ":" + s, 30, 50);
    capturer.capture( canvas );
}



//ccapture setup
var capturer = new CCapture( { format: 'gif', workersPath: './', framerate: 60, quality: 1 } );

capturer.start();

startTime = new Date().getTime();
drawClock();

setTimeout(() => {
  capturer.stop();
  capturer.save((blob) => {
    blobUtil.blobToBase64String(blob).then(function (base64String) {
      // success
      var vid = document.createElement("img");
      vid.setAttribute("src", URL.createObjectURL(blob));
      vid.setAttribute("type", "image/gif");
      vid.setAttribute("id", "test");
      vid.innerText = base64String;
      document.body.appendChild(vid);
    }).catch(function (err) {
      // error
    });
  });
}, animDuration+waitOnLastFrame);
