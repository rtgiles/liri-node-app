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
		doWhatItSays();
		console.log();
		break;
	default:
		console.log("Please enter a valid command");
}


function movieChk(){
	var movieName= "";
	switch(liriInput){
		case undefined:
			console.log(liriInput);
			movieName= "Mr. Nobody";
			break;
		default :
			movieName= liriInput;
			// for (var i = 2; i < liriInput.length; i++) {
		 //  		if (i > 2 && i < liriInput.length) {
		 //    		movieName = movieName + "+" + liriInput[i];
		 //  		}
		 //  		else {
			// 	    movieName += liriInput[i];
			// 	}
			// }
	}		
	//Request to the OMDB API with the movie specified
	var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&apikey=40e9cece";

	//console.log(queryUrl);

	query(queryUrl, function(error, response, body) {

  		// If the request is successful
	  	if (!error && response.statusCode === 200) {
		    console.log("Title of the Movie: " + JSON.parse(body).Title);
		    console.log("Year the movie came out: " + JSON.parse(body).Year);
		    console.log("IMDB Rating of the movie: " + JSON.parse(body).imdbRating);
		    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[1].Value);
		    console.log("Country where the movie was produced: " + JSON.parse(body).Country);
		    console.log("Language of the movie: " + JSON.parse(body).Language);
		    console.log("Plot of the movie: " + JSON.parse(body).Plot);
		    console.log("Actors in the movie: " + JSON.parse(body).Actors);
		    if(liriInput=== undefined){
		    	console.log("\n"+"If you haven't watched "+movieName+", then you should:"+"\n"+ "http://www.imdb.com/title/tt0485947/"+"\n"+"It's on Netflix")
		    }
	  	}
  	});
}

function spotifyChk(){
	switch(liriInput){
		case undefined:
			console.log(liriInput);
			liriInput= "The Sign";
			break;
		default :
			break;
	}
	var SpotifyChk= require("node-spotify-api");
	var spotifyId= require("./spotifykeys.js");
	var spotifySong= new SpotifyChk({
		id: spotifyId.clientID,
		secret: spotifyId.clientSecrt,
	});
	spotifySong.search ({type: "track", query: liriInput}, function(error,data){
			if(error){
				return console.log("Error occured: " + error);
			}
			else { 
				//console.log(data);
				//Need to put loop to capture data for "The Sign"

				
				var song= data.tracks.items;
				
				console.log("This is what was inputted: " + liriInput);
				//console.log(song);
				for(var i=0; i<song.length; i++){
					if (song[i] != undefined){
						console.log(
						"Artist: " + song[i].artists[0].name + "\n" + 
						"Song: " + song[i].name + "\n" +
						"Album Name: " + song[i].album.name + "\n" + 
						"Url: " + song[i].preview_url + "\n\n" + "END ARTIST "+ i + "\n"
						);
					}
				}
			}
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
	
function doWhatItSays(){
	fs.readFile("random.txt", function(error,data){
		if(error){
			console.log("Error Msg: " + error);
		} else{
			results= data.split(",");
			spotifyChk(results[0],results[1]);
		}
	})
}