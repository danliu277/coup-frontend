import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { swapCardsActionCreator } from '../action/actionCreator'

class SwapCardModal extends Component {
    state = {
        selectedHand: [],
        selectedDraw: []
    }

    handleClose = () => {
        this.props.handleClose()
    }

    mapCards = (cards, onClick) => {
        const { selectedDraw, selectedHand } = this.state
        return cards && cards.map(card => {
            return <img
                key={card.id}
                className={`coup-card ${(selectedDraw.includes(card.id) || selectedHand.includes(card.id)) && 'selected'}`}
                src={`${process.env.PUBLIC_URL}/${card.name}.png`}
                alt={card.name}
                onClick={() => onClick(card.id)}
            />
        })
    }

    selectHandCard = cardId => {
        const { selectedHand } = this.state
        if (selectedHand.includes(cardId)) {
            this.setState(prevState => ({ selectedHand: prevState.selectedHand.filter(card => card !== cardId) }))
        } else {
            this.setState(prevState => ({ selectedHand: [...prevState.selectedHand, cardId] }))
        }
    }

    selectDrawnCard = cardId => {
        const { selectedDraw } = this.state
        if (selectedDraw.includes(cardId)) {
            this.setState(prevState => ({ selectedDraw: prevState.selectedDraw.filter(card => card !== cardId) }))
        } else {
            this.setState(prevState => ({ selectedDraw: [...prevState.selectedDraw, cardId] }))
        }
    }

    executeAction = () => {
        const { selectedDraw, selectedHand } = this.state
        const { executeAction, game, userGame } = this.props
        if (selectedDraw.length === selectedHand.length) {
            if (selectedDraw.length !== 0 && selectedHand.length !== 0) {
                executeAction(game.id, selectedHand, selectedDraw, userGame.id)
                this.setState(() => ({ selectedDraw: [], selectedHand: [] }))
            }
            this.props.handleClose()
        }
    }

    render() {
        const { show, drawnCards, userGame } = this.props
        return (
            <Modal show={show} onHide={() => { return null }}>
                <Modal.Header closeButton>
                    <Modal.Title>Swap Cards</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="drawn-cards-modal">
                        {this.mapCards(drawnCards, this.selectDrawnCard)}
                    </div>
                    <div className="user-cards-modal">
                        {this.mapCards(userGame && userGame.cards, this.selectHandCard)}
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={this.executeAction}>
                        Execute
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
        executeAction: (gameId, selectedHand, selectedDraw, userGameId) => dispatch(swapCardsActionCreator(gameId, selectedHand, selectedDraw, userGameId))
    }
}

export default connect(msp, mdp)(SwapCardModal)