var dogApiRoot = "https://dog.ceo";
var breeds = [];

function get_random_breed() {
    return breeds[Math.floor(Math.random()*breeds.length)];
}

function add_wrong_answer(answers) {
    while(true) {
        var newBreed = get_random_breed();

        if(answers.includes(newBreed)) {
            continue;
        }

        answers.push(newBreed);
        return;
    }
}

function generate_answers(correct) {
    var answers = [];
    
    answers.push(correct);

    add_wrong_answer(answers);
    add_wrong_answer(answers);
    add_wrong_answer(answers);

    answers.shuffle();

    return answers;
}

function show_answers(answers, breed) {
    $("#answers-container").empty();

    $.each(answers, (key, value) => {
        var answer = `<li><button>${value}</button></li>`

        $("#answers-container").append(answer);
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

        $("#new-dog").click(() => {
            new_dog();
        });
    });
});