// 1. Cambiar dinámicamente el título <h1>
document.addEventListener("DOMContentLoaded", () => {
    const titulo = document.querySelector("nav h1");
    titulo.textContent = "Portafolio de Nicolás Huenchual";
  });
  
  // 2. Agregar un nuevo ítem al menú
  const navList = document.querySelector("nav ul");
  const nuevoItem = document.createElement("li");
  nuevoItem.innerHTML = '<a href="#formacion">Formación</a>';
  navList.appendChild(nuevoItem);
  
  // 3. Cambiar el fondo de la sección de "Proyectos" al hacer clic
  const proyectosSection = document.querySelector("#proyectos");
  proyectosSection.addEventListener("click", () => {
    proyectosSection.style.backgroundColor = "#eef6ff";
  });
  
  // 4. Insertar el año actual automáticamente en el footer
  const footer = document.querySelector("footer p");
  const anioActual = new Date().getFullYear();
  footer.innerHTML = `&copy; ${anioActual} Nicolás Huenchual Moreno`;
  
  // 5. Modal simple
  const modalHTML = `
    <div id="modal" class="modal">
      <div class="modal-content">
        <span class="cerrar">&times;</span>
        <h2>Hola 👋</h2>
        <p>Gracias por visitar mi portafolio.</p>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", modalHTML);
  
  const modal = document.getElementById("modal");
  const cerrar = document.querySelector(".cerrar");
  
  // Botón para mostrar el modal (puedes colocarlo donde quieras)
  const botonModal = document.createElement("button");
  botonModal.textContent = "Ver mensaje";
  botonModal.className = "btn";
  document.querySelector("#inicio").appendChild(botonModal);
  
  botonModal.addEventListener("click", () => {
    modal.style.display = "block";
  });
  
  cerrar.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  