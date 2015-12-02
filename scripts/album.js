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





var songListContainer = document.getElementsByClassName('album-view-song-list')[0];
var songRows = document.getElementsByClassName('album-view-song-item'); /*<tr class="album-view-song-item">...</tr>*/
//album button templates to change from track# to play icon
var playButtonTemplate = '<a class="album-song-button"><span class="ion-play"></span></a>';





window.onload = function(){
    setCurrentAlbum(albumPicasso);
    songListContainer.addEventListener('mouseover', function(event) {
        /*console.log(event.target); /* displays the current element ex: <td class="...">Blue</td> */
        /* for a particular table row change the innerHTML from showing track# to play icon. We use the querySelector() method because we only need to return a single element with the .song-item-number class. */
        if (event.target.parentElement.className === 'album-view-song-item'){
            event.target.parentElement.querySelector('.song-item-number').innerHTML = playButtonTemplate;
        }
    });
    //The DOM uses the mouseleave event to signal when a mouse leaves the target element's bounds. For this event, we want to attach event listeners to each table row (instead of using event delegation) because the action of leaving a cell is not something that can be specified as easily by listening on the parent. We will select an array of every table row and loop over each to add its event listener. Select the first child element (children[0]) which is the track# cell and sett innerHTML to the track#. The getAttribute() method takes a single argument: a string with the name of the attribute whose value we want to retrieve. When the mouse leaves a selected table row, it will change back to the song number using the value obtained from this method.
    for (i=0; i<songRows.length;i++){
        songRows[i].addEventListener('mouseleave', function(event){
            this.children[0].innerHTML = this.children[0].getAttribute('data-song-number');
        });
    }
};