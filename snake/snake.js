function init() {
    
     board={
         width: 1000,
         height: 1000,
         cellSize:67, 
         interval:200, // grid cell size based on calculation
    }
    snake ={
                            intitLen:5,
                            color:"#8B4513",
                            cells:[],
                            direction:"right",

                            createSnake:function(){
                                for(var i=this.intitLen;i>0;i--){
                                    this.cells.push({x:i,y:0}); //push into cells array
                                }

                            },
                            drawSnake:function(){
                                pen.fillStyle=this.color;
                                var headX=this.cells[0].x;
                                var headY=this.cells[0].y;
                                if(collision(headX,headY)==true){
                                    gameOver=true;
                                }
                                for(var i=0;i<this.cells.length;i++)
                                    pen.fillRect(this.cells[i].x*board.cellSize,this.cells[i].y*board.cellSize,board.cellSize-0.5,board.cellSize-0.5);

                            },
                            updateSnake:function(){
                                //check if snake has eaten food (coordinates overalp)
                                var eaten=false;
                                var headX = this.cells[0].x;
                                var headY = this.cells[0].y;
                                if(headX==food.x && headY==food.y){
                                    console.log("food eaten!");
                                    food=placeRandomFood();
                                    eaten=true;
                                    score++;
                                    updateInterval();
                                }
                                console.log("updating snake according to direction");
                                if(!eaten)
                                this.cells.pop(); // removing tail node
                            
                                var newX,newY;
                                if(this.direction=="left") {
                                    newX = headX -1;  // updating coordinate of new head
                                    newY = headY;
                                }
                                else if(this.direction=="right") {
                                    newX = headX +1;  // updating coordinate of new head
                                    newY = headY;
                                }
                                else if(this.direction=="up") {
                                    newX = headX;  // updating coordinate of new head
                                    newY = headY-1;
                                }
                                else if(this.direction=="down") {
                                    newX = headX;  // updating coordinate of new head
                                    newY = headY +1;
                                }
                                else{
                                    newX = headX;  // updating coordinate of new head
                                    newY = headY;
                                }
                                // logic that prevents snake from going out of the grid 
                                var lastX = Math.round(board.width/board.cellSize);
                                var lastY = Math.round(board.height/board.cellSize);
                                
                                this.cells.unshift({x:newX,y:newY}); // adding new head to the snake 
                                //   if(collision(newX,newY)==true) {
                                //     gameOver=true;
                                // }
                                if(this.cells[0].y < 0 || this.cells[0].x < 0 || this.cells[0].x >= lastX || this.cells[0].y >= lastY) {
                                    gameOver=true;
                                }
                                
                                
                            }

    };
    gameOver=false; 
    score=5;   
    var canvas = document.getElementById('mycanvas');
    canvas.width = canvas.height = board.width;
    //The getContext() method returns an object that provides methods and properties for drawing on the canvas.
    pen = canvas.getContext('2d');
    food = placeRandomFood();
    foodImage = new Image();
    trophyImage = new Image();
    foodImage.src = "apple.png";
    trophyImage.src = "trophy.png";

   

    //snake object
    

    //create the snake in init()
     snake.createSnake();
    //event handler
        function keyPressed(e){
            
            console.log("key pressed",e.key);
            if(e.key=="ArrowRight"){
                if(snake.direction!=="left")
                     snake.direction="right";
            }
            else if(e.key=="ArrowLeft"){
                if(snake.direction!=="right")
                    snake.direction="left";
            }
            else if(e.key=="ArrowDown"){
                if(snake.direction!=="up")
                     snake.direction="down";
            }
            else if(e.key=="ArrowUp"){
                if(snake.direction!=="down")
                     snake.direction="up";
            }
           // console.log("direction:",snake.direction);
    }
    // add an event listener on the DOM
    document.addEventListener('keydown',keyPressed);
   
}

function collision(newX,newY) {
    for(let i=1;i<snake.cells.length;i++)
    {
        if(newX==snake.cells[i].x && newY==snake.cells[i].y){
            console.log("newX:",newX,"newY:",newY);
            console.log(snake.cells[i].x,snake.cells[i].y);
            return true;
        }
    }
}

function draw() {
    //erase the old frame board
    pen.clearRect(0,0,board.width,board.height);
    //draw the snake 
    snake.drawSnake();
    food.drawFood();
    //pen.drawImage(trophyImage,30,17,board.cellSize+10,board.cellSize+10);
    pen.font = "25px roboto";
    pen.fillStyle = "black";
    pen.fillText("Score:",board.cellSize*13,50);
    pen.fillText(score,board.cellSize*14,50);
}

function update() {
    snake.updateSnake();
}

function placeRandomFood(){
    var foodX = Math.round((Math.random() * ((board.width-board.cellSize)/board.cellSize))); // so that the food stays inside the grid and is a multiple of cellSize
    var foodY = Math.round((Math.random() * ((board.height-board.cellSize)/board.cellSize))); // so that the food stays inside the grid and is a multiple of cellSize
    for(let i=0;i<snake.cells.length;i++){
        if(foodX==snake.cells[i].x && foodY==snake.cells[i].y) {
            foodX =  Math.round((Math.random() * ((board.width-board.cellSize)/board.cellSize)));
            foodY = Math.round((Math.random() * ((board.height-board.cellSize)/board.cellSize)));
        }
            

    }
    var food={
        x:foodX,
        y:foodY,
        color:"red",
        drawFood:function(){
            // pen.fillStyle=this.color;
            pen.drawImage(foodImage,this.x*board.cellSize,this.y*board.cellSize,board.cellSize,board.cellSize);
        }
    }
    return food;
}

function updateInterval()
{
    if(board.interval-50 >= 100){
        board.interval-=15;
        clearInterval(repeat);
        repeat=setInterval(gameloop,board.interval);
    }
        
    else
        return;
}

function gameloop() {
    if(gameOver==true) {
        clearInterval(repeat);
        alert("Game Over!");
        return;
    } 
        draw();
        update();
}

init();

var repeat = setInterval(gameloop,board.interval);
