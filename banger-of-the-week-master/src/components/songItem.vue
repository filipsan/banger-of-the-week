<template>
<div class="container-fluid">
    <div class="media" style="background:rgb(240,240,240); radius:20px; position:relative;">
      <button v-if="this.addedBy == this.$store.state.currentUser.displayName" style="position:absolute; top:6px; right:8px;" type="button" v-on:click="showMsgBox()" class="btn-close" aria-label="Close"></button>

      <div class="row">
        <div class="col">
          <div class="media-body text-start">
            <h3 class="mt-4 mb-2 ms-3">{{shortenTitle(this.title)}}</h3>
            <h5 class="mt-1 mb-2 ms-3">Artist: {{this.artist}}</h5>
            <h6 class="mt-1 mb-2 ms-3">Added by: {{this.addedBy}}</h6>

          </div>

        </div>
        <div class="col imageCol">
        <img class="img-fluid" v-bind:src="this.imgURL">
        </div>
    </div>
    <div class="row-auto">
      <div class="col">
        <div class="row">
     <audio controls v-bind:src="this.previewURL"></audio>
     </div>
     <div class="row-4 justify-content-center position:relative;">
     <button v-if="this.addedBy != this.$store.state.currentUser.displayName" :id="this.id" type="button" v-on:click="voteSong()" class="btn btn-primary" style="width:120px;">
       Vote <span class="badge badge-secondary">{{this.votes}}</span>
    </button>
    <button v-if="this.addedBy == this.$store.state.currentUser.displayName" :id="this.id" type="button" class="btn btn-primary" style="width:120px;" disabled>
      Vote <span class="badge badge-secondary">{{this.votes}}</span>
    </button>
    <button type="button" v-on:click="redirectToSpotify()" class="btn btn-outline-primary" style="position:relative; left:10px;"><i class="bi bi-spotify" style="font-size: 1 rem;"></i></button>
    </div>
    <div style="min-height:20px;">
     </div>
    </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  props: {
    vote: Function,
    remove: Function,
    song: Object,
    userState: Object
  },
  data() {
      return{
        id: this.song.spotifyID,
        title: this.song.title,
        artist: this.song.artist,
        addedBy: this.song.addedBy,
        votes: this.song.votes,
        voters: this.song.voters,
        user: this.$store.state.currentUser.displayName,
        imgURL: this.song.imgURL,
        previewURL: this.song.previewURL,
        compID: this.song.compID
        }
    },
    watch:{
      song:{
        handler(){
          console.log("Song voted for")
          this.votes = this.song.votes
        },
        deep:true
      }
    },
    methods: {
      shortenTitle(inTitle){
        if (inTitle.length>30){
          return inTitle.substr(0,28) + '...'
        }else{
          return inTitle
        }
      },
      voteSong(){
        console.log("VOTING!")
        console.log(this.id)
        console.log(this.song)
        console.log(this.compID)
        this.vote(this.id)
      },
      removeSong(){
        this.remove(this.id)
      },

      showMsgBox() {
        this.$bvModal.msgBoxConfirm('Are you sure you want to delete your song?', {
          title: 'Confirm Deletion',
          size: 'sm',
          buttonSize: 'sm',
          okVariant: 'danger',
          okTitle: 'YES',
          cancelTitle: 'NO',
          footerClass: 'p-2',
          hideHeaderClose: false,
          centered: true
        })
          .then(value => {
            if (value==true){
              this.removeSong()
            }
          })
          .catch(err => {
            console.log(err)
          })
      },

      redirectToSpotify(){
        window.open(this.song.spotifyURL, '_blank').focus();
      }
    },

}
</script>
<style>
.imageCol{
  -ms-flex: 0 0 16  0px;
  flex: 0 0 160px;
}

</style>
