// Inject the animation into div to dynamically generate parameter
document.getElementById("animation_stage").innerHTML = 
heartbeat_svg(new URL(window.location.href).searchParams.get("option"), 
new URL(window.location.href).searchParams.get("beats"));

// Init Gif.js object
var gif = new GIF({
  width: 1000,
  height: 1000,
  workers: 1,
  quality: 20,
  transparent: "rgba(0,0,0,0)",
  debug: true
});

// GSAP Animation on sticker svg
var speed = 0.1; //seconds
var heart = document.getElementById("heart");

var gsap_animation = TweenMax.to(heart, 1, {
  scaleX: 1.2,
  scaleY: 1.3,
  ease: Elastic.easeOut,
  repeatDelay: speed
});


processImage().then((frames) => {gsap_animation.play(0);
  for(var i in frames) {
    gif.addFrame(frames[i], {delay: 100});
  }
  gif.render();
});

async function processImage() {
  var svg = document.querySelector("svg");
  var list = document.querySelector("section");

  var fps = 24;
  var duration = gsap_animation.duration();
  var frames = Math.ceil((duration / 1) * fps);
  var current = 0;

  var renderedFrames = [];

  while(current <= frames) {
    gsap_animation.progress(current++ / frames);
  
    var xml = new XMLSerializer().serializeToString(svg);
    var blob = new Blob([xml], { type: "image/svg+xml" }); 
    var img = new Image();
    img.crossOrigin = "Anonymous";
  
    img.onload = function() {
      console.log("load");
      list.appendChild(this);
    };
  
    img.src = URL.createObjectURL(blob);
    renderedFrames.push(img);
  }
  return renderedFrames;
}

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

