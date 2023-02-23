<template>
<div class="fillOthers">
  <img v-if="showBang" class="bangImage" src="../assets/bang.png">
  <div style="max-width:1700px;" class="container-fluid px-5 justify-content-start">
      <div class="pt-4" id="pageTop">
        {{this.comp.name.toUpperCase()}}
      </div>
      <div class="pb-1" id="pageTopTimeMessage">
        {{this.timeLeft}}
      </div>
        <div class="d-flex align-items-center justify-content-center" style="height:40px; background:white; border-radius:12px;">
          <b-progress :value="timePercent" :max=100 variant="primary" striped style="width:calc(100% - 29px);"></b-progress>
        </div>
      <b-alert style="position:absolute; width:450px;margin-left:auto; margin-right:auto;left:0;right:0;text-align:center; margin-top:5px" :show="this.$store.state.alertState.show===true" variant="danger">{{this.$store.state.alertState.msg}}</b-alert>
  </div>
  <div style="max-width:1700px;" class="smallScreenCompBackground container-fluid px-5">
      <div class="row gx-3 gy-2 mt-4 pt-5">
        <div class="v col-lg-2">
          <div class="midBoxContainer" style="min-height:100px; border-radius:20px;">
            <h4 class="pt-3 pb-2">Participants</h4>
            <div v-if="fullsizeAvatars">
            <b-list-group>
                    <avatarCard v-model="owner" :key="owner" :name="owner"/>
                    <avatarCard v-for="guest in guests" :key="guest" :name="guest"/>
            </b-list-group>
            </div>
            <div v-if="!fullsizeAvatars">
            <b-row class="justify-content-center">
                <b-avatar v-model="owner" v-b-popover.hover.bottom="owner" :key="owner" size="6rem"></b-avatar>
                <b-avatar v-for="guest in comp.guests" v-b-popover.hover.bottom="guest" :key="guest" size="6rem"></b-avatar>
            </b-row>
            </div>
            <div v-if="fullsizeAvatars" style="min-height:10px;"></div>

            <b-button class="mb-2" pill variant="danger" v-on:click="clickHandlerLeaveCompetition">Leave competition</b-button>

          </div>
        </div>
        <div class="col-lg-6">
          <div class="midBoxContainer pt-1 pb-3 pe-2" style=" border-radius:20px;">
            <h4 class="mt-3 mb-2">Competing songs</h4>
            <div class="overflowElem container-fluid">
              <div class="pt-4" v-if="Object.keys(compsonglist).length<1"> No songs added yet. </div>
              <div v-if="Object.keys(compsonglist).length>0">
                <b-row class="gy-3">
                  <songItem v-for="song in compsonglist" :user="user" :vote="voteSong" :remove="removeSong" :song="song" :key="song.spotifyID" :id="song.spotifyID" :compID="song.compID"/>
                </b-row>
              </div>
            </div>
          </div>
        </div>
        <div class="col-lg-4">
          <div class="midBoxContainer p-1" style=" border-radius:20px;">
            <h4 class="mt-3 mb-1">Add songs</h4>
            <b-form @submit="onSubmit">
                <b-form-group
                  id="input-group-1"
                    label-for="input-1"
                >
                  <b-form-input
                    id="input-1"
                    v-model="form.title"
                    type="text"
                    placeholder="Search for banger"
                    required
                  ></b-form-input>
                </b-form-group>
                <b-button class="mt-1" type="submit" pill variant="primary">Search</b-button>
              </b-form>
              <b-spinner
                v-if="this.promiseState.promise"
                variant="warning"
                style="width: 5rem; height:5rem;"
              ></b-spinner>
              <div class="overflowSearchElem p-1">
              <b-table striped hover responsive :items="songs" :fields="fields" @row-clicked="clickHandlerAddSong">
              </b-table>
              <div v-if="!this.promiseState.promise && this.songs.length<1">No search results!</div>

             </div>

          </div>
        </div>
      </div>
  </div>
</div>
</template>

