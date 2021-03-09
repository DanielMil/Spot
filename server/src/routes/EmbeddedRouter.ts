import { Router, Request, Response } from 'express';
import { CarModel } from '../models/Car';
import { ParkingLotModel } from '../models/ParkingLot';
import { UserHistoryModel } from '../models/UserHistory';
import { UserPassesModel } from '../models/UserPass';
import { sendResponse } from '../utils/APIUtils';

const router: Router = Router();

router.post('/enter', async (req: Request, res: Response) => {
    const { lotId } = req.body;
    let { plateNumber } = req.body;
    plateNumber = plateNumber.replace(/\s/g, '');
    const returnObj: any = {};
    try {
        // Check user having a pass
        const lot = await ParkingLotModel.findOne({ where: { id: lotId } });
        const car = await CarModel.findOne({ where: { plate_number: plateNumber } });
        console.log(car);
        const userId = car?.user_id;
        if (!car) sendResponse('Invalid plate.', 404, res);
        if (userId !== null && lot !== null) {
            const count = await UserPassesModel.count({ where: { user_id: userId, pass_id: lotId } });
            if (count === 0) {
                // No pass
                returnObj['access_granted'] = false;
                returnObj['rate'] = lot.rate;
            } else {
                returnObj['access_granted'] = true;
                returnObj['rate'] = 0.0;
            }
        }
        // Update history
        const now = Date.now();
        await UserHistoryModel.create({
            lot_id: lotId,
            user_id: userId,
            timestamp_in: now,
            timestamp_out: now,
        });
        // Update lot info
        let capacity = lot?.curr_capacity;
        if (capacity !== undefined) capacity -= 1;
        await ParkingLotModel.update({ curr_capacity: capacity }, { where: { id: lotId } });
    } catch (err) {
        console.log(err);
        sendResponse(err, 500, res);
    }
    sendResponse(returnObj, 200, res);
});

router.post('/exit', async (req: Request, res: Response) => {
    const { lotId } = req.body;
    let { plateNumber } = req.body;
    plateNumber = plateNumber.replace(/\s/g, '');
    try {
        const lot = await ParkingLotModel.findOne({ where: { id: lotId } });
        let capacity = lot?.curr_capacity;
        if (capacity !== undefined) capacity += 1;
        await ParkingLotModel.update({ curr_capacity: capacity }, { where: { id: lotId } });
        const car = await CarModel.findOne({ where: { plate_number: plateNumber } });
        const userId = car?.user_id;
        const now = Date.now();
        await UserHistoryModel.update({ timestamp_out: now }, { where: { user_id: userId } });
    } catch (err) {
        console.log(err);
        sendResponse(err, 500, res);
    }
    sendResponse('Successfully updated data.', 200, res);
});

export const embeddedRouter: Router = router;
