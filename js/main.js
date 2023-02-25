
let productosVenta = [];

fetch("./js/productos.json")
    .then(Response => Response.json())
    .then(data => {
        productosVenta = data;
        mostrarProductos(productosVenta);
    });



const contenedorProductos = document.getElementById("contenedor-producto");
const botonesCategoria = document.querySelectorAll(".botonCategoria");
const tituloEncabezado = document.getElementById("tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
let contador = document.getElementById("indicadorContador");


 function mostrarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
         const div = document.createElement("div");
         div.classList.add("producto");
         div.innerHTML = `
         <img class="producto-imagen" src="${producto.imagen}" alt="${producto.nombreProducto}">
         <div class="producto-detalles">
             <h3 class="producto-titulo">${producto.nombreProducto}</h3>
             <p class="producto-precio">precio <i class="bi bi-currency-dollar"></i>${producto.precio}</p>
             <button class="producto-agregar" id="${producto.id}">agregar</button>
         </div>
         `
         contenedorProductos.append(div);
     });
     recargarBotonesAgregar();
 }
 
 mostrarProductos(productosVenta)

botonesCategoria.forEach(boton => {
    
    boton.addEventListener("click", (e) =>{
        botonesCategoria.forEach(boton => {boton.classList.remove("active")});
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {
            const productosCategoria = productosVenta.find(producto => producto.categoria === e.currentTarget.id);
            tituloEncabezado.innerText = productosCategoria.categoria.charAt(0).toUpperCase() + productosCategoria.categoria.slice(1);

            const productosBoton = productosVenta.filter(producto => producto.categoria === e.currentTarget.id);
            mostrarProductos(productosBoton);    
        } else{
            tituloEncabezado.innerHTML = "Todos los productos"
            mostrarProductos(productosVenta);
        }
    })
})


let carrito;
let carritoLocalSto = localStorage.getItem("productos-en-carrito")
if (carritoLocalSto) {

    carrito = JSON.parse(carritoLocalSto);
    actualizarContador();
} else {
    carrito = [];
}



function recargarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar ")
    botonesAgregar.forEach(boton => { boton.addEventListener("click", agregarCarrito)
    });
}

function agregarCarrito(e) {

    const botonId = e.currentTarget.id
    const productoAgregado = productosVenta.find( producto => producto.id === botonId);
    
    if(carrito.some(producto => producto.id === botonId)){
        const index = carrito.findIndex(producto => producto.id ===botonId)
        carrito[index].cantidad++
    }else {
        productoAgregado.cantidad = 1
        carrito.push(productoAgregado);
    }
    localStorage.setItem("productos-en-carrito",JSON.stringify(carrito))
    
    actualizarContador();
    
    Swal.fire({
        position: 'bottom-start',
        icon: 'success',
        title: 'producto agregado',
        width: '250px',
        padding: '1px',
        showConfirmButton: false,
        timer: 1500,
        backdrop: false,
        customClass:{
            icon: 'iconosweet',
            title: 'titulosweet'
        }
      })
};

function actualizarContador() {
    let contadorNuevo = carrito.reduce((acc,productosVenta) => acc + productosVenta.cantidad,0);
    contador.innerText = contadorNuevo;
};