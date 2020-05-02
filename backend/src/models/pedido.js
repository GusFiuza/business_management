const conexao = require('../infraestrutura/conexao')

conexao.all(`CREATE TABLE IF NOT EXISTS pedido (
                id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
                id_parceiro INTEGER NOT NULL,
                id_tipo_pedido INTEGER NOT NULL,
                id_forma_pagamento REAL NOT NULL,
                data_pedido TEXT NOT NULL,
                valor_pago REAL NOT NULL,
                FOREIGN KEY(id_parceiro) REFERENCES parceiro(id_parceiro));`, (err) => {
    if (err) {
        console.log("Erro na criação da tabela pedido: " + err)
    } else {
        conexao.all(`SELECT count(*) as quantidade FROM pedido;`, (err, resultado) => {
            if (err) {
                console.log("Erro ao verificar dados de teste: " + err)
            } else {
                console.log('Avaliando existência de pedidos')
                if (resultado[0].quantidade == 0) {
                    console.log('Cadastrando pedidos para teste')
                    conexao.all(`INSERT INTO pedido
                                    (id_parceiro, id_tipo_pedido, id_forma_pagamento, data_pedido, valor_pago )
                                VALUES
                                    (2, 2, 1, '1900-01-01', 81);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de compra para testes: " + err)
                        }
                    })
                    conexao.all(`INSERT INTO pedido
                                    (id_parceiro, id_tipo_pedido, id_forma_pagamento, data_pedido, valor_pago )
                                VALUES
                                    (1, 1, 2, '1900-01-01', 63.4);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de venda para testes: " + err)
                        }
                    })
                }
            }
        })
    }
})

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