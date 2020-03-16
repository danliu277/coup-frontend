import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getGameActionCreator, startGameActionCreator, getUserGamesActionCreator } from '../action/actionCreator';
import RoomPlayers from '../components/roomPlayers';
import GameContainer from './gameContainer';

class RoomContainer extends Component {
    componentDidMount() {
        this.props.getUserGames(this.props.room.id)
    }

    handleRecieved = () => {
        this.props.getUserGames(this.props.room.id)
    }

    render() {
        return (
            <>
                {
                    <div>
                        <ActionCable
                            channel={'RoomsChannel'}
                            room={{ id: this.props.room.id, user: this.props.user.id }}
                            onReceived={this.handleRecieved}
                        />
                        {
                            // Add Game container here to avoid unsubscribing
                            this.props.game ? <GameContainer /> : <RoomPlayers />
                        }
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