import React from 'react'
import { mount } from 'enzyme'
import SelectField from './SelectField'
import * as Yup from 'yup'

describe('SelectField Component', () => {
    const options = [{ value: 'manager', label: 'Manager' }]
    const props = {
        placeholder: 'Role',
        options,
        form: { values: { role: options[0] } },
        field: {
            name: 'role',
            type: 'select',
            placeholder: 'Role',
            options,
            schema: Yup.string().required('Required'),
        },
    }
    const component = mount(<SelectField {...props} />)

    it('should render a SelectField', () => {
        expect(component.find('.SelectField').exists()).toEqual(true)
    })

    it('should render an input', () => {
        expect(component.find('input[name="role"]').exists()).toEqual(true)
    })
})
