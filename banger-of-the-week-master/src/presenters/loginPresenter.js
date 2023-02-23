/* eslint-disable */
import LoginView from "../views/loginView.vue"
import resolvePromise from "../resolvePromise.js"

const Login={
  props: ["userModel"],
  data(){
    return{
      promiseState: {
        error:null,
        data:{},
        promise:null
      },
      errorState:{
        error:false,
        msg:''
      }
    }
  },
  render(){
    const component=this;
    function authenticateCredentialsACB(user){
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
      component.userModel.signInUser(user.email, user.password, component.promiseState).then(()=>{
        if(!component.promiseState.error){
          component.$store.state.currentUser=component.promiseState.currentUser;
          component.$store.state.isAuthenticated = true;
          component.$router.push('/competitions')
          resetPromiseStateCB()
        }
        else{
          component.error=true;
          component.$store.state.alertState.show=true;
          component.$store.state.alertState.msg = component.promiseState.error;
          component.$store.state.alertState.variant="danger"
          resetPromiseStateCB()
        }
      }).catch((err) =>{
        component.$store.state.alertState.show=true;
        component.$store.state.alertState.msg = err;
        component.$store.state.alertState.variant="danger"
        resetPromiseStateCB()
      })
    }
    function registerNewUserACB(user){
      this.$router.push('/register')
    }

    return(
      <LoginView login={authenticateCredentialsACB} register={registerNewUserACB} promisestate={this.promiseState} errorState={this.errorState}/>
    )
  }
};
export default Login
