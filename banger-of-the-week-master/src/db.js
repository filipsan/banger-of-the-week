/* eslint-disable */
import { initializeApp } from 'firebase/app';
import { getAuth, updateProfile, createUserWithEmailAndPassword, signInWithEmailAndPassword, reoad } from 'firebase/auth';
import {remove, getDatabase, ref, set, get, onValue, onChildAdded, onChildChanged, onDelete, onChildRemoved, child, update} from "firebase/database";

import UserModel from './UserModel.js'
import CompetitionModel from './CompetitionModel.js'
import SongModel from './SongModel.js'

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyBe881kQuO92n4NcWOyq2OsHpOE3Cid7m8",
  authDomain: "banger-722e8.firebaseapp.com",
  databaseURL: "https://banger-722e8-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "banger-722e8",
  storageBucket: "banger-722e8.appspot.com",
  messagingSenderId: "468342033697",
  appId: "1:468342033697:web:ec2b9adee613ae238c0260",
  measurementId: "G-KCT158N813"
};

const app = initializeApp(firebaseConfig);

const database = getDatabase(app);
const auth = getAuth(app);


const db = getDatabase()


function createUser(email, password, displayNameIn, userState){
  return createUserWithEmailAndPassword(auth, email, password)
  .then((userResponse) => {
    updateProfile(auth.currentUser, {
      displayName: displayNameIn
    })
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    userState.error = error;
  });
}
function authenticateUser(email, password, userState){
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      userState.currentUser = user;
    })
    .catch((error) => {
      userState.error = error
    });
}


function updateFirebaseFromUserModel(model){
  function observerCB(payload){
    if(payload.addedCompetition){
      const payloadData = payload.addedCompetition;
      set(ref(db, 'competition/' + payloadData.id), {
          genre: payloadData.genre,
          enddate: payloadData.enddate,
          name: payloadData.name,
          songs: payloadData.songs,
          guests: payloadData.guests,
          id: payloadData.id,
          owner: payloadData.owner,
          createdOn: payloadData.createdOn,
          description: payloadData.description,
          ownerUID: payloadData.ownerUID,
          password: payloadData.password
      })
    }
    if(payload.removedCompetition){
      return
    }
    if(payload.joinedCompetition){
        return
    }
    if(payload.leftCompetition){
        return
    }
    if(payload.addedUser){
        return
    }
  }
  model.addObserver(observerCB)
}
function updateFirebaseFromCompetitionModel(model){
  function observerCB(payload){
    if(payload.addedSong){
      const payloadData = payload.addedSong;
      const songObject = {
        title: payloadData.title,
        artist: payloadData.artist,
        addedBy: payloadData.addedBy
      }
      const updates = {}
      updates['/competition/'+payloadData.compID +'/songs/'+payloadData.spotifyID] = payloadData
      update(ref(db), updates)
    }
    if(payload.removedSong){
      const payloadData = payload.removedSong;
      const compRef = ref(db, 'competition/' + payloadData.competitionID + '/songs/' + payloadData.songID)
      remove(compRef)
    }
    if(payload.joinedCompetition){
      const payloadData = payload.joinedCompetition
      const updates = {}
      updates['/competition/'+payloadData.compID +'/guests/'+payloadData.addedGuestUID] = payloadData.addedGuestDisplayName
      update(ref(db), updates)
    }
    if(payload.leftCompetition){
      const payloadData = payload.leftCompetition
      const guestRef = ref(db, 'competition/'+payloadData.compID+'/guests/' + payloadData.removedGuestUID)
      remove(guestRef)

    }
    if(payload.songVote){
      const updates = {}
      const payloadData = payload.songVote;
      updates['/competition/'+payloadData.compID +'/songs/'+payloadData.songID+'/votes'] = payloadData.votes
      update(ref(db), updates)
    }
  }
  model.addObserver(observerCB)
}

function updateModelFromFirebase(model){
  const compRef = ref(database, 'competition')
  onValue(compRef, (snapshot)=>{
    snapshot.forEach((childSnapshot)=>{
      var exists = false;
      model.competitions.forEach(function hasCompetition(comp){
        if(comp.id == childSnapshot.key){
          exists = true
        }
      })
      if(!exists){
        const value = childSnapshot.val()
        const key = childSnapshot.key;
        const songs = [];
        const constructorInput = {
            name: value.name,
            genre: value.genre,
            id: key,
            enddate: value.enddate,
            owner: value.owner,
            createdOn: value.createdOn,
            description: value.description,
            uid: value.ownerUID,
            guests:value.guests,
            password:value.password
        }
        const newCompetition = new CompetitionModel(constructorInput)
        if (value.songs){
          for (const [songKey, songVal] of Object.entries(value.songs)){
            const newSong = new SongModel(songVal)
            newCompetition.songs = [...newCompetition.songs, newSong]
          }
        }
        model.competitions = [...model.competitions, newCompetition]
      }
    })
  })
  onChildRemoved(compRef, (snapshot)=>{
    function removeByIdCB(competition){
      if(competition.id == snapshot.val().id){
        return false
      } else{ return true}
    }
    model.competitions = model.competitions.filter(removeByIdCB)
  })
  onChildChanged(compRef, (snapshot)=>{
    model.competitions.forEach(function addGuestCB(comp){
      if(comp.id == snapshot.val().id){
        if(snapshot.val().guests!==undefined){
          comp.guests={}
          Object.assign(comp.guests, snapshot.val().guests)

        }else{
          comp.guests = {}
        }
        if(snapshot.val().songs!==undefined){
          comp.songs=[]
          for(const [songKey, songVal] of Object.entries(snapshot.val().songs)){
            const newSong = new SongModel(songVal)
            comp.songs = [...comp.songs, newSong]
          }
        }else{
          comp.songs = []
        }
      }
    })
  })
}


function firebaseModelPromise(){
  function makeBigPromiseACB(firebaseData){
    function createModelACB(competitionArray){
      const name = firebaseData.val().username
      const id = firebaseData.val().id
      const competitions = []
      for(competition in competitionArray){
        const competitionObject = new CompetitionModel(competition)
        competitions = [...competitions, competitionObject]
      }
      const user = {'username': name, 'id': id, 'competitions': competitions}

      const usermodel = new UserModel(user)

    }
  }
}

export {updateFirebaseFromUserModel, updateModelFromFirebase, authenticateUser, createUser, updateFirebaseFromCompetitionModel};
