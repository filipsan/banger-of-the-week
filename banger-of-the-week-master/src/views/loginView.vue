<template>
  <div class="fillProfile">
  <div class="container">
  <div class="block">
    <div class="logo">
        <img class="zoom" src="../assets/banger_logo.png">
      </div>
    </div>
    <div class="block">
    <div class="topCenter">
    <div class="text-center">
      <b-spinner
        v-if="promisestate.promise"
        variant="warning"
        style="width: 10rem; height:10rem;"
      ></b-spinner>
    </div>
    <b-form class="inputFormMid"
      @submit="onSubmit" @register="onRegister" v-if="!promisestate.promise">
      <div class="field">
      <b-form-group
        id="input-email"
      >
      <div class="inputDescriptionText"> Enter your email adress:</div>
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
          class="inputText"
        ></b-form-input>
      </b-form-group>
      </div>

      <div class="field1">
      <b-form-group
        id="input-password"
        minlength="6">
        <div class="inputDescriptionText"> Enter your password:</div>
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
          required
          class="inputText"
        ></b-form-input>
      </b-form-group>
      </div>


      <div class="flexButtons">
        <b-button class="perfectbutton" style="font-size:25px; height:100%; width:100%;" type="submit" variant="primary"> Login</b-button>
        <b-button style="font-size:25px; height:100%; width:100%;" v-on:click="$router.push('/register')" class="perfectbutton"  type="register" variant="danger">Register</b-button>
      </div>


    </b-form>
  </div>
</div>
  <div>
  <b-alert
  class="alertCenter"
        :show="this.$store.state.alertState.show===true"
        :variant="this.$store.state.alertState.variant"
        >
        {{this.$store.state.alertState.msg}}
</b-alert>


</div>
</div>
</div>
</template>
<script>
  export default {
    props:{
      login: Function,
      register: Function,
      errorState: Object,
      promisestate: Object
    },
    data() {
      return {
        form: {
          email: '',
          password: '',

        },
        show: true,
      }
    },
    methods: {
      onSubmit(event){
        //console.log(JSON.stringify(this.form))
        this.login(this.form)
        event.preventDefault()
      },
      onRegister(event){
        this.register(this.form)
        event.preventDefault()
      },
      onReset(event) {
        console.log(JSON.stringify(this.form))
        event.preventDefault()
      }
    }
  }
</script>
<style>

body{
    margin:auto;
    padding:10px;
    font-family: 'arial';
  }
.center{
  margin: auto;
  text-align: center;
  width: 30%;
  height: 200px;
  background: white;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.fillProfile{
  width: 100%;
  height: 100%;
  background: linear-gradient(-45deg,rgb(0, 145, 255),rgb(36, 17, 204),rgb(0, 157, 255),rgb(36, 17, 204));
  background-size: 400% 400%;
  position: relative;
  animation: change 20s ease-in-out infinite;
}
@keyframes change {
  0%{
    background-position: 0% 50%;
  }
  50%{
    background-position: 100% 50%;
  }
  100%{
    background-position: 0% 50%;
  }
}

.midSpinner{
  width: 20px;
}
.container{
  display: flex;
  flex-direction: column;
  min-width: 100vh;
  height: 100%;
  margin: 0 auto;
  padding: 0;
}

.block{
  display: block;
  margin-bottom: 40px;
}



.topCenter{
    margin: auto;
    text-align: center;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
.logo{
  margin-top: 40px;

}
.redirectButton{
  font-size:20px;
}
.perfectbutton{
  margin-top: 25px auto;
  height: 100px;
  width: 120px;
  font-size: 25px;
  font-family: 'Open Sans', sans-serif;
  color:rgb(220, 220, 15);
  border-style:solid;

}

.field{
  margin-top: 40px;
}
.field1{
  margin-top: 20px;
}
.alertCenter{
  width: 30%;
  margin:auto;
  margin-top:-20px;
  font-size:15px;
  height:40;

}
.inputFormMid{
  border-style:solid;
  width:120%;
  border-width:3px;
  border-radius:10px;
  padding-left:60px;
  padding-right:60px;
  border-color:yellow;
  padding-bottom:40px;
}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,800&display=swap');

.inputDescriptionText{
  color:rgb(220, 220, 15);
  font-size: 25px;
  font-family: 'Open Sans', sans-serif;
}
.inputText{
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
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

.zoom:hover {
  transform: scale(1.2); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}




</style>
