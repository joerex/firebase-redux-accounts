// @flow

import React from 'react'

type ParentProps = {
    onSubmit: Function,
    pending: boolean,
    text: string,
}

export default (props: ParentProps): Function => {
    const { onSubmit, pending, text } = props
    return (
        <button
            disabled={pending}
            onClick={onSubmit}
            className="btn btn-block btn-brand submit"
        >
            {pending ? (
                <span className="fa fa-spinner fa-spin" />
            ) : (
                <span>{text}</span>
            )}
        </button>
    )
}
