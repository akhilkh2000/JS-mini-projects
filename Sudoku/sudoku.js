grid ={
    arr : [[],[],[],[],[],[],[],[],[]],
    temp: [[],[],[],[],[],[],[],[],[]] 
};

function fillGrid(){
    for(var i = 0; i<9 ;i++){
        for(var j =0; j<9; j++){
            var num=i*9+j;
            grid.arr[i][j]=document.getElementById("cell-"+num.toString());   
        }
        
    }
}

function initializeTemp() {
    for(var i = 0; i < 9; i++){
        for(var j = 0; j < 9; j++){
            grid.temp[i][j]=0;
        }
    }
}
function setTemp(board){
    for(var i = 0; i<9; i++){
        for( var j = 0; j<9; j++){
            if(board[i][j]!=0){
                grid.temp[i][j]=1;
            }
        }
    }
}

function setColor(){
    for(var i =0;i<9;i++){
        for(var j = 0; j < 9; j++)
            if(grid.temp[i][j]!=0){
                grid.arr[i][j].style.backgroundColor="#EEEEEE";
            }
    }
}
function resetColor(){
    for(var i =0;i<9;i++){
        for(var j = 0; j < 9; j++){
            grid.arr[i][j].style.backgroundColor="white";
        }
    }
}

var board =[[],[],[],[],[],[],[],[],[]];

let button = document.getElementById('generate-sudoku')
let solve = document.getElementById('solve');

let oneStep =  document.getElementById('solve-one');

function changeBoard(board){
    for(var i =0;i<9;i++){
        for(var j = 0; j < 9; j++){
            if(board[i][j]!=0){
                grid.arr[i][j].innerText = board[i][j];
            }
            else{
                 grid.arr[i][j].innerText='';
            }
        }
    }
}
button.onclick = function() {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function(){
        var response =JSON.parse(xhrRequest.response);
        console.log(response);
        initializeTemp();
        resetColor();

        board = response.board;
        setTemp(board);
        setColor();
        changeBoard(board);
    }
    xhrRequest.open('get','https://sugoku.herokuapp.com/board?difficulty=hard');
    xhrRequest.send();
}

function checkSafe(board,r,c,num){
    for(var i =0;i<9;i++){
        if(board[i][c]==num || board[r][i] ==num){
            return false;
        }
    }
        //subgrid
        var startX = r-r%3 ; //rounding off to nearest multiple of 3 less than it
        var startY = c - c%3;
        for(var x=startX;x<startX+3;x++)
        {
            for(var y=startY;y<startY+3;y++)
                if(board[x][y]==num)
                    return false;
        }

        return true;

}
function foo(){
    console.log('delay');
}
function solveSudokuHelper(board,startRow,startCol){
   
    if(startRow==9){
        changeBoard(board);
        return true;
    }
    if(startCol==9){
        return solveSudokuHelper(board,startRow+1,0);
    }
    if(board[startRow][startCol]!=0)
      {
          
        return solveSudokuHelper(board,startRow,startCol+1);
      }
       
    for(var i =1;i<=9;i++){
            if(checkSafe(board,startRow,startCol,i)){
                board[startRow][startCol]=i;
                var success = solveSudokuHelper(board,startRow,startCol+1);
                if(success){
                    return true;
                }
                else{
                    board[startRow][startCol]=0;
            }
        }
    }
    return false; //backtrack
}
function solveSudoku(board) {
    solveSudokuHelper(board,0,0);
}

function solveOneStep(board){
    
}

solve.onclick = function(){
    solveSudoku(board);
}
oneStep.onclick = function(){
    solveOneStep(board);
}
fillGrid(grid);
