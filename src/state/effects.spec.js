import { resetPassword, register, acceptInvite } from './effects'
import { error, success } from './views'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const mockResult = error => {
    return error ? Promise.reject(error) : Promise.resolve()
}
const mockError = { message: 'woops' }

describe('Reset password', () => {
    it('should dispatch success actions', () => {
        const action = resetPassword(() => mockResult(), '', success, error)
        const expectedActions = [success()]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should dispatch error actions', () => {
        const action = resetPassword(
            () => mockResult(mockError),
            '',
            success,
            error
        )
        const expectedActions = [error(mockError.message)]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

/*
describe('Accept invite register', () => {
    it('should dispatch success actions', () => {
        const action = acceptInvite({}, '', '', success, error)
        const expectedActions = [success()]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should dispatch error actions', () => {
        const action = register({})
        const expectedActions = [error(error)]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
*/
describe('Register actions', () => {
    it('should dispatch success actions', () => {
        const effect = register(() => mockResult(), {}, {}, success, error)
        const expectedActions = [success()]
        const store = mockStore({})

        return store.dispatch(effect).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should dispatch error actions', () => {
        const action = register(
            () => mockResult(mockError),
            {},
            {},
            success,
            error
        )
        const expectedActions = [error(mockError.message)]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
