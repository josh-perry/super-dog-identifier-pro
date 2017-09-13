var dogApiRoot = "https://dog.ceo";
var breeds = [];

function get_random_breed() {
    return breeds[Math.floor(Math.random()*breeds.length)];
}

function add_wrong_answer(answers) {
    while(true) {
        var newBreed = get_random_breed();

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

function generate_answers(correct) {
    var answers = [];
    
    answers.push({
        breed: correct,
        correct: true
    });

    add_wrong_answer(answers);
    add_wrong_answer(answers);
    add_wrong_answer(answers);

    answers.shuffle();

    return answers;
}

function show_answers(answers, breed) {
    $("#answers-container").empty();

    $.each(answers, (key, value) => {
        var answerElement = $(`<button class="answer-button">${value.breed}</button>`);

        if (value.correct) {
            answerElement.click(() => {
                console.log("correct!!");
            });
        }
        else {
            answerElement.click(() => {
                console.log("incorrect!!");
            });
        }

        var answerButton = $("#answers-container").append(answerElement);
    });
}

function new_dog() {
    var breed = get_random_breed();

    $.get(dogApiRoot + `/api/breed/${breed}/images/random`, (data) => {
        var imageUrl = data.message;
        $("#img-dog").attr("src", imageUrl);

        show_answers(generate_answers(breed));
    });
}

$(document).ready(() => {
    $.get(dogApiRoot + "/api/breeds/list", (data) => {
        breeds = data.message;

        new_dog();
    });
});