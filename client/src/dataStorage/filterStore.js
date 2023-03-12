import{ makeAutoObservable } from 'mobx'

export default class filterStore {
        constructor() {
            
        this._state = "all";

        makeAutoObservable(this)
    }

    setState(newState){
        this._state = newState;
    }

    get state(){
        return this._state;
    }
 
}