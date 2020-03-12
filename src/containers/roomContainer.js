import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants';
import { ActionCable } from 'actioncable-client-react'

const RoomContainer = (props) => {
    console.log('In room container')
    const [userGames, setUserGames] = useState([])

    useEffect(() => {
        fetch(`${API_ROOT}/user_games/${props.room.id}`)
            .then(res => res.json())
            .then(userGames => {
                setUserGames(userGames)
            })
    }, [userGames.length])

    const handleRecieved = response => {
        console.log(userGames)
        const { user_game } = response
        debugger
        setUserGames([...userGames, user_game])
    }


    const mapUserGames = () => {
        return userGames.map(userGame => {
            return <div key={userGame.id}>
                {props.room.user.id === userGame.user.id && '👑'}
                {userGame.user && userGame.user.nickname}
            </div>
        })
    }

    return (
        <div>
            <h1>Room Container</h1>
            <ActionCable
                // channel={{ channel: 'RoomsChannel', room: props.room.id, user:props.user.id }}
                channel={'RoomsChannel'}
                room={{id: props.room.id, user: props.user.id}}
                onReceived={handleRecieved}
            />
            <h6>Players:</h6>
            {mapUserGames()}
        </div>
    )
}

const msp = state => {
    return {
        user: state.user,
        room: state.room
    }
}

export default connect(msp)(RoomContainer)