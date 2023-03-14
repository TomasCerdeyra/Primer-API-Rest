import { nanoid } from "nanoid";
import ModelLink from "../models/Link.js";

const getLinks = async (req, res) => {
    try {
        const links = await ModelLink.find({ uid: req.uid })
        res.json({ links })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error del serevidor' })
    }
}

const getLink = async (req, res) => {
    try {
        const { nanoid } = req.params
        const link = await ModelLink.findOne({ nanoid })

        //validaciones
        if (!link) return res.status(404).json({ error: 'No existe el link' })

        res.json({ longLink: link.longLink })
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(403).json({ error: 'Formato Id incorrecto' })
        }
        return res.status(500).json({ error: 'Error del serevidor' })
    }
}

const removeLink = async (req, res) => {
    try {
        const { id } = req.params
        const link = await ModelLink.findById(id)

        if (!link) return res.status(404).json({ error: 'No existe el link' })

        //Con equals me fijo que el uid mandado sea el mismo que el del usuario conectado
        if (!link.uid.equals(req.uid)) return res.status(404).json({ error: 'No le pertenece ese link' })

        await link.remove()

        res.json({ link })
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(403).json({ error: 'Formato Id incorrecto' })
        }
        return res.status(500).json({ error: 'Error del serevidor' })
    }
}

const createLink = async (req, res) => {
    let { longLink } = req.body
    try {
        if (!longLink.startsWith('https://')) {
            longLink = 'https://' + longLink
        }
        console.log('linea +' + longLink);
        const link = new ModelLink({ longLink, nanoLink: nanoid(6), uid: req.uid })
        const newLink = await link.save()
        res.status(201).json({ newLink })
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Error del serevidor' })
    }
}

const updateLink = async (req, res) => {
    try {
        const { id } = req.params
        const { longLink } = req.body

        const link = await ModelLink.findById(id)

        //validaciones
        if (!longLink.startsWith('https://')) {
            longLink = 'https://' + longLink
        }
        if (!link) return res.status(404).json({ error: 'No existe el link' })
        if (!link.uid.equals(req.uid)) return res.status(404).json({ error: 'No le pertenece ese link' })

        //Atualizo el link
        link.longLink = longLink
        await link.save()

        res.json({ link })
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(403).json({ error: 'Formato Id incorrecto' })
        }
        return res.status(500).json({ error: 'Error del serevidor' })
    }
}

export {
    getLinks,
    createLink,
    getLink,
    removeLink,
    updateLink
}