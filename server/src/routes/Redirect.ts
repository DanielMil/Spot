import { Router, Request, Response } from 'express';
import { sendResponse } from '../utils/APIUtils';
import { getToken } from '../utils/APIUtils';

const router: Router = Router();

router.get('/loginSuccess', (req: Request, res: Response): void => {
    const token: string = getToken(req.user as Express.User);
    const info = {
        info: 'Successfully logged in.',
        token: token,
    };
    sendResponse(info, 200, res);
});

router.get('/missingFieldError', (req: Request, res: Response): void => {
    sendResponse('Missing required field.', 400, res);
});

router.get('/invalidSession', (req: Request, res: Response): void => {
    sendResponse('There is no user in session.', 401, res);
});

router.get('/loginFailure', (req: Request, res: Response): void => {
    sendResponse('Invalid credentials. There was an issue logging in to your account.', 400, res);
});

router.get('/forgotPasswordTokenError', (req: Request, res: Response): void => {
    sendResponse('Invalid or expired password reset token.', 403, res);
});

router.get('/forgotPasswordEmailError', (req: Request, res: Response): void => {
    sendResponse('Invalid email.', 400, res);
});

router.get('/emailResultsError', (req: Request, res: Response): void => {
    sendResponse('Invalid email or missing field.', 400, res);
});

router.get('/invalidModeError', (req: Request, res: Response): void => {
    sendResponse('Cannot perform this action for the current environment configuration.', 400, res);
});

router.get('/invalidEmailPattern', (req: Request, res: Response): void => {
    sendResponse('Invalid email pattern.', 400, res);
});

export const redirectRouter: Router = router;
