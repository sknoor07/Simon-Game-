var bcolor=["red","blue","green","yellow"];
var userSequence=[];
var gameSequqnce=[];
var level=0;
var started=false;

$(document).keydown(function(event){
    if(event.key==="a" && !started){
        started=true;
        startSequence();
    }
});

function startSequence(){
    if(started===true){
        userSequence=[];
        level++;
        $("#level-title").text("Level "+level);
        var ranNum= Math.floor(Math.random()*4)+1;
        var colour= bcolor[ranNum-1];
        gameSequqnce.push(colour);
        $("#"+colour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
        playSound(colour);
    }
}

$(".btn").click(function(){
    var userColour=$(this).attr("id");
    userSequence.push(userColour);
    playSound(userColour);
    animateColor(userColour);
    checkAnswer(userSequence.length-1);
});

function checkAnswer(currentLevel){
    if(userSequence[currentLevel]===gameSequqnce[currentLevel]){
        if(userSequence.length===gameSequqnce.length){
            setTimeout(function(){
                startSequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("#level-title").text("Game Over, Press A to Restart");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");
        },500);
        resetgame();
    }
}


function playSound(name){
    var audio = new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animateColor(colour){
    $("#"+colour).addClass("pressed");
    setTimeout(function(){
        $("#"+colour).removeClass("pressed");
    },100);
}

function resetgame(){
    level=0;
    gameSequqnce=[];
    started=false;
}
