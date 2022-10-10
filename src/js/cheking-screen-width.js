const screenWidth = window.screen.width;

function checkingScreenForWidth(screenWidth) {
  let number = 0;
  if (screenWidth >= 320 && screenWidth < 768) {
    number = 3;
  } else if (screenWidth >= 768 && screenWidth < 1280) {
    number = 6;
  } else if (screenWidth >= 1280) {
    number = 9;
  }
  return number;
}

export const checkingScreenWidth = checkingScreenForWidth(screenWidth);
