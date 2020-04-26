const Peca = require('../models/peca')

module.exports = app => {
    app.post('/peca', (req, res) => {
        const peca = req.body
        Peca.adiciona(peca, res)
    }) 

    app.get('/peca/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Peca.buscaPorId(id, res)
    })

    app.get('/peca', (req, res) => {
        Peca.lista(res)
    })

    app.put('/peca/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const peca = req.body
        Peca.altera(id, peca, res)
    })

    app.delete('/peca/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Peca.exclui(id, res)
    })
}