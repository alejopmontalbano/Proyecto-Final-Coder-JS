function busquedaProductos(id) {
    let productos = obtenerProductosLS();
    return productos.find(x => x.id == id);
}

function vaciarCarrito() {
    localStorage.removeItem("Productos en carrito");
    actualizarCantidadCarrito();
    renderizarCarrito();
}

function agregarAlCarrito(id) {
    let productosSeleccionados = obtenerProductosCarrito();
    let posicion = productosSeleccionados.findIndex(x => x.id == id);

    if (posicion > -1) {
        productosSeleccionados[posicion].cantidad += 1;
    } else {
        let producto = busquedaProductos(id);
        producto.cantidad = 1;
        productosSeleccionados.push(producto);
    }
    guardarProductosCarrito(productosSeleccionados);
    actualizarCantidadCarrito();
    renderizarCarrito();
}

function eliminarDelCarrito(id) {
    let productosSeleccionados = obtenerProductosCarrito();
    let posicion = productosSeleccionados.findIndex(x => x.id == id);
    productosSeleccionados[posicion].cantidad -= 1;

    if (productosSeleccionados[posicion].cantidad == 0) {
        productosSeleccionados.splice(posicion, 1);
    }

    guardarProductosCarrito(productosSeleccionados);
    actualizarCantidadCarrito();
    renderizarCarrito();
}

function salirCarrito() {
    renderizarCarrito();
}

function terminarCompra() {
    const swalWithBootstrapButtons = Swal.mixin({
        customClass: {
            confirmButton: 'btn btn-success',
            cancelButton: 'btn btn-danger'
        },
        buttonsStyling: false
    })

    swalWithBootstrapButtons.fire({
        title: '¿Estás seguro/a?',
        text: "Sí todavía no lo estás, podés cancelar la compra!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: '¡Si, quiero comprar!',
        cancelButtonText: 'Cancelar compra',
        reverseButtons: true
    }).then((result) => {
        if (result.isConfirmed) {
            swalWithBootstrapButtons.fire(
                '¡Compra existosa!',
                'Tu pedido te llegará en 72hs. hábiles.',
                'success'
            )
            mostrarCuenta();
        } else if (
            result.dismiss === Swal.DismissReason.cancel
        ) {
            swalWithBootstrapButtons.fire(
                'Compra cancelada',
                'Podés volver a compra cuando lo desees!',
                'error'
            )
            actualizarCantidadCarrito();
        }
    })
}

function mostrarSpinner() {
    let contenido = `<div class="text-center">
        <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
        </div>
    </div>`;
    document.getElementById("localidades").innerHTML = contenido;
}