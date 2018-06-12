import { Message } from './Message';
import { Contact } from './Contact';
import { Preferences } from './Preferences';

export class User
{
    id: number
    username: string
    mail: string
    password: string
    subscribtionDate: string
    lastLoggin: string
    contacts: Array<Contact> = []
    preferences: Preferences
    messages: Array<Message>
    profilCompletion: number
    contact1 : Contact
    contact2 : Contact
    contact3 : Contact

    constructor(db_user? : any){
        Object.assign(this, db_user)
        this.contact1 = new Contact('john', 84, 'New York', 'John Doe')
        this.contact2 = new Contact('jane', 37, 'Londres', 'Jane Doe')
        this.contact3 = new Contact('laura', 100, 'Villefranche', 'Laura T')
        this.contacts.push(this.contact1)
        this.contacts.push(this.contact2)
        this.contacts.push(this.contact3)
    }
}