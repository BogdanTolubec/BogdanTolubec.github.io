import{ makeAutoObservable } from 'mobx'

class userStore {
    constructor() {
        this._isAuth = false
        this._user = {}
        makeAutoObservable(this)
    }

    setIsAuth(bool){
        this._isAuth = bool;
    }

    get isAuth(){
        return this._isAuth;
    }

    setUser(user){
        this._user = user;
    }

    get User(){
        return this._user;
    }
}

export default userStore