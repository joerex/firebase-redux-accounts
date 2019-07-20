// @flow

import React from 'react'
import type { ViewState } from '../../state/views'
import { PENDING_STATE } from '../../state/views'

type Props = {
    text: ?string,
    onSubmit: Function,
    state: ViewState,
}

export default (props: Props) => {
    const { text, onSubmit, state } = props

    switch (state.status) {
        case PENDING_STATE:
            return <span className="fa fa-spinner fa-spin" />
        default:
            return <a onClick={() => onSubmit()}>{text ? text : 'Logout'}</a>
    }
}
