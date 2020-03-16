import React, { useEffect, memo } from 'react'
import { connect } from 'react-redux';
import { ActionCable } from 'actioncable-client-react'
import { getUserGamesActionCreator } from '../action/actionCreator';
import RenderRoom from '../components/renderRoom';

const RoomContainer = memo((props) => {
    useEffect(() => {
        props.getUserGames(props.room.id)
    }, [props])

    const handleRecieved = () => {
        props.getUserGames(props.room.id)
    }

    return (
        <>
            {
                <div>
                    <ActionCable
                        channel={'RoomsChannel'}
                        room={{ id: props.room.id, user: props.user.id }}
                        onReceived={handleRecieved}
                    />
                    <RenderRoom />
                </div>
            }
        </>
    )
})

const msp = state => {
    return {
        user: state.user,
        room: state.room
    }
}

const mdp = dispatch => {
    return {
        getUserGames: (roomId) => dispatch(getUserGamesActionCreator(roomId))
    }
}

export default connect(msp, mdp)(RoomContainer)