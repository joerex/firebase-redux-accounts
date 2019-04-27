import React from 'react'
import { shallow } from 'enzyme'
import SubmitButton from './SubmitButton'

describe('SubmitButton Component', () => {
    const text = 'Submit'
    const props = {
        onSubmit: jest.fn(),
        pending: false,
        text,
    }
    const component = shallow(<SubmitButton {...props} />)

    it('should render a button with text', () => {
        expect(component.find('button.submit').text()).toEqual(text)
    })

    it('should render a spinner when pending', () => {
        component.setProps({ ...props, pending: true })
        expect(component.find('span.fa-spinner.fa.fa-spin').exists()).toEqual(
            true
        )
    })

    it('should handle click', () => {
        const onSubmit = jest.fn()
        component.setProps({ ...props, onSubmit })
        component.find('button.submit').simulate('click')
        expect(onSubmit).toBeCalledTimes(1)
    })
})
