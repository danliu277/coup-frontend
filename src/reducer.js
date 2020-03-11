let initialState = {
    user: null
}

let reducer = (prevState = initialState, action) => {
    switch (action.type) {
        case 'SETUSER':
            return {...prevState, user: action.user}
        default:
            return prevState
    }
}

export default reducer ;