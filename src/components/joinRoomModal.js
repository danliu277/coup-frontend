import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { joinRoomActionCreator } from '../action/actionCreator';

class JoinRoomModal extends Component {
    state = {
        password: ''
    }

    updateValues = event => {
        const {name, value} = event.target
        this.setState(() => ({[name]: value}))
    }

    handleJoin = (event) => {
        event.preventDefault()
        this.props.joinRoom(this.props.room.id, this.props.user.id, this.state.password)
    }

    render() {
        const {show, handleClose, room} = this.props
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Join Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleJoin}>
                        <label>Room Name: {room && room.name}</label>
                        <br />
                        <label>Password:</label>
                        <input
                            name="password"
                            value={this.state.password}
                            onChange={this.updateValues}

                        />
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.handleJoin}>
                        Join Room
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
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
        joinRoom: (roomId, userId, password) => dispatch(joinRoomActionCreator(roomId, userId, password))
    }
}

export default connect(msp, mdp)(JoinRoomModal)