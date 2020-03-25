import React, { Component } from 'react'
import { Button, Modal } from 'react-bootstrap';
import { connect } from 'react-redux';
import { handleReactionActionCreator, handleCallBluffActionCreator, handleBlockActionCreator } from '../action/actionCreator'

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
                return `recieved 2 coin from foreign aid`
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
            case 7:
                return `blocks ${this.getUserName(gameMove.target_id)} from recieving foreign aid`
            case 8:
                return `blocks ${this.getUserName(gameMove.target_id)} from assassinating`
            case 9:
                return `blocks ${this.getUserName(gameMove.target_id)} from stealing`
            default:
                return ``
        }
    }

    isBluff = () => {
        const { userGame, gameMove } = this.props
        if (userGame && userGame.cards) {
            switch (gameMove) {
                case 1:
                    return userGame.cards.some(card => card.name === 'Duke')
                case 4:
                    return userGame.cards.some(card => card.name === 'Contessa')
                case 5:
                    return userGame.cards.some(card => card.name === 'Captain' || card.name === 'Ambassador')
                default:
                    return false
            }
        }
    }

    executeAction = (reaction) => {
        const { game, userGame, handleClose } = this.props
        this.props.handleReaction(game.id, reaction, userGame.id)
        handleClose()
    }

    callBluff = () => {
        const { game, userGame, handleClose, callBluff } = this.props
        callBluff(game.id, userGame.id)
        handleClose()
    }

    block = () => {
        const { game, userGame, handleClose, block } = this.props
        block(game.id, userGame.id)
        handleClose()
    }

    allowBlock = () => {
        const { gameMove } = this.props
        if (gameMove) {
            if (gameMove.action === 1 || gameMove.action === 3 || gameMove.action === 4 || gameMove.action === 5)
                return true
        }
        return false
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
                    {gameMove && gameMove.action > 2 &&
                        <Button variant="primary" onClick={() => this.callBluff()}>
                            Call Bluff
                    </Button>}
                    {this.allowBlock() &&
                        <Button variant={this.isBluff() ? `danger` : `primary`} onClick={() => this.block()}>
                            Block
                    </Button>}
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
        handleReaction: (gameId, reaction, userGameId) => dispatch(handleReactionActionCreator(gameId, reaction, userGameId)),
        callBluff: (gameId, userGameId) => dispatch(handleCallBluffActionCreator(gameId, userGameId)),
        block: (gameId, userGameId) => dispatch(handleBlockActionCreator(gameId, userGameId))
    }
}

export default connect(msp, mdp)(ReactionModal)