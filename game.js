let game = {

    lockMode: false,
    firstCard: null,
    secondCard: null,
    
    techs: ['bootstrap',
             'css',
             'electron',
             'firebase',
             'html',
             'javascript',
             'jquery',
             'mongo',
             'node',
             'react'],

    cards: null,

    setCard: function (id) {
        let card = this.cards.filter(card => card.id === id)[0];

        if (card.flipped || this.lockMode){
            return false;
        }

        if(!this.firstCard) {
            this.firstCard = card;
            this.firstCard.flipped = true;
            return true;
        } else {
            this.secondCard = card;
            this.secondCard.flipped = true;
            this.lockMode = true;
            return true;
        }
    },

    checkMatch: function() {
        if (!this.firstCard || !this.secondCard) {
            return false;
        }
        return this.firstCard.icon === this.secondCard.icon;
    },

    clearCards: function () {
        this.firstCard = null;
        this.secondCard = null;
        this.lockMode = false;
    },
    unflipCards(){
        this.firstCard.flipped = false;
        this.secondCard.flipped = false;
        this.clearCards();
    },

    checkGameOver(){
        return this.cards.filter(card=>!card.flipped). length == 0;
    },


    // Transfomou a funçao em um metodo(Antes era uma function)
    createCardsFromTechs: function () {
    // Virou this porque é as cartas do objeto de cima
    this.cards = [];
    this.techs.forEach((tech) => {
        this.cards.push(this.createPairFromTech(tech));
    })
    this.cards = this.cards.flatMap(pair => pair);
    this.shuffleCards();
    // return this.cards;
},

    createPairFromTech:function (tech) {

    return [{
        // Tras um valor aleatorio
        id: this.createIdWithTech(tech),
        icon: tech,
        // Fala se a carta esta virada ou nao
        flipped: false,
    }, { 
        id: this.createIdWithTech(tech),
        icon: tech,
        flipped: false,
    }]
},

// Esse vai ser o id
    createIdWithTech:function (tech){
    return tech + parseInt(Math.random() *1000);
},


    shuffleCards: function (cards) {
        // Para pegar o ultimo index
        let currentIndex = this.cards.length;
        let randomIndex = 0;

    while (currentIndex !== 0) {
        // So pega cartas que ainda nao foram embaralharadas
        // uma vez que voce pegou uma, voce vai para ondurationchange, por isso o currentIndex
        // pegando o random de 0 ate 1; ate o currentIndex, e pagando o floor disso ai. Sempre o elemento anterior
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;

        // Ele inverte os valores
        [this.cards[randomIndex], this.cards[currentIndex]] = [this.cards[currentIndex], this.cards[randomIndex]]
        }
    }

 }

