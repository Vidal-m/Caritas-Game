// --- BANCO DE DADOS DAS QUESTÕES PERFEITO ---
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

// --- MODELO DO JOGADOR (Faltava este bloco!) ---
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
    }

    obterPergunta() {
        let banco = game_fases[this.fase_atual - 1];
        let chaves = Object.keys(banco);
        
        if (this.index_pergunta >= chaves.length) this.index_pergunta = 0;
        
        let qText = chaves[this.index_pergunta];
        let alternativas = [...banco[qText]];
        let correta = alternativas[0];

        // Embaralha as opções para o desafio ser real
        alternativas.sort(() => Math.random() - 0.5);

        return { texto: qText, opcoes: alternativas, certa: correta };
    }
}

// --- GESTÃO DA INTERFACE E FLUXO ---
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

    // Constrói os cards dos jogadores dinamicamente no HTML
    function construirCards() {
        painelJogadores.innerHTML = "";
        listaJogadores.forEach(p => {
            const card = document.createElement("div");
            card.className = "player-card";
            card.id = `card-p${p.id}`;
            
            card.innerHTML = `
                <div class="avatar-placeholder">
                    <img src="assets/player1/image_a44d0a.jpg" alt="${p.name}">
                </div>
                <div class="player-name">${p.name}</div>
                <div class="player-bars">
                    <div class="bar-container">
                        <span class="bar-label">⏳ Tempo</span>
                        <div class="bar-bg"><div class="bar-fill fill-temporal" id="bar-temp-${p.id}"></div></div>
                    </div>
                    <div class="bar-container">
                        <span class="bar-label">📦 Matéria</span>
                        <div class="bar-bg"><div class="bar-fill fill-material" id="bar-mat-${p.id}"></div></div>
                    </div>
                    <div class="bar-container">
                        <span class="bar-label">⚖️ Orgulho</span>
                        <div class="bar-bg"><div class="bar-fill fill-moral" id="bar-mor-${p.id}"></div></div>
                    </div>
                </div>
            `;
            painelJogadores.appendChild(card);
        });
    }

    function renderizarTurno() {
        let jog = listaJogadores[jogadorAtualIndex];

        // Se o jogador atual já encerrou a linha do tempo, salta o turno dele
        if (jog.point_temporal <= 0 || jog.status_final) {
            passarTurno();
            return;
        }

        // Restaura estados visuais para o início de cada turno
        painelOpcoes.classList.add("hidden");
        caixaPergunta.classList.remove("no-topo");
        painelJogadores.classList.remove("hidden");

        contadorFase.textContent = `Fase ${jog.fase_atual}`;
        
        // Atualiza as classes de Destaque e o preenchimento das barras
        listaJogadores.forEach((p, idx) => {
            const card = document.getElementById(`card-p${p.id}`);
            if (!card) return;

            card.className = "player-card";

            // Atualiza larguras das barras baseadas nas variáveis numéricas do jogador
            document.getElementById(`bar-temp-${p.id}`).style.width = `${(p.point_temporal / 3) * 100}%`;
            document.getElementById(`bar-mat-${p.id}`).style.width = `${p.point_material * 100}%`;
            document.getElementById(`bar-mor-${p.id}`).style.width = `${p.point_moral * 100}%`;

            if (p.point_temporal <= 0 || p.status_final) {
                card.classList.add("dead");
            } else if (idx === jogadorAtualIndex) {
                card.classList.add("active"); // Zoom no player da vez!
            }
        });

        // Prepara a pergunta direcionada
        perguntaAtualValida = jog.obterPergunta();
        textoPergunta.textContent = `Pergunta para o ${jog.name}`;
    }

    // Transição: Clicar no balão inferior oculta perfis e abre a grelha 2x2
    caixaPergunta.addEventListener("click", () => {
        if (painelOpcoes.classList.contains("hidden")) {
            painelJogadores.classList.add("hidden");
            caixaPergunta.classList.add("no-topo");
            
            // Injeta o texto nos 4 botões
            textoPergunta.textContent = perguntaAtualValida.texto;
            const botoes = gridAlternativas.querySelectorAll(".option-btn");
            botoes.forEach((btn, idx) => {
                btn.textContent = perguntaAtualValida.opcoes[idx];
            });

            painelOpcoes.classList.remove("hidden");
        }
    });

    // Mapeia cliques nas alternativas
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

        // Regras de Evolução Espiritual
        if (jog.fase_atual === 1) {
            if (acertou) {
                jog.point_material = 0; // Desapegou da matéria!
                jog.fase_atual = 2; 
            } else {
                jog.point_material = 1; 
            }
        } 
        else if (jog.fase_atual === 2) {
            if (acertou) {
                jog.point_moral = 0; // Desapegou do orgulho!
                if (jog.point_temporal === 1) jog.fase_atual = 3; 
            } else {
                jog.point_material = 1; 
                jog.fase_atual = 1; // Queda moral
            }
        } 
        else if (jog.fase_atual === 3) {
            jog.status_final = acertou ? "Colonia" : "Umbral";
            exibirDesfecho(jog);
            return;
        }

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
            alert("Fim da Partida! Todos os espíritos concluíram o tempo de encarnação.");
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
            desc.innerText = "Libertaste-te das amarras materiais e do orgulho moral a tempo. Foste recebido numa colónia de transição.";
        } else {
            title.innerText = `🌑 ${jogador.name} foi para o Umbral...`;
            desc.innerText = "O teu tempo esgotou-se antes de purificares a matéria ou o orgulho. A tua vibração reteve-te nas zonas densas.";
        }

        btn.onclick = () => {
            modal.style.display = "none";
            passarTurno();
        };
    }

    // Inicialização Absoluta
    construirCards();
    renderizarTurno();
});