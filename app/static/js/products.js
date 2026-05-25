let quantidade = 1

function aumentar(){

    quantidade++

    document.getElementById('qtd-text').innerText = quantidade

    document.getElementById('quantidade-input').value = quantidade
}

function diminuir(){

    if(quantidade > 1){

        quantidade--

        document.getElementById('qtd-text').innerText = quantidade

        document.getElementById('quantidade-input').value = quantidade
    }
}