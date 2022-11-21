
class bebidaSinAlcohol {
    constructor(id, bebida, precio, imagen){
        this.id = id
        this.bebida = bebida
        this.precio = precio
        this.imagen = imagen
    }
}

class bebidaConAlcohol {
    constructor(id, bebida, precio, imagen){
        this.id = id
        this.bebida = bebida
        this.precio = precio
        this.imagen = imagen
    }
}

let misBebidaSinAlcohol = []
let misBebidaConAlcohol = []

misBebidaSinAlcohol.push(new bebidaSinAlcohol(41, 'Agua', 100, 'https://statics.dinoonline.com.ar/imagenes/full_600x600_ma/3040004_f.jpg'))
misBebidaSinAlcohol.push(new bebidaSinAlcohol(42, 'Jugo', 150, 'https://th.bing.com/th/id/OIP.tBBdDAcozti2lU5dgEqXCAHaHa?pid=ImgDet&rs=1'))
misBebidaSinAlcohol.push(new bebidaSinAlcohol(43, 'Gaseosa', 180, 'https://www.pizzsavoy.com/118-large_default/coca-cola-2-litros.jpg'))
misBebidaSinAlcohol.push(new bebidaSinAlcohol(44, 'Energizante', 85, 'https://www.distribuidorabebidas.com.uy/wp-content/uploads/sites/31/2019/11/SPEED-980x980.jpg'))

misBebidaConAlcohol.push(new bebidaConAlcohol(45, 'Cerveza', 170, 'https://th.bing.com/th/id/OIP.Xy9_F4uu4CI3upU_wnPyfAHaGL?pid=ImgDet&rs=1'))
misBebidaConAlcohol.push(new bebidaConAlcohol(46, 'Vodka', 210, 'https://th.bing.com/th/id/OIP.eE3TAUqIciXDFYN3o0mgHwHaGq?pid=ImgDet&rs=1'))
misBebidaConAlcohol.push(new bebidaConAlcohol(47, 'Champagne', 270, 'https://th.bing.com/th/id/OIP.Zhu5LV1SNKkwyoTMQomSegHaHa?pid=ImgDet&rs=1'))

let totalMisBebidas = misBebidaSinAlcohol.concat(misBebidaConAlcohol)

let consultaEdad = document.getElementById('mayorDeEdad')

consultaEdad.innerHTML = `
<h2>Bienvenido a nuestra tienda de bebidas!</h2>
<p>Eres mayor de edad?</p>
<button id="mayorEdad">Si</button>
<button id="menorEdad">No</button>
`
let botonMayorEdad = document.getElementById('mayorEdad')
let botonMenorEdad = document.getElementById('menorEdad')
let contenedorBebidas = document.getElementById('contenedorBebidas')


for (const bebida of misBebidaConAlcohol) {
    let tarjetaBebidaConAlcohol = document.createElement('div')
    tarjetaBebidaConAlcohol.className = 'bebidaConAlcohol'
    tarjetaBebidaConAlcohol.hidden = true
    tarjetaBebidaConAlcohol.innerHTML = `
        <h4>${bebida.bebida}</h4>
        <h5>$${bebida.precio}</h5>
        <img src=${bebida.imagen}>
        <button class="boton" id=${bebida.id}>Agregar al carro</button>
    `
    contenedorBebidas.append(tarjetaBebidaConAlcohol)
    }

for (const bebida of misBebidaSinAlcohol) {
  let tarjetaBebidaSinAlcohol = document.createElement('div')
  tarjetaBebidaSinAlcohol.className = 'bebidaSinAlcohol'
  tarjetaBebidaSinAlcohol.innerHTML = `
      <h4>${bebida.bebida}</h4>
      <h5>$${bebida.precio}</h5>
      <img src=${bebida.imagen}>
      <button class="boton" id=${bebida.id}>Agregar al carro</button>
  `
  contenedorBebidas.append(tarjetaBebidaSinAlcohol)
  }

let tarjetaBebidaConAlcohol = document.getElementsByClassName('bebidaConAlcohol')

botonMayorEdad.onclick = () => {
  consultaEdad.hidden = true
  contenedorBebidas.hidden = false
  for (const bebidaAlcoholica of tarjetaBebidaConAlcohol) {
    bebidaAlcoholica.hidden = false
  }
}
  
botonMenorEdad.onclick = () => {
  consultaEdad.hidden = true
  contenedorBebidas.hidden = false
}



let botones = document.getElementsByClassName('boton')
let carroCompras = document.getElementById('carro')
let carroStorage = []

if (localStorage.getItem('carro')) {
  carroStorage = JSON.parse(localStorage.getItem('carro'))
}

for (const boton of botones) {
    boton.onclick = (e) => {
        let bebidaBuscada = totalMisBebidas.find(bebida => bebida.id == e.target.id)
        console.log(bebidaBuscada)
      
        let posicionbebidaEnCarro = carroStorage.findIndex((bebida) => bebida.id == bebidaBuscada.id)
      
        if (posicionbebidaEnCarro != -1) {
            carroStorage[posicionbebidaEnCarro].unidades++ 
            carroStorage[posicionbebidaEnCarro].subtotal = carroStorage[posicionbebidaEnCarro].precioUnidad * carroStorage[posicionbebidaEnCarro].unidades
        } else {
            carroStorage.push({ id: bebidaBuscada.id, precioUnidad: bebidaBuscada.precio, unidades: 1, subtotal: bebidaBuscada.precio, nombre: bebidaBuscada.bebida })
        }
      
        localStorage.setItem('carro', JSON.stringify(carroStorage))
        renderizarCarro()
    }
}    

function renderizarCarro () {
    carroCompras.innerHTML = `
      <div class="itemCarro">
        <p>Nombre</p>
        <p>Precio por unidad</p>
        <p>Unidades</p>
        <p>Subtotal</p>
      </div>
    `
    let total = 0
    for (const item of carroStorage) {
      total += item.subtotal
      carroCompras.innerHTML += `
        <div class="itemCarro">
          <p>${item.nombre}</p>
          <p>${item.precioUnidad}</p>
          <p>${item.unidades}</p>
          <p>${item.subtotal}</p>
        </div>
      `
    }
    carroCompras.innerHTML += `
      <div class="itemCarro">
        <h3>total: ${total}</h3>
      </div>
    `
  }

renderizarCarro()

let botonCarrito = document.getElementById('botonCarrito')

botonCarrito.onclick = () => {
  if (carroCompras.hidden) {
    carroCompras.hidden = false
  } else {
    carroCompras.hidden = true
  }
}

let vaciarCarrito = document.getElementById('vaciarCarrito')

vaciarCarrito.onclick = () => {
  localStorage.clear()
  carroCompras.innerHTML = ''
  carroStorage = []
}