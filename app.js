const noun = document.getElementById('noun');
const startGameBtn = document.getElementById('start-game');

//Get all buttons
const allButtons = document.querySelectorAll('.counterBtn');

//Get score and round display
const score = document.getElementById('score');
const round = document.getElementById('round');

//Game complete screen
const gameFinishedInfoBox = document.getElementById('gameWon'); 
const gameFinishedInfoBackground = document.getElementById('cover');
const finalText = document.getElementById('gameWonText');
const confirmFinal = document.getElementById('gameWonConfirm');

// Noun Object and its counter
const nounAndCounter = [
    {noun: 'Teachers', counter: '분'}, 
    {noun: 'Pencils', counter: '자루'}, 
    {noun: 'Bananas', counter: '송이'}, 
    {noun: 'Bottles of water', counter: '병'}, 
    {noun: 'Cups of coffee', counter: '잔'},
    {noun: 'Dogs', counter: '마리'},
    {noun: 'Phones', counter: '대'},
    {noun: 'Bowls of soup', counter: '그릇'},
    {noun: 'Children', counter: '명'},
    {noun: 'Pieces of Cake', counter: '조각'},
    {noun: 'Flowers', counter: '송이'},
    {noun: 'Pairs of shoes', counter: '켤레'}, 
    {noun: 'Bags of apples', counter: '봉지'},
    {noun: 'Pair of socks', counter: '켤레'}
];

// Event Listeners
startGameBtn.addEventListener('click', startGame);
confirmFinal.addEventListener('click', gameFinishConfirm);

//Initialize game score & round
let gameScore = 0;
let roundNumber = 0;

// If round = 0 -> Starts game, calls game function and changes button text
function startGame(){
    if(roundNumber == 0 && startGameBtn.innerHTML == 'Start Game'){
        roundNumber++;
        round.innerHTML = roundNumber;
        startGameBtn.innerHTML = 'Reset';
        randomNoun()
    } else {
        reset();
    }
}

// Resets noun, score, round, button text
function reset(){
    startGameBtn.innerHTML = 'Start Game';
    gameScore = 0;
    roundNumber = 0;
    round.innerHTML = '0';
    score.innerHTML = '0';
    noun.textContent = '';
}

//Displays a random noun
function randomNoun(){
    const randomNumber = Math.floor(Math.random() * nounAndCounter.length);
    const word = nounAndCounter[randomNumber].noun;
    return noun.textContent = word;
}

allButtons.forEach(button => {
    button.addEventListener('click', (answer)=>{
        roundNumber++;
        round.innerHTML = roundNumber;
        for(let i = 0; i < nounAndCounter.length; i++){
            if(answer.target.textContent === nounAndCounter[i].counter && nounAndCounter[i].noun == noun.innerHTML){
                answer.target.style.backgroundColor = "green";
                setTimeout(()=>{ answer.target.style.backgroundColor = ""; },100);
                roundNumber == 10 ? (weScored(), gameFinish()) :  randomNoun();
                weScored();
                break;
            } else {
                answer.target.style.backgroundColor = "rgb(255, 14, 14)";
                setTimeout(()=>{ answer.target.style.backgroundColor = ""; },100);
                roundNumber == 10? gameFinish() : '';
            }
        }
    })
});


// User scored. Update score, alert the user, and clear the game. 
function weScored(){
    gameScore ++ ;
    score.innerHTML = gameScore;
    console.log('wescore: ' + gameScore)
};

function gameFinish(){
    setTimeout(()=>{  
        console.log(gameScore)
        finalText.innerHTML = `You got ${gameScore} out of 10 correct!`
        gameFinishedInfoBackground.style.display = "flex";
        gameFinishedInfoBox.style.display = "flex";
    },100)
   
};

function gameFinishConfirm(){
    gameFinishedInfoBackground.style.display = "none";
    gameFinishedInfoBox.style.display = "none";
    reset();
  }

