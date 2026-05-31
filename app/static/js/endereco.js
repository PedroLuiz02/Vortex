const regex = {

    nome: /^[A-Za-zÀ-ÿ\s]{3,100}$/,

    cpf: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,

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
    const label = input.parentElement.querySelector("label").innerText

    if(regex[tipo].test(input.value)){

        input.style.border = "1px solid #00ff88"
        error.innerText = ""

        return true
    }

    input.style.border = "1px solid #ff4d4d"
    error.innerText = `${label} inválido`
    
    return false
}

const nome = document.getElementById("nome")

nome.addEventListener("input", () => {

    let valor = nome.value

    valor = valor.replace(/[^A-Za-zÀ-ÿ\s]/g, '')

    valor = valor.replace(/\s+/g, ' ')

    nome.value = valor

    const ignorar = ['de', 'da', 'do', 'dos', 'das']

    const palavras = valor
        .trim()
        .toLowerCase()
        .split(' ')
        .filter(p =>
            p.length >= 2 &&
            !ignorar.includes(p)
        )

    const valido = palavras.length >= 3

    nome.style.border =
        valido
        ? "2px solid green"
        : "2px solid red"

})

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

const cpf = document.getElementById("cpf");

cpf.addEventListener("input", () => {

    let valor = cpf.value.replace(/\D/g, '');

    valor = valor.slice(0, 11);

    if(valor.length > 9){
        valor = valor.replace(
            /(\d{3})(\d{3})(\d{3})(\d{1,2})/,
            '$1.$2.$3-$4'
        );
    }
    else if(valor.length > 6){
        valor = valor.replace(
            /(\d{3})(\d{3})(\d+)/,
            '$1.$2.$3'
        );
    }
    else if(valor.length > 3){
        valor = valor.replace(
            /(\d{3})(\d+)/,
            '$1.$2'
        );
    }

    cpf.value = valor;

    const valido = validarCPF(valor);

    cpf.style.border =
        valido
        ? "2px solid green"
        : "2px solid red";

    cpf.nextElementSibling.innerText =
        valido ? "" : "CPF inválido";
});

document.getElementById("numero").addEventListener("input", function(){

    apenasNumeros(this)

    validarCampo('numero', 'numero')
})

function validarCPF(cpf){

    cpf = cpf.replace(/\D/g, '');

    if(cpf.length !== 11){
        return false;
    }

    if(/^(\d)\1+$/.test(cpf)){
        return false;
    }

    let soma = 0;

    for(let i = 0; i < 9; i++){
        soma += parseInt(cpf[i]) * (10 - i);
    }

    let resto = (soma * 10) % 11;
    if(resto === 10){
        resto = 0;
    }

    if(resto !== parseInt(cpf[9])){
        return false;
    }

    soma = 0;

    for(let i = 0; i < 10; i++){
        soma += parseInt(cpf[i]) * (11 - i);
    }

    resto = (soma * 10) % 11;

    if(resto === 10){
        resto = 0;
    }

    if(resto !== parseInt(cpf[10])){
        return false;
    }

    return true;
}

const cepInput = document.querySelector("#cep");

cepInput.addEventListener("blur", async () => {

    let cep = cepInput.value.replace(/\D/g, "");

    if (cep.length !== 8) return;

    try {

        const response = await fetch(
            `https://viacep.com.br/ws/${cep}/json/`
        );

        const data = await response.json();

        if (data.erro) {

            alert("CEP não encontrado");

            return;
        }

        document.querySelector("#estado").value =
            data.uf;

        document.querySelector("#cidade").value =
            data.localidade;

        document.querySelector("#bairro").value =
            data.bairro;

        document.querySelector("#rua").value =
            data.logradouro;

    } catch (error) {

        console.log(error);

        alert("Erro ao buscar CEP");

    }

});