document.addEventListener("DOMContentLoaded", () => {
    const textBubble = document.getElementById("bubble-content");
    const dialogBox = document.getElementById("dialog-trigger");
    const skipBtn = document.getElementById("skip-trigger");
    const statusDemo = document.getElementById("status-demo");
    
    const gmImg = document.querySelector(".gm-avatar");
    const playerImg = statusDemo.querySelector(".P1-avatar");
    const barBlue = statusDemo.querySelector(".bar-blue");
    const barPink = statusDemo.querySelector(".bar-pink");
    const barGreen = statusDemo.querySelector(".bar-green");

    let currentSlide = 0;
    let typeInterval = null; // Guarda o temporizador do efeito máquina de escrever
    let textFullyDisplayed = false; // Flag para saber se a animação de texto terminou

    const dialogos = [
        "Sou a Caridade. Serei a vossa guia nesta jornada de desapego e evolução. Cada escolha vossa ditará o peso da vossa alma...",
        "Vejam acima: Cada espírito possui um tempo de encarnação (azul), orgulho moral (marrom) e pontos materiais (verde).",
        "No melhor cenário, vós purificais a matéria e o orgulho, doando o vosso último suspiro de tempo em prol do próximo para ascender.",
        "No pior cenário, as illusions do mundo acumulam-se e o vosso tempo esgota-se antes da purificação... o que vos levará ao Umbral."
    ];

    // Função que simula a máquina de escrever
    // Função que simula a máquina de escrever corrigida
    function typeWriterEffect(text) {
        // Limpa qualquer efeito que esteja a correr em background
        clearInterval(typeInterval);
        textFullyDisplayed = false;
        textBubble.textContent = ""; // Alterado para textContent por segurança
        
        let index = 0;
        const speed = 30; // 30ms dá uma velocidade de leitura confortável

        typeInterval = setInterval(() => {
            if (index < text.length) {
                // Injeta o caractere diretamente respeitando os espaços do array original
                textBubble.textContent += text[index]; 
                index++;
            } else {
                clearInterval(typeInterval);
                textFullyDisplayed = true; // O texto terminou de escrever sozinho
            }
        }, speed);
    }

    function updateSlide() {
        if (currentSlide >= dialogos.length) {
            avancarParaJogo();
            return;
        }

        // 1. Fade-out rápido das imagens para a transição suave que configurámos
        gmImg.classList.add("fade-hidden");
        if (statusDemo.style.display === "flex") {
            playerImg.classList.add("fade-hidden");
        }

        setTimeout(() => {
            // Reset padrão das classes das barras antes de aplicar os novos estados
            barBlue.className = "preview-bar bar-blue";
            barPink.className = "preview-bar bar-pink";
            barGreen.className = "preview-bar bar-green";

            // 2. Controlo de estados visuais por slide
            switch(currentSlide) {
                case 0:
                    statusDemo.style.display = "none";
                    gmImg.src = "assets/game-master/game_master_olhos_fechados.png";
                    break;

                case 1:
                    statusDemo.style.display = "flex";
                    playerImg.src = "assets/player1/player1-1material-1moral-3temporal.png";
                    gmImg.src = "assets/game-master/game_master_de_boca_fechada.png";
                    break;

                case 2:
                    statusDemo.style.display = "flex";
                    barBlue.classList.add("best");
                    barPink.classList.add("best");
                    barGreen.classList.add("best");
                    playerImg.src = "assets/player1/best-player1.png"; 
                    gmImg.src = "assets/game-master/game_master_sorriso_largo.png";
                    break;

                case 3:
                    statusDemo.style.display = "flex";
                    barBlue.classList.add("worst");
                    barPink.classList.add("worst");
                    barGreen.classList.add("worst");
                    playerImg.src = "assets/player1/worst-player1.png"; 
                    gmImg.src = "assets/game-master/game_master_refletindo.png";
                    break;
            }

            // Inicia o efeito de máquina de escrever com o texto do slide atual
            typeWriterEffect(dialogos[currentSlide]);

            // 3. Fade-in das novas imagens expressivas
            setTimeout(() => {
                gmImg.classList.remove("fade-hidden");
                if (statusDemo.style.display === "flex") {
                    playerImg.classList.remove("fade-hidden");
                }
            }, 50);

        }, 200);
    }

    function avancarParaJogo() {
        clearInterval(typeInterval); // Segurança para não deixar timers órfãos
        window.location.href = "jogo.html";
    }

    // 4. Gestor de Cliques Inteligente na Caixa de Diálogo
    dialogBox.addEventListener("click", () => {
        if (!textFullyDisplayed) {
            // Cenário A: O texto ainda está a escrever. Paramos a animação e injetamos o texto completo imediatamente.
            clearInterval(typeInterval);
            textBubble.innerText = dialogos[currentSlide];
            textFullyDisplayed = true;
        } else {
            // Cenário B: O texto já estava todo visível. O clique agora passa para o próximo slide.
            currentSlide++;
            updateSlide();
        }
    });

    skipBtn.addEventListener("click", avancarParaJogo);

    // Inicializa a primeira fala da Caridade
    updateSlide();
});