const leaderboard = document.querySelector('.leaderboard');
const btnLogin = document.getElementById('login');
const btnMenu = document.getElementById('btn-menu');
const menu = document.querySelector('.links');

if (sessionStorage.getItem('userAddress') !== null) {
  btnLogin.textContent = sessionStorage.getItem('userAddress');
  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('show-links');
  });

  if (sessionStorage.getItem('userByRank') !== null) {
    let userByRank = JSON.parse(sessionStorage.getItem('userByRank'));
    let scores = JSON.parse(sessionStorage.getItem('scores'));
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
} else {
  window.location.href = zanyGumballsSite;
}
