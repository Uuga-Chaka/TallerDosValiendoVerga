var producto = document.getElementById('producto');
var color = document.getElementById('color');
var year = document.getElementById('year');
/*var precio = e.options[e.selectedIndex];
var year = a.options[a.selectedIndex]
*/

function trim(value) {
    return value.replace(/^\s+|\s+$/g, "");
}

document.querySelector('.buscar').addEventListener('click', function (e) {
    e.preventDefault();

    var link;
    var result;
    if (!(producto.value == "" || producto.value == null)) {
        if (link == null)
            link = 'producto=' + trim(producto.value);
        else {
            var str = '&producto=' + trim(producto.value);
            link = link.concat(str);
        }
    } else {
        console.log('isEmpty');
    }

    if (!(color.value == "" || color.value == null)) {
        if (link == null)
            link = 'color=' + trim(color.value);
        else {
            var str = '&color=' + trim(color.value);
            link = link.concat(str);
        }
    } else {
        console.log('isEmpty');
    }

    if (!(year.value == "" || year.value == null)) {
        if (link == null)
            link = 'year=' + trim(year.value);
        else {
            var str = '&year=' + trim(year.value);
            link = link.concat(str);
        }
    } else {
        console.log('isEmpty');
    }
    console.log(link)
    location.href = '/?' + link;
});



document.querySelectorAll(".producto .agregar").forEach(function (button) {
    button.addEventListener("click", function () {
        var id = button.parentNode.getAttribute("data-id");
        console.log(id);
        if (arreglo.indexOf(id) >= 0) {
            console.log("Already added");
            return;
        }

        arreglo.push(id);
        actulizarCarrito();
        console.log("Se supone que está guardado");

        localStorage.setItem("arreglo", JSON.stringify(arreglo));
        //localStorage.removeItem("arreglo");
    });
});