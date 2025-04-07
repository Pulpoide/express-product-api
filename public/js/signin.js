document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("signin-form").addEventListener("submit", async (e) => {
        e.preventDefault();
        console.log("preventDefault llamado");
        const errorElement = document.getElementById('errorMessage');
        errorElement.style.display = 'none';

        try {
            const response = await fetch('/api/auth/signin', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: document.getElementById('email').value,
                    password: document.getElementById('password').value
                }),
                credentials: 'include'
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
});
