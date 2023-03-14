import { Router } from "express";
import { createLink, getLink, getLinks, removeLink, updateLink } from "../controllers/linkController.js";
import { requireToken } from "../middlewares/requireToken.js";
import { bodyLinkValidator, paramsLinkValidator } from "../middlewares/validationManager.js";
const linkRouter = Router()

linkRouter.get('/', requireToken, getLinks)

linkRouter.get('/:nanoid', getLink)

linkRouter.post('/', requireToken, bodyLinkValidator, createLink)
//El patch es para actualizar o modificar como el put pero se usa cuando quiero modificar solo una cosa de un objeto y no el objeto entero
linkRouter.patch('/:id', requireToken, paramsLinkValidator, bodyLinkValidator, updateLink)

linkRouter.delete('/:id', requireToken, paramsLinkValidator, removeLink)


export default linkRouter