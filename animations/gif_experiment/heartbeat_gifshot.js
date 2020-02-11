
document.getElementById("animation_stage").innerHTML =
  `
<svg id="heart" viewBox="0 0 216 216" width="300"
height="300" xmlns="http://www.w3.org/2000/svg">
<path d="m90 168.85a33.78 33.78 0 0 0 35 0c2.73-1.64 5.45-3.41 8.08-5.23 20-13.89 44.46-38.07 48.05-74.53a33.89 33.89 0 0 0 .46-5.52c0-.6 0-1.18 0-1.76a43.49 43.49 0 0 0 -14.51-31 45.24 45.24 0 0 0 -29.7-11.45 41.38 41.38 0 0 0 -29.88 12.73 41.64 41.64 0 0 0 -29.9-12.78c-20 0-38 13.94-42.89 33.14a45.93 45.93 0 0 0 -1.32 9.3v1.81a33.88 33.88 0 0 0 .45 5.52c4.16 42.47 36.92 68.2 56.16 79.77z" fill="#fff" />
<path d="m107.42 164.21a24.32 24.32 0 0 1 -12.56-3.49c-17.73-10.69-48-34.37-51.63-72.89a24.39 24.39 0 0 1 -.38-4.27c0-.48 0-.94 0-1.4a36.78 36.78 0 0 1 1-7.37 35.05 35.05 0 0 1 33.68-26 31.75 31.75 0 0 1 29.91 21 31.62 31.62 0 0 1 29.75-21c16.44 0 33.92 12.46 34.71 33.31v1.44a24.39 24.39 0 0 1 -.38 4.27c-3.12 33-25.67 55.19-44 68-2.45 1.71-5 3.36-7.57 4.91a24.41 24.41 0 0 1 -12.59 3.5z" fill="#ff305b" />
<path d="m137.26 50.31c16.1 0 32.47 12.46 33.21 31.87v1.38a22.37 22.37 0 0 1 -.37 4.06c-3.08 33-26.14 54.94-43.41 66.95-2.67 1.85-5.2 3.47-7.49 4.85a22.78 22.78 0 0 1 -23.6 0c-17.16-10.34-47.37-33.74-50.93-71.81a23.31 23.31 0 0 1 -.36-4.06c0-.47 0-.93 0-1.38a35.15 35.15 0 0 1 1-7c3.95-15.35 18.21-24.86 32.29-24.86a30.19 30.19 0 0 1 29.91 25.84 30.07 30.07 0 0 1 29.75-25.84m0-3a33.15 33.15 0 0 0 -29.75 18.58 33.33 33.33 0 0 0 -29.91-18.58 36.55 36.55 0 0 0 -35.13 27.11 37.73 37.73 0 0 0 -1.09 7.64v1.5a25.7 25.7 0 0 0 .36 4.44c1.64 17.28 8.72 33.37 21 47.84a129.45 129.45 0 0 0 31.35 26.16 25.78 25.78 0 0 0 26.7 0c2.59-1.56 5.16-3.23 7.65-5 18.63-13 41.49-35.44 44.68-69a26.71 26.71 0 0 0 .39-4.47c0-.51 0-1 0-1.49a35.46 35.46 0 0 0 -11.84-25.34 37.13 37.13 0 0 0 -24.37-9.42z" />
<g fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="4">
    <path d="m148.36 121.71c-.45.64-.9 1.26-1.36 1.88" stroke="#fff" />
    <path d="m155.67 109a77.35 77.35 0 0 1 -4.4 8.32" stroke="#fff" />
    <path d="m161.84 82.5c0 .33-.3 4.32-.3 4.32a68.79 68.79 0 0 1 -3.7 16.72" stroke="#fff" />
</g>
<path d="m44.35 83.56a23.31 23.31 0 0 0 .36 4.06c3.56 38.07 33.77 61.47 50.93 71.82a22.76 22.76 0 0 0 22.61.56l.26-.14c-60.64-23.81-69.39-61.27-73.14-84.71a35.15 35.15 0 0 0 -1 7c0 .48-.02.94-.02 1.41z" fill="#e62b52" />
<ellipse cx="147.55" cy="67.82" fill="#f1f1f1" rx="6.68" ry="14.35" transform="matrix(.56049446 -.82815817 .82815817 .56049446 8.68 152)" />
<text id="beats_field" font-family="JandaManateeSolid, Janda Manatee Solid" font-size="22.13" stroke="#fff" stroke-miterlimit="10" transform="matrix(.98852027 -.15108829 .15108829 .98852027 60.63 112.43)">
    ` +
  new URL(window.location.href).searchParams.get("beats") +
  ` beats
    <tspan font-size="17.54">
        <tspan x="6.19" y="18.38">per</tspan>
        <tspan font-size="10.02" x="33.15" y="18.38"></tspan>
        <tspan x="37.06" y="18.38">minute</tspan>
    </tspan>
</text>
</svg>
`;

