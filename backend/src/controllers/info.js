const Info = require('../models/info')

module.exports = app => {
    app.get('/info/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Info.consulta(id, res)
    })
}