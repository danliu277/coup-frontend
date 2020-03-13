import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { pickNicknameActionCreator } from '../action/actionCreator'

class Register extends Component {
    state = {
        nickname: ''
    }

    updateValues = event => {
        const { name, value } = event.target
        this.setState(() => ({ [name]: value }))
    }

    onSubmit = event => {
        event.preventDefault()
        this.props.pickNickname(this.state.nickname)
    }

    render() {
        return (
            <>
                {
                    this.props.user ? <Redirect to="/rooms" /> :
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
                }
            </>
        )
    }
}

const msp = state => {
    return {
        user: state.user
    }
}

const mdp = (dispatch) => {
    return {
        pickNickname: (nickname) => dispatch(pickNicknameActionCreator(nickname))
    }
}

export default connect(msp, mdp)(Register)