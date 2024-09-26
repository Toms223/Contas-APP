interface IAccount {
    id: number,
    username: string,
    email: string,
    token: string
}

class Account implements IAccount {
    id: number
    username: string
    email: string
    token: string

    constructor(id: number, username: string, email: string, token: string){
        this.id = id
        this.username = username
        this.email = email
        this.token = token
    }
}