import * as waxjs from '@waxio/waxjs/dist';
import 'regenerator-runtime/runtime';
import { ExplorerApi, RpcApi } from 'atomicassets';
import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, onValue, update } from 'firebase/database';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { firebaseConfig } from './config';
import { stickerNames, stickerTemplates } from './templateData';

document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid');
  const collection_name = 'zanygumballs';
  const scoreTexts = document.getElementsByClassName('score');
  const zanyBar = document.getElementById('progress-front');
  const movesLeftText = document.getElementById('moves-left');

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
  let highScore = 0;
  let movesLeft = 30;
  let chancesLeft;
  let randomImg = getRandImg();
  let lastImg = gumballs[randomImg];
  let userAddress;
  let squareToSwap = '';
  let squareToSwapWith = '';
  let initiated = true;
  let setInitialPrevScore = true;
  let prevScore = 0;
  const loggedIn = sessionStorage.getItem('userLoggedIn');
  const tpImgEl =
    '<img src="./imgs/transparent.png" class="img-gumball" alt="" />';
  let bubblePopAudio = new Audio('./audios/bubble_pop_pitch_sharp2.mp3');
  let plopAudio = new Audio('./audios/plop.mp3');

  const app = initializeApp(firebaseConfig);
  const auth = getAuth();

  signInAnonymously(auth)
    .then(() => {
      console.log('signed in');
    })
    .catch(error => {
      console.log(error.message);
    });

  const analytics = getAnalytics(app);
  const database = getDatabase(app);
  const functions = getFunctions(app, 'us-central1');
  const saveScoreFunction = httpsCallable(functions, 'saveScore');
  const removeOneChanceFunction = httpsCallable(functions, 'removeOneChance');
  const addNewUserFunction = httpsCallable(functions, 'addNewUser');

  menuButton.addEventListener('click', () => {
    menu.classList.toggle('show-links');
  });

  if (loggedIn) {
    sectionLogin.style.display = 'none';
    userAddress = sessionStorage.getItem('userAddress');
    loginBtn.textContent = userAddress;
    userStickerTemplateIds = [];
    userStickerTemplateIds.push(
      ...JSON.parse(sessionStorage.getItem('userStickerTemplateIds'))
    );
    initGame();
  }

  const wax = new waxjs.WaxJS({
    rpcEndpoint: 'https://wax.greymass.com'
  });

  async function login() {
    try {
      await wax.login();
      enterBtn.textContent = wax.userAccount;
      userAddress = wax.userAccount;
      userAddress = userAddress.replace(/\./g, '_');
      initGame();
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
        wax.userAccount,
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

    fillLeaderboard();
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
      if (movesLeft >= 1) {
        if (movesLeft > 28) {
          //removing chances when user has started playing
          removeOneChance();
        }
      } else {
        if (chancesLeft > 0) {
          movesLeft = 30;
        } else {
          movesLeft = 0;
        }
        let gameResTime = 5;
        const interval = document.getElementById('interval');
        interval.style.display = 'grid';
        const timer = document.getElementById('timer');
        timer.textContent = gameResTime;
        let gameResTimer = window.setInterval(() => {
          updateChancesText();
          if (gameResTime > 0) {
            gameResTime--;
            timer.textContent = gameResTime.toString();
          } else {
            resetScore();
            setPrevScoreText();
            saveHighScore();
            randomizeGumballs();
            interval.style.display = 'none';
            clearInterval(gameResTimer);
          }
        }, 1000);
      }
      setMoves();
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
          squares[i - width].innerHTML = tpImgEl;
        } else if (i <= 7) {
          var randImg = getRandImg();
          squares[
            i
          ].innerHTML = `<img src="./imgs/${gumballs[randImg]}.png" class="img-gumball" alt="${gumballs[randImg]}" />`;
        }
        bubblePopAudio.play();
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
          plopAudio.play();
          rowOfThree.forEach(index => {
            squares[index].style.backgroundColor = 'goldenrod';
          });
          setTimeout(function() {
            if (chancesLeft > -1) {
              setScore(3);
            }
            rowOfThree.forEach(index => {
              squares[index].style.backgroundColor = '';
              squares[index].innerHTML = tpImgEl;
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
        plopAudio.play();
        columnOfThree.forEach(index => {
          squares[index].style.backgroundColor = 'goldenrod';
        });
        if (chancesLeft > -1) {
          setScore(3);
        }
        setTimeout(function() {
          columnOfThree.forEach(index => {
            squares[index].innerHTML = tpImgEl;
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
          plopAudio.play();
          rowOfFour.forEach(index => {
            squares[index].style.backgroundColor = 'goldenrod';
          });
          setTimeout(function() {
            if (chancesLeft > -1) {
              setScore(4);
            }
            rowOfFour.forEach(index => {
              squares[index].innerHTML = tpImgEl;
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
        plopAudio.play();
        columnOfFour.forEach(index => {
          squares[index].style.backgroundColor = 'goldenrod';
        });
        setTimeout(function() {
          if (chancesLeft > -1) {
            setScore(4);
          }
          columnOfFour.forEach(index => {
            squares[index].innerHTML = tpImgEl;
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
      score: score
    };

    const userDataRef = ref(database, userAddress);
    update(userDataRef, userData)
      .then(() => {})
      .catch(error => {
        console.log(error);
      });
  }

  function removeOneChance() {
    let userData = {
      user_id: userAddress
    };

    removeOneChanceFunction(userData)
      .then(result => {
        console.log(result.data.chances_left);
      })
      .catch(error => {
        console.log(error.message);
      });
  }

  function setScore(i) {
    score += i;
    let width = score * 0.06;
    zanyBar.style.width = width + 'rem';
    [...scoreTexts].forEach(scoreText => {
      scoreText.textContent = score;
    });
    saveScore();
  }

  function saveHighScore() {
    if (prevScore > highScore) {
      const highScoreData = {
        high_score: prevScore
      };
      const userDataRef = ref(database, userAddress);
      update(userDataRef, highScoreData)
        .then(() => {
          console.log(highScoreData);
        })
        .catch(error => {
          console.log(error);
        });
    }
  }

  function setPrevScoreText() {
    prevScoreText.textContent = prevScore.toString();
  }

  function resetScore() {
    score = 0;
    zanyBar.style.width = 0 + 'rem';
    [...scoreTexts].forEach(scoreText => {
      scoreText.textContent = score;
    });
  }

  function setMoves() {
    movesLeftText.textContent = movesLeft.toString();
  }

  function initGame() {
    const userDataRef = ref(database, userAddress);
    onValue(userDataRef, snapshot => {
      if (!snapshot.exists()) {
        addNewUserFunction({
          user_id: userAddress
        })
          .then(result => {
            chancesLeft = result.data.chances_left;
          })
          .catch(error => console.log(error));
      } else {
        const result = snapshot.val();
        chancesLeft = result.chances_left;
        highScore = result.high_score;
        if (initiated && loggedIn) {
          initiated = false;
          updateChancesText();
          randomizeGumballs();
        } else if (initiated && !loggedIn) {
          initiated = false;
          updateChancesText();
          getGumballs();
        }
        console.log('server - chances left', chancesLeft);
      }
    });
  }

  function updateChancesText() {
    console.log('chances left', chancesLeft);

    [...chancesLeftTexts].forEach(element => {
      element.textContent = chancesLeft.toString();
    });
    for (let i = 4; i >= chancesLeft; i--) {
      cbLights[i].style.display = 'none';
    }
    cbLen = chancesLeft;
  }

  function fillLeaderboard() {
    const usersDataRef = ref(database);
    onValue(usersDataRef, snapshot => {
      const data = snapshot.val();
      console.log(data);
      sortByRank(data);
    });
  }

  function sortByRank(usersData) {
    let userByRank = [];
    const usersDataKeys = Object.keys(usersData);
    let highScores = [];
    let scores = [];
    let rankScores = [];
    usersDataKeys.forEach(userKey => {
      highScores.push(usersData[userKey]['high_score']);
      scores.push(usersData[userKey]['score']);
    });
    for (let i = 0; i < highScores.length; i++) {
      rankScores.push(Math.max(highScores[i], scores[i]));
    }
    let scoresOld = [];
    scoresOld.push(...rankScores);
    rankScores.sort(function(a, b) {
      return b - a;
    });

    rankScores.forEach(score => {
      let oldScoreIndex = scoresOld.indexOf(score);
      let user = usersDataKeys[oldScoreIndex];
      userByRank.push(user);
      scoresOld[oldScoreIndex] = '';
    });

    if (userByRank.includes(userAddress)) {
      let userIndex = userByRank.indexOf(userAddress);
      prevScore = scores[userIndex];
      if (setInitialPrevScore) {
        setPrevScoreText();
        setInitialPrevScore = false;
      }
      rankText.textContent = (userIndex + 1).toString();
    } else {
      rankText.textContent = 'No Rank';
    }
  }
});
