const productos = [{
        id: 1,
        nombre: "Mesa",
        imagen: "mesa.png",
        precio: 20000
    },
    {
        id: 2,
        nombre: "Escritorio",
        imagen: "escritorio.png",
        precio: 18000
    },
    {
        id: 3,
        nombre: "Placard",
        imagen: "placard.jpg",
        precio: 30000
    },
    {
        id: 4,
        nombre: "Puff",
        imagen: "puff.png",
        precio: 14000
    },
    {
        id: 5,
        nombre: "Silla",
        imagen: "silla.png",
        precio: 10000
    },
    {
        id: 6,
        nombre: "Mesa Ratona",
        imagen: "mesa-ratona.png",
        precio: 13000
    }
];

function obtenerProductosLS() {
    return JSON.parse(localStorage.getItem("productos")) || [];
}

function guardarProductosLS(productos) {
    localStorage.setItem("productos", JSON.stringify(productos));
}

function obtenerProductosCarrito() {
    return JSON.parse(localStorage.getItem("Productos en carrito")) || [];
}

function guardarProductosCarrito(productos) {
    localStorage.setItem("Productos en carrito", JSON.stringify(productos));
}

guardarProductosLS(productos);


