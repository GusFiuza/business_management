const conexao = require('../infraestrutura/conexao')

class pedido {
    adiciona(pedido, res) {
        const sql = 'INSERT INTO pedido (id_parceiro, id_tipo_pedido, id_forma_pagamento, data_pedido, valor_pago) VALUES (?, ?, ?, ?, ?)'

        conexao.all(sql, Object.values(pedido), (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                conexao.all("SELECT seq FROM sqlite_sequence WHERE name = 'pedido';", (erro, resultado) => {
                    if(erro) {
                        res.status(400).json(erro)
                    } else {
                        res.status(201).json(resultado[0])
                    }
                })
            }
        })  
    }    
    
    buscaPorId(id, res) {
        const sql = `SELECT * FROM pedido WHERE id_pedido=${id}`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado[0])
            }
        })
    }

    lista(id, res) {
        const sql = `SELECT * FROM pedido WHERE id_tipo_pedido=${id};`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        });
    }

    altera(id, pedido, res) {
        const sql = `UPDATE pedido SET id_parceiro = ?, id_tipo_pedido = ?, id_forma_pagamento = ?, data_pedido = ?, valor_pago = ? WHERE id_pedido = ${id}`

        conexao.all(sql, Object.values(pedido), (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    exclui(id, res) {
        const sql = `DELETE FROM pedido WHERE id_pedido=${id}`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new pedido