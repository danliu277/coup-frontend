import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants';
import { ActionCableConsumer } from 'react-actioncable-provider'

const RoomContainer = (props) => {
    const [userGames, setUserGames] = useState([])

    useEffect(() => {
        fetch(`${API_ROOT}/user_games/${props.room.id}`)
        .then(res => res.json())
        .then(userGames => setUserGames(userGames))
    }, [])

    const handleRecieved = response => {
        const { userGame } = response
        setUserGames([...userGames, userGame])
    }

    return (
        <div>
            <h1>Room Container</h1>
            <ActionCableConsumer
                key={props.room.id}
                channel={{ channel: 'RoomChannel', room: props.room.id }}
                onReceived={handleRecieved}
            />

        </div>
    )
}

const msp = state => {
    return {
        room: state.room
    }
}

export default connect(msp)(RoomContainer)

const mapUserGames = userGames => {
    return userGames.map(userGame => {
        return <div>{userGame.user}</div>
    })
}