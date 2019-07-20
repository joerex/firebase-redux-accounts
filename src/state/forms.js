// @flow

import viewStateReducer, { ENABLED_STATE } from './views'

const ACCEPT_INVITE = 'ACCEPT_INVITE',
    REGISTER = 'REGISTER',
    PUBLIC_REGISTER = 'PUBLIC_REGISTER',
    FORGOT_PASSWORD = 'FORGOT_PASSWORD',
    LOGIN = 'LOGIN',
    LOGOUT = 'LOGOUT'

export const acceptInvite = (directive: any) => {
    return { type: ACCEPT_INVITE, directive }
}

export const register = (directive: any) => {
    return { type: REGISTER, directive }
}

export const publicRegister = (directive: any) => {
    return { type: PUBLIC_REGISTER, directive }
}

export const forgotPassword = (directive: any) => {
    return { type: FORGOT_PASSWORD, directive }
}

export const login = (directive: any) => {
    return { type: LOGIN, directive }
}

export const logout = (directive: any) => {
    return { type: LOGOUT, directive }
}

export const reducer = (
    state: any = {
        acceptInvite: { status: ENABLED_STATE },
        register: { status: ENABLED_STATE },
        forgotPassword: { status: ENABLED_STATE },
        login: { status: ENABLED_STATE },
        publicRegister: { status: ENABLED_STATE },
        logout: { status: ENABLED_STATE },
    },
    action: any
) => {
    switch (action.type) {
        case ACCEPT_INVITE:
            return {
                ...state,
                acceptInvite: viewStateReducer(
                    state.acceptInvite,
                    action.directive
                ),
            }
        case REGISTER:
            return {
                ...state,
                register: viewStateReducer(state.register, action.directive),
            }
        case PUBLIC_REGISTER:
            return {
                ...state,
                publicRegister: viewStateReducer(
                    state.publicRegister,
                    action.directive
                ),
            }
        case FORGOT_PASSWORD:
            return {
                ...state,
                forgotPassword: viewStateReducer(
                    state.forgotPassword,
                    action.directive
                ),
            }
        case LOGIN:
            return {
                ...state,
                login: viewStateReducer(state.login, action.directive),
            }
        case LOGOUT:
            return {
                ...state,
                logout: viewStateReducer(state.logout, action.directive),
            }
        default:
            return state
    }
}

export default reducer
