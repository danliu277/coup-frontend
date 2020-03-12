import React from 'react'

const Room = (props) => {
    return (
        <div>
            <h3>{props.name} {props.password ? `🔒` : `🔓`}</h3>
            <h4>{props.user}</h4>
        </div>
    )
}

export default Room