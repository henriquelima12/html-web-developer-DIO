let canvas = document.getElementById("snake")
let context = canvas.getContext("2d")
let snake = []
snake[0] = {
    x: 8 * 32,
    y: 8 * 32
}
let direction = "right"
let food = {
    x: Math.floor(Math.random() * 15 + 1) * 32,
    y: Math.floor(Math.random() * 15 + 1) * 32
}
let pontos = 0;
let placar = document.getElementById("s2")

function criarBg(){
    context.fillStyle = "lightgreen"
    context.fillRect(0, 0, 16 * 32, 16 * 32)
}

function createSnake(){
    for(let i in snake){
        context.fillStyle = "green"
        context.fillRect(snake[i].x, snake[i].y, 32, 32)
    }
}

function drawFood(){
    context.fillStyle = "red"
    context.fillRect(food.x, food.y, 32, 32)
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != "right") direction = "left"
    if(event.keyCode == 38 && direction != "down") direction = "up"
    if(event.keyCode == 39 && direction != "left") direction = "right"
    if(event.keyCode == 40 && direction != "up") direction = "down"
}

function iniciarJogo(){
    placar.innerHTML = pontos

    if(snake[0].x == 15 * 32 && direction == "right") snake[0].x = 0
    if(snake[0].x == 0 && direction == "left") snake[0].x = 16 * 32
    if(snake[0].y == 15 * 32 && direction == "down") snake[0].y = 0
    if(snake[0].y == 0 && direction == "up") snake[0].y = 16 * 32

    for(let i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(jogo)
            alert("Game over, recarregue a página para reiniciar o jogo!")
        }
    }

    criarBg()
    createSnake()
    drawFood()

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(direction =="right") snakeX += 32
    if(direction == "left") snakeX -= 32
    if(direction =="up") snakeY -= 32
    if(direction == "down") snakeY += 32

    if(snakeX != food.x || snakeY != food.y){
        snake.pop()
    }else{
        food.x = Math.floor(Math.random() * 15 + 1) * 32
        food.y = Math.floor(Math.random() * 15 + 1) * 32
        pontos += 1;
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead)
}

let jogo = setInterval(iniciarJogo, 100)