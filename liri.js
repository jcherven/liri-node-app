require("dotenv").config();


const keys = require('./keys.js');
var moment = require('moment');
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

var helpText = "\nLIRI USAGE HELP: \n\n\
    $ node liri <options> <argument>\n\n\
    Options:\n\
    \tconcert-this\n\
    \tspotify-this-song\n\
    \tmovie-this\n\
    \tdo-what-it-says\n\n\
    <argument> must be quoted for predictable behavior (i.e., \"Ace of Base\")\n";

var argHelpText = "\nQuoted argument required with this option (e.g., \"Ace of Base\", \"Eraserhead\", \"Everybody (Backstreet's Back)\")\n";

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
    // Missing argument handling
    if ( artist == null ) {
        console.log(argHelpText.green);
        return;
    };

var bandsApiErrorText = "\nThere was a little problem getting your concert info.\nThat artist might not have any shows booked, or the service isn't working right now. Maybe try a different artist, or try again later.\n"

    // Format user's search for use in query string
    artist = artist.split(' ').join('+');
    
    var bandsApiQuery = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    // Bandsintown API request and response
    client.get(bandsApiQuery, function(error, response, body) {
        if ( body.length === 0 || error || response.statusCode != 200 ) {
            console.log(bandsApiErrorText.green);
            return;
        };

        var isLocal = true;
        var artistName = body[0].lineup[0];
        var venueLocal = body[0].venue.name + " in " + body[0].venue.city + ', ' + body[0].venue.region;
        var venueIntl = body[0].venue.name + " in " + body[0].venue.city + ', ' + body[0].venue.country;
        var date =  moment(body[0].datetime).format("MM/DD/YYYY");

        // Check if the show is local or international
        if ( body[0].venue.region === "" )
            isLocal = false;

        // Render the name of the venue, location, and date of the event in MM/DD/YYYY
        console.log("\nThe next " + artistName.cyan.bold +  " show is:");
        console.log("\tOn: " + date.yellow.bold);
        if ( isLocal )
            console.log("\tAt: " + venueLocal.magenta.bold + "\n");
        else if ( !isLocal )
            console.log("\tAt: " + venueIntl.magenta.bold + "\n");
    }); // End client.get()

}; // End concertThis() definition

function spotifyThis(artist) {
    // show Artist, song title, album title, song preview link
    // default with no opt is "The Sign" by Ace of Base
};

function movieThis(movieTitle) {
    // show title, year, IMDB rating, RT rating, country, language, plot, and actors
    // default with no opt is "Mr. Nobody"

    // Missing argument handling
    if ( !movieTitle ) {
        movieTitle = "Mr. Nobody";
    }

    var movieApiErrorText = "\nThere was a little problem getting your movie info.\nMaybe try a different title, or try again later.\n"

    // Format user's search for use in query string
    movieTitle = movieTitle.split(' ').join('+').split('.').join('');
    
    var movieApiQuery = "http://www.omdbapi.com/?apikey=trilogy&t=" + movieTitle;

    // OMDB API request and response
    client.get(movieApiQuery, function(error, response, body) {
        if ( body.length === 0 || error || response.statusCode != 200 ) {
            console.log(movieApiErrorText.green);
            return;
        };

        var movieRealTitle = body.Title;
        var year = body.Year;
        var imdbRating = body.Ratings[0].Value;
        var rtRating = body.Ratings[1].Value;
        var country = body.Country;
        var language = body.Language;
        var plot = body.Plot;
        var actors = body.Actors;

        console.log("\nAccording to OMDB, this is the movie information you wanted.\n".cyan);
        console.log(movieRealTitle.yellow.bold + " (" + year.yellow + ")" + " starring " + actors.yellow + "\n");
        console.log("\t" + "Released in: " + country.green.bold + " (" + language.cyan.bold + ")\n");
        console.log("\tIMDB Rating: " + imdbRating.magenta.bold);
        console.log("\tRT Rating: " + rtRating.magenta.bold + "\n");
        console.log("\tPlot: " + plot.blue + "\n");

    }); // End client.get()

};

function doWhatItSays(whatItSays) {
    // run spotify-this-song on the contents of random.txt
};

function inputHelp(arg) {
    if ( !optsList.includes(arg) )
        console.log(helpText);
    else if ( optsList.includes(arg) && !arg )
        console.log(argHelpText);
};
