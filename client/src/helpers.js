export function calculateWinner(squares) {

    if (!squares) {
      return null;
    }

    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === 'B' || squares[i] >= 0) {
        continue;
      }
      return false;
    }
    return true;
  }

export function placeBombs(num_bombs, height, width) {

  let squares = Array(height*width).fill(null);

  for (let i = 0; i < num_bombs; i++) {

    let placed = false;

    while (!placed) {
      let y = getRandomInt(0, height);
      let x = getRandomInt(0, width);
      let index = y*width + x;

      if (squares[index] !== 'B') {
        placed = true;
        squares[index] = 'B';
        squares = updateSquares(squares, x, y, height, width);
      }

    }

  }
  return squares;

}

function updateSquares(squares, x, y, height, width) {
  let directions = [];
  const left = [-1,0];
  const right = [1,0];
  const up = [0,1];
  const down = [0,-1];
  const topleft = [-1,1];
  const topright = [1,1];
  const downleft = [-1,-1];
  const downright = [1,-1];

  directions = [left,right,up,down,topleft,topright,downleft,downright];

  for (let i = 0; i < directions.length; i++) {
    let next_x = x + directions[i][0];
    let next_y = y + directions[i][1];

    if (0 <= next_x && next_x < width && 0 <= next_y && next_y < height) {
      let index = next_y*width + next_x;
      if (squares[index] !== 'B') {
        squares[index]--;
      }
    }

  }
  return squares;
}

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max-min) + min);
}

export function findZeroes(squares, x, y, height, width) {
  let directions = [];
  const left = [-1,0];
  const right = [1,0];
  const up = [0,1];
  const down = [0,-1];
  const topleft = [-1,1];
  const topright = [1,1];
  const downleft = [-1,-1];
  const downright = [1,-1];

  directions = [left,right,up,down,topleft,topright,downleft,downright];

  let stack = [[x,y]];
  let visited = new Set();

  while (stack.length){
    let currcoord = stack.pop();
    let currx = currcoord[0];
    let curry = currcoord[1];
    let index = curry * width + currx;

    visited.add(index);

    if (squares[index] < 0) {
      squares[index] = squares[index] * -1;
      continue;
    }

    if (squares[index] === null) {
      squares[index] = 0;
      for (let i = 0; i < directions.length; i++) {
        let next_x = currx + directions[i][0];
        let next_y = curry + directions[i][1];
    
        if (0 <= next_x && next_x < width && 0 <= next_y && next_y < height) {
          let next_index = next_y*width + next_x;
          if (!visited.has(next_index)) {
            stack.push([next_x,next_y]);
          }
        }
    
      }
    }

  }
  return squares;


}

export function canDoubleClick(squares, x, y, height, width, flagged) {
  let directions = [];
  const left = [-1,0];
  const right = [1,0];
  const up = [0,1];
  const down = [0,-1];
  const topleft = [-1,1];
  const topright = [1,1];
  const downleft = [-1,-1];
  const downright = [1,-1];

  directions = [left,right,up,down,topleft,topright,downleft,downright];
  let toClick = []
  let index = y * width + x;
  let nearbyMines = squares[index];

  for (let i = 0; i < directions.length; i++) {
    let next_x = x + directions[i][0];
    let next_y = y + directions[i][1];

    if (0 <= next_x && next_x < width && 0 <= next_y && next_y < height) {
      index = next_y*width + next_x;
      if (flagged.has(index)) {
        nearbyMines -= 1;
      }
      else{
        if (squares[index] < 0 || squares[index] === null || squares[index] === 'B') {
          toClick.push(index);
        }
      }
    }

  }

  let lose = false;

  if (nearbyMines == 0) {
    for (let i = 0; i < toClick.length; i++) {
      if (squares[toClick[i]] < 0) {
        squares[toClick[i]] = squares[toClick[i]] * -1;
      }
      else if (squares[toClick[i]] === null) {
        const y1 = Math.floor(toClick[i] / width);
        const x1 = toClick[i] % width;
        findZeroes(squares,x1,y1,height,width);
      }
      else if (squares[toClick[i]] === 'B')  {
        lose = true;
        revealBombs(squares, toClick[i]);
        break;
      }
    }
  }
  return lose;
}

export function revealBombs(squares,index) {
  squares[index] = "EB";
  for (let i = 0; i < squares.length; i++) {
    if (squares[i] === "B") {
      squares[i] = "BB";
    }
  }
}

export function secondsToTimer(seconds) {
  let minutes = Math.floor(seconds/60);
  seconds = seconds % 60;

  minutes = minutes < 1 ? '00' : minutes < 10 ? `0${minutes}` : minutes;
  seconds = seconds < 1 ? '00' : seconds < 10 ? `0${seconds}` : seconds;
  return `${minutes}:${seconds}`;
}
