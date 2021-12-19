import { initializeApp } from 'firebase/app';
import { getAuth, signInAnonymously } from 'firebase/auth';
import { getAnalytics } from 'firebase/analytics';
import {
  getDatabase,
  ref,
  query,
  onValue,
  orderByChild,
  startAt,
  child
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
        ref(database, `leaderboard`),
        orderByChild('highScore'),
        startAt(1)
      );
      onValue(usersDataRef, snapshot => {
        let usersData = {};
        snapshot.forEach(child => {
          usersData[child.key] = child.val();
        });
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
  const userNames = Object.keys(usersData);
  userNames.reverse();

  let i = 1;
  leaderboard.innerHTML = `<tr>
          <th>Rank</th>
          <th>Address</th>
          <th>High Score</th>
          <th>Time Taken</th>
          <th>Zany Points</th>
        </tr>`;
  userNames.forEach(user => {
    leaderboard.innerHTML += `<tr>
                <td>${i}</td>
                <td>${user.replace(/\_/g, '.')}</td>
                <td>${usersData[user][`highScore`]}</td>
                <td>${usersData[user][`timeTaken`]}</td>
                <td>${usersData[user][`pts`]}</td>
                </tr>`;
    i++;
  });
}
