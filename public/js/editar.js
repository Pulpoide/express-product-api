document.addEventListener('DOMContentLoaded', () => {
  const formEditar = document.querySelector('#formEditar');
  const inputImagen = document.querySelector('input[type="file"]');

  if (formEditar) {
    formEditar.addEventListener('submit', async (e) => {
      e.preventDefault();

      const id = formEditar.dataset.code;
      let imgFilename = formEditar.elements['img'].value.replace(/.*[\/\\]/, '');

      try {
        if (inputImagen.files.length > 0) {
          const formData = new FormData();
          formData.append('file', inputImagen.files[0]);

          const resImg = await fetch(`/api/upload`, {
            method: 'POST',
            body: formData,
          });

          if (!resImg.ok) throw new Error('Error al subir imagen');

          const imgData = await resImg.json();
          imgFilename = imgData.filename;
        }

        const response = await fetch(`/api/products/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            nombre: formEditar.elements['nombre'].value,
            descripcion: formEditar.elements['descripcion'].value,
            precio: formEditar.elements['precio'].value,
            marca: formEditar.elements['marca'].value,
            stock: formEditar.elements['stock'].value,
            img: imgFilename,
          }),
        });

        if (!response.ok) throw new Error('Error al actualizar producto');

        alert('Producto actualizado correctamente');
        window.location.href = `/product/${id}`;
      } catch (error) {
        console.error('Error en la actualización:', error);
        alert(error.message || 'Error al actualizar el producto');
      }
    });
  }
});
