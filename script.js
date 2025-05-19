document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // Variables
    const navbar = document.getElementById('navbar');
    const navLinks = document.querySelectorAll('.nav-link');
    const backToTopButton = document.querySelector('.back-to-top');
    const contactForm = document.getElementById('contactForm');
    
    // Función para añadir la clase 'scrolled' al navbar al hacer scroll
    function toggleNavbarBackground() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    // Función para mostrar/ocultar el botón de volver arriba
    function toggleBackToTopButton() {
        if (window.scrollY > 300) {
            backToTopButton.classList.add('active');
        } else {
            backToTopButton.classList.remove('active');
        }
    }
    
    // Función para manejar el desplazamiento suave al hacer clic en los enlaces del navbar
    function handleNavLinkClick(e) {
        const targetId = this.getAttribute('href');
        
        if (targetId.startsWith('#') && targetId !== '#') {
            e.preventDefault();
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Cierra el menú móvil si está abierto
                const navbarCollapse = document.querySelector('.navbar-collapse');
                if (navbarCollapse.classList.contains('show')) {
                    document.querySelector('.navbar-toggler').click();
                }
            }
        }
    }
    
    // Función para resaltar el enlace activo en el navbar según la sección visible
    function highlightNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        document.querySelectorAll('section').forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    // Función para manejar el envío del formulario de contacto
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Obtener los datos del formulario
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validación básica
        if (!name || !email || !subject || !message) {
            alert('Por favor, completa todos los campos del formulario.');
            return;
        }
        
        // Aquí normalmente se enviarían los datos a un backend
        // Como se mencionó en los requisitos, esto es solo visual, así que mostramos un mensaje de éxito
        alert('¡Gracias por tu mensaje! Te responderé lo antes posible.');
        
        // Resetear el formulario
        this.reset();
    }
    
    // Eventos del scroll
    window.addEventListener('scroll', toggleNavbarBackground);
    window.addEventListener('scroll', toggleBackToTopButton);
    window.addEventListener('scroll', highlightNavLink);
    
    // Eventos de clic en los enlaces del navbar
    navLinks.forEach(link => {
        link.addEventListener('click', handleNavLinkClick);
    });
    
    // Evento de clic en el botón de volver arriba
    if (backToTopButton) {
        backToTopButton.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Evento de envío del formulario
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    // Inicialización: verificar si hay alguna sección en la URL hash
    if (window.location.hash) {
        const targetId = window.location.hash;
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            setTimeout(function() {
                const offsetTop = targetSection.offsetTop - 70;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }, 300);
        }
    }
    
    // Activar la primera sección por defecto si no hay hash
    if (!window.location.hash) {
        document.querySelector('.nav-link').classList.add('active');
    }
    
    // Inicializar el estado del navbar al cargar la página
    toggleNavbarBackground();
    
    // Inicializar el estado del botón de volver arriba
    toggleBackToTopButton();
}); 