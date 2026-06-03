perguntas = {
    //fase 1: Deus e a Criação
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

    //fase 2: Imortalidade da Alma e Reencarnação
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

    //fase 3: Pluralidade dos Mundos e Obsessão
    'A Terra é o único planeta habitado no universo?':[
        'Não, os diferentes mundos do universo servem de habitação para Espíritos em diferentes graus de evolução.',
        'Sim, a Terra é o centro do universo e a única criação com vida inteligente.',
        'Não, mas os outros planetas só têm vida microscópica e sem inteligência.',
        'Sim, porque os Espíritos só conseguem sobreviver na atmosfera da Terra.',
        
    'O que é a obsessão espiritual?':[
        'O domínio que alguns Espíritos inferiores conseguem exercer sobre certas pessoas.',
        'Uma doença mental causada exclusivamente por fatores genéticos e biológicos.',
        'Um castigo divino enviado para testar a fé dos pecadores.',
        'feitiço feito com objetos materiais que prende um Espírito a alguémComo podemos prevenir ou curar a obsessão?',
         'Através da reforma íntima, da prática do bem, da prece e da fluidoterapia (passes)',
         'Comprando amuletos de proteção e realizando rituais com sacrifício de animais.
         'Isolando a pessoa afetada do convívio social para sempre numa sala escura.'
         'Pagando a um médium para que ele destrua o Espírito obsessor.',
    ],
};

class Game {
    constructor(nbr_players, game_theme, game_level) {
        this.players = Player(game_level)[nbr_players];
        this.theme = game_theme;
        this.level = game_level;
    }

    phase( ) {

    }
    loop(phase_nbr) {

    }
}

class Player {
    constructor(player_level) {
        this.name = 'default';

        this.point_temporal = player_level * 3;
        this.point_material = player_level;
        this.point_moral = player_level;
    }
}

console.log('...-')