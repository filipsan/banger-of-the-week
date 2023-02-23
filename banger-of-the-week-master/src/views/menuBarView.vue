<template>
  <div style="margin-bottom:0px;">
    <b-navbar style="width:100%;" toggleable="lg" type="light" class="MenuColorClass" position="sticky">


      <div v-if="menuSize==3" class="menuBarFlexParents">
      <div class="leftChunk">
        <div class="logo-image">
        <img v-on:click="onMenuClick('/competitions')" src="../assets/banger_mini.png">
      </div>

      <div class="logo-image">
        <img v-on:click="onMenuClick('/competitions')" src="../assets/competitions.png">
      </div>
       <div class="logo-image">
        <img v-on:click="onMenuClick('/registerCompetition')" src="../assets/new_comp.png">
      </div>
        <b-avatar></b-avatar>
        <div class="menuText" style="font-size:20px; margin-left:-25px">{{this.$store.state.currentUser.displayName}}</div>
      </div>

      <div class="rightChunk">
         <div class="logo-image">
        <img id="signout" style="height:42px;margin-top:3px; margin-right:8px;" v-on:click="onSignOutClick('/login')" src="../assets/signout.png">
      </div>
      </div>

      </div>

    <div v-if="menuSize==2">
      <b-nav>
        <b-nav-item class="topMenuText ps-2" v-on:click="onMenuClick('/competitions')">COMPETITIONS</b-nav-item>
        <b-nav-item class="topMenuText" v-on:click="onMenuClick('/registerCompetition')">NEW COMPETITION</b-nav-item>
        <b-nav-item class="topMenuText pe-1" v-on:click="onSignOutClick('/login')">LOG OUT</b-nav-item>
      </b-nav>
    </div>

     <div v-if="menuSize==1">
      <b-nav-item-dropdown class="topMenuText" style="margin-top:-20px;" text="MENU" right>
        <b-dropdown-item v-on:click="onMenuClick('/competitions')">COMPETITIONS</b-dropdown-item>
        <b-dropdown-item v-on:click="onMenuClick('/registerCompetition')">NEW COMPETITION</b-dropdown-item>
        <b-dropdown-item v-on:click="onSignOutClick('/login')">LOG OUT</b-dropdown-item>
      </b-nav-item-dropdown>
    </div>


    </b-navbar>
  </div>
</template>

<script>
  export default {
    props:{
      redirectRoute: Function,
      signOutUser: Function
    },
    data() {
      return{
        windowWidth: window.innerWidth,
        menuSize: null,
        midSizedMenu: null,
      }
    },
    methods:{
      onMenuClick(route){
        this.redirectRoute(route)
      },
      onSignOutClick(){
        this.signOutUser()
      },
      onResize() {
        this.windowWidth = window.innerWidth;
        if (this.windowWidth>=1153){
          this.menuSize = 3
        }
        if (this.windowWidth<1153 && this.windowWidth>540){
          this.menuSize = 2
        }
        if (this.windowWidth<=540){
          this.menuSize = 1
        }
      }
    },
    created() {

      window.addEventListener("resize", this.onResize);
    },
    mounted() {
      this.windowWidth = window.innerWidth;
      if (this.windowWidth>=1153){
        this.menuSize = 3
      }
      if (this.windowWidth<1153 && this.windowWidth>540){
        this.menuSize = 2
      }
      if (this.windowWidth<=540){
        this.menuSize = 1
      }
    },
    destroyed() {
      window.removeEventListener("resize", this.onResize);
    },
  }
</script>

<style>
.leftmargin{
  margin-left: 20px;
}

.logo-image{
  transition: transform .2s; /* Animation */
}
.logo-image:hover {
  transform: scale(1.1); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}

.MenuColorClass{
  background-color: rgb(220, 220, 15);
  height: 56px;
}
img {
 height: 40px;;
 width: 100%;
 object-fit: scale-down;
}

#signout{
 height: 100%;
 width: 100%;
 object-fit: scale-down;
}
.menuText{
  font-family: 'Open Sans', sans-serif;
  text-align: right;
  margin-top:8px;
  padding-right:0px;
  color: rgb(0, 145, 255);

}

.leftChunk{
  margin-left: 20px ;
  margin-top:7px;
  display: flex;
  flex-direction: row;
  gap: 30px;
}
.rightChunk{

}
.menuBarFlexParents{
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,800&display=swap');

.topMenuText{
    color: rgb(220, 220, 15);
  font-size: 16px;
  font-family: 'Open Sans', sans-serif;
}

</style>
