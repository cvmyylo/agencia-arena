// =============================================
// CONFIGURACIÓN DE GALERÍA
// Imágenes con datos de proyecto en orden exacto
// =============================================
const galleryImages = [
    {
        src: 'assets/img/019.png',
        alt: 'Nicolaides',
        category: 'BRANDING',
        title: 'Nicolaides',
        desc: 'Creación de logo, página web, packaging y branding.'
    },
    {
        src: 'assets/img/0150.png',
        alt: 'Nissan',
        category: 'TRADE MARKETING',
        title: 'Nissan',
        desc: 'Revista interna.'
    },
    {
        src: 'assets/img/015.png',
        alt: 'European Windows',
        category: 'TRADE MARKETING',
        title: 'European Windows',
        desc: 'Creación de página web y Stand.'
    },
    {
        src: 'assets/img/0117.png',
        alt: 'BCI',
        category: 'RRSS',
        title: 'BCI',
        desc: 'Campaña de tránsito.'
    },
    {
        src: 'assets/img/0113.png',
        alt: 'Jerry IP',
        category: 'BRANDING',
        title: 'Jerry IP',
        desc: 'Creación de página web y branding.'
    },
    {
        src: 'assets/img/017.png',
        alt: 'KGIUN+',
        category: 'BRANDING',
        title: 'KGIUN+',
        desc: 'Creación de logo, packaging, branding y página web.'
    },
    {
        src: 'assets/img/0145.png',
        alt: 'WANKALODGE',
        category: 'BRANDING',
        title: 'WANKALODGE',
        desc: 'Diseño de experiencia de usuario.'
    },
    {
        src: 'assets/img/0140.png',
        alt: 'Shara',
        category: 'BRANDING',
        title: 'Shara',
        desc: 'Creación de logo y Packaging.'
    },
    {
        src: 'assets/img/0132.png',
        alt: 'AGRALIA',
        category: 'PUBLICIDAD',
        title: 'AGRALIA',
        desc: 'Avisos de prensa y folletería.'
    },
    {
        src: 'assets/img/0144.png',
        alt: 'PACX',
        category: 'BRANDING',
        title: 'PACX',
        desc: 'Creación de logo, papelería, folletería y branding.'
    },
    {
        src: 'assets/img/0151.png',
        alt: 'INNOVACOLLEGE',
        category: 'EDITORIAL',
        title: 'INNOVACOLLEGE',
        desc: 'Mails y folletería.'
    },
    {
        src: 'assets/img/0141.png',
        alt: 'Clínica IRAM',
        category: 'PACKAGING',
        title: 'Clínica IRAM',
        desc: 'Branding.'
    },
    {
        src: 'assets/img/0139.png',
        alt: 'VAI TEA',
        category: 'PACKAGING',
        title: 'VAI TEA',
        desc: 'Creación de logo y merchandising.'
    },
    {
        src: 'assets/img/0110.png',
        alt: 'Aptar Eco',
        category: 'PACKAGING',
        title: 'Aptar Eco',
        desc: 'Diseño y desarrollo sustentable.'
    },
    {
        src: 'assets/img/0112.png',
        alt: 'Campaña Vial',
        category: 'PUBLICIDAD',
        title: 'Campaña Vial',
        desc: 'Creatividad y vía pública.'
    },
    {
        src: 'assets/img/0115.png',
        alt: 'Gestión Calidad',
        category: 'BRANDING',
        title: 'Gestión Calidad',
        desc: 'Imagen corporativa y flota.'
    },
    {
        src: 'assets/img/0124.png',
        alt: 'Manual de Marca',
        category: 'BRANDING',
        title: 'Manual de Marca',
        desc: 'Identidad corporativa y aplicaciones.'
    },
    {
        src: 'assets/img/0137.png',
        alt: 'UV-TEX',
        category: 'PACKAGING',
        title: 'UV-TEX',
        desc: 'Línea de envases y etiquetas.'
    },
    {
        src: 'assets/img/0155.png',
        alt: 'Diseño Editorial',
        category: 'EDITORIAL',
        title: 'Diseño Editorial',
        desc: 'Publicaciones y material impreso.'
    }
];

