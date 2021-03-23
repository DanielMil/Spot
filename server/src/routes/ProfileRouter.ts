import { Router, Request, Response } from 'express';
import passport from 'passport';
import { NextFunction } from 'connect';
import { UserModel } from '../models/User';
import { ensureAuthenticated } from '../utils/passport';
import { sendResponse, getHashedPassword, getToken, validateEmailPattern, getInfoObject } from '../utils/APIUtils';
import { InfoObject } from '../models/Interfaces';

const router: Router = Router();

router.post('/login', (req: Request, res: Response, next: NextFunction): void => {
    passport.authenticate(
        'local',
        async (err: Error, user: Express.User): Promise<any> => {
            if (err || !user) {
                console.log(err);
                return res.redirect('/redirect/loginFailure');
            }
            const token: string = getToken(user);
            const info: InfoObject = getInfoObject(token);
            req.logIn(user, (err: Error) => {
                sendResponse(info, 200, res);
                if (err) return res.redirect('/redirect/loginFailure');
            });
        },
    )(req, res, next);
});

router.post(
    '/register',
    async (req: Request, res: Response): Promise<any> => {
        const { email, password, firstName, lastName, isOwner } = req.body;
        if (!email || !password || !firstName || !lastName || isOwner === undefined)
            return res.redirect('/redirect/missingFieldError');
        if (!validateEmailPattern(email)) return res.redirect('/redirect/invalidEmailPattern');
        try {
            const hashedPassword: string = await getHashedPassword(password);
            const newUser: Express.User = new UserModel({
                email,
                password: hashedPassword,
                firstName,
                lastName,
                isOwner: isOwner,
            });
            await newUser.save();
            sendResponse('Successfully created new user.', 200, res);
        } catch (err) {
            console.log(err);
            sendResponse(err, 500, res);
        }
    },
);

router.post('/logout', ensureAuthenticated, (req: Request, res: Response): void => {
    req.logOut();
    sendResponse('Successfully logged out.', 200, res);
});

router.get('/user', ensureAuthenticated, (req: Request, res: Response): void => {
    const user: Express.User = new Object(JSON.parse(JSON.stringify(req.user))) as Express.User;
    delete user.password;
    sendResponse(user, 200, res);
});

router.put(
    '/user',
    ensureAuthenticated,
    async (req: Request, res: Response): Promise<any> => {
        let { firstName, lastName } = req.body;
        const { email } = req.body;
        let validEmail = true;
        if (!req.body || Object.keys(req.body).length === 0) return res.redirect('/redirect/missingFieldError');
        if (req.user) {
            if (email) {
                validateEmailPattern(email) ? (req.user.email = email) : (validEmail = false);
                if (!validEmail) return res.redirect('/redirect/invalidEmailPattern');
            }
            firstName ? (req.user.firstName = firstName) : (firstName = req.user.firstName);
            lastName ? (req.user.lastName = lastName) : (lastName = req.body.lastName);
        }
        try {
            if (req.user) await UserModel.update({ firstName, lastName, email }, { where: { id: req.user.id } });
            else sendResponse('No user in session.', 500, res);
            sendResponse('Successfully updated user.', 200, res);
        } catch (err) {
            console.log(err);
            sendResponse(err, 500, res);
        }
    },
);

router.delete(
    '/user',
    ensureAuthenticated,
    async (req: Request, res: Response): Promise<any> => {
        try {
            if (req.user) {
                await UserModel.destroy({ where: { id: req.user.id } });
            }
            sendResponse('Successfully deleted user.', 200, res);
        } catch (err) {
            console.log(err);
            sendResponse(err, 500, res);
        }
    },
);

export const profileRouter: Router = router;
