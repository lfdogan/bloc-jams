

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

//MY NEW ALBUM
var albumHeadFull = {
    name: 'A Head Full of Dreams',
    artist: 'Coldplay',
    label: 'Parlophone',
    year: '2015',
    albumArtUrl: 'http://cps-static.rovicorp.com/3/JPG_400/MI0003/975/MI0003975386.jpg?partner=allrovi.com',
    songs: [
        {name: 'A Head Full of Dreams', length: '1:01'},
        {name: 'Birds', length: '5:01'},
        {name: 'Hymn for the Weekend', length: '3:21'},
        {name: 'Everglow', length: '3:14'},
        {name: 'Adventure of a Lifetime', length: '2:15'},
        {name: 'Fun', length: '6:15'},
        {name: 'Kaleidoscope', length: '6:15'},
        {name: 'Army of One', length: '6:15'},
        {name: 'Amazing Day', length: '6:15'},
        {name: 'Colour Spectrum', length: '6:15'},
        {name: 'Up & Up', length: '6:15'}
    ]
};

var allAlbums = [albumPicasso, albumMarconi, albumHeadFull];












// Add html to the "template" to display track#, song title, song time in 3 cells of one table row
var createSongRow = function(songNumber, songName, songLength){
    var template = 
        '<tr class="album-view-song-item">'
        +    '<td class="song-item-number">'+songNumber+'</td>' 
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

window.onload = function(){
    setCurrentAlbum(allAlbums[0]);
};

    //Asignment 25: Add an event listener to the album cover. When a user clicks it, the album page content should toggle between the three album objects: albumPicasso, albumMarconi, and your album object.
var viewAlbum = 0;
    var toggleAlbums = function(){
    if (viewAlbum+1 === allAlbums.length ) {
        viewAlbum=0;}
    else {viewAlbum++;}
    setCurrentAlbum(allAlbums[viewAlbum]);
};
document.getElementsByClassName('album-cover-art')[0].addEventListener("click",toggleAlbums);
