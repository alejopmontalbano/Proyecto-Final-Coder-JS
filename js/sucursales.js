let sucursalesZonaSur = ["Lanus", "Avellaneda", "Banfield"];

let sucursalesCABA = ["Puerto Madero", "Palermo", "Recoleta"];

let todasNuestrasSucursales = [...sucursalesZonaSur, ...sucursalesCABA];

function obtenerSucursalesLS() {
    return JSON.parse(localStorage.getItem("Sucursales")) || [];
}

function guardarSucursalesLS(todasNuestrasSucursales) {
    localStorage.setItem("Sucursales", JSON.stringify(todasNuestrasSucursales));
}

function renderizarSucursales() {
    let sucursales = obtenerSucursalesLS();
    contenido = `<div class="text-sucursales">`;

    for (sucursal of sucursales) {
        contenido += `<p> - ${sucursal}</p>`;
    }
    contenido += `</div>`;
    document.getElementById("modal-body").innerHTML = contenido;

}

guardarSucursalesLS(todasNuestrasSucursales);
renderizarSucursales();