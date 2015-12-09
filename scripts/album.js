var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';
var pauseButtonTemplate = '<a class="album-song-button"><span class="ion-pause"></span></a>';
var playerBarPlayButton = '<span class="ion-play"></span>';
var playerBarPauseButton = '<span class="ion-pause"></span>';



//var currentlyPlayingSong = null; //We've used the currentlyPlayingSong variable to store the number of the current song, but we'll rename it to currentlyPlayingSongNumber to be more explicit. 
var currentAlbum = null; //holds the album object
var currentlyPlayingSongNumber = null; //track# of song currently playing. ex: "3"
var currentSongFromAlbum = null; //currently playing song object from the songs array. ex: {name: "Red", length: "5:01"}
var $previousButton = $('.main-controls .previous');
var $nextButton = $('.main-controls .next');
var currentSoundFile = null; // sound object
var currentVolume = 80; //1-100



//convert total number of seconds to H:MM:SS or M:SS
var convertTime = function (totalSecondsString){
    totalSeconds = Number(totalSecondsString);
    hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    if (seconds < 10) {seconds = "0"+seconds;}
    if (hours > 0){
        if (minutes < 10) {minutes = "0"+minutes;}
        if (hours   < 10) {hours   = "0"+hours;}
        return hours+":"+minutes+":"+Math.round(seconds);
    } else 
    return minutes+":"+Math.round(seconds); //displays: 161.71= 2:41.7100000000001
};



//assignment32: Create a setSong function that takes one argument, songNumber, and assigns currentlyPlayingSongNumber and currentSongFromAlbum a new value based on the new song number. 
var setSong = function(songNumber){
    currentlyPlayingSongNumber = Number(songNumber);
    currentSongFromAlbum = currentAlbum.songs[songNumber-1];
    //assign a new Buzz sound object that passes audioUrl and settings object
    currentSoundFile = new buzz.sound(currentSongFromAlbum.audioUrl, {
         formats: [ 'mp3' ], //array of strings with acceptable audio formats
         preload: true       //we want the music files loaded as soon as the page loads
     });
    setVolume(currentVolume);// WHY IS THIS HERE? IT ISN'T GIVEN A NEW VOLUME VALUE AND WE DON'T NEED TO RECREATE BUZZ'S SET.VOLUME METHOD ANYWAY
};
var getSongNumberCell= function(number){
    return $('.song-item-number[data-song-number="' + number + '"]');
};
 var setVolume = function(volume) {// WHY IS THIS HERE? IT ISN'T GIVEN A NEW VOLUME VALUE AND WE DON'T NEED TO RECREATE BUZZ'S SET.VOLUME METHOD ANYWAY
     if (currentSoundFile) {
         currentSoundFile.setVolume(volume);// buzz method is sound.setVolume( volume ) with a range of 0-100
     }
 };




/*updatePlayerBarSong function adds content in album.html: 
         <div class="control-group currently-playing">
             <h2 class="song-name"></h2>
             <h2 class="artist-song-mobile"></h2>
             <h3 class="artist-name"></h3>*/
var updatePlayerBarSong = function(){
    $('.song-name').text(currentSongFromAlbum.name);
    $('.artist-song-mobile').text(currentSongFromAlbum.name+' - '+currentAlbum.artist);
    $('.artist-name').text(currentAlbum.artist);
    $('.currently-playing .total-time').text(convertTime(currentSongFromAlbum.length));
    $('.main-controls .play-pause').html(playerBarPauseButton); //song is playing so display pause button
};











