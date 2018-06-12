import { LoginPage } from './../pages/login/login';
import { SettingsProvider } from './../providers/settings';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { TranslateService } from '@ngx-translate/core';

@Component({
	templateUrl: 'app.html'
})
export class MyApp {
    rootPage:any;
    

	constructor(private platform: Platform, private statusBar: StatusBar, private splashScreen: SplashScreen, private settingsProvider: SettingsProvider) {
        this.initializeApp()
    }
    initializeApp() {
        this.platform.ready().then(() => {
            this.settingsProvider.get().then(
                settings => {
                    if (!settings.logged) {
                        this.rootPage = LoginPage
                    }
                    else{
                        this.rootPage = TabsPage
                    }
                }
            )
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
        });
    }
}
