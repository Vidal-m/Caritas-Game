// --- BANCO DE DADOS DE QUESTÕES FILOSÓFICAS ---
const fase1 = {
    'Segundo a Doutrina Espírita, qual é a verdadeira definição e extensão do conceito de "Trabalho"?': [
        'Toda ocupação útil que auxilie no progresso material ou intelectual do Espírito.',
        'Apenas a ação física direcionada à produção de bens e caridade material.',
        'Qualquer atividade remunerada ou ocupação útil que garanta a subsistência da carne.',
        'Toda ação intelectual realizada exclusivamente dentro do campo do bem espiritual.'
    ],
    'O que Deus espera do trabalhador relativamente ao seu "Campo de Trabalho" na Terra?': [
        'Ação firme no bem onde quer que a vida o coloque, e esforço contínuo na reforma interior.',
        'Dedicação exclusiva às tarefas da Casa Espírita ou isolamento das tentações do mundo.',
        'Iniciativa para ajudar o próximo e aceitação passiva das injustiças sociais do meio.',
        'Desenvolvimento da inteligência para o progresso material ou resignação diante da dor.'
    ],
    'Se o nada não pode produzir o nada, o que a harmonia do Universo nos prova sobre a Causa Primária?': [
        'A existência de uma Inteligência Suprema, e que o acaso não pode coordenar as leis da criação.',
        'Que o Universo foi moldado pelas mãos do Criador ou por forças da natureza inteligente.',
        'A presença de um Deus antropomórfico que governa o mundo e pune o erro humano.',
        'Que a matéria física evoluiu sozinha a partir do fluido universal ou da inteligência humana.'
    ],
    'Diante das imperfeições do mundo, como se caracteriza o verdadeiro Obreiro do Senhor?': [
        'Aquele que aplica as suas forças no bem e compreende que o progresso exige o esforço próprio.',
        'O Espírito iluminado que cumpre a sua missão sem enfrentar percalços ou oposição na Terra.',
        'Aquele que faz grandes doações financeiras e se isola das misérias morais da sociedade.',
        'Quem possui cargos de liderança na comunidade ou prega a palavra com grande erudição.'
    ]
};

const fase2 = {
    'Anália Franco colocava Deus no topo dos seus métodos de ensino. Como ela geria a religiosidade nas suas escolas?': [
        'Permitia auxiliares de outros matizes religiosos, mas não transigia da religiosidade dos educadores.',
        'Exigia a conversão estrita à fé espírita ou a demissão imediata de qualquer funcionário.',
        'Separava totalmente a educação técnica da moral cristã para evitar conflitos de crença.',
        'Admitia apenas educadores laicos e focava exclusivamente na moralização da juventude.'
    ],
    'Auta de Souza teve uma existência marcada por perdas e dores físicas. Qual era a sua postura diante disso?': [
        'Mesmo molestada pela doença implacável, escrevia e ensinava as primeiras noções de religião às crianças.',
        'Dedicava-se a ler histórias para velhos escravos ou isolava-se para evitar o cansaço do corpo.',
        'Reclamava da sua triste existência no campo e buscava o isolamento absoluto no sertão.',
        'Abandonou a escrita poética para se focar estritamente na cura da sua própria enfermidade.'
    ],
    'Eurípedes Barsanulfo manifestou cedo uma profunda inteligência. Que encargo recebeu ainda muito jovem?': [
        'Foi incumbido pelo seu mestre-escola de ensinar aos próprios companheiros de aula.',
        'Foi nomeado diretor do Grupo Espírita Esperança e Caridade devido à sua liderança natural.',
        'Recebeu a tarefa de psicografar mensagens de consolo para os necessitados da sua região.',
        'Foi enviado para estudar em colégios dirigidos por religiosas francesas no sertão.'
    ],
    'Em 1927, Chico Xavier ajudou a fundar o Centro Espírita Luiz Gonzaga. Qual o motivo real desta escolha?': [
        'Uma homenagem ao aviador Charles Lindbergh, que atravessou o Atlântico no Spirit of St. Louis.',
        'Uma lembrância afetuosa ao seu patrão e tesoureiro da instituição, José Felizardo.',
        'O nome do espírito mentor que ditou a primeira mensagem psicografada por Chico na cidade.',
        'Uma homenagem ao santo católico da paróquia onde o seu irmão exercia o presbiterado.'
    ],
    'Chico Xavier foi agredido, processado e preso por engano. O que o manteve firme na tarefa?': [
        'O idealismo vivo de dar o melhor de si sem exigir qualquer retribuição ou privilégio material.',
        'A promessa espiritual de que os seus inimigos seriam punidos ou convertidos em grandes amigos.',
        'O apoio financeiro do seu centro espírita e a proteção das autoridades locais da cidade.',
        'A necessidade de provar a autenticidade das obras psicografadas de autores falecidos.'
    ],
    'João Evangelista e o seu irmão Tiago aceitaram o chamado do Cristo na juventude. Qual era o plano deles?': [
        'Ir à Terra inteira, pregar o Evangelho às nações e renovar o mundo através do porvir.',
        'Abandonar a pesca no Tiberíades para construir o primeiro centro de assistência social na Galileia.',
        'Aproveitar a juventude para debater as pregações do Batista ou combater a opressão romana.',
        'Viajar pelo mundo propagando as belezas do esforço humano e as riquezas do Reino de Deus.'
    ]
};

