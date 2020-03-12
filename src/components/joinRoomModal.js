import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

const JoinRoomModal = ({show, handleClose, room, joinRoom}) => {
    const [password, setPassword] = useState('')

    const handleJoin = (event) => {
        event.preventDefault()
        joinRoom(password)
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Join Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form>
                    <label>Room Name: {room && room.name}</label>
                    <br />
                    <label>Password:</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleJoin}>
                    Join Room
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default JoinRoomModal