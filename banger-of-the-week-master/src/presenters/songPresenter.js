import SongsView from "../views/songsView.vue"
import json from "../assets/songs.json"
import resolvePromise from "../resolvePromise.js"
import {searchSongs} from "../songSource.js"
const Songs={
  props: ["model"],
  data(){
    return {
      promiseState: {
        data:[]
      },
      searchParams: {
        title: 'Love'
      },
      songs: json
  }},
  mounted() {
    resolvePromise(searchSongs(this.searchParams),this.promiseState)
  },
  render(){
    const component=this;

    function removeSongCB(song){
      return song
    }
    function setSongCB(song){
      return song
    }
    function changeHashACB(hash){
      window.location.hash = hash
    }
    return(
      <div>
        <SongsView changeHash={changeHashACB} songlist={component.promiseState.data} onSongRemove={removeSongCB} onSongClick={setSongCB}/>
      </div>
    )
  }
};
export default Songs
