document.getElementById('resetPasswordForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const token = document.getElementById('token').value;
  const password = document.getElementById('password').value;
  const confirmPassword = document.getElementById('confirmPassword').value;
  const errorElement = document.getElementById('errorMessage');
  const successElement = document.getElementById('successMessage');

  errorElement.style.display = 'none';
  successElement.style.display = 'none';

  if (password !== confirmPassword) {
    errorElement.textContent = 'Las contraseñas no coinciden.';
    errorElement.style.display = 'block';
    return;
  }

  try {
    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, password, confirmPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      successElement.textContent =
        'Contraseña restablecida con éxito. Redirigiendo al inicio de sesión...';
      successElement.style.display = 'block';

      setTimeout(() => {
        window.location.href = '/signin';
      }, 3000);
    } else {
      errorElement.textContent = data.errors || 'Error al restablecer la contraseña.';
      errorElement.style.display = 'block';
    }
  } catch (error) {
    console.error('Error:', error);
    errorElement.textContent = 'No se pudo conectar al servidor.';
    errorElement.style.display = 'block';
  }
});
