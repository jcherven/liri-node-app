require("dotenv").config();


const keys = require('./keys.js');
var colors = require('colors');
var request = require('request-json');
var client = request.createClient('http://localhost:8888/');
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
    var bandsApiErrorText = "There was a little problem getting your concert info.\nPlease try again later, or try a different artist."
    artist = artist.split(' ').join('+');
    var bandsApiQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    client.get(bandsApiQuery, function(error, response, body) {
        if ( typeof body === "undefined" || error || response.statusCode != 200 ) {
            console.log(bandsApiErrorText);
        }
        var isLocal = true;
        var artistName = body[0].lineup[0];
        var venueLocal = body[0].venue.name + " in " + body[0].venue.city + ', ' + body[0].venue.region;
        var venueIntl = body[0].venue.name + " in " + body[0].venue.city + ', ' + body[0].venue.country;
        var date = body[0].datetime;

        // Check if the show is local or international
        if ( body[0].venue.region === "" )
            isLocal = false;

        // Render the name of the venue, location, and date of the event in MM/DD/YYYY
        console.log("\nThe next " + artistName.cyan.bold +  " show's info is:");
        console.log("On: " + date.yellow.bold);
        if ( isLocal )
            console.log("At: " + venueLocal.magenta.bold + "\n");
        else
            console.log("At: " + venueIntl.magenta.bold + "\n");
    })

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
