'use strict';

var _scripts = require('./scripts');

var waxjs = _interopRequireWildcard(_scripts);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

document.addEventListener('DOMContentLoaded', function () {
  var grid = document.querySelector('.grid');
  var width = 8;
  var squares = [];
  var score = 0;
  var movesLeft = 30;
  var chancesLeft = 5;

  var scoreBar = document.getElementById('score');
  var zanyBar = document.getElementById('progress-front');

  var chanceBar = document.getElementById('chance-bar');
  var cbLights = chanceBar.getElementsByClassName('chnc');
  var cbLen = cbLights.length;

  var gumballs = ['bop', 'bud', 'chum', 'clunk', 'dapp', 'eke'];

  var randomImg = getRandImg();
  var lastImg = gumballs[randomImg];

  function createBoard() {
    for (var _i = 0; _i < width * width; _i++) {
      createCell(_i);
    }
  }

  function getRandImg() {
    return Math.floor(Math.random() * gumballs.length);
  }

  function createCell(i) {
    randomImg = getRandImg();
    if (i > 8) {
      if (gumballs[randomImg] != document.getElementById(i - 2).getElementsByTagName('img')[0].getAttribute('alt') && gumballs[randomImg] != document.getElementById(i - 8).getElementsByTagName('img')[0].getAttribute('alt')) {
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
    var square = document.createElement('div');
    square.setAttribute('draggable', true);
    square.setAttribute('id', i);
    square.innerHTML = '<img class="img-gumball" src="./imgs/' + gumballs[randomImg] + '.png" alt="' + gumballs[randomImg] + '" />';
    lastImg = gumballs[randomImg];
    grid.appendChild(square);
    squares.push(square);
  }

  createBoard();

  var squareIdBeingDragged = void 0;
  var squareIdBeingReplaced = void 0;
  var imgBeingDragged = void 0;
  var imgBeingReplaced = void 0;
  var ibrAlt = void 0;
  var ibdAlt = void 0;

  squares.forEach(function (square) {
    return square.addEventListener('dragstart', dragStart);
  });
  squares.forEach(function (square) {
    return square.addEventListener('dragend', dragEnd);
  });
  squares.forEach(function (square) {
    return square.addEventListener('dragover', dragOver);
  });
  squares.forEach(function (square) {
    return square.addEventListener('dragenter', dragEnter);
  });
  squares.forEach(function (square) {
    return square.addEventListener('dragleave', dragLeave);
  });
  squares.forEach(function (square) {
    return square.addEventListener('drop', drop);
  });

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

    var validMoves = [squareIdBeingDragged - 1, squareIdBeingDragged - width, squareIdBeingDragged + 1, squareIdBeingDragged + width];

    var invalidMove = false;
    var invalidSquareId = void 0;

    if (squareIdBeingDragged === squareIdBeingReplaced - 1 || squareIdBeingDragged === squareIdBeingReplaced + 1) {
      if (squareIdBeingDragged % 8 === 0 && squareIdBeingReplaced < squareIdBeingDragged) {
        invalidSquareId = squareIdBeingDragged;
      } else if (squareIdBeingReplaced % 8 === 0 && squareIdBeingDragged < squareIdBeingReplaced) {
        invalidSquareId = squareIdBeingReplaced;
      }
    }

    if (invalidSquareId) {
      if ((squareIdBeingDragged === 0 || squareIdBeingReplaced === 0) && (squareIdBeingDragged === squareIdBeingReplaced - 1 || squareIdBeingDragged === squareIdBeingReplaced + 1)) {
        invalidMove = false;
      } else {
        invalidMove = true;
      }
    }

    var validMove = validMoves.includes(squareIdBeingReplaced);

    if ((squareIdBeingReplaced || imgBeingDragged) && validMove && !invalidMove) {
      console.log(0);

      squares[squareIdBeingDragged].innerHTML = '<img class="img-gumball" src="' + imgBeingReplaced + '" alt="' + ibrAlt + '" />';
      squares[squareIdBeingReplaced].innerHTML = '<img class="img-gumball" src="' + imgBeingDragged + '" alt="' + ibdAlt + '" />';
      checkForMatch();

      squareIdBeingReplaced = null;
      imgBeingDragged = null;
    } else if ((squareIdBeingReplaced || imgBeingReplaced) && (!validMove || invalidMove)) {
      console.log(1);

      squares[squareIdBeingDragged].innerHTML = '<img class="img-gumball" src="' + imgBeingDragged + '" alt="' + ibdAlt + '" />';
      squares[squareIdBeingReplaced].innerHTML = '<img class="img-gumball" src="' + imgBeingReplaced + '" alt="' + ibrAlt + '" />';
    } else {
      console.log(2);

      squares[squareIdBeingDragged].innerHTML = '<img class="img-gumball" src="' + imgBeingDragged + '" alt="' + ibdAlt + '" />';
    }

    movesLeft -= 1;
    var movesLeftText = document.getElementById('moves-left');
    if (movesLeft >= 0) {
      movesLeftText.textContent = movesLeft.toString();
    } else {
      chancesLeft -= 1;
      if (chancesLeft > 0) {
        var gameResTime = 5;
        var chancesLeftTexts = document.getElementsByClassName('chances-left');
        var interval = document.getElementById('interval');
        console.log(chancesLeftTexts);
        [].concat(_toConsumableArray(chancesLeftTexts)).forEach(function (element) {
          element.textContent = chancesLeft.toString();
        });
        cbLights[cbLen - 1].style.display = 'none';
        cbLen--;
        interval.style.display = 'grid';
        var timer = document.getElementById('timer');
        timer.textContent = gameResTime;
        var gameResTimer = window.setInterval(function () {
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
      if (squares[i].querySelector('.img-gumball').getAttribute('src') === './imgs/transparent.png') {
        if (i >= 8) {
          squares[i].innerHTML = squares[i - width].innerHTML;
          squares[i - width].innerHTML = '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
        } else if (i <= 7) {
          var randImg = getRandImg();
          squares[i].innerHTML = '<img src="./imgs/' + gumballs[randImg] + '.png" class="img-gumball" alt="' + gumballs[randImg] + '" />';
        }
      }
    }
  }

  function checkForRowOfThree(i) {
    var _loop = function _loop() {
      var rowOfThree = [i, i + 1, i + 2];

      var decidedGumball = squares[i].querySelector('.img-gumball').getAttribute('alt');
      var isBlank = squares[i].querySelector('.img-gumball').getAttribute('alt') === '';

      if (!((rowOfThree[0] + 1) % 8 === 0 || (rowOfThree[1] + 1) % 8 === 0)) {
        if (rowOfThree.every(function (index) {
          return squares[index].querySelector('.img-gumball').getAttribute('alt') === decidedGumball && !isBlank;
        })) {
          setScore(3);
          rowOfThree.forEach(function (index) {
            squares[index].innerHTML = '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
          });
        }
      }
    };

    for (i = 0; i <= 61; i++) {
      _loop();
    }
  }

  function checkForColumnOfThree() {
    var _loop2 = function _loop2() {
      var columnOfThree = [i, i - 8, i + 8];
      var decidedGumball = squares[i].querySelector('.img-gumball').getAttribute('alt');
      var isBlank = squares[i].querySelector('.img-gumball').getAttribute('alt') === '';

      if (columnOfThree.every(function (index) {
        return squares[index].querySelector('.img-gumball').getAttribute('alt') === decidedGumball && !isBlank;
      })) {
        setScore(3);
        columnOfThree.forEach(function (index) {
          squares[index].innerHTML = '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
        });
      }
    };

    for (i = 8; i <= 55; i++) {
      _loop2();
    }
  }

  function checkForRowOfFour() {
    var _loop3 = function _loop3() {
      var rowOfFour = [i, i + 1, i + 2, i + 3];
      var decidedGumball = squares[i].querySelector('.img-gumball').getAttribute('alt');
      var isBlank = squares[i].querySelector('.img-gumball').getAttribute('alt') === '';

      if (!((rowOfFour[0] + 1) % 8 === 0 || (rowOfFour[1] + 1) % 8 === 0 || (rowOfFour[2] + 1) % 8 === 0)) {
        if (rowOfFour.every(function (index) {
          return squares[index].querySelector('.img-gumball').getAttribute('alt') === decidedGumball && !isBlank;
        })) {
          setScore(4);
          rowOfFour.forEach(function (index) {
            squares[index];
            squares[index].innerHTML = '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
          });
        }
      }
    };

    for (i = 0; i <= 60; i++) {
      _loop3();
    }
  }

  function checkForColumnOfFour() {
    var _loop4 = function _loop4() {
      var columnOfFour = [i, i - 8, i + 8, i + 16];
      var decidedGumball = squares[i].querySelector('.img-gumball').getAttribute('alt');
      var isBlank = squares[i].querySelector('.img-gumball').getAttribute('alt') === '';

      if (columnOfFour.every(function (index) {
        return squares[index].querySelector('.img-gumball').getAttribute('alt') === decidedGumball && !isBlank;
      })) {
        setScore(4);
        columnOfFour.forEach(function (index) {
          squares[index].innerHTML = '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
        });
      }
    };

    for (i = 8; i <= 47; i++) {
      _loop4();
    }
  }

  function setScore(i) {
    score += i;
    var width = score * 0.06;
    zanyBar.style.width = width + 'rem';
    scoreBar.textContent = score;
  }

  function resetScore() {
    score = 0;
    zanyBar.style.width = 0 + 'rem';
    scoreBar.textContent = 0;
  }

  window.setInterval(function () {
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