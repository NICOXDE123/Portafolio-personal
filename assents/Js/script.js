/**
 * PORTFOLIO SCRIPT - Nicolás Huenchual
 * 
 * Este script maneja todas las interacciones dinámicas del portfolio:
 * - Animación del título principal
 * - Menú de navegación
 * - Modal para imágenes de proyectos
 * - Formulario de contacto
 * - Actualización automática del año en el footer
 */

// Esperar a que el DOM esté completamente cargado
document.addEventListener("DOMContentLoaded", function() {

  /**************************************
   * 1. ANIMACIÓN DE TÍTULO DINÁMICO
   * 
   * Cambia cíclicamente el texto del título principal
   * con un efecto de fade in/out
   **************************************/
  const animateHeaderTitle = () => {
    const titulo = document.querySelector("header h1");
    // Textos alternativos para el título
    const titulosAlternativos = [
      "Portafolio de Nicolás Huenchual",
      "Desarrollador Full Stack",
      "Nicolás Huenchual Moreno"
    ];

    let indiceTitulo = 0;
    // Intervalo para cambiar el título cada 3 segundos
    setInterval(() => {
      // Efecto de desvanecimiento
      titulo.style.opacity = 0;
      titulo.style.transition = 'opacity 0.5s ease';
      
      // Después de medio segundo, cambiar el texto
      setTimeout(() => {
        indiceTitulo = (indiceTitulo + 1) % titulosAlternativos.length;
        titulo.textContent = titulosAlternativos[indiceTitulo];
        titulo.style.opacity = 1;
      }, 500);
    }, 3000);
  };

  /**************************************
   * 2. ANIMACIÓN PARA ÍTEM DE MENÚ
   * 
   * Añade dinámicamente un ítem al menú de navegación
   * con una animación suave
   **************************************/
  const animateNavItem = () => {
    const navList = document.querySelector("nav ul");
    // Crear nuevo elemento de menú
    const nuevoItem = document.createElement("li");
    nuevoItem.innerHTML = '<a href="#formacion">Formación</a>';
    // Configurar estado inicial (invisible)
    nuevoItem.style.opacity = '0';
    nuevoItem.style.transform = 'translateY(-10px)';
    navList.appendChild(nuevoItem);

    // Animación para mostrar el ítem
    setTimeout(() => {
      nuevoItem.style.transition = 'all 0.3s ease-out';
      nuevoItem.style.opacity = '1';
      nuevoItem.style.transform = 'translateY(0)';
    }, 100);
  };

  /**************************************
   * 3. MODAL PARA IMÁGENES DE PROYECTOS
   * 
   * Crea un modal que muestra las imágenes de proyectos
   * en tamaño grande al hacer clic en ellas
   **************************************/
  const setupImageModal = () => {
    // HTML del modal
    const imageModalHTML = `
      <div id="imageModal" class="image-modal">
        <span class="close-image-modal">&times;</span>
        <img class="modal-enlarged-img" src="" alt="Imagen ampliada">
        <div class="image-modal-actions">
          <button id="visitProjectBtn" class="btn">Visitar Proyecto</button>
        </div>
      </div>
    `;
    // Insertar el modal al final del body
    document.body.insertAdjacentHTML("beforeend", imageModalHTML);

    // Elementos del modal
    const imageModal = document.getElementById("imageModal");
    const modalImg = document.querySelector(".modal-enlarged-img");
    const closeImageModal = document.querySelector(".close-image-modal");
    const visitProjectBtn = document.getElementById("visitProjectBtn");
    let currentProjectLink = "#"; // Almacena el enlace del proyecto actual

    // Configurar eventos para cada imagen de proyecto
    document.querySelectorAll('.project-img').forEach(img => {
      img.style.cursor = 'pointer';
      
      img.addEventListener('click', function(e) {
        e.preventDefault();
        const projectItem = this.closest('.project-item');
        // Obtener enlace del proyecto desde el HTML
        currentProjectLink = projectItem.querySelector('a').href;
        // Configurar imagen en el modal
        modalImg.src = this.src;
        modalImg.alt = this.alt;
        // Mostrar modal
        imageModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
      });
    });

    // Función para cerrar el modal
    const closeModal = () => {
      imageModal.style.display = "none";
      document.body.style.overflow = "auto";
    };

    // Eventos para cerrar el modal
    closeImageModal.addEventListener("click", closeModal);
    imageModal.addEventListener("click", function(e) {
      if (e.target === imageModal) closeModal();
    });

    // Botón para visitar el proyecto
    visitProjectBtn.addEventListener("click", function() {
      if (currentProjectLink && currentProjectLink !== '#') {
        window.open(currentProjectLink, '_blank'); // Abre en nueva pestaña
      } else {
        alert('Este proyecto no está disponible actualmente');
      }
    });
  };

  /**************************************
   * 4. ACTUALIZAR AÑO EN EL FOOTER
   * 
   * Muestra automáticamente el año actual
   * en el texto del footer
   **************************************/
  const updateFooterYear = () => {
    const footer = document.querySelector("footer p");
    footer.innerHTML = `&copy; ${new Date().getFullYear()} - Nicolás Huenchual Moreno - Todos los derechos reservados`;
  };

  /**************************************
   * 5. FORMULARIO DE CONTACTO
   * 
   * Maneja la validación y envío del formulario
   * con feedback visual al usuario
   **************************************/
  const setupContactForm = () => {
    const form = document.querySelector('#contacto form');
    if (!form) return;

    // Crear contenedor para mensajes de estado
    const messageContainer = document.createElement('div');
    messageContainer.id = 'form-message';
    messageContainer.className = 'form-message';
    messageContainer.style.display = 'none';
    form.appendChild(messageContainer);

    // Evento de envío del formulario
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Obtener valores de los campos
      const nombre = document.getElementById('nombre').value.trim();
      const email = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();
      const submitBtn = form.querySelector('button[type="submit"]');
      
      // Validación de campos requeridos
      if (!nombre || !email || !mensaje) {
        showMessage('Por favor completa todos los campos', 'error');
        return;
      }
      
      // Validación de formato de email
      if (!validateEmail(email)) {
        showMessage('Por favor ingresa un correo válido', 'error');
        return;
      }
      
      // Cambiar estado del botón durante el envío
      submitBtn.disabled = true;
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Enviando...';
      
      try {
        // Simular envío (en producción reemplazar con llamada real a API)
        await simulateSubmit();
        
        // Mostrar mensaje de éxito
        showMessage('Mensaje enviado con éxito', 'success');
        form.reset();
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          messageContainer.style.display = 'none';
        }, 5000);
        
      } catch (error) {
        // Manejo de errores
        showMessage('Error al enviar. Intenta nuevamente.', 'error');
      } finally {
        // Restaurar estado original del botón
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    });

    // Función para validar formato de email
    function validateEmail(email) {
      const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return re.test(email);
    }

    // Mostrar mensajes de estado
    function showMessage(text, type) {
      const messageContainer = document.getElementById('form-message');
      messageContainer.textContent = text;
      messageContainer.className = `form-message ${type}`;
      messageContainer.style.display = 'block';
      
      // Scroll automático a mensajes de error
      if (type === 'error') {
        messageContainer.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }

    // Simulación de envío (1.5 segundos)
    function simulateSubmit() {
      return new Promise((resolve) => {
        setTimeout(resolve, 1500);
      });
    }
  };

  /**************************************
   * 6. ESTILOS DINÁMICOS
   * 
   * Añade estilos CSS dinámicamente
   * para elementos creados con JavaScript
   **************************************/
  const addDynamicStyles = () => {
    const style = document.createElement("style");
    style.textContent = `
      /* Estilos para el modal de imágenes */
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
      
      /* ... (otros estilos permanecen igual) ... */
    `;
    document.head.appendChild(style);
  };

  /**************************************
   * EJECUCIÓN PRINCIPAL
   * 
   * Inicializa todas las funcionalidades
   **************************************/
  animateHeaderTitle();    // Animación del título
  animateNavItem();        // Animación del menú
  setupImageModal();       // Modal para proyectos
  updateFooterYear();      // Año en el footer
  setupContactForm();      // Formulario de contacto
  addDynamicStyles();      // Estilos dinámicos
});