var gif = new GIF({
  width: 500,
  height: 500,
  workers: 5,
  quality: 10,
  transparent: 'rgba(0,0,0,0)'
});

var speed = 0.1; //seconds
var heart = document.getElementById("heart");

var anime = TweenMax.to(heart, 1, {
  scaleX: 1.2,
  scaleY: 1.3,
  ease: Elastic.easeOut,
  repeat: -1,
  repeatDelay: speed
});

// var anime = TweenMax.to(heart, 1, { rotation: 360 });

var svg = document.querySelector("svg");
var list = document.querySelector("section");

//   TweenLite.set(".path", { drawSVG: 0 });

//   var animation = TweenMax.to(".path", 0.5, {
//     drawSVG: true,
//     paused: true,
//     repeat: -1,
//     yoyo: true
//   });

var fps = 24;
var duration = anime.duration();
var frames = Math.ceil((duration / 1) * fps);
var current = 0;

var renderedFrames = [];

processImage();

function processImage() {
  anime.progress(current++ / frames);

  var xml = new XMLSerializer().serializeToString(svg);
  var blob = new Blob([xml], { type: "image/svg+xml" });
  var img = new Image();

  const canvas = document.querySelector("canvas");
  const ctx = canvas.getContext("2d");

  v = canvg.Canvg.fromString(ctx, xml);

  // Start SVG rendering with animations and mouse handling.
  v.start();
  var blob2 = new Blob([canvas.toDataURL("image/png")], { type: "image/png" });

  img.crossOrigin = "Anonymous";
  img.onload = function() {
    list.appendChild(this);
  };

  // img.src = URL.createObjectURL(blob);
  img.src = canvas.toDataURL("image/png");
  gif.addFrame(img, {delay: 50});
  // gif.addFrame(img);
  // renderedFrames.push(img.src);
  var reader = new FileReader();

  // renderedFrames.push(img.src);

  function getBase64(b, callback) {
    var reader = new FileReader();
    reader.readAsDataURL(b);
    reader.onloadend = function() {
      var base64data = reader.result;
      // console.log(base64data);
      callback(base64data);
    };
  }

  // renderedFrames.push(img.src);

  getBase64(blob, b64 => {
    var oneImage = new Image();
    oneImage.src = b64;
    renderedFrames.push(oneImage.src);
  });

  if (current <= frames) {
    processImage();
  } else {
    anime.play(0);
  }
}

console.log(renderedFrames);

gif.on("finished", function(blob) {
  console.log(URL.createObjectURL(blob));
  window.open(URL.createObjectURL(blob));
});

gif.render();

gifshot.createGIF(
  {
    images: renderedFrames
  },
  function(obj) {
    if (!obj.error) {
      var image = obj.image,
        animatedImage = document.createElement("img");
      animatedImage.src = image;
      animatedImage.id = "gifExport";
      document.body.appendChild(animatedImage);
    }
  }
);
