var animDuration = 2000;
var waitOnLastFrame = 1000;
var startTime;

var beats = new URL(window.location.href).searchParams.get("beats");


let app = new PIXI.Application({
  view: document.getElementById("pixi_stage"),
  width: 230,
  forceCanvas: true,
  height: 200,
  transparent: true
});

document.body.appendChild(app.view);

const time = 5.0;

PIXI.Loader.shared.add("image_source/heartbeat.svg").load(setup);


function setup() {
  var countingText = new PIXI.Text(beats + " beats", { font: 'bold italic 60px ', fill: '#ffffff', align: 'center', stroke: '#000000', strokeThickness: 7 });

  countingText.position.x = 110;
  countingText.position.y = 80;
  countingText.anchor.x = 0.5;

  //Create the heart sprite
  let heartbeat = new PIXI.Sprite(
    PIXI.Loader.shared.resources["image_source/heartbeat.svg"].texture
  );

  heartbeat.anchor.set(0.5, 0.5);

  heartbeat.x = 120;
  heartbeat.y = 110;

  heartbeat.width = 225;
  heartbeat.height = 225;

  //Add the heart to the stage
  app.stage.addChild(heartbeat);
  app.stage.addChild(countingText);

  gsap.to(heartbeat.scale, {
    x: 1.3,
    y: 1.3,
    duration: 0.7,
    repeat: 10,
    yoyo: true
  });


}

var capturer = new CCapture({
  format: "gif",
  workersPath: "./",
  framerate: 60,
  quality: 10,
  display: true
});

capturer.start();


function animate() {
  requestAnimationFrame(animate);

  capturer.capture(document.getElementById("pixi_stage"));

  setTimeout(() => {
    capturer.stop();
    capturer.save(blob => {
      blobUtil
        .blobToBase64String(blob)
        .then(function(base64String) {
          // success
          var vid = document.createElement("img");
          vid.setAttribute("src", URL.createObjectURL(blob));
          vid.setAttribute("type", "image/gif");
          vid.setAttribute("id", "test");
          vid.innerText = base64String;
          document.body.appendChild(vid);
        })
        .catch(function(err) {
          // error
        });

    });
  }, animDuration + waitOnLastFrame);
}

animate();
