<template>
<div class= "fillOthers">
  <h1 class="headerText pt-4"> Register a new competition!</h1>
  <div class="formGroup">
    <div class="fillOut"> </div>
    <b-form class="inputFormMid mt-1 ms-1 me-1" style="color:white;" @submit="onSubmit" v-if="show">
      <div class="inputDescriptionText"> Enter the name of your competition! </div>
      <b-form-group
        class="inputText pb-4"
        id="input-group-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.name"
          type="text"
          placeholder="Competition name"
          required
          maxlength="30"
        ></b-form-input>
      </b-form-group>
      <div class="inputDescriptionText"> Pick a password for your competition: </div>

      <b-form-group class="inputText pb-4" id="input-group-2" label-for="input-2" >
        <b-form-input
          id="input-2"
          v-model="form.password"
          placeholder="Enter secret key..."
          required
          type="password"
          maxlength="8"
        ></b-form-input>
      </b-form-group>
      <div class="inputDescriptionText"> Describe your competition: </div>
      <b-form-group class="inputText pb-4" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.description"
          type="text"
          placeholder="Add a description for the competition!"
          required
          maxlength="30"
        ></b-form-input>
    </b-form-group>
    <div class="inputDescriptionText"> Choose a genre for the competition </div>

      <b-form-group class="pb-4" id="input-group-3"  label-for="input-3">
        <b-form-select
          size="lg"
          id="input-4"
          v-model="form.genre"
          :options="genres"
          required
          style="width:150px border-radius:12px;"
        ></b-form-select>
      </b-form-group>

      <b-button class="submitButton" style="font-size:30px; height:100%; width:100%;" type="submit" variant="primary">Submit</b-button>
    </b-form>

  </div>
  </div>
</template>

<script>

/*

 <b-card class="mt-3" header="Form Data Result">
      <pre class="m-0">{{ form }}</pre>
    </b-card>

*/
  export default {
    props:{
      registerComp: Function
    },
    data() {
      return {
        form: {
          name: null,
          password: null,
          genre: null,
          enddate:null
        },
        genres: [{ text: 'Select One', value: '' }, 'Rock', 'Bangers', 'Jazz', 'Disco', 'Metal', 'Rap'],
        show: true
      }
    },
    mounted(){
      function addDays(date, days){
        return new Date(date.getTime() + days*24*60*60*1000);
      }
      const todayDate = new Date().toISOString().slice(0, 10)
      var todayDateParsed = new Date(todayDate)
      var myDate = addDays(todayDateParsed, 7).toISOString().slice(0, 10)
      this.form.enddate = myDate

    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        this.registerComp(JSON.stringify(this.form))
      }
    }
  }
</script>
<style>



.d-block{
  margin-top:0px;
}
.formGroup{
  width: 120%;
  height: calc(100vh - 56px);
  margin-top:100px;
  max-width:500px;
  margin: 0 auto;
  text-align:center;
  justify-content:center;
  align-items:center;
  display:flex;
}
.headerText{
  font-family: 'Open Sans', sans-serif;
  color:rgb(220, 220, 15);
  margin: 0 auto;
}

.margin{
  margin-top: 25px;

}

.fillOut{
  height: 30px;
  padding-top:75px;
}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,800&display=swap');

.submitButton{
  color:rgb(220, 220, 15);
  border-style:solid;
  border-color:yellow;
  border-width:1px;
  font-size:25px;
  font-style: bold;
  font-family: 'Open Sans', sans-serif;

}

</style>
