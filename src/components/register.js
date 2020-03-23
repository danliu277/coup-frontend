import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux';
import { pickNicknameActionCreator } from '../action/actionCreator'
import { Row, Col, Button, Form } from 'react-bootstrap';

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
            <div className="register">
                {
                    this.props.user ? <Redirect to="/rooms" /> :
                    <Row className="justify-content-md-center">
                        <Col md="auto">
                            <div className="register-form">
                                <h1>Coup</h1>
                                <Form onSubmit={this.onSubmit}>
                                    <Form.Control type="text" placeholder="Nickname"
                                        name="nickname"
                                        value={this.state.nickname}
                                        onChange={this.updateValues} />
                                    <Button variant="primary" type="submit">
                                        Submit
                                    </Button>
                                </Form>
                            </div>
                        </Col>
                    </Row>
                }
            </div>
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