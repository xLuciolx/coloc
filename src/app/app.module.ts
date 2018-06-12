import { NgModule, ErrorHandler, LOCALE_ID } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader, TranslateCompiler} from '@ngx-translate/core';
import { TranslateMessageFormatCompiler } from 'ngx-translate-messageformat-compiler';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { MESSAGE_FORMAT_CONFIG } from 'ngx-translate-messageformat-compiler';

/**
 * Providers
 */
import { SettingsProvider } from './../providers/settings';
import { UserProvider } from '../providers/services/userProvider';

/**
 * Pages
 */
import { LoginPage } from '../pages/login/login';
import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SubscribePage } from './../pages/subscribe/subscribe';
import { AccountPage } from './../pages/account/account';

/**
 * Pipes
 */
import { CapitalizePipe } from './../pipes/capitalize/capitalize';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import fr from '@angular/common/locales/fr';

export function createTranslateLoader(http: HttpClient){
    return new TranslateHttpLoader(http, './assets/i18n/', '.json')
}

registerLocaleData(localeFr)

@NgModule({
    declarations: [
        MyApp,
        LoginPage,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        SubscribePage,
        AccountPage,
        CapitalizePipe,
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        IonicModule.forRoot(MyApp),
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: (createTranslateLoader),
                deps: [HttpClient]
            },
            compiler: {
                provide: TranslateCompiler,
                useClass: TranslateMessageFormatCompiler
            }
        })
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        MyApp,
        LoginPage,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        SubscribePage,
        AccountPage
    ],
    providers: [
        {provide: LOCALE_ID, deps: [SettingsProvider], useFactory: (settingsProvider: SettingsProvider) => 'fr'},
        { provide: MESSAGE_FORMAT_CONFIG, useValue: { intlSupport: true }},
        SettingsProvider,
        StatusBar,
        SplashScreen,
        {provide: ErrorHandler, useClass: IonicErrorHandler},
        UserProvider
    ]
})
export class AppModule {}
