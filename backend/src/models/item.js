const conexao = require('../infraestrutura/conexao')

conexao.all(`CREATE TABLE IF NOT EXISTS item (
                id_pedido INTEGER NOT NULL,
                id_peca INTEGER NOT NULL,
                quantidade_item INTEGER NOT NULL,
                valor_item REAL NOT NULL,
                FOREIGN KEY(id_pedido) REFERENCES pedido(id_pedido),
                FOREIGN KEY(id_peca) REFERENCES peca(id_peca));`, (err) => {
    if (err) {
        console.log("Erro na criação da tabela item: " + err)
    } else {
        conexao.all(`SELECT count(*) as quantidade FROM item;`, (err, resultado) => {
            if (err) {
                console.log("Erro ao verificar dados de teste: " + err)
            } else {
                console.log('Avaliando existência de itens')
                if (resultado[0].quantidade == 0) {
                    console.log('Cadastrando itens para teste')
                    conexao.all(`INSERT INTO item
                                    (id_pedido, id_peca, quantidade_item, valor_item)
                                VALUES
                                    (1, 1, 3, 10.2);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de compra para testes: " + err)
                        }
                    })
                    conexao.all(`INSERT INTO item
                                    (id_pedido, id_peca, quantidade_item, valor_item)
                                VALUES
                                    (1, 2, 3, 11.3);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de compra para testes: " + err)
                        }
                    })
                    conexao.all(`INSERT INTO item
                                    (id_pedido, id_peca, quantidade_item, valor_item)
                                VALUES
                                    (1, 3, 3, 5.5);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de compra para testes: " + err)
                        }
                    })
                    conexao.all(`INSERT INTO item
                                    (id_pedido, id_peca, quantidade_item, valor_item)
                                VALUES
                                    (2, 1, 2, 40.8);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de compra para testes: " + err)
                        }
                    })
                    conexao.all(`INSERT INTO item
                                    (id_pedido, id_peca, quantidade_item, valor_item)
                                VALUES
                                    (2, 2, 1, 22.6);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de compra para testes: " + err)
                        }
                    })
                }
            }
        })

    }
})

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