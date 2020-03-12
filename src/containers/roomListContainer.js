import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants';
import Room from '../components/room';
import CreateRoomModal from '../components/createRoomModal';
import JoinRoomModal from '../components/joinRoomModal';
import { setRoomActionCreator } from '../actionCreator';

const RoomListContainer = (props) => {
    const [rooms, setRooms] = useState([])
    const [showCreate, setShowCreate] = useState(false);
    const [showJoin, setShowJoin] = useState(false);
    const [room, setRoom] = useState(null)

    const handleCloseCreate = () => setShowCreate(false);
    const handleShowCreate = () => setShowCreate(true);
    const handleCloseJoin = () => {
        setRoom(null)
        setShowJoin(false)
    };
    const handleShowJoin = room => {
        setRoom(room)
        setShowJoin(true);
    }

    useEffect(() => {
        getRooms()
    }, [props.user])

    const getRooms = () => {
        fetch(`${API_ROOT}/rooms`)
            .then(res => res.json())
            .then(rooms => {
                setRooms(rooms)
            })
    }

    const createRoom = (room) => {
        fetch(`${API_ROOT}/rooms`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ room: { ...room, user_id: props.user.id } })
        }).then(res => res.json())
            .then(room => {
                props.setRoom(room)
                handleCloseCreate()
                props.history.push(`/rooms/${room.id}`)
            })
    }

    const joinRoom = (password) => {
        fetch(`${API_ROOT}/rooms/${room.id}`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ user_id: props.user.id, password })
        })
            .then(res => res.json())
            .then(room => {
                if(room.errors) {
                    alert('Wrong Password')
                }  else {
                    props.setRoom(room)
                    handleCloseJoin()
                    props.history.push(`/rooms/${room.id}`)
                }
            })
    }

    const mapRooms = rooms => {
        return rooms && rooms.map(room =>
            <Room key={room.id} room={room} handleShowJoin={handleShowJoin} />
        )
    }

    return (
        <div>
            <h1>Room List</h1>
            <button onClick={getRooms}>Refresh</button>
            <div>
                {mapRooms(rooms)}
            </div>
            <button onClick={handleShowCreate}>Create Room</button>
            <CreateRoomModal show={showCreate} handleClose={handleCloseCreate} createRoom={createRoom} />
            <JoinRoomModal show={showJoin} handleClose={handleCloseJoin} joinRoom={joinRoom} room={room} />
        </div>
    )
}

const msp = state => {
    return {
        user: state.user
    }
}

const mdp = dispatch => {
    return {
        setRoom: (room) => dispatch(setRoomActionCreator(room))
    }
}

export default connect(msp, mdp)(RoomListContainer)