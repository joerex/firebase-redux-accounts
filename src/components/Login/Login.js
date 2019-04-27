// @flow

import React, { Component } from 'react'
import {
    getAuthFailedAttempts,
    getAuthError,
    clearError,
    getAuthPending,
    getAuthState,
} from '../../state'
import { login } from '../../state/effects'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import SubmitButton from '../SubmitButton/SubmitButton'

type StoreProps = {
    pending: boolean,
    error: ?string,
    failedAttempts: number,
}

type Actions = {
    clearError: Function,
    login: Function,
}

type State = {
    username: string,
    password: string,
}

export class LoginComponent extends Component<StoreProps & Actions, State> {
    state = { username: '', password: '' }

    handleSubmit = (event: { preventDefault: Function }) => {
        event.preventDefault()
        this.props.login({
            username: this.state.username,
            password: this.state.password,
        })
    }

    handleInputChange(event: { target: { value: string, name: string } }) {
        if (this.props.error) {
            this.props.clearError()
        }
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        const { username, password } = this.state
        const { pending, error } = this.props
        const errorMessage = error && (
            <div className="alert alert-danger error">{error}</div>
        )
        return (
            <div className="accounts-form center-form">
                <form>
                    <input
                        name="username"
                        type="text"
                        value={username}
                        onChange={e => this.handleInputChange(e)}
                        placeholder="Username"
                    />
                    <input
                        name="password"
                        type="password"
                        value={password}
                        onChange={e => this.handleInputChange(e)}
                        placeholder="Password"
                    />
                    <SubmitButton
                        text="Login"
                        onSubmit={e => this.handleSubmit(e)}
                        pending={pending}
                    />
                    {errorMessage}
                </form>
            </div>
        )
    }
}

export default connect(
    (state): StoreProps => {
        const authState = getAuthState(state)
        return {
            failedAttempts: getAuthFailedAttempts(authState),
            error: getAuthError(authState),
            pending: getAuthPending(authState),
        }
    },
    (dispatch): Actions => {
        return bindActionCreators(
            {
                login,
                clearError,
            },
            dispatch
        )
    }
)(LoginComponent)
