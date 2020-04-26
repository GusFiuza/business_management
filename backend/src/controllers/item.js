const Item = require('../models/item')

module.exports = app => {
    app.post('/item', (req, res) => {
        const item = req.body
        Item.adiciona(item, res)
    }) 

    app.get('/item/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Item.buscaPorId(id, res)
    })

    app.get('/item', (req, res) => {
        Item.lista(res)
    })

    app.delete('/item/:id', (req, res) => {
        const id = parseInt(req.params.id)
        Item.exclui(id, res)
    })
}