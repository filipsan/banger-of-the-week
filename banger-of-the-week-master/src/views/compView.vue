<template>
  <div class="fillOthers">
      <div style="max-width:100%; max-height:calc(100vh - 60px); overflow-x:hidden; overflow-y:scroll;">
        <div class="container-md">
        <b-row>
            <div class="pageTopCompetitions pt-5 pb-2">
              YOUR COMPETITIONS
            </div>
            <hr size="10">
            <div class="row gx-4 justify-content-center">
              <compCard v-for="comp in joinedCompetitions" :open="buttonclick" :compid="comp.id" :comp="comp" :genre="comp.genre" :key="comp.name"/>

              <div class="pageMidCompetitions pt-2 pb-2">
                <div v-if="Object.keys(joinedCompetitions).length<1"> You have not joined any competitions yet </div>
              </div>
            </div>
            <div class="pageTopCompetitions pt-5 pb-2">
              OTHER ACTIVE COMPETITIONS
            </div>
            <hr size="10">


            <b-table hover v-if="Object.keys(otherCompetitions).length>0" :items="otherCompetitions" :fields="otherFields" @row-clicked="otherCompClicked"></b-table>
            <b-modal id="modal-wrong-password" title="Failed to join competition">
            <p class="my-4">Incorrect password!</p>
            </b-modal>
            <b-modal
              id="password-modal"
              ref="modal"
              title="Enter competition password"
              @show="resetModal"
              @hidden="resetModal"
              @ok="handleOk"
              >
              <form ref="form" @submit.stop.prevent="handleSubmit">
                <b-form-group
                  label="Password"
                  label-for="password-input"
                  invalid-feedback="Password is required"
                  :state="passwordState"
                >
                  <b-form-input
                    id="password-input"
                    v-model="password"
                    :state="passwordState"
                    required
                  ></b-form-input>
                </b-form-group>
              </form>
              </b-modal>
              <div class="pageMidCompetitions pt-2 pb-2">
                <div v-if="Object.keys(otherCompetitions).length<1"> There are no other active competitions! </div>
              </div>
            <div class="pageTopCompetitions pt-5 pb-2">
              EXPIRED COMPETITIONS
            </div>
            <hr size="10">

            <div class="tableEndedCompetitions pt-3 pb-2">
              <b-table :items="endedComps" :fields="expiredFields"></b-table>
              <div v-if="Object.keys(endedCompetitions).length<1"> There are no expired competitions! </div>
            </div>
        </b-row>
    </div>
    </div>
  </div>
</template>

<script>

import CompCard from "../components/competitionCard.vue";
export default {
    props:{
      clickCallback: Function,
      joinedComps: Array,
      otherComps: Array,
      endedComps: Array,
      handleCompetitionJoin: Function
    },
    components:{
      "compCard": CompCard
    },
    methods: {
      buttonclick(id){
        this.clickCallback(id)
      },
      otherCompClicked(compObj){
        this.compClicked = compObj
        this.$store.state.modalState.id='password-modal'
        this.$store.state.modalState.show=true
        this.$bvModal.show(this.$store.state.modalState.id)

      },
      resetModal() {
        this.$store.commit('resetModalState')
      },
      handleOk() {
        this.$nextTick(()=>{
          this.$bvModal.hide(this.$store.state.modalState.id)

        })
        this.handleSubmit()
      },
      handleSubmit() {
        if (!this.checkFormValidity()) {
          return
        }
        this.handleCompetitionJoin(this.password, this.compClicked)
        this.password=''
        this.$bvModal.show(this.$store.state.modalState.id)
      },
      checkFormValidity() {
        const valid = this.$refs.form.checkValidity()
        this.nameState = valid
        return valid
      },
    },
    data(){
      return {
        otherCompetitions:[],
        joinedCompetitions:[],
        endedCompetitions: [],
        endedCompsFields: ['name', 'owner'],
        password: '',
        passwordState: null,
        compClicked: null,
        showmodal:true,
        otherFields: [{
          key:'name',
          label: 'Name',
          tdClass:'tableEndedCompetitions',
          thClass:'tableEndedCompetitions'


        },
        {
          key:'owner',
          label: 'Host',
          tdClass:'tableEndedCompetitions',
          thClass:'tableEndedCompetitions'


        }
      ],
        expiredFields: [{
          key:'name',
          label: 'Name',
          tdClass:'tableEndedCompetitions',
          thClass:'tableEndedCompetitions'


        },
        {
          key:'owner',
          label: 'Host',
          tdClass:'tableEndedCompetitions',
          thClass:'tableEndedCompetitions'

        },
        {
          key:'winner',
          label:'Banger',
          tdClass:'tableEndedCompetitions',
          thClass:'tableEndedCompetitions'

        },
          ]
      }
    },
    watch: {
      otherComps: {
        handler(){
          this.otherCompetitions = []
          this.otherCompetitions = this.otherComps
        },
        deep: true
      },
      joinedComps:{
        handler(){
          this.joinedCompetitions = []
          this.joinedCompetitions = this.joinedComps
        },
        deep:true
      },
      endedComps:{
        handler(){
          this.endedCompetitions = []
          this.endedCompetitions = this.endedComps
        }
      }
    },
    mounted() {
      this.otherCompetitions = this.otherComps
      this.joinedCompetitions = this.joinedComps
      this.endedCompetitions = this.endedComps
      this.showmodal = this.modalstate
    }

  }
</script>

<style>
#compTopMargin{
  height: 30px;

  }
.compCardClass{
  align-content: center;
}
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@1,800&display=swap');

.pageTopCompetitions{
  color: rgb(220, 220, 15);
  font-size: 50px;
  text-shadow: 0 0 3px #0000FF;
  font-family: 'Open Sans', sans-serif;
}
.pageMidCompetitions{
  color: rgb(220, 220, 15);
  font-size: 30px;
  font-family: 'Open Sans', sans-serif;
}
.tableEndedCompetitions{
  color: rgb(220, 220, 15);
  font-size: 30px;
  font-family: 'Open Sans', sans-serif;
}
</style>
