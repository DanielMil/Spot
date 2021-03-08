import { Router, Request, Response } from 'express';
import { sendResponse } from '../utils/APIUtils';
import { PassModel } from '../models/Pass';
import { UserPassesModel } from '../models/UserPass';

const router: Router = Router();

router.post(
    '/',
    async (req: Request, res: Response): Promise<any> => {
        const { price, clearanceLevel, numAvailable, expiration, acquisition } = req.body;
        const initPurchased = 0;
        try {
            const pass: PassModel = new PassModel({
                price,
                clearance_level: clearanceLevel,
                num_available: numAvailable,
                num_purchased: initPurchased,
                expiration,
                acquisition,
            });
            await pass.save();
        } catch (err) {
            console.log(err);
            sendResponse('Error creating new pass.', 500, res);
        }
        sendResponse('Successfully created new pass', 200, res);
    },
);

router.post(
    '/purchase',
    async (req: Request, res: Response): Promise<any> => {
        const { userId, passId } = req.body;
        try {
            if ((await UserPassesModel.findAll({ where: { user_id: userId, pass_id: passId } })).length !== 0) {
                sendResponse('User already purchased this pass.', 400, res);
                return;
            }
            const passData: PassModel | null = await PassModel.findByPk(passId);
            if (passData) {
                const numAvailable = passData.num_available - 1;
                const numPurchased = passData.num_purchased + 1;
                PassModel.update(
                    { num_available: numAvailable, num_purchased: numPurchased },
                    { where: { id: passId } },
                );
            }

            const userPass: UserPassesModel = new UserPassesModel({
                user_id: userId,
                pass_id: passId,
            });
            await userPass.save();
        } catch (err) {
            console.log(err);
            sendResponse('Error creating new user pass.', 500, res);
        }
        sendResponse('Successfully created new user pass', 200, res);
    },
);

router.get(
    '/:userId',
    async (req: Request, res: Response): Promise<any> => {
        const id = req.params.userId;
        const returnObj = [];
        try {
            const userPasses: any = await UserPassesModel.findAll({ where: { user_id: id } });
            let i = 0;
            for (const pass of userPasses) {
                returnObj[i] = await PassModel.findByPk(pass.dataValues.pass_id);
                i++;
            }
        } catch (err) {
            console.log(err);
            sendResponse('Error getting passes.', 500, res);
        }
        sendResponse(returnObj, 200, res);
    },
);

router.put(
    '/',
    async (req: Request, res: Response): Promise<any> => {
        const { price, clearanceLevel, numAvailable, expiration, acquisition, passId } = req.body;
        try {
            await PassModel.update(
                { price, clearance_level: clearanceLevel, num_available: numAvailable, expiration, acquisition },
                { where: { id: passId } },
            );
        } catch (err) {
            console.log(err);
            sendResponse('Error updating pass.', 500, res);
        }
        sendResponse('Successfully updated pass.', 200, res);
    },
);

export const passRouter: Router = router;
