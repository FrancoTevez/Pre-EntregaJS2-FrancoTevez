const productos = [
    {id: 1, nombre: " Campera nike", precio: 18000, marca:"nike", tipo:"campera", cantidad:0},
    {id: 2, nombre: " Campera jordan", precio: 23000, marca:"jordan", tipo:"campera", cantidad:0},
    {id: 3, nombre: " Short nike", precio: 4500, marca:"nike", tipo:"short", cantidad:0},
    {id: 4, nombre: " Campera adidas", precio: 26000, marca:"adidas", tipo:"campera", cantidad:0},
    {id: 5, nombre: " Zapatillas nike", precio: 55000, marca:"nike", tipo:"zapatillas", cantidad:0},
    {id: 6, nombre: " Zapatillas adidas", precio: 31000, marca:"adidas", tipo:"zapatillas", cantidad:0},
    {id: 7, nombre: " Zapatillas jordan", precio: 77000, marca:"jordan", tipo:"zapatillas", cantidad:0},
    {id: 8, nombre: " Remera jordan", precio: 12000, marca:"jordan", tipo:"remera", cantidad:0},
    {id: 9, nombre: " Pantalón jordan", precio: 9000, marca:"jordan", tipo:"pantalón", cantidad:0},
    {id: 10, nombre: " Short adidas", precio: 3500, marca:"adidas", tipo:"short", cantidad:0},
    {id: 11, nombre: " Buzo puma", precio: 14000, marca:"puma", tipo:"buzo", cantidad:0},
    {id: 12, nombre: " Buzo nike", precio: 20000, marca:"nike", tipo:"buzo", cantidad:0},
    {id: 13, nombre: " Gorra nike", precio: 5000, marca:"nike", tipo:"gorra", cantidad:0},
    {id: 14, nombre: " Short jordan", precio: 6500, marca:"jordan", tipo:"short", cantidad:0},
    {id: 15, nombre: " Remera puma", precio: 5800, marca:"puma", tipo:"remera", cantidad:0},
    {id: 16, nombre: " Pantalón puma", precio: 4500, marca:"puma", tipo:"pantalón", cantidad:0}
]

const carrito = []

const envio = (precioTotal) => {
    if(precioTotal > 15000){
        alert("El envío es gratis por pasar los $15000: $"+precioTotal);
        return precioTotal;
    }else{
        alert("El envío es $750: $"+(precioTotal+750));
        return precioTotal + 750;
    }
}

const interes = (precioTotal, cuotas) => {
    let precioPorcentaje = 0
    let cantInteres = 8.33 * cuotas
    if(cuotas === 0){
        alert("Tu precio total es $"+precioTotal)
        return precioTotal
    }else{
        precioPorcentaje = (precioTotal * cantInteres)/100
        alert("Tu precio total es $"+(precioTotal+precioPorcentaje).toFixed(2)+":"+"\n\n"+"$"+((precioTotal+precioPorcentaje)/cuotas).toFixed(2)+" en "+cuotas+" cuotas")
        return precioTotal + precioPorcentaje
    }
}

const cuotas = () => {
    let confirmarCuotas = confirm("Querés pagar en cuotas?")
    if(confirmarCuotas === false){
        cuota = 0
        return cuota
    }
    while(confirmarCuotas){
        let cuota = parseInt(prompt("En cuántas cuotas querés pagar? (Hasta 12 cuotas)"))
        if(Number.isNaN(cuota)){
            alert("Ingresar un número de cuotas, máx 12")
        }else if(cuota > 12 || cuota === 0){
            alert("Ingresar un número entre el 1 y el 12")
        }else{
            return cuota
        }
    }
}

const confirmarCompra = (carrito) =>{
    let confirmacion = confirm("Querés agregar otro producto?")
    if (confirmacion){
        compra()
    }else{
        const mapaCarrito = carrito.map((el) => {
            return "- "+el.nombre+"; "+el.cantidad
        })
        const precioTotal = carrito.reduce((acc,el) => acc + (el.precio*el.cantidad),0)
        alert ("Tu compra es:"+"\n\n"+mapaCarrito.join("\n")+"\n\n"+"Y tu precio total es $"+precioTotal)
        interes(envio(precioTotal), cuotas())
    }
}

const productoRepetido = (productosDeEsaMarca, productosDeEsaMarcaId, cantidadProducto) =>{
    const productoRepetidos = carrito.find(productosDeEsaMarca => productosDeEsaMarca.id === productosDeEsaMarcaId);
    if (productoRepetidos) {
        productoRepetidos.cantidad += cantidadProducto
    } else {
        productosDeEsaMarca.cantidad += cantidadProducto
        carrito.push(productosDeEsaMarca)
    }
    confirmarCompra(carrito)
}

const validarTipo = (mapaMarca, marcaSeleccionada) =>{
    productoInvalido = true
    let queTipo = prompt("Tenemos estos artículos: (Elegir solo el tipo de artículo) "+"\n\n"+mapaMarca.join("\n")).toLowerCase()
    productoNoEncontrado = true
    let productosDeEsaMarca = marcaSeleccionada.find((el) => el.tipo === queTipo)

    while(productosDeEsaMarca === undefined){
        alert("Artículo no encontrado...")
        queTipo = prompt("Tenemos estos artículos: (Elegir solo el tipo de artículo)"+"\n\n"+mapaMarca.join("\n")).toLowerCase()
        productosDeEsaMarca = marcaSeleccionada.find((el) => el.tipo === queTipo)
    }

    let cantidadProducto = parseInt(prompt("Cuántos querés comprar?"))

    while(Number.isNaN(cantidadProducto) || cantidadProducto === 0){
        alert("Insertar almenos un número, distinto a 0")
        cantidadProducto = parseInt(prompt("Cuántos querés comprar?"))
    }

    console.log(productosDeEsaMarca)
    productoRepetido(productosDeEsaMarca, productosDeEsaMarca.id, cantidadProducto)
}

const compra = () => {
    marcaNoEncontrada = true
    productosDeEsaMarca = {}
    do{
        let marca = prompt("Que marca deseas buscar?:"+"\n\n"+"(Nike, Adidas, Jordan, Puma)").toLowerCase()
        const marcaSeleccionada = productos.filter((el) => el.marca.includes(marca))
        const mapaMarca = marcaSeleccionada.map((el) => {
            return "- "+el.nombre+" $"+el.precio
        })
        if(marcaSeleccionada.length !== 0){
            validarTipo(mapaMarca, marcaSeleccionada)
            marcaNoEncontrada = false
        }else{
            alert("No encontramos esa marca...")
        }
    }while(marcaNoEncontrada)
}

compra()















