//Creacion de la clases
class Producto {
    constructor(id, nombre, precio, descuento) {

        this.aplicarDescuento = function () {
            if (descuento > 0) {
                return precio - (precio * descuento / 100);
            }
            else {
                return precio;
            }
        }

        this.id = id,
        this.precio = precio,
        this.nombre = nombre,
        this.descuento = descuento;
        this.precioFinal = this.aplicarDescuento();
    }
}

class CarritoItem {
    constructor(producto, cantidad) {
        this.producto = producto,
        this.cantidad = cantidad
    }
}

const carrito = JSON.parse(localStorage.getItem('carrito')) || {
    carritosItems: [],
    total: 0
};


//Carrito

function vaciarCarritoFun() {
    carrito.carritosItems = [];
    actualizarCarrito();
    localStorage.removeItem("carrito");
}

function actualizarCarritoItem(carritoItem, container){
    const element = document.createElement("p");
    element.textContent =
    `Producto: ${carritoItem.producto.nombre} 
    - Precio unitario: $${carritoItem.producto.precioFinal} 
    - Cantidad: ${carritoItem.cantidad}`
    container.append(element);
}

function actualizarCarrito() {
    const carritoItemsContainer = document.getElementById("carritosItemsId");
    if (carrito.carritosItems.length) {
        carritoItemsContainer.innerHTML = '';
        for (const carritoItem of carrito.carritosItems) {
            actualizarCarritoItem(carritoItem, carritoItemsContainer);
        }
        const carritoTotal = document.createElement('p');
        carritoTotal.textContent = `Total: ${carrito.total}`
        carritoItemsContainer.append(carritoTotal);
        const vaciarCarrito = document.createElement('button');
        vaciarCarrito.textContent = "Vaciar carrito";
        vaciarCarrito.onclick = () => {vaciarCarritoFun()};
        carritoItemsContainer.append(vaciarCarrito);
    }
    else {
        carritoItemsContainer.innerHTML = "<p>No hay productos agregados</p>";
    }
}

//Funciones generales

function agregarProducto(producto) {
    const carritoItem = carrito.carritosItems.find(carritoItem => carritoItem.producto.id === producto.id);
    if (carritoItem) {
        carritoItem.cantidad++;
    }
    else {
        carrito.carritosItems.push(new CarritoItem(producto, 1));
    }
    carrito.total += producto.precioFinal;
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function enlistarProductos(productosArray) {
    for (const producto of productosArray) {
        const productItemContainer = document.createElement("div");
        const productItemNombre = document.createElement("h3");
        const productItemPrecio = document.createElement("p");
        const productItemDescuento = document.createElement("p");
        const productItemPrecioFinal = document.createElement("p");
        const productItemButton = document.createElement("button");
        productItemNombre.textContent = producto.nombre;
        productItemPrecio.innerText = "Precio: $" + producto.precio;
        productItemDescuento.innerText = "Descuento: " + producto.descuento + "%";
        productItemPrecioFinal.innerText = "Precio final: $" + producto.precioFinal;
        productItemButton.innerText = "Agregar al carrito";
        productItemButton.onclick = () => {
            agregarProducto(producto);
        }
        productItemContainer.append(productItemNombre);
        productItemContainer.append(productItemPrecio);
        productItemContainer.append(productItemDescuento);
        productItemContainer.append(productItemPrecioFinal);
        productItemContainer.append(productItemButton);
        productItemContainer.className= 'col-3 py-3'
        divProductos.append(productItemContainer);
    }
}

//Creacion de productos
const productos = [];
productos.push(new Producto(1, "Celular", 150, 10));
productos.push(new Producto(2, "Televisor", 200, 0));
productos.push(new Producto(3, "Teclado", 20, 50));
productos.push(new Producto(4, "Mouse", 10, 20));
productos.push(new Producto(5, "Pendrive", 5, 0));
productos.push(new Producto(6, "Audífonos", 50, 15));
productos.push(new Producto(7, "Monitor", 180, 8));
productos.push(new Producto(8, "Impresora", 90, 25));
productos.push(new Producto(9, "Altavoces", 40, 5));
productos.push(new Producto(10, "Cámara", 120, 12));
productos.push(new Producto(11, "Silla de Oficina", 120, 10));
productos.push(new Producto(12, "Lámpara LED", 30, 5));
productos.push(new Producto(13, "Router WiFi", 70, 0));
productos.push(new Producto(14, "Disco Duro Externo", 85, 15));
productos.push(new Producto(15, "Memoria RAM", 60, 8));
productos.push(new Producto(16, "Tablet", 180, 12));
productos.push(new Producto(17, "Cargador Portátil", 25, 20));
productos.push(new Producto(18, "Auriculares Bluetooth", 50, 7));
productos.push(new Producto(19, "Mochila para Laptop", 40, 0));
productos.push(new Producto(20, "Smartwatch", 100, 18));

//Agregar los productos al DOM
const divProductos = document.getElementById("productosId");
divProductos.id = "productosId";
enlistarProductos(productos);

//Filtrador de precios
const inputProductos = document.getElementById('inputProductosId');
let productosFiltrados;
inputProductos.addEventListener('input', () => {
    if (inputProductos.value) {
        productosFiltrados = productos.filter(producto => {
            return producto.precioFinal <= inputProductos.value;
        });
    }
    else if (inputProductos.value === '') {
        productosFiltrados = productos;
    }
    divProductos.innerHTML = '';
    if (productosFiltrados.length > 0) {
        enlistarProductos(productosFiltrados);
    }
    else {
        const mensajeError = document.createElement('p');
        mensajeError.textContent = "No se encontraron productos en ese rango de precio";
        divProductos.append(mensajeError);
    }
});

actualizarCarrito();