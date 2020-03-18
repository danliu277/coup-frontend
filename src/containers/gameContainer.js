import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getUserGameActionCreator, getUserGamesActionCreator, setDrawnCardsActionCreator } from '../action/actionCreator';
import ActionModal from '../components/actionModal';
import SwapCardModal from '../components/swapCardModal';

class GameContainer extends Component {
    state = {
        showAction: false,
        showSwap: false,
        targetGame: null
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
        this.props.setDrawnCards()
    }

    handleRecieved = response => {
        this.props.getUserGame(this.props.user.id)
        this.props.getUserGames(this.props.room.id)
    }

    render() {
        const { user, userGame, game } = this.props
        return (
            <div>
                <h1>Game Container</h1>
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
                        Target: {this.state.targetGame && this.state.targetGame.nickname}
                    </div>
                    {this.mapUserCards()}
                    <button onClick={this.showAction}>Action</button>
                </div>
                <ActionModal
                    show={this.state.showAction}
                    handleClose={this.closeAction}
                    targetGame={this.state.targetGame} />
                <SwapCardModal
                    show={this.state.showSwap}
                    handleClose={this.closeSwap}
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
        setDrawnCards: () => dispatch(setDrawnCardsActionCreator([]))
    }
}

export default connect(msp, mdp)(GameContainer)