let leftPlayer = document.querySelector(".left-player");
let rightPlayer = document.querySelector(".right-player");
let container = document.querySelector(".main-container");
let ball = document.querySelector(".ball");

let playersHeight = rightPlayer.clientHeight;
let playersWidth = rightPlayer.clientWidth;
let containerHeight = container.clientHeight;
let containerWidth = container.clientWidth;
let passo = (containerHeight - playersHeight) / 10;

var currentRightYPos = 0;
var currentLeftYPos = 0;

let ballPositionX = parseFloat(getComputedStyle(ball).left);
let ballPositionY = parseFloat(getComputedStyle(ball).top);
let ballSize = ball.clientHeight;

window.addEventListener('keydown', (event) => {

    if (event.key === "ArrowUp" && Math.round(currentRightYPos) > 0) {
        rightPlayer.style.top = ((currentRightYPos - passo) + "px")
        currentRightYPos = currentRightYPos - passo;
    }

    if (event.key === "ArrowDown") {
        currentRightYPos = Math.min(currentRightYPos + passo, containerHeight - playersHeight);
        rightPlayer.style.top = `${currentRightYPos}px`;
    }

    if (event.key === "q" && Math.round(currentLeftYPos) > 0) {
        leftPlayer.style.top = ((currentLeftYPos - passo) + "px")
        currentLeftYPos = currentLeftYPos - passo;
    }

    if (event.key === "a") {
        currentLeftYPos = Math.min(currentLeftYPos + passo, containerHeight - playersHeight);
        leftPlayer.style.top = `${currentLeftYPos}px`;
    }

})

let dx = Math.random() * 3;
let dy = Math.random() * 5;

function animateBall() {

    ballPositionX = ballPositionX + dx;
    ballPositionY = ballPositionY + dy;

    if (isCollidingWithPlayer(rightPlayer) || isCollidingWithPlayer(leftPlayer)) {
        dx = -dx;
    }

    if (ballPositionX < 0) {
        ballPositionX = 0;
        dx = -dx;
    }

    if (ballPositionY < 0) {
        ballPositionY = 0;
        dy = -dy;
    }

    if (ballPositionX > (containerWidth - ballSize)) {
        ballPositionX = containerWidth - ballSize;
        dx = -dx;
    }

    if (ballPositionY > containerHeight - ballSize) {
        ballPositionY = containerHeight - ballSize;
        dy = -dy;
    }

    ball.style.top = `${ballPositionY}px`;
    ball.style.left = `${ballPositionX}px`;

    requestAnimationFrame(animateBall);
}

function isCollidingWithPlayer(player) {

    const playerPosition = getComputedStyle(player);
    const playerTop = parseFloat(playerPosition.top);
    const playerLeft = parseFloat(playerPosition.left);

    return (
        ballPositionX < (playerLeft + playersWidth) &&
        (ballPositionX + ballSize) > playerLeft &&
        (ballPositionY + ballSize) > playerTop &&
        ballPositionY < (playerTop + playersHeight)
    );
}

animateBall();