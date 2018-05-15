
//Actualizar el maricon carro
var actulizarCarrito = function (){
    document.querySelector('.carrito').innerHTML = arreglo.lenght;
}

var arreglo = JSON.parse(localStorage.getItem('arreglo'));
if(arreglo == null) arreglo = [];

actualizarCarrito();