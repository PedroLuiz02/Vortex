console.log(produtos);
console.log(document.getElementById("nome-produto"));
console.log(document.getElementById("ingredientes"));
console.log(document.getElementById("beneficio1"));
console.log(document.getElementById("beneficio2"));
console.log(document.getElementById("beneficio3"));
console.log(document.getElementById("beneficio4"));
console.log(document.getElementById("lata-principal"));

let atual = 0;

function atualizarProduto() {

    const produto = produtos[atual];

    document.getElementById("nome-produto").innerText =
        produto.nome;

    document.getElementById("lata-principal").src =
        `/static/img/lata${produto.id}.png`;

    const ingredientes = produto.ingredientes.split(";");

    const lista = document.getElementById("ingredientes");

    lista.innerHTML = "";

    ingredientes.forEach(item => {
        lista.innerHTML += `<li>${item}</li>`;
    });

    const beneficios = produto.beneficios.split(";");

    document.getElementById("beneficio1").innerText =
        "+ " + (beneficios[0] || "");

    document.getElementById("beneficio2").innerText =
        "+ " + (beneficios[1] || "");

    document.getElementById("beneficio3").innerText =
        "+ " + (beneficios[2] || "");

    document.getElementById("beneficio4").innerText =
        "+ " + (beneficios[3] || "");

    const subsContainer =
        document.getElementById("latas-subs");

    subsContainer.innerHTML = "";

    for(let i = 1; i < produtos.length; i++){

        let indice =
            (atual + i) % produtos.length;

        subsContainer.innerHTML += `
            <img
                src="/static/img/lata${produtos[indice].id}.png"
                class="subs"
                data-index="${indice}"
            >
        `;
    }
}

document.addEventListener("click", (e) => {

    if(e.target.classList.contains("subs")){

        atual = Number(e.target.dataset.index);

        atualizarProduto();
    }

});

document.getElementById("btn-proximo").addEventListener("click", () => {

    atual++;

    if(atual >= produtos.length){
        atual = 0;
    }

    atualizarProduto();
});

document.getElementById("btn-anterior").addEventListener("click", () => {

    atual--;

    if(atual < 0){
        atual = produtos.length - 1;
    }

    atualizarProduto();
});

atualizarProduto();

console.log(produtos);