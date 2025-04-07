document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("signin-form").addEventListener("submit", async (e) => {
        e.preventDefault();
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

            const data = await response.json();

            if (!response.ok) throw new Error(data.message || 'Error desconocido');

            window.location.replace('/products');

        } catch (error) {
            errorElement.textContent = error.message;
            errorElement.style.display = 'block';
        }
    });
});
