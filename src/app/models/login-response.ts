import { UserDetail } from './user-detail';

export class LoginResponse {
    public token: string;
    public expirationDate: Date;
    public roles: Array<string>;    
    public user: UserDetail;
}
