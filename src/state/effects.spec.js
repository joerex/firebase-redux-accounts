import firebase from '../services'
import { resetPassword, register } from './effects'
import {
    authPending,
    authError,
    resetPasswordSuccess,
    loginSuccess,
} from './index'
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares)

const dispatch = jest.fn()
const auth = () => {
    return {
        signInWithEmailAndPassword: jest.fn(),
        createUserWithEmailAndPassword: jest.fn(),
        signOut: jest.fn(),
        sendPasswordResetEmail: jest.fn(),
        onAuthStateChanged: jest.fn(),
    }
}
const error = 'woops'
const authMockError = () => {
    return {
        signInWithEmailAndPassword: jest.fn(),
        createUserWithEmailAndPassword: jest
            .fn()
            .mockRejectedValue(new Error(error)),
        signOut: jest.fn(),
        sendPasswordResetEmail: jest.fn().mockRejectedValue(new Error(error)),
        onAuthStateChanged: jest.fn(),
    }
}
const database = () => {
    return {
        ref: jest.fn(),
    }
}
const databaseMockError = () => {
    return {
        ref: jest.fn().mockRejectedValue(new Error(error)),
    }
}
const app = {
    auth,
    database,
}
const appError = {
    auth: authMockError,
    database: databaseMockError,
}

describe('Reset password', () => {
    it('should call firebase auth', () => {
        firebase.init(app, dispatch)
        const spy = jest.spyOn(firebase, 'auth', 'get')
        const action = resetPassword('bob@gmail.com')
        action(dispatch)
        expect(spy).toHaveBeenCalled()
    })

    it('should dispatch pending and success actions', () => {
        firebase.init(app, dispatch)
        const email = 'bob@gmail.com'
        const action = resetPassword(email)
        const expectedActions = [authPending(), resetPasswordSuccess(email)]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should dispatch pending and error actions', () => {
        firebase.init(appError, dispatch)
        const action = resetPassword('')
        const expectedActions = [authPending(), authError(error)]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

describe('Public register', () => {
    const params = { email: 'bob@gmail.com', password: 'activate' }

    it('should call firebase auth', () => {
        firebase.init(app, dispatch)
        const spy = jest.spyOn(firebase, 'auth', 'get')
        const action = register(params)
        action(dispatch)
        expect(spy).toHaveBeenCalled()
    })

    it('should dispatch pending and success actions', () => {
        firebase.init(app, dispatch)
        const action = register(params)
        const expectedActions = [authPending(), loginSuccess()]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should dispatch pending and error actions', () => {
        firebase.init(appError, dispatch)
        const action = register({})
        const expectedActions = [authPending(), authError(error)]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})

describe('Accept invite register', () => {
    const params = { email: 'bob@gmail.com', password: 'activate' }

    it('should call firebase auth', () => {
        firebase.init(app, dispatch)
        const spy = jest.spyOn(firebase, 'auth', 'get')
        const action = register(params)
        action(dispatch)
        expect(spy).toHaveBeenCalled()
    })

    it('should dispatch pending and success actions', () => {
        firebase.init(app, dispatch)
        const action = register(params)
        const expectedActions = [authPending(), loginSuccess()]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })

    it('should dispatch pending and error actions', () => {
        firebase.init(appError, dispatch)
        const action = register({})
        const expectedActions = [authPending(), authError(error)]
        const store = mockStore({})

        return store.dispatch(action).then(() => {
            expect(store.getActions()).toEqual(expectedActions)
        })
    })
})
