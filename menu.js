document.addEventListener("DOMContentLoaded", () => {
    const playersInput = document.getElementById("players-qty");
    const btnStart = document.getElementById("btn-start");

    function validarConfiguracoes() {
        const val = parseInt(playersInput.value, 10);
        
        // Ativa o botão apenas se estiver entre 3 e 6 jogadores conforme os requisitos
        if (val >= 3 && val <= 6) {
            btnStart.classList.add("ready");
            btnStart.removeAttribute("disabled");
        } else {
            btnStart.classList.remove("ready");
            btnStart.setAttribute("disabled", "true");
        }
    }

    playersInput.addEventListener("input", validarConfiguracoes);

    btnStart.addEventListener("click", () => {
        // Guardar as configurações para serem recuperadas no tabuleiro do jogo
        localStorage.setItem("caritas_total_jogadores", playersInput.value);
        localStorage.setItem("caritas_tema", "1"); // Trabalhadores de Jesus
        localStorage.setItem("caritas_nivel", "1"); // Nível Base fixo

        // Avança para a apresentação do Game Master
        window.location.href = "intro.html";
    });
});