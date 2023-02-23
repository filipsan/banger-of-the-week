import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import routes from './route.js'
/* eslint-disable */

import {getTokenACB, searchSongsACB} from './spotifyAPI.js'
import { initializeApp } from 'firebase/app';



import UserModel from './UserModel.js'
const {updateFirebaseFromUserModel, updateModelFromFirebase, updateFirebaseFromCompetitionModel}=require("/src/db.js");

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueRouter)
Vue.use(Vuex)

const router = new VueRouter({
  mode: 'history',
  routes
});


const store = new Vuex.Store({
  state: {
    isAuthenticated: false,
    currentUser: undefined,
    alertState:{
      show:false,
      variant:'',
      msg:''
    },
    spotifyState:{
      token:'',
      expires_in:0,
      expired:true
    },
    modalState:{
      id: '',
      show:false
    }
  },
  mutations: {
    authenticateUser(state){
      state.isAuthenticated=true
    },
    deAuthenticateUser(state){
      state.isAuthenticated=false
    },
    resetAlertState(state){
      state.alertState={
        show:false,
        variant:'',
        msg:''
      }
    },
    resetModalState(state){
      state.modalState={
        show:false,
        id:''
      }
    }
  }
})

router.beforeEach((to, from, next) =>{
  store.state.alertState={
    show:false,
    variant:'',
    msg:''
  }
  if(to.name !=='login' && to.name !=='register' && !store.state.isAuthenticated) {
  next({name: 'login'})}
  else if ((to.name=='' || to.name=='login') && store.state.isAuthenticated) {
    return false
  }
  else {
    next()
}})
Vue.use(router)

new Vue({
  store:store,
  data(){
    return {
      userModel: new UserModel(),
    }
  },
  created(){
    const component = this;
    function updateModelCB(model){
      updateModelFromFirebase(model)
      updateFirebaseFromUserModel(model)
    }
    function getSpotifyToken(){
      getTokenACB().then((token) => {
          component.$store.state.spotifyState.token = token.access_token;
          component.$store.state.spotifyState.expires_in = token.expires_in;
          component.$store.state.spotifyState.expired = false;
      })
    }
    getSpotifyToken()
    updateModelCB(this.userModel)
  },
  watch: {
    userModel: {
      handler(){
        this.userModel.competitions.forEach(function addObserver(element){
          if(element.observers.length<1){
            updateFirebaseFromCompetitionModel(element)
          }
        })
      },
      deep:true

    },
  },
  render(h){
    return h(App, {props: {
    'userModel':this.userModel}})
  },
  router
}).$mount('#app')

/* new Vue({
  render: h => h(App),
}).use(router).$mount('#app')
*/
