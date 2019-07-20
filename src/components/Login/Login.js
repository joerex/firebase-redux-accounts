// @flow

import React, { Component } from 'react'
import SubmitButton from '../SubmitButton/SubmitButton'
import type { ViewState } from '../../state/views'
import { ERROR_STATE, PENDING_STATE } from '../../state/views'

type Props = {
    state: ViewState,
    clearError: Function,
    onSubmit: Function,
}

type State = {
    email: string,
    password: string,
}

export default class LoginComponent extends Component<Props, State> {
    state = { email: '', password: '' }

    handleSubmit = (event: { preventDefault: Function }) => {
        event.preventDefault()
        this.props.onSubmit({
            email: this.state.email,
            password: this.state.password,
        })
    }

    handleInputChange(event: { target: { value: string, name: string } }) {
        if (this.props.state.status === ERROR_STATE && this.props.clearError) {
            this.props.clearError()
        }
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    render() {
        const { email, password } = this.state
        const { state } = this.props
        const errorMessage = state.status === ERROR_STATE && (
            <div className="alert alert-danger error">{state.error}</div>
        )
        return (
            <div className="accounts-form center-form">
                <form>
                    <input
                        name="email"
                        type="text"
                        value={email}
                        onChange={e => this.handleInputChange(e)}
                        placeholder="Email"
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
                        pending={state.status === PENDING_STATE}
                    />
                    {errorMessage}
                </form>
            </div>
        )
    }
}
