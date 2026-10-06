/* Alke Wallet - Módulo compartido: estado, sesión y utilidades */
const Wallet = (() => {
  const STATE_KEY = 'alkeWalletState';
  const SESSION_KEY = 'alkeWalletSession';

  // Usuario de demostración (cámbialo si quieres)
  const DEMO_USER = { email: 'correo@alkewallet.com', password: '123456' };

  const clp = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currency: 'CLP',
    maximumFractionDigits: 0
  });

  function initialState() {
    const now = Date.now();
    return {
      balance: 100000,
      contacts: [
        { name: 'Juan Pérez', email: 'juan.perez@correo.com', bank: 'Banco Estado' },
        { name: 'María González', email: 'maria.gonzalez@correo.com', bank: 'Banco de Chile' },
        { name: 'Pedro Soto', email: 'pedro.soto@correo.com', bank: 'Santander' }
      ],
      transactions: [
        { id: 3, type: 'income', description: 'Depósito Automático', amount: 50000, date: new Date(now - 5 * 86400000).toISOString() },
        { id: 2, type: 'expense', description: 'Transferencia a Juan Pérez', amount: 12000, date: new Date(now - 86400000).toISOString() },
        { id: 1, type: 'income', description: 'Depósito en Efectivo', amount: 35000, date: new Date(now - 3600000).toISOString() }
      ]
    };
  }

  function getState() {
    try {
      const raw = localStorage.getItem(STATE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* datos corruptos: se reinicia */ }
    const state = initialState();
    saveState(state);
    return state;
  }

  function saveState(state) {
    localStorage.setItem(STATE_KEY, JSON.stringify(state));
  }

  /* ---------- Sesión ---------- */
  function login(email, password) {
    const ok = email.trim().toLowerCase() === DEMO_USER.email && password === DEMO_USER.password;
    if (ok) sessionStorage.setItem(SESSION_KEY, email.trim().toLowerCase());
    return ok;
  }

  function logout() {
    sessionStorage.removeItem(SESSION_KEY);
  }

  function requireSession() {
    if (!sessionStorage.getItem(SESSION_KEY)) {
      window.location.href = 'login.html';
    }
  }

  /* ---------- Formato ---------- */
  function formatMoney(amount) {
    return clp.format(amount);
  }

  function formatDate(iso) {
    const d = new Date(iso);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);
    const time = d.toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit', hour12: false });
    if (d.toDateString() === today.toDateString()) return `Hoy, ${time}`;
    if (d.toDateString() === yesterday.toDateString()) return `Ayer, ${time}`;
    return d.toLocaleDateString('es-CL', { day: 'numeric', month: 'short', year: 'numeric' });
  }

  /* ---------- Operaciones ---------- */
  function addTransaction(state, type, description, amount) {
    const nextId = state.transactions.reduce((max, t) => Math.max(max, t.id), 0) + 1;
    state.transactions.unshift({
      id: nextId,
      type,
      description,
      amount,
      date: new Date().toISOString()
    });
  }

  function deposit(amount) {
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, error: 'Ingresa un monto válido mayor a 0.' };
    }
    const state = getState();
    state.balance += amount;
    addTransaction(state, 'income', 'Depósito en Efectivo', amount);
    saveState(state);
    return { ok: true, balance: state.balance };
  }

  function sendMoney(contactEmail, amount) {
    const state = getState();
    const contact = state.contacts.find(c => c.email === contactEmail);
    if (!contact) return { ok: false, error: 'Selecciona un contacto.' };
    if (!Number.isFinite(amount) || amount <= 0) {
      return { ok: false, error: 'Ingresa un monto válido mayor a 0.' };
    }
    if (amount > state.balance) {
      return { ok: false, error: 'Saldo insuficiente para realizar la transferencia.' };
    }
    state.balance -= amount;
    addTransaction(state, 'expense', `Transferencia a ${contact.name}`, amount);
    saveState(state);
    return { ok: true, balance: state.balance, contact };
  }

  function addContact(contact) {
    const state = getState();
    const email = contact.email.trim().toLowerCase();
    if (state.contacts.some(c => c.email === email)) {
      return { ok: false, error: 'Ya existe un contacto con ese correo.' };
    }
    state.contacts.push({ name: contact.name.trim(), email, bank: contact.bank.trim() });
    saveState(state);
    return { ok: true };
  }

  return {
    getState, login, logout, requireSession,
    formatMoney, formatDate, deposit, sendMoney, addContact
  };
})();
