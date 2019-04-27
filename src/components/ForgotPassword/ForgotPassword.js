// @flow

import React, { Component } from 'react'
import { resetPassword } from '../../state/effects'
import { connect } from 'react-redux'
import {
    getAuthError,
    getAuthFailedAttempts,
    getAuthPending,
    getAuthResetPasswordSuccess,
    getAuthState,
} from '../../state'
import { bindActionCreators } from 'redux'
import SubmitButton from '../SubmitButton/SubmitButton'

type Model = {
    resetSuccess: boolean,
    pending: boolean,
    error: ?string,
}

type Actions = {
    resetPassword: Function,
}

type State = {
    email: string,
}

export class ForgotPasswordComponent extends Component<Model & Actions, State> {
    state: State = { email: '' }

    handleSubmit = (event: { preventDefault: Function }) => {
        event.preventDefault()
        this.props.resetPassword(this.state.email)
    }

    render() {
        const { resetSuccess, pending, error } = this.props
        const { email } = this.state

        const statusMessage = resetSuccess ? (
            <div className="alert alert-success">
                A password reset link has been sent to your email.
            </div>
        ) : (
            <div className="alert alert-info">
                Enter your email to have a password reset link sent to your
                email.
            </div>
        )

        const errorMessage = error && (
            <div className="alert alert-danger error">{error}</div>
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
                        pending={pending}
                        text="Send Reset Link"
                    />
                    {errorMessage}
                </form>
            </div>
        )
    }
}

export default connect(
    (state): Model => {
        const authState = getAuthState(state)
        return {
            error: getAuthError(authState),
            resetSuccess: getAuthResetPasswordSuccess(authState),
            pending: getAuthPending(authState),
        }
    },
    (dispatch): Actions => {
        return bindActionCreators(
            {
                resetPassword,
            },
            dispatch
        )
    }
)(ForgotPasswordComponent)
