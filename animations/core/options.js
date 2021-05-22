
function animation_options(svg, param) {
    var Cont={val:0} , NewVal = VALUE;

    switch (param) {
      case "pulse":
        return TweenMax.to(svg, 0.8, {
          scaleX: 1.05,
          scaleY: 1.15,
          ease: Elastic.easeOut,
          repeatDelay: 0.1,
          onUpdate: function(){
            wrapText();
          }
        });

      case "shake":
        return TweenLite.fromTo(svg, 1,{ 
            rotation: -10,
            onUpdate: function(){
              wrapText();
            }
          },
          { 
            rotation: 0, 
            ease: Elastic.easeOut.config(2, 0.2) 
      });

      case "count":
        return TweenLite.to(Cont , 1, {
            val: NewVal, 
            roundProps: "val", 
            onUpdate: function(){
                VALUE= Cont.val;
                wrapText();
            }
        });
      case "none":
        return TweenMax.to(svg, 1, {
          scaleX: 1,
          scaleY: 1,
          onUpdate: function(){
            wrapText();
          }
        });
    }
  };