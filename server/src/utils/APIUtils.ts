import { Response } from 'express';
import { status, InfoObject } from '../models/Interfaces';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { MailResponseObject } from '../models/MailInterfaces';

export function sendResponse(
    info: string | InfoObject | Express.User | MailResponseObject | number,
    statusCode: number,
    res: Response,
): void {
    res.status(statusCode).json({
        info,
        status: statusCode === 200 || statusCode === 201 ? status.Success : status.Failure,
    });
}

export async function getHashedPassword(password: string): Promise<string> {
    const saltRounds = 10;
    try {
        const salt: string = await bcrypt.genSalt(saltRounds);
        return await bcrypt.hash(password, salt);
    } catch (err) {
        console.log(err);
        return Promise.reject(err);
    }
}

export const getToken = (user: Express.User): string => {
    const secret: string = process.env.JWT_SECRET as string;
    return jwt.sign(
        {
            iss: 'auth-server',
            sub: user.id,
            iat: new Date().getTime(),
            exp: new Date().setDate(new Date().getDate() + 1),
        },
        secret,
    );
};

export const validateEmailPattern = (toCheck: string): boolean => {
    // eslint-disable-next-line no-control-regex
    const expr = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return expr.test(toCheck);
};

export const getInfoObject = (token: string): InfoObject => {
    return {
        info: 'Successfully logged in.',
        token,
    };
};
