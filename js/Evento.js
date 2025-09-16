// Obtiene el modal y sus elementos
const modal = document.getElementById("modal-evento");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescripcion = document.getElementById("modal-descripcion");
const modalFecha = document.getElementById("modal-fecha");
const modalBanner = document.getElementById("modal-banner");
const modalInscripcion = document.getElementById("modal-inscripcion");
const cerrarBtn = document.querySelector(".cerrar");

// Agrega un evento 'click' a cada botón 'Saber más'
document.querySelectorAll(".saber-mas").forEach(boton => {
  boton.addEventListener("click", function () {
    // Lee los datos del botón que fue clickeado
    const titulo = this.getAttribute("data-title");
    const descripcion = this.getAttribute("data-description");
    const fecha = this.getAttribute("data-date");
    const banner = this.getAttribute("data-banner");
    const inscripcion = this.getAttribute("data-inscripcion");

    // Llena el modal con los datos leídos
    modalTitulo.textContent = titulo;
    modalDescripcion.textContent = descripcion;
    modalFecha.textContent = fecha;
    modalBanner.src = banner;
    modalInscripcion.href = inscripcion;

    // Muestra el modal
    modal.style.display = "flex";
  });
});

// Cierra el modal cuando se hace click en la X
cerrarBtn.addEventListener("click", function () {
  modal.style.display = "none";
});

// Cierra el modal cuando se hace click fuera del contenido
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    modal.style.display = "none";
  }
});
