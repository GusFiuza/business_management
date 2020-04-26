const Parceiro = require('../models/parceiro')

module.exports = app => {
    app.post('/parceiro', (req, res) => {
        const parceiro = req.body
        Parceiro.adiciona(parceiro, res)
    }) 

    app.get('/parceiro/lista/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Parceiro.lista(id, res)
    })

    app.get('/parceiro/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Parceiro.buscaPorId(id, res)
    })

    app.put('/parceiro/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const parceiro = req.body
        Parceiro.altera(id, parceiro, res)
    })

    app.delete('/parceiro/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Parceiro.exclui(id, res)
    })
}