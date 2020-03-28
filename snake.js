function init() {
     board={
         width: 1000,
         height: 1000,
         cellSize:67,

    }
    var canvas = document.getElementById('mycanvas');
  canvas.width = canvas.height = board.width;
    //The getContext() method returns an object that provides methods and properties for drawing on the canvas.
    pen = canvas.getContext('2d');
    // grid cell size based on calculations

    //snake object
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
            for(var i=0;i<this.cells.length;i++)
                pen.fillRect(this.cells[i].x*board.cellSize,this.cells[i].y*board.cellSize,board.cellSize-1,board.cellSize-1);

        },
        updateSnake:function(){
            console.log("updating snake according to direction");
            this.cells.pop(); // removing tail node
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
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
            console.log(Math.abs(newX),newY);
             if(Math.abs(newX)<=15 && Math.abs(newY)<=15 && newX>=-1 &&newY>=-1)
                    this.cells.unshift({x:newX,y:newY}); // adding new head to the snake 
             else {
                clearInterval(repeat);
                alert("YOU LOST");
                
            }
        }

    };

    //create the snake in init()
     snake.createSnake();
    //event handler
        function keyPressed(e){
           // console.log("key pressed",e.key);
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

function draw() {
    //erase the old frame board
    pen.clearRect(0,0,board.width,board.height);
    //draw the snake 
    snake.drawSnake();

}

function update() {
    snake.updateSnake();
}

function gameloop() {
    draw();
    update();

}

init();
var interval=1000;
var repeat = setInterval(gameloop,interval);