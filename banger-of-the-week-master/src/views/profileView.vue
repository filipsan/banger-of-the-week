<template>
<div class="fuill">
  <div class="container">
  <div class="block">
  </div>
  <div class="block">
  <div class="center">
    <h1>TESTING</h1>
    <b-form @submit="onSubmit" @register="onRegister" v-if="show">
      <div class="field">
      <b-form-group
        id="input-email"
      >
        <b-form-input
          id="input-1"
          v-model="form.email"
          type="email"
          placeholder="Enter email"
          required
        ></b-form-input>
      </b-form-group>
      </div>

      <div class="field1">
      <b-form-group
        id="input-password"
        minlength="6">
        <b-form-input
          id="input-2"
          type="password"
          v-model="form.password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>
      </div>

      <div class="flexButtons">
        <div>
      <b-button class="perfectbutton" type="submit" variant="primary"> Login</b-button>
      </div>
        <div>
      <b-button tag="router-link" :to="{name: 'register' }" class="perfectbutton" type="register" variant="secondary">Register</b-button>
      </div>

    </div>

    </b-form>
  </div>
  </div>
   </div>
  <b-alert :show="error===true" variant="danger">{{this.userState.error}}</b-alert>

</div>
</template>
<script>
  export default {
    props:{
      userModel: Object,
      updateProfile: Function,

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
        this.login(this.form)

        event.preventDefault()
      },
      onRegister(event){
        this.register(this.form)
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
    font-family: 'helvetica';
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


.center{
    margin: auto;
    text-align: center;
    width: 400px;
    height: 200px;
    background: white;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

.logo{
  margin-top: 40px;
}
.perfectbutton{
  margin-top: 25px auto;
  height: 30px;
  width: 100px;
  font-size: 13px;
}

.field{
  margin-top: 40px;
}
.field1{
  margin-top: 20px;
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
