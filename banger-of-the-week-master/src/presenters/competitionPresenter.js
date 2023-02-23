import CompetitionView from "../views/competitionView.vue"
import json from "../assets/songs.json"
import resolvePromise from "../resolvePromise.js"
import {searchSongsACB} from "../spotifyAPI.js"


const Competition={
  props: ["userModel"],
  data(){
    return{
      promiseState: {
        data:{},
        error:{}
      },
      error: false,
      errorMsg:'',
      songs: json,
      searchParams: {},
      compModel: {}
      }
  },
  created(){
    const currentComp = this.userModel.competitions.filter(obj=>{
      return (obj.id===this.$route.params.compId)
    })
    this.compModel = currentComp[0]
  },
  render(){
    const component=this;
    function addSongACB(title, artist, user, spotifyID, previewURL, imgURL, spotifyURL){
      component.$store.commit('resetAlertState')
      var hasAddedSong = false;
      component.compModel.songs.forEach(function checkIfUserAddedSongCB(song){
        if(song.addedBy==component.$store.state.currentUser.displayName){
          component.$store.state.alertState.show=true;
          component.$store.state.alertState.msg="You can only add one song per competition!"
          component.$store.state.alertState.variant="warning"
          setTimeout(()=> {component.$store.commit("resetAlertState")},2000)

          hasAddedSong = true
        }
      })
      if(!hasAddedSong){
        if(component.$store.state.currentUser.displayName){
          component.compModel.addSong(title, artist, user, spotifyID, previewURL, imgURL, spotifyURL, component.$store.state.alertState)
        }
        else{
          this.$router.push('/login')
        }
      }
    }
    function addGuestACB(){
        component.compModel.addGuest(this.$store.state.currentUser)

    }
    function removeGuestACB(){
      if(component.$store.state.currentUser.displayName==component.compModel.owner){
        component.$store.state.alertState.show=true
        component.$store.state.alertState.variant="warning"
        component.$store.state.alertState.msg="You can not leave your own competition!"
        setTimeout(()=> {component.$store.commit("resetAlertState")},2000)

      }
      else{
        component.compModel.removeGuest(this.$store.state.currentUser)
        component.$router.push('/competitions')
      }
    }

    function searchSongACB(song){
      component.searchParams.title = song;
      resolvePromise(searchSongsACB(component.searchParams),component.promiseState)
    }

    function voteSongACB(song){
      component.compModel.vote(song, this.$store.state.currentUser.displayName)

    }

    function removeSongACB(songID){
      component.$store.commit('resetAlertState')
      component.compModel.removeSong(songID)
    }

//jkj
    return(
      <CompetitionView promisestate={this.promiseState} errorMsg={this.errorMsg} error={this.error} joinCompetition={addGuestACB} leaveCompetition={removeGuestACB} addVoteToSong={voteSongACB} removeASong={removeSongACB} addSong={addSongACB} searchSong={searchSongACB} comp={component.compModel} songitems= {component.promiseState.data} userState={component.userModel.userState}/>
    )
  }
};
export default Competition
