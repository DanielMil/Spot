import { Router, Request, Response } from 'express';
import { ParkingLotModel } from '../models/ParkingLot';
import { sendResponse } from '../utils/APIUtils';

const router: Router = Router();

router.post(
    '/',
    async (req: Request, res: Response): Promise<any> => {
        const { ownerId, maxCapacity, rate, address, allowablePassLevel, passId } = req.body;
        try {
            const parkingLot: ParkingLotModel = new ParkingLotModel({
                owner_id: ownerId,
                max_capacity: maxCapacity,
                curr_capacity: maxCapacity,
                rate: rate,
                address: address,
                allowable_pass_level: allowablePassLevel,
                pass_id: passId,
            });
            await parkingLot.save();
        } catch (err) {
            console.log(err);
            sendResponse('Error creating new parking lot.', 500, res);
        }
        sendResponse('Successfully created new parking lot.', 200, res);
    },
);

router.get(
    '/get/:id',
    async (req: Request, res: Response): Promise<any> => {
        const id = req.params.id;
        let toReturn: ParkingLotModel | null = null;
        try {
            toReturn = await ParkingLotModel.findOne({ where: { id: id } });
        } catch (err) {
            console.log(err);
            sendResponse('Error getting cars.', 500, res);
        }
        sendResponse(toReturn, 200, res);
    },
);

router.get(
    '/owner/:ownerId',
    async (req: Request, res: Response): Promise<any> => {
        const id = req.params.ownerId;
        let toReturn = {};
        try {
            toReturn = await ParkingLotModel.findAll({ where: { owner_id: id } });
        } catch (err) {
            console.log(err);
            sendResponse('Error getting cars.', 500, res);
        }
        sendResponse(toReturn, 200, res);
    },
);

router.get(
    '/all',
    async (req: Request, res: Response): Promise<any> => {
        let toReturn = {};
        try {
            toReturn = await ParkingLotModel.findAll();
        } catch (err) {
            console.log(err);
            sendResponse('Error getting parking lots.', 500, res);
        }
        sendResponse(toReturn, 200, res);
    },
);


// Updates a car's make, model or plate number by plate number.
router.put(
    '/',
    async (req: Request, res: Response): Promise<any> => {
        const { ownerId, maxCapacity, rate, address, allowablePassLevel, passId, lotId } = req.body;
        try {
            await ParkingLotModel.update(
                { 
                    owner_id: ownerId,
                    max_capacity: maxCapacity,
                    curr_capacity: maxCapacity,
                    rate: rate,
                    address: address,
                    allowable_pass_level: allowablePassLevel,
                    pass_id: passId, 
                },
                { where: { id: lotId } },
            );
        } catch (err) {
            console.log(err);
            sendResponse('Error updating parking lot.', 500, res);
        }
        sendResponse('Successfully updated parking lot.', 200, res);
    },
);

export const lotRouter: Router = router;
