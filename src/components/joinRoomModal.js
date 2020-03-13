import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
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
        this.props.joinRoom(this.state.password)
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

export default JoinRoomModal