<script>
import avatarCard from "../components/avatarCard.vue";
import songItem from "../components/songItem.vue";
import bangsound from '../assets/bang.mp3';

  export default {

    props:{
      songitems: Object,
      addSong: Function,
      addVoteToSong: Function,
      removeASong: Function,
      searchSong: Function,
      comp: Object,
      addMember: Function,
      error: Boolean,
      errorMsg: String,
      userState: Object,
      promisestate: Object,
      joinCompetition: Function,
      leaveCompetition: Function
    },
    components: {
      avatarCard,
      songItem
    },
    data() {
      return{
        promiseState: this.promisestate,
        windowWidth: window.innerWidth,
        songsSearched: false,
        timePercent: 0,
        fields: ['title', 'artist'],
        songs: [],
        compsonglist: this.comp.songs,
        form: {
          title: ''
        },
        user: this.$store.state.currentUser.displayName,
        userID: this.$store.state.currentUser.uid,
        timeLeft:'',
        interval: null,
        fullsizeAvatars: true,
        showBang: false,
        owner: '',
        guests: []
      }
    },
    created() {
      this.owner = this.comp.owner
      this.guests = this.comp.guests
      window.addEventListener("resize", this.onResize);
      var startDateJS = new Date(this.comp.createdOn);
      var endDateJS = new Date(this.comp.enddate);
      var current = Date.now();
      var diff = (current-startDateJS);
      var diff2 = (endDateJS-startDateJS);
      var diffDivide = diff/diff2
      if (diffDivide>=0 && diffDivide<=1){
        this.timePercent = 100*(diff/diff2)
      }else{
        this.timePercent = 100
      }
      endDateJS = new Date(this.comp.enddate);
      current = Date.now();
      var diffTime = (endDateJS - current);//in milliseconds
      if (diffTime>0){
        var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        diffTime = diffTime - (1000 * 60 * 60 * 24 *  diffDays)
        var diffHours = Math.floor(diffTime / (1000 * 60 * 60));
        diffTime = diffTime - (1000 * 60 * 60 *  diffHours)
        var diffMinutes = Math.floor(diffTime / (1000 * 60));
        diffTime = diffTime - (1000 * 60 * diffMinutes)
        var diffSeconds = Math.floor(diffTime / (1000));
        this.timeLeft = diffDays+' days '+diffHours+' hours '+diffMinutes+' minutes '+diffSeconds+' and seconds left...'
      }else{
        this.timeLeft = 'The competition has ended.'
      }
    },
    mounted() {
      this.evalAvatarSize()
      const component = this;
      this.interval = setInterval(function () {
        var endDateJS = new Date(component.comp.enddate);
        var current = Date.now();
        var diffTime = (endDateJS - current);//in milliseconds
        if (diffTime>0){
          var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          diffTime = diffTime - (1000 * 60 * 60 * 24 *  diffDays)
          var diffHours = Math.floor(diffTime / (1000 * 60 * 60));
          diffTime = diffTime - (1000 * 60 * 60 *  diffHours)
          var diffMinutes = Math.floor(diffTime / (1000 * 60));
          diffTime = diffTime - (1000 * 60 * diffMinutes)
          var diffSeconds = Math.floor(diffTime / (1000));
          component.timeLeft = diffDays+' days '+diffHours+' hours '+diffMinutes+' minutes '+diffSeconds+' and seconds left...'
        }else{
          component.timeLeft = 'The competition has ended.'
          clearInterval(this.interval)
        }
      }, 1000);
    },

    destroyed() {
      window.removeEventListener("resize", this.onResize);
      clearInterval(this.interval)
    },

    watch:{
      songitems:{
        handler(){
          this.songs = []
          this.songs = [...this.songs, this.songitems.data][0]
          if(this.songs){
            for (var i = 0; i < this.songs.length; i++) {
              if (this.songs[i].title.length>25){
                this.songs[i].title = this.songs[i].title.substr(0,22)+'...'
              }
              if (this.songs[i].artist.length>25){
                this.songs[i].artist = this.songs[i].artist.substr(0,22)+'...'
              }
            }
          }
        }
      },
      comp: {
        handler(){
          this.compsonglist = []
          this.compsonglist = [...this.compsonglist, this.comp.songs][0]
          this.guests = []
          this.guests = [...this.guests, this.comp.guests][0]
        },
        deep: true
      },
      "comp.songs.length": {
        handler(after,before){
          if (after>before){
            this.showBang = true;
            const audio = new Audio(bangsound)
            audio.play()
            setTimeout(()=> {this.showBang=false},3000)
          }
        },
      },
      promisestate:{
        handler(){
          this.promiseState = {}
          this.promiseState = this.promisestate
        },
        deep:true
      }
    },
    methods: {
      onSubmit(event){
        event.preventDefault()
        this.searchSong(this.form.title)
      },
      onReset(event) {
        event.preventDefault()
      },
      clickHandlerNewMember(event){
        event.preventDefault()
        this.addMember()
      },
      clickHandlerLeaveCompetition(){
        this.leaveCompetition()
      },
      clickHandlerAddSong(record){
        this.addSong(record.title,record.artist,this.$store.state.currentUser.displayName, record.spotifyID, record.previewURL, record.imgURL.url, record.spotifyURL)

      },
      voteSong(songID){
        clearInterval(this.interval)
        this.addVoteToSong(songID)
      },
      removeSong(songID){
        this.removeASong(songID)
      },
      onResize() {
      this.evalAvatarSize()
      this.windowWidth = window.innerWidth;
      if (this.windowWidth<1200 && this.windowWidth>767){
        this.fields = ['title']
      }else{
        this.fields = ['title', 'artist']
      }
      },
      updateTimeLeft(){
        var endDateJS = new Date(this.comp.enddate);
        var current = Date.now();
        var diffTime = Math.abs(endDateJS - current);//in milliseconds
        if (diffTime>0){
          var diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          diffTime = diffTime - (1000 * 60 * 60 * 24 *  diffDays)
          var diffHours = Math.floor(diffTime / (1000 * 60 * 60));
          diffTime = diffTime - (1000 * 60 * 60 *  diffHours)
          var diffMinutes = Math.floor(diffTime / (1000 * 60));
          diffTime = diffTime - (1000 * 60 * diffMinutes)
          var diffSeconds = Math.floor(diffTime / (1000));
          this.timeLeft = diffDays+' days '+diffHours+' hours '+diffMinutes+' minutes '+diffSeconds+' and seconds left...'
        }else{
          this.timeLeft = 'The competition has ended.'
        }
      },
      evalAvatarSize(){
        if(this.windowWidth>767){
          this.fullsizeAvatars = true
        }else{
          this.fullsizeAvatars = false
        }
      }
    }
  }
