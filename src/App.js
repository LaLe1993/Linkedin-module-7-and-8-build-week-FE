import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Profile from './components/Profile/Profile'
import Signin from './components/SignIn'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom'
import MyNetwork from './components/Network/MyNetwork'; 
import ExperienceSubmitionForm from './components/Network/ExperienceSubmitionForm'
import Homepage from './components/Homepage/FeedPage'


function App() {
  return (
    <>
    <Router>
      <Switch>
        <Route path='/feed/:id' component={Homepage}/>
        <Route exact path='/' component={Signin}/>
        <Route path='/profile/:id' component={Profile}/>
        <Route path='/myNetwork' component={MyNetwork}/>
        <Route exact path='/addExperience' component={ExperienceSubmitionForm} />
      </Switch>
    </Router>
     </>
  )
}

export default App;
