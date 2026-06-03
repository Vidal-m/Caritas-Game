// Banco de Dados das Questões (Estrutura idêntica à tua original)
const fase1 = {
    'O que é Deus?': ['É a inteligência suprema, causa primária de todas as coisas.', 'Um conjunto de deuses que governam diferentes partes do universo.', 'Uma força da natureza criada pela mente humana coletiva.', 'Um homem com barba que vive sentado num trono no céu.'],
    'Como Deus criou o Universo?': ['Pela Sua vontade, utilizando o fluido cósmico universal para criar a matéria.', 'Num processo físico que durou exatamente seis dias terrestres de 24 horas.', 'Através de um acidente químico cósmico sem qualquer planeamento.', 'Moldando cada planeta individualmente com as próprias mãos.']
};

const fase2 = {
    'O que acontece à alma após a morte do corpo físico?': ['Retorna ao mundo espiritual, conservando a sua individualidade e o seu progresso.', 'É julgada imediatamente e enviada para um inferno de fogo eterno.', 'Desintegra-se completamente junto com as células do cérebro.', 'Entra num estado de sono eterno até ao fim dos tempos.'],
    'Qual é o objetivo da reencarnação?': ['Permitir a expiação de erros passados e o progresso moral e intelectual do Espírito.', 'Cumprir um ciclo obrigatório de exatamente sete vidas na Terra.', 'Permitir que o ser humano se transforme em animais ou plantas.']
};

const fase3 = {
    'A Terra é o único planeta habitado no universo?': ['Não, os diferentes mundos do universo servem de habitação para Espíritos em diferentes graus de evolução.', 'Sim, a Terra é o centro do universo e a única criação com vida inteligente.', 'Não, mas os outros planetas só têm vida microscópica e sem inteligência.'],
    'O que é a obsessão espiritual?': ['O domínio que alguns Espíritos inferiores conseguem exercer sobre certas pessoas.', 'Uma doença mental causada exclusivamente por fatores genéticos e biológicos.', 'Um feitiço feito com objetos materiais que prende um Espírito a alguém.']
};

const game_fases = [fase1, fase2, fase3];

class Player {
    constructor(id) {
        this.name = `Jogador ${id}`;
        this.point_temporal = 3;  
        this.point_material = 1;  
        this.point_moral = 1;     
        this.fase_atual = 1;
        this.index_pergunta = 0;
        this.status_final = null; // 'Colonia' ou 'Umbral'
    }

    obterPergunta() {
        let banco = game_fases[this.fase_atual - 1];
        let chaves = Object.keys(banco);
        
        if (this.index_pergunta >= chaves.length) this.index_pergunta = 0;
        
        let qText = chaves[this.index_pergunta];
        let alternativas = [...banco[qText]];
        let correta = alternativas[0];

        // Embaralha alternativas de forma simples para o jogador ter o desafio
        alternativas.sort(() => Math.random() - 0.5);

        return { texto: qText, opcoes: alternativas, certa: correta };
    }
}

document.addEventListener("DOMContentLoaded", () => {
    // Carrega dados configurados da Tela 2
    const totalJogadores = parseInt(localStorage.getItem("caritas_total_jogadores") || "3", 10);
    
    let listaJogadores = [];
    for (let i = 1; i <= totalJogadores; i++) {
        listaJogadores.push(new Player(i));
    }

    let jogadorAtualIndex = 0;

    function renderizarTurno() {
        let jog = listaJogadores[jogadorAtualIndex];

        // Verifica se o jogador já encerrou a sua linha temporal
        if (jog.point_temporal <= 0 || jog.status_final) {
            passarTurno();
            return;
        }

        // Atualiza elementos do painel HUD (Cálculo em percentagem para as barras de status)
        document.getElementById("player-name").innerText = jog.name;
        document.getElementById("layer-indicator").innerText = jog.fase_atual;
        document.getElementById("bar-temp").style.width = `${(jog.point_temporal / 3) * 100}%`;
        document.getElementById("bar-mat").style.width = `${jog.point_material * 100}%`;
        document.getElementById("bar-mor").style.width = `${jog.point_moral * 100}%`;

        // Carrega questão individual
        let qInfo = jog.obterPergunta();
        document.getElementById("question-text").innerText = qInfo.texto;

        const optionsBox = document.getElementById("options-box");
        optionsBox.innerHTML = "";

        qInfo.opcoes.forEach(alt => {
            let btn = document.createElement("button");
            btn.className = "option-btn";
            btn.innerText = alt;
            btn.addEventListener("click", () => processarEscolha(alt === qInfo.certa));
            optionsBox.appendChild(btn);
        });
    }

    function processarEscolha(acertou) {
        let jog = listaJogadores[jogadorAtualIndex];
        
        jog.point_temporal--;
        jog.index_pergunta++;

        // --- MOTOR DE REGRAS ESPIRITUAIS ---
        if (jog.fase_atual === 1) {
            if (acertou) {
                jog.point_material = 0;
                jog.fase_atual = 2; // Avança de camada
            } else {
                jog.point_material = 1; // Reacumula peso
            }
        } 
        else if (jog.fase_atual === 2) {
            if (acertou) {
                jog.point_moral = 0;
                if (jog.point_temporal === 1) jog.fase_atual = 3; // Preparado para o desfecho
            } else {
                jog.point_material = 1; 
                jog.fase_atual = 1; // Queda espiritual
            }
        } 
        else if (jog.fase_atual === 3) {
            jog.status_final = acertou ? "Colonia" : "Umbral";
            exibirDesfecho(jog);
            return;
        }

        // Se o tempo acabar e ele não atingiu a fase 3 com acerto definitivo
        if (jog.point_temporal === 0 && !jog.status_final) {
            jog.status_final = "Umbral";
            exibirDesfecho(jog);
            return;
        }

        passarTurno();
    }

    function passarTurno() {
        // Verifica se ainda resta algum jogador ativo com tempo
        let ativos = listaJogadores.filter(p => p.point_temporal > 0 && !p.status_final);
        if (ativos.length === 0) {
            return; // Fim total de jogo tratado pelos modais individuais
        }

        jogadorAtualIndex = (jogadorAtualIndex + 1) % listaJogadores.length;
        renderizarTurno();
    }

    function exibirDesfecho(jogador) {
        const modal = document.getElementById("end-screen");
        const title = document.getElementById("end-title");
        const desc = document.getElementById("end-desc");

        modal.style.display = "flex";
        if (jogador.status_final === "Colonia") {
            title.innerText = `✨ ${jogador.name} Ascendeu! ✨`;
            desc.innerText = "Parabéns! Conseguiste libertar-te das amarras do orgulho e do materialismo a tempo. Foste recebido por mentores em uma colónia espiritual de transição.";
        } else {
            title.innerText = `🌑 ${jogador.name} Desencarnou em Dívida... 🌑`;
            desc.innerText = "O tempo esgotou-se. O peso da matéria ou as ilusões do orgulho retiveram a tua vibração numa frequência densa. A tua jornada recomeçará nas zonas de refugo do Umbral.";
        }
    }

    // Inicializa a primeira rodada
    renderizarTurno();
});