const fase3 = {
    'Para um jovem imerso em pensamentos agressivos ou beirando a marginalidade, como a Laborterapia atua?': [
        'Estimula a concentração e a disciplina através de trabalhos manuais cujas produções são doadas.',
        'Promove debates filosóficos intensos e isolamento reflexivo para reajuste do períspirito.',
        'Oferece compensações materiais ou financeiras para desviar o foco dos vícios cotidianos.',
        'Oculta o infortúnio através de atividades artísticas de grande impacto visual e sonoro.'
    ],
    'Quando uma comunidade sofre com a fome, violência e falta de fé, qual o papel regulamentar da CFAS?': [
        'Arrecadar donativos de porta em porta e beneficiar o próprio caravaneiro no exercício da humildade.',
        'Realizar o culto do Evangelho no Lar dos assistidos e propiciar o tratamento desobsessivo direto.',
        'Promover o empréstimo sistemático de livros edificantes para combater a ignorância local.',
        'Desenvolver atividades de assistência em áreas doadas ou adquiridas estritamente para o lazer.'
    ],
    'Casos de lares conturbados, com desemprego, vícios, falta de diálogo ou obsessões ocultas recorrem a qual ação?': [
        'À Caravana Jesus no Lar, implantando o Evangelho no Lar e identificando infortúnios ocultos.',
        'Ao Posto de Assistência Espírita, focando exclusivamente na evangelização infantil da comunidade.',
        'À Campanha Humberto de Campos, através da distribuição em massa de mensagens escritas de alerta.',
        'Às atividades de Alegria Cristã, para preencher o tempo livre dos familiares com música e arte.'
    ],
    'Adolescentes que se revoltam por falta de orientação sobre as mudanças no corpo ou buscam diversão no álcool necessitam de:': [
        'Evangelização Juvenil, que acolhe e orienta o jovem a entender as transformações físicas e morais.',
        'Campanhas de Esclarecimento focadas na punição moral e no isolamento de más companhias.',
        'Aulas teóricas sobre a mediunidade na infância e o perigo imediato da obsessão cármica.',
        'Atividades manuais de laborterapia forçada para conter a impulsividade e a rebeldia da idade.'
    ],
    'Uma jovem grávida em desespero que cogita o aborto clandestino encontra amparo preventivo em qual setor?': [
        'Na Campanha em Defesa da Vida e na Evangelização, trabalhando a conscientização e o amparo moral.',
        'Na Caravana Jesus no Lar, realizando exclusivamente o tratamento desobsessivo da gestante.',
        'No Posto de Assistência Espírita, através do encaminhamento imediato para adoção internacional.',
        'Na Campanha Humberto de Campos, por meio do empréstimo de livros técnicos sobre a reencarnação.'
    ]
};

// 🌟 TEXTOS DE INTRODUÇÃO DA CARIDADE PARA CADA FASE
const introsCaridade = {
    1: "Saudações, viajantes da matéria. Iniciamos a vossa jornada testando a base de toda a existência... O nada pode criar alguma coisa? Estará o homem por sua conta própria, ou existe uma inteligência suprema governando o infinito cósmico? Vamos falar sobre Deus.",
    2: "Muito bem... O tempo avança e a vossa carne desgasta-se. Entramos agora na segunda etapa da vossa encarnação. O que define quem tu és quando os batimentos param? O corpo é apenas a casca, mas o progresso pertence à Alma e à sua Evolução contínua.",
    3: "Chegastes ao limiar do tempo terreno. A grande transição aproxima-se. Olhai para além do vosso próprio umbigo: será a Terra o único grão de areia abençoado com a vida? O Universo abre as portas para a Pluralidade dos Mundos. Esta é a vossa prova final!"
};

let rodadaAtual = 1; // Começa na fase 1 (fases são 1, 2 e 3)

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
            "1_f2.png",     // 2: Acertou a primeira (Fase 2) - CORRIGIDO
            "2_f2_+o.png",  // 3: Errou a segunda pergunta - CORRIGIDO
            "2_f3.png",     // 4: Acertou a segunda (Fase 3 / Final) - CORRIGIDO
            "3_end_1.png",  // 5: Desfecho COLÓNIA (Acertou a final) - CORRIGIDO
            "3_end_2.png"   // 6: Desfecho UMBRAL (Errou a final ou sem tempo) - CORRIGIDO
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
        let dadosPerg = jog.obterPergunta(rodadaAtual);;
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