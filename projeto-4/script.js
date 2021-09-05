// dados
let gameArea = {
    a1:'',a2:'',a3:'',
    b1:'',b2:'x',b3:'',
    c1:'o',c2:'',c3:'',
};

let player = '';
let warning = '';
let playing = false;

reset()
// events

document.querySelector('.reset').addEventListener('click', reset);
document.querySelectorAll('.item').forEach(item =>{
    item.addEventListener('click', itemClick);
})

//funtions

function itemClick(event){
    let item = event.target.getAttribute('data-item');
    if (playing && gameArea[item] === ''){
        gameArea[item] = player;
        renderGameArea();
        turnPlayer()
    }
}

function reset(){
    warning = '';

    let random = Math.floor(Math.random() * 2);
    player = (random ===0) ? 'x' : 'o';

    for(let i in gameArea){
        gameArea[i]='';
    };

    playing = true;

    renderGameArea();
    renderInfo();
}

function renderGameArea(){
    for (let i in gameArea){
        let item = document.querySelector(`div[data-item=${i}]`)
        if(gameArea[i] != ''){
            item.innerHTML = gameArea[i]
        } else{
            item.innerHTML = '';
        }
    }

    checkGame()
}

function renderInfo(){
    document.querySelector('.vez').innerHTML =player
    document.querySelector('.resultado').innerHTML = warning;
}

function turnPlayer(){
    player = (player === 'x') ? 'o' : 'x';
    renderInfo();
}

function checkGame(){
    if (checkWinnerFor('x')){
        warning = 'O "x" Venceu';
        playing = false;
    } else if(checkWinnerFor('o')){
        warning = 'O "o" Venceu'
        playing = false;
    } else if(full()){
        warning = 'Deu Empate';
        playing = false ; 
    }
}
function checkWinnerFor(player){
    let winPos = [
        'a1,a2,a3',
        'b1,b2,b3',
        'c1,c2,c3',

        'a1,b1,c1',
        'a2,b2,c2',
        'a3,b3,c3',

        'a1,b2,c3',
        'a3,b2,c1',
    ]

    for(let w in winPos){
        let posArray = winPos[w].split(',') 
        let  hasWon = posArray.every((option)=>{
            if(gameArea[option]=== player){
                return true
            }else {
                return false
            }
        })
        if(hasWon){
            return true
        }
    }

    return false
}
function full(){
    for(let i in gameArea){
        if(gameArea[i]===''){
            return false
        }
    }
    return true
}