import { Strategy } from 'passport-local';
import { userInit, UserModel } from '../models/User';
import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import { NextFunction } from 'connect';
import { Strategy as jwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import { sendResponse } from './APIUtils';
import { sequelize } from '../index';

export function configurePassport(passport: passport.PassportStatic): void {
    passport.use(
        new Strategy({ usernameField: 'email' }, async (email: string, password: string, done) => {
            try {
                const user: Express.User = (await UserModel.findOne({ where: { email } })) as Express.User;
                if (!user) return done(null, false, { message: 'Cannot find user.' });
                const isMatch: boolean = await bcrypt.compare(password, user.password);
                if (isMatch) return done(null, user);
                else done(null, false, { message: 'Passwords do not match!' });
            } catch (err) {
                console.log(err);
            }
        }),
    );

    passport.use(
        new jwtStrategy(
            {
                jwtFromRequest: ExtractJwt.fromHeader('authorization'),
                secretOrKey: process.env.JWT_SECRET,
            },
            async (payload, done) => {
                try {
                    const user: Express.User = (await UserModel.findByPk(payload.sub)) as Express.User;
                    done(null, user);
                } catch (err) {
                    console.log(err);
                    done(err, false);
                }
            },
        ),
    );

    passport.serializeUser((user: Express.User, done): void => {
        done(null, user.id);
    });

    passport.deserializeUser(
        async (id: string, done): Promise<Express.User> => {
            let user: Express.User;
            try {
                user = (await UserModel.findByPk(id)) as Express.User;
                done(null, user);
            } catch (err) {
                console.log(err);
                return Promise.reject(err);
            }
            return Promise.resolve(user);
        },
    );
}

export function ensureAuthenticated(req: Request, res: Response, next: NextFunction): void {
    if (!req.isAuthenticated()) {
        res.redirect('/redirect/invalidSession');
    } else if (!req.headers.authorization) {
        sendResponse('You must provide a valid jwt to access this route.', 401, res);
    } else {
        passport.authenticate('jwt', { session: false }, (err, user, info) => {
            if (user && (!err || !info)) return next();
            sendResponse(info, 401, res);
        })(req, res, next);
    }
}

export const initializeTables = async (): Promise<any> => {
    try {
        await sequelize.authenticate();
        await userInit();
        await UserModel.sync();
    } catch (err) {
        console.log(err);
    }
};
