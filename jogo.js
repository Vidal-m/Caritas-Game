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
    'A Terra é o único planeta habitado?': ['Não, os mundos servem de habitação para Espíritos em várias evoluções.', 'Sim, a Terra é o centro e única criação com vida inteligente.', 'Não, mas os outros planetas só têm vida microscópica.', 'Sim, a vida fora da terra é uma impossibilidade científica.']
};

// 🌟 TEXTOS DE INTRODUÇÃO DA CARIDADE PARA CADA FASE
const introsCaridade = {
    1: "Saudações, viajantes da matéria. Iniciamos a vossa jornada testando a base de toda a existência... O nada pode criar alguma coisa? Estará o homem por sua conta própria, ou existe uma inteligência suprema governando o infinito cósmico? Vamos falar sobre Deus.",
    2: "Muito bem... O tempo avança e a vossa carne desgasta-se. Entramos agora na segunda etapa da vossa encarnação. O que define quem tu és quando os batimentos param? O corpo é apenas a casca, mas o progresso pertence à Alma e à sua Evolução contínua.",
    3: "Chegastes ao limiar do tempo terreno. A grande transição aproxima-se. Olhai para além do vosso próprio umbigo: será a Terra o único grão de areia abençoado com a vida? O Universo abre as portas para a Pluralidade dos Mundos. Esta é a vossa prova final!"
};

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
        this.atualizarFoto(0); // Começa com o avatar de index 0 (Inicial)
    }

    atualizarFoto(index) {
        const allPhotos = [
            "0_f1.png",     // 0: Inicial / Antes de qualquer pergunta
            "1_f1_+m.png",  // 1: Errou a primeira pergunta
            "2_f2.png",     // 2: Acertou a primeira (Fase 2)
            "3_f2_+o.png",  // 3: Errou a segunda pergunta
            "4_f3.png",     // 4: Acertou a segunda (Fase 3 / Final)
            "5_end_1.png",  // 5: Desfecho COLÓNIA (Acertou a final)
            "6_end_2.png"   // 6: Desfecho UMBRAL (Errou a final ou sem tempo)
        ];
        this.foto = `assets/p${this.id}/${allPhotos[index]}`;
    }

    obterPergunta() {
        let listaChaves = [];
        if (this.fase_atual === 1) listaChaves = Object.keys(fase1);
        else if (this.fase_atual === 2) listaChaves = Object.keys(fase2);
        else if (this.fase_atual === 3) listaChaves = Object.keys(fase3);

        if (this.index_pergunta >= listaChaves.length) {
            this.index_pergunta = 0; 
        }
        
        let chave = listaChaves[this.index_pergunta];
        let opcoes = [];
        if (this.fase_atual === 1) opcoes = fase1[chave];
        else if (this.fase_atual === 2) opcoes = fase2[chave];
        else if (this.fase_atual === 3) opcoes = fase3[chave];

        return { pergunta: chave, opcoes: opcoes, certa: opcoes[0] };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const totalJogadores = parseInt(localStorage.getItem("caritas_total_jogadores") || "3", 10);
    const painelJogadores = document.getElementById("painel-jogadores");
    const caixaPergunta = document.getElementById("caixa-pergunta");
    const textoPergunta = document.getElementById("texto-pergunta");
    const painelOpcoes = document.getElementById("painel-opcoes");
    const contadorFase = document.getElementById("fase-contador");
    const gridAlternativas = document.getElementById("grid-alternativas");

    // Elementos da Introdução da Caridade
    const overlayIntro = document.getElementById("overlay-intro-caridade");
    const textoIntro = document.getElementById("texto-intro-caridade");
    const caixaIntroBox = document.getElementById("caixa-intro-caridade");

    let listaJogadores = [];
    for (let i = 1; i <= totalJogadores; i++) {
        listaJogadores.push(new Player(i));
    }

    let jogadorAtualIndex = 0;
    let perguntaAtualValida = null;
    let faseGlobalAtual = 1; // Controla em que rodada macro o tabuleiro se encontra
    let typewriterInterval = null;

    function construirCards() {
        painelJogadores.innerHTML = "";
        listaJogadores.forEach(p => {
            const card = document.createElement("div");
            card.className = "player-card";
            card.id = `card-p${p.id}`;
            
            if (p.status_final) {
                card.classList.add("dead");
            }

            card.innerHTML = `
                <img class="player-bg-img" src="${p.foto}" alt="${p.name}">
                
                <div class="player-info-block">
                    <div class="player-name">${p.name}</div>
                    <div class="player-bars">
                        <div class="bar-container">
                            <span class="bar-label">⏳ Tempo</span>
                            <div class="bar-bg"><div class="bar-fill fill-temporal" style="width: ${(p.point_temporal/3)*100}%"></div></div>
                        </div>
                        <div class="bar-container">
                            <span class="bar-label">⚖️ Orgulho</span>
                            <div class="bar-bg"><div class="bar-fill fill-moral" style="width: ${p.point_moral * 100}%"></div></div>
                        </div>
                        <div class="bar-container">
                            <span class="bar-label">📦 Matéria</span>
                            <div class="bar-bg"><div class="bar-fill fill-material" style="width: ${p.point_material * 100}%"></div></div>
                        </div>
                    </div>
                </div>
            `;
            painelJogadores.appendChild(card);
        });
    }

    // 🌟 FUNÇÃO QUE PROMOVE O EFEITO TYPEWRITER DA CARIDADE
    function rodarTypewriter(texto) {
        clearInterval(typewriterInterval);
        textoIntro.textContent = "";
        let i = 0;
        
        typewriterInterval = setInterval(() => {
            if (i < texto.length) {
                textoIntro.textContent += texto.charAt(i);
                i++;
            } else {
                clearInterval(typewriterInterval);
            }
        }, 30); // Velocidade da digitação (30ms por letra)
    }

    // 🌟 FUNÇÃO PARA DISPARAR A INTRODUÇÃO DA GUIA
    function verificarEMostrarIntroCaridade(faseAlvo, callback) {
        overlayIntro.classList.remove("hidden");
        rodarTypewriter(introsCaridade[faseAlvo]);

        caixaIntroBox.onclick = () => {
            clearInterval(typewriterInterval); // Para a animação se o usuário clicar antes de terminar
            overlayIntro.classList.add("hidden");
            if (callback) callback();
        };
    }

    function renderizarTurno() {
        let jog = listaJogadores[jogadorAtualIndex];

        // Se o jogador da vez já terminou o jogo, passa automaticamente
        if (jog.status_final || jog.point_temporal <= 0) {
            passarTurno();
            return;
        }

        // --- CONTROLO SE A RODADA DO TABULEIRO AVANÇOU ECONOMICAMENTE ---
        // Se o player ativo está numa fase acima da fase controlada pelo tabuleiro, atualizamos a fase global
        if (jog.fase_atual > faseGlobalAtual) {
            faseGlobalAtual = jog.fase_atual;
            contadorFase.textContent = `Fase ${faseGlobalAtual}`;
            
            // Trava o turno, mostra a Caridade e só depois renderiza a pergunta
            verificarEMostrarIntroCaridade(faseGlobalAtual, () => {
                continuarRenderizacaoTurno(jog);
            });
            return;
        }

        continuarRenderizacaoTurno(jog);
    }

    function continuarRenderizacaoTurno(jog) {
        construirCards();

        // Remove destaques anteriores e aplica ao card do jogador atual
        document.querySelectorAll(".player-card").forEach(c => c.classList.remove("active"));
        const cardAtivo = document.getElementById(`card-p${jog.id}`);
        if (cardAtivo) cardAtivo.classList.add("active");

        // Prepara as perguntas na interface
        let dadosPerg = jog.obterPergunta();
        perguntaAtualValida = dadosPerg;

        textoPergunta.textContent = `${jog.name}: ${dadosPerg.pergunta}`;
        
        // Garante que a caixa de texto volta para baixo e oculta as alternativas da jogada anterior
        caixaPergunta.classList.remove("no-topo");
        painelOpcoes.classList.add("hidden");
        painelJogadores.classList.remove("hidden");
    }

    // Transição da Pergunta para a Grelha de Respostas
    caixaPergunta.addEventListener("click", () => {
        if (painelOpcoes.classList.contains("hidden")) {
            painelJogadores.classList.add("hidden");
            caixaPergunta.classList.add("no-topo");
            
            const botoes = gridAlternativas.querySelectorAll(".option-btn");
            botoes.forEach((btn, idx) => {
                // Sorteia ou distribui as opções
                let textoOpcao = perguntaAtualValida.opcoes[idx];
                btn.textContent = textoOpcao ? textoOpcao : "";
                
                // Se o botão estiver vazio (menos de 4 opções), esconde-o
                if (btn.textContent === "") {
                    btn.style.display = "none";
                } else {
                    btn.style.display = "block";
                }
            });

            painelOpcoes.classList.remove("hidden");
        }
    });

    // Mapeia cliques nas opções da grelha
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

        // --- SISTEMA DE REGRAS ESPIRITUAIS E FLUXO DE IMAGENS ---
        if (jog.fase_atual === 1) {
            if (acertou) {
                jog.point_material = 0; 
                jog.fase_atual = 2; 
                jog.atualizarFoto(2);   
            } else {
                jog.point_material = 1;
                jog.atualizarFoto(1);   
            }
        } 
        else if (jog.fase_atual === 2) {
            if (acertou) {
                jog.point_moral = 0;    
                jog.fase_atual = 3; 
                jog.atualizarFoto(4);   
            } else {
                jog.point_material = 1; 
                jog.fase_atual = 1;      
                jog.atualizarFoto(3);   
            }
        } 
        else if (jog.fase_atual === 3) {
            if (acertou) {
                jog.status_final = "Colonia";
                jog.atualizarFoto(5);   
            } else {
                jog.status_final = "Umbral";
                jog.atualizarFoto(6);   
            }
            
            construirCards(); 
            exibirDesfecho(jog);
            return; 
        }

        if (jog.point_temporal === 0 && !jog.status_final) {
            jog.status_final = "Umbral";
            jog.atualizarFoto(6);       
            construirCards(); 
            exibirDesfecho(jog);
            return;
        }

        construirCards(); 
        passarTurno();
    }

    function passarTurno() {
        let ativos = listaJogadores.filter(p => p.point_temporal > 0 && !p.status_final);
        if (ativos.length === 0) {
            alert("Partida terminada! Todos os espíritos concluíram a sua transição.");
            window.location.href = "index.html";
            return;
        }
        jogadorAtualIndex = (jogadorAtualIndex + 1) % listaJogadores.length;
        renderizarTurno();
    }

    function exibirDesfecho(jogador) {
        const modal = document.getElementById("end-screen");
        const title = document.getElementById("end-title");
        const imgAvatar = document.getElementById("end-avatar"); 
        const desc = document.getElementById("end-desc");
        const btn = document.getElementById("btn-modal-action");

        imgAvatar.src = jogador.foto;
        imgAvatar.alt = jogador.name;

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

    // 🔥 INICIALIZAÇÃO DO JOGO: O jogo agora começa disparando a Intro da Fase 1 automaticamente!
    contadorFase.textContent = `Fase ${faseGlobalAtual}`;
    verificarEMostrarIntroCaridade(faseGlobalAtual, () => {
        renderizarTurno();
    });
});