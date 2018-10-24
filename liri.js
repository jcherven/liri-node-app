require("dotenv").config();

const keys = require('./keys.js');
var request = require('request');
var Spotify = require('node-spotify-api'); 
var spotify = new Spotify(keys.spotify);

var option = process.argv[2];
var argument = process.argv[3];

var optsList = [
    'concert-this',
    'spotify-this-song',
    'movie-this',
    'do-what-it-says',
    'help'
];

var helpText = "LIRI USAGE HELP: \n\n\
    $ node liri <options> <argument>\n\n\
    Options:\n\
    \tconcert-this\n\
    \tspotify-this-song\n\
    \tmovie-this\n\
    \tdo-what-it-says\n\n\
    <argument> must be quoted for predictable behavior (i.e., \"Ace of Base\")\n";

var optHelpText = "<option requires an argument (i.e., $ liri concert-this \"Ace of Base\"";
var argHelpText = "Quoted argument required with option (e.g., \"Ace of Base\", \"Eraserhead\", \"Everybody (Backstreet's Back)\")";

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
        inputHelp(argument);
        break;
}; // End switch

function concertThis(artist) {
    console.log( 'concert-this passed with argument ' + artist);
};

function spotifyThis(artist) {
    console.log( 'spotify-this-song passed with argument ' + artist );
};

function movieThis(movieTitle) {
    console.log( 'concert-this passed with argument ' + movieTitle );
};

function doWhatItSays(whatItSays) {
    console.log( 'do-what-it-says passed with argument ' + whatItSays );
};

function inputHelp(arg) {
    if ( !optsList.includes(arg) )
        console.log(helpText);
    
    else if ( optsList.includes(arg) && !arg )
        console.log(argHelpText);
};

