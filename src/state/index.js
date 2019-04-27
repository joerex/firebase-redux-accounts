// @flow

import type { User, Role, Auth, AuthState } from '../index'

/* ACTIONS */

export type Action =
    | {| type: 'AUTH_PENDING' |}
    | {| type: 'AUTH_ERROR', error: string |}
    | {| type: 'LOGIN_SUCCESS', user: User, role: ?Role |}
    | {| type: 'LOGOUT_SUCCESS' |}
    | {| type: 'RESET_PASSWORD_SUCCESS', email: string |}
    | {| type: 'REGISTER_SUCCESS' |}
    | {| type: 'UPDATE_ROLE', role: Role |}
    | {| type: 'SET_INITIALIZED' |}
    | {| type: 'CLEAR_ERROR' |}
    | {| type: 'INVITE_ACCEPTED' |}

export const authPending = (): Action => {
    return { type: 'AUTH_PENDING' }
}

export const authError = (error: string): Action => {
    return { type: 'AUTH_ERROR', error }
}

export const loginSuccess = (user: User, role: ?Role): Action => {
    return { type: 'LOGIN_SUCCESS', user, role }
}

export const logoutSuccess = (): Action => {
    return { type: 'LOGOUT_SUCCESS' }
}

export const resetPasswordSuccess = (email: string): Action => {
    return { type: 'RESET_PASSWORD_SUCCESS', email }
}

export const registerSuccess = (): Action => {
    return { type: 'REGISTER_SUCCESS' }
}

export const clearError = (): Action => {
    return { type: 'CLEAR_ERROR' }
}

export const inviteAccepted = (): Action => {
    return { type: 'INVITE_ACCEPTED' }
}

/* REDUCER */

export const REDUCER_ID: string = 'react-redux-accounts'

export const initAuthState = (user: ?User, role: ?Role): Auth => {
    return {
        reducerId: REDUCER_ID,
        state: {
            updatePasswordSuccess: false,
            resetPasswordSuccess: false,
            registerSuccess: false,
            loading: true,
            authenticated: false,
            failedAuthAttempts: 0,
            error: null,
            pending: false,
        },
        role,
        user,
    }
}

export const getAuthState = (state: any): Auth => {
    const reducers = Object.keys(state)
    for (let i = 0; i < reducers.length; i++) {
        if (state[reducers[i]].reducerId === REDUCER_ID) {
            return state[reducers[i]]
        }
    }
    return initAuthState()
}

const authReducer = (auth: Auth = initAuthState(), action: Action): Auth => {
    switch (action.type) {
        case 'AUTH_PENDING':
            return {
                ...auth,
                state: {
                    ...auth.state,
                    pending: true,
                },
            }
        case 'INVITE_ACCEPTED':
            return {
                ...auth,
                state: {
                    ...auth.state,
                    pending: false,
                },
            }
        case 'AUTH_ERROR':
            return {
                ...auth,
                state: {
                    ...auth.state,
                    failedAuthAttempts: ++auth.state.failedAuthAttempts,
                    error: action.error,
                    loading: false,
                    pending: false,
                },
            }
        case 'UPDATE_ROLE':
            return {
                ...auth,
                role: action.role,
            }
        case 'LOGIN_SUCCESS':
            return {
                ...auth,
                state: {
                    ...auth.state,
                    authenticated: true,
                    failedAuthAttempts: 0,
                    loading: false,
                    pending: false,
                },
                user: action.user,
                role: action.role,
            }
        case 'LOGOUT_SUCCESS':
            return {
                ...auth,
                state: {
                    ...auth.state,
                    authenticated: false,
                    failedAuthAttempts: 0,
                    loading: false,
                    pending: false,
                },
                user: null,
                role: null,
            }
        case 'RESET_PASSWORD_SUCCESS':
            return {
                ...auth,
                state: {
                    ...auth.state,
                    failedAuthAttempts: 0,
                    resetPasswordSuccess: true,
                    pending: false,
                },
            }
        case 'REGISTER_SUCCESS':
            return {
                ...auth,
                state: {
                    ...auth.state,
                    registerSuccess: true,
                    pending: false,
                    failedAuthAttempts: 0,
                    error: null,
                },
            }
        case 'SET_INITIALIZED':
            return {
                ...auth,
                state: {
                    ...auth.state,
                    loading: false,
                },
            }
        case 'CLEAR_ERROR':
            return {
                ...auth,
                state: {
                    ...auth.state,
                    error: null,
                },
            }
        default:
            return auth //(action.type: empty)
    }
}

export default authReducer

/* SELECTORS */

export const getAuthPending = (auth: Auth): boolean => {
    return auth.state.pending
}

export const getAuthToken = (auth: Auth): ?string => {
    if (auth.role && auth.role.token) {
        return auth.role.token
    }
}

export const getAuthLoading = (auth: Auth): boolean => {
    return auth.state.loading
}

export const getAuthenticated = (auth: Auth): boolean => {
    return auth.state.authenticated
}

export const getAuthFailedAttempts = (auth: Auth): number => {
    return auth.state.failedAuthAttempts
}

export const getAuthError = (auth: Auth): ?string => {
    return auth.state.error
}

export const getRole = (auth: Auth): ?Role => {
    return auth.role
}

export const getAuthUpdatePasswordSuccess = (auth: Auth): boolean => {
    return auth.state.updatePasswordSuccess
}

export const getAuthResetPasswordSuccess = (auth: Auth): boolean => {
    return auth.state.resetPasswordSuccess
}

export const getAuthUpdatetPasswordSuccess = (auth: Auth): boolean => {
    return auth.state.updatePasswordSuccess
}

export const getAuthRegisterSuccess = (auth: Auth): boolean => {
    return auth.state.registerSuccess
}

export const getUser = (auth: Auth): ?User => {
    return auth.user
}
