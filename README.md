
Bloc foundation lessons BlocJams
Lesson 32 jQuery: Next and Previous Buttons


NOTE: This branch contains my functions for album.js.
These work just like the code given in the lesson but are very different. I did not push this to the master branch. The master branch only contains the provided code from lesson 32.


Lesson Text:
Here are the goals of this checkpoint's code:
* We want to use the album data stored in fixtures.js to track our current song and album by storing them in variables.
* We want to match the currently playing song's object with its corresponding index in the songs array.
* When we call the next and previous functions in our application, they should increment or decrement the index of the current song in the array, respectively.


Implement the nextSong() Function

When we call the next and previous functions in our application, they should increment or decrement the index of the current song in the array, respectively.
Let's expand this requirement and be more specific. The nextSong() function should:

Know what the previous song is. This includes the situation in which the next song is the first song, following the final song in the album (that is, it should "wrap" around).
Use the trackIndex() helper function to get the index of the current song and then increment the value of the index.
Set a new current song to currentSongFromAlbum.
Update the player bar to show the new song.
Update the HTML of the previous song's .song-item-number element with a number.
Update the HTML of the new song's .song-item-number element with a pause button.
Given the details above, try to write the nextSong() function on your own, first. Consult your mentor for help if needed. Check your work against our own implementation.

