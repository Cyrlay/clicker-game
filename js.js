let gamePattern = [];
let userClickedPattern = [];
let started = false;
let level = 0;
let downloadTimer

function countDown() {
    clearInterval(downloadTimer)
    let timeleft = 10;
    downloadTimer = setInterval(function () {
        if (timeleft <= 0) {
            clearInterval(downloadTimer);
            $("#demo").text("Game Over");
            startNextGame()
        } else {
            $("#demo").text(timeleft + " seconds remaining");
        }
        timeleft -= 1;
    }, 1000);
}

$(document).keypress(function () {
    if (!started) {
        $("#header-text").text("Level " + level);
        nextSequence();
        started = true;
    }
});

$(".btn").click(function () {

    countDown()
    let userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
});

function checkAnswer(currentLevel) {

    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function () {
                nextSequence();
            }, 500);
        }
    } else {
        playSound("wrong");
        $("body").addClass("game-over");
        $("#header-text").text("Game Over");

        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        startNextGame();
    }
}

function nextSequence() {
    let buttonColours = ["red", "blue", "green", "yellow"];
    userClickedPattern = [];
    level++;
    $("#header-text").text("Level " + level);
    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function startNextGame() {
    setTimeout(function () {
        $("#header-text").text("Press any keyboard button to Start");
    }, 2000)
    level = 0;
    gamePattern = [];
    started = false;
}
