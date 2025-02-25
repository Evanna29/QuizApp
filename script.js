let questions = [
    {
        "question":"Wer hat HTML erfunden?",
        "answer_1":"Robbie Williams",
        "answer_2":"Lady Gaga",
        "answer_3":"Tim Berners-Lee",
        "answer_4":"Justin Bieber",
        "right_answer":3
    },
    {
        "question":"Was bedeutet das HTML Tag &lt;a&gt;?",
        "answer_1":"Text Fett",
        "answer_2":"LContainer",
        "answer_3":"Ein Link",
        "answer_4":"Kursiv",
        "right_answer":3
    },
    {
        "question":"Wie bindet man eine Website in eine Website ein?",
        "answer_1":"&lt;iframe&gt;, &lt;frame&gt;, and &lt;frameset&gt;",
        "answer_2":"&lt;iframe&gt;",
        "answer_3":"&lt;frame&gt;",
        "answer_4":"&lt;frameset&gt;",
        "right_answer":2
    },
    {
        "question":"Wie definiert man in JavaScript eine Variable?",
        "answer_1":"let 100 = rate;",
        "answer_2":"100= let rate;",
        "answer_3":"rate = 100;",
        "answer_4":"let rate = 100;",
        "right_answer":4
    }
];




// when the pade loads
function init() {
    // we get the number of all questions
    document.getElementById("all-questions").innerHTML = questions.length;
    // show the first question
    showQuestion();

}

function showQuestion(){
    //when the current question number is equal to the maximum amount of questions
    if(gameIsOver()){
        showEndScreen();
    }
    //when we did not reach the last question
    else { 
        updateProgressBar();
        updateToNextQuestion();
    }
}

let currentQuestion = 0;
let correctAnswerCounter = 0;
let AUDIO_SUCCESS = new Audio('./assets/audio/success.mp3');
let AUDIO_FAIL = new Audio('./assets/audio/wrong.mp3');

//when the current question number is equal to the maximum amount of questions
function gameIsOver(){
    return currentQuestion >= questions.length;
}

//when we answered all the question
function showEndScreen(){
    // we wrote "display:none" originally to the section which shows the end screen, we remove that
    document.getElementById("end-screen").style = "";
    //we put "display:none" to the section of main question card to make that disappear
    document.getElementById("question-body").style = "display:none";
    //maximal number of questions
    document.getElementById("all-questions-result").innerHTML = questions.length;
    //the amount of question which was correctly answered
    document.getElementById("result").innerHTML = correctAnswerCounter;
    //we change the picture from main picture to the endscreen picture
    document.getElementById("header-img").src = "./assets/img/win.png"
}

//linked from bootstrap
function updateProgressBar(){
    //we divide the actual question number with the maximal number of questions - we needed to add 1 to current question as it was 0
    let percent = (currentQuestion+1) / questions.length;
    //to get the exact percentage, we need to multiply by 100 and then to round it, not to get decimal numbers
    percent = Math.round(percent * 100);
    //the percentage number should be written in the progress bar
    document.getElementById("progress-bar").innerHTML = `${percent} %`;
    //the bootstrap bar width should be changed according to the percentage
    document.getElementById("progress-bar").style.width = `${percent}%`;
}


function updateToNextQuestion(){
    
    let question = questions[currentQuestion];
    //we write here the question here, reaching the question part from the object
    document.getElementById("question-text").innerHTML = question["question"];
    //we grab each answers and list them
    document.getElementById("answer_1").innerHTML = question["answer_1"]
    document.getElementById("answer_2").innerHTML = question["answer_2"]
    document.getElementById("answer_3").innerHTML = question["answer_3"]
    document.getElementById("answer_4").innerHTML = question["answer_4"];
    //it show at which question we are at the moment
    document.getElementById("selected-question").innerHTML = currentQuestion + 1;
}



function answer(selection){
    //as it is an array with more object inside, one question should be highlighted, currentQuestion starts at 0, which contains the whole object
    let question = questions[currentQuestion];
    //selection is the parameter, which is given the answer id (answer_1, answer_2) as an argument, when this function is called
    //we save the last character (the number) of selection, into a variable (it will be only a number)
    let selectedQuestionNum = selection.slice(-1)
    //as the right answer is a number, we create the id of the answer from that number adding the string "answer_"
    let idOfRightAnswer = `answer_${question["right_answer"]}`;
    //if the chosen answer number is the same as the right answer number
    if(rightAnswerSelected(selectedQuestionNum, question)){
        //we change the background-color of the parent element to green
        document.getElementById(selection).parentNode.classList.add("bg-success");
        //we keep adding 1 to the counter if it is the correct answer
        correctAnswerCounter++;
        //we play the audio success
        AUDIO_SUCCESS.play();
        
    }
    else {
        //we change the background-color of the parent element to red
        document.getElementById(selection).parentNode.classList.add("bg-danger")
        //but we also show the correct answer with green
        document.getElementById(idOfRightAnswer).parentNode.classList.add("bg-success");
        //we play audio fail
        AUDIO_FAIL.play();

    }
    //when an answer is clicked, the button should be enabled - originally in html it is disabled
    document.getElementById("next-btn").disabled = false;
}

    //if the chosen answer number is the same as the right answer number
function rightAnswerSelected(selectedQuestionNum, question){
    return selectedQuestionNum == question["right_answer"];
}



function nextQuestion(){
    //we increase the question number
    currentQuestion++; // von 0 auf 1
    //show the next question or endscreen if it was the last one
    showQuestion();
    //we should again disable the next button
    document.getElementById("next-btn").disabled = true;
    //we set back the background-colors of the buttons
    resetAnswerButtons();
    // changeQuestionNr();
    
}

//we remove the background-colors from the buttons for the next question
function resetAnswerButtons(){
//we remove the class not from the actual element, but from its parent element
    document.getElementById('answer_1').parentNode.classList.remove("bg-danger")
    document.getElementById('answer_2').parentNode.classList.remove("bg-danger")
    document.getElementById('answer_3').parentNode.classList.remove("bg-danger")
    document.getElementById('answer_4').parentNode.classList.remove("bg-danger")

    document.getElementById('answer_1').parentNode.classList.remove("bg-success")
    document.getElementById('answer_2').parentNode.classList.remove("bg-success")
    document.getElementById('answer_3').parentNode.classList.remove("bg-success")
    document.getElementById('answer_4').parentNode.classList.remove("bg-success")
}

function restartGame(){
    //we change back the header image
    document.getElementById("header-img").src = "./assets/img/pencil.jpg";
    //we remove the endscreen
    document.getElementById("end-screen").style = "display:none"; //Endscreen ausblenden
    //we make the question body again appear
    document.getElementById("question-body").style = ""; // questionBody wieder anzeigen
    //we set back evertyhing to 0
    correctAnswerCounter = 0;
    currentQuestion = 0;
// we start again from showing the fisrt question
    init();
}

//My solution:

// in index.html id gegeben zu quiz-answer_card classElement : answer_1_card, answer-2_card usw...
// function answer(selection){
//     let rightAnswerNr=questions[currentQuestion]["right_answer"];
//     if(selection === `answer_${rightAnswerNr}`) {
//         document.getElementById(`${selection}_card`).classList.add("green-bg");
//     }
//     else {
//         document.getElementById(`${selection}_card`).classList.add("red-bg");
//     }
// }