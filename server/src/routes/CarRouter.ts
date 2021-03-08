import { Router, Request, Response } from 'express';
import { sendResponse } from '../utils/APIUtils';
import { CarModel } from '../models/Car';

const router: Router = Router();

router.post('/', async (req: Request, res: Response): Promise<any> => {
    const { make, model, plateNumber, userId } = req.body;
    try {
        const car: CarModel = new CarModel({
            make, model, plate_number: plateNumber, user_id: userId
        });
        await car.save();
    } catch (err) {
        console.log(err);
        sendResponse('Error creating new car.', 500, res);
    }
    sendResponse('Successfully created new car', 200, res);
});

router.get('/:userId', async (req: Request, res: Response): Promise<any> => {
    const id = req.params.userId;
    let toReturn = {};
    try {
        toReturn = await CarModel.findAll({ where: { user_id: id } });
    } catch (err) {
        console.log(err);
        sendResponse('Error getting cars.', 500, res);
    }
    sendResponse(toReturn, 200, res);
});

// Updates a car's make, model or plate number by plate number.
router.put('/', async (req: Request, res: Response): Promise<any> => {
    const { make, model, plateNumber } = req.body;
    try {
        await CarModel.update(
            { make: make, model: model, plate_number: plateNumber },  
            { where: { plate_number: plateNumber } }
            );
    } catch (err) {
        console.log(err);
        sendResponse('Error updating car.', 500, res);
    }
    sendResponse('Successfully updated car.', 200, res);
});

router.delete('/:id', async (req: Request, res: Response): Promise<any> => {
    try {
        await CarModel.destroy({ where: { id: req.params.id } });
        sendResponse('Successfully deleted car.', 200, res);
    } catch (err) {
        console.log(err);
        sendResponse(err, 500, res);
    }
});

export const carRouter: Router = router;
