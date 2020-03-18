import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { executeActionCreator } from '../action/actionCreator'

class SwapCardModal extends Component {
    handleClose = () => {
        this.props.handleClose()
    }

    mapCards = (cards) => {
        return cards && cards.map(card => {
            return <img id={card.id} className="coup-card" key={card.id} src={`${process.env.PUBLIC_URL}/${card.name}.png`} alt={card.name} />
        })
    }

    render() {
        const { show, drawnCards, userGame } = this.props
        return (
            <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Swap Cards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="drawn-cards-modal">
                        {this.mapCards(drawnCards)}
                    </div>
                    <div className="user-cards-modal">
                        {this.mapCards(userGame && userGame.cards)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.executeAction}>
                        Execute
                    </Button>
                    <Button variant="danger" onClick={this.handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const msp = state => {
    return {
        game: state.game,
        userGame: state.userGame,
        drawnCards: state.drawnCards
    }
}

const mdp = dispatch => {
    return {
        // executeAction: (action, gameId, userGameId, roomId, targetId) => dispatch(executeActionCreator(action, gameId, userGameId, roomId, targetId))
    }
}

export default connect(msp, mdp)(SwapCardModal)