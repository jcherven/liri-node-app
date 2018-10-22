require("dotenv").config();
const keys = require('./keys.js');
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);

var option = process.argv[2];
var argument = process.argv[3];

switch ( option ) {
    case 'concert-this':
        concertThis(argument);
        break;

    case 'spotify-this-song':
        spotifyThis(argument);
        break;
        
    case 'movie-this':
        movieThis(argument);
        break;

    case 'do-what-it-says':
        doWhatItSays(argument);
        break;
};

function concertThis(artist) {
    console.log( 'concert-this passed' );

}

function spotifyThis(artist) {
    console.log( 'spotify-this-song passed' );

}

function movieThis(movieTitle) {
    console.log( 'concert-this passed' );
}

function doWhatItSays(whatItSays) {
    console.log( 'do-what-it-says passed' );
}