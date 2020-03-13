import { API_ROOT, HEADERS } from '../constants'

export const setUserActionCreator = (user) => ({ type: 'SETUSER', user });
export const pickNickname = (nickname) => {
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
export const setRoomsCreator = rooms => ({ type: 'SETROOMS', rooms })
export const getRoomsCreator = () => {
    return dispatch => {
        fetch(`${API_ROOT}/rooms`)
            .then(res => res.json())
            .then(rooms => {
                dispatch(setRoomActionCreator(rooms))
            })
    }
}
export const setRoomActionCreator = (room) => ({ type: 'SETROOM', room });
export const getGameActionCreator = (game) => ({ type: 'GETGAME', game });
export const setGameActionCreator = (game) => ({ type: 'SETGAME', game });
export const startGameActionCreator = () => ({ type: 'STARTGAME' });