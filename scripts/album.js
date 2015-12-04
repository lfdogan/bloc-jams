//We've created two album objects to use in our application. In a real-world scenario, we would pull this information from a database, where we could store hundreds or thousands of albums and their corresponding details.
// ALBUM 01
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        {name: 'Blue', length: '4:26'},
        {name: 'Green', length: '3:14'},
        {name: 'Red', length: '5:01'},
        {name: 'Pink', length: '3:21'},
        {name: 'Magenta', length: '2:15'}
    ]
};
// ALBUM 20
var albumMarconi = {
    name: 'The Telephone',
    artist: 'Guglielmo Marconi',
    label: 'EM',
    year: '1909',
    albumArtUrl: 'assets/images/album_covers/20.png',
    songs: [
        {name: 'Hello, Operator?', length: '1:01'},
        {name: 'Ring, ring, ring', length: '5:01'},
        {name: 'Fits in your pocket', length: '3:21'},
        {name: 'Can you hear me now?', length: '3:14'},
        {name: 'Wrong phone number', length: '2:15'},
        {name: 'Last Song', length: '6:15'}
    ]
};




// Add html to the "template" to display track#, song title, song time in 3 cells of one table row
var createSongRow = function(songNumber, songName, songLength){
    var template = 
        '<tr class="album-view-song-item">'
        //+    '<td class="song-item-number">'+songNumber+'</td>' 
        +    '<td class="song-item-number" data-song-number="'+songNumber+'">'+songNumber+'</td>'
        +    '<td class="song-item-title">'+songName+'</td>' 
        +    '<td class="song-item-duration">'+songLength+'</td>'
       + '</tr>'
    ;
    return template;
};






var setCurrentAlbum = function(album){
    //we select all of the album.html HTML elements required to display on the album page: title, artist, release info, image, and song list. We want to populate these elements with information. To do so, we assign the corresponding values of the album objects' properties to the HTML elements.
    var albumTitle = document.getElementsByClassName('album-view-title')[0]; 
    var albumArtist = document.getElementsByClassName('album-view-artist')[0]; 
    var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0]; 
    var albumImage = document.getElementsByClassName('album-cover-art')[0]; 
    var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    //the firstChild property identifies the first child node of an element, and nodeValue returns or sets the value (the text we'll see in the browser window) of a node. Alternatively, we could technically use innerHTML to insert plain text (like we did in collection.js), but it's excessive and semantically misleading in this context because we aren't adding any HTML.
    // on the first line: set the value of the 'album-view-title' element to the album's name as listed above (ex: albumPicasso.name is 'The Colors' so we would insert 'The Colors' in between the album.html tags <h2 class="album-view-title"></h2>)
    albumTitle.firstChild.nodeValue = album.name;
    albumArtist.firstChild.nodeValue = album.artist;
    albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    albumImage.setAttribute('src', album.albumArtUrl);
    // Start albumSongList to empty
    albumSongList.innerHTML = '';
    // then run a for loop to add a table row for each of the listed songs in the album by running the createSongRow function
    for (i =0; i<album.songs.length; i++){
        albumSongList.innerHTML += createSongRow(i+1, album.songs[i].name, album.songs[i].length);
    }
};








var findParentByClassName = function(element, targetClass) {
    var currentParent = element.parentElement;
    while (currentParent.className != targetClass) {
        currentParent = currentParent.parentElement;
    }
    return currentParent;
};
var getSongItem = function(element) {
    switch (element.className) {
        case 'album-song-button':
        case 'ion-play':
        case 'ion-pause': //A child, like the icon or the icon's circular container <a class="album-song-button">,<span class="ion-play">, <span class="ion-pause">
            return findParentByClassName(element, 'song-item-number');
        case 'album-view-song-item'://A parent, like the table row <tr class="album-view-song-item">
            return element.querySelector('.song-item-number');//Get the first element in the document with class="song-item-number":
        case 'song-item-title':
        case 'song-item-duration': //A child of the parent, but neither a child nor parent of .song-item-number, like the table cells with the classes .song-item-title or .song-item-duration <td class="song-item-title">, <td class="song-item-duration">
            return findParentByClassName(element, 'album-view-song-item').querySelector('.song-item-number');//finds a sibling by going to parent then down to a different child
        case 'song-item-number'://The .song-item-number element itself <td class="song-item-number
            return element;
        default:
            return;
    }
};
var clickHandler = function(targetElement){
    var songItem = getSongItem(targetElement);
    if (currentlyPlayingSong === null){
        songItem.innerHTML = pauseButtonTemplate;
        currentlyPlayingSong = songItem.getAttribute('data-song-number');
        //revert the button back to a play button if the playing song is clicked again...
    } else if (currentlyPlayingSong === songItem.getAttribute('data-song-number')){
        songItem.innerHTML = playButtonTemplate;
        currentlyPlayingSong = null;
        //If the clicked song is not the active song, set the content of the new song to the pause button...
    } else if (currentlyPlayingSong !== songItem.getAttribute('data-song-number')) {
         var currentlyPlayingSongElement = document.querySelector('[data-song-number="' + currentlyPlayingSong + '"]');
         currentlyPlayingSongElement.innerHTML = currentlyPlayingSongElement.getAttribute('data-song-number');
         songItem.innerHTML = pauseButtonTemplate;
         currentlyPlayingSong = songItem.getAttribute('data-song-number');
     }
};
var songListContainer = document.getElementsByClassName('album-view-song-list')[0];/*<table class="album-view-song-list">*/
var songRows = document.getElementsByClassName('album-view-song-item'); /*<tr class="album-view-song-item">...</tr>*/
//album button templates to change from track# to play icon
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;








