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
  ctx.fillStyle="blue";
  ctx.fill();
}

ctx.fillStyle="white";
ctx.fillRect(0, 0, 200, 200);
drawCircle(50);

c.toBlob((blob) => {
  blobUtil.blobToBase64String(blob).then(function (base64String) {
      // success
      var img = document.createElement("img");
      img.setAttribute("src", URL.createObjectURL(blob));
      img.setAttribute("type", "img/png");
      img.setAttribute("id", "test");
      img.innerText = base64String;
      document.body.appendChild(img);
    }).catch(function (err) {
      // error
    });
});