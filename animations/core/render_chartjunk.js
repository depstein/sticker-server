document.getElementById("text").textContent = new URL(
  window.location.href
).searchParams.get("value") + " " + new URL(
  window.location.href
).searchParams.get("unit");

document.getElementById("goal").textContent = new URL(
  window.location.href
).searchParams.get("goal");


d3plus
  .textwrap()
  .container(d3.select("#text"))
  .resize(true)
  .align("center")
  .valign("middle")
  .draw();

document.getElementById("text").setAttribute("transform", "translate(-25,35) rotate(-15)")

// Getting the svg element from the html page to be animated
var svg = document.querySelector("svg");

// var option = new URL(window.location.href).searchParams.get("option");


// Select type of animation based on the value of the "animation" query parameter
// options = [pulse, shake, count]
var maskPercentage = Math.floor((new URL(
  window.location.href
).searchParams.get("value") / new URL(
  window.location.href
).searchParams.get("goal")) * -100);

var gsap_animation = tl.to("#fill-mask", {duration:1, yPercent:maskPercentage, stagger:0.4})
                        .to(svg, 0.8, {
                        scaleX: 1.05,
                        scaleY: 1.05,
                        ease: Elastic.easeOut,
                        repeatDelay: 0.5,
                        repeat: 0
                        });

// if(option === "count") {
//     var repeat_mode = -1;
// }
// else if(option === "pulse" || option === "shake") {
//     var repeat_mode = 0;
// }

// Array containing img elements of animation frames to be render into an Gif
var renderedFrames = [];

// Extract frames from the GSAP animation
async function processAnimationFrames() {
  // Getting the section elements to display each frames of the animation for debugging purposes
  var list = document.querySelector("section");

  var fps = 24;
  var duration = gsap_animation.duration();
  var frames = Math.ceil((duration / 1) * fps);
  var current = 0;
  var framesLoaded = 0; // Semaphore to call renderGif() when all frames are fully loaded

  // Extract frames in the duration of the animation
  while (current <= frames) {
    gsap_animation.progress(current++ / frames);

    // Output each extracted frame into SVG blob
    var xml = new XMLSerializer().serializeToString(svg);
    var blob = new Blob([xml], { type: "image/svg+xml" });
    var img = new Image();

    img.crossOrigin = "Anonymous";
    img.onload = function() {
      // Append each frame into the <section> on the html page for debugging purposes
      // TODO: Disable when deployed for production
      list.appendChild(this);
      framesLoaded++;

      // Start rendering gif when all frames are fully loaded
      if (framesLoaded === frames) {
        renderGif();
      }
    };

    // Each extract frame gets output an img element with the SVG blob as the source
    // Gif.js accepts img elements for Gif rendering
    img.src = URL.createObjectURL(blob);
    renderedFrames.push(img);
  }
}

// Render the extracted frames from the GSAP animation into a Gif using the Gif.js library
function renderGif() {
  // Init a Gif.js object
  var gif = new GIF({
    width: 1000,
    height: 1000,
    workers: 10,
    quality: 10,
    transparent: "rgba(0,0,0,0)",
    debug: true,
    repeat: 1
  });

  // Iterate through renderedFrames to add into the Gif
  for (var i in renderedFrames) {
    gif.addFrame(renderedFrames[i], { delay: 100 });
  }

  gif.render();

  // Callback function on render completion to inject the generated Gif into the html body
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

// Runner function call for the whole process
// Process: [Getting svg, setting logic using query param] -> [Extract frames from GSAP animation] -> [Render Gif via Gif.js]
processAnimationFrames().then(gsap_animation.play());

