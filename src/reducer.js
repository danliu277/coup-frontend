let initialState = {
    user: null,
    room: null
}

let reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'SETUSER':
            return { ...prevState, user: action.user }
        case 'SETROOM':
            return { ...prevState, room: action.room }
        default:
            return prevState
    }
}

export default reducer;