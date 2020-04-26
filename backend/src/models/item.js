const conexao = require('../infraestrutura/conexao')

class item {
    adiciona(item, res) {
        const sql = 'INSERT INTO item (id_pedido, id_peca, quantidade_item, valor_item) VALUES (?, ?, ?, ?)'

        conexao.all(sql, Object.values(item), (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(resultado)
            }
        })  
    }    
    
    buscaPorId(id, res) {
        const sql = `SELECT * FROM item WHERE id_pedido=${id}`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    lista(res) {
        const sql = 'SELECT * FROM item;'

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        });
    }

    exclui(id, res) {
        const sql = `DELETE FROM item WHERE id_pedido=${id}`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new item