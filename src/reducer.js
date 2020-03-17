let initialState = {
    user: null,
    room: null,
    game: null,
    rooms: [],
    userGames: [],
    userGame: null
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
        case 'SETUSERGAME':
            return { ...prevState, userGame: action.userGame }
        case 'HANDLEGAMEMOVE':
            console.log(action)
            return { ...prevState }
        default:
            return prevState
    }
}

export default reducer;