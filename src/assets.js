import { stickerTemplates, stickerNames, names } from './templateData';

const btnLogin = document.getElementById('login');
const btnMenu = document.getElementById('btn-menu');
const menu = document.querySelector('.links');
const assets = document.querySelector('.assets');

if (sessionStorage.getItem('userAddress') !== null) {
  btnLogin.textContent = sessionStorage.getItem('userAddress');
  btnMenu.addEventListener('click', () => {
    menu.classList.toggle('show-links');
  });

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
