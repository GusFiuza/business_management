const conexao = require('../infraestrutura/conexao')

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