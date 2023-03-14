import { Router } from "express";
import { redirectLink } from "../controllers/redirectController.js";

const redirectRouter = Router()

redirectRouter.get('/:nanoid', redirectLink)


export default redirectRouter