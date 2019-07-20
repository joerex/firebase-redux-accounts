// @flow

import React, { Fragment } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from '../SelectField/SelectField'
import SubmitButton from '../SubmitButton/SubmitButton'
import './Register.css'
import type { Field as FieldType } from '../../index'
import type { ViewState } from '../../state/views'
import { ERROR_STATE, PENDING_STATE } from '../../state/views'

type Props = {
    state: ViewState,
    onSubmit: Function,
    fields: [FieldType],
}

export default (props: Props) => {
    const { state, onSubmit, fields } = props

    const fieldComponents = fields.map((field, i) => {
        return (
            <div key={i}>
                {(field.type === 'text' ||
                    field.type === 'email' ||
                    field.type === 'password') && (
                    <Fragment>
                        <Field
                            name={field.name}
                            placeholder={field.placeholder}
                            type={field.type}
                            validate={field.validate}
                        />
                        <ErrorMessage
                            name={field.name}
                            component="div"
                            className="alert alert-danger"
                        />
                    </Fragment>
                )}
                {field.type === 'select' && (
                    <Fragment>
                        <Field
                            name={field.name}
                            component={SelectField}
                            options={field.options}
                            placeholder={field.placeholder}
                            validate={field.validate}
                        />
                        <ErrorMessage
                            name={field.name}
                            component="div"
                            className="alert alert-danger"
                        />
                    </Fragment>
                )}
            </div>
        )
    })

    // validation schema
    const shape = fields.reduce((accumulator, field) => {
        if (field.schema) {
            return {
                ...accumulator,
                [field.name]: field.schema,
            }
        } else {
            return accumulator
        }
    }, {})

    const schema = Yup.object().shape(shape)

    const initialValues = fields.reduce((accumulator, field) => {
        return {
            ...accumulator,
            [field.name]: field.value || '',
        }
    }, {})

    const errorMessage = state.status === ERROR_STATE && (
        <div className="alert alert-danger error">{state.error}</div>
    )

    return (
        <div className="Register accounts-form">
            {state.success && (
                <div className="alert alert-success">
                    <span>Your account has been created.</span>
                </div>
            )}

            <Formik
                initialValues={initialValues}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={schema}
                onSubmit={(e, b) => onSubmit(e, b)}
                render={({ handleSubmit }) => (
                    <Form>
                        {fieldComponents}
                        <SubmitButton
                            onSubmit={handleSubmit}
                            pending={state.status === PENDING_STATE}
                            text="Register"
                        />
                        {errorMessage}
                    </Form>
                )}
            />
        </div>
    )
}
