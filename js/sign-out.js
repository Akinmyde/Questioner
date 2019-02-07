const myToken = localStorage.getItem('token');
if (myToken) {
  document.getElementById('login').addEventListener('click', (e) => {
    e.preventDefault();
    localStorage.clear();
    window.location.replace('index.html');
  });
}
