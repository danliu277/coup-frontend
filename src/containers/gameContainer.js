import React, { Component } from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getUserGameActionCreator, getUserGamesActionCreator } from '../action/actionCreator';

class GameContainer extends Component {
    componentDidMount() {
        this.props.getUserGame(this.props.user.id)
        this.props.getUserGames(this.props.room.id)
    }

    handleRecieved = () => {
        
    }

    mapUserCards = () => {
        return this.props.userGame && this.props.userGame.cards.map(card => {
            return <img className="coup-card" key={card.id} src={`${process.env.PUBLIC_URL}/${card.name}.png`} alt={card.name} />
        })
    }

    render() {
        return (
            <div>
                <h1>Game Container</h1>
                <ActionCable
                    channel={'GamesChannel'}
                    room={this.props.game.id}
                    onReceived={this.handleRecieved}
                />
                <div className="user-cards">
                    {this.mapUserCards()}
                </div>
            </div>
        )
    }
}

const msp = state => {
    return {
        user: state.user,
        userGame: state.userGame,
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