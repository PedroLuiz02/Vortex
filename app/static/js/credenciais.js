const nome = document.getElementById("nomeForm");
const email = document.getElementById("emailForm");
const senhaLogin = document.getElementById("password");
const senhaCadastro = document.getElementById("senhaForm");
const confirmarSenha = document.getElementById("confirmSenha");

const regexEmail =
    /^[^\s@]+@[^\s@]+\.com$/i;

const regexSenha =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;

if(nome){
    nome.addEventListener("input", validarNome);
}

if(email){
    email.addEventListener("input", validarEmail);
}

if(senhaCadastro){
    senhaCadastro.addEventListener("input", () => {
        validarSenhaCadastro();
        validarConfirmacaoSenha();
    });
}

if(confirmarSenha){
    confirmarSenha.addEventListener("input", validarConfirmacaoSenha);
}

function validarNome(){

    const erroNome =
        nome.parentElement.querySelector(".erro-texto");

    let valor = nome.value;

    valor = valor.replace(/[^A-Za-zÀ-ÿ\s]/g, "");
    valor = valor.replace(/\s+/g, " ");

    nome.value = valor;

    const ignorar = [
        "de", "da", "do", "dos", "das", "e"
    ];

    const palavras = valor
        .trim()
        .split(" ")
        .filter(p => !ignorar.includes(p.toLowerCase()));

    const possuiTresNomes =
        palavras.length >= 3;

    const semAbreviacoes =
        palavras.every(p => p.length >= 2);

    if(possuiTresNomes && semAbreviacoes){

        nome.classList.add("input-valido");
        nome.classList.remove("input-invalido");

        erroNome.innerText =
            "✓ Nome válido";

        erroNome.style.color =
            "#00ff88";
    }
    else{

        nome.classList.add("input-invalido");
        nome.classList.remove("input-valido");

        erroNome.innerText =
            "Informe nome e sobrenomes completos";

        erroNome.style.color =
            "#ff4d4d";
    }
}

function validarEmail(){

    const erro =
        email.parentElement.querySelector(".erro-texto");

    if(regexEmail.test(email.value)){

        email.classList.add("input-valido");
        email.classList.remove("input-invalido");

        erro.innerText = "✓ E-mail válido";
        erro.style.color = "#00ff88";
    }
    else{

        email.classList.add("input-invalido");
        email.classList.remove("input-valido");

        erro.innerText =
            "Informe um formato de e-mail válido";
        erro.style.color = "#ff4d4d";
    }
}

function validarSenhaCadastro(){

    const erro =
        senhaCadastro.parentElement.querySelector(".erro-texto");

    if(regexSenha.test(senhaCadastro.value)){

        senhaCadastro.classList.add("input-valido");
        senhaCadastro.classList.remove("input-invalido");

        erro.innerText = "✓ Senha válida";
        erro.style.color = "#00ff88";
    }
    else{

        senhaCadastro.classList.add("input-invalido");
        senhaCadastro.classList.remove("input-valido");

        erro.innerText =
            "Mínimo 8 caracteres, letra maiúscula, letra minúscula e um número";

        erro.style.color = "#ff4d4d";
    }
}

function validarConfirmacaoSenha(){

    if(!confirmarSenha || !senhaCadastro){
        return;
    }

    const erro =
        confirmarSenha.parentElement.querySelector(".erro-texto");

    if(confirmarSenha.value === ""){

        confirmarSenha.classList.remove("input-valido");
        confirmarSenha.classList.remove("input-invalido");

        erro.innerText = "";

        return;
    }

    if(confirmarSenha.value === senhaCadastro.value){

        confirmarSenha.classList.add("input-valido");
        confirmarSenha.classList.remove("input-invalido");

        erro.innerText = "✓ Senhas coincidem";
        erro.style.color = "#00ff88";
    }
    else{

        confirmarSenha.classList.add("input-invalido");
        confirmarSenha.classList.remove("input-valido");

        erro.innerText = "As senhas não coincidem";
        erro.style.color = "#ff4d4d";
    }
}



setTimeout(() => {
    document.querySelectorAll('.mensagem').forEach(msg => {
        msg.remove();
    });
}, 15000);