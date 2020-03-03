document.getElementById("animation_stage").innerHTML = 
heartbeat_svg(new URL(window.location.href).searchParams.get("option"), 
new URL(window.location.href).searchParams.get("beats"), new URL(window.location.href).searchParams.get("goal"));

var svg_element = document.getElementById("heart")

var repeatGif = 0;
var renderedFrames = [];

if(new URL(window.location.href).searchParams.get("option") == "chartjunk-domain-relevant-1"){
  var gsap_animation = chartjunk_animation_options(svg_element, (new URL(window.location.href).searchParams.get("beats") / new URL(window.location.href).searchParams.get("goal") * 100));
  repeatGif = -1;
}
else {
  var gsap_animation = animation_options(svg_element, new URL(window.location.href).searchParams.get("type"))
}

function renderGif() {
  // Init Gif.js object
  var gif = new GIF({
    width: 1000,
    height: 1000,
    workers: 6,
    quality: 20,
    transparent: "rgba(0,0,0,0)",
    debug: true,
    repeat: repeatGif
  });

  for(var i in renderedFrames) {
    gif.addFrame(renderedFrames[i], {delay: 100});
  }
  gif.render();

  gif.on("finished", function(blob) {
    console.log(URL.createObjectURL(blob));
    blobUtil.blobToBase64String(blob).then(function(base64String) {
      var animatedImage = document.createElement("img");
      animatedImage.src = URL.createObjectURL(blob);
      animatedImage.setAttribute("type", "image/gif");
      animatedImage.setAttribute("id", "test");
      animatedImage.innerText = base64String;
      document.body.appendChild(animatedImage);
    });
  });
  
}

async function processImage() {
  var svg = document.querySelector("svg");
  var list = document.querySelector("section");

  var fps = 24;
  var duration = gsap_animation.duration();
  var frames = Math.ceil((duration / 1) * fps);
  var current = 0;
  var framesLoaded = 0;

  while(current <= frames) {
    gsap_animation.progress(current++ / frames);
  
    var xml = new XMLSerializer().serializeToString(svg);
    var blob = new Blob([xml], { type: "image/svg+xml" }); 
    var img = new Image();
    img.crossOrigin = "Anonymous";
  
    img.onload = function() {
      list.appendChild(this);
      framesLoaded++;
      if(framesLoaded === frames){
        renderGif();
      }
    };
  
    img.src = URL.createObjectURL(blob);
    renderedFrames.push(img);
  }
}

processImage().then(gsap_animation.play(0));
