/* eslint-disable */

import RegisterView from "../views/registerView.vue"

const Register={
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
      function resetPromiseStateCB(){
        component.promiseState = {
          error:null,
          data: {},
          promise: null
        }
      }
      component.$store.commit('resetAlertState')
      component.promiseState.promise = true
      component.promiseState.error = null
      component.promiseState.data = {}
      console.log("Registering User")
      component.userModel.createNewUser(user.email, user.password, user.displayname, component.promiseState).then(function(response){
        if(!component.promiseState.error){
          component.$store.state.alertState.show=true
          component.$store.state.alertState.msg="Succesfully registered!"
          component.$store.state.alertState.variant="success"
          component.$router.push('/login')
          resetPromiseStateCB()

        }
        else{
          console.log("Some error")
          component.error = true
          component.$store.state.alertState.show=true
          component.$store.state.alertState.msg=component.promiseState.error
          component.$store.state.alertState.variant="danger"
          resetPromiseStateCB()

        }
      }).catch(function(error){
        console.log(error)
        console.log("Some other error?")
        component.$store.state.alertState.show=true
        component.$store.state.alertState.msg="Internal error..."
        component.$storestate.alertState.variant="warning"
        resetPromiseStateCB()

        })
    }
    function redirectTo(path){
      this.$router.push(path)
    }

    return(
      <div class="fill">
      <RegisterView redirectUser={redirectTo} register={registerUserACB} errorMsg={this.errorMsg} error={this.error} promisestate={this.promiseState} userState={this.userModel.userState}/>
      </div>
    )
  }
};
export default Register
