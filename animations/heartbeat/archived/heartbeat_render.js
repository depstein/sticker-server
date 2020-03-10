// document.getElementById("animation_stage").innerHTML = 
// heartbeat_svg(new URL(window.location.href).searchParams.get("option"), 
// new URL(window.location.href).searchParams.get("beats"), new URL(window.location.href).searchParams.get("goal"));

var svg_element = document.getElementById("sticker");
var gsap_animation = animation_options(svg_element, new URL(window.location.href).searchParams.get("animation"));

document.getElementById("variable").textContent = new URL(window.location.href).searchParams.get("var") + " beats";

var repeatGif = 0;


// if(new URL(window.location.href).searchParams.get("option") == "chartjunk-domain-relevant-1"){
//   var gsap_animation = chartjunk_animation_options(svg_element, (new URL(window.location.href).searchParams.get("beats") / new URL(window.location.href).searchParams.get("goal") * 100));
//   repeatGif = -1;
// }
// else {
//   var gsap_animation = animation_options(svg_element, new URL(window.location.href).searchParams.get("type"))
// }


processAnimationFrames(gsap_animation).then(gsap_animation.play(0));