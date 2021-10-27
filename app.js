document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const width = 8;
  const squares = [];
  let score = 0;

  const gumballs = ['bop', 'bud', 'chum', 'clunk', 'dapp', 'eke'];
  const candyColors = [
    'purple',
    'orange',
    'midnightblue',
    'tomato',
    'violet',
    'yellow'
  ];

  let randomColor = getRandColor();
  let lastColor = candyColors[randomColor];

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      createCell(i);
    }
  }

  function getRandColor() {
    return Math.floor(Math.random() * candyColors.length);
  }

  function createCell(i) {
    randomColor = getRandColor();
    if (i > 8) {
      if (
        candyColors[randomColor] !=
          document.getElementById(i - 2).style.backgroundColor &&
        candyColors[randomColor] !=
          document.getElementById(i - 8).style.backgroundColor
      ) {
        generateCell(i);
      } else {
        createCell(i);
      }
    } else {
      if (candyColors[randomColor] != lastColor) {
        generateCell(i);
      } else {
        createCell(i);
      }
    }
  }

  function generateCell(i) {
    const square = document.createElement('div');
    square.setAttribute('draggable', true);
    square.setAttribute('id', i);
    square.innerHTML = `<img class="img-gumball" src="./imgs/${gumballs[randomColor]}.png" alt="${gumballs[randomColor]}" />`;
    square.style.backgroundColor = candyColors[randomColor];
    lastColor = candyColors[randomColor];
    grid.appendChild(square);
    squares.push(square);
  }

  createBoard();

  let colorBeingDragged;
  let colorBeingReplaced;
  let squareIdBeingDragged;
  let squareIdBeingReplaced;

  let imgBeingDragged;
  let imgBeingReplaced;

  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragend', dragEnd));
  squares.forEach(square => square.addEventListener('dragover', dragOver));
  squares.forEach(square => square.addEventListener('dragenter', dragEnter));
  squares.forEach(square => square.addEventListener('dragleave', dragLeave));
  squares.forEach(square => square.addEventListener('drop', drop));

  function dragStart(e) {
    colorBeingDragged = this.style.backgroundColor;
    imgBeingDragged = this.innerHTML;
    squareIdBeingDragged = parseInt(this.id);
    console.log(colorBeingDragged);

    console.log(this.id, 'dragstart');
  }

  function dragOver(e) {
    e.preventDefault();
    console.log(this.id, 'dragover');
  }

  function dragEnter(e) {
    e.preventDefault();
    console.log(this.id, 'dragenter');
  }

  function dragLeave(e) {
    colorBeingReplaced;
    console.log(this.id, 'dragleave');
  }

  function drop(e) {
    e.preventDefault();
    console.log(this.id, 'drop');
    colorBeingReplaced = this.style.backgroundColor;
    squareIdBeingReplaced = parseInt(this.id);
    imgBeingReplaced = this.innerHTML;
    this.innerHTML = imgBeingDragged;
    squares[squareIdBeingDragged].innerHTML = imgBeingReplaced;
    this.style.backgroundColor = colorBeingDragged;
    squares[squareIdBeingDragged].style.backgroundColor = colorBeingReplaced;
    checkForMatch();
  }

  function dragEnd() {
    console.log(this.id, 'dragend');

    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width
    ];

    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (squareIdBeingReplaced && validMove) {
      console.log(0);

      squareIdBeingReplaced = null;
    } else if (squareIdBeingReplaced && !validMove) {
      console.log(1);

      squares[squareIdBeingReplaced].style.backgroundColor = colorBeingReplaced;
      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    } else {
      console.log(2);

      squares[squareIdBeingDragged].style.backgroundColor = colorBeingDragged;
    }
  }

  function moveGbDown() {
    for (i = 0; i < 55; i++) {
      if (squares[i + width].style);
    }
  }

  function checkForRowOfThree() {
    for (i = 0; i < 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === '';

      if (!((rowOfThree[0] + 1) % 8 === 0 || (rowOfThree[1] + 1) % 8 === 0)) {
        if (
          rowOfThree.every(
            index =>
              squares[index].style.backgroundColor === decidedColor && !isBlank
          )
        ) {
          score += 3;
          rowOfThree.forEach(index => {
            squares[index].style.backgroundColor = '';
            squares[index].innerHTML = '';
          });
        }
      }
    }
  }

  function checkForColumnOfThree() {
    for (i = 8; i < 53; i++) {
      let columnOfThree = [i, i - 8, i + 8];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === '';

      if (
        columnOfThree.every(
          index =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 3;
        columnOfThree.forEach(index => {
          squares[index].style.backgroundColor = '';
          squares[index].innerHTML = '';
        });
      }
    }
  }

  function checkForRowOfFour() {
    for (i = 0; i < 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === '';

      if (
        !(
          (rowOfFour[0] + 1) % 8 === 0 ||
          (rowOfFour[1] + 1) % 8 === 0 ||
          (rowOfFour[2] + 1) % 8 === 0
        )
      ) {
        if (
          rowOfFour.every(
            index =>
              squares[index].style.backgroundColor === decidedColor && !isBlank
          )
        ) {
          score += 3;
          rowOfFour.forEach(index => {
            squares[index].style.backgroundColor = '';
            squares[index].innerHTML = '';
          });
        }
      }
    }
  }

  function checkForColumnOfFour() {
    for (i = 8; i < 43; i++) {
      let columnOfFour = [i, i - 8, i + 8, i + 16];
      let decidedColor = squares[i].style.backgroundColor;
      const isBlank = squares[i].style.backgroundColor === '';

      if (
        columnOfFour.every(
          index =>
            squares[index].style.backgroundColor === decidedColor && !isBlank
        )
      ) {
        score += 3;
        columnOfFour.forEach(index => {
          squares[index].style.backgroundColor = '';
          squares[index].innerHTML = '';
        });
      }
    }
  }

  function checkForMatch() {
    checkForRowOfFour();
    checkForColumnOfFour();
    checkForColumnOfThree();
    checkForRowOfThree();
  }
});
