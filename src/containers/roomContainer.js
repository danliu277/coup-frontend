import React, { Component } from 'react'
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants';
import { ActionCable } from 'actioncable-client-react'

class RoomContainer extends Component {
    state = {
        userGames: []
    }

    componentDidMount() {
        fetch(`${API_ROOT}/user_games/${this.props.room.id}`)
            .then(res => res.json())
            .then(userGames => {
                this.setState(() => ({ userGames }))
            })
    }

    handleRecieved = response => {
        // const { user_game } = response
        // this.setState((state) => ({ userGames: [...state.userGames, user_game]}))
        fetch(`${API_ROOT}/user_games/${this.props.room.id}`)
            .then(res => res.json())
            .then(userGames => {
                this.setState(() => ({ userGames }))
            })
    }


    mapUserGames = () => {
        return this.state.userGames.map(userGame => {
            return <div key={userGame.id}>
                {this.props.room.user.id === userGame.user.id && '👑'}
                {userGame.user && userGame.user.nickname}
            </div>
        })
    }

    render() {
        return (
            <div>
                <h1>Room Container</h1>
                <ActionCable
                    // channel={{ channel: 'RoomsChannel', room: props.room.id, user:props.user.id }}
                    channel={'RoomsChannel'}
                    room={{ id: this.props.room.id, user: this.props.user.id }}
                    onReceived={this.handleRecieved}
                />
                <h6>Players:</h6>
                {this.mapUserGames()}
            </div>
        )
    }
}

const msp = state => {
    return {
        user: state.user,
        room: state.room
    }
}

export default connect(msp)(RoomContainer)