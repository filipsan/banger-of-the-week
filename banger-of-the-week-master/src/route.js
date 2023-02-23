/* eslint-disable */

import Comps from './presenters/compPresenter.js'
import Menu from './presenters/menuPresenter.js'
import Form from './presenters/formPresenter.js'
import Competition from './presenters/competitionPresenter.js'
import Login from './presenters/loginPresenter.js'
import Songs from './presenters/songPresenter.js'
import Register from './presenters/registerPresenter.js'
import Profile from './presenters/profilePresenter.js'
//import CompetitionModel from "./CompetitionModel.js"
import UserModel from './UserModel.js'



const theUserModel = new UserModel();

const FormComp = {
  // make sure to add a prop named exactly like the route param
  props: ['theUserModel'],
  template: Form
}


export const routes = [{
  path:'',
  name:'home',
  component: Login
}, {
  path:'/login',
  name: 'login',
  component: Login
}, {
  path:'/competitions',
  name: 'competitions',
  component: Comps
}, {
  path:'/competition/:compId',
  name: 'competition',
  component: Competition
},{
  path:'/registerCompetition',
  name:'competitionform',
  component: Form,

},{
  path:'/songs',
  name:'songsview',
  component: Songs,
},{
  path:'/register',
  name: 'register',
  component: Register,
},{
  path:'/profile',
  name: 'profile',
  component: Profile,
}
];
export default routes
