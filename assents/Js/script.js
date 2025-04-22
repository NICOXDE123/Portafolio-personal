document.addEventListener("DOMContentLoaded", function () {
  // 1. Cambio dinámico del título
  const titulo = document.querySelector("header h1");
  const titulosAlternativos = [
    "Portafolio de Nicolás Huenchual",
    "Desarrollador Full Stack",
    "Nicolás Huenchual Moreno"
  ];

  let indiceTitulo = 0;
  setInterval(() => {
    titulo.style.opacity = 0;
    setTimeout(() => {
      indiceTitulo = (indiceTitulo + 1) % titulosAlternativos.length;
      titulo.textContent = titulosAlternativos[indiceTitulo];
      titulo.style.opacity = 1;
    }, 500);
  }, 3000);

  // 2. Agregar ítem al menú con animación
  const navList = document.querySelector("nav ul");
  const nuevoItem = document.createElement("li");
  nuevoItem.innerHTML = '<a href="#formacion">Formación</a>';
  nuevoItem.style.opacity = 0;
  nuevoItem.style.transform = 'translateY(-10px)';
  navList.appendChild(nuevoItem);

  setTimeout(() => {
    nuevoItem.style.transition = 'all 0.3s ease-out';
    nuevoItem.style.opacity = 1;
    nuevoItem.style.transform = 'translateY(0)';
  }, 100);

  // 3. Efecto interactivo en proyectos
  const proyectosSection = document.querySelector("#proyectos");
  const coloresFondo = ["#f8f9fa", "#eef6ff", "#f0f8ff", "#f5f9ff"];
  let colorIndex = 0;

  proyectosSection.addEventListener("click", (e) => {
    if (!e.target.classList.contains('project-img')) {
      colorIndex = (colorIndex + 1) % coloresFondo.length;
      proyectosSection.style.transition = 'background-color 0.5s ease';
      proyectosSection.style.backgroundColor = coloresFondo[colorIndex];
      proyectosSection.style.animation = 'pulse 0.5s';
      setTimeout(() => {
        proyectosSection.style.animation = '';
      }, 500);
    }
  });

  // 4. Footer con año dinámico
  const footer = document.querySelector("footer p");
  const anioActual = new Date().getFullYear();
  footer.innerHTML = `&copy; ${anioActual} - Nicolás Huenchual Moreno - Todos los derechos reservados`;

  // 5. Modal para ampliar imagen
  const imageModalHTML = `
    <div id="imageModal" class="image-modal">
      <span class="close-image-modal">&times;</span>
      <img class="modal-enlarged-img" src="" alt="Imagen ampliada">
      <div class="image-modal-actions">
        <button id="visitProjectBtn" class="btn">Visitar Proyecto</button>
      </div>
    </div>
  `;
  document.body.insertAdjacentHTML("beforeend", imageModalHTML);

  const imageModal = document.getElementById("imageModal");
  const modalImg = document.querySelector(".modal-enlarged-img");
  const closeImageModal = document.querySelector(".close-image-modal");
  const visitProjectBtn = document.getElementById("visitProjectBtn");

  let currentProjectLink = "#";

  // Evento al hacer click en una imagen
  document.querySelectorAll('.project-img').forEach(img => {
    img.style.cursor = 'pointer';

    img.addEventListener('click', function (e) {
      e.preventDefault();
      currentProjectLink = this.closest('.project-item').querySelector('a').href;
      modalImg.src = this.src;
      modalImg.alt = this.alt;
      imageModal.style.display = 'flex';
      document.body.style.overflow = 'hidden';
    });

    // Doble clic redirige
    img.addEventListener('dblclick', function () {
      window.location.href = this.closest('.project-item').querySelector('a').href;
    });
  });

  // Cerrar modal
  closeImageModal.addEventListener("click", () => {
    imageModal.style.display = "none";
    document.body.style.overflow = "auto";
  });

  // Botón visitar proyecto
  visitProjectBtn.addEventListener("click", function () {
    window.location.href = currentProjectLink;
  });

  // 6. Estilos dinámicos (solo una vez)
  const style = document.createElement("style");
  style.textContent = `
    .image-modal {
      display: none;
      position: fixed;
      top: 0; left: 0;
      width: 100%; height: 100%;
      background-color: rgba(0,0,0,0.9);
      z-index: 10001;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }

    .modal-enlarged-img {
      max-width: 90%;
      max-height: 80vh;
      object-fit: contain;
      border-radius: 8px;
      margin-bottom: 20px;
    }

    .close-image-modal {
      position: absolute;
      top: 30px; right: 40px;
      color: white;
      font-size: 40px;
      font-weight: bold;
      cursor: pointer;
      transition: all 0.3s;
    }

    .close-image-modal:hover {
      color: #f72585;
      transform: rotate(90deg);
    }

    @keyframes pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.01); }
      100% { transform: scale(1); }
    }
  `;
  document.head.appendChild(style);
});
