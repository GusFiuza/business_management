CREATE TABLE parceiro (
    id_parceiro INTEGER PRIMARY KEY AUTOINCREMENT,
    id_tipo_parceiro INTEGER NOT NULL,
    nome_parceiro TEXT NOT NULL,
    telefone_parceiro TEXT NOT NULL,
    observacao_parceiro TEXT
);
INSERT INTO parceiro (id_tipo_parceiro, nome_parceiro, telefone_parceiro) VALUES (1, 'Gustavo', '61984325098');
INSERT INTO parceiro (id_tipo_parceiro, nome_parceiro, telefone_parceiro) VALUES (1, 'Carla', '61984185368');
INSERT INTO parceiro (id_tipo_parceiro, nome_parceiro, telefone_parceiro) VALUES (1, 'Lucas', '61999971603');
INSERT INTO parceiro (id_tipo_parceiro, nome_parceiro, telefone_parceiro) VALUES (1, 'Laura', 'Não possui');
CREATE TABLE peca (
    id_peca INTEGER PRIMARY KEY, 
    tipo_peca INTEGER NOT NULL,
    descricao_peca TEXT NOT NULL,
    quantidade_peca INTEGER NOT NULL,
    valor_compra_peca REAL NOT NULL,
    valor_venda_peca REAL NOT NULL
);
INSERT INTO peca (id_peca, tipo_peca, descricao_peca, quantidade_peca, valor_compra_peca, valor_venda_peca )
VALUES (1, 1, 'Brinco azul', 1, 10.20, 20.4);
INSERT INTO peca (id_peca, tipo_peca, descricao_peca, quantidade_peca, valor_compra_peca, valor_venda_peca )
VALUES (1, 2, 'Colar verde', 2, 11.30, 22.6);
INSERT INTO peca (id_peca, tipo_peca, descricao_peca, quantidade_peca, valor_compra_peca, valor_venda_peca )
VALUES (1, 3, 'Pulseira amarela', 3, 5.50, 11);
CREATE TABLE pedido (
    id_pedido INTEGER PRIMARY KEY AUTOINCREMENT,
    id_parceiro INTEGER NOT NULL,
    id_tipo_pedido INTEGER NOT NULL,
    id_forma_pagamento REAL NOT NULL,
    data_pedido TEXT NOT NULL,
    valor_pago REAL NOT NULL,
    FOREIGN KEY(id_parceiro) REFERENCES parceiro(id_parceiro)
);
CREATE TABLE item (
    id_pedido INTEGER NOT NULL,
    id_peca INTEGER NOT NULL,
    quantidade_item INTEGER NOT NULL,
    valor_item REAL NOT NULL,
    FOREIGN KEY(id_pedido) REFERENCES pedido(id_pedido),
    FOREIGN KEY(id_peca) REFERENCES peca(id_peca)
);