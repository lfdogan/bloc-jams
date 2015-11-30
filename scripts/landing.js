/* will activate CSS transitions. it will update styles from CSS to this script. */

/* creates a Node List of all elements with "point" class */
/* opacity changes from 0 (CSS) to 1 */
/* TRANSFORM scales from 90% (CSS) to 100% of width and translate to 3rem (CSS) up to normal position */
/* runs our script */



var points = document.getElementsByClassName('point');

var revealPoint = function(i) {
    points[i].style.opacity = 1;
    points[i].style.transform = "scaleX(1) translateY(0)";
    points[i].style.msTransform = "scaleX(1) translateY(0)";
    points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
};

var hidePoint = function(i) {
    points[i].style.opacity = 0;
    points[i].style.transform = "scaleX(1) translateY(0)";
    points[i].style.msTransform = "scaleX(1) translateY(0)";
    points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
};

for (var i = 0; i < points.length; i++) {
    revealPoint(i);
};

