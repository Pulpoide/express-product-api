document.getElementById('forgotPasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const email = document.getElementById('email').value;
  const errorElement = document.getElementById('errorMessage');
  const successElement = document.getElementById('successMessage');
  const submitButton = document.querySelector('#forgotPasswordForm button[type="submit"]');

  errorElement.style.display = 'none';
  successElement.style.display = 'none';

  submitButton.disabled = true;
  submitButton.textContent = 'Enviando...';

  try {
    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await response.json();

    if (response.ok) {
      successElement.textContent =
        'Código enviado, revisa tu correo electrónico para restablecer tu contraseña';
      successElement.style.display = 'block';
    } else {
      errorElement.textContent = data.errors?.[0] || 'Error al procesar la solicitud.';
      errorElement.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    errorElement.textContent = 'No se pudo conectar al servidor.';
    errorElement.style.display = 'block';
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = 'Reset Password';
  }
});
