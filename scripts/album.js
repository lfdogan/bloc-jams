var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';



//var currentlyPlayingSong = null; //We've used the currentlyPlayingSong variable to store the number of the current song, but we'll rename it to currentlyPlayingSongNumber to be more explicit. 
var currentAlbum = null; //holds the album object
var currentlyPlayingSongNumber = null; //track# of song currently playing. ex: "3"
var currentSongFromAlbum = null; //currently playing song object from the songs array. ex: {name: "Red", length: "5:01"}





/*updatePlayerBarSong function adds content in album.html: 
         <div class="control-group currently-playing">
             <h2 class="song-name"></h2>
             <h2 class="artist-song-mobile"></h2>
             <h3 class="artist-name"></h3>*/
var updatePlayerBarSong = function(){
    $('.song-name').text(currentSongFromAlbum.name);
    $('.artist-song-mobile').text(currentSongFromAlbum.name+' - '+currentAlbum.artist);
    $('.artist-name').text(currentAlbum.artist);
    $('.main-controls .play-pause').html(playerBarPauseButton); //song is playing so display pause button
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
        if (currentlyPlayingSongNumber !== null) {// a song is playing
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = $('.song-item-number[data-song-number="' + currentlyPlayingSongNumber + '"]');
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) { //a different song is playing
            // Switch from Play -> Pause button to indicate new song is playing.
            $(this).html(pauseButtonTemplate);
            currentlyPlayingSongNumber = songNumber;
            currentSongFromAlbum = currentAlbum.songs[songNumber - 1]; //ex: Object {name: "Green", length: "3:14"}. it comes from album object (currentAlbum)'s songs array. songNumber is the attribute ('data-song-number') on the <tr>
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) {
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton); //song stopped so display a play button
            currentlyPlayingSongNumber = null; //no track# in play
            currentSongFromAlbum = null; //no album object in play
        }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number'); //an array ex: [td.song-item-number, prevObject: n.fn.init[1], context: tr.album-view-song-item, selector: ".song-item-number"]
        var songNumber = songNumberCell.attr('data-song-number'); //the track# ex: 4
        if (Number(songNumber) !== Number(currentlyPlayingSongNumber)) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = songNumberCell.attr('data-song-number');
        if (Number(songNumber) !== Number(currentlyPlayingSongNumber)) {
            songNumberCell.html(songNumber);
        }
    };
    $row.find('.song-item-number').click(clickHandler); //jquery: find the element with the .song-item-number class that's contained in whichever row is clicked. Then run "clickHandler" when it is clicked.
    $row.hover(onHover, offHover); // combines javascript's mouseover and mouseleave functions. The first argument is a callback that executes when the user mouses over the $row element and the second is a callback executed when the mouse leaves $row.
    

    return $row; //jquery: return $row, which is created with the event listeners attached.
    
    
};






var setCurrentAlbum = function(album){ //parameter is album object
    //we select all of the album.html HTML elements required to display on the album page: title, artist, release info, image, and song list. We want to populate these elements with information. To do so, we assign the corresponding values of the album objects' properties to the HTML elements.
    currentAlbum = album; //set variable currentAlbum to the album object
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




var changeSong = function(oldTrack, newTrack){
    if (oldTrack === 0 || oldTrack === null){return;} //do nothing if no song is currently playing
    else{
        currentSongFromAlbum = currentAlbum.songs[newTrack-1]; //(Object {name: "Pink", length: "3:21"})
        currentlyPlayingSongNumber = newTrack;
        updatePlayerBarSong(); //updates the new song title in the music player bar
        var $newSongNumberCell = $('.song-item-number[data-song-number="' + newTrack + '"]');
        var $oldSongNumberCell = $('.song-item-number[data-song-number="' + oldTrack + '"]');
        $newSongNumberCell.html(pauseButtonTemplate);//'<a class="album-song-button"><span class="ion-pause"></span></a>';
        $oldSongNumberCell.html(oldTrack);//just a number
        currentSongFromAlbum = currentAlbum.songs[newTrack - 1];
    }
};


var playNextSong = function(){
    var currentTrack = Number(currentlyPlayingSongNumber);
    if (currentTrack < currentAlbum.songs.length){
        var nextSongNum = currentTrack+1;} else {nextSongNum = 1;};
    changeSong(currentTrack,nextSongNum);
    };

var playPreviousSong = function(){
    if (Number(currentlyPlayingSongNumber) !== 1){
        var prevSongNum = Number(currentlyPlayingSongNumber) - 1;} 
    else {prevSongNum = currentAlbum.songs.length;};
    changeSong(currentlyPlayingSongNumber,prevSongNum);
};














$(document).ready(function(){
    setCurrentAlbum(albumPicasso);//paramaeter is album object
    $('.previous').click(playPreviousSong);
    $('.next').click(playNextSong);

    
});