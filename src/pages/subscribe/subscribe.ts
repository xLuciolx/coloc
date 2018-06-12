import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the SubscribePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

// @IonicPage()
@Component({
    selector: 'page-subscribe',
    templateUrl: 'subscribe.html',
})
export class SubscribePage {

    subscribeForm: FormGroup
    submitAttempt: boolean = false
    showPwd: boolean = false
    pwdType: string = "password"
    pwdIcon: string = "md-eye-off"

    constructor(
        public navCtrl: NavController, 
        public navParams: NavParams, 
        public formBuilder: FormBuilder
    ) {
        this.subscribeForm = formBuilder.group({
            username: ['', Validators.compose([Validators.required, Validators.minLength(4)])],
            mail: ['', Validators.compose([Validators.required, Validators.pattern('^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$')])],
            code: ['', Validators.compose([Validators.required, Validators.pattern('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{6}$')])],
            codeCheck: ['', Validators.compose([Validators.required])]
        },{validator: this.matchingPasswords('code', 'codeCheck')})
    }

    ionViewDidLoad() {
    console.log('ionViewDidLoad SubscribePage');
    }

    matchingPasswords(passwordKey: string, confirmPasswordKey: string) {
        return (group: FormGroup): {[key: string]: any} => {
        let password = group.controls[passwordKey];
        let confirmPassword = group.controls[confirmPasswordKey];
    
        if (password.value !== confirmPassword.value) {
            return {
            mismatchedPasswords: true
            };
        }
        }
    }

    showHidePassword(){
        this.showPwd = !this.showPwd

        if(this.showPwd){
            this.pwdType = 'text'
            this.pwdIcon = 'md-eye'
        } 
        else {
            this.pwdType = 'password'
            this.pwdIcon = 'md-eye-off'
        }
    }

    save(){
        this.submitAttempt = true
        if (this.subscribeForm.valid) {
            this.navCtrl.push(LoginPage, {'success': true})   
        }
    }

}
