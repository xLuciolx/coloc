export class Contact
{
    id: number
    picture: string
    match: number
    location: string
    contactUsername: string

    constructor(picture, match, location, contactUsername){
        this.picture = picture
        this.match = match
        this.location = location
        this.contactUsername = contactUsername
    }
}