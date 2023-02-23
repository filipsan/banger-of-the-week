import formView from "../views/competitionFormView.vue"


const Form = {
  props: ['userModel'],
  data(){
    return{
      promiseState:{}

    }
  },
  render(){
    const component = this;
    function registerCompetitionACB(competition){
      const parsed_competition = JSON.parse(competition)
      Object.assign(parsed_competition, {owner: component.$store.state.currentUser.displayName})
      Object.assign(parsed_competition, {uid: component.$store.state.currentUser.uid})
      component.userModel.registerCompetition(parsed_competition)
      this.$router.push('/competitions')
    }


    return(
      <formView registerComp={registerCompetitionACB}/>
    )
  }
}
export default Form
