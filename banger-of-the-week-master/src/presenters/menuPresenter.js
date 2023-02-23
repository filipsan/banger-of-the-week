import MenuView from "../views/menuBarView.vue"


const Menu = {
  props: ["model"],
  data(){
    return {
      promiseState: {}
    }
  },
  render(){
    function redirectRouteACB(hash){
      this.$router.push(hash)
    }
    function deAuthenticateUserACB(){
      this.$store.commit('deAuthenticateUser')
      this.$router.push('/login')
    }

    if (this.$store.state.isAuthenticated){
    
    return(
      <MenuView redirectRoute={redirectRouteACB} signOutUser={deAuthenticateUserACB}/>
    )
    }

  }
}
export default Menu
