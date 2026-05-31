setTimeout(() => {
    document.querySelectorAll('.mensagem').forEach(msg => {
        msg.remove();
    });
}, 3000);