let carrito = localStorage.getItem("productos-en-carrito");

carrito =JSON.parse(carrito);

const padreCarritoVacio = document.querySelector("#carritoVacio");
const padreCarritoProductos = document.querySelector("#carrito-productos");
const padreCarritoAcciones = document.querySelector("#carrito-acciones");
const padreCarritoComprado = document.querySelector("#carritoComprado");

let btnEliminar = document.querySelectorAll(".carrito-producto-delete")



function cargarProductosCarrito() {
    
    if(carrito){
    
        padreCarritoVacio.classList.add("disable");
        padreCarritoProductos.classList.remove("disable");
        padreCarritoAcciones.classList.remove("disable");
        padreCarritoComprado.classList.add("disable");
        
        padreCarritoProductos.innerHTML = "";
    
        carrito.forEach(producto => {
            const div =document.createElement("div")
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img class="carrito-producto-imagen" src="${producto.imagen}" alt="">
                <div class="carrito-producto-titulo">
                    <small>${producto.categoria}</small>
                    <h4>${producto.nombreProducto}</h4>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-delete" id="${producto.id}"><i class="bi bi-trash3-fill"></i></button>
            `
            padreCarritoProductos.append(div);
        });
    }else{
    
        padreCarritoVacio.classList.remove("disable");
        padreCarritoProductos.classList.add("disable");
        padreCarritoAcciones.classList.add("disable");
        padreCarritoComprado.classList.add("disable");
    }
    actualizarBtnEliminar();
}

cargarProductosCarrito();

function actualizarBtnEliminar() {
    btnEliminar = document.querySelectorAll(".carrito-producto-delete");
    
    btnEliminar.forEach(btn => {
        btn.addEventListener("click",eliminarDelCarrito)
    });
}

function eliminarDelCarrito(e) {
    const botonId = e.currentTarget.id;
    const index = carrito.findIndex(producto => producto.id === botonId);
    carrito.splice(index,1)
    cargarProductosCarrito();
    
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito))
}

// falta corregir que al quitar productos del carrito muestre vacio, en vez mostrar contenedor acciones; hacer que el boton vaciar quite todos los productos y que se sume todo el total de los precios