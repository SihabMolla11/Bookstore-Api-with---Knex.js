import { Router } from 'express';
import { getUserProfileController, updateUserController } from '../controllers/user.controller';

const userRoute = Router();

userRoute.get('/get-profile', getUserProfileController);
userRoute.put('/update-profile', updateUserController);

export default userRoute;
