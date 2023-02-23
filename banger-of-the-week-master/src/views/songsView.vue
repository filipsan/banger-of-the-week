<template>
  <div>
    <b-container>
      <b-pagination
      :v-model="songs"
      total-rows=2
      per-page=50
      first-text="First"
      prev-text="Prev"
      next-text="Next"
      last-text="Last"
      v-align="center"
      ></b-pagination>
      <b-table striped hover :items="songs" :fields="fields">
      </b-table>
  </b-container>
  </div>
</template>

<script>
  export default {
    props:{
      songlist: Object
    },
    data(){
      return{
        songs: [],
        fields: ['name', 'artist', 'year'],
        items: this.songs,
      }
    },
    watch:{
      songlist:{
        handler(){
          this.songs = []
          this.songs = [...this.songs, this.songlist.data][0]

        }
      }
    },
  }
</script>
