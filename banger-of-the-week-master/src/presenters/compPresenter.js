import CompView from "../views/compView.vue"

const Comps = {
  props: ['userModel'],
  data(){
    return{
      promiseState: {},
      joinedCompetitions:[],
      otherCompetitions: [],
      endedCompetitions: [],
      modalState: ''
    }
  },
  beforeMount(){
    const component = this;
    const date = new Date().toISOString().slice(0, 10)
    function joinedCompsCB(comp){
      if(comp.ownerUID==component.$store.state.currentUser.uid){
        return true
      } else if(component.$store.state.currentUser.uid in comp.guests){
        return true
      }
      else {
        return false
      }
    }
    function notJoinedCompsCB(comp){
      if(comp.ownerUID==component.$store.state.currentUser.uid){
        return false
      } else if(component.$store.state.currentUser.uid in comp.guests){
        return false
      }
      else {
        return true
      }
    }
    function expiredCompsCB(comp){
      if(Date.parse(comp.enddate)<Date.parse(date)){
        return true
      }else{
        return false
      }
    }
    function activeCompsCB(comp){
      if(Date.parse(comp.enddate)<Date.parse(date)){
        return false
      }else{
        return true
      }
    }
    this.activeCompetitions = this.userModel.competitions.filter(activeCompsCB)
    this.joinedCompetitions = this.activeCompetitions.filter(joinedCompsCB)
    this.otherCompetitions = this.activeCompetitions.filter(notJoinedCompsCB)
    this.endedCompetitions = this.userModel.competitions.filter(expiredCompsCB)
    this.endedCompetitions.forEach(function addWinnerCB(comp){
      var max = 0;
      var winningSong = ''
      comp.songs.forEach(function getMostVotedSongCB(song){
        if(song.votes>max){
          max = song.votes
          winningSong = song.title
        }
      })
      Object.assign(comp, {winner: winningSong})
    })
  },
  watch:{
    userModel:{
      handler(){
        const date = new Date().toISOString().slice(0, 10)
        const component = this;
        function joinedCompsCB(comp){
          if(comp.owner==component.$store.state.currentUser.displayName){
            return true
          } else if(component.$store.state.currentUser.uid in comp.guests){
            return true
          }
          else {
            return false
          }
        }
        function notJoinedCompsCB(comp){
          if(comp.owner==component.$store.state.currentUser.displayName){
            return false
          } else if(component.$store.state.currentUser.uid in comp.guests){
            return false
          } else {
            return true
          }
        }
        function expiredCompsCB(comp){
          if(Date.parse(comp.enddate)<Date.parse(date)){
            return true
          }else{
            return false
          }
        }
        function activeCompsCB(comp){
          if(Date.parse(comp.enddate)<Date.parse(date)){
            return false
          }else{
            return true
          }
        }
        this.activeCompetitions = this.userModel.competitions.filter(activeCompsCB)
        this.joinedCompetitions = this.activeCompetitions.filter(joinedCompsCB)
        this.otherCompetitions = this.activeCompetitions.filter(notJoinedCompsCB)
        this.endedCompetitions = this.userModel.competitions.filter(expiredCompsCB)
        this.endedCompetitions.forEach(function addWinnerCB(comp){
          var max = 0;
          var winningSong = ''
          comp.songs.forEach(function getMostVotedSongCB(song){
            if(song.votes>max){
              max = song.votes
              winningSong = song.title
            }
          })
          Object.assign(comp, {winner: winningSong})
        })
      },
      deep: true
    }
  },
  render(){
    const component = this;
    function buttonclick(id){
      component.$router.push({name: 'competition', params: {compId: id}})
    }

    function validatePasswordCB(password, competition){

      if(password===competition.password){
        competition.addGuest(this.$store.state.currentUser)
        component.$router.push({name: 'competition', params:{compId:competition.id}})
      }else{
        component.$store.state.modalState.id='modal-wrong-password'
        component.$store.state.modalState.show=true
      }
    }
    return(
      <CompView handleCompetitionJoin={validatePasswordCB} modalstate={this.modalState} clickCallback={buttonclick} endedComps={this.endedCompetitions} joinedComps={this.joinedCompetitions} otherComps={this.otherCompetitions}/>
    )
  }
}
export default Comps
