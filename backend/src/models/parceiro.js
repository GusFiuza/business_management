const conexao = require('../infraestrutura/conexao')

conexao.all(`CREATE TABLE IF NOT EXISTS parceiro (
                id_parceiro INTEGER PRIMARY KEY AUTOINCREMENT,
                id_tipo_parceiro INTEGER NOT NULL,
                nome_parceiro TEXT NOT NULL,
                telefone_parceiro TEXT NOT NULL,
                observacao_parceiro TEXT);`, (err) => {
    if (err) {
        console.log("Erro na criação da tabela parceiro: " + err)
    } else {
        conexao.all(`SELECT count(*) as quantidade FROM parceiro;`, (err, resultado) => {
            if (err) {
                console.log("Erro ao verificar dados de teste: " + err)
            } else {
                console.log('Avaliando existência de parceiros')
                if (resultado[0].quantidade == 0) {
                    console.log('Cadastrando parceiros para teste')
                    conexao.all(`INSERT INTO parceiro 
                                        (id_parceiro, id_tipo_parceiro, nome_parceiro, telefone_parceiro, observacao_parceiro) 
                                    VALUES 
                                        (1, 1, 'Fulano de Tal', '00123456789', 'Cliente para testes');`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de cliente para testes: " + err)
                        }
                    })
                    conexao.all(`INSERT INTO parceiro 
                                        (id_parceiro, id_tipo_parceiro, nome_parceiro, telefone_parceiro, observacao_parceiro) 
                                    VALUES 
                                        (2, 2, 'Alguma loja', '99876543210', 'Fornecedor para testes');`, (err) => {
                        if (err) {
                            console.log("Erro no cadastro de cliente para testes: " + err)
                        }
                    })
                }
            }
        })
    }
})

class parceiro {
    lista(id, res) {
        const sql = `SELECT * FROM parceiro WHERE id_tipo_parceiro=${id};`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        });
    }

    buscaPorId(id, res) {
        const sql = `SELECT * FROM parceiro WHERE id_parceiro=${id}`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado[0])
            }
        })
    }
    
    adiciona(parceiro, res) {
        const sql = 'INSERT INTO parceiro (id_tipo_parceiro, nome_parceiro, telefone_parceiro, observacao_parceiro) VALUES (?, ?, ?, ?)'

        conexao.all(sql, Object.values(parceiro), (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(201).json(resultado)
            }
        })  
    }    

    altera(id, parceiro, res) {
        const sql = `UPDATE parceiro SET id_tipo_parceiro = ?, nome_parceiro = ?, telefone_parceiro = ?, observacao_parceiro = ? WHERE id_parceiro = ${id}`

        conexao.all(sql, Object.values(parceiro), (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }

    exclui(id, res) {
        const sql = `DELETE FROM parceiro WHERE id_parceiro=${id}`

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new parceiro