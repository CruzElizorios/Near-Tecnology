

// preentrega 2 coder, con html y para la entrega final

class ProductosVenta {
    constructor (nombreProducto, categoria, precio){
        this.nombreProducto = nombreProducto;
        this.categoria = categoria;
        this.precio = precio;
    }
}
const productosVenta = []

productosVenta.push(new ProductosVenta("Arroz", "Legumbres" , 200))
productosVenta.push(new ProductosVenta("Fideos Spaguetti", "Pastas" , 150))
productosVenta.push(new ProductosVenta("Fideos Moñitos", "Pastas" , 170))
productosVenta.push(new ProductosVenta("Cerveza 1l", "Bebida alcohólicas" , 350))
productosVenta.push(new ProductosVenta("Cerveza en lata 250ml", "Bebidas Alcohólicas" , 120))

console.log(productosVenta)

function agregarProductos() {
    let cantidadNuevosProductos = Number(prompt("Ingrese la cantidad de productos para anadir a la lista"))
    
    let nuevoProducto = 0
    
    while (nuevoProducto < cantidadNuevosProductos) {
        productosVenta.push(new ProductosVenta(prompt("Nombre del producto"),
        prompt("Ingrese la Categoria del producto"), 
        Number(prompt("Ingrese el precio del Producto")))
                            )
        nuevoProducto++
    }
    console.log(productosVenta)
    alert("productos agregados con exito")
    alert(listaProductos())
}

function listaProductos(productos) {
    let lista = "";
    for (const dato of productosVenta) {
        lista += dato.nombreProducto + ": su precio es $" + dato.precio + " \n"
        
    }
    return lista
}

alert("Bienvenido administrador")
let agregar = prompt("¿Desea agregar un nuevo producto a su tienda? \n Si \n No (ver lista productos)")

if (agregar === "Si" || agregar === "si") {
    agregarProductos()
}else{
    alert(listaProductos())
}
