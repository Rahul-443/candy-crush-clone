import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from './config';

const btnLogin = document.getElementById('login');
const btnMenu = document.getElementById('btn-menu');
const menu = document.querySelector('.links');
const leaderboard = document.querySelector('.leaderboard');
const zanyGumballsSite = 'https://zany-gumballs.web.app';

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
signInAnonymously(auth)
  .then(() => {
    console.log('Signed In');
  })
  .catch(error => {
    console.log(error);
  });
const database = getDatabase(app);

if (sessionStorage.getItem('userAddress') !== null) {
  btnLogin.textContent = sessionStorage.getItem('userAddress');
  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('show-links');
  });

  const usersDataRef = ref(database);
  onValue(usersDataRef, snapshot => {
    const usersData = snapshot.val();
    sortByRank(usersData);
  });
} else {
  window.location.href = zanyGumballsSite;
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
  userByRank.innerHTML = '';
  userByRank.forEach(user => {
    leaderboard.innerHTML += `<tr>
              <td>${i}</td>
              <td>${user}</td>
              <td>${rankScores[i - 1]}</td>
            </tr>`;
    i++;
  });
}
