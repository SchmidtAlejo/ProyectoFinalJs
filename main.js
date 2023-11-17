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
            this.nombre = nombre,
            this.precio = precio;
        this.descuento = descuento;
        this.precioFinal = this.aplicarDescuento();
    }
}

const productos = [];
const columnas = ["id", "nombre", "precio", "descuento", "precioFinal"]
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

console.table(productos, columnas);
let productosFiltrados;
function filtrarProductos() {
    const precioMaximo = prompt("Filtre los productos por precio maximo (Presiona cancelar para no filtrar los productos)");
    if (precioMaximo) {
        productosFiltrados = productos.filter(producto => {
            return producto.precioFinal <= precioMaximo;
        })
        console.table(productosFiltrados, columnas);
    }
    else{
        productosFiltrados= productos;
    }
}


function agregarProducto() {
    const productoId = prompt("Ingresa el ID del producto que quieres (Presiona cancelar para finalizar las seleccion de productos)");
    const producto = productosFiltrados.find(producto => producto.id === Number.parseInt(productoId));
    let resultado;
    if (productoId !== null && producto) {
        const cantidad = prompt("¿Cunatas unidades de este producto quieres?").toLowerCase();
        resultado = producto.precioFinal * cantidad;
    }
    else if(productoId===null){
        return null;
    }
    else {
        resultado = 0;
    }
    return resultado;
}

function calcularCosto() {
    let total = 0;
    let valorItem;
    do {
        valorItem = agregarProducto();
        if (valorItem !== null) {
            total += valorItem;
            console.log(total);
        }
    } while (valorItem !== null);

    return total;
}
alert("Los productos y precios aparecen en la Consola");
filtrarProductos()
alert("Costo total: $" + calcularCosto());