//generic method to update any seek bar
// takes two arguments: 1) which seek bar to alter 2) ratio to determine the width and left values of .fill (current song status or current volume level) and .thumb (small circle) classes
// convert ratio argument into percentage in order to set CSS property value
// pass percentage into jquery functions
 var updateSeekPercentage = function($seekBar, seekBarFillRatio) {
    var offsetXPercent = seekBarFillRatio * 100;
    offsetXPercent = Math.max(0, offsetXPercent); //built-in JavaScript Math.max() function makes 
                                                    // sure our % isn't less than zero
    offsetXPercent = Math.min(100, offsetXPercent); //Math.min() function make sures % doesn't exceed 100.
 
    var percentageString = offsetXPercent + '%'; //convert % to string
    $seekBar.find('.fill').width(percentageString); //set current bar width
    $seekBar.find('.thumb').css({left: percentageString}); //set circle location from left of bar
 };







 var setupSeekBars = function() {
     var $seekBars = $('.player-bar .seek-bar'); //both status bars
     $seekBars.click(function(event) {
         // pageX is a jQuery-specific event value, which holds the X (or horizontal) coordinate at which the event occurred (think of the X-Y coordinate plane from Algebra class). PageX gives us the location from the left side of the page (event.pageX) so we need to subtract the distance from the left side of the page to the left side of the status bar ($(this).offset().left;) to get the relative distance from the start of the status bar
         var offsetX = event.pageX - $(this).offset().left;
         var barWidth = $(this).width(); //width of full status bar
         var seekBarFillRatio = offsetX / barWidth; // current location divided by total bar width 
                                                    //  gives the ratio between 0 ad 1. ex: 0.45 is 45%
         updateSeekPercentage($(this), seekBarFillRatio); //run function. send current status bar clicked with decimal ratio
     });
     
     $seekBars.find('.thumb').mousedown(function(event) {// when user clicks down the mouse button on the circle
         var $seekBar = $(this).parent();   //$(this)=<div class="thumb">=circle, parent of circle is <div class="seek-bar"> 
         // #8
         $(document).bind('mousemove.thumb', function(event){// bind() takes a string of an event (mouse drag of the circle). Adding $(document) allows us to drag mouse above/below the status bar while continuing to move circle
             var offsetX = event.pageX - $seekBar.offset().left;
             var barWidth = $seekBar.width(); // c
             var seekBarFillRatio = offsetX / barWidth;

             updateSeekPercentage($seekBar, seekBarFillRatio);
         });

         // #9
         $(document).bind('mouseup.thumb', function() {
             $(document).unbind('mousemove.thumb');
             $(document).unbind('mouseup.thumb');
         });
     });
 };














