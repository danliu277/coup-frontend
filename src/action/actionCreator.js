import { API_ROOT, HEADERS } from '../constants'

export const setUserActionCreator = (user) => ({ type: 'SETUSER', user });
export const pickNicknameActionCreator = (nickname) => {
    return dispatch => {
        fetch(`${API_ROOT}/users`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ nickname })
        }).then(res => res.json())
            .then(user => {
                dispatch(setUserActionCreator(user))
            })
    }
}

export const setRoomsActionCreator = rooms => ({ type: 'SETROOMS', rooms })
export const getRoomsActionCreator = () => {
    return dispatch => {
        fetch(`${API_ROOT}/rooms`)
            .then(res => res.json())
            .then(rooms => {
                dispatch(setRoomsActionCreator(rooms))
            })
    }
}
export const createRoomsActionCreator = (room, user_id) => {
    return dispatch => {
        fetch(`${API_ROOT}/rooms`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ room: { ...room, user_id } })
        }).then(res => res.json())
            .then(room => {
                dispatch(setRoomActionCreator(room))
                // this.props.setRoom(room)
                // this.props.history.push(`/rooms/${this.room.id}`)
            })
    }
}

export const setRoomActionCreator = (room) => ({ type: 'SETROOM', room });
export const getGameActionCreator = (game) => ({ type: 'GETGAME', game });
export const setGameActionCreator = (game) => ({ type: 'SETGAME', game });
export const startGameActionCreator = () => ({ type: 'STARTGAME' });