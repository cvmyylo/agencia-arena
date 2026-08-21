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
        desc: 'Diseño de identidad corporativa.'
    },
    {
        src: 'assets/img/0150.png',
        alt: 'Nissan',
        category: 'TRADE MARKETING',
        title: 'Nissan',
        desc: 'Activación Stand y POP.'
    },
    {
        src: 'assets/img/015.png',
        alt: 'European Windows',
        category: 'TRADE MARKETING',
        title: 'European Windows',
        desc: 'Diseño y desarrollo de stand para feria.'
    },
    {
        src: 'assets/img/0117.png',
        alt: 'BCI',
        category: 'RRSS',
        title: 'BCI',
        desc: 'Diseño de campañas para redes sociales.'
    },
    {
        src: 'assets/img/0113.png',
        alt: 'Jerry IP',
        category: 'BRANDING',
        title: 'Jerry IP',
        desc: 'Desarrollo de identidad visual y naming.'
    },
    {
        src: 'assets/img/017.png',
        alt: 'KGIUN+',
        category: 'BRANDING',
        title: 'KGIUN+',
        desc: 'Rediseño de identidad visual y aplicaciones corporativas.'
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
        desc: 'Diseño publicitario impreso.'
    },
    {
        src: 'assets/img/0132.png',
        alt: 'AGRALIA',
        category: 'PUBLICIDAD',
        title: 'AGRALIA',
        desc: 'Creatividad y vía pública.'
    },
    {
        src: 'assets/img/0144.png',
        alt: 'PACX',
        category: 'BRANDING',
        title: 'PACX',
        desc: 'Imagen corporativa y flota.'
    },
    {
        src: 'assets/img/0151.png',
        alt: 'INNOVACOLLEGE',
        category: 'EDITORIAL',
        title: 'INNOVACOLLEGE',
        desc: 'Diseño editorial corporativo.'
    },
    {
        src: 'assets/img/0141.png',
        alt: 'Clínica IRAM',
        category: 'PACKAGING',
        title: 'Clínica IRAM',
        desc: 'Diseño y desarrollo sustentable.'
    },
    {
        src: 'assets/img/0139.png',
        alt: 'VAI TEA',
        category: 'PACKAGING',
        title: 'VAI TEA',
        desc: 'Línea de envases y etiquetas.'
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
                <span class="card-category">${data.category || 'PROYECTO'}</span>
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
// CAPTCHA MATEMÁTICO ANTI-SPAM (FORMULARIO CONTACTO)
// =============================================
let captchaAnswerCorrect = 0;

function generarCaptchaMatematico() {
    const questionEl = document.getElementById('captcha-question');
    const answerInput = document.getElementById('captcha-answer');
    const errorEl = document.getElementById('captcha-error');

    if (!questionEl || !answerInput) return;

    const num1 = Math.floor(Math.random() * 8) + 2;
    const num2 = Math.floor(Math.random() * 7) + 1;
    captchaAnswerCorrect = num1 + num2;

    questionEl.textContent = `¿Cuánto es ${num1} + ${num2}?`;
    answerInput.value = '';
    if (errorEl) errorEl.style.display = 'none';
}

const contactForm = document.getElementById('contacto-form');
if (contactForm) {
    generarCaptchaMatematico();

    contactForm.addEventListener('submit', function (e) {
        const answerInput = document.getElementById('captcha-answer');
        const errorEl = document.getElementById('captcha-error');
        const submitBtn = document.getElementById('contacto-submit-btn');

        if (!answerInput) return;

        const userVal = parseInt(answerInput.value.trim(), 10);
        if (userVal !== captchaAnswerCorrect) {
            e.preventDefault();
            if (errorEl) {
                errorEl.style.display = 'block';
                errorEl.textContent = 'Respuesta de seguridad incorrecta. Inténtalo de nuevo.';
            }
            answerInput.focus();
            generarCaptchaMatematico();
            return false;
        }

        // Si es correcto, permitimos que FormSubmit procese el envío
        if (submitBtn) {
            submitBtn.disabled = true;
            submitBtn.innerHTML = `<span>Enviando consulta...</span> <i class="fa-solid fa-spinner fa-spin"></i>`;
        }
    });
}


// =============================================
// INICIALIZACIÓN
// =============================================
renderGaleria();
updateActiveNav();
