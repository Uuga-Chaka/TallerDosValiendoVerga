console.log(arreglo);

fetch('http://localhost:1236/productosPorIds?ids='+arreglo)
.then(function(res){
    return res.json();
})
.then(function(res){
    console.log(res.legth);

    var lista = document.querySelector(".container");
    var precio = document.querySelector("#total");
    var buy = document.querySelector(".buyed");
    var total = 0;
    console.log(precio);
    res.forEach(function(elem){
        total += parseInt(elem.price);
        lista.innerHTML += '<div class="producto" data-id="'
        + elem._id+'"> <a href="/producto/'
        + elem._id+'"><img src="img/'+elem.object+'-'
        +elem.color+'.jpg"><div class="info"><p>' 
        + elem.object +'-'+elem.year+'</p><p id="price">$'
        +elem.price+'</div><p class="desc">This '+elem.object+'s price is $'+elem.price+' its color is '
        +elem.color+' is very usefull, and cannot nevere be destroyed, and its size is '+elem.inches+
        ' inches</p></a><button class="agregar">Remove</button></div>';
      
        precio.innerHTML = '$ '+total;
        buy.innerHTML += '<li><span>'+elem.object+'-'+elem.color+': </span>   $'+elem.price+'</li>'
    });
});