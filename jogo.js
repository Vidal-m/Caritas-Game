// --- BANCO DE DADOS DE QUESTÕES FILOSÓFICAS ---
const fase1 = {
    'O que é Deus?': ['É a inteligência suprema, causa primária de todas as coisas.', 'Um conjunto de deuses que governam o universo.', 'Uma força da natureza criada pela mente humana coletiva.', 'Um homem ancião que vive sentado num trono cósmico.'],
    'Como Deus criou o Universo?': ['Pela Sua vontade, utilizando o fluido cósmico universal.', 'Num processo físico que durou exatamente seis dias de 24 horas.', 'Através de um acidente químico sem qualquer planeamento.', 'Moldando cada planeta com as próprias mãos.']
};

const fase2 = {
    'O que acontece à alma após a morte do corpo?': ['Retorna ao mundo espiritual, conservando a sua individualidade.', 'É julgada imediatamente e enviada para um inferno eterno.', 'Desintegra-se completamente junto com as células do cérebro.', 'Entra num estado de sono eterno até ao fim dos tempos.'],
    'Qual é o objetivo da reencarnação?': ['Permitir o progresso moral e intelectual do Espírito.', 'Cumprir um ciclo obrigatório de sete vidas na Terra.', 'Permitir que o ser humano encarne em animais ou plantas.', 'Apenas um castigo cósmico sem evolução real.']
};

const fase3 = {
    'A Terra é o único planeta habitado?': ['Não, os mundos servem de habitação para Espíritos em várias evoluções.', 'Sim, a Terra é o centro e única criação com vida inteligente.', 'Não, mas os outros planetas só têm vida microscópica.', 'Sim, a vida fora da terra é uma impossibilidade espiritual.'],
    'O que é a obsessão espiritual?': ['O domínio que alguns Espíritos inferiores exercem sobre certas pessoas.', 'Uma doença mental causada exclusivamente por fatores biológicos.', 'Um feitiço feito com objetos materiais que prende o espírito.', 'Um mito antigo sem fundamentos na realidade prática.']
};

const game_fases = [fase1, fase2, fase3];

// --- CLASSE DO JOGADOR ESPIRITUAL ---
class Player {
    constructor(id) {
        this.id = id;
        this.name = `Player ${id}`;
        this.point_temporal = 3;  
        this.point_material = 1;  
        this.point_moral = 1;     
        this.fase_atual = 1;
        this.index_pergunta = 0;
        this.status_final = null; 

        // 🖼️ Foto Dinâmica Retangular baseada no número do jogador (Ex: player1.png, player2.png)
        this.foto = `assets/player${id}.png`; 
    }

    obterPergunta() {
        let banco = game_fases[this.fase_atual - 1];
        let chaves = Object.keys(banco);
        
        if (this.index_pergunta >= chaves.length) this.index_pergunta = 0;
        
        let qText = chaves[this.index_pergunta];
        let alternativas = [...banco[qText]];
        let correta = alternativas[0];

        // Embaralha as alternativas para o desafio do utilizador
        alternativas.sort(() => Math.random() - 0.5);

        return { texto: qText, opcoes: alternativas, certa: correta };
    }
}

