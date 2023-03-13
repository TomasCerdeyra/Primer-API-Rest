import { Router } from "express";
import { createLink, getLink, getLinks, removeLink } from "../controllers/linkController.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validationManager.js";
const linkRouter = Router()

linkRouter.get('/', requireToken, getLinks)

linkRouter.get('/:id', requireToken, getLink)

linkRouter.post('/', requireToken, bodyLinkValidator, createLink)

linkRouter.delete('/:id', requireToken, paramsLinkValidator, removeLink)


export default linkRouter