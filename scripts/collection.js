// var collectionItemTemplate = //javascript. For jquery: We change the name of the variable that stores the template from collectionItemTemplate to template. Although we don't use any jQuery methods, we may later. To support that, we wrap template in a jQuery object to future-proof it. Then wrap the template in a fucntion.
var buildCollectionItemTemplate = function() {
    var template =
    '<div class="collection-album-container column fourth">'
       + '  <img src="assets/images/album_covers/01.png"/>'
       + '  <div class="collection-album-info caption">'
       + '    <p>'
       + '      <a class="album-name" href="album.html"> The Colors </a>'
       + '      <br/>'
       + '      <a href="album.html"> Pablo Picasso </a>'
       + '      <br/>'
       + '      X songs'
       + '      <br/>'
       + '    </p>'
       + '  </div>'
       + '</div>'
       ;
    return $(template);
 };



 //window.onload = function() { //javascript
 $(window).load(function() {
     // we select the first (and only, as we've designed it) element with an album-covers class name-- in the html: <section class="album-covers container clearfix">. We assign this specified element to a variable named collectionContainer.
     //var collectionContainer = document.getElementsByClassName('album-covers')[0]; //javascript
     var $collectionContainer = $('.album-covers');
     // We assign an empty string to collectionContainer's innerHTML property to clear its content. This ensures we're working with a clean slate before we insert content with JavaScript.
     //collectionContainer.innerHTML = ''; //javascript
      $collectionContainer.empty(); //jquery. it empties, or removes, any text or other elements from the element(s) it is called on.
 
     // We then create a for loop, that inserts 12 albums using the += operator, which appends content to strings. Each loop adds the contents of collectionItemTemplate (the template) to the innerHTML of collectionContainer, thereby generating the albums that display on the collection page.


     for (var i = 0; i < 12; i++) {
         //collectionContainer.innerHTML += collectionItemTemplate; //javascript
         var $newThumbnail = buildCollectionItemTemplate();
         $collectionContainer.append($newThumbnail);
     }
//} //javascript end onload function
});