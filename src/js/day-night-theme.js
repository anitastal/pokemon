const refsTheme = {
  body: document.querySelector('body'),
  themeBox: document.querySelector('.header__color-theme-box__switch'),
  themeBall: document.querySelector('.header__color-theme-box__switch-ball'),
};

refsTheme.themeBox.addEventListener('click', changeThemeOnClick);

function changeThemeOnClick() {
  const settings = {
    toddler: refsTheme.themeBall.classList.toggle('ball-right'),
    toddlerText: `refsTheme.themeBall.classList.toggle('ball-right')`,
  };
  nightTheme();
  localStorage.setItem('settings', JSON.stringify(settings));
  if (settings.toddler === false) {
    dayTheme();
  }
}

const getSettings = localStorage.getItem('settings');
const getParsedSettings = JSON.parse(getSettings);

if (getParsedSettings && getParsedSettings.toddler === true) {
  eval(getParsedSettings.toddlerText);
  nightTheme();
} else {
  dayTheme();
}

function dayTheme() {
  refsTheme.body.classList.remove('dark-theme');
}

function nightTheme() {
  refsTheme.body.classList.add('dark-theme');
}
