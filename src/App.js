import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';
import Register from './components/register'
import RoomListContainer from './containers/roomListContainer';
import RoomContainer from './containers/roomContainer';
import GameContainer from './containers/gameContainer';


function App(props) {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/rooms" component={(routerProps) => {
          if (props.user)
            return <RoomListContainer {...routerProps} />
          else
            return <Redirect to="/" />
        }} />
        <Route exact path="/rooms/:id" component={(routerProps) => {
          if (props.user && props.room)
            return <RoomContainer {...routerProps} />
          else
            return <Redirect to="/" />
        }} />
        <Route exact path="/games/:id" component={(routerProps) => {
          if (props.user && props.game)
            return <GameContainer {...routerProps} />
          else
            return <Redirect to="/" />
        }} />
        <Route path="/" component={(routerProps) => <Register {...routerProps} />} />
        <Route render={() => <Redirect to="/" />} />
      </Switch>
    </div>
  );
}

const msp = state => {
  return {
    user: state.user,
    room: state.room,
    game: state.game
  }
}

export default connect(msp)(App);