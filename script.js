const welcomePage = document.getElementById("welcome")
const gamePage = document.getElementById('game-page')
const question = document.getElementById('question')
const optionList = document.getElementById('options')
const options = optionList.querySelectorAll("p")
const boolButton = document.getElementById("bool")
const startButton = document.getElementById("start")
const time = document.getElementById('time')
gamePage.style.display = 'none'
startButton.addEventListener('click', asyncFunct)

async function asyncFunct(){
    welcomePage.style.display = "none"
    boolButton.style.display = "none"
    optionList.style.display = "none"
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
    question.innerText = object.question;
    if (object.type == "boolean"){
        boolean(object)
    }else if (object.type == "multiple"){
        boolButton.style.display = "none"
        multiple(object)
    }
    let timeLeft = 20;
    const counter = setInterval(()=>{
        timeLeft--
        time.innerHTML = `00:${String(timeLeft).padStart(2,0)}`
        if (timeLeft <=5)
            time.style.color = "red"
        if (timeLeft == 0){
            clearInterval(counter)
            // endGame()
        }
    },1000)
}

function boolean(object){
    optionList.style.display = "none"
    boolButton.style.display = "block"
    if (object.correct_answer == "True"){
        console.log("True")
    }
}

function multiple(object){
    optionList.style.display = "block"
    const myOptions = object.incorrect_answers
    if (myOptions[0] == Array){
        myOptions.push("Bonus")
        myOptions.push("Bonus")
        myOptions.push("Bonus")
    }
    myOptions.push(object.correct_answer)
    myOptions.forEach((option, index) => {
        if (options[index])
            options[index].innerText = option
    });
 
}