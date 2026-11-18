// --- BANCO DE DADOS DE QUESTÕES FILOSÓFICAS ---
const fase1 = {
    'Na história assistida, qual era o principal problema que o supervisor enfrentava no início do dia na fazenda?': [
        'Havia muito trabalho a ser feito e pouquíssima gente disposta.',
        'Os trabalhadores chegaram todos atrasados e exigiram um salário maior.',
        'As ferramentas de trabalho haviam desaparecido do depósito da fazenda.',
        'O tempo mudou subitamente e impediu a realização da colheita.'
    ]
};

const fase2 = {
    'Como se comportou o trabalhador que foi chamado mas alegava estar sempre esperando o momento certo?': [
        'Acabou adiando sucessivamente e não aproveitou a oportunidade daquele momento.',
        'Trabalhou com afinco assim que o supervisor lhe deu uma nova ferramenta.',
        'Decidiu ajudar os colegas mais velhos nas tarefas mais pesadas da colheita.',
        'Foi promovido a supervisor após demonstrar grande paciência e cautela.'
    ]
};

const fase3 = {
    'Qual foi o critério utilizado pelo supervisor para definir a recompensa dos trabalhadores no final?': [
        'A disposição em servir e responder ao chamado, independentemente de terem chegado mais cedo ou mais tarde.',
        'A quantidade exata de horas acumuladas de trabalho pesado debaixo do sol.',
        'O nível de experiência técnica e o currículo profissional apresentado na contratação.',
        'A quantidade de ferramentas que cada um conseguiu carregar para o campo.'
    ]
};

// 🌟 TEXTOS DE INTRODUÇÃO DA CARIDADE PARA CADA FASE
// 🌟 TEXTOS DE INTRODUÇÃO DA CARIDADE PARA CADA FASE (VERSÃO RESUMIDA)
const introsCaridade = {
    1: "O campo está pronto e a colheita chama por vós. Mas dizei-me: quem de vós está realmente disposto a servir, e quem aguarda o momento perfeito? Vamos testar a vossa verdadeira disposição para o trabalho no bem!",
    2: "O dia avança e a seara exige braços firmes. Vimos os que chegam cedo, os que debatem teorias e os que hesitam. Quem foram os operários que compreenderam o verdadeiro valor da oportunidade? O discernimento vos guiará.",
    3: "Chegastes ao termo desta lavoura. A última hora chegou, e com ela o acerto de contas. Não conta apenas o tempo que passastes, mas a vossa disposição de responder ao chamado. A vossa prova final começa agora!"
};

let rodadaAtual = 1; // Começa na fase 1 (fases são 1, 2 e 3)

class Player {
    constructor(id) {
        this.id = id;
        this.name = `Player ${id}`;
        this.point_temporal = 3;
        this.fase_atual = 1;
        this.index_pergunta = 0;
        this.status_final = null;
        // Estado das barras: 'vicio' | 'purificado' | 'agravado'
        this.estado_material = 'vicio';
        this.estado_moral = 'vicio';
        this.atualizarFoto(0);
    }

    atualizarFoto(index) {
        const allPhotos = [
            "0_f1.png",     // 0: Inicial
            "1_f1_+m.png",  // 1: Errou a primeira pergunta
            "1_f2.png",     // 2: Acertou a primeira
            "2_f2_+o.png",  // 3: Errou a segunda pergunta
            "2_f3.png",     // 4: Acertou a segunda
            "3_end_1.png",  // 5: Desfecho COLÓNIA
            "3_end_2.png"   // 6: Desfecho UMBRAL
        ];
        this.foto = `assets/p${this.id}/${allPhotos[index]}`;
    }

    obterPergunta(rodada) {
        const bancos = [fase1, fase2, fase3];
        const banco = bancos[rodada - 1];
        const chaves = Object.keys(banco);
        const chave = chaves[this.id - 1];
        const opcoes = banco[chave];
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

    function classeBarraMoral(estado) {
        if (estado === 'purificado') return 'fill-virtude';
        if (estado === 'agravado')   return 'fill-moral-agravado';
        return 'fill-moral'; // vicio base
    }

    function classeBarraMaterial(estado) {
        if (estado === 'purificado') return 'fill-virtude';
        if (estado === 'agravado')   return 'fill-material-agravado';
        return 'fill-material'; // vicio base
    }

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
                            <div class="bar-bg"><div class="bar-fill ${p.point_temporal === 0 ? 'fill-temporal-vazio' : 'fill-temporal'}" style="width: ${p.point_temporal === 0 ? 100 : (p.point_temporal/3)*100}%"></div></div>
                        </div>
                        <div class="bar-container">
                            <span class="bar-label">${p.estado_moral === 'purificado' ? '✨ Humildade' : '⚖️ Orgulho'}</span>
                            <div class="bar-bg"><div class="bar-fill ${classeBarraMoral(p.estado_moral)}" style="width: 100%"></div></div>
                        </div>
                        <div class="bar-container">
                            <span class="bar-label">${p.estado_material === 'purificado' ? '🌿 Desapego' : '📦 Matéria'}</span>
                            <div class="bar-bg"><div class="bar-fill ${classeBarraMaterial(p.estado_material)}" style="width: 100%"></div></div>
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

        // --- CONTROLO SE A RODADA GLOBAL AVANÇOU ---
        // A rodada sobe quando TODOS os jogadores responderam ao mesmo número de perguntas.
        // Usa index_pergunta (quantas já respondeu), não a fase interna de cada um.
        let novaRodada = obterRodadaGlobal();

        if (novaRodada > rodadaAtual) {
            rodadaAtual = novaRodada;
            contadorFase.textContent = `Rodada ${rodadaAtual}`;

            verificarEMostrarIntroCaridade(
                rodadaAtual,
                () => continuarRenderizacaoTurno(jog)
            );

            return;
        }

        continuarRenderizacaoTurno(jog);
    }

