export class CredentialRequest {

    public token: string;
    public login: string;
    public password: string;

    constructor(
        token: string,
        password: string
    ) { 
        this.token = token;
        this.login = null;
        this.password = password;
    }

}