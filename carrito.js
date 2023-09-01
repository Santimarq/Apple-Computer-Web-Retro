// Variables 
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody')
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCurso = document.querySelector('#lista-curso');
let articulosCarrito = [];


cargarEventListeners();
// Registras listeners 
function cargarEventListeners() {
    // Cuando agregas un producto agregando en agregar al carrito
    listaCurso.addEventListener('click', agregarCurso);

    // Elimina cursos del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Vaciar carrito 
    vaciarCarritoBtn.addEventListener('click', () => {

       articulosCarrito = [];   // Reseteamos el arreglo

       limparHTML(); // limpiamos todo el html

    });
}



// Funciones 
function agregarCurso(e) {
    e.preventDefault();
    if(e.target.classList.contains('agregar-carrito')){
        const cursoSeleccionado = e.target.parentElement;
        
        leerDatosCurso(cursoSeleccionado);
    }
}

// Elimina curso del carrito
function eliminarCurso(e) {
    // la clase es borrar-producto
    if(e.target.classList.contains('borrar-producto')) {
         const cursoId  = e.target.getAttribute('data-id');

         // Elimina del arreglo articulosCarrito por el data-id
        articulosCarrito = articulosCarrito.filter( curso => curso.id !== cursoId);

        carritoHTML();
       // console.log(articulosCarrito);
    }
}


// Lee el contenido del html al que le dimos click y extrae la informacion 
function leerDatosCurso (curso) {
   // console.log(curso);

    // Crear un objeto con el contenido del producto actual 
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h3').textContent ,
        precio: curso.querySelector('p').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad : 1
    }

    // Revisa si un elemento ya existe o no en el carrito y actualiza la cantidad 
    const existe = articulosCarrito.some(curso => curso.id === infoCurso.id );
    if(existe) {
        // si existe actualizamos la cantidad
        const cursos = articulosCarrito.map( curso => {
            if(curso.id === infoCurso.id){
                curso.cantidad++;
                return curso; // retorna el objeto actualizado
            }else 
                return curso; /// retorna los objetos que no son duplicados
         })
         articulosCarrito = [...cursos];
    }else{
        // si no existe lo agregamos al carrito
        articulosCarrito = [...articulosCarrito, infoCurso];
    }

    
    //Agrega elemento al arreglo de carrito 
    
   
     carritoHTML();

}

// Muestra el carrito de compra en el html
    
// Limpar el html
function carritoHTML() {

//Recorre el carrit y genera el html

    limparHTML();

        articulosCarrito.forEach( curso => {
            const {imagen, titulo, precio, cantidad, id} = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
            <img src="${imagen}" width="300"> 
            </td>
            <td>
                ${titulo}
            </td>
            <td>  ${precio} </td>
            <td> ${cantidad} </td>
            <td>
             <a href="#" class="borrar-producto"  data-id="${id}" > X </a>  
             </td> 
        `
        // Agrega el html del carrito en el tbody 
        contenedorCarrito.appendChild(row);
    })
}

// Elimina los cursos del tbody 
function limparHTML() {
    // forma lenta
   // contenedorCarrito.innerHTML() = "";

   while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);

   }
}