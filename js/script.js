/**
 * ============================================
 * SCRIPT.JS - Clínica Estomatológica Dra. Yisel
 * (codificación UTF-8)
 * ============================================
 */
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ==========================================
    // 1. Header: sombra al hacer scroll + botón "subir"
    // ==========================================
    var header = document.querySelector('header');
    var toTop = document.getElementById('toTop');

    function onScroll() {
        var y = window.pageYOffset || document.documentElement.scrollTop;
        if (header) header.classList.toggle('scrolled', y > 8);
        if (toTop) toTop.classList.toggle('show', y > 600);
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    if (toTop) {
        toTop.addEventListener('click', function () {
            window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
        });
    }

    // ==========================================
    // 2. Menú hamburguesa (móvil)
    // ==========================================
    var menuToggle = document.getElementById('menuToggle');
    var nav = document.getElementById('mainNav');

    function setMenu(open) {
        if (!menuToggle || !nav) return;
        nav.classList.toggle('active', open);
        menuToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        menuToggle.setAttribute('aria-label', open ? 'Cerrar menú de navegación' : 'Abrir menú de navegación');
        var icon = menuToggle.querySelector('i');
        if (icon) icon.className = open ? 'fas fa-times' : 'fas fa-bars';
    }

    if (menuToggle && nav) {
        menuToggle.addEventListener('click', function () {
            setMenu(!nav.classList.contains('active'));
        });
        nav.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () { setMenu(false); });
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && nav.classList.contains('active')) {
                setMenu(false);
                menuToggle.focus();
            }
        });
        document.addEventListener('click', function (e) {
            if (nav.classList.contains('active') && !nav.contains(e.target) && !menuToggle.contains(e.target)) {
                setMenu(false);
            }
        });
    }

    // ==========================================
    // 3. FAQ: solo una respuesta abierta a la vez
    // ==========================================
    var faqs = document.querySelectorAll('.faq-item');
    faqs.forEach(function (item) {
        item.addEventListener('toggle', function () {
            if (!item.open) return;
            faqs.forEach(function (other) {
                if (other !== item) other.open = false;
            });
        });
    });

    // ==========================================
    // 4. Revelado suave de secciones
    // ==========================================
    var reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window && !reduceMotion) {
        var revealObs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    revealObs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        reveals.forEach(function (el) { revealObs.observe(el); });
    } else {
        reveals.forEach(function (el) { el.classList.add('visible'); });
    }

    // ==========================================
    // 5. Enlace activo según la sección visible
    // ==========================================
    function trackSections(linkSelector) {
        var links = Array.prototype.slice.call(document.querySelectorAll(linkSelector));
        if (!links.length || !('IntersectionObserver' in window)) return;

        var map = {};
        links.forEach(function (link) {
            var href = link.getAttribute('href') || '';
            var hash = href.indexOf('#') > -1 ? href.slice(href.indexOf('#')) : '';
            if (hash.length > 1 && (href.charAt(0) === '#' || href.indexOf(location.pathname.split('/').pop()) === 0)) {
                var target = document.querySelector(hash);
                if (target) map[target.id] = link;
            }
        });

        var ids = Object.keys(map);
        if (!ids.length) return;

        var obs = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (!entry.isIntersecting) return;
                links.forEach(function (l) { l.classList.remove('active'); });
                if (map[entry.target.id]) map[entry.target.id].classList.add('active');
            });
        }, { rootMargin: '-40% 0px -55% 0px' });

        ids.forEach(function (id) { obs.observe(document.getElementById(id)); });
    }
    trackSections('nav a[href^="#"]:not(.btn-cta-nav)');
    trackSections('.categorias-nav a');

    // ==========================================
    // 6. Año actual en el pie de página
    // ==========================================
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // ==========================================
    // 7. Catálogo: "Ver más / Ver menos"
    // ==========================================
    var botonesVerMas = document.querySelectorAll('.btn-ver-mas');

    function setDetalle(boton, abrir) {
        var card = boton.closest('.servicio-card');
        var detalle = card && card.querySelector('.servicio-detalle');
        if (!detalle) return;
        detalle.classList.toggle('abierto', abrir);
        boton.setAttribute('aria-expanded', abrir ? 'true' : 'false');
        boton.querySelector('span').textContent = abrir ? 'Ver menos' : 'Ver más';
    }

    botonesVerMas.forEach(function (boton) {
        boton.addEventListener('click', function () {
            setDetalle(boton, boton.getAttribute('aria-expanded') !== 'true');
        });
    });

    // Si llegan desde el inicio con un enlace a un servicio concreto, se abre su detalle
    function abrirDesdeHash() {
        if (!location.hash || !botonesVerMas.length) return;
        var card = document.querySelector(location.hash);
        var boton = card && card.querySelector('.btn-ver-mas');
        if (boton) setDetalle(boton, true);
    }
    abrirDesdeHash();
    window.addEventListener('hashchange', abrirDesdeHash);

    // ==========================================
    // 8. Galería antes/después: ampliar imagen
    // ==========================================
    var lightbox = document.getElementById('lightbox');
    if (lightbox && typeof lightbox.showModal === 'function') {
        var lbImg = lightbox.querySelector('img');
        var lbCap = lightbox.querySelector('.lightbox-cap');

        document.querySelectorAll('.caso-imagenes img').forEach(function (img) {
            img.setAttribute('tabindex', '0');
            img.setAttribute('role', 'button');
            var abrir = function () {
                lbImg.src = img.currentSrc || img.src;
                lbImg.alt = img.alt;
                lbCap.textContent = img.alt;
                lightbox.showModal();
            };
            img.addEventListener('click', abrir);
            img.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); abrir(); }
            });
        });

        lightbox.addEventListener('click', function (e) {
            if (e.target === lightbox || e.target.classList.contains('lightbox-close')) lightbox.close();
        });
    }
});
