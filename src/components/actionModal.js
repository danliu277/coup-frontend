import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { executeActionCreator } from '../action/actionCreator'

const options = [
    "Normal: Income (Take one coin from treasury)",
    "Normal: Foreign Aid (Take 2 coin from treasury)",
    "Normal: Coup (Pay 7 coins to force another player to lose influence",
    "Duke: Take 3 coins from treasury",
    "Assassin: Pay 3 coins to assassinate another players character",
    "Captain: Take 2 coins from another player",
    "Amabassador: Draw 2 cards and choose which (if any) you want to exchange"
]

class ActionModal extends Component {
    state = {
        selectedAction: -1
    }

    selectAction = (option) => {
        const { userGame } = this.props
        if (userGame.money < 10 || (userGame.money >= 10 && option === 2))
            this.setState(() => ({ selectedAction: option }))
    }

    mapActions = () => {
        const { selectedAction } = this.state
        const { userGame } = this.props
        
        return options.map((option, index) => {
            let className = selectedAction === index ? 'selected' : ''
            if (userGame && userGame.cards) {
                switch (index) {
                    case 3:
                        if (!userGame.cards.some(card => card.name === 'Duke'))
                            className += ' red'
                        break;
                    case 4:
                        if (!userGame.cards.some(card => card.name === 'Assassin'))
                            className += ' red'
                        break;
                    case 5:
                        if (!userGame.cards.some(card => card.name === 'Captain'))
                            className += ' red'
                        break;
                    case 6:
                        if (!userGame.cards.some(card => card.name === 'Ambassador'))
                            className += ' red'
                        break;
                    default:
                        break;
                }
            }
            className += index !== 2 && userGame && userGame.money >= 10 ? ' grey' : ''
            return <li
                className={className}
                key={index}
                onClick={() => this.selectAction(index)}>
                {option}
            </li>
        })
    }

    handleClose = () => {
        this.setState(() => ({ selectedAction: -1 }))
        this.props.handleClose()
    }

    executeAction = () => {
        const { selectedAction } = this.state
        const { game, userGame, targetGame } = this.props
        if (selectedAction >= 0) {
            this.props.executeAction(selectedAction, game.id, userGame.id, game.room_id, targetGame && targetGame.id)
            this.handleClose()
        }
    }

    render() {
        const { show } = this.props
        return (
            <Modal show={show} onHide={this.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Action</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <ul>
                        {this.mapActions()}
                    </ul>
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
        user: state.user,
        game: state.game,
        userGame: state.userGame
    }
}

const mdp = dispatch => {
    return {
        executeAction: (action, gameId, userGameId, roomId, targetId) => dispatch(executeActionCreator(action, gameId, userGameId, roomId, targetId))
    }
}

export default connect(msp, mdp)(ActionModal)