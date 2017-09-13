var dogApiRoot = "https://dog.ceo";
var breeds = [];

var correctCount = 0;
var incorrectCount = 0;

var correctOrIncorrect;

function getRandomBreed() {
    return breeds[Math.floor(Math.random()*breeds.length)];
}

function answered(correct) {
    // Take off .correct & .incorrect
    clearCorrectIncorrectClass();
    
    // Update UI & counts
    if (correct) {
        correctOrIncorrect.addClass("correct");
        correctOrIncorrect.text("Correct!");

        correctCount++;
    }
    else {
        correctOrIncorrect.addClass("incorrect");
        correctOrIncorrect.text("Incorrect!");              
        
        incorrectCount++;
    }
    
    updateScore();   
}

function addWrongAnswer(answers) {
    while(true) {
        var newBreed = getRandomBreed();

        if (answers.includes(newBreed)) {
            continue;
        }

        var answer = {
            breed: newBreed,
            correct: false
        }

        answers.push(answer);
        return;
    }
}

function clearCorrectIncorrectClass() {
    correctOrIncorrect.removeClass("correct");
    correctOrIncorrect.removeClass("incorrect");
}

function generateAnswers(correct) {
    var answers = [];
    
    answers.push({
        breed: correct,
        correct: true
    });

    addWrongAnswer(answers);
    addWrongAnswer(answers);
    addWrongAnswer(answers);

    answers.shuffle();

    return answers;
}

function updateScore() {
    $("#score").text(`${correctCount}/${incorrectCount}`);
}

function showAnswers(answers, breed) {
    $("#answers-container").empty();

    $.each(answers, (key, value) => {
        var answerElement = $(`<button class="answer-button">${value.breed}</button>`);

        if (value.correct) {
            answerElement.click(() => answered(true));
        }
        else {
            answerElement.click(() => answered(false));
        }

        var answerButton = $("#answers-container").append(answerElement);
    });
}

function newDog() {
    var breed = getRandomBreed();

    $.get(dogApiRoot + `/api/breed/${breed}/images/random`, (data) => {
        var imageUrl = data.message;
        $("#img-dog").attr("src", imageUrl);

        showAnswers(generateAnswers(breed));
    });
}

$(document).ready(() => {
    correctOrIncorrect = $("#correct-or-incorrect");
    
    $.get(dogApiRoot + "/api/breeds/list", (data) => {
        breeds = data.message;

        newDog();
    });
});