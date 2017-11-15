var liriCmd= process.argv[2];
var liriInput= process.argv[3];
var query= require("request");
var fs= require("fs");

switch(liriCmd) {
	case "my-tweets":
		twitterChk(liriInput);
		console.log();
		break;
	case "spotify-this-song":
		spotifyChk(liriInput);
		console.log();
		break;
	case "movie-this":
		movieChk(liriInput);
		console.log();
		break;
	case "do-what-it-says":
		console.log();
		break;
	default:
		console.log("Please enter a valid command");
}

function movieChk(){
	var movieName= "";
	switch(liriInput){
		case "":
			movieName= "Mr.Nobody";
			break;
		default :
			for (var i = 2; i < liriInput.length; i++) {
		  		if (i > 2 && i < liriInput.length) {
		    		movieName = movieName + "+" + liriInput[i];
		  		}
		  		else {
				    movieName += liriInput[i];
				}
			}
	}		
	// Then run a request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece";

	// This line is just to help us debug against the actual URL.
	console.log(queryUrl);

	request(queryUrl, function(error, response, body) {

  		// If the request is successful
	  	if (!error && response.statusCode === 200) {
		    // Parse the body of the site and recover just the imdbRating
		    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
		    console.log("Title of the Movie: " + JSON.parse(body).Name);
		    console.log("Year the movie came out: " + JSON.parse(body).Year);
		    console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
		  //  console.log("Rotten Tomatoes Rating of the: " + JSON.parse(body).Ratings.Source='Rotten Tomatoes');
		    console.log("Country where the movie was produced: " + JSON.parse(body).Country);
		    console.log("Language of the movie: " + JSON.parse(body).Language);
		    console.log("Plot of the movie: " + JSON.parse(body).Plot);
		    console.log("Actors in the movie: " + JSON.parse(body).Actors);
	  	}
  	});
}

function spotifyChk(){
	var SpotifyChk= require("node-spotify-api");
	var spotifyId= require("./keys.js");
	var spotifySong= new SpotifyChk({
		id: spotifyId.spotifyKeys.clientID,
		secret: spotifyId.spotifyKeys.clientSecrt,
	});
	spotifySong.search ({type: "track", query: liriInput}, function(error,data){
			if(error){
				return console.log("Error occured: " + error);
			}
			else{console.log(JSON.parse(data));}
		}	
	);
}

// Using the suggested twitter moddule
function twitterChk(){
	var Twitter= require("twitter");
	var twitterChk= require("./keys.js");
	var client = new Twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});
	var twitterQueryUrl= "https://api.twitter.com/1.1/search/tweets.json";
	client.get("search/tweets", function(error,tweets,response){
			if(error) throw error;
			console.log(tweets);
			console.log(response);
	});
}
	
function doWhatItSays(){}