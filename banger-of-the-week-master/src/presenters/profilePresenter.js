/* eslint-disable */

import ProfileView from "../views/profileView.vue"

const Profile={
  props: ["userModel"],
  data(){
    return{
      promiseState: {
        error:null,
        data:{}
      },
      error: false,
      errorMsg:''
    }
  },
  render(){
    const component=this;


    function registerUserACB(user){
      this.$router.push('/register')
    }
    return(
      <div class="fill">
      <ProfileView userModel={this.userModel} updateProfile={this.updateProfile}/>
      </div>
    )
  }
};
export default Profile
