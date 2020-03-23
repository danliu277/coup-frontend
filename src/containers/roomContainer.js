import React from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getUserGamesActionCreator, setGameActionCreator, getGameActionCreator } from '../action/actionCreator';
import RoomPlayers from '../components/roomPlayers';
import GameContainer from './gameContainer';

const RoomContainer = props => {
    const handleRecieved = response => {
        const { game } = response
        if (game) {
            props.setGame(game)
            props.getGame(props.room.id)
        }
        else {
            props.getUserGames(props.room.id)
        }
    }

    return (
        <>
            {
                <div className="background">
                    <ActionCable
                        channel={'RoomsChannel'}
                        room={{ id: props.room.id, user: props.user.id }}
                        onReceived={handleRecieved}
                    />
                    {props.game ? <GameContainer /> : <RoomPlayers />}
                </div>
            }
        </>
    )
}

const msp = state => {
    return {
        user: state.user,
        room: state.room,
        game: state.game
    }
}

const mdp = dispatch => {
    return {
        getUserGames: (roomId) => dispatch(getUserGamesActionCreator(roomId)),
        setGame: (game) => dispatch(setGameActionCreator(game)),
        getGame: (roomId) => dispatch(getGameActionCreator(roomId))
    }
}

export default connect(msp, mdp)(RoomContainer)