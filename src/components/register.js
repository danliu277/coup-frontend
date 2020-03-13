import React, { Component } from 'react'
import { connect } from 'react-redux';
import { API_ROOT, HEADERS } from '../constants'
import { setUserActionCreator } from '../actionCreator';

class Register extends Component {
    state = {
        nickname: ''
    }

    updateValues = event => {
        const {name, value} = event.target
        this.setState(() => ({[name]: value}))
    }

    onSubmit = event => {
        event.preventDefault()
        fetch(`${API_ROOT}/users`, {
            method: 'POST',
            headers: HEADERS,
            body: JSON.stringify({ nickname: this.state.nickname })
        }).then(res => res.json())
        .then(user => {
            this.props.setUser(user)
            this.props.history.push(`/rooms`)
        })
    }

    render() {
        return (
            <>
                <h1>Coup</h1>
                <form onSubmit={this.onSubmit}>
                    <label>Nickname:</label>
                    <input 
                        name="nickname"
                        value={this.state.nickname} 
                        onChange={this.updateValues} />
                    <input type="submit" />
                </form>
            </>
        )
    }
}

const mdp = (dispatch) => {
    return {
        setUser: (user) => dispatch(setUserActionCreator(user))
    }
}

export default connect(null, mdp)(Register)