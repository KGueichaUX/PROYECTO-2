document.addEventListener('DOMContentLoaded', () => {
  Wallet.requireSession();

  const form = document.getElementById('depositForm');
  const amountInput = document.getElementById('amount');
  const alertBox = document.getElementById('alertBox');
  const balanceEl = document.getElementById('currentBalance');

  const showBalance = () => {
    balanceEl.textContent = Wallet.formatMoney(Wallet.getState().balance);
  };
  showBalance();

  function showAlert(type, message) {
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const amount = Number(amountInput.value);
    const result = Wallet.deposit(amount);

    if (!result.ok) {
      showAlert('danger', result.error);
      return;
    }
    showAlert('success', `Depósito exitoso. Tu nuevo saldo es ${Wallet.formatMoney(result.balance)}.`);
    showBalance();
    form.reset();
  });
});
