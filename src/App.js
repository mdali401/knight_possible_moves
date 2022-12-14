import {useState} from 'react'
import './App.css';
import knight from './images/knight.PNG'

function App() {
  const zeroesBoard8x8 = []
  
  for(let x=0; x<8; x++)
  {
    zeroesBoard8x8.push([0,0,0,0,0,0,0,0])
  }

  const [board, setBoard] = useState(zeroesBoard8x8)

  const resetBoard = () => {
    return [...zeroesBoard8x8]
  }

  const markKnightSteps = (newBoard, rowNumber, colNumber) => {
    // For left most and right most sides of the knight
    const sideRowNumberStep1 = rowNumber - 1
    const sideRowNumberStep2 = rowNumber + 1
    const leftSideColNumber = colNumber - 2
    const rightSideColNumber = colNumber + 2

    // For top most and bottom most sides of the knight
    const topSideRowNumber = rowNumber - 2
    const topSideColNumberStep1 = colNumber - 1
    const topSideColNumberStep2 = colNumber + 1
    const bottomSideRowNumber = rowNumber + 2

    // Conditions to handle out of range
    // Marking possible steps with 's'
    if(sideRowNumberStep1 >= 0  && sideRowNumberStep1 < board.length)
    {
      if(leftSideColNumber >= 0 && leftSideColNumber < board[0].length)
      {
        // Left most side towards the top
        newBoard[sideRowNumberStep1][leftSideColNumber] = 's'
      }
      if(rightSideColNumber >= 0 && rightSideColNumber < board[0].length)
      {
        // Right most side towards the top
        newBoard[sideRowNumberStep1][rightSideColNumber] = 's'
      }
    }

    if(sideRowNumberStep2 >= 0  && sideRowNumberStep2 < board.length)
    {
      if(leftSideColNumber >= 0 && leftSideColNumber < board[0].length)
      {
        // Left most side towards the bottom
        newBoard[sideRowNumberStep2][leftSideColNumber] = 's'
      }
      if(rightSideColNumber >= 0 && rightSideColNumber < board[0].length)
      {
        // Right most side towards the botoom
        newBoard[sideRowNumberStep2][rightSideColNumber] = 's'
      }
    }
    
    if(topSideRowNumber >= 0  && topSideRowNumber < board.length)
    {
      if(topSideColNumberStep1 >= 0 && topSideColNumberStep1 < board[0].length)
      {
        // Top most side towards the left
        newBoard[topSideRowNumber][topSideColNumberStep1] = 's'
      }
      if(topSideColNumberStep2 >= 0 && topSideColNumberStep2 < board[0].length)
      {
        // Top most side towards the right
        newBoard[topSideRowNumber][topSideColNumberStep2] = 's'
      }
    }

    if(bottomSideRowNumber >= 0  && bottomSideRowNumber < board.length)
    {
      if(topSideColNumberStep1 >= 0 && topSideColNumberStep1 < board[0].length)
      {
        // Bottom most side towards the left
        newBoard[bottomSideRowNumber][topSideColNumberStep1] = 's'
      }
      if(topSideColNumberStep2 >= 0 && topSideColNumberStep2 < board[0].length)
      {
        // Bottom most side towards the right
        newBoard[bottomSideRowNumber][topSideColNumberStep2] = 's'
      }
    }

    return newBoard

  }
  
  const handleClick = (e) => {

    let newBoard = resetBoard()
    let [rowNumber, colNumber] = e.target.id.split(':')
    rowNumber = parseInt(rowNumber)
    colNumber = parseInt(colNumber)
    newBoard[rowNumber][colNumber] = 'k'
    newBoard = markKnightSteps(newBoard, rowNumber, colNumber)
    setBoard(newBoard)
  }
  
  return (
    <div className="App">
      
      {board.map((row, index) => {
        let rowNumber = index
        let rowOfDivs = []
        let colNumber = 0
        // To color the chess board
        let alternateRow = index%2
        
        for(let cell of row)
        {
          let alternateCol = alternateRow ? colNumber%2 : (colNumber+1)%2
          rowOfDivs.push(<div 
              key={`${rowNumber}:${colNumber}`} 
              id={`${rowNumber}:${colNumber}`} 
              className={alternateCol ? 'cell' : 'cell alternate_cell'}
              onClick={(e) => handleClick(e)}
              style={cell ? (cell === 'k' ? {backgroundImage: `url(${knight})`, backgroundSize: 'cover'} : {backgroundColor: 'green'}) : {}} 
            >   
            </div>)
          colNumber += 1
        }

        return <div key={rowNumber} className='row'>{rowOfDivs}</div>
      })}
      <div className='legend'>
        <p>Possible steps: </p><div></div>
      </div>
    </div>
  );
}

export default App;
