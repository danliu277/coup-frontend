import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
class CreateRoomModal extends Component {
    state = {
        name: '',
        password: ''
    }

    updateValues = event => {
        const {name, value} = event.target
        this.setState(() => ({[name]: value}))
    }

    handleCreate = (event) => {
        event.preventDefault()
        this.props.createRoom(this.state)
        this.setState(() => ({ name: '', password: '' }))
    }

    render() {
        const { show, handleClose } = this.props
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Create Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={this.handleCreate}>
                        <label>Room Name:</label>
                        <input
                            name="name"
                            value={this.state.name}
                            onChange={this.updateValues}
                        />
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
                    <Button variant="primary" onClick={this.handleCreate}>
                        Create Room
                    </Button>
                    <Button variant="danger" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

export default CreateRoomModal