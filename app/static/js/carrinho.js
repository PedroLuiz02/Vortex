document.querySelectorAll(".btn-aumentar").forEach(botao => {

    botao.addEventListener("click", async () => {

        const index = botao.dataset.index;

        const response = await fetch(`/aumentar/${index}`, {
            method: "POST"
        });

        const data = await response.json();

        document.querySelector("#subtotal").innerText =
        `R$ ${formatarMoeda(data.subtotal)}`;

        document.querySelector("#total").innerText =
            `R$ ${formatarMoeda(data.total)}`;

        document.querySelector("#envio").innerText =
            `R$ ${formatarMoeda(data.envio)}`;

        document.querySelector(`#quantidade-${index}`).innerText =
            data.quantidade;

        document.querySelector("#itens-qtd").innerText =
            `Itens ${data.quantidade_itens}x`;
    });

});

document.querySelectorAll(".btn-diminuir").forEach(botao => {

    botao.addEventListener("click", async () => {

        const index = botao.dataset.index;

        const response = await fetch(`/diminuir/${index}`, {
            method: "POST"
        });

        const data = await response.json();

        document.querySelector("#subtotal").innerText =
        `R$ ${formatarMoeda(data.subtotal)}`;

        document.querySelector("#total").innerText =
            `R$ ${formatarMoeda(data.total)}`;

        document.querySelector("#envio").innerText =
            `R$ ${formatarMoeda(data.envio)}`;

        document.querySelector(`#quantidade-${index}`).innerText =
            data.quantidade;

        document.querySelector("#itens-qtd").innerText =
            `Itens ${data.quantidade_itens}x`;
        
    });

});

function formatarMoeda(valor){
    return Number(valor).toLocaleString('pt-BR', {
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    });
}