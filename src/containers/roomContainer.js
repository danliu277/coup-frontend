import React from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getUserGamesActionCreator, setGameActionCreator } from '../action/actionCreator';
import RoomPlayers from '../components/roomPlayers';
import GameContainer from './gameContainer';

const RoomContainer = props => {
    const handleRecieved = () => {
        props.getUserGames(props.room.id)
    }

    const handleStartRecieved = response => {
        const { game } = response
        props.setGame(game)
    }

    return (
        <>
            {
                <div>
                    <ActionCable
                        channel={'RoomsChannel'}
                        room={{ id: props.room.id, user: props.user.id }}
                        onReceived={handleRecieved}
                    />
                    <ActionCable
                        channel={'GamesChannel'}
                        room={props.room.id}
                        onReceived={handleStartRecieved}
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
        setGame: (game) => dispatch(setGameActionCreator(game))
    }
}

export default connect(msp, mdp)(RoomContainer)