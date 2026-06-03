document.addEventListener("DOMContentLoaded", () => {
    const textBubble = document.getElementById("bubble-content");
    const dialogBox = document.getElementById("dialog-trigger");
    const skipBtn = document.getElementById("skip-trigger");
    const statusDemo = document.getElementById("status-demo");

    let currentSlide = 0;

    // Sequência exata de diálogos baseada nas tuas telas
    const dialogos = [
        "Sou a Caridade. Serei a vossa guia nesta jornada de desapego e evolução. Cada escolha vossa ditará o termino da vossa jornada...",
        "Vejam acima: Cada espírito possui um tempo de encarnação (azul), orgulho moral (rosa) e pontos materiais (verde).",
        "No melhor cenário, vós purificais a matéria e o orgulho, doando o vosso último suspiro de tempo em prol do próximo para ascender.",
        "No pior cenário, as ilusões do mundo acumulam-se e o vosso tempo esgota-se antes da purificação... o que vos levará ao Umbral."
    ];

    function updateSlide() {
        if (currentSlide >= dialogos.length) {
            avancarParaJogo();
            return;
        }

        textBubble.innerText = dialogos[currentSlide];

        // Se estiver no slide 1 (segundo diálogo), exibe a demonstração gráfica dos pontos
        if (currentSlide === 1) {
            statusDemo.style.display = "flex";
        } else if (currentSlide === 0) {
            statusDemo.style.display = "none";
        }
    }

    function avancarParaJogo() {
        window.location.href = "jogo.html";
    }

    dialogBox.addEventListener("click", () => {
        currentSlide++;
        updateSlide();
    });

    skipBtn.addEventListener("click", avancarParaJogo);

    // Inicializa o primeiro diálogo
    updateSlide();
});