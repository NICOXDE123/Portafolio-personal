document.addEventListener("DOMContentLoaded", function() {
  // 1. Animación de título dinámico
  const animateHeaderTitle = () => {
    const titulo = document.querySelector("header h1");
    const titulosAlternativos = [
      "Portafolio de Nicolás Huenchual",
      "Desarrollador Full Stack",
      "Nicolás Huenchual Moreno"
    ];

    let indiceTitulo = 0;
    setInterval(() => {
      titulo.style.opacity = 0;
      titulo.style.transition = 'opacity 0.5s ease';
      
      setTimeout(() => {
        indiceTitulo = (indiceTitulo + 1) % titulosAlternativos.length;
        titulo.textContent = titulosAlternativos[indiceTitulo];
        titulo.style.opacity = 1;
      }, 500);
    }, 3000);
  };

  // 2. Animación para ítem de menú
  const animateNavItem = () => {
    const navList = document.querySelector("nav ul");
    const nuevoItem = document.createElement("li");
    nuevoItem.innerHTML = '<a href="#formacion">Formación</a>';
    nuevoItem.style.opacity = '0';
    nuevoItem.style.transform = 'translateY(-10px)';
    navList.appendChild(nuevoItem);

    setTimeout(() => {
      nuevoItem.style.transition = 'all 0.3s ease-out';
      nuevoItem.style.opacity = '1';
      nuevoItem.style.transform = 'translateY(0)';
    }, 100);
  };

  // 3. Modal para imágenes de proyectos
  const setupImageModal = () => {
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

    // Eventos para abrir modal
    document.querySelectorAll('.project-img').forEach(img => {
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function(e) {
        e.preventDefault();
        const projectItem = this.closest('.project-item');
        currentProjectLink = projectItem.querySelector('a').href;
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    // Cerrar modal
    const closeModal = () => {
      imageModal.style.display = "none";
      document.body.style.overflow = "auto";
    };

    closeImageModal.addEventListener("click", closeModal);
    imageModal.addEventListener("click", function(e) {
      if (e.target === imageModal) closeModal();
    });

    visitProjectBtn.addEventListener("click", function() {
      window.location.href = currentProjectLink;
    });
  };

  // 4. Actualizar año en el footer
  const updateFooterYear = () => {
    const footer = document.querySelector("footer p");
    footer.innerHTML = `&copy; ${new Date().getFullYear()} - Nicolás Huenchual Moreno - Todos los derechos reservados`;
  };

  // 5. Validación y envío de formulario
  const setupContactForm = () => {
    const form = document.querySelector('#contacto form');
    if (!form) return;

    // Crear contenedor de mensajes
    const messageContainer = document.createElement('div');
    messageContainer.id = 'form-message';
    messageContainer.className = 'form-message';
    messageContainer.style.display = 'none';
    form.appendChild(messageContainer);

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Obtener valores
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();
      const submitBtn = form.querySelector('button[type="submit"]');
      
      // Validación
      if (!nombre || !email || !mensaje) {
        showMessage('Por favor completa todos los campos', 'error');
        return;
      }
      
      if (!validateEmail(email)) {
        showMessage('Por favor ingresa un correo válido', 'error');
        return;
      }
      
      // Estado de carga
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      
      try {
        // Simular envío (reemplazar con API real)
        await simulateSubmit();
        
        // Éxito
        showMessage('Mensaje enviado con éxito', 'success');
        form.reset();
        
        // Ocultar mensaje después de 5s
        setTimeout(() => {
          messageContainer.style.display = 'none';
        }, 5000);
        
      } catch (error) {
        showMessage('Error al enviar. Intenta nuevamente.', 'error');
      } finally {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });

    // Funciones auxiliares
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    function showMessage(text, type) {
      const messageContainer = document.getElementById('form-message');
      messageContainer.textContent = text;
      messageContainer.className = `form-message ${type}`;
      messageContainer.style.display = 'block';
      
      if (type === 'error') {
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    function simulateSubmit() {
      return new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
    }
  };

  // 6. Añadir estilos dinámicos
  const addDynamicStyles = () => {
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
        box-shadow: 0 0 20px rgba(255,255,255,0.1);
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
      .form-message {
        display: none;
        margin-top: 1rem;
        padding: 12px;
        border-radius: 6px;
        font-weight: 500;
        animation: fadeIn 0.3s ease-out;
      }
      .form-message.success {
        background-color: #e8faf8;
        color: #2ec4b6;
        border-left: 4px solid #2ec4b6;
      }
      .form-message.error {
        background-color: #ffecec;
        color: #f72585;
        border-left: 4px solid #f72585;
      }
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      button[disabled] {
        opacity: 0.7;
        cursor: not-allowed;
        position: relative;
      }
      button[disabled]::after {
        content: '';
        display: inline-block;
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255,255,255,0.3);
        border-radius: 50%;
        border-top-color: white;
        animation: spin 1s linear infinite;
        margin-left: 8px;
        vertical-align: middle;
      }
      @keyframes spin {
        to { transform: rotate(360deg); }
      }
    `;
    document.head.appendChild(style);
  };

  // Ejecutar todas las funciones
  animateHeaderTitle();
  animateNavItem();
  setupImageModal();
  updateFooterYear();
  setupContactForm();
  addDynamicStyles();
});