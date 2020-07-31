var buttonColours = ['red', 'blue', 'green', 'yellow']
var gamePattern = []
var userClickedPattern = []
var started = false;
var level = 0;
// Next Squence

function nextSequence(){
    userClickedPattern = [];

    level++;
    $('#level-title').text('level ' + level);    
    var randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    // flash butttons
    $("#" + randomChosenColour).fadeOut(250).fadeIn(250);
    // play sound 
    playSound(randomChosenColour);
}   

// click buttons (user clicks)
$('.btn').click(function(){
    var userChosenColour = $(this).attr('id')
    userClickedPattern.push(userChosenColour)

    // make button flash
    animatePress(userChosenColour)
    playSound(userChosenColour)
    checkAnswer(userClickedPattern.length - 1)

})

// sounds
function playSound(name){
    var audio = new Audio('./sounds/' + name + ".mp3")
    audio.play();

}

   
// animation 
function animatePress(currentColor){
    $('#' + currentColor).addClass('pressed')

    setTimeout(function(){
    $('#' + currentColor).removeClass('pressed')
    }, 100)
}

// detect when a keyboard key has been pressed

$(document).keypress(function(){
    if (!started){
        nextSequence()
        $('h1').text('Level ' + level)
        started = true

    }
})

// check answer

function checkAnswer(currentLevel){
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]){
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function(){
                nextSequence()
            }, 1000)
        }
    }else{
        playSound('wrong')
        $('body').addClass('game-over')

        setTimeout(function(){
        $('body').removeClass('game-over')

        },200)
        $('h1').text("Game Over, Press Any key to Restart");
        startOver()
    }
}


// gane over
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}