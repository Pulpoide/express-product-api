document.addEventListener('DOMContentLoaded', () => {
    fetch('/api/products')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(products => {
            const tableBody = document.getElementById('products-table-body');
            if (products && products.products.length > 0) {
                products.products.forEach(product => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <th scope="row">${product._id}</th>
                        <td>${product.nombre}</td>
                        <td>${product.descripcion}</td>
                        <td>$${product.precio}</td>
                        <td>${product.marca}</td>
                        <td>${product.stock}</td>
                        <td>
                            <a type="button" class="btn btn-warning" href="/product/${product._id}" role="button">
                            Info
                            </a>
                        </td>
                    `;
                    tableBody.appendChild(row);
                });
            } else {
                tableBody.innerHTML = '<tr><td colspan="7">No hay productos disponibles.</td></tr>';
            }
        })
        .catch(error => {
            console.error('Error fetching products:', error);

            if (error instanceof TypeError && error.message === 'Failed to fetch') {
                window.location.replace('/signin');
            } else {
                const tableBody = document.getElementById('products-table-body');
                tableBody.innerHTML = '<tr><td colspan="7">Error al cargar productos.</td></tr>';
            }
        });
});