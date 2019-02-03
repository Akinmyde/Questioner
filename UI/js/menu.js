const login = document.getElementById('login');
const usersToken = localStorage.getItem('token');
const dashboard = document.getElementById('dashboard');
dashboard.style.display = 'none';
const admin = localStorage.getItem('isAdmin');

if (usersToken) {
  dashboard.style.display = 'block';
  if (admin) {
    dashboard.href = 'admin.html';
  } else {
    dashboard.href = 'user.html';
  }
  login.innerHTML = 'Sign out';
}
