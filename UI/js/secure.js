/* eslint-disable no-restricted-globals */
const userToken = localStorage.getItem('token');
if (!userToken) {
  window.location.href = 'login.html';
}
