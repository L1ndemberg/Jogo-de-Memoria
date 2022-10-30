// Representa so a class dos elementos
const FRONT = "card_front"
const BACK = "card_back"
const CARD = "card"
const ICON = "icon"


    startGame();

    function startGame() {
        // É isso q vai pegar as cartas, e transfomar em algo visual
        initializeCards(game.createCardsFromTechs()); 
    }

    function initializeCards(cards) {
        let gameBoard = document.getElementById("gameBoard");
        gameBoard.innerHTML = '';
        game.cards.forEach(card => {

            let cardElement = document.createElement('div');
            cardElement.id = card.id;
            // No javascript nao pode usar .class! entao utiliza classList
            cardElement.classList.add(CARD);
            // Para verificar se o itens/images sao iguais
            cardElement.dataset.icon = card.icon;

            createCardContent(card, cardElement);

            cardElement.addEventListener('click', flipCard)
            // colocar a carta no tabuleiro
            gameBoard.appendChild(cardElement);

        })
    }

    function createCardContent(card, cardElement) {

        createCardFace(FRONT, card, cardElement);
        createCardFace(BACK, card, cardElement);

    }

    function createCardFace(face, card, element) {
        
        let cardElementFace = document.createElement('div');
        cardElementFace.classList.add(face);

        if (face === FRONT) {
            //  O createElement cria elementos HTML. Pode ser div, p, etc.
            let iconElement = document.createElement('img');
            iconElement.classList.add(ICON);
            iconElement.src = "images/" + card.icon + ".png";
            // O appendChild serve para inserir um elemento ao elemento pai.
            cardElementFace.appendChild(iconElement);
        } else {
            cardElementFace.innerHTML = "&lt/&gt";
        }
        // Para colocar dentro do element
        element.appendChild(cardElementFace);
}

// Para virar as cartas
function flipCard() {

    if(game.setCard(this.id)){
        
        this.classList.add("flip");
        if(game.secondCard){
        if (game.checkMatch()) {
            game.clearCards();
            if(game.checkGameOver()){
                let gameOverLayer = document.getElementById("gameOver");
                gameOverLayer.style.display = 'flex';
            }
        } else {
            setTimeout(() => {
                let firstCardView = document.getElementById(game.firstCard.id);
                let secondCardView = document.getElementById(game.secondCard.id);

                firstCardView.classList.remove('flip');
                secondCardView.classList.remove('flip');
                game.unflipCards();
            }, 1000);
        };
    }
    }
    
}

function restart() {
    game.clearCards();
    startGame();
    let gameOverLayer = document.getElementById("gameOver");
    gameOverLayer.style.display = 'none';
}
