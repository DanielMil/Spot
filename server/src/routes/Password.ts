import { Router, Request, Response } from 'express';
import { UserModel } from '../models/User';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { MailObject, MailResponseObject } from '../models/MailInterfaces';
import { sendResponse, getHashedPassword } from '../utils/APIUtils';
import { Op } from 'sequelize';
import Mail from 'nodemailer/lib/mailer';

const router: Router = Router();

router.post(
    '/forgotPassword',
    async (req: Request, res: Response): Promise<any> => {
        try {
            const buffer: Buffer = await crypto.randomBytes(16);
            const token: string = buffer.toString('hex');
            const user: Express.User = (await UserModel.findOne({ where: { email: req.body.email } })) as Express.User;
            if (!user) return res.redirect('/redirect/forgotPasswordEmailError');
            user.resetPasswordToken = token;
            user.resetPasswordExpiration = (new Date().getTime() +
                new Date().getTimezoneOffset() * 60000 +
                360000) as any;
            await user.save();
            const forgotPasswordURL = `http://${req.connection.remoteAddress}/auth/password/resetPassword/${token}`;
            const transporter: Mail = createTransport();
            const mailOptions: MailObject = createMailObject(user, forgotPasswordURL);
            await transporter.sendMail(mailOptions);
            const info: MailResponseObject = getResponseObject(forgotPasswordURL, token);
            sendResponse(info, 200, res);
        } catch (err) {
            console.log(err);
            res.redirect('/redirect/forgotPasswordEmailError');
        }
    },
);

router.post(
    '/resetPassword/:token',
    async (req: Request, res: Response): Promise<any> => {
        try {
            const user: Express.User = (await UserModel.findOne({
                where: { resetPasswordToken: req.params.token, resetPasswordExpiration: { [Op.gt]: Date.now() } },
            })) as Express.User;
            if (!user) return res.redirect('/redirect/forgotPasswordTokenError');
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpiration = undefined;
            const password: string = await getHashedPassword(req.body.password);
            user.password = password;
            await user.save();
            sendResponse(`Password was successfully updated.`, 200, res);
        } catch (err) {
            console.log(err);
            res.redirect('/redirect/forgotPasswordTokenError');
        }
    },
);

const createMailObject = (user: Express.User, forgotPasswordURL: string): MailObject => {
    return {
        from: process.env.EMAIL_ADDRESS,
        to: user.email,
        subject: 'Link To Reset Password',
        text: `You are receiving this email because you or someone else requested a password 
            change for an account associated with this email. If this action was not performed by you, 
            please ignore this message, otherwise follow the link to reset your password.\n\n 
            ${forgotPasswordURL}`,
    };
};

const createTransport = (): Mail => {
    return nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_ADDRESS,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
};

const getResponseObject = (forgotPasswordURL: string, token: string): MailResponseObject => {
    return {
        message:
            "You can use the associated redirect url to compose your endpoint for the 'Reset Password' screen on the client.",
        redirectURL: forgotPasswordURL,
        resetPasswordToken: token,
    };
};

export const passwordRouter: Router = router;
