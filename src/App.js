import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './components/register'
import RoomContainer from './containers/roomContainer';

function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route path="/rooms" component={() => {
          if(props.user)
            return <RoomContainer />
          else
            return <Redirect to="/" />
        }}/>
        <Route path="/" component={(routerProps) => <Register {...routerProps} />}/>
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

const msp = state => {
  return {
    user: state.user
  }
}

export default connect(msp)(App);
