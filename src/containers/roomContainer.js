import React, { Component } from 'react'
import { connect } from 'react-redux';
import { API_ROOT } from '../constants';
import { ActionCable } from 'actioncable-client-react'
import { getGameActionCreator, startGameActionCreator, getUserGamesActionCreator } from '../action/actionCreator';

class RoomContainer extends Component {
    state = {
    }

    componentDidMount() {
        this.props.getUserGames(this.props.room.id)
    }

    handleRecieved = () => {
        fetch(`${API_ROOT}/user_games/${this.props.room.id}`)
            .then(res => res.json())
            .then(userGames => {
                this.setState(() => ({ userGames }))
            })
    }


    mapUserGames = () => {
        return this.props.userGames.map(userGame => {
            return <div key={userGame.id}>
                {this.props.room.user.id === userGame.user.id && '👑'}
                {userGame.user && userGame.user.nickname}
            </div>
        })
    }

    startGame = () => {
        this.props.getGame(this.props.room.id)
    }

    render() {
        return (
            <div>
                <h1>{this.props.room && this.props.room.name}</h1>
                <ActionCable
                    channel={'RoomsChannel'}
                    room={{ id: this.props.room.id, user: this.props.user.id }}
                    onReceived={this.handleRecieved}
                />
                <button onClick={this.startGame}>Start Game</button>
                <h6>Players:</h6>
                {this.mapUserGames()}
            </div>
        )
    }
}

const msp = state => {
    return {
        user: state.user,
        room: state.room,
        userGames: state.userGames
    }
}

const mdp = dispatch => {
    return {
        getUserGames: (roomId) => dispatch(getUserGamesActionCreator(roomId)),
        getGame: (roomId) => dispatch(getGameActionCreator(roomId)),
        // startGame: () => dispatch(startGameActionCreator())
    }
}

export default connect(msp, mdp)(RoomContainer)