//my own testing code
/*
var currentTrack = null;
var listParents = function(classname){
        console.log('RUN FUNCTION CALLED LIST-PARENTS');
        console.log("current element is");
        var element0 = event.target;
        console.log(element0); // html of current element ex: <td class="...">Blue</td>
        console.log(element0.nodeName); // TD, LI, P, A, etc.
        console.log(element0.className); // the specified class=""  
        console.log(element0.innerHTML); // what's between <nodeName> and </nodeName> 
        console.log("parent is");
        var element1 = element0.parentElement;
        console.log(element1); // html of current element ex: <td class="...">Blue</td> 
        console.log(element1.nodeName); // TR, UL, DIV, etc. 
        console.log(element1.className); // the specified class=""  
        console.log(element1.innerHTML); // what's between <nodeName> and </nodeName> 
        console.log("grandparent is");
        var element2 = element1.parentElement;
        console.log(element2); // html of current element ex: <table ...</table> 
        console.log(element2.nodeName);// HTML, TABLE, SECTION, etc. 
        console.log(element2.className); // the specified class=""  
        console.log(element2.innerHTML); // what's between <nodeName> and </nodeName> 
};
var trackNumber = 0;
var getTrackNumber = function(){
    var songRow = event.target.parentElement;
    trackNumber = songRow.children[0].innerHTML;
};
*/







window.onload = function(){
    setCurrentAlbum(albumPicasso);
    /* HOVER IN*/
    songListContainer.addEventListener('mouseover', function(event) {
        /* for a particular table row change the innerHTML from showing track# to play icon. We use the querySelector() method because we only need to return a single element with the .song-item-number class. */
        if (event.target.parentElement.className === 'album-view-song-item'){
            //console.log("previous trackNumber ("+trackNumber+") to currentPlay ("+currentPlay+")");
            //getTrackNumber();
            //if (isNaN(trackNumber)){
            //        console.log("trackNumber is NOT A NUMBER... it's the current song playing");
            //} else {
            //console.log("HOVER IN: compare trackNumber ("+trackNumber+") to currentPlay ("+currentPlay+")");
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
            var songItem = getSongItem(event.target);
            //only changes the innerHTML of the table cell when the element does not belong to the currently playing song. 
            if (songItem.getAttribute('data-song-number')!== currentlyPlayingSong){
                songItem.innerHTML = playButtonTemplate;
            }
            //}

        }
    });
    //The DOM uses the mouseleave event to signal when a mouse leaves the target element's bounds. For this event, we want to attach event listeners to each table row (instead of using event delegation) because the action of leaving a cell is not something that can be specified as easily by listening on the parent. We will select an array of every table row and loop over each to add its event listener. Select the first child element (children[0]) which is the track# cell and sett innerHTML to the track#. The getAttribute() method takes a single argument: a string with the name of the attribute whose value we want to retrieve. When the mouse leaves a selected table row, it will change back to the song number using the value obtained from this method.
    /*HOVER OUT*/
    for (i=0; i<songRows.length;i++){ 
        
        songRows[i].addEventListener('mouseleave', function(event){
            //console.log("HOVER OUT: compare trackNumber ("+trackNumber+") to currentPlay ("+currentPlay+")");
            //if (trackNumber != currentPlay){
            //this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
            var songItem = getSongItem(event.target); //cached the song item that we're leaving in a variable. Referencing getSongItem() repeatedly causes multiple queries that can hinder performance. We've done the same with the song number.
            var songItemNumber = songItem.getAttribute('data-song-number');
            if (songItemNumber !== currentlyPlayingSong){//added the conditional that checks that the item the mouse is leaving is not the current song, and we only change the content if it isn't.
                songItem.innerHTML = songItemNumber;
            }
            //console.log(event.target);/* <tr>...</tr> */
            //currentTrack = this.children[0].innerHTML;/*track#*/                
            //}        
        });
        songRows[i].addEventListener('click', function(event){
            clickHandler(event.target);
        });
    }
    
    /* my CLICK IN
    songListContainer.addEventListener('click', function(event) {
        if (event.target.parentElement.className === 'album-view-song-item'){
            event.target.parentElement.querySelector('.song-item-number').innerHTML = pauseButtonTemplate;
            currentPlay = trackNumber;
            console.log("currentPlay: "+currentPlay);
        }
    });
    */

    
};