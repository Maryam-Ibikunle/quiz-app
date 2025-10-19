const welcomePage = document.getElementById("welcome")
const gamePage = document.getElementById('game-page')
const question = document.getElementById('question')
const options = document.getElementById('options')
gamePage.style.display = 'none'
const startButton = document.getElementById("start")
startButton.addEventListener('click', asyncFunct)

async function asyncFunct(){
    welcomePage.style.display = "none"
    gamePage.style.display = "flex"
    await fetch('https://opentdb.com/api.php?amount=5')
    .then(response => response.json())
    .then(data => {
        const [a,b,c,d,e] = data.results
        const allQuestions = [a,b,c,d,e]
        for (let i=0; i<5; i++){
            showNextPage(allQuestions[i])
        }
        
        console.log(a.question)
    }
    )
    .catch(err => console.log("ERROR: ", err))}
function showNextPage(object){
        displayQuiz(object)
    // }else{
    //     showResult()
    }


function displayQuiz(object){
    question.innerHTML = object.question;
    if (object.type == "boolean"){
        boolean(object)
    }else if (object.type == "multiple"){
        multiple(object)
    }
}

function boolean(object){
    options.innerHTML = (object.correct_answer + " " + object.incorrect_answers)
}

function multiple(object){
    options. innerHTML = (object.correct_answer + " " + object.incorrect_answers)
}