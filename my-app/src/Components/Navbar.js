import React from 'react';
import { Link } from 'react-router-dom';
import LogIn from './LogIn.js';
import firebase from 'firebase/app';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      routeToLogin: false
    }
  }

  componentDidMount() {
    this.unregisterAuthObserver = firebase.auth().onAuthStateChanged(
      (user) => {
        this.setState({
          isSignedIn: !!user
        }, () => {
          this.props.updateGame("isSignedIn", !!user)
        })

      }
    );
  }
  
  // why do we need to this again? should it be in here or App?
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  signIn = () => {
    console.log("returning login comp");
    this.setState({routeToLogin: true});
  }

  signInOrOut() {
    if (this.props.isSignedIn === true) {
      return (
        <span onClick= {() => firebase.auth().signOut()}><strong>Sign Out</strong></span>
      )
    } else {
      return (
        <span onClick={this.signIn}><strong>Sign In</strong></span>
        // <Link to="/sign-in">Sign In</Link>
      )
    }
  }

  render() {
    if (this.state.routeToLogin === true) {
      return (
        <LogIn uiConfig ={this.props.uiConfig} fbAuth = {firebase.auth()}/>
      )
    } else {
      return(
        <nav className="navbar fixed-top navbar-light">
          <div className="d-flex justify-content-between">
            <Link to="/" className="navbar-brand">
              <img src={require("../img/law.png")} width="30" height="30" className="d-inline-block align-top logo" alt="A gavel"/>
              DebateNOW
            </Link>
          </div>
          <div id="nav-links">
            <Link to="/">Home</Link>
            <Link to="/create-game">Create New Game</Link>
            {this.signInOrOut()}
          </div>
        </nav>
      )
    }
  }
}

export default Navbar;