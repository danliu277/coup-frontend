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

// Check user in game
export const setUserGamesActionCreator = (userGames) => ({ type: 'SETUSERGAMES', userGames })
export const getUserGamesActionCreator = (roomId) => {
    return dispatch => {
        fetch(`${API_ROOT}/user_games/room/${roomId}`)
            .then(res => res.json())
            .then(userGames => {
                dispatch(setUserGamesActionCreator(userGames))
            })
    }
}

export const setGamesActionCreator = (game) => ({ type: 'SETGAME', game });
export const getGamesActionCreator = (roomId) => {
    return dispatch => {
        fetch(`${API_ROOT}/games/${roomId}`)
            .then(res => res.json())
            .then(game => {
                dispatch(setGamesActionCreator(game))
            })
    }
}
export const startGameActionCreator = (roomId) => {
    return dispatch => {
        fetch(`${API_ROOT}/games/${roomId}`, {
            method: 'PATCH',
            headers: HEADERS
        })
            .then(res => res.json())
            .then(game => {
                dispatch(setGamesActionCreator(game))
            })
    }
}

export const setUserGameActionCreator = (userGame) => ({ type: 'SETUSERGAME', userGame });
export const getUserGameActionCreator = (userId) => {
    return dispatch => {
        fetch(`${API_ROOT}/user_games/game/${userId}`)
            .then(res => res.json())
            .then(userGame => {
                dispatch(setUserGameActionCreator(userGame))
            })
    }
}