import { FormGroup, FormBuilder } from '@angular/forms';
import { User } from './../../models/User';
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { UserProvider } from '../../providers/services/userProvider';

/**
 * Generated class for the AccountPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-account',
    templateUrl: 'account.html',
})
export class AccountPage {
    user: User
    accountForm: FormGroup

    constructor(public navCtrl: NavController, public navParams: NavParams, public userProvider: UserProvider, public fb: FormBuilder) {
        this.user = new User()
        this.userProvider.get().then(
            user => {
                this.user = user
            }
        )
        this.accountForm = fb.group({
            username: [''],
            mail: [''],
            password: ['']
        })
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad AccountPage');
    }

}
