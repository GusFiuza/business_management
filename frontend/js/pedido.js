count = 1
id_pedido = 0

pagamentoCom = ['Selecione','Dinheiro','Transferência','Débito','Crédito']

function identificaParceiro() {
    url_string = window.location.href;
    url = new URL(url_string);
    tipo = url.searchParams.get("tipo");
}

function listaPedidos() {

    vendasStat = consultarAPI('info', 2)

    for (i=0; i < vendasStat.length; i++) {
        criaCard('Lucro de ' + vendasStat[i].mes,
            vendasStat[i].Quantidade + ' peças',
            vendasStat[i].Valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))
    }

    linhas = document.getElementById('pedidos').children.length
    for (i = 1; i < linhas; i++) {
        document.getElementById('pedidos').children[1].remove()
    }

    resultado = consultarAPI('pedido/lista', tipo)

    for (i = 0; i < resultado.length; i++) {
        linha = document.createElement('tr')
        linha.setAttribute('onclick', 'alteraPedido(' + resultado[i].id_pedido + ')')
        parceiro = document.createElement('td')
        parceiro.setAttribute('class','column1')
        if (resultado[i].id_parceiro != 0) {
            parceiro.textContent = consultarAPI('parceiro',resultado[i].id_parceiro).nome_parceiro
        } else {
            parceiro.textContent = 'Não localizado'
        }
        
        formaPagamento = document.createElement('td')
        formaPagamento.setAttribute('class','column2')
        formaPagamento.textContent = pagamentoCom[resultado[i].id_forma_pagamento] 
        data = document.createElement('td')
        data.setAttribute('class','column3')
        data.textContent = resultado[i].data_pedido
        valor = document.createElement('td')
        valor.setAttribute('class','column4')
        valor.textContent = resultado[i].valor_pago
        linha.appendChild(parceiro)
        linha.appendChild(formaPagamento)
        linha.appendChild(data)
        linha.appendChild(valor)
        document.getElementById('pedidos').appendChild(linha)
    }
}

function incluir() {
    window.location = frontendHost + 'html/formulario_pedido.html?tipo=' + tipo
}

function voltarHome() {
    window.location = frontendHost
}

function voltarLista() {
    window.location = frontendHost + 'html/lista_pedido.html?tipo=' + tipo
}

function incluiPedido() {
    pedido = `cliente=` + document.getElementById('idParceiro').value + `&tipo=` + tipo + `&
                forma=`+ document.getElementById('formaPagamento').value + `&
                data=`+ document.getElementById('dataPedido').value + `&
                valor=`+ document.getElementById('valorPedido').value
    if (id_pedido == 0) {
        resultado = manterAPI('post', 'pedido', pedido, 0)
        id_pedido = resultado.seq
    } else {
        resultado = manterAPI('put', 'pedido', pedido, id_pedido)
        console.log(manterAPI('delete', 'item', '', id_pedido))
    }
    for (i = 1; i < document.getElementById('itens').childElementCount; i++) {
        item = `pedido=` + id_pedido + `&
        codItem=` + document.getElementById('codigo' + i).value + `&
        quantItem=` + document.getElementById('quantidade' + i).value + `&
        valorItem=` + document.getElementById('valor' + i).value
        console.log(manterAPI('post', 'item', item, 0))
    }
    voltarLista()
}

function alteraPedido(id) {
    window.location = frontendHost + 'html/formulario_pedido.html?tipo=' + tipo + '&id=' + id
}

function testaAlteracao() {
    url_string = window.location.href;
    url = new URL(url_string);
    id = url.searchParams.get("id");
    console.log(id)
    if (id != null) {
        id_pedido = id
        resultado = consultarAPI('pedido', id)
        document.getElementById('idParceiro').setAttribute('value', resultado.id_parceiro)
        document.getElementById('parceiro' + resultado.id_parceiro).setAttribute('selected','')
        document.getElementById('formaPagamento').setAttribute('value', resultado.id_forma_pagamento)
        document.getElementById('forma' + resultado.id_forma_pagamento).setAttribute('selected','')
        document.getElementById('dataPedido').setAttribute('value', resultado.data_pedido)
        document.getElementById('valorPedido').setAttribute('value', resultado.valor_pago)
        document.getElementById('confirma').textContent = 'Alterar'
        document.getElementById('apaga').removeAttribute('hidden')
        document.getElementById('apaga').setAttribute('class','contact100-form-btn')
        document.getElementById('apaga').setAttribute('onclick','excluiPedido(' + id + ')')
        resultado = consultarAPI('item', id)
        for (i = 1; i <= resultado.length; i++) {
            if (i > 1) { novoItem() }
            document.getElementById('codigo' + i).setAttribute('value', resultado[i - 1].id_peca)
            for (j=1;j<=resultado[i - 1].quantidade_item;j++) {
                op = document.createElement('option')   
                op.setAttribute('value','quant' + i + j)
                op.textContent = j
                document.getElementById('quantidade' + i).appendChild(op)
            }
            document.getElementById('quantidade' + i).lastChild.setAttribute('selected','')
            document.getElementById('valor' + i).setAttribute('value', resultado[i - 1].valor_item)
        }

    }
}

