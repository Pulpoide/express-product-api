document.addEventListener('DOMContentLoaded', () => {
    const formCrear = document.querySelector('#formCrear');
    const input = document.querySelector('input[type="file"]');

    formCrear.addEventListener('submit', async (e) => {
        e.preventDefault();

        const nombre = formCrear.elements['nombre'].value;
        const descripcion = formCrear.elements['descripcion'].value;
        const precio = Number(formCrear.elements['precio'].value);
        const marca = formCrear.elements['marca'].value;
        const stock = Number(formCrear.elements['stock'].value);
        const img = formCrear.elements['img'].value.replace(/.*[\/\\]/, '');

        console.log({ nombre, descripcion, precio, marca, stock, img });

        try {
            const productResponse = await fetch(`http://localhost:8888/api/products`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nombre, descripcion, precio, marca, stock, img })
            });

            const productData = await productResponse.json();

            if (input.files.length > 0) {
                const formData = new FormData();
                formData.append('file', input.files[0]);

                const resImg = await fetch(`http://localhost:8888/api/upload`, {
                    method: 'POST',
                    body: formData
                });
            }

            window.location.href = `/products`;

        } catch (error) {
            console.error("Error al crear el producto o subir la imagen:", error);
        }
    });
});