</script>
<style>
body{
    margin:0;
    padding:0;
    font-family: 'arial';
    height:100vh;
  }

.container{
  height: 100%;
  width: 100%;
}
.block{
  display: block;
  margin-bottom: 40px;
}
.midbox{
    margin: auto;
    width: 800px;
    height: calc(100vh - 230px);
    background: white;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
  }



.competingField{
  height: calc(100vh - 330px);
  overflow: scroll;
}
.leftUpperComp{
  margin: 0 auto;
  width: 400px;
  height: 300px;
  max-height:calc(100vh - 230px);
  background: white;
  border-radius: 10px;
}
.leftLowerComp{
  margin: 0 auto;
  margin-top: 10px;
  width: 400px;
  height: 170px;
  max-height:calc(100vh - 230px);
  background: white;
  border-radius: 10px;
}

    .rightComp{
  margin: 0 auto;
  width: 400px;
  height: 500px;
  max-height:calc(100vh - 230px);
  background: white;
  border-radius: 10px;
  overflow: scroll;


/*

    flex-shrink: 1;

    align-self: flex-start;
    text-align: center;
    width: 400px;
    height: 700px;
    background: white;
    border-radius: 10px;

    */
    }

.resultlist{
  margin-top: 10px;
  min-height: 10px;
  max-height: 370px;
  overflow: scroll;
}

