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
  let userByRank = [];
  const userDataKeys = Object.keys(usersData);
  let highScores = [];
  let scores = [];
  let rankScores = [];
  userDataKeys.forEach(userKey => {
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
    let user = userDataKeys[oldScoreIndex];
    userByRank.push(user);
    scoresOld[oldScoreIndex] = '';
  });

  let i = 1;
  leaderboard.innerHTML = `<tr>
          <th>Rank</th>
          <th>Address</th>
          <th>High Score</th>
        </tr>`;
  userByRank.forEach(user => {
    if (rankScores[i - 1] !== 0) {
      leaderboard.innerHTML += `<tr>
                <td>${i}</td>
                <td>${user.replace(/\_/g, '.')}</td>
                <td>${rankScores[i - 1]}</td>
              </tr>`;
      i++;
    }
  });
}
