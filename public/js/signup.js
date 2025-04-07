document.getElementById('sendCode').addEventListener('click', async () => {
  const email = document.getElementById('email').value;


  try {
    const response = await fetch('/api/auth/send-code', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email })
    });

    const data = await response.json();

    if (response.ok) {
      alert('Código enviado, revisa tu correo.');
    } else {
      alert(data.error || 'Error al enviar código');
    }
  } catch (error) {
    console.error('Error:', error);
    alert('No se pudo conectar al servidor');
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

    console.log('Respuesta del servidor:', response);

    const data = await response.json();

    if (!response.ok) throw new Error(data.error);

    window.location.replace('/products');

  } catch (error) {
    errorElement.textContent = error.message;
    errorElement.style.display = 'block';
  }
});