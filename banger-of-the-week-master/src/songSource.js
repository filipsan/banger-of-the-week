import {BASE_URL, API_KEY} from '/src/apiConfig.js';

const songDishesEP = 'method=track.search&track=';

function myApiCall(endpoint, params){
  function treatHTTPResponseACB(response){
    if(!response.ok){
      throw new Error('API Error!')
    }
    return response.json()
  }
  return fetch(BASE_URL+endpoint+params+API_KEY)
  .then(treatHTTPResponseACB);
}

function transformResultsACB(response){
    //already in json format by now
  return response.results.trackmatches.track;
}

function searchSongs(params){
  let searchParams = new URLSearchParams(params.title)
  return myApiCall(songDishesEP, searchParams).then(transformResultsACB)
}

export {searchSongs}
