import { stickerTemplates, stickerNames, names } from './templateData';

const loginText = document.getElementById('login');
const btnMenu = document.getElementById('btn-menu');
const menu = document.querySelector('.links');
const assets = document.querySelector('.assets');
const logoutText = document.getElementById('logout');
const bodyStyles = window.getComputedStyle(document.body);
const navLogSection = document.querySelector('.nav-log-user');
const zanyGumballsSite = 'https://zany-gumballs.web.app';

if (sessionStorage.getItem('userAddress') !== null) {
  loginText.textContent = sessionStorage
    .getItem('userAddress')
    .replace(/\_/g, '.');
  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('show-links');
  });

  logoutText.addEventListener('click', logout);

  const userStickerTemplateIds = JSON.parse(
    sessionStorage.getItem('userStickerTemplateIds')
  );

  userStickerTemplateIds.forEach(id => {
    let stickerImgName = stickerNames[stickerTemplates.indexOf(id)];
    let name = names[stickerTemplates.indexOf(id)];
    assets.innerHTML += `<div class="asset">
            <img src="./imgs/${stickerImgName}.png" alt="${name}" />
            <p>${name}</p>
          </div>`;
  });
} else {
  location.href = 'https://zany-gumballs.web.app';
}

function logout() {
  location.href = zanyGumballsSite;
  sessionStorage.removeItem('userLoggedIn');
}
