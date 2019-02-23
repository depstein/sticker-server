	// set up initial variables
  var c = document.getElementById("myCanvas");
  var ctx = c.getContext("2d");

  ctx.beginPath();
  ctx.moveTo(100,0);
  ctx.lineTo(100,200);
  ctx.stroke();

function drawCircle(x){
  ctx.beginPath();
  ctx.arc(x,100,10,0,2*Math.PI);
  ctx.fillStyle="red";
  ctx.fill();
}

var x = 0;

//ccapture setup
var capturer = new CCapture( { format: 'gif', workersPath: './', framerate: 60, quality: 1 } );

function render(){
  requestAnimationFrame(render);
  //ctx.clearRect(0,0,200,200);
  ctx.fillStyle="white";
  ctx.fillRect(0, 0, 200, 200);
  drawCircle(x%200);
  x++;
  capturer.capture( c );
}

capturer.start();

setTimeout(() => {
  capturer.stop();
  capturer.save((blob) => {
    blobUtil.blobToBase64String(blob).then(function (base64String) {
      // success
      var vid = document.createElement("gif");
      vid.setAttribute("src", URL.createObjectURL(blob));
      vid.setAttribute("type", "image/gif");
      vid.setAttribute("id", "test");
      vid.innerText = base64String;
      document.body.appendChild(vid);
    }).catch(function (err) {
      // error
    });
  });
}, 2000);
render();