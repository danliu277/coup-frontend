import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getUserGameActionCreator } from '../action/actionCreator';

class GameContainer extends Component {
    componentDidMount() {
        this.props.getUserGame(this.props.user.id)
    }

    handleRecieved = () => {

    }

    render() {
        return (
            <div>
                <h1>Game Container</h1>
                <ActionCable
                    channel={'GamesChannel'}
                    room={this.props.game.id}
                    onReceived={this.handleRecieved}
                />
            </div>
        )
    }
}

const msp = state => {
    return {
        user: state.user,
        room: state.room,
        userGames: state.userGames,
        game: state.game
    }
}

const mdp = dispatch => {
    return {
        getUserGame: (userId) => dispatch(getUserGameActionCreator(userId))
    }
}

export default connect(msp, mdp)(GameContainer)