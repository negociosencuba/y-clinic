/**
 * ============================================
 * SCRIPT.JS - Clínica Estomatológica Dra. Yisel
 * ============================================
 */

document.addEventListener('DOMContentLoaded', function() {

    // ==========================================
    // 1. FAQ - Acordeón interactivo
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    const abrirFaq = function(question, answer, icon) {
        answer.style.display = 'block';
        question.setAttribute('aria-expanded', 'true');
        if (icon) icon.className = 'fas fa-chevron-up';
    };

    const cerrarFaq = function(question, answer, icon) {
        answer.style.display = 'none';
        question.setAttribute('aria-expanded', 'false');
        if (icon) icon.className = 'fas fa-chevron-down';
    };

    faqItems.forEach((item, index) => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        const icon = question.querySelector('i');

        // Hacerla enfocable y anunciable como control expandible
        question.setAttribute('tabindex', '0');
        question.setAttribute('role', 'button');

        if (index === 0) {
            abrirFaq(question, answer, icon);
        } else {
            cerrarFaq(question, answer, icon);
        }

        const toggleFaq = function() {
            const isOpen = answer.style.display === 'block';

            faqItems.forEach((otherItem) => {
                const otherQuestion = otherItem.querySelector('h4');
                const otherAnswer = otherItem.querySelector('p');
                const otherIcon = otherQuestion.querySelector('i');
                cerrarFaq(otherQuestion, otherAnswer, otherIcon);
            });

            if (!isOpen) {
                abrirFaq(question, answer, icon);
            }
        };

        question.addEventListener('click', toggleFaq);

        // Soporte de teclado: Enter y Espacio abren/cierran la respuesta
        question.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                toggleFaq();
            }
        });
    });

    // ==========================================
    // 2. Menú hamburguesa para móviles
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        const toggleMenu = function() {
            const isOpen = nav.classList.toggle('active');
            menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
            }
        };

        menuToggle.addEventListener('click', toggleMenu);

        // Soporte de teclado: Enter y Espacio activan el menÃº igual que un clic
        menuToggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
                e.preventDefault();
                toggleMenu();
            }
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                menuToggle.setAttribute('aria-expanded', 'false');
                const icon = menuToggle.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });
    }

    // ==========================================
    // 3. Smooth scroll para enlaces internos
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const headerHeight = document.querySelector('header')?.offsetHeight || 60;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // 4. Año actual en el footer (automático)
    // ==========================================
    const footerYear = document.querySelector('.footer-copy');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2026', currentYear);
    }

    // ==========================================
    // 5. FUNCIONALIDAD "VER MÁS" EN SERVICIOS
    // ==========================================
    const botonesVerMas = document.querySelectorAll('.btn-ver-mas');

    botonesVerMas.forEach(function(boton) {
        boton.addEventListener('click', function(e) {
            e.preventDefault();

            const card = this.closest('.servicio-card');
            const detalle = card.querySelector('.servicio-detalle');
            const icono = this.querySelector('i');

            if (detalle.style.display === 'none' || detalle.style.display === '') {
                detalle.style.display = 'block';
                this.innerHTML = 'Ver menos <i class="fas fa-chevron-up"></i>';
            } else {
                detalle.style.display = 'none';
                this.innerHTML = 'Ver m&aacute;s <i class="fas fa-chevron-down"></i>';
            }
        });
    });

    console.log(' Clínica Estomatológica Dra. Yisel cargada correctamente.');
});