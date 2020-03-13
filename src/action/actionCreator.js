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
export const setRoomActionCreator = (room) => ({ type: 'SETROOM', room });
export const createRoomActionCreator = (room, user_id) => {
    return dispatch => {
        fetch(`${API_ROOT}/rooms`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ room: { ...room, user_id } })
        }).then(res => res.json())
            .then(room => {
                dispatch(setRoomActionCreator(room))
            })
    }
}
export const joinRoomActionCreator = (roomId, user_id, password) => {
    return dispatch => {
        fetch(`${API_ROOT}/rooms/${roomId}`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ user_id, password })
        })
            .then(res => res.json())
            .then(room => {
                if (room.errors) {
                    alert('Wrong Password')
                } else {
                    dispatch(setRoomActionCreator(room))
                }
            })
    }
}

export const setUserGamesActionCreator = (userGames) => ({ type: 'SETUSERGAMES', userGames})
export const getUserGamesActionCreator = (roomId) => {
    return dispatch => {
        fetch(`${API_ROOT}/user_games/${roomId}`)
            .then(res => res.json())
            .then(userGames => {
                dispatch(setUserGamesActionCreator(userGames))
            })
    }
}

export const setGameActionCreator = (game) => ({ type: 'SETGAME', game });
export const getGameActionCreator = (roomId) => {
    return dispatch => {
        fetch(`${API_ROOT}/games/${roomId}`)
            .then(res => res.json())
            .then(rooms => {
                dispatch(setGameActionCreator(rooms))
            })
    }
}
export const startGameActionCreator = () => ({ type: 'STARTGAME' });