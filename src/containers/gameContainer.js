import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getUserGameActionCreator, getUserGamesActionCreator, setDrawnCardsActionCreator, 
    getGameActionCreator } from '../action/actionCreator';
import ActionModal from '../components/actionModal';
import SwapCardModal from '../components/swapCardModal';
import ReactionModal from '../components/reactionModal';

class GameContainer extends Component {
    state = {
        showAction: false,
        showSwap: false,
        showReaction: false,
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

    mapUserCards = () => {
        const { userGame } = this.props
        return userGame && userGame.cards.map(card => {
            return <img className="coup-card" key={card.id} src={`${process.env.PUBLIC_URL}/${card.name}.png`} alt={card.name} />
        })
    }

    selectTarget = (targetGame) => {
        if (targetGame && targetGame.cards.length > 0)
            this.setState(() => ({ targetGame }))
    }

    mapOtherUserCards = () => {
        const { userGames, userGame } = this.props
        let ugs = userGames
        if (userGame) {
            ugs = ugs.filter(ug => ug.id !== userGame.id)
        }
        return ugs.map(userGame => {
            return <div key={userGame.id} onClick={() => this.selectTarget(userGame)}>
                <div>
                    {userGame.nickname} <br />
                    Money: {userGame.money}
                </div>
                {this.mapCards(userGame.cards)}
            </div>
        })
    }

    mapCards = (cards) => {
        return cards.map(card => {
            return <Fragment key={card.id}>
                <img className="coup-card" src={`${process.env.PUBLIC_URL}/${card.name}.png`} alt={card.name} />
            </Fragment>
        })
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
        this.setState(() => ({ showReaction: true}))
    }

    closeReaction = () => {
        this.setState(() => ({ showReaction: false}))
    }

    handleRecieved = (response) => {
        const { game_move, message } = response
        if (game_move) {
            console.log(game_move)
            this.setState(() => ({gameMove: game_move}))
            this.showReaction()
        } else if(message.user_game_id && message.drawn_cards && message.user_game_id === this.props.userGame.id) {
            this.props.setDrawnCards(message.drawn_cards)
        } else {
            const { getUserGame, getUserGames, getGame, user, room } = this.props
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
        const { user, userGame, game } = this.props
        const { showAction, showSwap, showReaction, targetGame, gameMove } = this.state
        return (
            <div>
                <h1>Game Container</h1>
                <h3>{this.winner()}</h3>
                <ActionCable
                    channel={'GamesChannel'}
                    room={game.id}
                    onReceived={this.handleRecieved}
                />
                <div>
                    {this.mapOtherUserCards()}
                </div>
                <div className="user-cards">
                    <div>
                        {user.nickname} <br />
                        Money: {userGame && userGame.money} <br />
                        Target: {targetGame && targetGame.nickname}
                    </div>
                    {this.mapUserCards()}
                    <button onClick={this.showAction} disabled={!game || !userGame || game.winner_id || game.user_game_id !== userGame.id}>Action</button>
                </div>
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
            </div>
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