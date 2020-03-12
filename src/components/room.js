import React from 'react'

const Room = ({room, handleShowJoin}) => {
    return (
        <div onClick={() => handleShowJoin(room)}>
            <h3>{room.name} {room.password && `🔑`} {`${room.user_games}  / 6`}</h3>
            <h6>Room Owner: {room.user}</h6>
        </div>
    )
}

export default Room