.logo{
  margin-top: 40px;
}
.perfectbutton{
  margin-top: 25px;
  height: 30px;
  width: 100px;
}
.field{
  margin-top: 40px;
}
.field1{
  margin-top: 20px;
}

.songFrame{
  margin: 2px auto;
  width: 90%;
  height: 60px;
  max-height: 80px;
  background: rgb(225, 225, 225);
  border-radius: 10px;
}

.songTable{
  display: table;
  width: 100%;
  table-layout: fixed;
}
.songTable span{
  margin-top: 20px;
  display: table-cell;
  text-align: center;
}

.zoom {
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-top: 150px;
  transition: transform .2s; /* Animation */
  width: 400px;
  height: 150px;
  margin: 0 auto;
}
.flexparent{
  display:flex;
  flex-direction:row;
  flex-basis: 0vh;
  margin-top: 0px;
  gap: 20px;
}
.flexrow{
  display:flex;
  flex-direction:row;
  margin-top: 0px;
  gap: 0px;
}
.zoom:hover {
  transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,800&display=swap');

#pageTop{
  color: rgb(220, 220, 15);
  font-size: 42px;
  font-family: 'Open Sans', sans-serif;
}

#pageTopTimeMessage{
  color: rgb(220, 220, 15);
  font-size: 18px;
  font-family: 'Open Sans', sans-serif;
}

.flexButtons{
    display:flex;
    flex-direction:row;
    justify-content: space-evenly;
  }
  .flexButtons div{
    top: 40px;
    height:100px;
    width: 150px;
  }


  .bar-center{
    margin-top: 7px;
    margin-left: 14px;
    width: calc(100% - 28px);
    text-align: center;
  }
  .leftUpperComp h1{
    text-align: center;
    padding: 10px 0 10px 0;
    border-bottom: 2px solid black;
    font-size: 18px;
  }
  .leftLowerComp h1{
    text-align: center;
    padding: 10px 0 10px 0;
    border-bottom: 2px solid black;
    font-size: 18px;
  }
  .rightComp h1{
    text-align: center;
    padding: 10px 0 10px 0;
    border-bottom: 2px solid black;
    font-size: 18px;
  }
  .midbox h1{
    text-align: center;
    padding: 20px 0 15px 0;
    border-bottom: 2px solid black;
    font-size: 18px;
  }
  .list-group{
    max-height: 240px;
    margin-bottom: 10px;
    border-bottom:0.1px solid rgb(231, 231, 231);
    border-bottom-style: ridge;
    overflow:scroll;
    -webkit-overflow-scrolling: touch;
}

.midBoxContainer{
  border-style: solid;
  border-width:6px;
  border-color:rgb(220, 220, 15);
  background: rgb(250, 255, 250);
  font-size:15px;
}

.bangImage{
  height:500px;
  position:absolute;
  margin-top:200px;
  margin-left:auto;
  margin-right:auto;
  left:70;
  right:0;
  text-align:center;
  z-index: 2147483647;
}

@media only screen and (max-width: 991px) {
  .overflowElem {
   min-height:200px;
  }
  .overflowSearchElem {
   min-height:200px;
  }

  .smallScreenCompBackground{
    background: rgb(0, 145, 255);
  }
  .fillOthers{
    background: rgb(0, 145, 255);
  }
}

@media only screen and (min-width: 1670px) {
  .mainContElem{
    max-width: 1670px;
  }
}


@media only screen and (min-width: 992px) {
  .overflowElem{
  min-height:calc(100vh - 480px);
  max-height:calc(100vh - 480px);
  overflow:scroll;
  }
  .overflowSearchElem{
  margin-top:10px;
  min-height:calc(100vh - 554px);
  height:calc(100vh - 429px);
  max-height:calc(100vh - 554px);
  overflow-y:scroll;
  overflow-x:hidden;
  }
}

</style>
