function identificaParceiro() {
    url_string = window.location.href;
    url = new URL(url_string);
    tipo = url.searchParams.get("tipo");
}

function listaParceiros() {
    linhas = document.getElementById('parceiros').children.length
    for (i = 1; i < linhas; i++) {
        document.getElementById('parceiros').children[1].remove()
    }

    resultado = consultarAPI('parceiro/lista', tipo)

    for (i = 0; i < resultado.length; i++) {
        linha = document.createElement('tr')
        linha.setAttribute('onclick', 'alteraParceiro(' + resultado[i].id_parceiro + ')')
        nome = document.createElement('td')
        nome.setAttribute('class','column1')
        nome.textContent = resultado[i].nome_parceiro
        telefone = document.createElement('td')
        telefone.setAttribute('class','column2')
        if (resultado[i].telefone_parceiro != '') {
            telefone.textContent = resultado[i].telefone_parceiro
        } else {
            telefone.textContent = '-'
        }
        observacao = document.createElement('td')
        observacao.setAttribute('class','column3')
        if (resultado[i].observacao_parceiro != '') {
            observacao.textContent = resultado[i].observacao_parceiro
        } else {
            observacao.textContent = '-'
        }
        linha.appendChild(nome)
        linha.appendChild(telefone)
        linha.appendChild(observacao)
        document.getElementById('parceiros').appendChild(linha)
    }
}

function incluir() {
    window.location = frontendHost + 'html/formulario_parceiro.html?tipo=' + tipo
}

function voltarHome() {
    window.location = frontendHost
}

function voltarLista() {
    window.location = frontendHost + 'html/lista_parceiro.html?tipo=' + tipo
}

function incluiParceiro() {
    parceiro = `tipo=` + tipo + `&
    nome=`+ document.getElementById('nomeParceiro').value + `&
    telefone=`+ document.getElementById('telefoneParceiro').value + `&
    observacao=`+ document.getElementById('observacaoParceiro').value    
    if (resultado == 'novo') {
        console.log(manterAPI('post','parceiro',parceiro,0))
    } else {
        console.log(manterAPI('put','parceiro',parceiro,resultado.id_parceiro))
    }
    voltarLista()
}

function alteraParceiro(id) {
    window.location = frontendHost + 'html/formulario_parceiro.html?tipo=' + tipo + '&id=' + id
}

function testaAlteracao() {
    url_string = window.location.href;
    url = new URL(url_string);
    id = url.searchParams.get("id");
    if (id != null) {
        resultado = consultarAPI('parceiro',id)
        document.getElementById('nomeParceiro').setAttribute('value', resultado.nome_parceiro)
        document.getElementById('telefoneParceiro').setAttribute('value', resultado.telefone_parceiro)
        document.getElementById('observacaoParceiro').setAttribute('value', resultado.observacao_parceiro)
        document.getElementById('confirma').textContent = 'Alterar'
        document.getElementById('apaga').removeAttribute('hidden')
        document.getElementById('apaga').setAttribute('class','contact100-form-btn')
        document.getElementById('apaga').setAttribute('onclick','excluiParceiro(' + id + ')')
    } else {
        resultado = 'novo'
    }
}

function excluiParceiro(id) {
    console.log(manterAPI('delete','parceiro','',id))
    window.location = frontendHost + 'html/lista_parceiro.html?tipo=' + tipo
}
