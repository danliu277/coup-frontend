import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap';

const CreateRoomModal = ({show, handleClose, createRoom}) => {
    const [name, setName] = useState('')
    const [password, setPassword] = useState('')

    const handleCreate = (event) => {
        event.preventDefault()
        createRoom({ name, password})
        setName('')
        setPassword('')
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Create Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form onSubmit={handleCreate}>
                    <label>Room Name:</label>
                    <input value={name} onChange={e => setName(e.target.value)} />
                    <br />
                    <label>Password:</label>
                    <input value={password} onChange={e => setPassword(e.target.value)} />
                </form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleCreate}>
                    Create Room
                </Button>
                <Button variant="danger" onClick={handleClose}>
                    Close
                </Button>
            </Modal.Footer>
        </Modal>
    )
}

export default CreateRoomModal