let initialState = {
    user: null,
    room: null,
    game: null,
    rooms: [],
    userGames: []
}

const reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'SETUSER':
            return { ...prevState, user: action.user }
        case 'SETROOM':
            return { ...prevState, room: action.room }
        case 'SETROOMS':
            return { ...prevState, rooms: action.rooms }
        case 'SETUSERGAMES':
            return { ...prevState, userGames: action.userGames }
        case 'SETGAME':
            return { ...prevState, game: action.game }
        default:
            return prevState
    }
}

export default reducer;