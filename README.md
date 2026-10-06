# Alke Wallet

Billetera digital web que permite iniciar sesión, consultar el saldo, depositar dinero, enviar transferencias a contactos y revisar los últimos movimientos. Está construida con HTML, CSS, Bootstrap 5 y JavaScript puro; no necesita backend, ya que los datos se guardan en el navegador.

## Funcionalidades

- **Bienvenida:** pantalla de presentación con acceso al login.
- **Inicio de sesión:** valida email y contraseña, y muestra un mensaje de error si son incorrectos.
- **Menú principal:** muestra el saldo actual y da acceso a depositar, enviar dinero y ver movimientos. Incluye cierre de sesión.
- **Depositar:** valida el monto, actualiza el saldo y registra el movimiento.
- **Enviar dinero:** búsqueda de contactos en tiempo real, validación de monto y de saldo suficiente, y registro de la transferencia. Permite agregar contactos nuevos (sin correos repetidos).
- **Últimos movimientos:** listado de ingresos y gastos con fecha y montos en pesos chilenos (CLP).
- **Protección de páginas:** si no hay sesión iniciada, las pantallas internas redirigen al login.

## Tecnologías

- HTML5
- CSS3 (hojas de estilo por pantalla, tipografía Plus Jakarta Sans)
- Bootstrap 5.3 (vía CDN)
- JavaScript (ES6+)
- `localStorage` y `sessionStorage` para persistencia de datos y sesión

## Estructura del proyecto

```
alke-wallet/
├── index.html            # Bienvenida
├── login.html            # Inicio de sesión
├── menu.html             # Menú principal
├── deposit.html          # Depósitos
├── sendmoney.html        # Envío de dinero y contactos
├── transactions.html     # Últimos movimientos
├── css/
│   ├── styleindex.css
│   ├── stylelogin.css
│   ├── stylemenu.css
│   ├── styledeposit.css
│   ├── stylesendmoney.css
│   └── styletransaction.css
├── js/
│   ├── wallet.js         # Módulo compartido: estado, sesión y operaciones
│   ├── login.js
│   ├── menu.js
│   ├── deposit.js
│   ├── sendmoney.js
│   └── transactions.js
└── img/
    ├── logo_aw_color.png
    └── fondo_bienvenida.jpg
```

## Cómo ejecutarlo

1. Descarga o clona el proyecto.
2. Abre `index.html` en el navegador (o usa una extensión como Live Server en VS Code).
3. Haz clic en **Ingresar a mi Cuenta** e inicia sesión con las credenciales de prueba.

> Se requiere conexión a internet para cargar Bootstrap y las fuentes desde sus CDN.

## Credenciales de prueba

| Campo      | Valor                    |
| ---------- | ------------------------ |
| Email      | `correo@alkewallet.com`  |
| Contraseña | `123456`                 |

Se pueden modificar en la constante `DEMO_USER` de `js/wallet.js`.

## Cómo funciona el almacenamiento

- El saldo, los contactos y los movimientos se guardan en `localStorage` bajo la clave `alkeWalletState`, por lo que se conservan al cerrar el navegador.
- La sesión se guarda en `sessionStorage` y termina al cerrar la pestaña o al pulsar **Cerrar Sesión**.
- El estado inicial es un saldo de $100.000, tres contactos de ejemplo y tres movimientos de muestra.
- Para reiniciar la aplicación, borra los datos del sitio desde las herramientas de desarrollo del navegador (*Application > Storage*).

## Limitaciones

Este es un proyecto educativo: la autenticación es de demostración y los datos viven solo en el navegador del usuario, por lo que no debe usarse con información ni dinero reales.

## Autor

Proyecto desarrollado como parte de un curso de desarrollo web.
