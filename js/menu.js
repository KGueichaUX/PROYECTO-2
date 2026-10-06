document.addEventListener('DOMContentLoaded', () => {
  Wallet.requireSession();
  document.getElementById('balance').textContent = Wallet.formatMoney(Wallet.getState().balance);

  document.getElementById('logoutLink').addEventListener('click', () => Wallet.logout());
});
