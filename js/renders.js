function renderizarProductos() {
    let productos = obtenerProductosLS();
    let contenido = ``;

    for (let producto of productos) {
        contenido += `
        <div class="">
        <img class="img-fluid" src="./img/${producto.imagen}" alt="${producto.nombre}">
        <p class="nombreProducto">${producto.nombre}</p>
        <p class="precio">$${producto.precio.toLocaleString()}</p>
        <button type="button" class="btn" onclick="agregarAlCarrito(${producto.id})">Agregar al carrito</button>
        </div>`;
    }
    document.getElementById("productos-container").innerHTML = contenido;
}

function actualizarCantidadCarrito() {
    let productos = obtenerProductosCarrito();
    let contenido = `
    <button type="button" class="btn btn-eliminar position-relative">
        <img class="carrito-logo" src="./img/carro-de-la-carretilla.png" alt="">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">0</span>
    </button>`;
    let total = 0;

    if (productos.length > 0) {
        for (let producto of productos) {
            total += producto.cantidad;
        }

        contenido = `
        <button type="button" class="btn btn-eliminar position-relative">
        <img class="carrito-logo" src="./img/carro-de-la-carretilla.png" alt="">
        <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">${total}</span>
        </button>`;
    }
    document.getElementById("btn-actualizarCarrito").innerHTML = contenido;

}

function renderizarCarrito() {
    let productos = obtenerProductosCarrito();
    let contenido = `<div class="alert alert-danger text-center" role="alert">¡El carrito se encuentra vacío! Agregue algún producto.</div>`;

    if (productos.length > 0) {
        contenido = `<div class="carritoCreado">`;
        let totalCuenta = 0;

        for (let producto of productos) {
            let precioFinal = producto.precio * producto.cantidad;
            contenido += `
            <div class="card-carrito">
                <img class="img-fluid foto-carrito" src="./img/${producto.imagen}" alt="">
                <p class="text-carrito">x${producto.cantidad}</p>
                <p class="text-carrito">$${precioFinal.toLocaleString()}</p>
                <button class="btn btn-eliminar" onclick="eliminarDelCarrito(${producto.id})"><img src="./img/tacho-basura.png" class="basura" alt=""></button>
            </div>`;
            totalCuenta += precioFinal;
        }
        contenido += `</div>`;
        contenido += `<button type="button" class="btn btn-vaciar" onclick="vaciarCarrito()">Vaciar</button>
        <div class="suma-total">
            <h4>Total a pagar:</h4>
            <p class="resumen-compra">$${totalCuenta.toLocaleString()}</p>
            <button type="button" class="btn btn-terminar" onclick="terminarCompra()">Terminar Compra</button>
        </div>`;
    }
    document.getElementById("carrito-container").innerHTML = contenido;
}

function mostrarCuenta() {
    const totalCompra = document.getElementsByClassName("resumen-compra")[0].innerHTML;
    let contenido = `
    <div class="alert alert-success" role="alert">
        <p class="compra-texto">GRACIAS POR LA COMPRA!</p>
        <p class="compra-texto">El total de la cuenta fue <b>${totalCompra}</b></p>
    </div>`;

    contenido += `<button type="button" class="btn btn-terminar" onclick="salirCarrito()">Salir</button>`;
    document.getElementById("carrito-container").innerHTML = contenido;
    localStorage.removeItem("Productos en carrito");
    actualizarCantidadCarrito();
}

async function renderEnvios() {
    const response = await fetch(`js/preciosEnvios.json`);
    const data = await response.json();
    let contenido = `<option id="selecciona">Seleccioná tu localidad</option>`;

    data.forEach(valor => {
        contenido += `
                <option id="local" value="${valor.precio}">${valor.localidad}</option>`;
    });

    document.getElementById("localidad").innerHTML = contenido;
}

function mostrarLocalidadSeleccionada() {
    let select = document.getElementById("localidad");
    select.addEventListener(`change`, function () {
        document.getElementById("selecciona").disabled = true;
        let selectedOption = this.options[select.selectedIndex];
        mostrarSpinner();
        setTimeout(() => {
            let contenido = `<div class="alert msj-localidad w-50" role="alert">`;
            contenido += `El envio a ` + selectedOption.text + ` tiene un valor de $` + selectedOption.value;
            contenido += `</div>`;
            document.getElementById("localidades").innerHTML = contenido;
        }, 2000);
    })
}

renderizarProductos();
actualizarCantidadCarrito();
renderizarCarrito();
renderEnvios();
mostrarLocalidadSeleccionada();