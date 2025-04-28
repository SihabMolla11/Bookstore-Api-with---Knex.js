import { Router } from "express";
import { loginAuthor, registrationController } from "../controllers/auth.controller";

const authRouter = Router();

authRouter.post('/register', registrationController);
authRouter.post('/login', loginAuthor);


export default authRouter