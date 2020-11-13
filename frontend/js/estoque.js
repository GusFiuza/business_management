// tipoEst = ['Selecione', 'Brinco', 'Colar', 'Conjunto', 'Pulseira', 'Pingente']
tipoEst = ['Selecione', 'Semijoia', 'Bijuteria']

function filtraMarca() {
    mostrar = document.getElementById('mostrar').checked
    for (linha = 0; linha < document.getElementById('estoque').childElementCount; linha++) {
        linhaTabela = document.getElementById('estoque').children[linha]
        marca = document.getElementById('estoque').children[linha].children[0].children[0]
        // if (!linhaTabela.hidden) {
            if ( mostrar == marca.checked) {
                linhaTabela.removeAttribute('hidden')
            } else {
                linhaTabela.setAttribute('hidden', '')
            }
        // }
    }
}

function filtraTipo() {
    exibindo = document.getElementById('type').textContent
    if (exibindo == 'Tipo') {
        document.getElementById('type').textContent = 'Semijoias'
    } else if (exibindo == 'Semijoias') {
        document.getElementById('type').textContent = 'Bijuterias'
    } else {
        document.getElementById('type').textContent = 'Tipo'
    }
    exibindo = document.getElementById('type').textContent
    for (linha = 0; linha < document.getElementById('estoque').childElementCount; linha++) {
        tableLine = document.getElementById('estoque').children[linha].getAttribute('name')
        if ( tableLine + 's' == exibindo || exibindo == 'Tipo') {
            document.getElementById('estoque').children[linha].removeAttribute('hidden')
        } else {
            document.getElementById('estoque').children[linha].setAttribute('hidden', '')
        }
    }
}

function listaEstoque() {

    estStat = consultarAPI('info', 1)

    for (i=0; i < estStat.length; i++) {
        criaCard(estStat[i].Tipo,
            estStat[i].Quantidade + ' peças',
            estStat[i].Valor.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'}))
    }


    linhas = document.getElementById('estoque').children.length
    for (i = 1; i < linhas; i++) {
        document.getElementById('estoque').children[1].remove()
    }

    resultado = consultarAPI('peca', 0)

    for (i = 0; i < resultado.length; i++) {
        linha = document.createElement('tr')
        linha.setAttribute('name', tipoEst[resultado[i].tipo_peca])
        linha.setAttribute('onclick', 'alteraPeca(' + resultado[i].id_peca + ')')
        
        marca = document.createElement('td')
        marca.setAttribute('class', 'column1')
        check = document.createElement('input')
        check.setAttribute('type','checkbox')
        marca.appendChild(check)

        codigo = document.createElement('td')
        codigo.setAttribute('class', 'column1')
        codigo.textContent = resultado[i].id_peca
        tipo = document.createElement('td')
        tipo.setAttribute('class', 'column2')
        tipo.textContent = tipoEst[resultado[i].tipo_peca]
        descricao = document.createElement('td')
        descricao.setAttribute('class', 'column3')
        descricao.textContent = resultado[i].descricao_peca
        quantidade = document.createElement('td')
        quantidade.setAttribute('class', 'column4')
        quantidade.textContent = resultado[i].quantidade_peca
        valor_compra = document.createElement('td')
        valor_compra.setAttribute('class', 'column5')
        valor_compra.textContent = resultado[i].valor_compra_peca
        valor_venda = document.createElement('td')
        valor_venda.setAttribute('class', 'column6')
        valor_venda.textContent = resultado[i].valor_venda_peca
        linha.appendChild(marca)
        linha.appendChild(codigo)
        linha.appendChild(tipo)
        linha.appendChild(descricao)
        linha.appendChild(quantidade)
        linha.appendChild(valor_compra)
        linha.appendChild(valor_venda)
        document.getElementById('estoque').appendChild(linha)
    }
}

function incluir() {
    window.location = frontendHost + 'html/formulario_estoque.html'
}

function voltarHome() {
    window.location = frontendHost
}

function voltarLista() {
    window.location = frontendHost + 'html/lista_estoque.html'
}

function incluiPeca() {
    peca = `tipo=` + document.getElementById('tipoPeca').value + `&
                descricao=`+ document.getElementById('descricaoPeca').value + `&
                quantidade=`+ document.getElementById('quantidadePeca').value + `&
                compra=`+ document.getElementById('valorCompraPeca').value + `&
                venda=`+ document.getElementById('valorVendaPeca').value
    if (resultado == 'novo') {
        peca = `id=` + document.getElementById('codigoPeca').value + `&` + peca
        console.log(manterAPI('post', 'peca', peca, 0))
    } else {
        console.log(manterAPI('put', 'peca', peca, resultado.id_peca))
    }
    voltarLista()
}

function alteraPeca(id) {
    if (window.event.target.tagName == 'TD') {
        window.location = frontendHost + 'html/formulario_estoque.html?id=' + id
    }
}

function testaAlteracao() {
    url_string = window.location.href;
    url = new URL(url_string);
    id = url.searchParams.get("id");
    if (id != null) {
        resultado = consultarAPI('peca', id)
        document.getElementById('codigoPeca').setAttribute('value', resultado.id_peca)
        document.getElementById('codigoPeca').setAttribute('readonly', '')

        // document.getElementById('tipoPeca').setAttribute('value', resultado.tipo_peca)
        document.getElementById('tipo' + resultado.tipo_peca).setAttribute('selected', '')

        document.getElementById('descricaoPeca').setAttribute('value', resultado.descricao_peca)
        document.getElementById('quantidadePeca').setAttribute('value', resultado.quantidade_peca)
        document.getElementById('valorCompraPeca').setAttribute('value', resultado.valor_compra_peca)
        document.getElementById('valorVendaPeca').setAttribute('value', resultado.valor_venda_peca)
        document.getElementById('confirma').textContent = 'Alterar'
        document.getElementById('apaga').removeAttribute('hidden')
        document.getElementById('apaga').setAttribute('class', 'contact100-form-btn')
        document.getElementById('apaga').setAttribute('onclick', 'excluiPeca(' + id + ')')
    } else {
        resultado = 'novo'
    }
}

function excluiPeca(id) {
    console.log(manterAPI('delete', 'peca', '', id))
    voltarLista()
}
