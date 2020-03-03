function animation_options(svg, param) {
  switch (param) {
    case "pulse":
      return TweenMax.to(svg, 0.8, {
        scaleX: 1.2,
        scaleY: 1.3,
        ease: Elastic.easeOut,
        repeatDelay: 0.1
      });
    case "shake":
      return TweenLite.fromTo(svg, 1,{ 
          rotation: -10 
        },
        { 
          rotation: 0, 
          ease: Elastic.easeOut.config(2, 0.2) 
    });
  }
};

function chartjunk_animation_options(svg, percentage) {
    return gsap.to("#sticker-mask", {duration:1, xPercent: percentage, stagger:0.4})
}
