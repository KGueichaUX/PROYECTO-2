document.addEventListener('DOMContentLoaded', () => {
  Wallet.requireSession();

  const list = document.getElementById('transactionList');
  const { transactions } = Wallet.getState();

  if (transactions.length === 0) {
    list.innerHTML = '<p class="text-muted text-center">Aún no tienes movimientos.</p>';
    return;
  }

  transactions.forEach(t => {
    const isIncome = t.type === 'income';

    const item = document.createElement('div');
    item.className = `list-group-item ${isIncome ? 'income' : 'expense'} d-flex justify-content-between align-items-center py-3 px-3 mb-2 bg-light rounded shadow-sm`;

    const info = document.createElement('div');
    const title = document.createElement('h6');
    title.className = 'mb-0 fw-bold';
    title.textContent = t.description;
    const date = document.createElement('small');
    date.className = 'text-muted';
    date.textContent = Wallet.formatDate(t.date);
    info.append(title, date);

    const badge = document.createElement('span');
    badge.className = isIncome
      ? 'badge bg-success-subtle text-success p-2 fs-6 fw-bold'
      : 'badge bg-danger-subtle text-danger p-2 fs-6 fw-bold';
    badge.textContent = `${isIncome ? '+' : '-'}${Wallet.formatMoney(t.amount)}`;

    item.append(info, badge);
    list.appendChild(item);
  });
});
