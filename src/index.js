import * as waxjs from '@waxio/waxjs/dist';
import 'regenerator-runtime/runtime';
import { ExplorerApi, RpcApi } from 'atomicassets';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const collection_name = 'zanygumballs';
  const scoreTexts = document.getElementsByClassName('score');
  const zanyBar = document.getElementById('progress-front');

  const sectionLogin = document.getElementById('section-login');
  const menuButton = document.getElementById('btn-menu');
  const menu = document.querySelector('.links');
  const chanceBar = document.getElementById('chance-bar');
  const cbLights = chanceBar.getElementsByClassName('chnc');
  let cbLen = cbLights.length;

  const chancesLeftTexts = document.getElementsByClassName('chances-left');

  const loginResult = document.getElementById('login-result');
  const loginBtn = document.getElementById('login');
  const enterBtn = document.getElementById('enter');
  const assetWrapper = document.getElementById('asset-wrapper');
  const rankText = document.getElementById('rank');
  const prevScoreText = document.getElementById('score-prev');
  const width = 8;
  let squares;
  let userStickerTemplateIds;
  let gumballs = [];
  let score = 0;
  let movesLeft = 30;
  let chancesLeft = 5;
  let prevScore;
  let loggedIn = false;

  let randomImg = getRandImg();
  let lastImg = gumballs[randomImg];
  let userAddress;
  const localHost = 'http://localhost:8080';
  const ipHost = 'http://192.168.43.118:8080';
  const zanyGumballsSite = 'https://zany-gumballs.herokuapp.com';
  let squareToSwap = '';
  let squareToSwapWith = '';

  const stickerTemplates = [
    '330504',
    '330501',
    '330495',
    '330490',
    '330487',
    '295563',
    '295562',
    '295561',
    '295560',
    '295559',
    '295558',
    '295557',
    '254475',
    '234211',
    '119963',
    '119799',
    '112103',
    '112098',
    '112093',
    '112091',
    '112090',
    '112089',
    '112083',
    '112076',
    '110470',
    '110469',
    '110468',
    '110467',
    '110463',
    '110456',
    '110454',
    '110449',
    '110444',
    '110419',
    '110416',
    '110413',
    '110410',
    '110406',
    '110405',
    '110404',
    '110401',
    '110395',
    '110391',
    '110389',
    '110385',
    '110384',
    '110381',
    '110379'
  ];
  const stickerNames = [
    'clunk_bw',
    'me_bw',
    'link_bw',
    'chum_bw',
    'nan_bw',
    'zim',
    'rye',
    'rafe',
    'kay',
    'ice',
    'bae',
    'abe',
    'bop_saves_galaxy',
    'mooch_bw',
    'dave',
    'eke_two_sides',
    'pi',
    'pam',
    'kipp',
    'grey',
    'jill',
    'holt',
    'fuse',
    'elle',
    'yam',
    'trish',
    'stan',
    'sis',
    'shar',
    'sauce',
    'rush',
    'roy',
    'prim',
    'nan',
    'mooch',
    'mike',
    'me',
    'link',
    'kells',
    'jet',
    'hue',
    'faith',
    'eke',
    'dapp',
    'clunk',
    'chum',
    'bud',
    'bop'
  ];

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('show-links');
  });

  if (sessionStorage.getItem('userLoggedIn')) {
    loggedIn = true;
    sectionLogin.style.display = 'none';
    userAddress = sessionStorage.getItem('userAddress');
    loginBtn.textContent = userAddress;
    userStickerTemplateIds = [];
    userStickerTemplateIds.push(
      ...JSON.parse(sessionStorage.getItem('userStickerTemplateIds'))
    );
    chancesLeft = sessionStorage.getItem('chancesLeft');
    prevScore = sessionStorage.getItem('prevScore');
    setChances();
    randomizeGumballs();
  }

  const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com'
  });

  async function login() {
    try {
      const userAccount = await wax.login();
      userAddress = wax.userAccount;
      enterBtn.textContent = userAddress;
      fetch(`${zanyGumballsSite}/users/${userAddress}`, { mode: 'cors' })
        .then(response => response.json())
        .then(data => {
          console.log(data);
          chancesLeft = data.chances_left;
          sessionStorage.setItem('chancesLeft', chancesLeft);
          setChances();
        });
      getGumballs();
    } catch (e) {
      console.log(e);
    }
  }

  enterBtn.addEventListener('click', login);

  const api = new ExplorerApi(
    'https://wax.api.atomicassets.io',
    'atomicassets',
    { fetch }
  );

  async function getGumballs() {
    try {
      const gumballs = await api.getAccountCollection(
        userAddress,
        collection_name
      );
      const templatesArray = gumballs['templates'];
      let templatedIdArray = [];
      templatesArray.forEach(template => {
        templatedIdArray.push(template['template_id']);
      });
      userStickerTemplateIds = [];
      templatedIdArray.forEach(templateId => {
        if (stickerTemplates.includes(templateId)) {
          userStickerTemplateIds.push(templateId);
        }
      });
      if (userStickerTemplateIds.length >= 6) {
        sessionStorage.setItem('userLoggedIn', true);
        sessionStorage.setItem('userAddress', userAddress);
        sessionStorage.setItem(
          'userStickerTemplateIds',
          JSON.stringify(userStickerTemplateIds)
        );
        sectionLogin.style.display = 'none';
        loginBtn.textContent = userAddress;
        randomizeGumballs();
      } else {
        loginResult.style.display = 'block';
        loginResult.textContent = `Sorry you can't enter you need at least 6 zany gumballs to play the game, you have ${userStickerTemplateIds.length} as of now`;
      }
    } catch (error) {
      console.log(error);
    }
  }

  function randomizeGumballs() {
    gumballs = [];
    let ids = [];
    ids.push(...userStickerTemplateIds);
    // Not sure why in the console the ids are being printed as if they have had already looped up and spliced up.

    for (let i = 0; i < 6; i++) {
      let randTempId = getRandTempId(ids);
      gumballs.push(stickerNames[stickerTemplates.indexOf(randTempId)]);
      let j = ids.indexOf(randTempId);
      if (j != -1) {
        ids.splice(j, 1);
      }
    }

    createBoard();
    if (chancesLeft > 0) {
      initiateDrag();

      window.setInterval(function() {
        moveGbDown();
        checkForRowOfFour();
        checkForColumnOfFour();
        checkForColumnOfThree();
        checkForRowOfThree();
      }, 250);
    }
    fetchUserScores();
  }

  function getRandTempId(templateIds) {
    return templateIds[Math.floor(Math.random() * templateIds.length)];
  }

  function createBoard() {
    grid.innerHTML = '';
    squares = [];
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

  function initiateDrag() {
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
    squares.forEach(square => square.addEventListener('click', selectSquare));

    function dragStart() {
      swapStart.call(this);

      console.log(this.id, 'dragstart');
    }

    function swapStart() {
      imgBeingDragged = this.querySelector('.img-gumball').getAttribute('src');
      ibdAlt = this.querySelector('.img-gumball').getAttribute('alt');
      squareIdBeingDragged = parseInt(this.id);
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
      swapEnd.call(this);

      console.log(this.id, 'drop');
      // TODO: Bug - if gb can fit in pattern it gets dropped;
    }

    function swapEnd() {
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

        if (ibrAlt !== ibdAlt) {
          movesLeft -= 1;
        }
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

      const movesLeftText = document.getElementById('moves-left');
      if (movesLeft >= 1) {
        if (movesLeft > 28) {
          //remove chances when user has started playing
          updateChance();
        }
        movesLeftText.textContent = movesLeft.toString();
      } else {
        saveScore();
        if (chancesLeft > 0) {
          let gameResTime = 5;
          const interval = document.getElementById('interval');
          console.log(chancesLeftTexts);
          removeOneChance();
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
              randomizeGumballs();
              movesLeftText.textContent = movesLeft.toString();
              clearInterval(gameResTimer);
            }
          }, 1000);
        } else {
          alert('game over');
          location.reload();
        }
      }
    }

    function dragEnd() {
      console.log(this.id, 'dragend');
    }

    function selectSquare() {
      console.log(this.id, 'clicked');
      if (squareToSwap === '') {
        squareToSwap = this.id;
        this.style.backgroundColor = 'aquamarine';
        swapStart.call(this);
      } else {
        squareToSwapWith = this.id;
        this.style.backgroundColor = 'goldenrod';
        swapEnd.call(this);
        squares[squareToSwap].style.backgroundColor = '';
        squares[squareToSwapWith].style.backgroundColor = '';
        squareToSwap = '';
        squareToSwapWith = '';
      }
    }
  }

  function moveGbDown() {
    for (let i = 0; i <= 63; i++) {
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
    for (let i = 0; i <= 61; i++) {
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
          rowOfThree.forEach(index => {
            squares[index].style.backgroundColor = 'goldenrod';
          });
          setTimeout(function() {
            setScore(3);
            rowOfThree.forEach(index => {
              squares[index].style.backgroundColor = '';
              squares[index].innerHTML =
                '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
            });
          }, 150);
        }
      }
    }
  }

  function checkForColumnOfThree() {
    for (let i = 8; i <= 55; i++) {
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
        columnOfThree.forEach(index => {
          squares[index].style.backgroundColor = 'goldenrod';
        });
        setScore(3);
        setTimeout(function() {
          columnOfThree.forEach(index => {
            squares[index].innerHTML =
              '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
            squares[index].style.backgroundColor = '';
          });
        }, 150);
      }
    }
  }

  function checkForRowOfFour() {
    for (let i = 0; i <= 60; i++) {
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
          rowOfFour.forEach(index => {
            squares[index].style.backgroundColor = 'goldenrod';
          });
          setTimeout(function() {
            setScore(4);
            rowOfFour.forEach(index => {
              squares[index].innerHTML =
                '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
              squares[index].style.backgroundColor = '';
            });
          }, 150);
        }
      }
    }
  }

  function checkForColumnOfFour() {
    for (let i = 8; i <= 47; i++) {
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
        columnOfFour.forEach(index => {
          squares[index].style.backgroundColor = 'goldenrod';
        });
        setTimeout(function() {
          setScore(4);
          columnOfFour.forEach(index => {
            squares[index].innerHTML =
              '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
            squares[index].style.backgroundColor = '';
          });
        }, 150);
      }
    }
  }

  function checkForMatch() {
    checkForRowOfFour();
    checkForColumnOfFour();
    checkForColumnOfThree();
    checkForRowOfThree();
  }

  function saveScore() {
    let userData = {
      user_id: userAddress,
      score: score
    };
    let formBody = [];
    for (let property in userData) {
      let encodedKey = encodeURIComponent(property);
      let encodedVal = encodeURIComponent(userData[property]);
      formBody.push(`${encodedKey}=${encodedVal}`);
    }
    formBody = formBody.join('&');
    fetch(
      `${zanyGumballsSite}/save_score`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      },
      { mode: 'cors' }
    )
      .then(response => response.json())
      .then(data => console.log(data));

    sessionStorage.setItem('prevScore', score);
  }

  function updateChance() {
    chancesLeft -= 1;

    let userData = {
      user_id: userAddress,
      chances_left: chancesLeft
    };
    let formBody = [];
    for (let property in userData) {
      let encodedKey = encodeURIComponent(property);
      let encodedVal = encodeURIComponent(userData[property]);
      formBody.push(`${encodedKey}=${encodedVal}`);
    }
    formBody = formBody.join('&');
    fetch(
      `${zanyGumballsSite}/update_chance`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
        },
        body: formBody
      },
      { mode: 'cors' }
    )
      .then(response => response.json())
      .then(data => console.log(data));

    sessionStorage.setItem('chancesLeft', chancesLeft);
  }

  function setScore(i) {
    score += i;
    let width = score * 0.06;
    zanyBar.style.width = width + 'rem';
    [...scoreTexts].forEach(scoreText => {
      scoreText.textContent = score;
    });
  }

  function resetScore() {
    score = 0;
    zanyBar.style.width = 0 + 'rem';
    [...scoreTexts].forEach(scoreText => {
      scoreText.textContent = score;
    });
  }

  function removeOneChance() {
    [...chancesLeftTexts].forEach(element => {
      element.textContent = chancesLeft.toString();
    });
    cbLights[cbLen - 1].style.display = 'none';
    cbLen--;
  }

  function setChances() {
    [...chancesLeftTexts].forEach(element => {
      element.textContent = chancesLeft.toString();
    });
    let usedChances = 5 - chancesLeft;
    for (let i = 1; i <= usedChances; i++) {
      cbLights[cbLen - i].style.display = 'none';
    }
    cbLen = chancesLeft;
  }

  function fetchUserScores() {
    fetch(`${zanyGumballsSite}/users`, { mode: 'cors' })
      .then(response => response.json())
      .then(data => sortByRank(data));
  }

  function sortByRank(userData) {
    let userByRank = [];
    const userDataKeys = Object.keys(userData);
    let scores = [];
    userDataKeys.forEach(userKey => {
      scores.push(userData[userKey]['score']);
    });
    let scoresOld = [];
    scoresOld.push(...scores);
    scores.sort(function(a, b) {
      return b - a;
    });

    scores.forEach(score => {
      let oldScoreIndex = scoresOld.indexOf(score);
      let user = userDataKeys[oldScoreIndex];
      userByRank.push(user);
      scoresOld[oldScoreIndex] = '';
    });

    sessionStorage.setItem('userByRank', JSON.stringify(userByRank));
    sessionStorage.setItem('scores', JSON.stringify(scores));

    if (userByRank.includes(userAddress)) {
      let userIndex = userByRank.indexOf(userAddress);

      rankText.textContent = (userIndex + 1).toString();
      prevScoreText.textContent = scores[userIndex].toString();
    } else {
      rankText.textContent = 'No Rank';
    }
  }
});
