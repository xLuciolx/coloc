import { User } from './../../models/User';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
    Generated class for the UserProvider provider.

    See https://angular.io/guide/dependency-injection for more info on providers
    and Angular DI.
*/
@Injectable()
export class UserProvider {

    constructor(public http: HttpClient) {
    }
    get(){
        return new Promise<any>((resolve, reject) => {
            resolve(new User(
                {
                    "username": "loïc",
                    "mail" : "test@test.fr",
                    "password" : "123",
                    "subscribtionDate" : "01/02/2018",
                    "lastLoggin" : "13/02/2018",
                    "preferences" : "",
                    "profilCompletion" : 80
                }
            ))
        })
    }
}
