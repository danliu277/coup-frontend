import React, { Component } from 'react'
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'
import Room from '../components/room';
import CreateRoomModal from '../components/createRoomModal';
import JoinRoomModal from '../components/joinRoomModal';
import { getRoomsActionCreator, setRoomsActionCreator } from '../action/actionCreator';

class RoomListContainer extends Component {
    state = {
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
        this.props.getRooms()
    }

    componentWillUnmount() {
        // Fix error
        this.setState = () => {
            return;
        };
    }

    mapRooms = rooms => {
        return rooms && rooms.map(room =>
            <Room key={room.id} room={room} handleShowJoin={this.handleShowJoin} />
        )
    }

    render() {
        return (
            <>
                {this.props.room ? <Redirect to={`/rooms/${this.props.room.id}`} /> :
                        <div>
                            <h1>Room List</h1>
                            <button onClick={() => this.props.getRooms()}>Refresh</button>
                            <div>
                                {this.mapRooms(this.props.rooms)}
                            </div>
                            <button onClick={this.handleShowCreate}>Create Room</button>
                            <CreateRoomModal
                                show={this.state.showCreate}
                                handleClose={this.handleCloseCreate}
                            />
                            <JoinRoomModal
                                show={this.state.showJoin}
                                handleClose={this.handleCloseJoin}
                                room={this.state.room}
                            />
                        </div>}
            </>
        )
    }
}

const msp = state => {
    return {
        user: state.user,
        rooms: state.rooms,
        room: state.room
    }
}

const mdp = dispatch => {
    return {
        getRooms: () => dispatch(getRoomsActionCreator()),
        setRoom: () => dispatch(setRoomsActionCreator())
    }
}

export default connect(msp, mdp)(RoomListContainer)