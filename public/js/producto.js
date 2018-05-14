var precio = document.getElementById('precio');
var color = document.getElementById('color');
var year = document.getElementById('year');
/*var precio = e.options[e.selectedIndex];
var year = a.options[a.selectedIndex]
*/

function trim(value) {
    return value.replace(/^\s+|\s+$/g,"");
}

document.querySelector('.buscar').addEventListener('click', function (e) {
    e.preventDefault();

    var link;
    var result;
    if (!(precio.value == "" || precio.value == null)) {
        if (link == null)
            link = 'precio='+ trim(precio.value);
        else {
            var str = '&precio=' + trim(precio.value);
            link = link.concat(str);
        }
    }else{
        console.log('isEmpty');
    }

    if (!(color.value == "" || color.value == null)){
        if (link == null)
            link = 'color='+ trim(color.value);
        else {
            var str = '&color=' + trim(color.value);
            link = link.concat(str);
        }
    }else{
        console.log('isEmpty');
    }

    if (!(year.value == "" || year.value == null)){
        if (link == null)
            link = 'year='+ trim(year.value);
        else {
            var str = '&year=' + trim(year.value);
            link = link.concat(str);
        }
    }else{
        console.log('isEmpty');
    }
    console.log(link)
   location.href = '/?' + link;
});

