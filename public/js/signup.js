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
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
      successElement.textContent = 'Código enviado, revisa tu correo electrónico';
      successElement.style.display = 'block';
    } else {
      errorElement.textContent = data.errors || 'Error al enviar código';
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
    errorElement.textContent = "Las contraseñas no coinciden";
    errorElement.style.display = 'block';
  }

  try {
    const response = await fetch('/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email,
        password,
        confirmPassword,
        verificationCode
      })
    });

    const data = await response.json();

    if (!response.ok) throw new Error(data.errors || data.message || 'Error desconocido');

    window.location.replace('/products');

  } catch (error) {
    errorElement.textContent = error.message;
    errorElement.style.display = 'block';
  }
});