// Cuántas fotos mostrar por lote
const FOTOS_POR_LOTE = 13;
let fotosVisibles = 13;

// =============================================
// RENDERIZADO DE LA GALERÍA (FORMATO TARJETA)
// =============================================
function renderGaleria() {
    const grid = document.getElementById('galeria-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const limite = Math.min(fotosVisibles, galleryImages.length);
    for (let i = 0; i < limite; i++) {
        const data = galleryImages[i];
        const item = document.createElement('div');
        item.className = 'grid-item gallery-card';
        if (i === 0) item.classList.add('first-item');
        item.setAttribute('data-index', i);
        item.onclick = () => abrirLightbox(i);

        item.innerHTML = `
            <div class="card-img-wrap">
                <img src="${data.src}" alt="${data.alt}" loading="lazy">
            </div>
            <div class="card-info">
                <h3 class="card-title">${data.title || data.alt}</h3>
                <p class="card-desc">${data.desc || ''}</p>
            </div>
        `;

        grid.appendChild(item);
    }

    if (fotosVisibles < galleryImages.length) {
        const verMas = document.createElement('div');
        verMas.className = 'grid-item gallery-card ver-mas-btn';
        verMas.id = 'ver-mas-btn';
        verMas.onclick = mostrarMasFotos;
        verMas.innerHTML = `
            <div class="ver-mas-content">
                <span>VER MÁS</span>
                <span><i class="fa-solid fa-chevron-right"></i></span>
            </div>
        `;
        grid.appendChild(verMas);
    }
}

// Abrir el Lightbox directamente al hacer clic en VER MÁS
function mostrarMasFotos() {
    abrirLightbox(13);
}

// =============================================
// LIGHTBOX — Array global unificado y soporte táctil
// =============================================
let lightboxIndex = 0;

function abrirLightbox(index) {
    lightboxIndex = index;
    actualizarLightbox();
    const modal = document.getElementById('lightbox');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function actualizarLightbox() {
    const img = document.getElementById('lightbox-img');
    if (img && galleryImages[lightboxIndex]) {
        img.src = galleryImages[lightboxIndex].src;
        img.alt = galleryImages[lightboxIndex].alt;
    }
}

function navigateLightbox(direccion) {
    lightboxIndex += direccion;
    if (lightboxIndex < 0) lightboxIndex = galleryImages.length - 1;
    if (lightboxIndex >= galleryImages.length) lightboxIndex = 0;
    actualizarLightbox();
}

function closeLightbox() {
    const modal = document.getElementById('lightbox');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

// Cerrar al hacer clic en el fondo del lightbox
const lightboxEl = document.getElementById('lightbox');
if (lightboxEl) {
    lightboxEl.addEventListener('click', function (e) {
        if (e.target === this) closeLightbox();
    });

    // Soporte táctil (Swipe) en celulares para cambiar de foto
    let touchStartX = 0;
    let touchEndX = 0;

    lightboxEl.addEventListener('touchstart', function (e) {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    lightboxEl.addEventListener('touchend', function (e) {
        touchEndX = e.changedTouches[0].screenX;
        const diffX = touchStartX - touchEndX;
        if (Math.abs(diffX) > 45) {
            if (diffX > 0) {
                navigateLightbox(1);
            } else {
                navigateLightbox(-1);
            }
        }
    }, { passive: true });
}

// Navegación con teclado para Lightbox
document.addEventListener('keydown', function (e) {
    const lightboxModal = document.getElementById('lightbox');

    if (e.key === 'Escape') {
        if (lightboxModal && lightboxModal.classList.contains('active')) closeLightbox();
    }

    if (lightboxModal && lightboxModal.classList.contains('active')) {
        if (e.key === 'ArrowRight') navigateLightbox(1);
        if (e.key === 'ArrowLeft') navigateLightbox(-1);
    }
});

// =============================================
// SCROLL SPY — Resalta la sección activa en el menú
// =============================================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');
const headerEl = document.getElementById('header');

function updateActiveNav() {
    const scrollPos = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const headerHeight = headerEl ? headerEl.offsetHeight : 90;
    let current = '';

    sections.forEach(section => {
        const top = section.offsetTop - headerHeight - 40;
        const height = section.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
            current = section.getAttribute('id');
        }
    });

    // Si estamos en el fondo de la página, activa Contacto
    if ((window.innerHeight + scrollPos) >= document.documentElement.scrollHeight - 60) {
        current = 'contacto';
    }

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNav, { passive: true });
window.addEventListener('resize', updateActiveNav, { passive: true });

// =============================================
// ENVÍO DE FORMULARIO CON FORMSUBMIT AJAX + HONEYPOT
// =============================================
const contactForm = document.getElementById('contacto-form');
if (contactForm) {
    contactForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        const submitBtn = document.getElementById('contacto-submit-btn');
        const originalBtnHTML = submitBtn ? submitBtn.innerHTML : '';

        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>ENVIANDO...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        }

        const formData = new FormData(contactForm);

        try {
            const response = await fetch('https://formsubmit.co/ajax/pgonzalez@agenciarena.cl', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: formData
            });

            if (response.ok) {
                if (submitBtn) {
                    submitBtn.style.backgroundColor = 'var(--color-yellow)';
                    submitBtn.style.color = '#000000';
                    submitBtn.innerHTML = `<i class="fa-solid fa-check" style="margin-right: 8px;"></i> <span class="submit-btn-bold">MENSAJE</span> <span class="submit-btn-regular">ENVIADO</span>`;
                }
                contactForm.reset();
                setTimeout(() => {
                    if (submitBtn) {
                        submitBtn.disabled = false;
                        submitBtn.style.backgroundColor = '';
                        submitBtn.style.color = '';
                        submitBtn.innerHTML = originalBtnHTML;
                    }
                }, 4000);
            } else {
                throw new Error('Error al enviar el formulario');
            }
        } catch (error) {
            console.error('Error:', error);
            if (submitBtn) {
                submitBtn.style.backgroundColor = '#e74c3c';
                submitBtn.style.color = '#ffffff';
                submitBtn.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> <span>ERROR AL ENVIAR</span>`;
                setTimeout(() => {
                    submitBtn.disabled = false;
                    submitBtn.style.backgroundColor = '';
                    submitBtn.style.color = '';
                    submitBtn.innerHTML = originalBtnHTML;
                }, 4000);
            }
        }
    });
}

// =============================================
// MENÚ MÓVIL HAMBURGUESA (DRAWER LATERAL)
// =============================================
function initMobileNav() {
    const navToggle = document.getElementById('nav-toggle');
    const navContainer = document.querySelector('.nav-container');
    const navBackdrop = document.getElementById('nav-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!navToggle || !navContainer) return;

    function toggleMenu(forceOpen) {
        const isOpen = typeof forceOpen === 'boolean' ? forceOpen : !navContainer.classList.contains('is-open');
        navToggle.classList.toggle('is-active', isOpen);
        navContainer.classList.toggle('is-open', isOpen);
        if (navBackdrop) navBackdrop.classList.toggle('is-open', isOpen);
        document.body.classList.toggle('nav-open', isOpen);
        navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    navToggle.addEventListener('click', function (e) {
        e.stopPropagation();
        toggleMenu();
    });

    if (navBackdrop) {
        navBackdrop.addEventListener('click', function () {
            toggleMenu(false);
        });
    }

    // Cerrar al hacer clic en un enlace del menú
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (window.innerWidth <= 768) {
                toggleMenu(false);
            }
        });
    });

    // Cerrar al presionar la tecla Escape
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && navContainer.classList.contains('is-open')) {
            toggleMenu(false);
        }
    });

    // Cerrar si la pantalla se redimensiona a escritorio
    window.addEventListener('resize', function () {
        if (window.innerWidth > 768 && navContainer.classList.contains('is-open')) {
            toggleMenu(false);
        }
    }, { passive: true });
}

// =============================================
// INICIALIZACIÓN
// =============================================
renderGaleria();
updateActiveNav();
initMobileNav();