    // Retorna a rodada global: o mínimo de perguntas respondidas entre todos os jogadores ativos.
    // "Todos responderam N perguntas" → rodada N+1 começa.
    // Limitado a 3 porque o jogo tem 3 rodadas.
    function obterRodadaGlobal() {
        let ativos = listaJogadores.filter(
            p => p.point_temporal > 0 && !p.status_final
        );

        if (ativos.length === 0)
            return rodadaAtual; // Ninguém ativo, não avança

        // +1 porque index_pergunta é quantas já respondeu; a próxima rodada é essa + 1
        let minimoRespondido = Math.min(...ativos.map(p => p.index_pergunta));
        return Math.min(minimoRespondido + 1, 3);
    }

    function continuarRenderizacaoTurno(jog) {
        construirCards();

        // Remove destaques anteriores e aplica ao card do jogador atual
        document.querySelectorAll(".player-card").forEach(c => c.classList.remove("active"));
        const cardAtivo = document.getElementById(`card-p${jog.id}`);
        if (cardAtivo) cardAtivo.classList.add("active");

        // Prepara as perguntas na interface
        let dadosPerg = jog.obterPergunta(rodadaAtual);
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
            
            // 1. Cria uma cópia do array para não alterar a ordem original no banco
            let opcoesBaralhadas = [...perguntaAtualValida.opcoes];
            
            // 2. Baralha a cópia usando o algoritmo Fisher-Yates
            for (let i = opcoesBaralhadas.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [opcoesBaralhadas[i], opcoesBaralhadas[j]] = [opcoesBaralhadas[j], opcoesBaralhadas[i]];
            }

            const botoes = gridAlternativas.querySelectorAll(".option-btn");
            botoes.forEach((btn, idx) => {
                // 3. Usa o array baralhado em vez do original
                let textoOpcao = opcoesBaralhadas[idx];
                btn.textContent = textoOpcao ? textoOpcao : "";
                
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

        // --- SISTEMA DE REGRAS ESPIRITUAIS ---
        if (jog.fase_atual === 1) {
            if (acertou) {
                jog.estado_material = 'purificado'; // Matéria vira dourada
                jog.fase_atual = 2;
                jog.atualizarFoto(2);
            } else {
                // Apego material agrava-se (só se ainda não purificado)
                if (jog.estado_material !== 'purificado') {
                    jog.estado_material = 'agravado';
                }
                jog.atualizarFoto(1);
            }
        }
        else if (jog.fase_atual === 2) {
            if (acertou) {
                jog.estado_moral = 'purificado'; // Orgulho vira dourado
                jog.fase_atual = 3;
                jog.atualizarFoto(4);
            } else {
                // Orgulho agrava-se mesmo que matéria já esteja purificada
                jog.estado_moral = 'agravado';
                jog.fase_atual = 1; // Recua
                jog.atualizarFoto(3);
            }
        }
        else if (jog.fase_atual === 3) {
            if (acertou) {
                // Só ascende quem acertou todas — chegou aqui com ambas purificadas
                jog.status_final = "Colonia";
                jog.atualizarFoto(5);
            } else {
                // Errou a final: sem tempo para resgatar as faltas
                jog.estado_moral = 'agravado';
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
        let ativos = listaJogadores.filter(p => !p.status_final && p.point_temporal > 0);
        if (ativos.length === 0) {
            alert("Partida terminada! Todos os espíritos concluíram a sua transição.");
            window.location.href = "index.html";
            return;
        }
        // Avança para o próximo índice, saltando jogadores já terminados
        do {
            jogadorAtualIndex = (jogadorAtualIndex + 1) % listaJogadores.length;
        } while (listaJogadores[jogadorAtualIndex].status_final || listaJogadores[jogadorAtualIndex].point_temporal <= 0);
        
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

    // 🔥 INICIALIZAÇÃO DO JOGO: Dispara a Intro da Rodada 1 automaticamente
    contadorFase.textContent = `Rodada ${rodadaAtual}`;
    verificarEMostrarIntroCaridade(rodadaAtual, () => {
        renderizarTurno();
    });
});