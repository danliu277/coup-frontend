import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { ActionCableConsumer } from 'react-actioncable-provider';
import { API_ROOT, HEADERS } from '../constants';
import Room from '../components/room';
import CreateRoomModal from '../components/createRoomModal';

const RoomContainer = (props) => {
    const [rooms, setRooms] = useState([])
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        console.log(props)
        fetch(`${API_ROOT}/rooms`)
            .then(res => res.json())
            .then(rooms => {
                setRooms(rooms)
            })
    }, [props])

    const handleReceivedRoom = response => {
        const { room } = response;
        setRooms([...rooms, room])
      };

    const createRoom = (room) => {
        fetch(`${API_ROOT}/rooms`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({...room, user_id: props.user.id})
        })
        handleClose()
    }

    return (
        <div>
            <ActionCableConsumer
                channel={{ channel: 'RoomsChannel', user: props.user && props.user.id }}
                onReceived={handleReceivedRoom}
            />
            <h1>Room List</h1>
            <div>
                {mapRooms(rooms)}
            </div>
            <button onClick={handleShow}>Create Room</button>
            <CreateRoomModal show={show} handleClose={handleClose} createRoom={createRoom} />
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