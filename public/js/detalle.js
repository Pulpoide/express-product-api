document.addEventListener("DOMContentLoaded", () => {
    const btnEliminar = document.querySelector("#btnEliminar");

    if (btnEliminar) {
        btnEliminar.addEventListener("click", async (event) => {
            event.preventDefault();

            const id = btnEliminar.dataset.code;

            const confirmar = confirm("¿Estás seguro de eliminar este producto?");
            if (!confirmar) return;

            try {
                const response = await fetch(`/api/products/${id}`, {
                    method: "DELETE",
                });

                if (response.ok) {
                    window.location.href = "/products";
                } else {
                    const errorData = await response.json();
                    console.error("Error al eliminar:", errorData);
                    alert("Error al eliminar el producto");
                }
            } catch (error) {
                console.error("Error en la solicitud:", error);
                alert("Ocurrió un error al intentar eliminar el producto");
            }
        });
    }
});

