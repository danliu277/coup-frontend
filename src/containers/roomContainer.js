import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { API_ROOT } from '../constants';
import Room from '../components/room';

const RoomContainer = (props) => {
    const [rooms, setRooms] = useState([])

    useEffect(() => {
        console.log(props)
        fetch(`${API_ROOT}/rooms`)
            .then(res => res.json())
            .then(rooms => {
                setRooms(rooms)
            })
    }, [props])

    return (
        <div>
            <h1>Room List</h1>
            <div>
                {mapRooms(rooms)}
            </div>
            <button>Create Room</button>
        </div>
    )
}

const msp = (state) => {
    return {
        user: state.user
    }
}

export default connect(msp)(RoomContainer)

const mapRooms = rooms => {
    return rooms && rooms.map(room => 
        <Room key={room.id} {...room} />
    )
}