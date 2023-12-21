//Creacion de la clases
class Producto {
    constructor(id, nombre, imagen, precio) {

        this.id = id,
            this.imagen = imagen,
            this.precio = precio,
            this.nombre = nombre
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

let carritoActivo = false;

//Carrito

function removeCartItem(carritoItem) {
    let index = carrito.carritosItems.indexOf(carritoItem);
    if (index !== -1) {
        carrito.carritosItems.splice(index, 1);
    }
    console.log(carrito.total);
    console.log(carritoItem.producto.precio * carritoItem.cantidad);
    console.log(carrito.total - carritoItem.producto.precio * carritoItem.cantidad);
    carrito.total =carrito.total- carritoItem.producto.precio * carritoItem.cantidad;
    console.log(carrito.total);
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function comprarFun() {
    carrito.carritosItems = [];
    carrito.total = 0;
    localStorage.setItem("carrito", JSON.stringify(carrito));
    actualizarCarrito();
    closeCart();
    Swal.fire({
        title: "Compra Exitosa",
        text: "Su compra llegara pronto",
        icon: "success"
    });
}

function closeCart() {
    const carritoDiv = document.getElementsByClassName('cart')[0];
    carritoDiv.className = 'cart';
    document.body.className= ""
}

function openCart() {
    const carritoDiv = document.getElementsByClassName('cart')[0];
    carritoDiv.className = 'cart cart__visible'
    document.body.className= "lock-scrollbar"
    const button = document.getElementsByClassName("navbar-toggler")[0];
    const navbarCollapse = document.getElementsByClassName("navbar-collapse")[0];
    button.className="navbar-toggler collapsed";
    button.onclick = () =>{
        closeCart();
        carritoActivo= false;
    }
    navbarCollapse.className="navbar-collapse collapse";
}

function actualizarCarritoItem(carritoItem) {
    const image = document.getElementById(`carritoItemImageId${carritoItem.producto.id}`);
    image.src = carritoItem.producto.imagen
    const name = document.getElementById(`carritoItemNameId${carritoItem.producto.id}`);
    name.textContent = carritoItem.producto.nombre;
    const price = document.getElementById(`carritoItemPriceId${carritoItem.producto.id}`);
    price.textContent = "$" + carritoItem.producto.precio;
    const quantity = document.getElementById(`carritoItemQuantityId${carritoItem.producto.id}`);
    quantity.textContent = "Cantidad: " + carritoItem.cantidad;
}

function createRemoves() {
    for (const carritoItem of carrito.carritosItems) {
        const removeButton = document.getElementById(`carritoItemRemoveId${carritoItem.producto.id}`);
        removeButton.onclick = () => {
            removeCartItem(carritoItem);
        }
    }
}

function crearCarritoItem(carritoItem) {
    const carritosItemsContainer = document.getElementById("carritosItemsId");
    carritosItemsContainer.innerHTML += `<li class="flex py-6">\
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">\
            <img id="carritoItemImageId${carritoItem.producto.id}" src="" alt="" class="h-full w-full object-contain object-center">\
            </div>\
            <div class="ml-4 flex flex-1 flex-col">\
            <div>\
                <div class="flex justify-between text-base font-medium text-gray-900">\
                <h3 id="carritoItemNameId${carritoItem.producto.id}">\
                </h3>\
                <p id="carritoItemPriceId${carritoItem.producto.id}" class="ml-4"></p>\
                </div>\
            </div>\
            <div class="flex flex-1 items-end justify-between text-sm">\
                <p id="carritoItemQuantityId${carritoItem.producto.id}" class="text-gray-500"></p>\
                <div class="flex">\
                <button id="carritoItemRemoveId${carritoItem.producto.id}" type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Eliminar</button>\
                </div>\
            </div>\
            </div>\
        </li>`;

    actualizarCarritoItem(carritoItem);
}

function buy(){
    const buttonBuy= document.getElementById("buyButtonId");
    buttonBuy.onclick = () =>{
        comprarFun();
    }
}

function actualizarCarrito() {
    const carritosItemsContainer = document.getElementById("carritosItemsId");
    const totalCart = document.getElementById("totalCartId");
    totalCart.textContent = "$" + carrito.total;
    carritosItemsContainer.innerHTML = "";
    if (carrito.carritosItems.length) {
        for (let carritoItem of carrito.carritosItems) {
            crearCarritoItem(carritoItem)
        }
    }
    else{
        carritosItemsContainer.innerHTML = '<p class="text-center mt-5">No hay productos agregados al carrito</p>';
    }
    createRemoves();
    buy();

    const carritoToggleButton = document.getElementById("cartButtonId");
    carritoToggleButton.onclick = () => {
        !carritoActivo ? openCart() : closeCart();
        carritoActivo = !carritoActivo;
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
    carrito.total += producto.precio;
    actualizarCarrito();
    localStorage.setItem("carrito", JSON.stringify(carrito));
    Toastify({
        text: `${producto.nombre} agregado al carrito`,
        className: "info",
        gravity: "bottom",
        position: "center",
        stopOnFocus: false,
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
        }
    }).showToast();
}

//const mainElement = document.getElementById("mainId");
//mainElement.onclick = () => { closeCart() }

// function enlistarProductos(productosArray) {
//     for (const producto of productosArray) {
//         const productItemContainer = document.createElement("div");
//         const productItemNombre = document.createElement("h3");
//         const productItemImagen = document.createElement("img");
//         const productItemPrecio = document.createElement("p");
//         const productItemButton = document.createElement("button");
//         productItemNombre.textContent = producto.nombre;
//         productItemImagen.src = producto.imagen;
//         productItemImagen.className = "img-thumbnail"
//         productItemPrecio.innerText = "Precio: $" + producto.precio;
//         productItemButton.innerText = "Agregar al carrito";
//         productItemButton.className = "btn btn-primary";
//         productItemButton.onclick = () => {
//             agregarProducto(producto);
//         }
//         productItemContainer.append(productItemImagen);
//         productItemContainer.append(productItemNombre);
//         productItemContainer.append(productItemPrecio);
//         productItemContainer.append(productItemButton);
//         productItemContainer.className =
//             'col-lg-3 col-md-4 col-sm-6 py-3 text-center align-items-center products__item';
//         divProductos.append(productItemContainer);
//     }
// }

function enlistarProductos(productosArray) {
    const productGridContainer = document.getElementsByClassName("grid")[0];
    for (const producto of productosArray) {
        const productItemContainer = document.createElement("a");
        productItemContainer.className = 'group';
        const productImageContainer = document.createElement("div");
        productImageContainer.className = 'aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7';
        const productItemNombre = document.createElement("h3");
        productItemNombre.className = "mt-4 text-sm text-gray-700";
        const productItemImagen = document.createElement("img");
        productItemImagen.className = "h-full w-full object-cover object-center group-hover:opacity-75"
        const productItemPrecio = document.createElement("p");
        productItemPrecio.className = "mt-1 text-lg font-medium text-gray-900";
        const productItemButton = document.createElement("button");
        productItemNombre.textContent = producto.nombre;
        productItemImagen.src = producto.imagen;
        productItemImagen.alt = "Imagen de " + producto.nombre;
        productItemPrecio.innerText = "Precio: $" + producto.precio;
        productItemButton.innerText = "Agregar al carrito";
        productItemButton.className = "my-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 ";
        productItemButton.onclick = () => {
            agregarProducto(producto);
        }
        productImageContainer.append(productItemImagen);
        productItemContainer.append(productImageContainer);
        productItemContainer.append(productItemNombre);
        productItemContainer.append(productItemPrecio);
        productGridContainer.append(productItemContainer);
        productItemContainer.append(productItemButton);
        //productItemContainer.className =
        //    'col-lg-3 col-md-4 col-sm-6 py-3 text-center align-items-center products__item';
        divProductos.append(productGridContainer);
    }
}

//Creacion de productos
const productos = [
    new Producto(1, "Celular", "https://static.hendel.com/media/catalog/product/cache/0c3e9ac8430b5a3e77d1544ae1698a10/4/8/48229-min.jpg", 150),
    new Producto(2, "Televisor", "https://noblex.com.ar/media/wysiwyg/1408_tv.JPG", 200, 0),
    new Producto(3, "Teclado", "https://http2.mlstatic.com/D_NQ_NP_789265-MLA43540912849_092020-O.webp", 20, 50),
    new Producto(4, "Mouse", "https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g335/g335-black-gallery-1.png?v=1", 10, 20),
    new Producto(5, "Pendrive", "https://images.fravega.com/f500/6b52161fb55162cd722918d95042749b.jpg", 5, 0),
    new Producto(6, "Audífonos", "https://www.sony.com.ar/image/4e59487a5c5175284a49830878185789?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF", 50),
    new Producto(7, "Monitor", "https://www.venex.com.ar/products_images/1662643162_221v8.png", 180, 8),
    new Producto(8, "Impresora", "https://images.fravega.com/f1000/79d8ae305c8e4b1584554256d5b2c0ed.jpg", 90, 25),
    new Producto(9, "Altavoces", "https://http2.mlstatic.com/D_NQ_NP_900286-MLU70989872953_082023-O.webp", 40, 5),
    new Producto(10, "Cámara", "https://arsonyb2c.vtexassets.com/arquivos/ids/199524/ILCE-6400L_1.jpg?v=636864161613800000", 120),
    new Producto(11, "Silla de Oficina", "https://www.mink.com.ar/qloud/ryr/fotos/22634-1.jpg", 120, 10),
    new Producto(12, "Lámpara LED", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/267/984/products/le27-eca800201-ea21e030f93ede390b16575667669506-640-0.png", 30),
    new Producto(13, "Router WiFi", "https://http2.mlstatic.com/D_NQ_NP_659815-MLA31117176634_062019-O.webp", 70),
    new Producto(14, "Disco Duro Externo", "https://http2.mlstatic.com/D_NQ_NP_627809-MLA51326771407_082022-O.webp", 85),
    new Producto(15, "Memoria RAM", "https://http2.mlstatic.com/D_NQ_NP_936220-MLU54970736314_042023-O.webp", 60),
    new Producto(16, "Tablet", 'https://www.lenovo.com/medias/mkt-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoNzIvaDBmLzE1ODY4NzEwOTQ0Nzk4LnBuZ3xmNzRmYmVmYmI5YTljMTI0OTY2MzRlNTgzYWRiZjE0MDVmMjI2ODZmN2E0M2FjNjQ5NDRmNjQ1Y2ZmOGVlNWQz', 180),
    new Producto(17, "Cargador Portátil", "https://http2.mlstatic.com/D_NQ_NP_856761-MLA41816500687_052020-O.webp", 25),
    new Producto(18, "Auriculares Bluetooth", "https://http2.mlstatic.com/D_NQ_NP_662526-MLA52678025326_122022-O.webp", 50),
    new Producto(19, "Mochila para Laptop", "https://d2ye0ltusw47tz.cloudfront.net/61136210-thickbox_default/mochila-topper-laptop-ii-unisex.jpg", 40),
    new Producto(20, "Smartwatch", "https://www.suono.com.ar/media/catalog/product/cache/be277d79a8d024490fdf6d84a1464e00/d/i/dise_o_sin_t_tulo_79_.jpg", 100),
];

//Agregar los productos al DOM
const divProductos = document.getElementById("productosId");
divProductos.innerHTML = '<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">\
          </div>'
enlistarProductos(productos);

//Filtrador de precios
const inputProductos = document.getElementById('inputProductosId');
let productosFiltrados;
inputProductos.addEventListener('input', () => {
    if (inputProductos.value) {
        productosFiltrados = productos.filter(producto => {
            return producto.precio <= inputProductos.value;
        });
    }
    else if (inputProductos.value === '') {
        productosFiltrados = productos;
    }
    divProductos.innerHTML = '<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">\
              </div>'
    if (productosFiltrados.length > 0) {
        enlistarProductos(productosFiltrados);
    }
    else {
        const mensajeError = document.createElement('p');
        mensajeError.textContent = "No se encontraron productos en ese rango de precio";
        divProductos.append(mensajeError);
    }
});

//Dolar

const baseUrl = "https://dolarapi.com/v1/dolares/";
const dolarTypes = ["blue", "oficial", "tarjeta", "cripto"];

const dolarContainer = document.getElementsByClassName("dolar__container")[0];
for (const i of dolarTypes) {
    const dolarItem = document.createElement("div");
    dolarItem.className = "dolar__item";
    const dolarType = document.createElement("p");
    dolarType.className = "dolar__type";
    const dolarPrice = document.createElement("p");
    dolarPrice.className = "dolar__price";
    dolarContainer.append(dolarItem);
    dolarItem.append(dolarType);
    dolarItem.append(dolarPrice);
    fetch(baseUrl + i)
        .then((resp) => resp.json())
        .then((data) => {
            dolarType.textContent = "Dolar " + data.nombre;
            dolarPrice.textContent = "$" + data.venta;
        });
}


actualizarCarrito();