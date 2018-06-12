import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/map';
import PouchDB from 'pouchdb';
import { Platform } from 'ionic-angular';
import { Settings } from "../models/Settings";
import { TranslateService } from "@ngx-translate/core";
/*
    Generated class for the SettingsProvider provider.

    See https://angular.io/docs/ts/latest/guide/dependency-injection.html
    for more info on providers and Angular 2 DI.
*/
@Injectable()
export class SettingsProvider {
    private _db;
    settings: Settings = new Settings;

    initDB(platform) {
        // if (platform.is('ios')) {
        //   PouchDB.plugin(cordovaSqlitePlugin);
        //   this._db = new PouchDB('com.haredev.justtrainclient.settings.db', { adapter: 'cordova-sqlite' });
        // } else {
        this._db = new PouchDB('com.coloc.settings.db');
        // }
        window["PouchDB"] = PouchDB;
    }

    constructor(
        // public http: HttpClient, 
        public plt: Platform, 
        public translate: TranslateService
    ) {
        this.initDB(plt);
        this.get().then(
        settings => {
            this.translate.setDefaultLang('fr');
            if (settings.language !== 'device') {
            this.translate.use(settings.language)
            } else {
            try {
                this.translate.use(window.navigator.language.split('-')[0])
            } catch (Error){
                console.error('error loading device language')
                this.translate.use('fr')
            }
            }
        },
        err => console.log(err)
        )
    }

    upsert(settings) {
        if (!settings._id) {
        return this._db.post(settings);
        } else {
        return this._db.put(settings);
        }
    }

    getCached(): Settings {
        return this.settings;
    }

    get(): Promise<Settings> {
        return this._db.allDocs({ include_docs: true})
        .then(docs => {
            // Listen for changes on the database.
            this._db.changes({ live: true, since: 'now', include_docs: true})
            .on('change', this.onDatabaseChange);

            let settings =  docs.rows.map(row => {
            return new Settings(row.doc);
            });
            if (settings.length < 1 ) {
            this.settings = new Settings()
            return this.upsert(this.settings).then(()=> {return this.get()});
            } else {
            console.log(settings)
            this.settings = settings[0]
            return this.settings;
            }
        });
    }

    getLocale() {
        return this.translate.currentLang
    }

    private onDatabaseChange = (change) => {
        if (!change.deleted && change.id === this.settings._id) {
            this.settings = new Settings(change.doc);
        }
    };

    erase() {
        this._db.destroy()
    }

}
