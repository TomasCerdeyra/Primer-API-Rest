import jwt from "jsonwebtoken";

export const requireToken = (req, res, next) => {
    try {
        //con el signo de regunta despues de headers podemos decir que si lo que viene despues,
        //que seria el valor de authorization, no tiene nada o no existe que se guarde undefine
        //en la constante creada(token) para que no salte un erro(en ocaciones salta y en otras no)
        //entonces con esto podemos manejar nosotros el error  
        let token = req.headers?.authorization
        if (!token) throw new Error('No Bearer')

        token = token.split(" ")[1]
        //verificamos que el token sea autentico, y esto nos va a devolver el
        //payload que es la informacion nuestra que enviamos por el token, en este
        //caso enviamos el uid desde el authController
        const { uid } = jwt.verify(token, process.env.JWT_PASS)

        //Le agregamos a req la propidedad del Uid para poder usarla una vez se haya verificado al usuario
        req.uid = uid
        console.log(req.headers);
        next()
    } catch (error) {
        console.log(error);

        //Si falla la verificacion del token manda estos errores, menos el de "No Bearer" que lo hicimos nosotros arriba
        const TokenVerficationErrors = {
            "invalid signature": "La furma de JWT no es valida",
            "jwt expired": "JWT expírado",
            "invalid token": "Token no valido",
            "jwt malformed": "JWT formato no valido",
            "No Bearer": "Utiliza formato Bearer"
        }
        return res.status(401).json({ error: TokenVerficationErrors[error.message] })
    }
}