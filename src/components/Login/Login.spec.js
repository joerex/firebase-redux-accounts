import React from 'react'
import { shallow, mount, render } from 'enzyme'
import { LoginComponent } from './Login'

const renderTests = () => {
    const component = mount(<LoginComponent />)

    it('should render a form', () => {
        expect(component.find('form').exists()).toBe(true)
    })

    it('should render an email input', () => {
        expect(component.find('input[name="username"]').length).toEqual(1)
    })

    it('should render a password input', () => {
        expect(component.find('input[name="password"]').length).toEqual(1)
    })

    it('should render a submit button', () => {
        expect(component.find('button.submit').length).toEqual(1)
    })
}

const inputTests = () => {
    const component = shallow(<LoginComponent />)

    it('should handle username input', () => {
        component.find('input[name="username"]').simulate('change', {
            target: { value: 'bob', name: 'username' },
        })
        expect(component.find('input[name="username"]').props().value).toEqual(
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
    const selector = 'div.alert.alert-danger.error'
    const component = shallow(<LoginComponent />)

    it('should display an error message from props', () => {
        expect(component.find(selector).exists()).toEqual(false)
        component.setProps({ error })
        expect(component.find(selector).text()).toEqual(error)
    })
}

const actionTests = () => {
    const login = jest.fn()
    const state = { username: 'bob', password: 'activate' }
    const props = { login }
    const component = mount(<LoginComponent {...props} />)

    component.setState(state)

    it('should submit state', () => {
        component
            .find('button.submit')
            .simulate('click', { preventDefault: jest.fn() })
        expect(login).toBeCalledWith(state)
    })
}

describe('Login Component', () => {
    describe('Render', renderTests)
    describe('Input', inputTests)
    describe('Errors', errorTests)
    describe('Actions', actionTests)
})