// --- MOTOR DE CONTROLO DO TABULEIRO ---
document.addEventListener("DOMContentLoaded", () => {
    const totalJogadores = parseInt(localStorage.getItem("caritas_total_jogadores") || "3", 10);
    const painelJogadores = document.getElementById("painel-jogadores");
    const caixaPergunta = document.getElementById("caixa-pergunta");
    const textoPergunta = document.getElementById("texto-pergunta");
    const painelOpcoes = document.getElementById("painel-opcoes");
    const contadorFase = document.getElementById("fase-contador");
    const gridAlternativas = document.getElementById("grid-alternativas");

    let listaJogadores = [];
    for (let i = 1; i <= totalJogadores; i++) {
        listaJogadores.push(new Player(i));
    }

    let jogadorAtualIndex = 0;
    let perguntaAtualValida = null;

    // Injeção de HTML respeitando a nova estrutura de imagem total (sangrada)
    function construirCards() {
        painelJogadores.innerHTML = "";
        listaJogadores.forEach(p => {
            const card = document.createElement("div");
            card.className = "player-card";
            card.id = `card-p${p.id}`;
            
            card.innerHTML = `
                <div class="avatar-placeholder">
                    <img src="${p.foto}" alt="${p.name}">
                </div>
                
                <div class="player-info-block">
                    <div class="player-name">${p.name}</div>
                    <div class="player-bars">
                        <div class="bar-container">
                            <span class="bar-label">⏳ Tempo</span>
                            <div class="bar-bg"><div class="bar-fill fill-temporal" id="bar-temp-${p.id}"></div></div>
                        </div>
                        
                        <div class="bar-container">
                            <span class="bar-label">⚖️ Orgulho</span>
                            <div class="bar-bg"><div class="bar-fill fill-moral" id="bar-mor-${p.id}"></div></div>
                        </div>

                        <div class="bar-container">
                            <span class="bar-label">📦 Matéria</span>
                            <div class="bar-bg"><div class="bar-fill fill-material" id="bar-mat-${p.id}"></div></div>
                        </div>
                        
                    </div>
                </div>
            `;
            painelJogadores.appendChild(card);
        });
    }

    function renderizarTurno() {
        let jog = listaJogadores[jogadorAtualIndex];

        // Validação: se o espírito atual ficou sem tempo, pula o seu turno
        if (jog.point_temporal <= 0 || jog.status_final) {
            passarTurno();
            return;
        }

        // Restaura e limpa a tela para a fase de Destaque inicial
        painelOpcoes.classList.add("hidden");
        caixaPergunta.classList.remove("no-topo");
        painelJogadores.classList.remove("hidden");

        contadorFase.textContent = `Fase ${jog.fase_atual}`;
        
        // Atualiza a barra gráfica e as classes CSS de ampliação (.active)
        listaJogadores.forEach((p, idx) => {
            const card = document.getElementById(`card-p${p.id}`);
            if (!card) return;

            card.className = "player-card";

            // Transforma os pontos inteiros (0 a 3) em percentagem gráfica real para o CSS
            document.getElementById(`bar-temp-${p.id}`).style.width = `${(p.point_temporal / 3) * 100}%`;
            document.getElementById(`bar-mat-${p.id}`).style.width = `${p.point_material * 100}%`;
            document.getElementById(`bar-mor-${p.id}`).style.width = `${p.point_moral * 100}%`;

            if (p.point_temporal <= 0 || p.status_final) {
                card.classList.add("dead");
            } else if (idx === jogadorAtualIndex) {
                card.classList.add("active"); // Destaca e dá zoom ao player da vez
            }
        });

        perguntaAtualValida = jog.obterPergunta();
        textoPergunta.textContent = `Pergunta para o ${jog.name}`;
    }

    // Evento de Clique no Balão Inferior: Transita para a grelha de alternativas 2x2
    caixaPergunta.addEventListener("click", () => {
        if (painelOpcoes.classList.contains("hidden")) {
            painelJogadores.classList.add("hidden");
            caixaPergunta.classList.add("no-topo");
            
            textoPergunta.textContent = perguntaAtualValida.texto;
            const botoes = gridAlternativas.querySelectorAll(".option-btn");
            botoes.forEach((btn, idx) => {
                btn.textContent = perguntaAtualValida.opcoes[idx];
            });

            painelOpcoes.classList.remove("hidden");
        }
    });

    // Mapeamento dos cliques nos botões de resposta
    gridAlternativas.querySelectorAll(".option-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            let escolha = btn.textContent;
            let acertou = (escolha === perguntaAtualValida.certa);
            processarEscolha(acertou); 
        });
    });

    function processarEscolha(acertou) {
        let jog = listaJogadores[jogadorAtualIndex];
        
        jog.point_temporal--;
        jog.index_pergunta++;

        // --- SISTEMA DE REGRAS ESPIRITUAIS ---
        if (jog.fase_atual === 1) {
            if (acertou) {
                jog.point_material = 0; // Libertou-se da matéria!
                jog.fase_atual = 2; 
            } else {
                jog.point_material = 1; 
            }
        } 
        else if (jog.fase_atual === 2) {
            if (acertou) {
                jog.point_moral = 0; // Venceu o orgulho!
                if (jog.point_temporal === 1) jog.fase_atual = 3; 
            } else {
                jog.point_material = 1; 
                jog.fase_atual = 1; // Queda espiritual (Volta ao início)
            }
        } 
        else if (jog.fase_atual === 3) {
            jog.status_final = acertou ? "Colonia" : "Umbral";
            exibirDesfecho(jog);
            return;
        }

        // Se o tempo chegou ao fim sem purificação -> Umbral direto
        if (jog.point_temporal === 0 && !jog.status_final) {
            jog.status_final = "Umbral";
            exibirDesfecho(jog);
            return;
        }

        passarTurno();
    }

    function passarTurno() {
        let ativos = listaJogadores.filter(p => p.point_temporal > 0 && !p.status_final);
        if (ativos.length === 0) {
            alert("Partida terminada! Todos os espíritos concluíram o seu ciclo terrestre.");
            window.location.href = "index.html";
            return;
        }
        jogadorAtualIndex = (jogadorAtualIndex + 1) % listaJogadores.length;
        renderizarTurno();
    }

    function exibirDesfecho(jogador) {
        const modal = document.getElementById("end-screen");
        const title = document.getElementById("end-title");
        const desc = document.getElementById("end-desc");
        const btn = document.getElementById("btn-modal-action");

        modal.style.display = "flex";
        if (jogador.status_final === "Colonia") {
            title.innerText = `✨ ${jogador.name} Ascendeu!`;
            desc.innerText = "Parabéns! Libertaste-te das ilusões terrenas e purificaste o teu orgulho moral a tempo. Foste acolhido numa colónia de luz.";
        } else {
            title.innerText = `🌑 ${jogador.name} foi para o Umbral...`;
            desc.innerText = "O teu tempo de encarnação esgotou-se antes que te desapegasses da matéria ou do orgulho. Foste atraído pelas zonas densas.";
        }

        btn.onclick = () => {
            modal.style.display = "none";
            passarTurno();
        };
    }

    // Inicialização da Partida
    construirCards();
    renderizarTurno();
});