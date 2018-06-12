import { TranslateService } from '@ngx-translate/core';
import { isDefined } from 'ionic-angular/util/util';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Settings } from './../../models/Settings';
import { SettingsProvider } from '../../providers/settings';

import { TabsPage } from '../tabs/tabs';
import { SubscribePage } from './../subscribe/subscribe';


/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
    selector: 'page-login',
    templateUrl: 'login.html',
})
export class LoginPage {

    settings: Settings
    username: string
    code: string
    showErrorUsername: boolean
    showErrorCode: boolean
    showAlert: boolean

    constructor(
        public navCtrl: NavController,
        public alertCtrl: AlertController,
        public navParams: NavParams,
        public settingsProvider: SettingsProvider,
        public translate: TranslateService,
    ) {
        this.showErrorUsername = false
        this.showErrorCode = false
        this.settings = new Settings()
        this.settingsProvider.get().then(
        settings => {
            this.settings = settings;
        }
        )
        this.showAlert = this.navParams.get('success')
    }

    focusUsername() {
        this.showErrorUsername = false
    }
    focusCode() {
        this.showErrorCode = false
    }

    goToSubscribe(){
        this.navCtrl.push(SubscribePage)
    }

    login() {

        if(this.username === 'loïc' && this.code === '123') {
            this.settings.logged = true
            this.settings.username = this.username
            this.settings.code = this.code

            this.settingsProvider.upsert(this.settings).then(
                () => { this.navCtrl.setRoot(TabsPage) } ),
                err => {
                    console.log(err)
                }

            }

        }
        // if(!isDefined(this.username) || this.username === "") this.showErrorUsername = true
        // if(!isDefined(this.code) || this.code.length !== 6) this.showErrorCode = true

        // if(this.showErrorUsername === false && this.showErrorCode === false) {

        //   this.settings.code = this.code
        //   this.settings.coachId = this.username

        //   this.settingsProvider.upsert(this.settings).then(
        //     () => {

        //       this.backendWs.getCoachData().then(
        //         () => {

        //           this.clientService.list().then(
        //             client => {

        //               this.coachSettingsProvider.list().then(
        //                 coachsettings => {
        //                   this.settings.logged = true
        //                   this.settings.dateOfFirstUse = new Date().toISOString()
        //                   this.settings.currency = coachsettings.currency
        //                   this.settingsProvider.upsert(this.settings).then(
        //                     () => { this.navCtrl.setRoot(DashboardPage) } )
        //                 },
        //                 err => {
        //                   this.showErrorUsername = true
        //                 }
        //               )
        //             },
        //             err => {
        //               this.showErrorCode = true
        //             }
        //           )
        //         },
        //         err => {
        //           this.showErrorUsername = true
        //         }
        //       )
        //     },
        //     err => {
        //       let alert = this.alertCtrl.create({
        //         title: 'Database access needed',
        //         subTitle: 'Make sure that you are not in private or incognito mode and that your security settings allow database access.',
        //         buttons: ['Ok']
        //       })
        //       alert.present();
        //     }
        //   )

        // }
    }


