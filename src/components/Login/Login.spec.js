import React from 'react'
import { shallow, mount } from 'enzyme'
import LoginComponent from './Login'
import { ENABLED_STATE, ERROR_STATE } from '../../state/views'

const mockProps = {
    state: { status: ENABLED_STATE },
    onSubmit: () => {},
}

const renderTests = () => {
    const component = mount(<LoginComponent {...mockProps} />)

    it('should render a form', () => {
        expect(component.find('form').exists()).toBe(true)
    })

    it('should render an email input', () => {
        expect(component.find('input[name="email"]').length).toEqual(1)
    })

    it('should render a password input', () => {
        expect(component.find('input[name="password"]').length).toEqual(1)
    })

    it('should render a submit button', () => {
        expect(component.find('button.submit').length).toEqual(1)
    })
}

const inputTests = () => {
    const component = shallow(<LoginComponent {...mockProps} />)

    it('should handle username input', () => {
        component.find('input[name="email"]').simulate('change', {
            target: { value: 'bob', name: 'email' },
        })
        expect(component.find('input[name="email"]').props().value).toEqual(
            'bob'
        )
    })

    it('should handle password input', () => {
        component.find('input[name="password"]').simulate('change', {
            target: { value: 'activate', name: 'password' },
        })
        expect(component.find('input[name="password"]').props().value).toEqual(
            'activate'
        )
    })
}

const errorTests = () => {
    const error = 'Houston, we have a problem'
    const mockErrorState = { status: ERROR_STATE, error }
    const selector = 'div.alert.alert-danger.error'
    const component = shallow(<LoginComponent {...mockProps} />)

    it('should display an error message from props', () => {
        expect(component.find(selector).exists()).toEqual(false)
        component.setProps({ state: mockErrorState })
        expect(component.find(selector).text()).toEqual(error)
    })
}

const actionTests = () => {
    const login = jest.fn()
    const params = { email: 'bob', password: 'activate' }
    const props = {
        ...mockProps,
        onSubmit: () => login(params),
    }
    const component = mount(<LoginComponent {...props} />)

    component.setState(params)

    it('should submit state', () => {
        component
            .find('button.submit')
            .simulate('click', { preventDefault: jest.fn() })
        expect(login).toBeCalledWith(params)
    })
}

describe('Login Component', () => {
    describe('Render', renderTests)
    describe('Input', inputTests)
    describe('Errors', errorTests)
    describe('Actions', actionTests)
})
