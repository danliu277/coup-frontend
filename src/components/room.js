import React from 'react'

const Room = ({room, handleShowJoin}) => {
    return (
        <li className="list-group-item d-flex justify-content-between align-items-center" onClick={() => handleShowJoin(room)}>
            {room.name} {room.password && `🔑`} {room.user && room.user.nickname}
            <span class="badge badge-primary badge-pill">{`${room.user_games}  / 6`}</span>
        </li>
    )
}

export default Room