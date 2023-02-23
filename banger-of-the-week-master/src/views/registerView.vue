<template>
  <div class="container">
  <div class="block">
  <div class="logo">
  <img class="zoom" v-on:click="onIconClick('/login')" src="../assets/banger_logo.png">
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
    @submit="onSubmit" v-if="!promisestate.promise">
      <h2 class="headerText"> Register a new user! </h2>
      <div class="inputDescriptionText mt-2"> Enter your email adress:</div>

      <b-form-group
        id="input-email"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
          class="inputText mt-1"
        ></b-form-input>
      </b-form-group>
      <div class="inputDescriptionText mt-2"> Pick a displayname:</div>

      <b-form-group
        id="input-displayname"
      >
        <b-form-input
          id="input-2"
          v-model="form.displayname"
          type="text"
          placeholder="Pick a displayname!"
          required
          class="inputText mt-1"
        ></b-form-input>
      </b-form-group>
      <div class="inputDescriptionText mt-2"> Enter a password:</div>

      <b-form-group
        id="input-password"
        minlength="6">
        <b-form-input
          id="input-3"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
          minlength="6"
          required
          class="inputText mt-1"
        ></b-form-input>
      </b-form-group>
      <div class="flexButtons">
        <b-button class="perfectbutton" style="font-size:25px; height:100%; width:100%;" type="submit" variant="primary">Register</b-button>
    </div>
    </b-form>
  </div>
</div>
  <b-alert
  class="alertCenter"
        :show="this.$store.state.alertState.show===true"
        :variant="this.$store.state.alertState.variant"
        >
        {{this.$store.state.alertState.msg}}
  </b-alert>
</div>
</template>
<script>
  export default {
    props:{
      login: Function,
      register: Function,
      error: Boolean,
      errorMsg: String,
      userState: Object,
      promisestate:Object,
      redirectUser: Function
    },
    data() {
      return {
        form: {
          email: '',
          password: '',
          displayname:''
        },
        show: true,
      }
    },


    methods: {
      onIconClick(path){
        this.redirectUser(path)
      },
      onSubmit(event){
        this.register(this.form)
        event.preventDefault()
        event.preventDefault()
      },

      onReset(event) {
        event.preventDefault()
      }
    }
  }
</script>
<style>
body{
    margin:0;
    padding:0;
    font-family: 'arial';
    background: linear-gradient(-45deg,rgb(0, 145, 255),rgb(36, 17, 204),rgb(0, 157, 255),rgb(36, 17, 204));
    background-size: 400% 400%;
    position: relative;
    animation: change 20s ease-in-out infinite;
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
.inputFormMid{
  border-style:solid;
  border-width:3px;
  width:120%;
  border-radius:10px;
  padding-left:60px;
  padding-right:60px;
  border-color:yellow;
  padding-bottom:40px;
}
.perfectbutton{
  margin-top: 25px auto;
  height: 40px;
  width: 120px;
  font-size: 20px;
  font-family: 'Open Sans', sans-serif;
  color:rgb(220, 220, 15);

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
