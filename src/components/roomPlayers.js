import React, { Component } from 'react'
import { connect } from 'react-redux';
import { startGameActionCreator } from '../action/actionCreator';

class RoomPlayers extends Component {
    mapUserGames = () => {
        return this.props.userGames.map(userGame => {
            return <div key={userGame.id}>
                {this.props.room.user.id === userGame.user.id && '👑'}
                {userGame.user && userGame.user.nickname}
            </div>
        })
    }

    startGame = () => {
        this.props.startGame(this.props.room.id)
    }

    render() {
        return (
            <>
                <h1>{this.props.room && this.props.room.name}</h1>
                <button onClick={this.startGame}>Start Game</button>
                <h6>Players:</h6>
                {this.mapUserGames()}
            </>
        )
    }
}

const msp = state => {
    return {
        room: state.room,
        userGames: state.userGames
    }
}

const mdp = dispatch => {
    return {
        startGame: (roomId) => dispatch(startGameActionCreator(roomId))
    }
}

export default connect(msp, mdp)(RoomPlayers)