var precio = document.getElementById('precio');
var color = document.getElementById('color');
var producto = document.getElementById('producto');

document.querySelector('.buscar').addEventListener('click', function (e) {
    e.preventDefault();

    var link;
    var result;
    if (!(precio.value == "" || precio.value == null)) {
        if (link == null)
            link = 'precio='+ trim(precio.value.trim);
        else {
            var str = '&precio=' + trim(precio.value);
            link = link.concat(str);
        }
    }

    if (!(color.value == "" || color.value == null)){
        if (link == null)
            link = 'color='+ trim(color.value);
        else {
            var str = '&color=' + trim(color.value);
            link = link.concat(str);
        }
    }

    if (!(producto.value == "" || producto.value == null)){
        if (link == null)
            link = 'producto='+ trim(producto.value);
        else {
            var str = '&producto=' + trim(producto.value);
            link = link.concat(str);
        }
    }
    location.href = '/?' + link;
});