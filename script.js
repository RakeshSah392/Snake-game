const board = document.querySelector(".game-board");
const InitialScore = document.querySelector("#score");
const gameOver = document.querySelector("#gameOver");
const restartBtn = document.querySelector("#restartBtn");
const startBtn = document.querySelector("#startBtn");
const highScoreElement = document.querySelector("#highScore");
const resetHighScoreBtn = document.querySelector("#resetHighScoreBtn"); 
//control for mobile
const upBtn = document.querySelector("#upBtn");
const downBtn = document.querySelector("#downBtn");
const leftBtn = document.querySelector("#leftBtn");
const rightBtn = document.querySelector("#rightBtn");
const gridSize = 40;
const totalCells = gridSize * gridSize;
for (let i = 0; i < totalCells; i++){
    const cell = document.createElement("div")
    cell.className = "cell"
    cell.id = i;
    let x = i % gridSize
    let y = Math.floor(i / gridSize)
    cell.dataset.x = x;
    cell.dataset.y = y;
    board.append(cell)
}

let snake = [
    {x: 5, y:5}
];
let direction = "right"
let food = {
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize)
}
let score = 0;  
let highScore = 0;
let foodCell = document.querySelector(`.cell[data-x="${food.x}"][data-y="${food.y}"]`)
foodCell.classList.add("food")


    document.addEventListener("keydown", (event) =>{
            if(event.key === "ArrowDown" && direction !== "up"){
                
                direction = "down"
            }
            if(event.key === "ArrowUp" && direction !== "down"){
               
                direction = "up"
            }
            if(event.key === "ArrowRight" && direction !== "left"){
               
                direction = "right"
            }
            if(event.key === "ArrowLeft" && direction !== "right"){
              
                direction = "left"
            }
        });
        

        //mobile control
    upBtn.addEventListener("click", () => {
        if (direction !== "down") direction = "up";
    });

    downBtn.addEventListener("click", () => {
        if (direction !== "up") direction = "down";
    });

    leftBtn.addEventListener("click", () => {
        if (direction !== "right") direction = "left";
    });

    rightBtn.addEventListener("click", () => {
         if (direction !== "left") direction = "right";
    });


    let gameLoop;   
    function startGame(){
        startBtn.style.display = "none";
        gameLoop = setInterval(() => {
    const head = snake[0];
    let nextHead = {
        
        x: head.x,
        y: head.y
    };
    
    if (direction === "right") {
        nextHead.x += 1;
    }

    if (direction === "left") {
        
        nextHead.x -= 1;
    }

    if (direction === "down") {
        nextHead.y += 1;
    }


    if (direction === "up") {
        nextHead.y -= 1;
    }

     if (nextHead.x > gridSize - 1) {
        nextHead.x = 0;
    }

    if (nextHead.x < 0) {
        nextHead.x = gridSize - 1;
    }

    if (nextHead.y > gridSize - 1) {
        nextHead.y = 0;
    }

    if (nextHead.y < 0) {
        nextHead.y = gridSize - 1;
    }
    
    const hitSelf = snake.some(segment => segment.x === nextHead.x && segment.y === nextHead.y);

    if(hitSelf){
        clearInterval(gameLoop);
        const deadHead = document.querySelector(
    `.cell[data-x="${nextHead.x}"][data-y="${nextHead.y}"]`
     );

     deadHead.classList.add("snake-head-dead");
         // gameOver.style.display = "block";
        gameOver.style.visibility = "visible"
        restartBtn.style.display = "block";
        return;
}
    // snake[0] = nextHead;
    snake.unshift(nextHead);

    
    if(nextHead.x === food.x && nextHead.y === food.y){
        score++;
        highScore++;
        if(score > highScore){
            highScore = score;
        }
        highScoreElement.textContent = `High Score: ${highScore}` 
        const foodCell = document.querySelector(`.cell[data-x="${food.x}"][data-y="${food.y}"]`)
        foodCell.classList.remove("food")
        InitialScore.textContent = `score: ${score}`
        // food.x = Math.floor(Math.random() * gridSize);
        // food.y = Math.floor(Math.random() * gridSize);
        do {
            food.x = Math.floor(Math.random() * gridSize);
            food.y = Math.floor(Math.random() * gridSize);
    } while (
        snake.some(segment =>
        segment.x === food.x && segment.y === food.y
    )
    );
        // console.log("New food:", food.x, food.y);
        const newFoodcell = document.querySelector(
        `.cell[data-x="${food.x}"][data-y="${food.y}"]`
    );
    newFoodcell.classList.add("food")
        InitialScore.style.color = "blue"
    }else{
         snake.pop()
    }

    document.querySelectorAll(".snake").forEach(cell => {
    
    cell.classList.remove("snake");
}); 
snake.forEach(segment => {
    const snakeCell = document.querySelector(`.cell[data-x="${segment.x}"][data-y="${segment.y}"]`)
    snakeCell.classList.add("snake");
});
}, 100);


}

function restartGame() {
    clearInterval(gameLoop);
    snake = [{x: 5, y: 5}];
    direction = "right"
    score = 0;
    InitialScore.textContent = `Score: ${score}`;
    // gameOver.style.display = "none";
    gameOver.style.visibility = "hidden";
    restartBtn.style.display = "none"; 
    document.querySelectorAll(".snake").forEach(cell => {
        cell.classList.remove("snake");
    });
    document.querySelectorAll(".snake-head-dead").forEach(cell => {
    cell.classList.remove("snake-head-dead");
});
    const snakeCell = document.querySelector(
        `.cell[data-x="${snake[0].x}"][data-y="${snake[0].y}"]`
    );

    snakeCell.classList.add("snake");
     
    startGame()
}
function resetHighScore() {
    highScore = 0;
    highScoreElement.textContent = `High Score: ${highScore}`;
}

startBtn.addEventListener("click", startGame);
restartBtn.addEventListener("click", restartGame);
resetHighScoreBtn.addEventListener("click", resetHighScore);