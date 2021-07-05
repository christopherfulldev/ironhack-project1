document.addEventListener('DOMContentLoaded', () => { //tudooooooo dentro do DOM o.O como event
    const grid = document.querySelector('.grid');
    const flagsLeft = document.querySelector('#flags-left');
    const result = document.getElementById('result');
    const resultTwo = document.getElementById('resultTwo');
    let width = 9;
    let bombAmount = 14; 
    let flags = 0;
    let squares = [];
    let isGameOver = false;
    let leftZero = document.getElementById ("leftZero");
    let rightZero = document.getElementById ("rightZero");
    let playerOne = true;
    let playerTwo = false;
    let currentPlayer = document.getElementById ("currentPlayer");
    const music = new Audio();
    music.src = "";
    music.volume = 0.3;
    
    function createBoard() {
      flagsLeft.innerHTML = bombAmount;
  
     //manipulação de arrays
      const bombsArray = Array(bombAmount).fill('bomb');
      const emptyArray = Array(width*width - bombAmount).fill('valid');
      const gameArray = emptyArray.concat(bombsArray);
      const shuffledArray = gameArray.sort(() => Math.random() -0.5);
      console.log(shuffledArray);
  
      for(let i = 0; i < width*width; i++) {
        const square = document.createElement('div'); //cria div no DOM
        square.setAttribute('id', i); //seta um id para as divs
        square.classList.add(shuffledArray[i]);
        grid.appendChild(square);    //insere o grid
        squares.push(square); //empurra o grid
        square.addEventListener('click', function(e) { //estranho mas funciona recursividade ++
        if (playerOne) {
          currentPlayer.innerText = 'Player 2 Joga';
          playerOne = false;
          playerTwo = true;
          handleClick(square, 1);
        } else {
          handleClick(square, 2);
          playerOne = true;
          currentPlayer.innerText = 'Player 1 Joga';
          playerTwo = false;
      }   
        });
        square.oncontextmenu = function(e) {
          e.preventDefault();
          addFlag(square);
        };
      }
  
      for (let i = 0; i < squares.length; i++) {
        let total = 0;
        const isLeftEdge = (i % width === 0); //estrutura de campo
        const isRightEdge = (i % width === width -1);

        if (squares[i].classList.contains('valid')) {
          if (i > 0 && !isLeftEdge && squares[i -1].classList.contains('bomb')) total ++;
          if (i > 9 && !isRightEdge && squares[i +1 -width].classList.contains('bomb')) total ++;
          if (i > 10 && squares[i -width].classList.contains('bomb')) total ++;
          if (i > 11 && !isLeftEdge && squares[i -1 -width].classList.contains('bomb')) total ++;
          if (i < 74 && !isRightEdge && squares[i +1].classList.contains('bomb')) total ++;
          if (i < 60 && !isLeftEdge && squares[i -1 +width].classList.contains('bomb')) total ++;
          if (i < 58 && !isRightEdge && squares[i +1 +width].classList.contains('bomb')) total ++;
          if (i < 70 && squares[i +width].classList.contains('bomb')) total ++;
          squares[i].setAttribute('data', total);
        }
      }
    }
    
    function handleClick (square, currentPlayer){ //handleClick foi adicionada para propiciar o modo multiplayer
      let clickValue = click(square, currentPlayer);
      
      if(clickValue) {
        let totalPlacar = Number(clickValue);
        if (currentPlayer == 1) {
          let placar = leftZero.innerText;
          placar = Number(placar.replace(/^[0.]+/, ""));
          leftZero.innerText = placar < 9 ? "0" + (placar +totalPlacar) : placar +totalPlacar ;
        } else {
          let placar2 = rightZero.innerText;
          placar2 = Number(placar2.replace(/^[0.]+/, ""));//pulo do gato
          rightZero.innerText = placar2 < 9 ? "0" + (placar2 +totalPlacar) : placar2 +totalPlacar ;
        }
        
      }
    }
    
    createBoard();//inicialização
    function click(square, currentPlayer) {
      let currentId = square.id;
      if (isGameOver) 
      return; 
      if (square.classList.contains('checked') || square.classList.contains('flag')) //check de bomba
      return;
      if (square.classList.contains('bomb')) {      
        gameOver(square, currentPlayer);
      } else {
        let total = square.getAttribute('data');
        if (total !=0) {
          square.classList.add('checked');
          if (total == 1) square.classList.add('one');
          if (total == 2) square.classList.add('two');
          if (total == 3) square.classList.add('three');//seta os atributos possiveis
          if (total == 4) square.classList.add('four');
          square.innerHTML = total;
          return total;
        } 
        checkSquare(square, currentId, currentPlayer);
      }
      square.classList.add('checked');
    }


    function checkSquare(square, currentId, currentPlayer) { 
      const isLeftEdge = (currentId % width === 0);
      const isRightEdge = (currentId % width === width -1); 
      
     setTimeout(() => { //assincrona uhuul
        if (currentId > 0 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1].id;
          const newSquare = document.getElementById(newId);
          handleClick(newSquare, currentPlayer);
        }
        if (currentId > 9 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1 -width].id;
          const newSquare = document.getElementById(newId);
          handleClick(newSquare, currentPlayer);
        }
        if (currentId > 10) {
          const newId = squares[parseInt(currentId -width)].id;
          const newSquare = document.getElementById(newId);
          handleClick(newSquare, currentPlayer);
        }
        if (currentId > 11 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1 -width].id;
          const newSquare = document.getElementById(newId);
          handleClick(newSquare, currentPlayer);
        }
        if (currentId < 74 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1].id;
          const newSquare = document.getElementById(newId);
          handleClick(newSquare, currentPlayer);
        }
        if (currentId < 60 && !isLeftEdge) {
          const newId = squares[parseInt(currentId) -1 +width].id;
          const newSquare = document.getElementById(newId);
          handleClick(newSquare, currentPlayer);
        }
        if (currentId < 58 && !isRightEdge) {
          const newId = squares[parseInt(currentId) +1 +width].id;
          const newSquare = document.getElementById(newId);
          handleClick(newSquare, currentPlayer);
        }
        if (currentId < 70) {
          const newId = squares[parseInt(currentId) +width].id;
          const newSquare = document.getElementById(newId);
          handleClick(newSquare, currentPlayer);
        }
      }, 10);
    }
  
    //game over 
    function gameOver(square, currentPlayer) {
      result.innerHTML = 'BOOM! Game Over!';
      resultTwo.innerHTML = currentPlayer == 1 ? 'PLayer 1 lose' : 'Player 2 lose';
      isGameOver = true;
      squares.forEach(square => {
        if (square.classList.contains('bomb')) {
          square.innerHTML = '💣';
          square.classList.remove('bomb');
          square.classList.add('checked');
        }
      });
    }

  
    //you win 
    function checkForWin() {
    let matches = 0;
  
      for (let i = 0; i < squares.length; i++) {
        if (squares[i].classList.contains('flag') && squares[i].classList.contains('bomb')) {
          matches ++;
        }
        if (matches === bombAmount) {
          result.innerHTML = 'YOU WIN!';
          isGameOver = true;
        }
      }
    }
  });

