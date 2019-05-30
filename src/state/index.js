// @flow

export const // view states
    PENDING_STATE = 'PENDING_STATE',
    ERROR_STATE = 'ERROR_STATE',
    LOADING_STATE = 'LOADING_STATE',
    ENABLED_STATE = 'ENABLED_STATE',
    DISABLED_STATE = 'DISABLED_STATE',
    // actions
    INIT_ACTION = 'INIT_ACTION',
    RESET_ACTION = 'RESET_ACTION',
    CLEAR_ERROR_ACTION = 'CLEAR_ERROR_ACTION',
    PENDING_ACTION = 'PENDING_ACTION',
    SUCCESS_ACTION = 'SUCCESS_ACTION',
    ERROR_ACTION = 'ERROR_ACTION'

/* States */

export type ViewState =
    | {| status: 'LOADING_STATE' |}
    | {| status: 'ENABLED_STATE', success: boolean |}
    | {| status: 'DISABLED_STATE', success: boolean |}
    | {| status: 'PENDING_STATE' |}
    | {| status: 'ERROR_STATE', error: string, count: number |}

/* Actions */

export type Action =
    | {| type: 'PENDING_ACTION' |}
    | {| type: 'ERROR_ACTION', error: string |}
    | {| type: 'SUCCESS_ACTION' |}
    | {| type: 'INIT_ACTION' |}
    | {| type: 'RESET_ACTION' |}
    | {| type: 'CLEAR_ERROR_ACTION' |}

/* Action creators */

export const pending = (): Action => {
    return { type: PENDING_ACTION }
}

export const error = (error: string): Action => {
    return { type: ERROR_ACTION, error }
}

export const success = (): Action => {
    return { type: SUCCESS_ACTION }
}

export const reset = (): Action => {
    return { type: RESET_ACTION }
}

export const loaded = (): Action => {
    return { type: INIT_ACTION }
}

export const clearError = (): Action => {
    return { type: CLEAR_ERROR_ACTION }
}

/* reducer */

const reducer = (
    state: ViewState = { status: LOADING_STATE },
    action: Action
): ViewState => {
    switch (action.type) {
        case PENDING_ACTION:
            return { status: PENDING_STATE }
        case SUCCESS_ACTION:
            return { status: ENABLED_STATE, success: true }

        case ERROR_ACTION:
            const count = s => {
                switch (s.status) {
                    case ERROR_STATE:
                        return s.count + 1
                    default:
                        return 1
                }
            }
            return {
                status: ERROR_STATE,
                error: action.error,
                count: count(state),
            }
        case RESET_ACTION:
        case INIT_ACTION:
        case CLEAR_ERROR_ACTION:
            return {
                status: ENABLED_STATE,
                success: false,
            }
        default:
            return state //(action.type: empty)
    }
}

export default reducer

/* SELECTORS */

export const getPending = (state: ViewState): boolean => {
    return state.status === PENDING_STATE
}

export const getLoading = (state: ViewState): boolean => {
    return state.status === LOADING_STATE
}

export const getErrorCount = (state: ViewState): number => {
    switch (state.status) {
        case ERROR_STATE:
            return state.count
        default:
            return 0
    }
}

export const getError = (state: ViewState): ?string => {
    switch (state.status) {
        case ERROR_STATE:
            return state.error
        default:
            return null
    }
}

export const getSuccess = (state: ViewState): ?boolean => {
    switch (state.status) {
        case ENABLED_STATE:
        case DISABLED_STATE:
            return state.success
        default:
            return null
    }
}
