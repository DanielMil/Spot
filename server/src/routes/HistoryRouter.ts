import { Router, Request, Response } from 'express';
import { UserHistoryModel } from '../models/UserHistory';
import { sendResponse } from '../utils/APIUtils';

const router: Router = Router();

router.get('/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const resObj = await UserHistoryModel.findAll({ where: { user_id: id } });
        sendResponse(resObj, 200, res);
    } catch (err) {
        console.log(err);
        sendResponse(err, 500, res);
    }
});

export const historyRouter: Router = router;
