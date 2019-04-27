import React from 'react'
import { shallow, mount } from 'enzyme'
import { RegisterComponent } from './Register'
import * as Yup from 'yup'
import { Formik } from 'formik'

const props = {
    fields: [
        {
            name: 'email',
            type: 'text',
            placeholder: 'Email',
            schema: Yup.string().required('Required'),
            initialValue: 'bob@gmail.com',
        },
    ],
}

const renderTests = () => {
    const component = mount(<RegisterComponent {...props} />)

    it('should render an email input', () => {
        expect(component.find('input[name="email"]').exists()).toEqual(true)
    })

    it('should render a submit button', () => {
        expect(component.find('button.submit').length).toEqual(1)
    })
}

const stateTests = () => {
    const successSelector = 'div.alert.alert-success'
    const component = shallow(<RegisterComponent {...props} />)

    it('should display success message', () => {
        expect(component.find(successSelector).exists()).toEqual(false)
        component.setProps({ registerSuccess: true })
        expect(component.find(successSelector).exists()).toEqual(true)
    })
}

const errorTests = () => {
    const error = 'Houston, we have a problem'
    const selector = 'div.alert.alert-danger.error'
    const component = mount(<RegisterComponent {...props} />)

    it('should display an error message from props', () => {
        expect(component.find(selector).exists()).toEqual(false)
        component.setProps({ error })
        expect(component.find(selector).text()).toEqual(error)
    })
}

const actionTests = () => {
    const action = jest.fn()
    const dispatch = jest.fn()
    const actionProps = {
        ...props,
        action,
        dispatch,
    }
    const component = mount(<RegisterComponent {...actionProps} />)

    it('should handle submit', async () => {
        await component
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
