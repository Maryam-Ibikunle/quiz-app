const welcomePage = document.getElementById("welcome")
const gamePage = document.getElementById('game-page')
const lastPage = document.getElementById("last-page")
const question = document.getElementById('question')
const optionList = document.getElementById('options')
const options = optionList.querySelectorAll("label")
const radios = document.querySelectorAll('input[name="option"')
const boolButton = document.getElementById("bool")
const startButton = document.getElementById("start")
const nextButton = document.querySelectorAll('.next')
const replayButton = document.getElementById("replay")
const time = document.getElementById('time')
gamePage.style.display = 'none'
let score = 0;

startButton.addEventListener('click', asyncFunct)
replayButton.addEventListener('click', ()=>{
    lastPage.style.display = "none"
    score = 0;
    document.getElementById('number').textContent = `Question 1`
    asyncFunct()
})

async function asyncFunct(){
    welcomePage.style.display = "none"
    boolButton.style.display = "none"
    optionList.style.display = "none"
    gamePage.style.display = "flex"
    await fetch('https://opentdb.com/api.php?amount=10')
    .then(response => response.json())
    .then(data => {
        const [a,b,c,d,e,f,g,h,i,j] = data.results
        const allQuestions = [a,b,c,d,e,f,g,h,i,j]
        
        showNextPage(allQuestions)
        console.log(a.question)
    }
    )
    .catch(err => console.log("ERROR: ", err))}

function showNextPage(list){
    let i = 0
    displayQuiz(list[i])
    let counter;
    let timeLeft = 20;
    counter = setInterval(()=>{
        timeLeft--
        time.innerHTML = `00:${String(timeLeft).padStart(2,0)}`
        if (timeLeft <=5)
            time.style.color = "red"
        if (timeLeft == 0){
            clearInterval(counter)
            displayScore()}
    },1000)
    
    
    nextButton.forEach((btn)=>{btn.addEventListener('click',()=>{
        console.log("index"+i)
        clearInterval(counter)
        document.getElementById('number').textContent = `Question ${i+2}`

        i++
        if (i==10)displayScore()
        if (i<list.length){
            displayQuiz(list[i])
            
            let timeLeft = 20;
            time.innerText = "00:20"
            counter = setInterval(()=>{
                timeLeft--
                time.innerText = `00:${String(timeLeft).padStart(2,0)}`
                if (timeLeft <=5)
                    time.style.color = "red"
                if (timeLeft == 0)
                    clearInterval(counter)
            },1000)
        }
        
    })})}

    
function displayQuiz(object){
    
    currentQuestion = object;
    question.innerText = object.question;
    if (object.type == "boolean"){
        optionList.style.display = "none"
        boolean(object)
    }else if (object.type == "multiple"){
        boolButton.style.display = "none"
        multiple(object)
    }   
}


function boolean(object){
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
    const index = Math.floor(Math.random()*4)
    console.log(index)
    myOptions.splice(index, 0,(object.correct_answer))
    myOptions.forEach((option, index) => {
        if (options[index])
            options[index].innerText = option
    });
}
optionList.addEventListener('change', (e) => {
    const radio = e.target;
    if(radio.name !== "option") return;
    const label = document.querySelector(`label[for="${radio.id}"]`);
    if(!label) return;
    const selected = label.textContent;
    if(selected === currentQuestion.correct_answer){
        score++;
    }else{
        document.getElementById("correct").style.color = "red"
        document.getElementById("correct").style.fontWeight = "bold"
        document.getElementById("correct").innerText = currentQuestion.correct_answer
    }
    console.log("score:", score);
    console.log("Selected:", selected);
    console.log("Correct answer:", currentQuestion.correct_answer);
    
});

function displayScore(){
    welcomePage.style.display = "none"
    gamePage.style.display = "none"
    lastPage.style.display = "flex"
    lastPage.style.flexDirection = "column"
    document.getElementById("score").textContent = `${score}/10`

}