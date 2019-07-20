import React from 'react'
import { mount, shallow } from 'enzyme'
import ForgotPasswordComponent from './ForgotPassword'
import { ENABLED_STATE, ERROR_STATE } from '../../state/views'

const mockProps = {
    state: { status: ENABLED_STATE },
    onSubmit: () => {},
}

const renderTests = () => {
    const component = mount(<ForgotPasswordComponent {...mockProps} />)

    it('should render an email input', () => {
        expect(component.find('input[name="email"]').exists()).toEqual(true)
    })

    it('should render a submit button', () => {
        expect(component.find('button.submit').length).toEqual(1)
    })
}

const stateTests = () => {
    const infoSelector = 'div.alert.alert-info'
    const successSelector = 'div.alert.alert-success'
    const mockSuccessState = { status: ENABLED_STATE, success: true }
    const component = shallow(<ForgotPasswordComponent {...mockProps} />)

    it('should display info message or success message', () => {
        expect(component.find(infoSelector).exists()).toEqual(true)
        expect(component.find(successSelector).exists()).toEqual(false)
        component.setProps({ state: mockSuccessState })
        expect(component.find(infoSelector).exists()).toEqual(false)
        expect(component.find(successSelector).exists()).toEqual(true)
    })
}

const errorTests = () => {
    const error = 'Houston, we have a problem'
    const selector = 'div.alert.alert-danger.error'
    const mockErrorState = { status: ERROR_STATE, error }
    const component = shallow(<ForgotPasswordComponent {...mockProps} />)

    it('should display an error message from props', () => {
        expect(component.find(selector).exists()).toEqual(false)
        component.setProps({ state: mockErrorState })
        expect(component.find(selector).text()).toEqual(error)
    })
}

const actionTests = () => {
    const resetPassword = jest.fn()
    const email = 'bob@gmail.com'
    const props = { ...mockProps, onSubmit: () => resetPassword(email) }
    const component = mount(<ForgotPasswordComponent {...props} />)

    component.setState({ email })

    it('should submit state', () => {
        component
            .find('button.submit')
            .simulate('click', { preventDefault: jest.fn() })
        expect(resetPassword).toBeCalledWith(email)
    })
}

describe('ForgotPassword Component', () => {
    describe('Render', renderTests)
    describe('State', stateTests)
    describe('Errors', errorTests)
    describe('Actions', actionTests)
})
