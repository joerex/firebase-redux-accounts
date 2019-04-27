// @flow

import type { AuthSettings } from '..'

const API_ROOT: string = process.env.REACT_APP_API_ROOT || ''

/***
 * Validate email
 * @param email
 * @param settings
 * @returns {Promise<*>}
 */
export const validateEmail = async (
    email: string,
    settings: AuthSettings
): Promise<any> => {
    try {
        const endpoint = settings.endpoint.validateEmail || '/validateEmail'
        const request = await fetch(API_ROOT + endpoint, {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' },
        })
        const response = await request.json()
        return response.message
    } catch (error) {
        return error
    }
}
