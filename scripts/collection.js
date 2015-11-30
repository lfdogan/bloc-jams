/* will activate CSS transitions. it will update styles from CSS to this script. */

/* creates a Node List of all elements with "point" class */
/* opacity changes from 0 (CSS) to 1 */
/* TRANSFORM scales from 90% (CSS) to 100% of width and translate to 3rem (CSS) up to normal position */
/* runs our script */

var pointsArray = document.getElementsByClassName('point');

var points = document.getElementsByClassName('point');
//var animatePoints = function(){
var animatePoints = function(points) {
var revealPoint = function(i) {
    points[i].style.opacity = 1;
    points[i].style.transform = "scaleX(1) translateY(0)";
    points[i].style.msTransform = "scaleX(1) translateY(0)";
    points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
};//end revealPoint loop

var hidePoint = function(i) {
    points[i].style.opacity = 0;
    points[i].style.transform = "scaleX(1) translateY(0)";
    points[i].style.msTransform = "scaleX(1) translateY(0)";
    points[i].style.WebkitTransform = "scaleX(1) translateY(0)";
};//end hidePoint loop

for (var i = 0; i < points.length; i++) {
    revealPoint(i);
};//end for loop

};//end animatePoints loop




 window.onload = function() {
                            /* Automatically animate the points on a tall screen (over 950px) where scrolling 
                            can't trigger the animation*/
     if (window.innerHeight > 950) {
         animatePoints(pointsArray);
     }
     var sellingPoints = document.getElementsByClassName('selling-points')[0];
                            /* We want animatePoints() to run when the client scrolls the selling points into view. 
                            The most straightforward way to do this is to determine the distance from the top of the 
                            browser window to the selling points. We will trigger the animation after the user scrolls 
                            far enough to render the selling points clearly visible. */
                            /* trigger the animation when a user scrolls at least 200 pixels into the .selling-points 
                            element. The height of all the landing page content is about 950 pixels, so any window 
                            taller than that needs an immediate animation call. Use the window's innerHeight property 
                            to detect the height of the browser when the page loads */
     var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;
                            /* addEventListener(<type of event>,<callback function>,<useCapture is optional>)  */
     window.addEventListener('scroll', function(event) {
         if (document.body.scrollTop >= scrollDistance) {
             animatePoints(pointsArray);   
         }
     /*console.log(event);  /* An event is a message that dispatches to the browser when a certain client action occurs. */
                            /* Calling getBoundingClientRect() returns an object with four properties: top, left, 
                            right, bottom. Each property measures the distance (in pixels) from the outside of a 
                            selected element to the end of the viewport (in this case, the window). */
     /*console.log("Current offset from the top is " + sellingPoints.getBoundingClientRect().top + " pixels");*/
     });
 }
