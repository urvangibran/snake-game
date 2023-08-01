const board = document.querySelector(".board")
const score = document.querySelector(".score")
const highScore = document.querySelector(".high-score")
const controls = document.querySelectorAll(".controls i")

let gameOver = false
let koor_foodX, koor_foodY, koor_snakeX = Math.floor(Math.random() * 25), koor_snakeY = Math.floor(Math.random() * 25)
let velocityX = 0, velocityY = 0
let snakeBody = []
let setIntervalId, scoreValue = 0  


let highScoreValue = localStorage.getItem("high-score") || 0
highScore.innerText = `High Score: ${highScoreValue}`

const updateFoodPosition = () => {
    koor_foodX = Math.floor(Math.random() * 25) + 1 
    koor_foodY = Math.floor(Math.random() * 25) + 1
}

const handleGameOver = () => {
    clearInterval(setIntervalId)
    $('#gameOverModal').modal('show');
    document.getElementById('try-again-btn').addEventListener("click", () => {
        location.reload()
    })
    // location.reload()
}

const changeDirection = e => {
    // console.log(e)
    if (e.key === "ArrowUp" && velocityY != 1) {
        velocityX = 0
        velocityY = -1
    } else if (e.key === "ArrowDown" && velocityY != -1) {
        velocityX = 0
        velocityY = 1
    } else if (e.key === "ArrowLeft" && velocityX != 1) {
        velocityX = -1
        velocityY = 0
    } else if (e.key === "ArrowRight" && velocityX != -1) {
        velocityX = 1
        velocityY = 0
    }
}

controls.forEach(button => button.addEventListener("click", () => changeDirection({ key: button.dataset.key })));


const initGame = () => {
    console.log(snakeBody)
    if (gameOver) return handleGameOver()
    let element = `<div class="food" style="grid-area: ${koor_foodY} / ${koor_foodX}"></div>`

    if (koor_snakeX === koor_foodX && koor_snakeY === koor_foodY) {
        updateFoodPosition()
        snakeBody.push([koor_foodY, koor_foodX])
        scoreValue++
        highScoreValue = (scoreValue > highScoreValue) ? scoreValue : highScoreValue
        localStorage.setItem("high-score", highScoreValue)
        score.innerText = `Score: ${scoreValue}`
        highScore.innerText = `High Score: ${highScoreValue}`
    }

    koor_snakeX += velocityX
    koor_snakeY += velocityY

    for (let i = snakeBody.length - 1; i > 0; i--) 
        snakeBody[i] = snakeBody[i - 1]

    snakeBody[0] = [koor_snakeX, koor_snakeY]

    if (koor_snakeX <= 0 || koor_snakeX > 25 || koor_snakeY <= 0 || koor_snakeY > 25) 
        return gameOver = true

    for (let i = 0; i < snakeBody.length; i++) {
        element += `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0]) 
            gameOver = true
    }
    board.innerHTML = element
}

updateFoodPosition()
setIntervalId = setInterval(initGame, 100)
document.addEventListener("keyup", changeDirection)