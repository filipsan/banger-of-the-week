/* eslint-disble */

import firebaseConfig from "/src/firebaseConfig.js"

//import {searchSong} from "./songSource.js"
//import UserModel from "./UserModel.js"
//import CompetitionModel from "./CompetitionModel.js"
//import SongModel from "./SongModel.js"


firebase.initializeApp(firebaseConfig);
const REF="bangerWeekly";
firebase.database().ref(REF+"/test").set("dummy");

function updateFirebaseFromModel(model){
  function observerCB(payload){
    if(payload.currentCompetition){
      firebase.database().ref(REF+"/currentCompetition").set(UserModel.currentDish);
    }
    if(payload.addedCompetition){
      firebase.database().ref(REF+"/myCompetitions/"+payload.addedCompetition.id).set("competition");
    }
    if(payload.removedCompetition){
      firebase.database().ref(REF+"/myCompetitions/"+payload.removedCompetition.id).set(null);
    }
  }
    UserModel.addObserver(observerCB)
}
function updateModelFromFirebase(model){
 firebase.database().ref(REF+"/currentCompetition").on("value",
  function dishChangedInFirebaseACB(firebaseData){
    console.log("Current competition: ", firebaseData.val())
    UserModel.setCurrentSong(firebaseData.val());}
);
firebase.database().ref(REF+"/myCompetitions").on("competition_added",
 function dishAddedInFirebaseACB(firebaseData){
   if(!(UserModel.competitions.find(competition => competition.id == firebaseData.key))){
     UserModel.addCompetition(competition.id)
    }
   }
);
firebase.database().ref(REF+"/myCompetiton").on("child_removed",
 function dishRemovedInFirebaseACB(firebaseData){UserModel.removeCompetition({id:firebaseData.key});}
);
}

function firebaseModelPromise(){
  function makeBigPromiseACB(firebaseData){
    function createModelACB(competitionArray){
      const nr_guests = firebaseData.val().nrGuests;
      return new UserModel(id)
    }
    function makeDishPromiseCB(dishID){
      return getDishDetails(dishID)
    }
    const dishPromiseArray = Object.keys(firebaseData.val().myDishes)
    return Promise.all(dishPromiseArray).then(createModelACB)

  }
  return firebase.database().ref(REF).once("value").then(makeBigPromiseACB);
}

export {updateFirebaseFromModel, updateModelFromFirebase, firebaseModelPromise};
