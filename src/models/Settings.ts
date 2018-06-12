import { isDefined } from 'ionic-angular/util/util';

export class Settings 
{
    _id: string
    logged: boolean
    language: string
    username: string
    code: string

    constructor (db_settings ?: any) 
    {
        if(isDefined(db_settings))
        {
            Object.assign(this, db_settings)
        }
        else
        {
            this.logged = false
            this.language = 'fr'
        }
    }
}