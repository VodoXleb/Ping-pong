var GAME = {
    width: 500,
    height: 500,
    background: "#F5F0E1",
}
//создаём мячик
var BALL = {
    color: "#FF6E40",
    x: 100,
    y: 80,
    size: 20,
    xDirection: 3,
    yDirection: 5,
}

var RACKET = {
    color: "#1E3D59",
    x: 0,
    y: 450,
    width: 100,
    height: 20,
    speed: 5,
    score: 0,
}

//готовим инструменты
var canvas = document.getElementById("canvas");
var canvasWidth = GAME.width;
var canvasHeight = GAME.height;
canvas.width = canvasWidth;
canvas.height = canvasHeight;
var canvasContext = canvas.getContext("2d");
canvasContext.fillStyle= "#F5F0E1";
canvasContext.fillRect(0,0,canvasWidth,canvasHeight);
initEventsListeners();
play(); //вызываем функцию перелистывания кадров

//Функция перелистывания кадров
function play(){
    drawFrame(); //рисуем мячик
    updateBall(BALL, RACKET); //обновляем позицию мячика
    requestAnimationFrame(play); //просим браузер повторить тоже самое на следующем кадре
}

//функция рисования кадра
function drawFrame() {
    canvasContext.clearRect(0, 0, canvasWidth, canvasHeight);
    drawBackground();
    drawBall(BALL);
    drawRacket(RACKET);
    drawRacketScore(RACKET);
}

//функция рисования фона
function drawBackground() {
    canvasContext.fillStyle= GAME.background;
    canvasContext.fillRect(0,0, GAME.width,GAME.height);
}

//функция рисования мяча
function drawBall(ball) {
    canvasContext.fillStyle = ball.color;
    canvasContext.beginPath();
    canvasContext.arc(ball.x, ball.y, ball.size / 2, 0, 2 * Math.PI);
    canvasContext.fill();
    canvasContext.closePath();
}

//функция отрисовки ракетки
function drawRacket(racket){
    canvasContext.fillStyle =racket.color;
    canvasContext.fillRect(racket.x, racket.y, racket.width, racket.height);
}

//функция отрисовки счёта
function drawRacketScore(racket){
    canvasContext.fillStyle =racket.color;
    canvasContext.font = "32px Arial";
    canvasContext.fillText("Score: " + racket.score, 20, 50);
}

//пересчёт позиции мячика
function updateBall(ball, racket){
    ball.x += ball.xDirection;
    ball.y += ball.yDirection;
    if ((ball.y + ball.size / 2 > GAME.height) | ((ball.y - ball.size / 2) < 0)) {
        ball.yDirection *= -1;
    }
    var racketTopLineCollision = ball.y + ball.size / 2 > racket.y;
    var racketLeftLineCollision = ball.x + ball.size / 2 > racket.x;
    var racketRightLineCollision = ball.x - ball.size / 2 < racket.x + racket.width;
    var racketBottomLineCollision = ball.y - ball.size / 2 < racket.y + racket.height;
    if (racketTopLineCollision && racketBottomLineCollision && racketLeftLineCollision && racketRightLineCollision)
    {
        ball.yDirection *= -1;
        racket.score += 1;
    }
    if ((ball.x + ball.size / 2 > GAME.width)| ((ball.x - ball.size / 2) < 0)) {
        ball.xDirection *= -1;
    }
}

//функция прослушки событий
function initEventsListeners(){
    window.addEventListener("mousemove", onCanvasMouseMove);
    window.addEventListener("keydown", onCanvasKeyDown)
}

//обработчик перемещения ракетки
function onCanvasKeyDown(event){
    if (event.key === "ArrowLeft"){
        RACKET.x = RACKET.x - RACKET.speed;
    }
    if (event.key === "ArrowRight"){
        RACKET.x = RACKET.x + RACKET.speed;
    }
    clampRacketPosition();
}

//обработчик перемещения мыши
function onCanvasMouseMove(event){
    RACKET.x = event.clientX - RACKET.width / 2;
    clampRacketPosition();
}

function clampRacketPosition(){
    if (RACKET.x + RACKET.width > GAME.width){
        RACKET.x = GAME.width - RACKET.width;
    }
    if (RACKET.x < 0){
        RACKET.x = 0;
    }
}



