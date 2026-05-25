const senha = document.getElementById("password");
const confirmarSenha = document.getElementById("confirmPassword");

function validarSenha() {

    if (senha.value !== confirmarSenha.value) {
        confirmarSenha.setCustomValidity("As senhas não coincidem");
    } else {
        confirmarSenha.setCustomValidity("");
    }

}

senha.addEventListener("input", validarSenha);
confirmarSenha.addEventListener("input", validarSenha);