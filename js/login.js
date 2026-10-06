document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('loginForm');
  const errorBox = document.getElementById('loginError');

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    if (Wallet.login(email, password)) {
      window.location.href = 'menu.html';
    } else {
      errorBox.classList.remove('d-none');
    }
  });
});
