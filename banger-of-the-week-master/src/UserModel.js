import CompetitionModel from "./CompetitionModel.js"
import {createUser, authenticateUser} from './db.js'
import {v4 as uuidv4} from 'uuid'

class UserModel {
  constructor(user={'username':'Fisan', 'id':1, 'competitions':[]}){
    this.id = user.id;
    this.allCompetitions = [],
    this.joinedCompetitions,
    this.competitions = [],
    this.promiseState = {},
    this.currentCompetition = null;
    this.observers = [],
    this.userState = {}
  }

  signInUser(email, password, promiseState){
    return authenticateUser(email, password, promiseState)
  }

  signOutUser(){
    //* return unAuthenticateUser() promise
  }
  createNewUser(email, password, displayName, promiseState){
    return createUser(email,password, displayName, promiseState)
  }

  addObserver(callback){
    this.observers = this.observers.concat(callback)
  }


  createUniqueID(){
      return uuidv4();
  }
  notifyObservers(payload){
    this.observers.forEach(function invokeObserverCB(obs){
      try{
        obs(payload)
      }

      catch(err){console.log(err)
      }
    });
  }

  registerCompetition(competition={
      name: "123",
      password: "123",
      genre: "Bangers",
      enddate: "2022-04-06",
      guests: ['Melker'],
      id: this.createUniqueID(),
      owner: this.userState.currentUser.email
    }){
    const theModel = this;
    const competitionID = this.createUniqueID()
    Object.assign(competition, {id: competitionID})
    Object.assign(competition, {guests: {}})
    Object.assign(competition, {createdOn: new Date().toISOString().slice(0, 10)})
    const newCompetition = new CompetitionModel(competition)
    this.competitions = [...this.competitions, newCompetition]
    const UserModelAsJSON = newCompetition.getModelAsJSON()
    theModel.notifyObservers({addedCompetition: UserModelAsJSON})
  }
}
export default UserModel;
