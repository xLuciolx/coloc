import { TabsPage } from './../tabs/tabs';
import { UserProvider } from './../../providers/services/userProvider';
import { AccountPage } from './../account/account';
import { User } from './../../models/User';
import { Settings } from './../../models/Settings';
import { SettingsProvider } from './../../providers/settings';
import { Component } from '@angular/core';
import { NavController, NavParams, Tabs } from 'ionic-angular';



@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {

    settings: Settings
    user: User
    param = {count: 3}

    constructor(public navCtrl: NavController, public settingsProvider: SettingsProvider, public userProvider : UserProvider) {
        this.settings = new Settings()
        this.settingsProvider.get().then(
            settings => {
                this.settings = settings
            }
        )
        this.user = new User()
        this.userProvider.get().then(
            user => {
                this.user = user
            }
        )

    }

    logout(){
        this.settingsProvider.erase()
        location.reload()
    }


    myAccount(){
        this.navCtrl.parent.select(1)
    }

}
