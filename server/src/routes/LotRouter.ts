import { Router, Request, Response } from 'express';
import passport from 'passport';
import { NextFunction } from 'connect';
import { UserModel } from '../models/User';
import { ensureAuthenticated } from '../utils/passport';
import { sendResponse, getHashedPassword, getToken, validateEmailPattern, getInfoObject } from '../utils/APIUtils';
import { InfoObject } from '../models/Interfaces';

const router: Router = Router();



export const lotRouter: Router = router;
