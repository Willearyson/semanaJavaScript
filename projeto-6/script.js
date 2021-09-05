let currentQuestion = 0;
let correctOption = 0;
showQuestion()
// events
    document.querySelector('.scoreArea button').addEventListener('click', resetEvent)

//Functions

function showQuestion(){
    if(questions[currentQuestion])  {
        let q = questions[currentQuestion];

        let pct = Math.floor((currentQuestion / questions.length) * 100);
        document.querySelector('.progress--bar').style.width = `${pct}%`;
        
        document.querySelector('.scoreArea').style.display = 'none'
        document.querySelector('.questionArea').style.display = 'block'

        document.querySelector('.question').innerHTML = q.question;
        
        let optionsHtml = '';
        for(let i in q.options){
            optionsHtml += `<div data-op="${i}" class="option"><span>${parseInt(i)+ 1}</span>${q.options [i]}</div>`
        }
        document.querySelector('.options').innerHTML = optionsHtml;

         document.querySelectorAll('.options .option').forEach(item =>{
            item.addEventListener('click', markOptionEvent)
         });

    }else{
        finishQuiz()
    }
}

function markOptionEvent(e){
    let clickedOptions = parseInt(e.target.getAttribute('data-op'));

    if(questions[currentQuestion].answer === clickedOptions){
        correctOption++;
    }
    
    currentQuestion++;
    showQuestion();
}
function finishQuiz(){
    let points = Math.floor((correctOption / questions.length) * 100);

    if(points < 30){
        document.querySelector('.scoreText1').innerHTML = 'Estude mais';
        document.querySelector('.scorePct').style.color = 'red'
    }else if(points >= 30 && points < 70){
        document.querySelector('.scoreText1').innerHTML = 'Quase lá'
        document.querySelector('.scorePct').style.color = 'yellow'
    }else if(points >= 70 && points === 100){
        document.querySelector('.scoreText1').innerHTML = 'Parabéns'
        document.querySelector('.scorePct').style.color = 'green'
    }


    document.querySelector('.scorePct').innerHTML = `Acertou ${points}%`;
    document.querySelector('.scoreText2').innerHTML = `você respondeu ${questions.length} questões e acertou ${correctOption}`;

    document.querySelector('.scoreArea').style.display = 'block';
    document.querySelector('.questionArea').style.display = 'none';
    document.querySelector('.progress--bar').style.width = '100%';
}

function resetEvent(){
    correctOption = 0;
    currentQuestion = 0;
    showQuestion();
}