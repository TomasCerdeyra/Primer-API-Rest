const register = (req, res) => {
    res.json({ ok: "ok" })
}

const login = (req, res) => {
    res.json({ ok: "log" })
}



export {
    login,
    register
}