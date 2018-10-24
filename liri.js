require("dotenv").config();

const keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);

var option = process.argv[2];
var argument = process.argv[3];

var helpText = "LIRI USAGE HELP: \n\n\
    $ node liri <options> <argument>\n\n\
    Options:\n\
    \tconcert-this\n\
    \tspotify-this-song\n\
    \tmovie-this\n\
    \tdo-what-it-says\n\n\
    <argument> must be quoted (i.e., \"Ace of Base\")\n"
var optHelpText = "<option requires an argument (i.e., $ liri concert-this \"Ace of Base\""
var argHelpText = "<argument> must be quoted (e.g., \"Ace of Base\", \"Eraserhead\", \"Everybody (Backstreet's Back)\")"

switch ( option ) {
    default:
        inputHelp();
        break;

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
        inputHelp();
        break;
}; // End switch

function concertThis(artist) {
    if ( typeof argument === 'undefined' ) {
        console.log(argHelpText);
        return;
    }

    console.log( 'concert-this passed with argument ' + artist);
}

function spotifyThis(artist) {
    if ( typeof argument === "undefined" ) {
        console.log(argHelpText);
        return;
    }

    console.log( 'spotify-this-song passed with argument ' + artist );
}

function movieThis(movieTitle) {
    if ( typeof argument === "undefined" ) {
        console.log(argHelpText);
        return;
    }

    console.log( 'concert-this passed with argument ' + movieTitle );
}

function doWhatItSays(whatItSays) {
    if ( typeof argument === 'undefined' ) {
        console.log(argHelpText);
        return;
    }

    console.log( 'do-what-it-says passed with argument ' + whatItSays );
}

function inputHelp(argument) {
    if ( !option && !argument )
        console.log(helpText);
    else if ( option != 'help' && !argument )
        console.log(optHelpText);
    else if ( option != 'help' && typeof argument === 'undefined' )
        console.log(argHelpText)
    else
        console.log(helpText);
}

