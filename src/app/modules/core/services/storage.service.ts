import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    _json = null;
    _userLogged = '';

    constructor() {

    }

    get json(): any {
        return this._json;
    }

    set json(value: any) {
        this._json = value;
    }

    get userLogged(): string {
        return this._userLogged;
    }

    set userLogged(value: string) {
        this._userLogged = value;
    }

}