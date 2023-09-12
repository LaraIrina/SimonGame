var gamePattern = [];
var userPattern = [];
var level = 0;
var started = false;
var colors = ["green", "red", "yellow", "blue"];

// start the game by clicking space key
$(document).keydown(function(event){
    if (event.keyCode == "32"){
        if(!started){
            nextSequence();
            started = true;
        }
    }
}) 
//Listen for button clicks and store them in array for user input pattern
$(".btn").click(function(){
    var userChosenColor = $(this).attr("id");
    playSound(userChosenColor);
    userPattern.push(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);

})

// generating a random number to choose a color
function nextSequence(){
    level +=1;
    $("h1").text("Level: " + level);

    var randomChosenNumber = Math.floor((Math.random()* 4));
    var randomChosenColor = colors[randomChosenNumber];
    gamePattern.push(randomChosenColor);

    $("#"+randomChosenColor).fadeOut(80).fadeIn(80);
    playSound(randomChosenColor);
}

// playing sound that suits the given color
function playSound(color) {
    var audio = new Audio("./sounds/" + color + ".mp3");
    audio.play();
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function () {
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
function checkAnswer(currentLevel){
    // correct user answer
    if (userPattern[currentLevel]==gamePattern[currentLevel]){
        if (userPattern.length == gamePattern.length){
            setTimeout(nextSequence,1000);
            userPattern=[];
        }
    }
    // wrong answer
    else{
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },200);
        $("h1").text("Game over, Press Space to Restart");
        restartGame();
    }
}
function restartGame(){
    level = 0;
    gamePattern = [];
    userPattern = [];
    started = false;
}
