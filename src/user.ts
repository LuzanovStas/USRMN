import * as crypto from 'crypto-js';

export class User {

    public userName: string;
    public apiKey: string;

    constructor(data: any) {
        this.userName = data['userName'];
        this.apiKey = this.generateApiKey(data);
    }

    public generateApiKey(data: any): string {
        if (data['apiKey']) {
            let key = data['apiKey'];
            return key;
        } else {
            let date = (new Date).getTime();
            let key = crypto.MD5(date + data['userName']).toString();
            return key;
        }
    };

};