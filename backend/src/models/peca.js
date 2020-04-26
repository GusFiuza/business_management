const conexao = require('../infraestrutura/conexao')

class peca {
    adiciona(peca, res) {
        const sql = 'INSERT INTO peca (id_peca, tipo_peca, descricao_peca, quantidade_peca, valor_compra_peca, valor_venda_peca) VALUES (?, ?, ?, ?, ?, ?)'

        conexao.all(sql, Object.values(peca), (erro, resultado) => {
            console.log(sql)
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
        const sql = 'SELECT * FROM peca;'

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