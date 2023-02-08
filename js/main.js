

// preentrega 3 coder

// class ProductosVenta {
//     constructor (id,nombreProducto, imagen, categoria, precio){
//         this.id=id;
//         this.nombreProducto = nombreProducto;
//         this.imagen=imagen;
//         this.categoria = categoria;
//         this.precio = precio;
//     }
// }
// productosVenta.push(new ProductosVenta("gabinete-01", "Gabinete Asus Helios" , "./assets/gabinetes/Gabinete_ASUS_ROG_STRIX_Helios_Aluminum_Black_RGB_81c9ec14-grn.jpg", "gabinetes",30000 ))
// productosVenta.push(new ProductosVenta("gabinete-02", "Gabinete Asus Helios 2" , "./assets/gabinetes/Gabinete_ASUS_ROG_STRIX_Helios_Aluminum_Black_RGB_81c9ec14-grn.jpg", "gabinetes",30000 ))
// productosVenta.push(new ProductosVenta("monitor-01", "LG stylus 19" , "./assets/monitores/compragamer_Imganen_general_8683_Monitor_LG_LED_19___19M38A-B_VGA_4607eba4-grn.jpg", "monitores",27000 ))
// productosVenta.push(new ProductosVenta("notebook-01", "Dell Inspiron 8gb" , "./assets/notebook/compragamer_Imganen_general_35231_Notebook_Dell_Inspiron_3515_15.6__FHD_Ryzen_5_3450U_8GB_256GB_SSD_NVMe_W11_7f5502cd-grn.jpg" , "notebook",27000 ))
// productosVenta.push(new ProductosVenta("notebook-02", "Dell Ryzen 5 4350U" , "./assets/notebook/compragamer_Imganen_general_35231_Notebook_Dell_Inspiron_3515_15.6__FHD_Ryzen_5_3450U_8GB_256GB_SSD_NVMe_W11_7f5502cd-grn.jpg" , "notebook",27000 ))


const productosVenta = [
{
    id: "gabinete-01",
    nombreProducto:"Gabinete Asus Helios1",
    imagen: "./assets/gabinetes/Gabinete_ASUS_ROG_STRIX_Helios_Aluminum_Black_RGB_81c9ec14-grn.jpg",
    categoria: "gabinetes",
    precio: 30000
},
{
    id: "gabinete-02",
    nombreProducto:"Gabinete Asus Helios2",
    imagen: "./assets/gabinetes/Gabinete_ASUS_ROG_STRIX_Helios_Aluminum_Black_RGB_81c9ec14-grn.jpg",
    categoria: "gabinetes",
    precio: 30000
},
{
    id: "monitor-01",
    nombreProducto:"LG stylus 19",
    imagen: "./assets/monitores/compragamer_Imganen_general_8683_Monitor_LG_LED_19___19M38A-B_VGA_4607eba4-grn.jpg",
    categoria: "monitores",
    precio: 25000
},
{
    id: "monitor-02",
    nombreProducto:"LG stylus 25 ",
    imagen: "./assets/monitores/compragamer_Imganen_general_8683_Monitor_LG_LED_19___19M38A-B_VGA_4607eba4-grn.jpg",
    categoria: "monitores",
    precio: 32000
},
{
    id: "notebook-01",
    nombreProducto:"Dell Inspiron 8gb",
    imagen: "./assets/notebook/compragamer_Imganen_general_35231_Notebook_Dell_Inspiron_3515_15.6__FHD_Ryzen_5_3450U_8GB_256GB_SSD_NVMe_W11_7f5502cd-grn.jpg",
    categoria: "notebook",
    precio: 55960
},{
    id: "notebook-02",
    nombreProducto:"dell ryzen 5",
    imagen: "./assets/notebook/compragamer_Imganen_general_35231_Notebook_Dell_Inspiron_3515_15.6__FHD_Ryzen_5_3450U_8GB_256GB_SSD_NVMe_W11_7f5502cd-grn.jpg",
    categoria: "notebook",
    precio: 45060
}
]



const contenedorProductos = document.getElementById("contenedor-producto");
const botonesCategoria = document.querySelectorAll(".botonCategoria");
const tituloEncabezado = document.getElementById("tituloPrincipal");
let botonesAgregar = document.querySelectorAll(".producto-agregar ");



 function mostrarProductos(productosElegidos){

    contenedorProductos.innerHTML = "";

    productosElegidos.forEach(producto => {
         const div = document.createElement("div");
         // .classList.add sirve para agregarle una clase a un elemento de html
         div.classList.add("producto");
         div.innerHTML = `
         <img class="producto-imagen" src="${producto.imagen}" alt="$">
         <div class="producto-detalles">
             <h3 class="producto-titulo">${producto.nombreProducto}</h3>
             <p class="producto-precio">precio $${producto.precio}</p>
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
        //se quita la clase active de los botones para que no queden todos activados,es decir, en color blanco
        botonesCategoria.forEach(boton => {boton.classList.remove("active")});
        e.currentTarget.classList.add("active");
        if (e.currentTarget.id != "todos") {
            const productosCategoria = productosVenta.find(producto => producto.categoria === e.currentTarget.id);
            //string.charAt(0).toUpperCase() + string.slice(1) sirve para poner la primera letra en mayuscula
            tituloEncabezado.innerText = productosCategoria.categoria.charAt(0).toUpperCase() + productosCategoria.categoria.slice(1);

            const productosBoton = productosVenta.filter(producto => producto.categoria === e.currentTarget.id);
            mostrarProductos(productosBoton);    
        } else{
            tituloEncabezado.innerHTML = "Todos los productos"
            mostrarProductos(productosVenta);
        }
    })
})

// let carrito = []
let carrito;
let carritoLocalSto = localStorage.getItem("productos-en-carrito")
if (carritoLocalSto) {

    carrito = JSON.parse(carritoLocalSto);
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
        productoAgregado.cantidad = 1//se agrega una nueva caracteristica para que se pueda sumar cada vez que entra en el carrito ese producto
        carrito.push(productoAgregado);
    }

    localStorage.setItem("productos-en-carrito",JSON.stringify(carrito))


   console.log(carrito)
}