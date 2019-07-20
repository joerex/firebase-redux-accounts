import React from 'react'
import { shallow, mount } from 'enzyme'
import RegisterComponent from './Register'
import * as Yup from 'yup'
import { Formik } from 'formik'
import { ENABLED_STATE, ERROR_STATE } from '../../state/views'

const mockProps = {
    fields: [
        {
            name: 'email',
            type: 'text',
            placeholder: 'Email',
            schema: Yup.string().required('Required'),
            initialValue: 'bob@gmail.com',
        },
    ],
    state: { status: ENABLED_STATE },
    onSubmit: () => {},
}

const renderTests = () => {
    const component = mount(<RegisterComponent {...mockProps} />)

    it('should render an email input', () => {
        expect(component.find('input[name="email"]').exists()).toEqual(true)
    })

    it('should render a submit button', () => {
        expect(component.find('button.submit').length).toEqual(1)
    })
}

const stateTests = () => {
    const successSelector = 'div.alert.alert-success'
    const mockSuccessMessage = { status: ENABLED_STATE, success: true }
    const component = shallow(<RegisterComponent {...mockProps} />)

    it('should display success message', () => {
        expect(component.find(successSelector).exists()).toEqual(false)
        component.setProps({ state: mockSuccessMessage })
        expect(component.find(successSelector).exists()).toEqual(true)
    })
}

const errorTests = () => {
    const error = 'Houston, we have a problem'
    const selector = 'div.alert.alert-danger.error'
    const mockErrorState = { status: ERROR_STATE, error }
    const component = mount(<RegisterComponent {...mockProps} />)

    it('should display an error message from props', () => {
        expect(component.find(selector).exists()).toEqual(false)
        component.setProps({ state: mockErrorState })
        expect(component.find(selector).text()).toEqual(error)
    })
}

const actionTests = () => {
    const action = jest.fn()
    const props = {
        ...mockProps,
        onSubmit: (a, { resetForm }) => {
            resetForm()
        },
    }
    const component = mount(<RegisterComponent {...props} />)

    it('should handle submit', () => {
        component
            .find(Formik)
            .props()
            .onSubmit({ email: '' }, { resetForm: action })
        expect(action).toBeCalledTimes(1)
    })
}

describe('Register Component', () => {
    describe('Render', renderTests)
    describe('State', stateTests)
    describe('Errors', errorTests)
    describe('Actions', actionTests)
})
