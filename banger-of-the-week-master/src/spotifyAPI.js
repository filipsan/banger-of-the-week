var client_id = '04630e6fbd7645019b1ea966fbaa75b9';
var client_secret = '62312c943c3d46e18069e969f0e8bc84';
const axios = require('axios');
var SpotifyWebApi = require('spotify-web-api-js');


var spotifyApi = new SpotifyWebApi()


function getTokenACB() {
  const urlSpotify = "https://accounts.spotify.com/api/token";
    return axios({
      method: "post",
      url: urlSpotify,
      data: "grant_type=client_credentials",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/x-www-form-urlencoded",
      },
      auth: {
        username: client_id, // User ID
        password: client_secret,  // User Secret
      },
    })
    .then((response) => {
      var token = response.data;
      spotifyApi.setAccessToken(token.access_token)
      return response.data
    })
    .catch((err) => console.log("error in token access: ",err));
}

function filterResponseCB(track){
  const songObject = {
    artist: track.artists[0].name,
    title: track.name,
    previewURL: track.preview_url,
    imgURL: track.album.images[2],
    spotifyID: track.id,
    spotifyURL: track.external_urls.spotify
  }
  return songObject
}

// Returns song object with .title, .artist, .previewURL, .imgURL
function searchSongsACB(searchParams) {
    const searchQuery = "track:".concat(searchParams.title)
    if(!spotifyApi.getAccessToken){
      return getTokenACB().then(() =>{
        spotifyApi.searchTracks(searchQuery).then((response) => {
        const tracks = response.tracks.items;
        const parsedTracks = tracks.map(filterResponseCB)
        return parsedTracks
        })
      })
    } else {
      return spotifyApi.searchTracks(searchQuery).then((response)=>{
        const tracks = response.tracks.items;
        const parsedTracks = tracks.map(filterResponseCB)
        return parsedTracks
      })
    }
  }




export {getTokenACB, searchSongsACB}
