import { Router } from "express";
import { registrationController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/register-author', registrationController);


export default authRouter