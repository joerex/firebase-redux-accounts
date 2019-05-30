// @flow
import type { FocusEventHandler } from 'react-select/src/types'

export type Auth = {
    reducerId: string,
    user: ?User,
    role: ?Role,
    state: AuthState,
}

export type User = {
    uid: string,
    displayName: string,
    email: string,
    emailVerified: boolean,
    isAnonymous: boolean,
    metadata: UserMetadata,
    phoneNumber: string,
    photoURL: string,
    providerId: string,
    refreshToken: string,
    uid: string,
    // methods
    getIdTokenResult: Function,
}

export type UserMetadata = {
    creationTime: string,
    lastSignInTime: string,
}

export type Role = {
    isClient: boolean,
    isAdmin: boolean,
    isMember: boolean,
    isManager: boolean,
    emailVerified: boolean,
    token: string,
}

export type AuthState = {
    updatePasswordSuccess: boolean,
    resetPasswordSuccess: boolean,
    registerSuccess: boolean,
    loading: boolean,
    authenticated: boolean,
    failedAuthAttempts: number,
    error: ?string,
    pending: boolean,
}

export type Token = {
    claims: {
        isClient: boolean,
        isAdmin: boolean,
        isMember: boolean,
        isManager: boolean,
        email_verified: boolean,
    },
    token: string,
}

export type AuthSettings = {
    localStorageKey: string,
    tokenPath: Function,
    firebase: FirebaseSettings,
    endpoint: {
        validateEmail: string,
        inviteUser: string,
    },
}

export type FirebaseSettings = {
    apiKey: string,
    authDomain: string,
    databaseURL: string,
    projectId: string,
    storageBucket: string,
    messagingSenderId: string,
}

export type Field = {
    name: string,
    type: string,
    value: string,
    placeholder: string,
    schema: ?Function,
    options: ?Array<Option>,
    validate: ?Function,
    onBlur: FocusEventHandler,
    onChange: FocusEventHandler,
}

export type Option = {
    label: string,
    value: any,
}
