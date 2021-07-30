export async function login() {
  const button = document.getElementById('login');
  const username = document.getElementById('username');
  const password = document.getElementById('password');

  username.value = 'admin@cyphr.live';
  password.value = 'Smores44!';

  button.click();
}
