document.addEventListener("DOMContentLoaded", () => {
    const textBubble = document.getElementById("bubble-content");
    const dialogBox = document.getElementById("dialog-trigger");
    const skipBtn = document.getElementById("skip-trigger");
    const statusDemo = document.getElementById("status-demo");
    
    // Captura dos elementos dinâmicos do Player
    const gameMasterImg = document.querySelector(".gm-avatar");
    const playerImg = statusDemo.querySelector(".P1-avatar");
    const barBlue = statusDemo.querySelector(".bar-blue");
    const barPink = statusDemo.querySelector(".bar-pink");
    const barGreen = statusDemo.querySelector(".bar-green");

    let currentSlide = 0;

    // Diálogos estruturados
    const dialogos = [
        "Sou a Caridade. Serei a vossa guia nesta jornada de desapego e evolução. Cada escolha vossa ditará o peso da vossa alma...",
        "Vejam acima: Cada espírito possui um tempo de encarnação (azul), orgulho moral (rosa) e pontos materiais (verde).",
        "No melhor cenário, vós purificais a matéria e o orgulho, doando o vosso último suspiro de tempo em prol do próximo para ascender.",
        "No pior cenário, as ilusões do mundo acumulam-se e o vosso tempo esgota-se antes da purificação... o que vos levará ao Umbral."
    ];

    function updateSlide() {
        if (currentSlide >= dialogos.length) {
            avancarParaJogo();
            return;
        }

        // Atualiza o texto da Caridade
        textBubble.innerText = dialogos[currentSlide];

        // Reset de classes das barras para o estado padrão
        barBlue.className = "preview-bar bar-blue";
        barPink.className = "preview-bar bar-pink";
        barGreen.className = "preview-bar bar-green";

        // CONTROLO DINÂMICO POR SLIDE
        switch(currentSlide) {
            case 0:
                // Slide inicial: O HUD do player fica escondido
                statusDemo.style.display = "none";
                gameMasterImg.src = "assets/game-master/game master init.png";
                break;

            case 1:
                // Apresentação dos Pontos: Mostra o HUD com valores normais/iniciais
                statusDemo.style.display = "flex";
                gameMasterImg.src = "assets/game-master/game master intro.png";
                playerImg.src = "assets/player1/player1-1material-1moral-3temporal.png";
                break;

            case 2:
                // Melhor Cenário: Aplica as classes que reduzem as barras morais/materiais de forma suave
                statusDemo.style.display = "flex";
                barBlue.classList.add("best");
                barPink.classList.add("best");
                barGreen.classList.add("best");
                
                // Dica: Se tiveres uma imagem do player sorridente ou iluminado para o "Best Case", mudas aqui:
                playerImg.src = "assets/player1/best-player1.png";
                gameMasterImg.src = "assets/game-master/game master feliz.png";
                break;

            case 3:
                // Pior Cenário: Barras negativas sobem, tempo zera
                statusDemo.style.display = "flex";
                barBlue.classList.add("worst");
                barPink.classList.add("worst");
                barGreen.classList.add("worst");
                
                // Dica: Se tiveres uma imagem do player preocupado ou sombrio para o "Worst Case":
                playerImg.src = "assets/player1/worst-player1.png";
                gameMasterImg.src = "assets/game-master/game master pensando.png";
                break;
        }
    }

    function avancarParaJogo() {
        window.location.href = "jogo.html";
    }

    // Avança ao clicar na caixa de diálogo
    dialogBox.addEventListener("click", () => {
        currentSlide++;
        updateSlide();
    });

    skipBtn.addEventListener("click", avancarParaJogo);

    // Inicializa o primeiro slide do fluxo
    updateSlide();
});