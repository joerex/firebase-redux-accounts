// @flow

import React from 'react'
import Select from 'react-select'
import type { Field } from '../../index'
import type { OptionType, ValueType } from 'react-select/src/types'
import './SelectField.css'

type ParentProps = {
    options: Array<OptionType>,
    field: Field,
    form: Function,
    placeholder: string,
}

export default ({ options, field, form, placeholder }: ParentProps) => {
    const value = options
        ? options.find((option: OptionType) => option.value === field.value)
        : null
    const onChange = (option: ValueType) => {
        form.setFieldValue(field.name, option)
    }
    const theme = theme => ({
        ...theme,
        borderRadius: 0,
    })

    return (
        <Select
            className="SelectField"
            theme={theme}
            options={options}
            name={field.name}
            value={value}
            onChange={onChange}
            onBlur={field.onBlur}
            placeholder={placeholder}
        />
    )
}
