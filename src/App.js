import React, { Component } from 'react';
import {connect} from 'react-redux'
import Navigation from './components/Navigation/Navigation';
import AddImageForm from './components/AddImageForm/AddImageForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank'; 
import {changeSearchFieldAction,onSubmitAction,signInOutAction} from './components/actions'
import { BrowserRouter as Router, Route,Redirect  } from "react-router-dom";


import './App.css';

  const mapStateToProps = (state) =>{
    return {
      textField:state.changeSearchField.textField,
      box:state.onSubmit.box,
      isPending:state.onSubmit.isPending,
      error:state.onSubmit.error,
      imageUrl:state.onSubmit.imageUrl,
      loggedIn:state.signInOut.loggedIn,
      user:state.signInOut.user
    }
  }

  const mapDispatchToProps = (dispatch) =>{
      return{
        inputChange: (event) => dispatch(changeSearchFieldAction(event.target.value)),
        onSubmit:() => dispatch(onSubmitAction()),
        signInOut: (data) => dispatch(signInOutAction(data))      }
  }



class App extends Component {



  render() {
    const {textField ,box,isPending, loggedIn,inputChange ,
        onSubmit,signInOut,loadUser,user } =  this.props;
    const userRegister = this.props.user.id!=="";
    console.log(user);
    return (
      <div className="App">


        <Router>
          <div>

            <Navigation  loggedIn={loggedIn} signInOut={signInOut.bind(this)} />

            <Route path="/Register" render={props=>(
                  <Register {...props} 
                  signInOut={signInOut.bind(this)}
                  />
              )}/>
            <Route path="/profile" render={props=>(
              loggedIn? (

                 <div>
                    <Rank {...props}
                      name={user.name}
                      entries={user.entries}  
                    />
                    <AddImageForm  {...props} 
                      props={props} 
                      inputChange={inputChange}
                      onSubmit={onSubmit.bind(this)} 
                    />
                    <FaceRecognition {...props} box={box} imageUrl={textField}/>       
                    
                  </div>
                  ) : (
                    <div className="center">
                    <p>You Must sign in/up first </p>
                    </div>
                  )

              )}/>
            <Route exact path="/Signin" render={props =>(
                  <Signin {...props} 
                  signInOut={signInOut.bind(this)}
                  loggedIn={loggedIn}  
                  />
              
              )}/>
            <Route exact path="/" render={props =>(
                  <Signin {...props} 
                  signInOut={signInOut.bind(this)}
                  loggedIn={loggedIn}  
                  />
              
              )}/>
          </div>
        </Router>
         
      </div>
    );
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(App);