// Add html to the "template" to display track#, song title, song time (in total number of seconds) in 3 cells of one table row
var createSongRow = function(songNumber, songName, songLength){
    var displaySongLength = convertTime(songLength);
    var template = 
        '<tr class="album-view-song-item">'
        //+    '<td class="song-item-number">'+songNumber+'</td>' 
        +    '<td class="song-item-number" data-song-number="'+songNumber+'">'+songNumber+'</td>'
        +    '<td class="song-item-title">'+songName+'</td>' 
        +    '<td class="song-item-duration">'+displaySongLength+'</td>'
       + '</tr>'
    ;
    var $row = $(template);
    var clickHandler = function() {
        //var songNumber = $(this).attr('data-song-number');
        var songNumber = parseInt($(this).attr('data-song-number')); //Use the parseInt() function to convert 
                                                                    //all song number references to integers. Wrap 
                                                                    //every variable assignment involving a song 
                                                                    //number in a parseInt() call.
        if (currentlyPlayingSongNumber !== null) {// a song is playing
            // Revert to song number for currently playing song because user started playing new song.
            var currentlyPlayingCell = getSongNumberCell(currentlyPlayingSongNumber);
            currentlyPlayingCell.html(currentlyPlayingSongNumber);
        }
        if (currentlyPlayingSongNumber !== songNumber) { //click a different song than is playing
            // Switch from Play -> Pause button to indicate new song is playing.
            if (currentSoundFile !== null) {currentSoundFile.stop();}; //stop playing current sound file
            $(this).html(pauseButtonTemplate);
            setSong(songNumber); //ex: Object {name: "Green", length: "3:14"}. it comes from album 
                                    //object (currentAlbum)'s songs array. songNumber is the attribute
                                    //('data-song-number') on the <tr>
            currentSoundFile.play();
            updatePlayerBarSong();
        } else if (currentlyPlayingSongNumber === songNumber) { //click pause button on currently playing song
            // Switch from Pause -> Play button to pause currently playing song.
            $(this).html(playButtonTemplate);
            $('.main-controls .play-pause').html(playerBarPlayButton); //song stopped so display a play button
            if ( currentSoundFile.isPaused() ) {//song is paused so begin play
                currentSoundFile.play();//could also use togglePlay();
                $(this).html(pauseButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPauseButton);
            } else {//song is not paused, so pause song
                currentSoundFile.pause();
                $(this).html(playButtonTemplate);
                $('.main-controls .play-pause').html(playerBarPlayButton);
            }
            //currentlyPlayingSongNumber = null; //no track# in play
            //currentSongFromAlbum = null; //no album object in play
        }
    };

    var onHover = function(event) {
        var songNumberCell = $(this).find('.song-item-number'); //an array ex: [td.song-item-number, prevObject: n.fn.init[1], context: tr.album-view-song-item, selector: ".song-item-number"]
        var songNumber = parseInt(songNumberCell.attr('data-song-number')); //the track# ex: 4
        if (songNumber !== currentlyPlayingSongNumber) {
            songNumberCell.html(playButtonTemplate);
        }
    };
    var offHover = function(event) {
        //console.log("songNumber type is " + typeof songNumber + "\n and currentlyPlayingSongNumber type is " + typeof currentlyPlayingSongNumber); // type is OBJECT
        var songNumberCell = $(this).find('.song-item-number');
        var songNumber = parseInt(songNumberCell.attr('data-song-number'));
        if (songNumber !== currentlyPlayingSongNumber) {
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


//The indexOf() method returns the first index at which a given element can be found in the array, or -1 if it is not present. Example: "var array = [2, 9, 9]; array.indexOf(2);" result is 0 since '2' is at index 0.
//trackIndex(currentAlbum, currentSongFromAlbum);
//  takes the album object and the current song object 
// ex: {name: "Red", length: "5:01"} returns 2 which is the array index... album.songs[2]
var trackIndex = function(album, song){
    return album.songs.indexOf(song);
};
var nextSong = function() {
    currentSoundFile.stop();
    var getLastSongNumber = function(index) {//IF CURRENT TRACK# IS 0 RETURN #SONGS ELSE RETURN TRACK#
        return index == 0 ? currentAlbum.songs.length : index;
        //above is shorthand for.... if(index == 0) {return currentAlbum.songs.length } else {return index}
    };
    
    
    // STEP 1:  GET CURRENT INDEX# THEN ADD ONE FOR CURRENT TRACK#
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _incrementing_ the song here
    currentSongIndex++;


    //STEP 2: IF CURRENT TRACK NUMBER IS ALBUM'S LAST TRACK NUMBER THEN CHANGE IT TO ZERO
    if (currentSongIndex >= currentAlbum.songs.length) {
        currentSongIndex = 0;
    }
    
    //STEP 3: INCREMENT currentlyPlayingSongNumber AND CHANGE SONG OBJECT ex: {name: "Red", length: "5:01"}
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    //STEP 4: CHANGE MUCIS PLAYER BAR SONG TITLE
    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    $('.currently-playing .total-time').text(convertTime(currentSongFromAlbum.length));
    
    
    //STEP 5: RUN getLastSongNumber FUNCTION PASSING IN CURRENT TRACK# AS INDEX RETURNING ACTUAL TRACK#
    //STEP 5 ACTUALLY CANCELS OUT STEP 2!!
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $nextSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $nextSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
    setSong(currentlyPlayingSongNumber);
    currentSoundFile.play();
    
};
var previousSong = function() {
    currentSoundFile.stop();
    // Note the difference between this implementation and the one in
    // nextSong()
    var getLastSongNumber = function(index) {
        return index == (currentAlbum.songs.length - 1) ? 1 : index + 2;
    };
    
    var currentSongIndex = trackIndex(currentAlbum, currentSongFromAlbum);
    // Note that we're _decrementing_ the index here
    currentSongIndex--;
    
    if (currentSongIndex < 0) {
        currentSongIndex = currentAlbum.songs.length - 1;
    }
    
    // Set a new current song
    currentlyPlayingSongNumber = currentSongIndex + 1;
    currentSongFromAlbum = currentAlbum.songs[currentSongIndex];

    // Update the Player Bar information
    $('.currently-playing .song-name').text(currentSongFromAlbum.name);
    $('.currently-playing .artist-name').text(currentAlbum.artist);
    $('.currently-playing .artist-song-mobile').text(currentSongFromAlbum.name + " - " + currentAlbum.name);
    $('.main-controls .play-pause').html(playerBarPauseButton);
    $('.currently-playing .total-time').text(convertTime(currentSongFromAlbum.length))
    
    var lastSongNumber = getLastSongNumber(currentSongIndex);
    var $previousSongNumberCell = getSongNumberCell(currentlyPlayingSongNumber);
    var $lastSongNumberCell = getSongNumberCell(lastSongNumber);
    
    $previousSongNumberCell.html(pauseButtonTemplate);
    $lastSongNumberCell.html(lastSongNumber);
    
    setSong(currentlyPlayingSongNumber);
    currentSoundFile.play();
};










$(document).ready(function(){
    setCurrentAlbum(albumPicasso);//paramaeter is album object
    setupSeekBars();
    $previousButton.click(previousSong);
    $nextButton.click(nextSong);    
});