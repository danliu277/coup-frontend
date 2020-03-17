import React, { Fragment, Component } from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getUserGameActionCreator, getUserGamesActionCreator } from '../action/actionCreator';
import ActionModal from '../components/actionModal';

class GameContainer extends Component {
    state = {
        showAction: false
    }

    componentDidMount() {
        this.props.getUserGame(this.props.user.id)
        this.props.getUserGames(this.props.room.id)
    }

    handleRecieved = () => {
        this.setState(() => ({ showAction: true }))
    }

    mapUserCards = () => {
        const { userGame } = this.props
        return userGame && userGame.cards.map(card => {
            return <img id={card.id} className="coup-card" key={card.id} src={`${process.env.PUBLIC_URL}/${card.name}.png`} alt={card.name} />
        })
    }

    mapOtherUserCards = () => {
        const { userGames, userGame } = this.props
        let ugs = userGames
        if(userGame) {
            ugs = ugs.filter(ug => ug.id !== userGame.id)
        }
        return ugs.map(userGame => {
            return <div id={userGame.id} key={userGame.id}>
                {userGame.nickname}
                Money: {userGame.money}
                {this.mapCards(userGame.cards)}
            </div>
        })
    }

    mapCards = (cards) => {
        return cards.map(card => {
            return <Fragment key={card.id}>
                <img id={card.id} className="coup-card" src={`${process.env.PUBLIC_URL}/${card.name}.png`} alt={card.name} />
            </Fragment>
        })
    }

    showModal = () => {
        this.setState(() => ({ showAction: true }))
    }

    closeAction = () => {
        this.setState(() => ({ showAction: false }))
    }

    render() {
        const { user, userGame, game, handleRecieved } = this.props
        return (
            <div>
                <h1>Game Container</h1>
                <ActionCable
                    channel={'GamesChannel'}
                    room={game.id}
                    onReceived={handleRecieved}
                />
                <div>
                    {this.mapOtherUserCards()}
                </div>
                <div className="user-cards">
                    {user.nickname}
                    Money: {userGame && userGame.money}
                    {this.mapUserCards()}
                    <button onClick={this.showModal}>Action</button>
                </div>
                <ActionModal
                    show={this.state.showAction}
                    handleClose={this.closeAction} />
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
        game: state.game
    }
}

const mdp = dispatch => {
    return {
        getUserGame: (userId) => dispatch(getUserGameActionCreator(userId)),
        getUserGames: (roomId) => dispatch(getUserGamesActionCreator(roomId))
    }
}

export default connect(msp, mdp)(GameContainer)