

var pointsArray = document.getElementsByClassName('point');




//var animatePoints = function(){
var animatePoints = function(points) {
    var revealPoint = function(index) {
        index.style.opacity = 1;
        index.style.transform = "scaleX(1) translateY(0)";
        index.style.msTransform = "scaleX(1) translateY(0)";
        index.style.WebkitTransform = "scaleX(1) translateY(0)";
    };//end revealPoint loop
    
/* ASSIGNMENT #23 SAYS TO PUT FOR LOOP IN THE UTILITIES.JS FILE IN ORDER TO CREATE MY OWN FOREACH FUNCTION
    for (var i = 0; i < points.length; i++) {
        console.log("for loop runs");
        console.log("array in:");
        console.log(points);
        console.log("array [i="+i+"] :");
        console.log(points[i]);
        revealPoint(i);
    };//end for loop
*/
    

myForEach(points,revealPoint);
    
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
     var scrollDistance = sellingPoints.getBoundingClientRect().top - window.innerHeight + 200;//50 or 100 would be better!
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
