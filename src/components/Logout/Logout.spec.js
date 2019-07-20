import React from 'react'
import { shallow } from 'enzyme'
import LogoutComponent from './Logout'
import { ENABLED_STATE } from '../../state/views'

const logout = jest.fn()
const mockProps = {
    state: { status: ENABLED_STATE },
    onSubmit: () => {
        logout()
    },
}

describe('LogoutComponent', () => {
    const component = shallow(<LogoutComponent {...mockProps} />)

    it('should render a logout link', () => {
        expect(component.find('a').text()).toEqual('Logout')
    })

    it('should handle click', () => {
        component.find('a').simulate('click')
        expect(logout).toBeCalledTimes(1)
    })
})
