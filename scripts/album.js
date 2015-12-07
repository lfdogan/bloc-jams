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
    var $row = $(template);
    var clickHandler = function() {
        var songNumber = $(this).attr('data-song-number');

        if (currentlyPlayingSong !== null) {
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSong + '"]');
            currentlyPlayingCell.html(currentlyPlayingSong);
        }
        if (currentlyPlayingSong !== songNumber) {
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSong = songNumber;
        } else if (currentlyPlayingSong === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            currentlyPlayingSong = null;
        }
    };
    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');

        if (songNumber !== currentlyPlayingSong) {
            songNumberCell.html(songNumber);
        }
    };
    $row.find('.song-item-number').click(clickHandler); //jquery: find the element with the .song-item-number class that's contained in whichever row is clicked. Then run "clickHandler" when it is clicked.
    $row.hover(onHover, offHover); // combines javascript's mouseover and mouseleave functions. The first argument is a callback that executes when the user mouses over the $row element and the second is a callback executed when the mouse leaves $row.
    return $row; //jquery: return $row, which is created with the event listeners attached.
    
    
};






var setCurrentAlbum = function(album){
    //we select all of the album.html HTML elements required to display on the album page: title, artist, release info, image, and song list. We want to populate these elements with information. To do so, we assign the corresponding values of the album objects' properties to the HTML elements.
    //var albumTitle = document.getElementsByClassName('album-view-title')[0]; 
    var $albumTitle = $('.album-view-title');
    //var albumArtist = document.getElementsByClassName('album-view-artist')[0]; 
    var $albumArtist = $('.album-view-artist');
    //var albumReleaseInfo = document.getElementsByClassName('album-view-release-info')[0]; 
    var $albumReleaseInfo = $('.album-view-release-info');
    //var albumImage = document.getElementsByClassName('album-cover-art')[0]; 
    var $albumImage = $('.album-cover-art');
    //var albumSongList = document.getElementsByClassName('album-view-song-list')[0];
    var $albumSongList = $('.album-view-song-list');
    //the firstChild property identifies the first child node of an element, and nodeValue returns or sets the value (the text we'll see in the browser window) of a node. Alternatively, we could technically use innerHTML to insert plain text (like we did in collection.js), but it's excessive and semantically misleading in this context because we aren't adding any HTML.
    // on the first line: set the value of the 'album-view-title' element to the album's name as listed above (ex: albumPicasso.name is 'The Colors' so we would insert 'The Colors' in between the album.html tags <h2 class="album-view-title"></h2>)
    //albumTitle.firstChild.nodeValue = album.name;
    $albumTitle.text(album.name);// jQuery's text() method to replace the content of the text nodes, instead of setting firstChild.nodeValue. 
    //albumArtist.firstChild.nodeValue = album.artist;
    $albumArtist.text(album.artist);
    //albumReleaseInfo.firstChild.nodeValue = album.year + ' ' + album.label;
    $albumReleaseInfo.text(album.year+' '+album.label);
    //albumImage.setAttribute('src', album.albumArtUrl);
    $albumImage.attr('src',album.albumArtUrl);
    // Start albumSongList to empty
    //albumSongList.innerHTML = ''; //javascript
    $albumSongList.empty();
    // then run a for loop to add a table row for each of the listed songs in the album by running the createSongRow function
    for (i =0; i<album.songs.length; i++){
        //albumSongList.innerHTML += createSongRow(i+1, album.songs[i].name, album.songs[i].length); //javascript
        var $newRow = createSongRow(i + 1, album.songs[i].name, album.songs[i].length);
         $albumSongList.append($newRow);
    }
};






var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var currentlyPlayingSong = null;













$(document).ready(function(){
    setCurrentAlbum(albumPicasso);



    
});