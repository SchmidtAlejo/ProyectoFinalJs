function agregarProducto() {
    const producto = prompt('Ingresa el nombre del producto que quieres (Escribe "Fin" para finalizar las seleccion de productos)').toLowerCase();
    let resultado;
    if (producto !== "fin") {
        const cantidad = prompt("¿Cunatas unidades de este producto quieres?").toLowerCase();
        switch (producto) {
            case "celular":
                resultado = 150 * cantidad;
                break;

            case "televisor":
                resultado = 200 * cantidad;
                break;

            case "teclado":
                resultado = 20 * cantidad;
                break;

            case "mouse":
                resultado = 10 * cantidad;
                break;

            case "pendrive":
                resultado = 5 * cantidad;
                break;

            default:
                alert("No hay ningún producto con ese nombre")
                resultado = 0;
                break;
        }
    }
    else {
        resultado = producto;
    }
    return resultado;
}

function calcularCosto() {
    let total = 0;
    let valorItem;
    do {
        valorItem = agregarProducto();
        if (valorItem !== "fin") {
            total += valorItem;
        }
    } while (valorItem !== "fin");

    return total;
}
console.log("Celular $150");
console.log("Televisor $200");
console.log("Teclado $20");
console.log("Mouse $10");
console.log("Pendrive $5");
alert("Los productos y precios aparecen en la Consola");
alert("Costo total: $" + calcularCosto());