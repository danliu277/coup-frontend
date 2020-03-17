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
        this.setState(() => ({ selectedAction: option }))
    }

    mapActions = () => {
        const { selectedAction } = this.state
        return options.map((option, index) => {
            return <li
                className={selectedAction === index ? 'selected-action' : ''}
                key={index}
                onClick={() => this.selectAction(index)}>
                {option}
            </li>
        })
    }

    handleClose = () => {
        this.setState(() => ({selectedAction: -1}))
        this.props.handleClose()
    }

    executeAction = () => {
        const {selectedAction} = this.state
        const {game, userGame} = this.props
        if(selectedAction >= 0) {
            this.props.executeAction(selectedAction, game.id, userGame.id)
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
                    {/* <h3>Normal Actions</h3>
                    <ul>
                        <li>Income (Take one coin fomr treasury)</li>
                        <li>Foreign Aid (Take 2 coin from treasury)</li>
                        <li>Coup (Pay 7 coins to force another player to lose influence</li>
                    </ul>
                    <h3>Duke</h3>
                    <ul>
                        <li>Take 3 coins from treasury</li>
                    </ul>
                    <h3>Assassin</h3>
                    <ul>
                        <li>Pay 3 coins to assassinate another players character</li>
                    </ul>
                    <h3>Captain</h3>
                    <ul>
                        <li>Take 3 coins from another player</li>
                    </ul>
                    <h3>Ambassador</h3>
                    <ul>
                        <li>Draw 2 cards and choose which (if any) you want to exchange</li>
                    </ul> */}
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
        userGame: state.userGame,
        userGames: state.userGames
    }
}

const mdp = dispatch => {
    return {
        executeAction: (action, gameId, userGameId, targetId) => dispatch(executeActionCreator(action, gameId, userGameId, targetId))
    }
}

export default connect(msp, mdp)(ActionModal)