import React, { useState } from 'react'
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants'
import { setUserActionCreator } from '../actionCreator';

const Register = (props) => {
    const [nickname, setNickname] = useState('')

    const onSubmit = event => {
        event.preventDefault()
        fetch(`${API_ROOT}/users`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ nickname })
        }).then(res => res.json())
        .then(user => {
            props.setUser(user)
            props.history.push(`/rooms`)
        })
    }

    return (
        <>
            <h1>Coup</h1>
            <form onSubmit={onSubmit}>
                <label>Nickname:</label>
                <input value={nickname} onChange={e => setNickname(e.target.value)} />
                <input type="submit" />
            </form>
        </>
    )
}

const mdp = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUserActionCreator(user))
    }
}

export default connect(null, mdp)(Register)