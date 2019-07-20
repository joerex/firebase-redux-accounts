// @flow

import type { User, AuthSettings } from '../index'

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
        error instanceof SyntaxError ||
        !error.message
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
 * @param sendPasswordResetEmail
 * @param email
 * @param success
 * @param error
 * @returns {Function}
 */
export const resetPassword = (
    sendPasswordResetEmail: Function,
    email: string,
    success: Function,
    error: Function
): Function => {
    return async dispatch => {
        try {
            const response = await sendPasswordResetEmail(email)
            dispatch(success())
        } catch (e) {
            dispatch(error(mapError(e)))
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

export type ProfileParams = {
    firstName: string,
    lastName: string,
}

/***
 * Public register effect
 * @param createUserWithEmailAndPassword
 * @param credentials
 * @param profile
 * @param success
 * @param error
 * @returns {Function}
 */
export const register = (
    createUserWithEmailAndPassword: Function,
    credentials: RegisterParams,
    profile: ProfileParams,
    success: Function,
    error: Function
): Function => {
    return async (dispatch: Function) => {
        try {
            await createUserWithEmailAndPassword(credentials, profile)
            dispatch(success())
        } catch (e) {
            dispatch(error(mapError(e)))
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
 * @param key
 * @param success
 * @param error
 * @returns {Function}
 */
export const acceptInvite = (
    acceptInvite: Function,
    params: AcceptInviteParams,
    key: string,
    token: string,
    success: Function,
    error: Function
) => {
    return async (dispatch: Function, settings: AuthSettings) => {
        try {
            // await acceptInvite({ ...params, key, token })
            // dispatch(success())

            const endpoint = settings.endpoint
                ? settings.endpoint.inviteUser
                : '/acceptInvite'
            const request = await fetch(API_ROOT + endpoint, {
                method: 'POST',
                body: JSON.stringify({ ...params, key, token }),
                headers: { 'Content-Type': 'application/json' },
            })
            if (request.ok) {
                dispatch(success())
            } else {
                const response = await request.json()
                dispatch(error(mapError(response)))
            }
        } catch (e) {
            dispatch(error(mapError(e)))
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
 * @param success
 * @param error
 * @param reset
 * @param settings
 * @returns {Function}
 */
export const adminRegister = (
    params: AdminRegisterParams,
    token: string,
    success: Function,
    error: Function,
    reset: Function,
    settings: AuthSettings
) => {
    return async (dispatch: Function) => {
        try {
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
                dispatch(success())
                reset && reset()
            } else {
                dispatch(error(mapError(response)))
            }
        } catch (e) {
            dispatch(error(mapError(e)))
        }
    }
}

/***
 * Login param type
 */

export type LoginParams = {
    email: string,
    password: string,
}

/***
 * Login effect
 * @param signInWithEmailAndPassword
 * @param params
 * @param success
 * @param error
 * @returns {Function}
 */
export const login = (
    signInWithEmailAndPassword: Function,
    params: LoginParams,
    success: Function,
    error: Function
) => {
    return async (dispatch: Function) => {
        try {
            const response = await signInWithEmailAndPassword(params)
            dispatch(success())
        } catch (e) {
            dispatch(error(mapError(e)))
        }
    }
}

/***
 * Logout effect
 * @returns {Function}
 */
export const logout = (
    signOut: Function,
    success: Function,
    error: Function
): Function => {
    return (dispatch: Function) => {
        try {
            signOut()
            dispatch(success())
        } catch (e) {
            dispatch(error(mapError(e)))
        }
    }
}
