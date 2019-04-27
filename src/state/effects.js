// @flow

import firebase from '../services'
import type { User, AuthSettings } from '../index'

import {
    authError,
    authPending,
    registerSuccess,
    inviteAccepted,
    loginSuccess,
    resetPasswordSuccess,
} from '../state'

const API_ROOT: string = process.env.REACT_APP_API_ROOT || ''

/***
 * Response status is ok
 * @param response
 * @returns {boolean}
 */
const ok = (response: any) => {
    return typeof response === 'object' && Object.keys(response).length === 0
}

/***
 * Map Error
 * @param error
 * @returns {string}
 */

const mapError = (error: any): string => {
    const message =
        typeof error !== 'object' ||
        error instanceof TypeError ||
        error instanceof SyntaxError
            ? `An unexpected problem has occured. Please check your internet connection.\n
               If the problem persists please contact us.`
            : error.message
    return message
}

/***
 * Clear local storage effect
 * @param settings
 * @returns {Function}
 */

export const clearLocalStorage = (settings: AuthSettings): Function => {
    return dispatch => {
        localStorage.removeItem(settings.localStorageKey)
    }
}

/***
 * Send reset password effect
 * @param email
 * @returns {Function}
 */
export const resetPassword = (email: string): Function => {
    return async dispatch => {
        try {
            dispatch(authPending())
            const response = await firebase.auth.sendPasswordResetEmail(email)
            dispatch(resetPasswordSuccess(email))
        } catch (error) {
            dispatch(authError(mapError(error)))
        }
    }
}

/***
 * Public register param type
 */

export type RegisterParams = {
    email: string,
    password: string,
}

/***
 * Public register effect
 * @param params
 * @returns {Function}
 */
export const register = (params: RegisterParams): Function => {
    return async (dispatch: Function) => {
        try {
            dispatch(authPending())
            const user: User = await firebase.auth.createUserWithEmailAndPassword(
                params.email,
                params.password
            )
            dispatch(loginSuccess(user))
        } catch (error) {
            dispatch(authError(mapError(error)))
        }
    }
}

/***
 * Accept invite / register param type
 */

export type AcceptInviteParams = {
    email: string,
    firstName: string,
    lastName: string,
}

/***
 * Accept invite / register effect
 * @param params
 * @param token
 * @param uid
 * @returns {Function}
 */
export const acceptInvite = (
    params: AcceptInviteParams,
    token: string,
    uid: string
) => {
    return async (dispatch: Function, settings: AuthSettings) => {
        try {
            dispatch(authPending())
            const endpoint = settings.endpoint
                ? settings.endpoint.inviteUser
                : '/acceptInvite'
            const request = await fetch(API_ROOT + endpoint, {
                method: 'POST',
                body: JSON.stringify({ ...params, uid, token }),
                headers: { 'Content-Type': 'application/json' },
            })
            if (request.ok) {
                dispatch(inviteAccepted())
            }
        } catch (error) {
            dispatch(authError(mapError(error)))
        }
    }
}

/***
 * Role types
 */
export type RegisterRole = 'member' | 'manager' | 'client'

/***
 * Admin register param type
 */
export type AdminRegisterParams = {
    email: string,
    firstName: string,
    lastName: string,
    role: RegisterRole,
}

/***
 * Admin register effect
 * @param params
 * @param token
 * @param reset
 * @param settings
 * @returns {Function}
 */
export const adminRegister = (
    params: AdminRegisterParams,
    token: string,
    reset: Function,
    settings: AuthSettings
) => {
    return async (dispatch: Function) => {
        try {
            dispatch(authPending())
            const endpoint =
                settings && settings.endpoint
                    ? settings.endpoint.inviteUser
                    : '/inviteUser'
            const request = await fetch(API_ROOT + endpoint, {
                method: 'POST',
                body: JSON.stringify({ ...params, token }),
                headers: { 'Content-Type': 'application/json' },
            })
            const response = await request.json()
            if (ok(response)) {
                dispatch(registerSuccess())
                reset && reset()
            } else {
                dispatch(authError(mapError(response)))
            }
        } catch (error) {
            dispatch(authError(mapError(error)))
        }
    }
}

/***
 * Login param type
 */

export type LoginParams = {
    username: string,
    password: string,
}

/***
 * Login effect
 * @param params
 * @returns {Function}
 */
export const login = (params: LoginParams) => {
    return async (dispatch: Function) => {
        try {
            dispatch(authPending())
            await firebase.auth.signInWithEmailAndPassword(
                params.username,
                params.password
            )
        } catch (error) {
            dispatch(authError(mapError(error)))
        }
    }
}

/***
 * Logout effect
 * @returns {Function}
 */
export const logout = (): Function => {
    return (dispatch: Function) => {
        try {
            dispatch(authPending())
            firebase.signOut()
        } catch (error) {
            dispatch(authError(mapError(error)))
        }
    }
}
