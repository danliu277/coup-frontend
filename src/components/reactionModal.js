import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleReactionActionCreator } from '../action/actionCreator'

class ReactionModal extends Component {
    getUserName = (id) => {
        const { userGames } = this.props
        if (id) {
            const userGame = userGames.find(userGame => userGame.id === id)
            return userGame ? userGame.nickname : null
        } else {
            return false
        }
    }

    getAction = () => {
        const { gameMove } = this.props
        switch (gameMove && gameMove.action) {
            case 0:
                return `recieved 1 coin as income`
            case 1:
                return `recieved 2 coin from foerign aid`
            case 2:
                return `pays 7 coins to launch a coup against ${this.getUserName(gameMove.target_id)}`
            case 3:
                return `as a DUKE recieved 3 coins from treasury`
            case 4:
                return `as an ASSASSIN pays 3 coins to assassinate ${this.getUserName(gameMove.target_id)}`
            case 5:
                return `as a CAPTAIN steals 2 coins from ${this.getUserName(gameMove.target_id)}`
            case 6:
                return `as an AMBASSADOR draws 2 cards to swap`
            default:
                return ``
        }
    }

    executeAction = (reaction) => {
        const { game, userGame, handleClose } = this.props
        this.props.handleReaction(game.id, reaction, userGame.id)
        handleClose()
    }

    render() {
        const { show, gameMove } = this.props
        return (
            <Modal show={show} onHide={() => { return null }}>
                <Modal.Header closeButton>
                    <Modal.Title>Reaction</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {`${this.getUserName(gameMove && gameMove.user_game_id)} ${this.getAction()}`}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" onClick={() => this.executeAction(1)}>
                        Call Bluff
                    </Button>
                    <Button variant="primary" onClick={() => this.executeAction(2)}>
                        Block
                    </Button>
                    <Button variant="primary" onClick={() => this.executeAction(0)}>
                        Pass
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }
}

const msp = state => {
    return {
        userGames: state.userGames,
        userGame: state.userGame,
        game: state.game
    }
}

const mdp = dispatch => {
    return {
        handleReaction: (gameId, reaction, userGameId) => dispatch(handleReactionActionCreator(gameId, reaction, userGameId))
    }
}

export default connect(msp, mdp)(ReactionModal)