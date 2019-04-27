import React from 'react'
import { shallow } from 'enzyme'
import { LogoutComponent } from './Logout'

describe('LogoutComponent', () => {
    const logout = jest.fn()
    const component = shallow(<LogoutComponent logout={logout} />)

    it('should render a logout link', () => {
        expect(component.find('a').text()).toEqual('Logout')
    })

    it('should handle click', () => {
        component.find('a').simulate('click')
        expect(logout).toBeCalledTimes(1)
    })
})
