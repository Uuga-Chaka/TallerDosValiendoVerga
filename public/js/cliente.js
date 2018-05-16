function actulizarCarrito() {
    var n = arreglo.lenght;
    document.querySelector('.carrito .size').innerHTML = arreglo.lenght;
    console.log(typeof(arreglo.length));
}
var arreglo = JSON.parse(localStorage.getItem('arreglo' || '[]'));
if (arreglo == null) arreglo = [];
console.log(arreglo);

actulizarCarrito();