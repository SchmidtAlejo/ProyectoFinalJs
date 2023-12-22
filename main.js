//class creation
class Product {
    constructor(id, name, img, price) {

        this.id = id,
            this.img = img,
            this.price = price,
            this.name = name
    }
}

class CartItem {
    constructor(product, quant) {
        this.product = product,
            this.quant = quant
    }
}

const cart = JSON.parse(localStorage.getItem('cart')) || {
    cartsItems: [],
    total: 0
};

let isCartActive = false;

//Cart

function removeCartItem(cartItem) {
    let index = cart.cartsItems.indexOf(cartItem);
    if (index !== -1) {
        cart.cartsItems.splice(index, 1);
    }
    cart.total =cart.total- cartItem.product.price * cartItem.quant;
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
}

function finishBuy() {
    cart.cartsItems = [];
    cart.total = 0;
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCart();
    closeCart();
    Swal.fire({
        title: "Compra Exitosa",
        text: "Su compra llegara pronto",
        icon: "success"
    });
}

function closeCart() {
    const cartDiv = document.getElementsByClassName('cart')[0];
    cartDiv.className = 'cart';
    document.body.className= "";
    isCartActive= false;
}

function openCart() {
    isCartActive= true;
    const cartDiv = document.getElementsByClassName('cart')[0];
    cartDiv.className = 'cart cart__visible'
    document.body.className= "lock-scrollbar"
    const button = document.getElementsByClassName("navbar-toggler")[0];
    const navbarCollapse = document.getElementsByClassName("navbar-collapse")[0];
    button.className="navbar-toggler collapsed";
    button.onclick = () =>{
        closeCart();
    }
    navbarCollapse.className="navbar-collapse collapse";
}

function updateCartItem(cartItem) {
    const img = document.getElementById(`carritoItemImageId${cartItem.product.id}`);
    img.src = cartItem.product.img
    const name = document.getElementById(`carritoItemNameId${cartItem.product.id}`);
    name.textContent = cartItem.product.name;
    const price = document.getElementById(`carritoItemPriceId${cartItem.product.id}`);
    price.textContent = "$" + cartItem.product.price;
    const quant = document.getElementById(`carritoItemQuantityId${cartItem.product.id}`);
    quant.textContent = "Cantidad: " + cartItem.quant;
}

function createRemoves() {
    for (const cartItem of cart.cartsItems) {
        const removeButton = document.getElementById(`carritoItemRemoveId${cartItem.product.id}`);
        removeButton.onclick = () => {
            removeCartItem(cartItem);
        }
    }
}

function createCartItem(cartItem) {
    const cartsItemsContainer = document.getElementById("carritosItemsId");
    cartsItemsContainer.innerHTML += `<li class="flex py-6">\
            <div class="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">\
            <img id="carritoItemImageId${cartItem.product.id}" src="" alt="" class="h-full w-full object-contain object-center">\
            </div>\
            <div class="ml-4 flex flex-1 flex-col">\
            <div>\
                <div class="flex justify-between text-base font-medium text-gray-900">\
                <h3 id="carritoItemNameId${cartItem.product.id}">\
                </h3>\
                <p id="carritoItemPriceId${cartItem.product.id}" class="ml-4"></p>\
                </div>\
            </div>\
            <div class="flex flex-1 items-end justify-between text-sm">\
                <p id="carritoItemQuantityId${cartItem.product.id}" class="text-gray-500"></p>\
                <div class="flex">\
                <button id="carritoItemRemoveId${cartItem.product.id}" type="button" class="font-medium text-indigo-600 hover:text-indigo-500">Eliminar</button>\
                </div>\
            </div>\
            </div>\
        </li>`;

    updateCartItem(cartItem);
}

function buy(){
    const buttonBuy= document.getElementById("buyButtonId");
    cart.cartsItems.length?buttonBuy.disabled=false:buttonBuy.disabled=true;
    buttonBuy.onclick = () =>{
        finishBuy();
    }
}

function updateCart() {
    const carritosItemsContainer = document.getElementById("carritosItemsId");
    const totalCart = document.getElementById("totalCartId");
    totalCart.textContent = "$" + cart.total;
    carritosItemsContainer.innerHTML = "";
    if (cart.cartsItems.length) {
        for (let cartItems of cart.cartsItems) {
            createCartItem(cartItems)
        }
    }
    else{
        carritosItemsContainer.innerHTML = '<p class="text-center mt-5">No hay productos agregados al carrito</p>';
    }
    createRemoves();
    buy();

    const carritoToggleButton = document.getElementById("cartButtonId");
    carritoToggleButton.onclick = () => {
        !isCartActive ? openCart() : closeCart();
    }
    const closeCartButton = document.getElementById("closeCartId");
    closeCartButton.onclick = () =>{
        closeCart();
    }
}

//General functions

function addProduct(product) {
    const cartItem = cart.cartsItems.find(cartItem => cartItem.product.id === product.id);
    if (cartItem) {
        cartItem.quant++;
    }
    else {
        cart.cartsItems.push(new CartItem(product, 1));
    }
    cart.total += product.price;
    updateCart();
    localStorage.setItem("cart", JSON.stringify(cart));
    Toastify({
        text: `${product.name} agregado al carrito`,
        className: "info toast-background",
        gravity: "bottom",
        position: "center",
        stopOnFocus: false
    }).showToast();
}

