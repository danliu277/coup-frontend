import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import {
    getUserGameActionCreator, getUserGamesActionCreator, setDrawnCardsActionCreator,
    getGameActionCreator
} from '../action/actionCreator';
import ActionModal from '../components/actionModal';
import SwapCardModal from '../components/swapCardModal';
import ReactionModal from '../components/reactionModal';
import DiscardModal from '../components/discardModal';
import { Button } from 'react-bootstrap';
import styled from 'styled-components'
import Display from '../components/display'

class GameContainer extends Component {
    state = {
        showAction: false,
        showSwap: false,
        showReaction: false,
        showDiscard: false,
        targetGame: null,
        gameMove: null
    }

    componentDidMount() {
        this.props.getUserGame(this.props.user.id)
        this.props.getUserGames(this.props.room.id)
    }

    componentDidUpdate(prevProps) {
        if (prevProps.drawnCards.length === 0 && this.props.drawnCards.length === 2) {
            this.showSwap()
        }
    }

    selectTarget = (targetGame) => {
        if (targetGame && targetGame.cards.length > 0)
            this.setState(() => ({ targetGame }))
    }

    showAction = () => {
        this.setState(() => ({ showAction: true }))
    }

    closeAction = () => {
        this.setState(() => ({ showAction: false }))
    }

    showSwap = () => {
        this.setState(() => ({ showSwap: true }))
    }

    closeSwap = () => {
        this.setState(() => ({ showSwap: false }))
        this.props.setDrawnCards([])
    }

    showReaction = () => {
        this.setState(() => ({ showReaction: true }))
    }

    closeReaction = () => {
        this.setState(() => ({ showReaction: false }))
    }

    showDiscard = () => {
        this.setState(() => ({ showDiscard: true }))
    }

    closeDiscard = () => {
        this.setState(() => ({ showDiscard: false }))
    }

    handleRecieved = (response) => {
        const { game_move, message } = response
        const { getUserGame, getUserGames, getGame, user, room, userGame, setDrawnCards } = this.props
        this.closeAction()
        this.closeReaction()
        this.closeSwap()
        if (game_move && game_move.user_game_id !== userGame.id) {
            console.log(game_move)
            this.setState(() => ({ gameMove: game_move }))
            this.showReaction()
        } else if (message && message.user_game_id && message.drawn_cards && message.user_game_id === userGame.id) {
            setDrawnCards(message.drawn_cards)
        } else {
            getUserGame(user.id)
            getUserGames(room.id)
            getGame(room.id)
        }
    }

    winner = () => {
        const { game, userGame } = this.props
        if (userGame && game && game.winner_id === userGame.id) {
            return 'Winner'
        }
        else if (userGame && userGame.cards.length === 0)
            return 'Loser'
        else
            return null
    }

    render() {
        const { user, userGame, userGames, game } = this.props
        const { showAction, showSwap, showReaction, targetGame, gameMove, showDiscard } = this.state
        console.log(this.props)
        return (
            <Container>
                <ActionCable
                    channel={'GamesChannel'}
                    room={game.id}
                    onReceived={this.handleRecieved}
                />
                <Button onClick={this.showDiscard}>Discard Pile</Button>
                <GameBoard>
                    {(userGame ? userGames.sort((x, y) => { return x.id === userGame.id ? -1 : y.id === userGame.id ? 1 : 0; }) : userGames)
                        .map((n, index) => {

                            const x = 42 * Math.cos(playerAngle(index, userGames ? userGames.length : 0))
                            const y = 38 * Math.sin(playerAngle(index, userGames ? userGames.length : 0)) + 10

                            return (
                                <Display
                                    key={n.id}
                                    x={x}
                                    y={y}
                                    userGame={userGame}
                                    user={index === 0}
                                    buttons={index === 0 ? [{ clickHandler: this.showAction, text: 'Action' }] : []
                                    }
                                />
                            )
                        })}
                </GameBoard>
                <ActionModal
                    show={showAction}
                    handleClose={this.closeAction}
                    targetGame={targetGame} />
                <SwapCardModal
                    show={showSwap}
                    handleClose={this.closeSwap}
                />
                <ReactionModal
                    show={showReaction}
                    handleClose={this.closeReaction}
                    gameMove={gameMove}
                />
                <DiscardModal
                    show={showDiscard}
                    handleClose={this.closeDiscard}
                />
            </Container>
        )
    }
}

const msp = state => {
    return {
        user: state.user,
        userGame: state.userGame,
        userGames: state.userGames,
        room: state.room,
        game: state.game,
        drawnCards: state.drawnCards
    }
}

const mdp = dispatch => {
    return {
        getUserGame: (userId) => dispatch(getUserGameActionCreator(userId)),
        getUserGames: (roomId) => dispatch(getUserGamesActionCreator(roomId)),
        setDrawnCards: (drawnCards) => dispatch(setDrawnCardsActionCreator(drawnCards)),
        getGame: (roomId) => dispatch(getGameActionCreator(roomId)),
    }
}

export default connect(msp, mdp)(GameContainer)

const playerAngle = (position, total) => ((2 * position * Math.PI) / (total + 1)) + (Math.PI / 2)

const Container = styled.div`

    width: 100%;
    height: 100%;

    overflow: hidden;

`

const GameBoard = styled.div`

    position: relative;

    width: 98vh;
    height: 98vh;

    background: linear-gradient(20deg, #E5829Baa, #EABE77aa);

    border: ${0.6 / 2}vw solid #E5829B;
    
    border-radius: 100%;

    transform: translateY(-4vw) rotateX(35deg);
    margin: 0 auto;
`