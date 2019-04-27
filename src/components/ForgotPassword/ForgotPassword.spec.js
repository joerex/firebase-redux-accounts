import React from 'react'
import { mount, shallow } from 'enzyme'
import { ForgotPasswordComponent } from './ForgotPassword'
import { LoginComponent } from '../Login/Login'

const renderTests = () => {
    const component = mount(<ForgotPasswordComponent />)

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
    const component = shallow(<ForgotPasswordComponent />)

    it('should display info message or success message', () => {
        expect(component.find(infoSelector).exists()).toEqual(true)
        expect(component.find(successSelector).exists()).toEqual(false)
        component.setProps({ resetSuccess: true })
        expect(component.find(infoSelector).exists()).toEqual(false)
        expect(component.find(successSelector).exists()).toEqual(true)
    })
}

const errorTests = () => {
    const error = 'Houston, we have a problem'
    const selector = 'div.alert.alert-danger.error'
    const component = shallow(<ForgotPasswordComponent />)

    it('should display an error message from props', () => {
        expect(component.find(selector).exists()).toEqual(false)
        component.setProps({ error })
        expect(component.find(selector).text()).toEqual(error)
    })
}

const actionTests = () => {
    const resetPassword = jest.fn()
    const email = 'bob@gmail.com'
    const props = { resetPassword }
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
