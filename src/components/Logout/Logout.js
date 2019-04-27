// @flow

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getAuthState, getAuthToken } from '../../state'
import { logout } from '../../state/effects'
import { bindActionCreators } from 'redux'

type ParentProps = {
    text: ?string,
}

type StoreProps = {
    token: ?string,
}

type Actions = {
    logout: Function,
}

export class LogoutComponent extends Component<
    ParentProps & StoreProps & Actions
> {
    render() {
        const { text, logout, token } = this.props
        return <a onClick={() => logout(token)}>{text ? text : 'Logout'}</a>
    }
}

export default connect(
    (state): StoreProps => {
        const authState = getAuthState(state)
        return {
            token: getAuthToken(authState),
        }
    },
    (dispatch): Actions => {
        return bindActionCreators(
            {
                logout,
            },
            dispatch
        )
    }
)(LogoutComponent)
