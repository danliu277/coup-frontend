import React, { Component } from 'react'
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants';
import Room from '../components/room';
import CreateRoomModal from '../components/createRoomModal';
import JoinRoomModal from '../components/joinRoomModal';
import { setRoomActionCreator } from '../actionCreator';

class RoomListContainer extends Component {
    state = {
        rooms: [],
        showCreate: false,
        showJoin: false,
        room: null
    }

    handleCloseCreate = () => this.setState(() => ({ showCreate: false }));
    handleShowCreate = () => this.setState(() => ({ showCreate: true }));
    handleCloseJoin = () => {
        this.setState(() => {
            return {
                room: null,
                showJoin: false
            }
        })
    };
    handleShowJoin = room => {
        this.setState(() => {
            return {
                room,
                showJoin: true
            }
        })
    }

    componentDidMount() {
        this.getRooms()
    }

    componentWillUnmount() {
        // Fix error
        this.setState = () => {
            return;
        };
    }

    getRooms = () => {
        fetch(`${API_ROOT}/rooms`)
            .then(res => res.json())
            .then(rooms => {
                this.setState(() => ({ rooms }))
            })
    }

    createRoom = (room) => {
        fetch(`${API_ROOT}/rooms`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ room: { ...room, user_id: this.props.user.id } })
        }).then(res => res.json())
            .then(room => {
                this.props.setRoom(room)
                this.handleCloseCreate()
                this.props.history.push(`/rooms/${room.id}`)
            })
    }

    joinRoom = (password) => {
        fetch(`${API_ROOT}/rooms/${this.state.room.id}`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ user_id: this.props.user.id, password })
        })
            .then(res => res.json())
            .then(room => {
                if (room.errors) {
                    alert('Wrong Password')
                } else {
                    this.props.setRoom(room)
                    this.handleCloseJoin()
                    this.props.history.push(`/rooms/${room.id}`)
                }
            })
    }

    mapRooms = rooms => {
        return rooms && rooms.map(room =>
            <Room key={room.id} room={room} handleShowJoin={this.handleShowJoin} />
        )
    }
    render() {
        return (
            <div>
                <h1>Room List</h1>
                <button onClick={this.getRooms}>Refresh</button>
                <div>
                    {this.mapRooms(this.state.rooms)}
                </div>
                <button onClick={this.handleShowCreate}>Create Room</button>
                <CreateRoomModal
                    show={this.state.showCreate}
                    handleClose={this.handleCloseCreate}
                    createRoom={this.createRoom}
                />
                <JoinRoomModal
                    show={this.state.showJoin}
                    handleClose={this.handleCloseJoin}
                    joinRoom={this.joinRoom}
                    room={this.state.room}
                />
            </div>
        )
    }
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