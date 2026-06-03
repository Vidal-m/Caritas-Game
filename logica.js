//fase 1: Deus e a Criação
fase1 = {
    'O que é Deus?':[
        'É a inteligência suprema, causa primária de todas as coisas.',
        'Um conjunto de deuses que governam diferentes partes do universo.',
        'Uma força da natureza criada pela mente humana coletiva.',
        'Um homem com barba que vive sentado num trono no céu.'],

    'Como Deus criou o Universo?':[
        'Pela Sua vontade, utilizando o fluido cósmico universal para criar a matéria.',
        'Num processo físico que durou exatamente seis dias terrestres de 24 horas.',
        'Através de um acidente químico cósmico sem qualquer planeamento.',
        'Moldando cada planeta individualmente com as próprias mãos.',
    ],

    'O que são os Espíritos?':[
        'São os seres inteligentes da criação, que povoam o universo além do mundo material.',
        'Fantasmas condenados a assombrar eternamente o local da sua morte.',
        'Criaturas com asas que foram criadas perfeitas e nunca encarnam.',
        'Almas criadas apenas no momento do nascimento do corpo físico.',
    ],
}

//fase 2: Imortalidade da Alma e Reencarnação
fase2 = {
    'O que acontece à alma após a morte do corpo físico?':[
        'Retorna ao mundo espiritual, conservando a sua individualidade e o seu progresso.',
        'É julgada imediatamente e enviada para um inferno de fogo eterno.',
        'Desintegra-se completamente junto com as células do cérebro.',
        'Entra num estado de sono eterno até ao fim dos tempos.',
    ],

    ' Qual é o objetivo da reencarnação?':[
        'Permitir a expiação de erros passados e o progresso moral e intelectual do Espírito.',
        'Cumprir um ciclo obrigatório de exatamente sete vidas na Terra.',
        'Permitir que o ser humano se transforme em animais ou plantas.',
        'Castigar o Espírito, fazendo-o sofrer sem que saiba o motivo.',
    ],

    'Lembramo-nos das nossas vidas passadas enquanto estamos encarnados?':[
        'Geralmente não, pois o esquecimento temporário é necessário para focar nas provações atuais.',
        'Sim, todas as pessoas têm lembranças claras de quem foram desde a infância.',
        'Não, porque a nossa mente é apagada por anjos contra a nossa vontade.',
        'Sim, mas apenas quando alcançamos a riqueza material na vida presente.',
    ],


}

//fase 3: Pluralidade dos Mundos e Obsessão
fase3 = {
    'A Terra é o único planeta habitado no universo?':[
        'Não, os diferentes mundos do universo servem de habitação para Espíritos em diferentes graus de evolução.',
        'Sim, a Terra é o centro do universo e a única criação com vida inteligente.',
        'Não, mas os outros planetas só têm vida microscópica e sem inteligência.',
        'Sim, porque os Espíritos só conseguem sobreviver na atmosfera da Terra.',
    ],
        
    'O que é a obsessão espiritual?':[
        'O domínio que alguns Espíritos inferiores conseguem exercer sobre certas pessoas.',
        'Uma doença mental causada exclusivamente por fatores genéticos e biológicos.',
        'Um feitiço feito com objetos materiais que prende um Espírito a alguém.',
        'Um castigo divino enviado para testar a fé dos pecadores.',
    ],

    'Como podemos prevenir ou curar a obsessão?':[
        'Através da reforma íntima, da prática do bem, da prece e da fluidoterapia (passes).',
        'Comprando amuletos de proteção e realizando rituais com sacrifício de animais.',
        'Isolando a pessoa afetada do convívio social para sempre numa sala escura.',
        'Pagando a um médium para que ele destrua o Espírito obsessor.',
    ],
}

const game_fases = [fase1, fase2, fase3];

class Player {
    constructor(nome) {
        this.name = nome;
        
        // Configuração exata do Nível Base (V1)
        this.point_temporal = 3;  // 3 unidades de tempo (rodadas)
        this.point_material = 1;  // 1 unidade de peso material
        this.point_moral = 1;     // 1 unidade de orgulho
        
        this.fase_atual = 1;      // Começa na Fase 1
        
        // Histórico para controle das perguntas individuais
        this.perguntas_respondidas_por_fase = { 1: 0, 2: 0, 3: 0 };
    }
}

class Game {
    constructor(nbr_players, game_theme, game_level) {
        this.theme = game_theme;
        this.level = game_level;
        this.players = [];

        for (let i = 0; i < nbr_players; i++)
            this.players.push(new Player(`Player ${i+1}`));

        this.player_atual_index = 0;
        this.pergunta_atual_index = 0;
    }

    turn_game(){
        if (this.player_atual_index >= this.players.length) {
            // Todos os jogadores jogaram esta rodada
            this.player_atual_index = 0;
            this.pergunta_atual_index++;
        }

        // Verifica se o jogo acabou com base no nível (número de perguntas)
        if (this.pergunta_atual_index >= this.level) {
            console.log("Fim da partida! Vamos verificar o destino das almas.");
            return;
        }

        let jogador = this.players[this.player_atual_index];
        let fase_do_jogador = jogador.fase_atual; // Fase 1, 2 ou 3
        
        // Captura o banco de perguntas da fase correspondente
        let perguntas_fase = game_fases[fase_do_jogador - 1];
        let chaves_perguntas = Object.keys(perguntas_fase);
        
        // Seleciona a pergunta atual
        let pergunta_texto = chaves_perguntas[this.pergunta_atual_index];
        
        // A opção correta está sempre no índice 0 por padrão na tua estrutura
        let resposta_correta = perguntas_fase[pergunta_texto][0]; 

        console.log(`--- Turno de ${jogador.name} ---`);
        console.log(`Fase Atual: ${fase_do_jogador}`);
        console.log(`Pergunta: ${pergunta_texto}`);
        console.log(`Resposta Correta Esperada: ${resposta_correta}`);

        // Avança o index para o próximo jogador clicar no botão na interface depois
        this.player_atual_index++;
    }
}


const game = new Game(2, 'Espiritismo', 3);

game.turn_game(); // Jogador 1 - Pergunta 1
game.turn_game(); // Jogador 2 - Pergunta 1
game.turn_game(); // Jogador 1 - Pergunta 2