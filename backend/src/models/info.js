const conexao = require('../infraestrutura/conexao')

class info {   
    consulta(id, res) {

        let sql = 'SELECT "não localizada" as Consulta FROM peca WHERE id_peca = 150;'

        switch (id) {
            case 1:
                sql = `SELECT
                                CASE substr( descricao_peca, 1, 1 )
                                    WHEN "(" THEN "Semijoia" 
                                    ELSE "Bijuteria"
                                END as Tipo,
                                COUNT(id_peca) as Quantidade,
                                SUM(valor_compra_peca*quantidade_peca) as Valor
                        FROM
                                peca
                        GROUP BY
                                Tipo;`
                break
            case 2:
                sql = `SELECT
                                CASE substr(p.data_pedido,1,7)
                                    WHEN "2020-01" THEN "janeiro"
                                    WHEN "2020-02" THEN "fevereiro"
                                    WHEN "2020-03" THEN "março"
                                    WHEN "2020-04" THEN "abril"
                                    WHEN "2020-05" THEN "maio"
                                    WHEN "2020-06" THEN "junho"
                                    WHEN "2020-07" THEN "julho"
                                    WHEN "2020-08" THEN "agosto"
                                    WHEN "2020-09" THEN "setembro"
                                    WHEN "2020-10" THEN "outubro"
                                    WHEN "2020-11" THEN "novembro"
                                    WHEN "2020-12" THEN "dezembro"
                                END as "mes",
                                count(i.quantidade_item) as Quantidade,
                                sum(pe.valor_venda_peca*i.quantidade_item - pe.valor_compra_peca*i.quantidade_item) as Valor
                        FROM
                                pedido p
                        JOIN	item i on p.id_pedido = i.id_pedido
                        LEFT JOIN	peca pe on i.id_peca = pe.id_peca
                        WHERE
                                id_tipo_pedido = 1
                        GROUP BY
                                "mes"
                        HAVING
                                Valor > 0
                        ORDER BY
                                substr(p.data_pedido,1,7) DESC;`
        }

        conexao.all(sql, (erro, resultado) => {
            if(erro) {
                res.status(400).json(erro)
            } else {
                res.status(200).json(resultado)
            }
        })
    }
}

module.exports = new info