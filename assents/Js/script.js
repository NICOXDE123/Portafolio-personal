document.addEventListener("DOMContentLoaded", function() {
    // 1. Cambio dinámico del título con efecto (existente)
    const titulo = document.querySelector("header h1");
    const titulosAlternativos = [
      "Portafolio de Nicolás Huenchual",
      "Desarrollador Full Stack",
      "Nicolás Huenchual Moreno"
    ];
    
    let indiceTitulo = 0;
    titulo.textContent = titulosAlternativos[indiceTitulo];
    
    setInterval(() => {
      indiceTitulo = (indiceTitulo + 1) % titulosAlternativos.length;
      titulo.style.opacity = 0;
      
      setTimeout(() => {
        titulo.textContent = titulosAlternativos[indiceTitulo];
        titulo.style.opacity = 1;
      }, 500);
    }, 3000);
  
    // 2. Agregar ítem al menú con animación (existente)
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
  
    // 3. Efecto interactivo en proyectos (existente modificado)
    const proyectosSection = document.querySelector("#proyectos");
    const coloresFondo = ["#f8f9fa", "#eef6ff", "#f0f8ff", "#f5f9ff"];
    let colorIndex = 0;
    
    proyectosSection.addEventListener("click", (e) => {
      // Solo cambiar color si no se hizo clic en una imagen
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
  
    // 4. Footer con información dinámica (existente)
    const footer = document.querySelector("footer p");
    const anioActual = new Date().getFullYear();
    footer.innerHTML = `&copy; ${anioActual} - Nicolás Huenchual Moreno - Todos los derechos reservados`;
    
   
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    document.body.insertAdjacentHTML("beforeend", modalHTML);
  
    // 6. Modal para ampliación de imágenes (NUEVO)
    const imageModalHTML = `
      <div id="imageModal" class="image-modal">
        <span class="close-image-modal">&times;</span>
        <img class="modal-enlarged-img" src="" alt="Imagen ampliada">
        <div class="image-modal-actions">
          <button id="visitProjectBtn" class="btn btn-primary">Visitar Proyecto</button>
        </div>
      </div>
    `;
    document.body.insertAdjacentHTML("beforeend", imageModalHTML);
  
    // Variables para los modales
    
    const imageModal = document.getElementById("imageModal");
    const modalImg = document.querySelector(".modal-enlarged-img");
    const closeImageModal = document.querySelector(".close-image-modal");
    const visitProjectBtn = document.getElementById("visitProjectBtn");
    let currentProjectLink = '#';
  
    // Funcionalidad para imágenes de proyectos (NUEVO)
    document.querySelectorAll('.project-img').forEach(img => {
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function(e) {
        e.preventDefault();
        currentProjectLink = this.closest('.project-item').querySelector('a').href;
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });
  
    // Redirección con doble clic (NUEVO)
    document.querySelectorAll('.project-img').forEach(img => {
      img.addEventListener('dblclick', function() {
        window.location.href = this.closest('.project-item').querySelector('a').href;
      });
    });
  
    // Botón Visitar Proyecto (NUEVO)
    visitProjectBtn.addEventListener('click', function() {
      window.location.href = currentProjectLink;
    });
        // Mostrar modal de bienvenida
    setTimeout(() => {
      welcomeModal.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }, 1500);
  
    // Estilos dinámicos (actualizados)
    const style = document.createElement('style');
    style.textContent = `
      /* [Estilos existentes...] */
      
      /* Nuevos estilos para el modal de imágenes */
      .image-modal {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
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
        top: 30px;
        right: 40px;
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
      
      .image-modal-actions {
        text-align: center;
      }
      
      .project-img {
        transition: transform 0.3s;
        cursor: pointer;
      }
      
      .project-img:hover {
        transform: scale(1.03);
      }
      
      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.01); }
        100% { transform: scale(1); }
      }
    `;
    document.head.appendChild(style);
  });
  
