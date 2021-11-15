import * as waxjs from './scripts';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const width = 8;
  const squares = [];
  let score = 0;
  let movesLeft = 30;
  let chancesLeft = 5;

  const scoreBar = document.getElementById('score');
  const zanyBar = document.getElementById('progress-front');

  const chanceBar = document.getElementById('chance-bar');
  const cbLights = chanceBar.getElementsByClassName('chnc');
  let cbLen = cbLights.length;

  const gumballs = ['bop', 'bud', 'chum', 'clunk', 'dapp', 'eke'];

  let randomImg = getRandImg();
  let lastImg = gumballs[randomImg];

  function createBoard() {
    for (let i = 0; i < width * width; i++) {
      createCell(i);
    }
  }

  function getRandImg() {
    return Math.floor(Math.random() * gumballs.length);
  }

  function createCell(i) {
    randomImg = getRandImg();
    if (i > 8) {
      if (
        gumballs[randomImg] !=
          document
            .getElementById(i - 2)
            .getElementsByTagName('img')[0]
            .getAttribute('alt') &&
        gumballs[randomImg] !=
          document
            .getElementById(i - 8)
            .getElementsByTagName('img')[0]
            .getAttribute('alt')
      ) {
        generateCell(i);
      } else {
        createCell(i);
      }
    } else {
      if (gumballs[randomImg] != lastImg) {
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
    square.innerHTML = `<img class="img-gumball" src="./imgs/${gumballs[randomImg]}.png" alt="${gumballs[randomImg]}" />`;
    lastImg = gumballs[randomImg];
    grid.appendChild(square);
    squares.push(square);
  }

  createBoard();

  let squareIdBeingDragged;
  let squareIdBeingReplaced;
  let imgBeingDragged;
  let imgBeingReplaced;
  let ibrAlt;
  let ibdAlt;

  squares.forEach(square => square.addEventListener('dragstart', dragStart));
  squares.forEach(square => square.addEventListener('dragend', dragEnd));
  squares.forEach(square => square.addEventListener('dragover', dragOver));
  squares.forEach(square => square.addEventListener('dragenter', dragEnter));
  squares.forEach(square => square.addEventListener('dragleave', dragLeave));
  squares.forEach(square => square.addEventListener('drop', drop));

  function dragStart() {
    imgBeingDragged = this.querySelector('.img-gumball').getAttribute('src');
    ibdAlt = this.querySelector('.img-gumball').getAttribute('alt');
    squareIdBeingDragged = parseInt(this.id);

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

  function dragLeave() {
    console.log(this.id, 'dragleave');
  }

  function drop(e) {
    e.preventDefault();

    squareIdBeingReplaced = parseInt(this.id);
    imgBeingReplaced = this.querySelector('.img-gumball').getAttribute('src');
    ibrAlt = this.querySelector('.img-gumball').getAttribute('alt');

    let validMoves = [
      squareIdBeingDragged - 1,
      squareIdBeingDragged - width,
      squareIdBeingDragged + 1,
      squareIdBeingDragged + width
    ];

    let invalidMove = false;
    let invalidSquareId;

    if (
      squareIdBeingDragged === squareIdBeingReplaced - 1 ||
      squareIdBeingDragged === squareIdBeingReplaced + 1
    ) {
      if (
        squareIdBeingDragged % 8 === 0 &&
        squareIdBeingReplaced < squareIdBeingDragged
      ) {
        invalidSquareId = squareIdBeingDragged;
      } else if (
        squareIdBeingReplaced % 8 === 0 &&
        squareIdBeingDragged < squareIdBeingReplaced
      ) {
        invalidSquareId = squareIdBeingReplaced;
      }
    }

    if (invalidSquareId) {
      if (
        (squareIdBeingDragged === 0 || squareIdBeingReplaced === 0) &&
        (squareIdBeingDragged === squareIdBeingReplaced - 1 ||
          squareIdBeingDragged === squareIdBeingReplaced + 1)
      ) {
        invalidMove = false;
      } else {
        invalidMove = true;
      }
    }

    let validMove = validMoves.includes(squareIdBeingReplaced);

    if (
      (squareIdBeingReplaced || imgBeingDragged) &&
      validMove &&
      !invalidMove
    ) {
      console.log(0);

      squares[
        squareIdBeingDragged
      ].innerHTML = `<img class="img-gumball" src="${imgBeingReplaced}" alt="${ibrAlt}" />`;
      squares[
        squareIdBeingReplaced
      ].innerHTML = `<img class="img-gumball" src="${imgBeingDragged}" alt="${ibdAlt}" />`;
      checkForMatch();

      squareIdBeingReplaced = null;
      imgBeingDragged = null;
    } else if (
      (squareIdBeingReplaced || imgBeingReplaced) &&
      (!validMove || invalidMove)
    ) {
      console.log(1);

      squares[
        squareIdBeingDragged
      ].innerHTML = `<img class="img-gumball" src="${imgBeingDragged}" alt="${ibdAlt}" />`;
      squares[
        squareIdBeingReplaced
      ].innerHTML = `<img class="img-gumball" src="${imgBeingReplaced}" alt="${ibrAlt}" />`;
    } else {
      console.log(2);

      squares[
        squareIdBeingDragged
      ].innerHTML = `<img class="img-gumball" src="${imgBeingDragged}" alt="${ibdAlt}" />`;
    }

    movesLeft -= 1;
    const movesLeftText = document.getElementById('moves-left');
    if (movesLeft >= 0) {
      movesLeftText.textContent = movesLeft.toString();
    } else {
      chancesLeft -= 1;
      if (chancesLeft > 0) {
        let gameResTime = 5;
        const chancesLeftTexts = document.getElementsByClassName(
          'chances-left'
        );
        const interval = document.getElementById('interval');
        console.log(chancesLeftTexts);
        [...chancesLeftTexts].forEach(element => {
          element.textContent = chancesLeft.toString();
        });
        cbLights[cbLen - 1].style.display = 'none';
        cbLen--;
        interval.style.display = 'grid';
        const timer = document.getElementById('timer');
        timer.textContent = gameResTime;
        let gameResTimer = window.setInterval(() => {
          if (gameResTime > 0) {
            gameResTime--;
            timer.textContent = gameResTime.toString();
          } else {
            interval.style.display = 'none';
            movesLeft = 30;
            resetScore();
            movesLeftText.textContent = movesLeft.toString();
            clearInterval(gameResTimer);
          }
        }, 1000);
      } else {
        alert('game over');
        location.reload();
      }
    }
    console.log(this.id, 'drop');
    // TODO: Bug - if gb can fit in pattern it gets dropped;
  }

  function dragEnd() {
    console.log(this.id, 'dragend');
  }

  function moveGbDown() {
    for (i = 0; i <= 63; i++) {
      if (
        squares[i].querySelector('.img-gumball').getAttribute('src') ===
        './imgs/transparent.png'
      ) {
        if (i >= 8) {
          squares[i].innerHTML = squares[i - width].innerHTML;
          squares[
            i - width
          ].innerHTML = `<img src="./imgs/transparent.png" class="img-gumball" alt="" />`;
        } else if (i <= 7) {
          var randImg = getRandImg();
          squares[
            i
          ].innerHTML = `<img src="./imgs/${gumballs[randImg]}.png" class="img-gumball" alt="${gumballs[randImg]}" />`;
        }
      }
    }
  }

  function checkForRowOfThree(i) {
    for (i = 0; i <= 61; i++) {
      let rowOfThree = [i, i + 1, i + 2];

      let decidedGumball = squares[i]
        .querySelector('.img-gumball')
        .getAttribute('alt');
      const isBlank =
        squares[i].querySelector('.img-gumball').getAttribute('alt') === '';

      if (!((rowOfThree[0] + 1) % 8 === 0 || (rowOfThree[1] + 1) % 8 === 0)) {
        if (
          rowOfThree.every(
            index =>
              squares[index]
                .querySelector('.img-gumball')
                .getAttribute('alt') === decidedGumball && !isBlank
          )
        ) {
          setScore(3);
          rowOfThree.forEach(index => {
            squares[index].innerHTML =
              '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
          });
        }
      }
    }
  }

  function checkForColumnOfThree() {
    for (i = 8; i <= 55; i++) {
      let columnOfThree = [i, i - 8, i + 8];
      let decidedGumball = squares[i]
        .querySelector('.img-gumball')
        .getAttribute('alt');
      const isBlank =
        squares[i].querySelector('.img-gumball').getAttribute('alt') === '';

      if (
        columnOfThree.every(
          index =>
            squares[index].querySelector('.img-gumball').getAttribute('alt') ===
              decidedGumball && !isBlank
        )
      ) {
        setScore(3);
        columnOfThree.forEach(index => {
          squares[index].innerHTML =
            '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
        });
      }
    }
  }

  function checkForRowOfFour() {
    for (i = 0; i <= 60; i++) {
      let rowOfFour = [i, i + 1, i + 2, i + 3];
      let decidedGumball = squares[i]
        .querySelector('.img-gumball')
        .getAttribute('alt');
      const isBlank =
        squares[i].querySelector('.img-gumball').getAttribute('alt') === '';

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
              squares[index]
                .querySelector('.img-gumball')
                .getAttribute('alt') === decidedGumball && !isBlank
          )
        ) {
          setScore(4);
          rowOfFour.forEach(index => {
            squares[index];
            squares[index].innerHTML =
              '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
          });
        }
      }
    }
  }

  function checkForColumnOfFour() {
    for (i = 8; i <= 47; i++) {
      let columnOfFour = [i, i - 8, i + 8, i + 16];
      let decidedGumball = squares[i]
        .querySelector('.img-gumball')
        .getAttribute('alt');
      const isBlank =
        squares[i].querySelector('.img-gumball').getAttribute('alt') === '';

      if (
        columnOfFour.every(
          index =>
            squares[index].querySelector('.img-gumball').getAttribute('alt') ===
              decidedGumball && !isBlank
        )
      ) {
        setScore(4);
        columnOfFour.forEach(index => {
          squares[index].innerHTML =
            '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
        });
      }
    }
  }

  function setScore(i) {
    score += i;
    let width = score * 0.06;
    zanyBar.style.width = width + 'rem';
    scoreBar.textContent = score;
  }

  function resetScore() {
    score = 0;
    zanyBar.style.width = 0 + 'rem';
    scoreBar.textContent = 0;
  }

  window.setInterval(function() {
    moveGbDown();
    checkForRowOfFour();
    checkForColumnOfFour();
    checkForColumnOfThree();
    checkForRowOfThree();
  }, 100);

  function checkForMatch() {
    checkForRowOfFour();
    checkForColumnOfFour();
    checkForColumnOfThree();
    checkForRowOfThree();
  }
});
