frontendHost = 'http://' + window.location.hostname + ':' + window.location.port + '/'
backendHost = 'http://' + window.location.hostname + ':8002/'

function manterAPI(metodo, modelo, objeto, identificador) {
    Httpreq = new XMLHttpRequest() 
    if (identificador == 0) {
        Httpreq.open(metodo, backendHost + modelo, false)
    } else {
        Httpreq.open(metodo, backendHost + modelo + "/" + identificador, false)
    }
    Httpreq.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    if (objeto == '') {
        Httpreq.send()
    } else {
        Httpreq.send(objeto)
    }
    return JSON.parse(Httpreq.responseText)
}

function consultarAPI(modelo, identificador) {
    Httpreq = new XMLHttpRequest()
    if (identificador == 0) {
        Httpreq.open("GET", backendHost + modelo, false)
    } else {
        Httpreq.open("GET", backendHost + modelo + "/" + identificador, false)
    }
    Httpreq.setRequestHeader('content-type', 'application/x-www-form-urlencoded')
    Httpreq.send()
    if (Httpreq.responseText == '') {
        return Httpreq.responseText
    } else {
        return JSON.parse(Httpreq.responseText)
    }
}

function criaCard(label, sublabel, conteudo) {
    card = document.createElement('div')
    card.setAttribute('class', 'card')
    titulo = document.createElement('div')
    titulo.setAttribute('class', 'cardLabel')
    titulo.textContent = label
    subtitulo = document.createElement('div')
    subtitulo.setAttribute('class', 'cardSubLabel')
    subtitulo.textContent = sublabel
    content = document.createElement('div')
    content.setAttribute('class', 'cardContent')
    content.textContent = conteudo
    card.appendChild(titulo)
    card.appendChild(subtitulo)
    card.appendChild(content)
    document.getElementById('card-container').appendChild(card)
}
