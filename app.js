score = 0;
cross = true;

audio = new Audio('music.mp3');
AudioGameOver = new Audio("GameOver.mp3");
setTimeout(() => {
    audio.play();
}, 1000);

document.onkeydown = function(e) {
    console.log("Key Code is: ", e.keyCode)
    if (e.keyCode == 38) {
        monkey = document.querySelector('.monkey');
        monkey.classList.add('animateMonkey');
        setTimeout(() => {
            monkey.classList.remove('animateMonkey');
        }, 700);
    }
    if (e.keyCode == 39) {
        monkey = document.querySelector('.monkey');
        monkeyX = parseInt(window.getComputedStyle(monkey, null).getPropertyValue('left'));
        monkey.style.left = monkeyX + 112 + "px";
    }
    if (e.keyCode == 37) {
        monkey = document.querySelector('.monkey');
        monkeyX = parseInt(window.getComputedStyle(monkey, null).getPropertyValue('left'));
        monkey.style.left = (monkeyX - 112) + "px";
    }
}

setInterval(() => {
    monkey = document.querySelector('.monkey');
    gameOver = document.querySelector('.gameOver');
    tiger = document.querySelector('.tiger');

    mx = parseInt(window.getComputedStyle(monkey, null).getPropertyValue('left'));
    my = parseInt(window.getComputedStyle(monkey, null).getPropertyValue('top'));

    tx = parseInt(window.getComputedStyle(tiger, null).getPropertyValue('left'));
    ty = parseInt(window.getComputedStyle(tiger, null).getPropertyValue('top'));

    offsetX = Math.abs(mx - tx);
    offsetY = Math.abs(my - ty);
    // console.log(offsetX, offsetY);

    // Game over condition
    if (offsetX < 121 && offsetY < 72) {
        gameOver.innerHTML = "Game Over";
        tiger.classList.remove('tigerAnimation');
        // monkey.classList.remove('animateMonkey');
        AudioGameOver.play();
        setTimeout(() => {
            AudioGameOver.pause();
            audio.pause();
        }, 1000);
    }
    // False so Updating score 
    else if (offsetX < 145 && cross) {
        score += 1;
        UpdateScore(score);
        cross = false; //first time agr hogya toh false 
        setTimeout(() => {
            cross = true; //1s bad firse true ho jaega otherwise score will not update
        }, 1000);
        setTimeout(() => {
            aniDur = parseFloat(window.getComputedStyle(tiger, null).getPropertyValue('animation-duration'));
            newDur = aniDur - 0.1;
            tiger.style.animationDuration = newDur + 's';
            console.log("New animation:", newDur);
        }, 500);

    }
}, 10);

function UpdateScore(score) {
    ScoreCount.innerHTML = "Your Score: " + score;
}