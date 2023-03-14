import ModelLink from "../models/Link.js"

//Ejmplo para hacer redireccionamientos en backendn mayormente se hace en front
const redirectLink = async (req, res) => {
    try {
        const { nanoid } = req.params
        const link = await ModelLink.findOne({ nanoid })

        //validaciones
        if (!link) return res.status(404).json({ error: 'No existe el link' })

        res.redirect(link.longLink)
    } catch (error) {
        console.log(error);
        if (error.kind === 'ObjectId') {
            return res.status(403).json({ error: 'Formato Id incorrecto' })
        }
        return res.status(500).json({ error: 'Error del serevidor' })
    }
}

export {
    redirectLink
}