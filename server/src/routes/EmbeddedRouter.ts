import { Router, Request, Response } from 'express';
import { CarModel } from '../models/Car';
import { ParkingLotModel } from '../models/ParkingLot';
import { UserModel } from '../models/User';
import { UserHistoryModel } from '../models/UserHistory';
import { UserPassesModel } from '../models/UserPass';
import { sendResponse } from '../utils/APIUtils';

const router: Router = Router();

router.post('/enter', async (req: Request, res: Response) => {
    const { lotId } = req.body;
    let { plateNumber } = req.body;
    plateNumber = plateNumber.replace(/\s/g, '');
    const returnObj: any = {};
    let checkPass = 0;
    try {
        // Check user having a pass
        const lot = await ParkingLotModel.findOne({ where: { id: lotId } });
        const car = await CarModel.findOne({ where: { plate_number: plateNumber } });
        const userId = car?.user_id;
        const now = Date.now();
        if (lot) checkPass = lot.pass_id;
        if (userId != null) {
            const count = await UserPassesModel.count({ where: { user_id: userId, pass_id: checkPass } });
            if (count === 0 && lot !== null) {
                // No pass
                returnObj['access_granted'] = false;
                returnObj['rate'] = lot.rate;
                await UserHistoryModel.create({
                    lot_id: lotId,
                    user_id: userId,
                    timestamp_in: now,
                    timestamp_out: now,
                    hasPass: false,
                    plate_number: plateNumber,
                    has_left: false,
                });
            } else if (count > 0 && lot !== null) {
                returnObj['access_granted'] = true;
                returnObj['rate'] = 0.0;
                await UserHistoryModel.create({
                    lot_id: lotId,
                    user_id: userId,
                    timestamp_in: now,
                    timestamp_out: now,
                    hasPass: true,
                    plate_number: plateNumber,
                    has_left: false,
                });
            }
        } else {
            if (lot !== null) {
                returnObj['access_granted'] = false;
                returnObj['rate'] = lot.rate;
            }
            await UserHistoryModel.create({
                lot_id: lotId,
                user_id: null,
                timestamp_in: now,
                timestamp_out: now,
                hasPass: false,
                plate_number: plateNumber,
                has_left: false,
            });
        }        
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
    const now = Date.now();
    plateNumber = plateNumber.replace(/\s/g, '');
    const MILLI_TO_HOUR = 3600000;
    let cost = 0;
    let history = null;
    try {
        const lot = await ParkingLotModel.findOne({ where: { id: lotId } });
        let capacity = lot?.curr_capacity;
        if (capacity !== undefined) capacity += 1;
        await ParkingLotModel.update({ curr_capacity: capacity }, { where: { id: lotId } });
        const car = await CarModel.findOne({ where: { plate_number: plateNumber } });
        if (car) {
            const userId = car?.user_id;
            history = await UserHistoryModel.findOne({ where: { user_id: userId, has_left: false } });
            if (history != null && lot != null) {
                cost = (((now - history.timestamp_in.getTime()) / MILLI_TO_HOUR)) + 1 * lot.rate;
            }
            await UserHistoryModel.update({ timestamp_out: now, cost: cost, has_left: true }, { where: { user_id: userId , has_left: false } });
        } else {
            history = await UserHistoryModel.findOne({ where: { plate_number: plateNumber, has_left: false } });
            if (history != null && lot != null) {
                cost = (((now - history.timestamp_in.getTime()) / MILLI_TO_HOUR)) + 1 * lot.rate;
            }
            await UserHistoryModel.update({ timestamp_out: now, cost: cost, has_left: true }, { where: { plate_number: plateNumber, has_left: false } });
        }
        if (history != null) {
            if (history.hasPass === true) {
                cost = 0;
            }
        }
    } catch (err) {
        console.log(err);
        sendResponse(err, 500, res);
    }
    sendResponse({ cost }, 200, res);
});

export const embeddedRouter: Router = router;
