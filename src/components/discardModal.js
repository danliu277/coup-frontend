import React, { Component, Fragment } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';

class DiscardModal extends Component {
    mapCards = () => {
        return this.props.game && this.props.game.game_cards.map((card) => {
            return <Fragment key={card.id}>
                <img className="coup-card" src={`${process.env.PUBLIC_URL}/${card.name}.png`} alt={card.name} />
            </Fragment>
        })
    }

    handleClose = () => {
        this.props.handleClose()
    }

    render() {
        const { show, handleClose } = this.props
        return (
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Join Room</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.mapCards()}
                </Modal.Body>
                <Modal.Footer>
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
        game: state.game
    }
}

export default connect(msp)(DiscardModal)