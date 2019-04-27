// @flow

import { authError, loginSuccess, logoutSuccess } from '../state'
import type { Role, User } from '../index'

/***
 * Firebase app type
 */
type FirebaseApp = {
    auth: Function,
    database: Function,
}

/***
 * Default token endpoint
 * @param uid
 * @returns {string}
 */
const defaultTokenPath = (uid: string): string =>
    'metadata/' + uid + '/refreshTime'

/***
 * Not ready message
 * @type {string}
 */
const notReady: string = 'Auth not ready'

/***
 * Map token to role
 * @param token
 * @returns Role
 */
const mapRole = (token: any): Role => {
    return {
        isClient: token.claims.isClient || false,
        isAdmin: token.claims.isAdmin || false,
        isMember: token.claims.isMember || false,
        isManager: token.claims.isManager || false,
        emailVerified: token.claims.email_verified,
        token: token.token,
    }
}

/***
 * Firebase Service
 */
class FirebaseAccounts {
    _refreshPathFromUid: Function
    _app: ?FirebaseApp
    _dispatch: Function

    constructor() {
        this._app = null
    }

    /***
     * Initiate service
     * @param app
     * @param dispatch
     * @param tokenPath
     */
    init(app: FirebaseApp, dispatch: Function, tokenPath: ?Function) {
        this._app = app
        this._refreshPathFromUid = tokenPath || defaultTokenPath
        this._dispatch = dispatch

        this.auth.onAuthStateChanged((user: ?User) => {
            this.onAuthStateChanged(user)
        })
    }

    /***
     * Signout of Firebase
     */
    signOut() {
        this.auth.signOut()
    }

    /***
     * Handle Firebase auth state change
     * @param user
     * @param dispatch
     * @returns {Promise<void>}
     */
    async onAuthStateChanged(user: ?User, dispatch: Function) {
        if (user) {
            try {
                const role = await this.getRole(user)
                this._dispatch(loginSuccess(user, role))
            } catch (error) {
                this._dispatch(authError(error))
            }
        } else {
            this._dispatch(logoutSuccess())
        }
    }

    /***
     * Get Role
     * @param user
     * @returns {Promise<*>}
     */
    async getRole(user: User) {
        return new Promise((resolve, reject) => {
            const path: string = this._refreshPathFromUid(user.uid)
            const getTokenOnce = async () => {
                const token = await user.getIdTokenResult(true)
                resolve(mapRole(token))
                this.database.ref(path).off('value')
            }
            this.database.ref(path).on('value', getTokenOnce)
        })
    }

    /***
     * Get app
     */
    get app() {
        return this._app
            ? this._app
            : {
                  auth: this.auth,
                  database: this.database,
              }
    }

    /***
     * Get auth
     */
    get auth() {
        return this._app
            ? this._app.auth()
            : {
                  signInWithEmailAndPassword: (...args: any) =>
                      Promise.reject(notReady),
                  createUserWithEmailAndPassword: (...args: any) =>
                      Promise.reject(notReady),
                  signOut: (...args: any) => Promise.reject(notReady),
                  sendPasswordResetEmail: (...args: any) =>
                      Promise.reject(notReady),
                  onAuthStateChanged: (...args: any) =>
                      Promise.reject(notReady),
              }
    }

    /***
     * Get database
     */
    get database() {
        return this._app
            ? this._app.database()
            : {
                  ref: (args: any) => {
                      return {
                          on: (...args: any) => Promise.reject(notReady),
                          off: (...args: any) => Promise.reject(notReady),
                      }
                  },
              }
    }
}

export default new FirebaseAccounts()
