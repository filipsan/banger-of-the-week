/* eslint-disable */

<template>
  <div id="app">
      <Menu/>
      <!---<Show :hash="'#login'"><Login/></Show>
      <Show :hash="'#registerCompetition'"><Form :userModel='this.userModel'/></Show>
      <Form :userModel='this.userModel'/>
      <Show :hash="'#competitions'"><Comps :userModel='this.userModel'/></Show>
      <Show :hash="'#competition'"><Competition :compModel='this.compModel'/></Show>-->
      <!--<Form :userModel='this.userModel'/>
      <Comps :userModel='this.userModel'/>
      <Competition :compModel='this.compModel'/>
      <Login/>-->
      <router-view :userModel='this.userModel'/>


  </div>
</template>

<script>
/* import Songs from './presenters/songPresenter.js'*/
import Menu from './presenters/menuPresenter.js'

export default {
  name: 'App',
  props:{
    userModel: Object
  },
  components: {
    Menu


  }
}
</script>

<style>

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0px;
  margin-left: 0px;
  height: 100%;
  width: 100%;
}

.fillOthers{
  width: 100%;
  height: calc(100vh - 56px)  ;
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

@media only screen and (max-width: 767px) {
  .fillOthers{
  width: 100%;
  height: 100%;
  background: rgb(0, 145, 255);
  animation: change 20s ease-in-out infinite;
}
}

@media only screen and (min-width: 768px) {
  .fillOthers{
  width: 100%;
  height: calc(100vh - 56px)  ;
  background: linear-gradient(-45deg,rgb(0, 145, 255),rgb(36, 17, 204),rgb(0, 157, 255),rgb(36, 17, 204));
  background-size: 400% 400%;
  position: relative;
  animation: change 20s ease-in-out infinite;
}
}
</style>
