/*Lesson 23. DOM Scripting: Events Assignment
4. in the utilities.js file create a function called "forEach" It should:
    *pass in an array. Use a loop to go through all elements in the array.
    *Execute a callback for each element. For educational purposes, 
    DO NOT use the built-in Array.prototype.forEach function mentioned 
    in the callback resource. The goal is to write your own implementation.
*/


function myForEach(arrayIn, somecallbackfunction){
    for (var i = 0; i < arrayIn.length; i++){
        somecallbackfunction(arrayIn[i]);
    };
}

