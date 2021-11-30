const leaderboard = document.querySelector('.leaderboard');
const btnLogin = document.getElementById('login');
const localHost = 'http://localhost:8080';
const zanyGumballsSite = 'https://zany-gumballs.herokuapp.com';

if (sessionStorage.getItem('userAddress') !== null) {
  btnLogin.textContent = sessionStorage.getItem('userAddress');

  fetch(`${zanyGumballsSite}/users`)
    .then(response => response.json())
    .then(data => sortByRank(data));

  function sortByRank(userData) {
    let userByRank = [];
    const userDataKeys = Object.keys(userData);
    let scores = [];
    userDataKeys.forEach(userKey => {
      scores.push(userData[userKey]['score']);
    });
    scoresOld = [];
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
    console.log(leaderboard.innerHTML);
  }
} else {
  window.location.href = zanyGumballsSite;
}
