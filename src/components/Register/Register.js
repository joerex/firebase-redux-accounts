// @flow

import React, { Fragment } from 'react'
import { Formik, Field, Form, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import SelectField from '../SelectField/SelectField'
import {
    getAuthError,
    getAuthPending,
    getAuthRegisterSuccess,
    getAuthState,
    getAuthToken,
} from '../../state'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import SubmitButton from '../SubmitButton/SubmitButton'
import './Register.css'
import type { Field as FieldType } from '../../index'

type ParentProps = {
    redirect: string,
    uid: string,
    fields: Array<FieldType>,
    action: Function,
    successMessage: ?string,
}

type StoreProps = {
    error: ?string,
    token: ?string,
    registerSuccess: boolean,
    pending: boolean,
}

type Actions = {
    dispatch: Function,
}

export const RegisterComponent = (
    props: ParentProps & StoreProps & Actions
) => {
    const {
        error,
        token,
        registerSuccess,
        successMessage,
        redirect,
        uid,
        fields,
        action,
        dispatch,
        pending,
    } = props

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

    const acceptInvite = values => {
        return dispatch(action(values, token, uid))
    }

    const newRegister = (values, reset) => {
        return dispatch(action(values, token, reset))
    }

    const register = (values, { resetForm }) => {
        uid ? acceptInvite(values) : newRegister(values, resetForm)
    }

    const errorMessage = error && (
        <div className="alert alert-danger error">{error}</div>
    )

    return (
        <div className="Register accounts-form">
            {registerSuccess && (
                <div className="alert alert-success">
                    {successMessage
                        ? successMessage
                        : 'Your account has been created.'}
                    {redirect && <Link to={redirect}>Login</Link>}
                </div>
            )}

            <Formik
                initialValues={initialValues}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={schema}
                onSubmit={(e, b) => register(e, b)}
                render={({ handleSubmit }) => (
                    <Form>
                        {fieldComponents}
                        <SubmitButton
                            onSubmit={handleSubmit}
                            pending={pending}
                            text="Register"
                        />
                        {errorMessage}
                    </Form>
                )}
            />
        </div>
    )
}

export default connect(
    (state): StoreProps => {
        const authState = getAuthState(state)
        return {
            error: getAuthError(authState),
            registerSuccess: getAuthRegisterSuccess(authState),
            token: getAuthToken(authState),
            pending: getAuthPending(authState),
        }
    },
    (dispatch): Actions => {
        return { dispatch }
    }
)(RegisterComponent)
