import React from 'react'
import { connect } from 'react-redux';
import RoomPlayers from './roomPlayers';
import GameContainer from '../containers/gameContainer';

const RenderRoom = (props) => {
    return (
        <>
            {
                // Add Game container here to avoid unsubscribing
                props.game ? <GameContainer /> : <RoomPlayers />
            }
        </>
    )
}

const msp = state => {
    return {
        game: state.game
    }
}

export default connect(msp)(RenderRoom)