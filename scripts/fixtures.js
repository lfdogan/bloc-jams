//FIXTURES.JS: A file used for holding static data, often used to supply sample data for an application.




//We've created two album objects to use in our application. In a real-world scenario, we would pull this information from a database, where we could store hundreds or thousands of albums and their corresponding details.
//Lesson 33: Add an audioUrl property to each song in the songs array of albumPicasso, and set the value to the corresponding path of the mp3. Note that we don't add the .mp3 extension to the end of the audio files. We'll specify the file type when we use the files with Buzz.
// ALBUM 01
var albumPicasso = {
    name: 'The Colors',
    artist: 'Pablo Picasso',
    label: 'Cubism',
    year: '1881',
    albumArtUrl: 'assets/images/album_covers/01.png',
    songs: [
        {name: 'Blue', length: 161.71, audioUrl: 'assets/music/bloc_jams_music/blue' },//161.71 seconds
        {name: 'Green', length: 103.96, audioUrl: 'assets/music/bloc_jams_music/green' },
        {name: 'Red', length: 268.45, audioUrl: 'assets/music/bloc_jams_music/red' },
        {name: 'Pink', length: 153.14, audioUrl: 'assets/music/bloc_jams_music/pink' },
        {name: 'Magenta', length: 374.22, audioUrl: 'assets/music/bloc_jams_music/magenta' },
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


var fixtures = [albumPicasso, albumMarconi];