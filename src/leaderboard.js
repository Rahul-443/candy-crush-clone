import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import {
  getDatabase,
  ref,
  query,
  onValue,
  orderByChild,
  startAt
} from 'firebase/database';
import { firebaseConfig } from './config';

const loginText = document.getElementById('login');
const btnMenu = document.getElementById('btn-menu');
const menu = document.querySelector('.links');
const leaderboard = document.querySelector('.leaderboard');
const zanyGumballsSite = 'https://zany-gumballs.web.app';
const logoutText = document.getElementById('logout');
const interval = document.getElementById('interval');
let initialized = true;

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const database = getDatabase(app);

interval.style.display = 'flex';

if (sessionStorage.getItem('userAddress') !== null) {
  loginText.textContent = sessionStorage
    .getItem('userAddress')
    .replace(/\_/g, '.');
  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('show-links');
  });
  logoutText.addEventListener('click', logout);

  signInAnonymously(auth)
    .then(() => {
      const usersDataRef = query(
        ref(database, `users`),
        orderByChild('high_score'),
        startAt(1)
      );
      onValue(usersDataRef, snapshot => {
        const usersData = snapshot.val();
        console.log(usersData);

        if (usersData !== null) {
          sortByRank(usersData);
        }
        if (initialized) {
          interval.style.display = 'none';
          initialized = false;
        }
      });
    })
    .catch(error => {
      console.log(error);
    });
} else {
  window.location.href = zanyGumballsSite;
}

function logout() {
  location.href = zanyGumballsSite;
  sessionStorage.removeItem('userLoggedIn');
}

function sortByRank(usersData) {
  let userDataByRank = {};
  const usersDataKeys = Object.keys(usersData);
  let highScores = [];
  let scores = [];
  let timeTakenHighScores = [];
  let timeTakenScores = [];
  let rankScores = [];
  let rankTimeTaken = [];
  let rankPts = [];
  usersDataKeys.forEach(userKey => {
    highScores.push(usersData[userKey]['high_score']);
    scores.push(usersData[userKey]['score']);
    timeTakenHighScores.push(usersData[userKey][`time_taken_high_score`]);
    timeTakenScores.push(usersData[userKey]['time_taken_score']);
  });
  for (let i = 0; i < highScores.length; i++) {
    let rankPtsHighScore = highScores[i] / timeTakenHighScores[i];
    let rankPtsScore = scores[i] / timeTakenScores[i];
    if (rankPtsHighScore > rankPtsScore) {
      rankScores.push(highScores[i]);
      rankTimeTaken.push(timeTakenHighScores[i]);
      rankPts.push(rankPtsHighScore);
    } else {
      rankScores.push(scores[i]);
      rankTimeTaken.push(timeTakenScores[i]);
      rankPts.push(rankPtsScore);
    }
  }
  let ptsOld = [];
  ptsOld.push(...rankPts);
  rankPts.sort(function(a, b) {
    return b - a;
  });

  rankPts.forEach(pts => {
    let oldPtIndex = ptsOld.indexOf(pts);
    let user = usersDataKeys[oldPtIndex];
    let userHighScore = rankScores[oldPtIndex];
    let userTimeTaken = rankTimeTaken[oldPtIndex];
    userDataByRank[user] = {
      pts: pts.toFixed(3),
      highScore: userHighScore,
      timeTaken: changeValToTime(userTimeTaken)
    };
    ptsOld[oldPtIndex] = '';
  });

  let i = 1;
  leaderboard.innerHTML = `<tr>
          <th>Rank</th>
          <th>Address</th>
          <th>High Score</th>
          <th>Time Taken</th>
          <th>Zany Points</th>
        </tr>`;
  let rankUsers = Object.keys(userDataByRank);
  rankUsers.forEach(user => {
    if (rankScores[i - 1] !== 0) {
      leaderboard.innerHTML += `<tr>
                <td>${i}</td>
                <td>${user.replace(/\_/g, '.')}</td>
                <td>${userDataByRank[user][`highScore`]}</td>
                <td>${userDataByRank[user][`timeTaken`]}</td>
                <td>${userDataByRank[user][`pts`]}</td>
                </tr>`;
      i++;
    }
  });
}

function changeValToTime(timeTaken) {
  let mins = `00`;
  let secs = `00`;
  let time = `00:00`;
  mins = Math.floor(timeTaken / 60);
  if (timeTaken >= 60) {
    secs = timeTaken % 60;
  } else {
    secs = timeTaken;
  }
  if (mins > 10 && secs > 10) {
    mins = `${mins}`;
    secs = `${secs}`;
  } else if (mins > 10 && secs < 10) {
    mins = `${mins}`;
    secs = `0${secs}`;
  } else if (mins < 10 && secs > 10) {
    mins = `0${mins}`;
    secs = `${secs}`;
  } else if (mins < 10 && secs < 10) {
    mins = `0${mins}`;
    secs = `0${secs}`;
  }
  time = `${mins}:${secs}`;
  return time;
}
