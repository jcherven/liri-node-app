require("dotenv").config();
const keys = require('./keys.js');
var request = require('request');
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

    case 'help':
        displayHelp();
        break;
}; // End switch

function concertThis(artist) {
    console.log( 'concert-this passed with argument ' + artist);

}

function spotifyThis(artist) {
    console.log( 'spotify-this-song passed with argument ' + artist );

}

function movieThis(movieTitle) {
    console.log( 'concert-this passed with argument ' + movieTitle );

}

function doWhatItSays(whatItSays) {
    console.log( 'do-what-it-says passed with argument ' + whatItSays );
    
}