function listProducts(productsArray) {
    const productGridContainer = document.getElementsByClassName("grid")[0];
    for (const product of productsArray) {
        const productItemContainer = document.createElement("a");
        productItemContainer.className = 'group';
        const productImageContainer = document.createElement("div");
        productImageContainer.className = 'aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7';
        const productItemName = document.createElement("h3");
        productItemName.className = "mt-4 text-sm text-gray-700";
        const productItemImage = document.createElement("img");
        productItemImage.className = "h-full w-full object-cover object-center group-hover:opacity-75"
        const productItemPrice = document.createElement("p");
        productItemPrice.className = "mt-1 text-lg font-medium text-gray-900";
        const productItemButton = document.createElement("button");
        productItemName.textContent = product.name;
        productItemImage.src = product.img;
        productItemImage.alt = "Imagen de " + product.name;
        productItemPrice.innerText = "Precio: $" + product.price;
        productItemButton.innerText = "Agregar al carrito";
        productItemButton.className = "my-4 text-white bg-purple-700 hover:bg-purple-800 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 ";
        productItemButton.onclick = () => {
            addProduct(product);
        }
        productImageContainer.append(productItemImage);
        productItemContainer.append(productImageContainer);
        productItemContainer.append(productItemName);
        productItemContainer.append(productItemPrice);
        productGridContainer.append(productItemContainer);
        productItemContainer.append(productItemButton);
        divProducts.append(productGridContainer);
    }
}

//Product creation
const products = [
    new Product(1, "Celular", "https://static.hendel.com/media/catalog/product/cache/0c3e9ac8430b5a3e77d1544ae1698a10/4/8/48229-min.jpg", 150),
    new Product(2, "Televisor", "https://noblex.com.ar/media/wysiwyg/1408_tv.JPG", 200, 0),
    new Product(3, "Teclado", "https://http2.mlstatic.com/D_NQ_NP_789265-MLA43540912849_092020-O.webp", 20, 50),
    new Product(4, "Mouse", "https://http2.mlstatic.com/D_NQ_NP_740970-MLM50439192936_062022-O.webp", 10, 20),
    new Product(5, "Pendrive", "https://images.fravega.com/f500/6b52161fb55162cd722918d95042749b.jpg", 5, 0),
    new Product(6, "Audífonos", "https://www.sony.com.ar/image/4e59487a5c5175284a49830878185789?fmt=pjpeg&wid=330&bgcolor=FFFFFF&bgc=FFFFFF", 50),
    new Product(7, "Monitor", "https://www.venex.com.ar/products_images/1662643162_221v8.png", 180, 8),
    new Product(8, "Impresora", "https://images.fravega.com/f1000/79d8ae305c8e4b1584554256d5b2c0ed.jpg", 90, 25),
    new Product(9, "Altavoces", "https://http2.mlstatic.com/D_NQ_NP_900286-MLU70989872953_082023-O.webp", 40, 5),
    new Product(10, "Cámara", "https://arsonyb2c.vtexassets.com/arquivos/ids/199524/ILCE-6400L_1.jpg?v=636864161613800000", 120),
    new Product(11, "Silla de Oficina", "https://www.mink.com.ar/qloud/ryr/fotos/22634-1.jpg", 120, 10),
    new Product(12, "Lámpara LED", "https://d3ugyf2ht6aenh.cloudfront.net/stores/001/267/984/products/le27-eca800201-ea21e030f93ede390b16575667669506-640-0.png", 30),
    new Product(13, "Router WiFi", "https://http2.mlstatic.com/D_NQ_NP_659815-MLA31117176634_062019-O.webp", 70),
    new Product(14, "Disco Duro Externo", "https://http2.mlstatic.com/D_NQ_NP_627809-MLA51326771407_082022-O.webp", 85),
    new Product(15, "Memoria RAM", "https://http2.mlstatic.com/D_NQ_NP_936220-MLU54970736314_042023-O.webp", 60),
    new Product(16, "Tablet", 'https://www.lenovo.com/medias/mkt-hero.png?context=bWFzdGVyfHJvb3R8MjM1NTEwfGltYWdlL3BuZ3xoNzIvaDBmLzE1ODY4NzEwOTQ0Nzk4LnBuZ3xmNzRmYmVmYmI5YTljMTI0OTY2MzRlNTgzYWRiZjE0MDVmMjI2ODZmN2E0M2FjNjQ5NDRmNjQ1Y2ZmOGVlNWQz', 180),
    new Product(17, "Cargador Portátil", "https://http2.mlstatic.com/D_NQ_NP_856761-MLA41816500687_052020-O.webp", 25),
    new Product(18, "Auriculares Bluetooth", "https://http2.mlstatic.com/D_NQ_NP_662526-MLA52678025326_122022-O.webp", 50),
    new Product(19, "Mochila para Laptop", "https://d2ye0ltusw47tz.cloudfront.net/61136210-thickbox_default/mochila-topper-laptop-ii-unisex.jpg", 40),
    new Product(20, "Smartwatch", "https://www.suono.com.ar/media/catalog/product/cache/be277d79a8d024490fdf6d84a1464e00/d/i/dise_o_sin_t_tulo_79_.jpg", 100),
];

//Add the products to the DOM
const divProducts = document.getElementById("productsId");
divProducts.innerHTML = '<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">\
          </div>'
listProducts(products);

//Price filter
const inputProducts = document.getElementById('inputProductsId');
let productsFilter;
inputProducts.addEventListener('input', () => {
    if (inputProducts.value) {
        productsFilter = products.filter(product => {
            return product.price <= inputProducts.value;
        });
    }
    else if (inputProducts.value === '') {
        productsFilter = products;
    }
    divProducts.innerHTML = '<div class="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">\
              </div>'
    if (productsFilter.length > 0) {
        listProducts(productsFilter);
    }
    else {
        const errorMessage = document.createElement('p');
        errorMessage.textContent = "No se encontraron productos en ese rango de precio";
        divProducts.append(errorMessage);
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


updateCart();