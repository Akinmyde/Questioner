const showMenu = document.getElementsByClassName('show-menu')[0];
const hideMenu = document.getElementsByClassName('hide-menu')[0];
const menuItem = document.getElementsByClassName('header-right')[0];

showMenu.addEventListener('click', (e) => {
  e.preventDefault();
  showMenu.style.display = 'none';
  hideMenu.style.display = 'block';
  menuItem.style.display = 'block';
});

hideMenu.addEventListener('click', (e) => {
  e.preventDefault();
  showMenu.style.display = 'block';
  hideMenu.style.display = 'none';
  menuItem.style.display = 'none';
});
