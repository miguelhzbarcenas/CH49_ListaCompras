const txtName = document.getElementById("Name");
const txtNumber = document.getElementById("Number");

const btnAgregar = document.getElementById("btnAgregar");
const btnClear = document.getElementById("btnClear");

const alertValidaciones = document.getElementById("alertValidaciones");
const alertValidacionesTexto = document.getElementById(
  "alertValidacionesTexto"
);

const tablaListaCompras = document.getElementById("tablaListaCompras");
const tbody = document.getElementsByTagName("tbody").item(0);

const contadorProductos = document.getElementById("contadorProductos");
const productosTotal = document.getElementById("productosTotal");
const precioTotal = document.getElementById("precioTotal");

let cont = 0;
let cantidadProductos = 0;
let costoTotal = 0;

let datos = [];

btnAgregar.addEventListener("click", function (event) {
  event.preventDefault();
  let isValid = true;
  txtName.value = txtName.value.trim();
  txtNumber.value = txtNumber.value.trim();
  txtName.style.border = "";
  txtNumber.style.border = "";
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";

  if (txtName.value.length < 3) {
    txtName.style.border = "solid red medium";
    alertValidacionesTexto.innerHTML = "El nombre del producto no es correcto";
    alertValidaciones.style.display = "block";
    isValid = false;
  }

  if (!validarCantidad(txtNumber.value)) {
    txtNumber.style.border = "solid red medium";
    alertValidacionesTexto.innerHTML += "<br/>La cantidad es incorrecta";
    alertValidaciones.style.display = "block";
    isValid = false;
  }

  if (isValid) {
    cont++;
    let precio = getPrecio();

    let elemento = {
      cont: cont,
      nombre: txtName.value,
      cantidad: txtNumber.value,
      precio: precio,
    };
    datos.push(elemento);

    tbody.innerText = "";
    datos.forEach((element) => {
      let row = `<tr>
      <th scope="row">${element.cont}</th>
      <td>${element.nombre}</td>
      <td>${element.cantidad}</td>
      <td>$ ${element.precio.toFixed(2)}</td>
    </tr>`;
      tbody.insertAdjacentHTML("beforeend", row);
    });

    cantidadProductos += Number(txtNumber.value);
    productosTotal.innerText = `${cantidadProductos}`;

    //(*100/100) ayuda a que solo haya 2 decimales.
    costoTotal += (Number(txtNumber.value) * precio * 100) / 100;
    precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
    contadorProductos.innerText = cont;

    localStorage.setItem("costoTotal", costoTotal);
    localStorage.setItem("cantidadProductos", cantidadProductos);
    localStorage.setItem("cont", cont);
    localStorage.setItem("datos", JSON.stringify(datos));

    txtName.value = "";
    txtNumber.value = "";
    txtName.focus();
  }
});

btnClear.addEventListener("click", (event) => {
  alertValidacionesTexto.innerHTML = "";
  alertValidaciones.style.display = "none";

  txtName.style.border = "";
  txtNumber.style.border = "";
  txtName.value = "";
  txtNumber.value = "";

  cont = 0;
  cantidadProductos = 0;
  costoTotal = 0;

  contadorProductos.innerText = cont;
  productosTotal.innerText = cantidadProductos;
  precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;

  tbody.innerHTML = "";

  datos = [];

  localStorage.setItem("costoTotal", costoTotal);
  localStorage.setItem("cantidadProductos", cantidadProductos);
  localStorage.setItem("cont", cont);
  localStorage.setItem("datos", datos);

  txtName.focus();
});

window.addEventListener("load", (event) => {
  if (this.localStorage.getItem("costoTotal") != null) {
    costoTotal = Number(this.localStorage.getItem("costoTotal"));
  }
  if (this.localStorage.getItem("cantidadProductos") != null) {
    cantidadProductos = Number(this.localStorage.getItem("cantidadProductos"));
  }
  if (this.localStorage.getItem("cont") != null) {
    cont = Number(this.localStorage.getItem("cont"));
  }

  if (this.localStorage.getItem("datos") != null) {
    datos = JSON.parse(this.localStorage.getItem("datos"));
  }

  precioTotal.innerText = `$ ${costoTotal.toFixed(2)}`;
  contadorProductos.innerText = cont;
  productosTotal.innerText = `${cantidadProductos}`;

  tbody.innerText = "";
  datos.forEach((element) => {
    let row = `<tr>
      <th scope="row">${element.cont}</th>
      <td>${element.nombre}</td>
      <td>${element.cantidad}</td>
      <td>$ ${element.precio.toFixed(2)}</td>
    </tr>`;
    tbody.insertAdjacentHTML("beforeend", row);
  });
});

function validarCantidad(cantidad) {
  return cantidad.length > 0 && !Number.isNaN(cantidad) && Number(cantidad) > 0;
}

function getPrecio() {
  return Math.round(Math.random() * 10000) / 100;
}
