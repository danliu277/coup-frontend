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

export const setGameActionCreator = (game) => ({ type: 'SETGAME', game });
export const getGameActionCreator = (roomId) => {
    return dispatch => {
        fetch(`${API_ROOT}/games/${roomId}`)
            .then(res => res.json())
            .then(game => {
                dispatch(setGameActionCreator(game))
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
                dispatch(setGameActionCreator(game))
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

export const setDrawnCardsActionCreator = drawnCards => ({ type: 'SETDRAWNCARDS', drawnCards })
export const executeActionCreator = (action, game_id, user_game_id, room_id, target_id) => {
    return dispatch => {
        fetch(`${API_ROOT}/game_moves/${game_id}`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ action, user_game_id, target_id })
        })
    }
}
export const swapCardsActionCreator = (game_id, selected_hand, selected_draw, user_game_id) => {
    return dispatch => {
        fetch(`${API_ROOT}/game_moves/${game_id}/swap_cards`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ game_id, selected_hand, selected_draw, user_game_id })
        })
            .then(resp => resp.json())
            .then(userGame => {
                dispatch(setUserGameActionCreator(userGame))
            })
    }
}
export const handleGameMoveActionCreator = (gameMove) => ({ type: 'HANDLEGAMEMOVE', gameMove });

export const handleReactionActionCreator = (game_id, reaction, user_game_id) => {
    return dispatch => {
        fetch(`${API_ROOT}/game_moves/${game_id}/reaction`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ reaction, user_game_id })
        })
    }
}

export const handleCallBluffActionCreator = (game_id, user_game_id) => {
    return dispatch => {
        fetch(`${API_ROOT}/game_moves/${game_id}/call_bluff`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ user_game_id })
        })
    }
}

export const handleBlockActionCreator = (game_id, user_game_id) => {
    return dispatch => {
        fetch(`${API_ROOT}/game_moves/${game_id}/block`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ user_game_id })
        })
    }
}