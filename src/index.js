module.exports = function solveSudoku(matrix) {
  steps = getSteps(matrix);
  s = solve(matrix, steps, 0);
  return s
}

function solve(matrix, steps, level){
  if (is_solved(matrix)) {
    return matrix;
  }else{
    let probes = getAvailDigits(steps[level], matrix);
    if (probes.length == 0) {
      return;
    }
    for(let i = 0; i<probes.length; i++){
      forward(steps[level], probes[i], matrix)
      solve(matrix, steps, level+1);
      if (is_solved(matrix)){return matrix}
      backward(steps[level], matrix)
    }
  }
}

function forward(pos, val, board){
  board[pos[0]][pos[1]] = val
}

function backward(pos, board){
  board[pos[0]][pos[1]] = 0
}

function getSteps(board){
  let steps = [];
  for(let y = 0; y < 9; y++){
    for(let x = 0; x < 9; x++){
      if (board[y][x] === 0){ steps.push([y, x]); }
    }
  }
  return steps;
}

function getAvailDigits(pos, board) {
  let available = [];
  for(let i = 1; i<=9; i++){
    if (
      notInLine(i, pos[0], board)
      && notInColumn(i, pos[1], board)
      && notInSquare(i, pos, board)
      ){ available.push(i); }
  }
  return available;
}

function notInLine(value, line, board){
  for(var i = 0; i < 9; i++) {
    if(board[line][i] === value) {
      return false;
    }
  }
  return true;
}

function notInColumn(value, column, board){
  for(var i = 0; i < 9; i++) {
    if(board[i][column] === value) { return false; }
  }
  return true;
}

function notInSquare(value, pos, board){
  let square_size = 3;
  let colRange, rowRange;

  for(let x=0; x < 9; x += square_size){
    if (pos[0] >= x && pos[0] < x+square_size) {
      rowRange = [x, x+square_size];
      for(let y=0; y < 9; y += square_size){
        if (pos[1] >= y && pos[1] < y+square_size) {
          colRange = [y, y+square_size];
          break;
        }
      }
      break;
    }
  }
  for(let i = rowRange[0]; i<rowRange[1]; i++){
    for(let j = colRange[0]; j<colRange[1]; j++){
      if (board[i][j] === value) { return false; }
    }
  }
  return true;
}

function is_solved(board){
  let freeCells = board.reduce(function(r,i){
    return r+i.reduce(function(f,k){ return (k==0)?f+1:f }, 0); }, 0);
  return (freeCells === 0);
}
