import { API_ROOT, HEADERS } from './constants';

let initialState = {
    user: null,
    room: null,
    game: null,
    rooms: []
}

const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'SETUSER':
            return { ...prevState, user: action.user }
        case 'SETROOM':
            return { ...prevState, room: action.room }
        case 'GETGAME':
            fetch(`${API_ROOT}/games/${prevState.room.id}`)
                .then(res => res.json())
                .then(game => {
                    debugger
                })
            break;
        case 'SETGAME':
            return { ...prevState, game: action.game }
        case 'STARTGAME':
            fetch(`${API_ROOT}/games/${prevState.game.id}`, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify({ user_id: prevState.user.id })
            }).then(res => res.json())
                .then(game => {
                    debugger
                })
            break;
        default:
            return prevState
    }
}

export default reducer;