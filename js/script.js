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

    faqItems.forEach((item, index) => {
        const question = item.querySelector('h4');
        const answer = item.querySelector('p');
        const icon = question.querySelector('i');

        if (index === 0) {
            answer.style.display = 'block';
            if (icon) icon.className = 'fas fa-chevron-up';
        } else {
            answer.style.display = 'none';
            if (icon) icon.className = 'fas fa-chevron-down';
        }

        question.addEventListener('click', function() {
            const isOpen = answer.style.display === 'block';

            faqItems.forEach((otherItem) => {
                const otherAnswer = otherItem.querySelector('p');
                const otherIcon = otherItem.querySelector('h4 i');
                otherAnswer.style.display = 'none';
                if (otherIcon) otherIcon.className = 'fas fa-chevron-down';
            });

            if (!isOpen) {
                answer.style.display = 'block';
                if (icon) icon.className = 'fas fa-chevron-up';
            }
        });
    });

    // ==========================================
    // 2. Menú hamburguesa para móviles
    // ==========================================
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.querySelector('nav');

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            const icon = this.querySelector('i');
            if (icon) {
                if (icon.classList.contains('fa-bars')) {
                    icon.className = 'fas fa-times';
                } else {
                    icon.className = 'fas fa-bars';
                }
            }
        });

        nav.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                nav.classList.remove('active');
                if (menuToggle) {
                    const icon = menuToggle.querySelector('i');
                    if (icon) icon.className = 'fas fa-bars';
                }
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

    console.log('🚀 Clínica Estomatológica Dra. Yisel cargada correctamente.');
});