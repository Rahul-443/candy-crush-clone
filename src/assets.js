const assets = document.querySelector('.assets');
const btnLogin = document.getElementById('login');
const stickerTemplates = [
  '330504',
  '330501',
  '330495',
  '330490',
  '330487',
  '295563',
  '295562',
  '295561',
  '295560',
  '295559',
  '295558',
  '295557',
  '254475',
  '234211',
  '119963',
  '119799',
  '112103',
  '112098',
  '112093',
  '112091',
  '112090',
  '112089',
  '112083',
  '112076',
  '110470',
  '110469',
  '110468',
  '110467',
  '110463',
  '110456',
  '110454',
  '110449',
  '110444',
  '110419',
  '110416',
  '110413',
  '110410',
  '110406',
  '110405',
  '110404',
  '110401',
  '110395',
  '110391',
  '110389',
  '110385',
  '110384',
  '110381',
  '110379'
];
const stickerNames = [
  'clunk_bw',
  'me_bw',
  'link_bw',
  'chum_bw',
  'nan_bw',
  'zim',
  'rye',
  'rafe',
  'kay',
  'ice',
  'bae',
  'abe',
  'bop_saves_galaxy',
  'mooch_bw',
  'dave',
  'eke_two_sides',
  'pi',
  'pam',
  'kipp',
  'grey',
  'jill',
  'holt',
  'fuse',
  'elle',
  'yam',
  'trish',
  'stan',
  'sis',
  'shar',
  'sauce',
  'rush',
  'roy',
  'prim',
  'nan',
  'mooch',
  'mike',
  'me',
  'link',
  'kells',
  'jet',
  'hue',
  'faith',
  'eke',
  'dapp',
  'clunk',
  'chum',
  'bud',
  'bop'
];

if (sessionStorage.getItem('userAddress') !== null) {
  btnLogin.textContent = sessionStorage.getItem('userAddress');

  const userStickerTemplateIds = JSON.parse(
    sessionStorage.getItem('userStickerTemplateIds')
  );

  userStickerTemplateIds.forEach(id => {
    let stickerName = stickerNames[stickerTemplates.indexOf(id)];
    assets.innerHTML += `<div class="asset">
            <img src="./imgs/${stickerName}.png" alt="${stickerName}" />
            <p>${stickerName}</p>
          </div>`;
  });
} else {
  window.location.href = 'https://zany-gumballs.herokuapp.com';
}
