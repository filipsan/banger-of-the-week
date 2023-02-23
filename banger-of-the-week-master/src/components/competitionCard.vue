<template>
  <b-card class="joinedCompCard m-1 flex-column"
          tag="article"
          style="width: 400px; height:40  0px; border-radius:40px;"
          border-variant="primary"
          :footer="comp.genre"
          :title="comp.name">
      <b-card-text>
        <p class="font-weight-bold">{{comp.description}}</p>
      </b-card-text>
    <b-list-group flush>
      <b-list-group-item class="joinedCompCard">
        <b-avatar icon="people-fill"></b-avatar>
        <span class="mr-auto">Contestants: {{Object.keys(comp.guests).length}}</span>
      </b-list-group-item>
      <b-list-group-item class="joinedCompCard">
        <b-avatar icon="music-note"></b-avatar>
        <span class="mr-auto">Number of songs: {{comp.songs.length}}</span>
      </b-list-group-item>
      <b-list-group-item class="joinedCompCard">
        <b-avatar icon="star-fill"></b-avatar>
        <span class="mr-auto">Owner: {{comp.owner}}</span>
      </b-list-group-item>
    </b-list-group>
    <div >
      <b-button class="btn btn-lg btn-block btn-primary mt-auto" :id="compid" v-on:click="select($event.target.id)" variant="primary">Open</b-button>
    </div>
  </b-card>

</template>

<script>

  export default {
    props: {
      comp: Object,
      open: Function,
      compid: String,
      comps: Array,
      genre: String
    },
    methods: {
      select(id) {
        this.open(id)
      }
    }
  }

</script>
<style>
.joinedCompCard{
  background-color: rgb(220, 220, 15);
  font-family: 'Open Sans', sans-serif;
  font-size: 18px;
  color: rgb(0, 100, 255);
}

.joinedCompHeader{
  font-size:40px;
}
</style>
