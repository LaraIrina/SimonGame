var gamePattern = [];
var userPattern = [];

var level = 0;
var started = false;

var colors = ["green", "red", "yellow", "blue"];

//start the game by clicking space key
$(".btn.start").click(function () {
        if (!started) {
            setTimeout(function(){
                nextSequence();
                started = true;
                $(".btn.start").hide();
                $("h2.press-info").hide();
            },200);
    }
});

//Listen for button clicks and store them in array for user input pattern
$(".btn").click(function () {
    if (!($(this).attr("id") === $(".btn.start").attr("id"))){
        var userChosenColor = $(this).attr("id");
        userPattern.push(userChosenColor);
    
        playSound(userChosenColor);
        animatePress(userChosenColor);
    
         checkAnswer(userPattern.length - 1);
    }
    
})
function checkAnswer(currentLevel) {
    // correct user answer
    if (userPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userPattern.length === gamePattern.length) {
            setTimeout(function(){
                nextSequence()}, 1000);
        }
    }
    // wrong answer
    else {
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("h1").text("Game over, Press Play to Restart");
        $(".btn.start").show();
        restartGame();
    }
}

// generating a random number to choose a color
function nextSequence() {
    userPattern = [];
    level += 1;
    $("h1").text("Level: " + level);

    var randomChosenNumber = Math.floor((Math.random() * 4));
    var randomChosenColor = colors[randomChosenNumber];
    gamePattern.push(randomChosenColor);

    $("#" + randomChosenColor).fadeOut(80).fadeIn(80);
    playSound(randomChosenColor);
}

// playing sound that suits the given color
function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}

function animatePress(currentColor) {
    $("#" + currentColor).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColor).removeClass("pressed");
    }, 100);
}

function restartGame() {
    level = 0;
    gamePattern = [];
    started = false;
}
