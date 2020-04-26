const Pedido = require('../models/pedido')

module.exports = app => {
    app.post('/pedido', (req, res) => {
        const pedido = req.body
        Pedido.adiciona(pedido, res)
    }) 

    app.get('/pedido/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Pedido.buscaPorId(id, res)
    })

    app.get('/pedido/lista/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Pedido.lista(id, res)
    })

    app.put('/pedido/:id', (req, res) => {
        const id = parseInt(req.params.id)
        const pedido = req.body
        Pedido.altera(id, pedido, res)
    })

    app.delete('/pedido/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Pedido.exclui(id, res)
    })
}