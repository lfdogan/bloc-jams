var animatePoints = function() {/* will activate CSS transitions. it will update styles from CSS to this script. */
     var points = document.getElementsByClassName('point');
     var revealFirstPoint = function() {
         points[0].style.opacity = 1; /* opacity changes from 0 (CSS) to 1 */
         points[0].style.transform = "scaleX(1) translateY(0)"; /* scales from 90% (CSS) to 100% of width and translate to 3rem (CSS) up to normal position */
         points[0].style.msTransform = "scaleX(1) translateY(0)";
         points[0].style.WebkitTransform = "scaleX(1) translateY(0)";
     };
    var revealSecondPoint = function() {
         points[1].style.opacity = 1;
         points[1].style.transform = "scaleX(1) translateY(0)";
         points[1].style.msTransform = "scaleX(1) translateY(0)";
         points[1].style.WebkitTransform = "scaleX(1) translateY(0)";
    };
   var revealThirdPoint = function() {
         points[2].style.opacity = 1;
         points[2].style.transform = "scaleX(1) translateY(0)";
         points[2].style.msTransform = "scaleX(1) translateY(0)";
         points[2].style.WebkitTransform = "scaleX(1) translateY(0)";
    };
    revealFirstPoint();
    revealSecondPoint();
    revealThirdPoint();
};
/*animatePoints(); /* runs our script */
