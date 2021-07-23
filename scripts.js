var time = 60;
var questIndex = 0;
var score =0;
var timer;

//borrowed randomizer
function randomize(array) {
    var currentIndex = array.length,  randomIndex;
  
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

var question = [
    {
        title: "Which of the following function of Array object joins all elements of an array into a string?",
        choices:["concat()","pop()","map()","join()"],
        answer: "join()"
    },
    {
        title: "Which of the following function of Array object adds and/or removes elements from an array?",
        choices:["toSource()","sort()","splice()","unshift()"],
        answer: "splice()"
    },
    {
        title: "Which of the following type of variable takes precedence over other if names are same?",
        choices:["global variable","local variable","Both of the above","None of the above"],
        answer: "local variable"
    },
    {
        title: "What is the HTML tag under which one can write the JavaScript code?",
        choices:["javascript","scripted","script","js"],
        answer: "script"
    },
];

question = randomize(question);

var showQuestions = function() {
    var questionCurrent = question[questIndex];

    var template = `
        <div class="card text-white bg-primary mb-3" style="max-width: 20rem;">
            <div class="card-header">${questionCurrent.title}</div>
            <div class="card-body">
                <h4 class="card-title">Question Choices, Pick One</h4>
                <p class="card-text choice">${questionCurrent.choices[0]}</p>
                <p class="card-text choice">${questionCurrent.choices[1]}</p>
                <p class="card-text choice">${questionCurrent.choices[2]}</p>
                <p class="card-text choice">${questionCurrent.choices[3]}</p>
            </div>
        </div>
    `;

    document.querySelector(".quiz-elements").innerHTML = template;

    document.querySelector(".card-body").addEventListener("click",function(event) {
        if (event.target.className.indexOf("choice") > -1) {
            //see if the chice is corewct
            if (event.target.textContent === questionCurrent.answer) {
                score++;
                document.querySelector("#score").textContent = score;
            } else {
                time -= 5;
            }

            //show next question
            questIndex++;``
            
             if (questIndex >= question.length) {
                endQuiz();
            } else {
                showQuestions();
            }
        
        }
    })
}

document.querySelector(".start-elements button").addEventListener("click", function() {
    //show quizcontainer
    document.querySelector(".quiz-elements").classList.remove("hide");
    //hide the start elements
    document.querySelector(".start-elements").classList.add("hide");
    //start the timer
    timer = setInterval(function() {
        time --;
        document.querySelector("#time").textContent = time;
        if (time <= 0) {
            endQuiz();
        }
    }, 1000);
    //show the first question
    showQuestions();
});

var endQuiz = function() {
    //show end container
    document.querySelector(".end-form-container").classList.remove("hide");

    //hide quiz stuiff
    document.querySelector(".quiz-elements").classList.add("hide");
    
    //stop timer
    clearInterval(timer);
}

document.querySelector(".end-form-container ").addEventListener("submit", function(e) {
    e.preventDefault();

    //grab user 
    var user = document.querySelector("#username").value;

    //get the local data if it exits
    var oldData = JSON.parse(localStorage.getItem("score")) || [];

    //create new data entry
    var newData = {
        score: score,
        user: user
    }

    //update data copy
    oldData.push(newData)
    var updatedData = oldData;
    
    //set score data
    localStorage.setItem('score', JSON.stringify(updatedData));

    //to go end page
    return window.location.assign('end.html');
   // if (questIndex >= question.length){

    //}
})