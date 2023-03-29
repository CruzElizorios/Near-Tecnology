let carrito = localStorage.getItem("productos-en-carrito");

carrito =JSON.parse(carrito);

const padreCarritoVacio = document.getElementById("carritoVacio");
const padreCarritoProductos = document.getElementById("carrito-productos");
const padreCarritoAcciones = document.getElementById("carrito-acciones");
const padreCarritoComprado = document.getElementById("carritoComprado");

let btnEliminar = document.querySelectorAll(".carrito-producto-delete")
const btnVaciar = document.getElementById("carrito-acciones-vaciar")
const btnTotal = document.getElementById("total")
const btnComprar = document.getElementById("carrito-acciones-comprar")
const divCargando = document.getElementById("loader")



function cargarProductosCarrito() {

    if(carrito && carrito.length > 0){

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
                    <p><i class="bi bi-currency-dollar"></i>${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p><i class="bi bi-currency-dollar"></i>${producto.precio * producto.cantidad}</p>
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
    sumarTotal();
}

cargarProductosCarrito();

btnVaciar.addEventListener("click", vaciarCarrito);
btnComprar.addEventListener("click", comprar);

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

function vaciarCarrito() {
    Swal.fire({
        title: 'Seguro que quieres vaciar?',
        icon: 'warning',
        width: '350px',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'si, vaciar!',
        cancelButtonText: 'cancelar',
        customClass:{
            title: 'titulosweetCarrito'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            carrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
            cargarProductosCarrito();
        Swal.fire({
            icon: 'success',
            title: 'carrito vaciado con éxito',
            width: '350px',
            confirmButtonColor: '#d18616',
            customClass:{
                title: 'titulosweetCarrito'
            }
        })
        }
    })
}
function sumarTotal(params) {
    btnTotal.innerText = carrito.reduce((acc,productosVenta) => acc + productosVenta.cantidad * productosVenta.precio,0);
}
function comprar() {
    carrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(carrito));
    cargando();
}

let tiempoCarga;
function cargando() {
    padreCarritoVacio.classList.add("disable");
    padreCarritoProductos.classList.add("disable");
    padreCarritoAcciones.classList.add("disable");
    divCargando.classList.remove("disable")
    tiempoCarga= setTimeout(mostrarComprado,3500);
}
function mostrarComprado() {
    divCargando.classList.add("disable");
    padreCarritoComprado.classList.remove("disable");
    // probando integrar mercadopago forma basica
    // window.location.href = "https://mpago.la/1nL8YvS";
}
