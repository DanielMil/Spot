/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserModel } from './User';

// Fix Request object scoping issues to include User
declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        // eslint-disable-next-line @typescript-eslint/no-empty-interface
        interface User extends UserModel {}
    }
}

export enum status {
    Success = 'Success',
    Failure = 'Failure',
}

export interface InfoObject {
    token: string;
    info: string;
}
