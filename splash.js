document.addEventListener("DOMContentLoaded", () => {
    const bgArt = document.getElementById("bg-art");
    const gameTitle = document.getElementById("game-title");
    const playTrigger = document.getElementById("play-trigger");

    // 1. Torna a imagem de fundo nítida gradualmente (Fade-in lento)
    setTimeout(() => {
        bgArt.classList.add("fade-in-bg");
    }, 100);

    // 2. O título surge logo a seguir no centro
    setTimeout(() => {
        gameTitle.classList.add("fade-in-title");
    }, 1500);

    // 3. O botão de play centralizado aparece por fim
    setTimeout(() => {
        playTrigger.classList.add("show-btn");
    }, 3000);

    // Redirecionamento para a tela 2 ao clicar
    playTrigger.addEventListener("click", () => {
        window.location.href = "menu.html";
    });
});