// DEPENDENCIES
// =====================================
// Read and set environment variables

require("dotenv").config();

// Import the node-spotify-api NPM package.
var Spotify = require("node-spotify-api");

// Import the API keys
var keys = require("./keys");

// Import the axios npm package.
var axios = require("axios");

// Import the moment npm package.
var moment = require("moment");

// Import the FS package for read/write.
var fs = require("fs");

// Initialize the spotify API client using our client id and secret
var spotify = new Spotify(keys.spotify);

// FUNCTIONS
// Helper function that gets the artist name

var getArtistNames = function(artist) {
  return artist.name;
};

// Function for running a Spotify search
var getMeSpotify = function(songName) {
  if (songName === undefined) {
    songName = "What's my age again";
  }
  spotify.search(
     {
      type: "track",
      query: songName
    },

    function(err, data) {
      if (err) {
        console.log(`Error occurred ${err}`);
        return;
      }

      var songs = data.tracks.items;
      for (var i = 0; i < songs.length; i++) {
        console.log(i);
        console.log("artist(s): " + songs[i].artists.map(getArtistNames));
        console.log("song name: " + songs[i].name);
        console.log("preview song: " + songs[i].preview_url);
        console.log("album: " + songs[i].album.name);
        console.log("-----------------------------------");
      }

    }

  );

};

// getbands function

var getMyBands = function(artist) {
  var queryURL = `https://rest.bandsintown.com/artists/${artist}/events?app_id=codingbootcamp`;

  axios.get(queryURL).then(
    function(response) {
      var jsonData = response.data;
      if (!jsonData.length) {
        console.log("No results found for " + artist);
        return;
      }

      console.log(`pcoming concerts for${artist}:`);
      for (var i = 0; i < jsonData.length; i++) {
        var show = jsonData[i];

