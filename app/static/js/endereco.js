const regex = {

    nome: /^[A-Za-zÀ-ÿ\s]{3,100}$/,

    telefone: /^\(\d{2}\)\s\d{5}-\d{4}$/,

    cep: /^\d{5}-\d{3}$/,

    estado: /^[A-Za-zÀ-ÿ\s]{2,30}$/,

    cidade: /^[A-Za-zÀ-ÿ\s]{2,50}$/,

    bairro: /^[A-Za-zÀ-ÿ0-9\s]{2,50}$/,

    rua: /^[A-Za-zÀ-ÿ0-9\s,.-]{5,100}$/,

    numero: /^[0-9]{1,6}$/,

    complemento: /^[A-Za-zÀ-ÿ0-9\s,.-]{0,100}$/
}

function validarCampo(id, tipo){

    const input = document.getElementById(id)

    const error = input.nextElementSibling

    if(regex[tipo].test(input.value)){

        input.style.border = "1px solid #00ff88"

        error.innerText = ""

        return true
    }

    else{

        input.style.border = "1px solid #ff4d4d"

        error.innerText = "Campo inválido"

        return false
    }
}

function apenasNumeros(input){

    input.value = input.value.replace(/\D/g, '')
}

const telefone = document.getElementById("telefone")

telefone.addEventListener("input", () => {

    let valor = telefone.value.replace(/\D/g, '')

    valor = valor.slice(0, 11)

    if(valor.length > 0){

        valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2')
    }

    if(valor.length > 10){

        valor = valor.replace(/(\d{5})(\d)/, '$1-$2')
    }

    telefone.value = valor

    validarCampo('telefone', 'telefone')
})

const cep = document.getElementById("cep")

cep.addEventListener("input", () => {

    let valor = cep.value.replace(/\D/g, '')

    valor = valor.slice(0, 8)

    if(valor.length > 5){

        valor = valor.replace(/(\d{5})(\d)/, '$1-$2')
    }

    cep.value = valor

    validarCampo('cep', 'cep')
})

document.getElementById("numero").addEventListener("input", function(){

    apenasNumeros(this)

    validarCampo('numero', 'numero')
})