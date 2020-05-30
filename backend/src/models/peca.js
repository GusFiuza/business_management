const conexao = require('../infraestrutura/conexao')

conexao.all(`CREATE TABLE IF NOT EXISTS peca (
                id_peca INTEGER PRIMARY KEY, 
                tipo_peca INTEGER NOT NULL,
                descricao_peca TEXT NOT NULL,
                quantidade_peca INTEGER NOT NULL,
                valor_compra_peca REAL NOT NULL,
                valor_venda_peca REAL NOT NULL);`, (err) => {
    if (err) {
    console.log("Erro na criação da tabela peca: " + err)
    } else {
        conexao.all(`SELECT count(*) as quantidade FROM peca;`, (err, resultado) => {
            if (err) {
                console.log("Erro ao verificar dados de teste: " + err)
            } else {
                console.log('Avaliando existência de peças')
                if (resultado[0].quantidade == 0) {
                    console.log('Cadastrando peças para teste')
                    conexao.all(`INSERT INTO peca
                                    (id_peca, tipo_peca, descricao_peca, quantidade_peca, valor_compra_peca, valor_venda_peca )
                                VALUES
                                    (1, 1, 'Brinco azul', 1, 10.20, 20.4);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de peça para testes: " + err)
                        }
                    })
                    conexao.all(`INSERT INTO peca
                                    (id_peca, tipo_peca, descricao_peca, quantidade_peca, valor_compra_peca, valor_venda_peca )
                                VALUES
                                    (2, 2, 'Colar verde', 2, 11.30, 22.6);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de peça para testes: " + err)
                        }
                    })
                    conexao.all(`INSERT INTO peca
                                    (id_peca, tipo_peca, descricao_peca, quantidade_peca, valor_compra_peca, valor_venda_peca )
                                VALUES
                                    (3, 4, 'Pulseira amarela', 3, 5.50, 11);`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de peça para testes: " + err)
                        }
                    })
                }
            }
        })
    }
})

class peca {
    adiciona(peca, res) {
        const sql = 'INSERT INTO peca (id_peca, tipo_peca, descricao_peca, quantidade_peca, valor_compra_peca, valor_venda_peca) VALUES (?, ?, ?, ?, ?, ?)'

        conexao.all(sql, Object.values(peca), (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(resultado)
            }
        })  
    }    
    
    buscaPorId(id, res) {
        const sql = `SELECT * FROM peca WHERE id_peca=${id}`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado[0])
            }
        })
    }

    lista(res) {
        const sql = 'SELECT * FROM peca WHERE quantidade_peca > 0;'

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        });
    }

    altera(id, peca, res) {
        const sql = `UPDATE peca SET tipo_peca = ?, descricao_peca = ?, quantidade_peca = ?, valor_compra_peca = ?, valor_venda_peca = ? WHERE id_peca = ${id}`

        conexao.all(sql, Object.values(peca), (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    exclui(id, res) {
        const sql = `DELETE FROM peca WHERE id_peca=${id}`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new peca