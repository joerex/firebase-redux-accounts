// @flow

import React, { Component } from 'react'
import SubmitButton from '../SubmitButton/SubmitButton'
import type { ViewState } from '../../state/views'
import { ERROR_STATE, PENDING_STATE } from '../../state/views'

type Props = {
    state: ViewState,
    onSubmit: Function,
}

type State = {
    email: string,
}

export default class ForgotPasswordComponent extends Component<Props, State> {
    state: State = { email: '' }

    handleSubmit = (event: { preventDefault: Function }) => {
        event.preventDefault()
        this.props.onSubmit(this.state.email)
    }

    render() {
        const { state } = this.props
        const { email } = this.state

        const statusMessage = state.success ? (
            <div className="alert alert-success">
                A password reset link has been sent to your email.
            </div>
        ) : (
            <div className="alert alert-info">
                Enter your email to have a password reset link sent to your
                email.
            </div>
        )

        const errorMessage = state.status === ERROR_STATE && (
            <div className="alert alert-danger error">{state.error}</div>
        )

        return (
            <div className="ForgotPassword accounts-form center-form">
                {statusMessage}

                <form>
                    <input
                        name="email"
                        type="text"
                        value={email}
                        onChange={e => this.setState({ email: e.target.value })}
                        placeholder="Email"
                    />
                    <SubmitButton
                        onSubmit={e => this.handleSubmit(e)}
                        pending={state.status === PENDING_STATE}
                        text="Send Reset Link"
                    />
                    {errorMessage}
                </form>
            </div>
        )
    }
}
