import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import { getDatabase, ref, onValue } from 'firebase/database';
import { firebaseConfig } from './config';

const btnLogin = document.getElementById('login');
const btnMenu = document.getElementById('btn-menu');
const menu = document.querySelector('.links');
const leaderboard = document.querySelector('.leaderboard');

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
  let scores = [];
  userDataKeys.forEach(userKey => {
    scores.push(usersData[userKey]['score']);
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

  let i = 1;
  userByRank.forEach(user => {
    leaderboard.innerHTML += `<tr>
              <td>${i}</td>
              <td>${user}</td>
              <td>${scores[i - 1]}</td>
            </tr>`;
    i++;
  });
}
