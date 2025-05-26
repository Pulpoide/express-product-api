document.getElementById('sendCode').addEventListener('click', async () => {
  const email = document.getElementById('email').value;
  const errorElement = document.getElementById('errorMessage');
  const successElement = document.getElementById('successMessage');

  errorElement.style.display = 'none';
  successElement.style.display = 'none';

  const sendCodeButton = document.getElementById('sendCode');
  sendCodeButton.disabled = true;
  sendCodeButton.textContent = 'Enviando...';

  try {
    const response = await fetch('/api/auth/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      successElement.textContent = 'Código enviado, revisa tu correo electrónico';
      successElement.style.display = 'block';
    } else {
      let errors = data.errors || ['Error al enviar código'];
      if (typeof errors === 'string') {
        errors = errors.split(',');
      } else if (Array.isArray(errors) && errors.length === 1 && errors[0].includes(',')) {
        errors = errors[0].split(',');
      }
      errorElement.innerHTML = '';
      errors.forEach(e => {
        const li = document.createElement('li');
        li.textContent = e.trim();
        errorElement.appendChild(li);
      });
      errorElement.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    errorElement.textContent = 'No se pudo conectar al servidor';
    errorElement.style.display = 'block';
  } finally {
    sendCodeButton.disabled = false;
    sendCodeButton.textContent = 'Enviar código';
  }
});

document.getElementById('signupForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const errorElement = document.getElementById('errorMessage');
  errorElement.style.display = 'none';

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const verificationCode = document.getElementById('verificationCode').value;

  if (password !== confirmPassword) {
    errorElement.innerHTML = '<li>Las contraseñas no coinciden</li>';
    errorElement.style.display = 'block';
    return;
  }

  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        verificationCode,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      let errors = data.errors || ['Error desconocido'];
      if (typeof errors === 'string') {
        errors = errors.split(',');
      } else if (Array.isArray(errors) && errors.length === 1 && errors[0].includes(',')) {
        errors = errors[0].split(',');
      }
      errorElement.innerHTML = '';
      errors.forEach(e => {
        const li = document.createElement('li');
        li.textContent = e.trim();
        errorElement.appendChild(li);
      });
      errorElement.style.display = 'block';
      return;
    }

    window.location.replace('/products');
  } catch (error) {
    errorElement.innerHTML = `<li>${error.message}</li>`;
    errorElement.style.display = 'block';
  }
});
