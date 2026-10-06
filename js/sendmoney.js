document.addEventListener('DOMContentLoaded', () => {
  Wallet.requireSession();

  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.getElementById('searchBtn');
  const contactList = document.getElementById('contactList');
  const alertBox = document.getElementById('alertBox');
  const sendForm = document.getElementById('sendForm');
  const selectedName = document.getElementById('selectedName');
  const amountInput = document.getElementById('amount');
  const balanceEl = document.getElementById('currentBalance');
  const contactForm = document.getElementById('newContactForm');
  const modalEl = document.getElementById('newContactModal');
  const contactError = document.getElementById('contactError');

  let selectedEmail = null;

  const showBalance = () => {
    balanceEl.textContent = Wallet.formatMoney(Wallet.getState().balance);
  };

  function showAlert(type, message) {
    alertBox.className = `alert alert-${type}`;
    alertBox.textContent = message;
  }

  function renderContacts() {
    const term = searchInput.value.trim().toLowerCase();
    const contacts = Wallet.getState().contacts.filter(c =>
      [c.name, c.email, c.bank].some(v => v.toLowerCase().includes(term))
    );

    contactList.innerHTML = '';
    if (contacts.length === 0) {
      const p = document.createElement('p');
      p.className = 'text-muted text-center small mb-0';
      p.textContent = 'No se encontraron contactos.';
      contactList.appendChild(p);
      return;
    }

    contacts.forEach(c => {
      const item = document.createElement('button');
      item.type = 'button';
      item.className = 'list-group-item list-group-item-action';
      if (c.email === selectedEmail) item.classList.add('active');

      const name = document.createElement('div');
      name.className = 'fw-semibold';
      name.textContent = c.name;
      const detail = document.createElement('small');
      detail.textContent = c.bank ? `${c.email} · ${c.bank}` : c.email;

      item.append(name, detail);
      item.addEventListener('click', () => selectContact(c));
      contactList.appendChild(item);
    });
  }

  function selectContact(contact) {
    selectedEmail = contact.email;
    selectedName.textContent = contact.name;
    sendForm.classList.remove('d-none');
    alertBox.className = 'd-none';
    amountInput.focus();
    renderContacts();
  }

  // Búsqueda
  searchInput.addEventListener('input', renderContacts);
  searchBtn.addEventListener('click', renderContacts);
  document.getElementById('searchForm').addEventListener('submit', (e) => {
    e.preventDefault();
    renderContacts();
  });

  // Enviar dinero
  sendForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = Wallet.sendMoney(selectedEmail, Number(amountInput.value));

    if (!result.ok) {
      showAlert('danger', result.error);
      return;
    }
    showAlert('success', `Enviaste ${Wallet.formatMoney(Number(amountInput.value))} a ${result.contact.name}.`);
    showBalance();
    sendForm.reset();
    sendForm.classList.add('d-none');
    selectedEmail = null;
    renderContacts();
  });

  // Nuevo contacto
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const result = Wallet.addContact({
      name: document.getElementById('contact-name').value,
      email: document.getElementById('contact-email').value,
      bank: document.getElementById('contact-bank').value
    });

    if (!result.ok) {
      contactError.textContent = result.error;
      contactError.classList.remove('d-none');
      return;
    }
    contactForm.reset();
    contactError.classList.add('d-none');
    bootstrap.Modal.getInstance(modalEl).hide();
    renderContacts();
    showAlert('success', 'Contacto guardado correctamente.');
  });

  modalEl.addEventListener('hidden.bs.modal', () => contactError.classList.add('d-none'));

  showBalance();
  renderContacts();
});
