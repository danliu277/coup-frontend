import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getGameActionCreator, startGameActionCreator, getUserGamesActionCreator } from '../action/actionCreator';

class RoomContainer extends Component {
    componentDidMount() {
        this.props.getUserGames(this.props.room.id)
    }

    handleRecieved = () => {
        this.props.getUserGames(this.props.room.id)
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
        this.props.startGame(this.props.room.id)
    }

    render() {
        return (
            <>
                {
                    this.props.game ? <Redirect to={`/games/${this.props.game.id}`} /> :
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
                }
            </>
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
        getUserGames: (roomId) => dispatch(getUserGamesActionCreator(roomId)),
        getGame: (roomId) => dispatch(getGameActionCreator(roomId)),
        startGame: (roomId) => dispatch(startGameActionCreator(roomId))
    }
}

export default connect(msp, mdp)(RoomContainer)