function novoItem() {
    count++
    item = novaLinha()
    document.getElementById('itens').appendChild(item)
}

function novaLinha() {
    linha = document.createElement('dvi')
    linha.setAttribute('id', 'item' + count)
    linha.setAttribute('class','contact100-form')
    codigo = novaCelula('codigo')
    quantidade = novaCelula('quantidade')
    valor = novaCelula('valor')
    linha.appendChild(codigo)
    linha.appendChild(quantidade)
    linha.appendChild(valor)
    return linha
}

function novaCelula(id) {
    celula = document.createElement('div')
    celula.setAttribute('class','rs2-wrap-input100 bg1')
    if (id == 'quantidade') {
        campo = document.createElement('select')
        opcao = document.createElement('option')
        opcao.setAttribute('value',0)
        opcao.textContent = 'Selecione'
        campo.appendChild(opcao)
    } else { 
        campo = document.createElement('input')
        campo.setAttribute('type', 'text')
    }
    campo.setAttribute('id', id + count)
    campo.setAttribute('class','input100')
    
    if (id == 'codigo') {
        campo.setAttribute('onchange',"atualizaQuantidade(" + count + ",document.getElementById('codigo" + count +"').value)")
    }
    if (id == 'quantidade') {
        campo.setAttribute('onchange',"atualizaValor(" + count + ",document.getElementById('codigo" + count +"').value)")
    }
    celula.appendChild(campo)
    return celula
}

function excluiPedido(id) {
    console.log(manterAPI('delete', 'pedido', '', id))
    console.log(manterAPI('delete', 'item', '', id))
    voltarLista()
}

function carregaParceiros(tipo) {
    combo = document.getElementById('idParceiro')
    parceiros = consultarAPI('parceiro/lista', tipo)
    for (i=0;i<parceiros.length;i++) {
        opcao = document.createElement('option')
        opcao.setAttribute('id','parceiro' + parceiros[i].id_parceiro)
        opcao.setAttribute('value',parceiros[i].id_parceiro)
        opcao.textContent = parceiros[i].nome_parceiro
        combo.appendChild(opcao)
    }
}

function atualizaQuantidade(id_item,id_peca) {
    peca = consultarAPI('peca',id_peca)
    item = document.getElementById('quantidade'+id_item)
    document.getElementById('valor'+id_item).setAttribute('value',0)
    quant = item.childElementCount
    for (i=1;i<quant;i++) {item.children[1].remove()}
    if (peca != '') {
        for (i=1;i<=peca.quantidade_peca;i++) {
            opcao = document.createElement('option')
            opcao.setAttribute('value',i)
            opcao.textContent = i
            item.appendChild(opcao)
        }
    } else {
        for (i=1;i<=10;i++) {
            opcao = document.createElement('option')
            opcao.setAttribute('value',i)
            opcao.textContent = i
            item.appendChild(opcao)
        }
    }
    
}

function atualizaValor(id_item,id_peca) {
    peca = consultarAPI('peca',id_peca)
    quant = document.getElementById('quantidade'+id_item)
    valor = document.getElementById('valor'+id_item)
    if (peca != '') {
        valor.setAttribute('value', quant.value*peca.valor_venda_peca)
    } else {
        valor.setAttribute('value', 0)
    }
    atualizaTotal()
}

function atualizaTotal() {
    itens = document.getElementById('itens').childElementCount
    soma = 0
    for (i = 2;i<=itens;i++) {
        campo = i - 1
        soma += parseFloat(document.getElementById('valor' + campo).value)
    }
    document.getElementById('valorPedido').setAttribute('value',soma)
}