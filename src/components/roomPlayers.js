import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { getUserGamesActionCreator, startGameActionCreator } from '../action/actionCreator';

const RoomPlayers = props => {
    useEffect(() => {
        if(props.userGames.length === 0)
            props.getUserGames(props.room.id)
    }, [props])

    const mapUserGames = () => {
        return props.userGames.map(userGame => {
            return <div key={userGame.id} className="white">
                {props.room.user.id === userGame.user.id && '👑'}
                {userGame.user && userGame.user.nickname}
            </div>
        })
    }

    const startGame = () => {
        props.startGame(props.room.id)
    }

    return (
        <>
            <h1 className="display-3 white">{props.room && props.room.name}</h1>
            <button onClick={startGame}>Start Game</button>
            <h6 className="display-6 white">Players:</h6>
            {mapUserGames()}
        </>
    )
}

const msp = state => {
    return {
        room: state.room,
        userGames: state.userGames
    }
}

const mdp = dispatch => {
    return {
        getUserGames: (roomId) => dispatch(getUserGamesActionCreator(roomId)),
        startGame: (roomId) => dispatch(startGameActionCreator(roomId))
    }
}

export default connect(msp, mdp)(RoomPlayers)