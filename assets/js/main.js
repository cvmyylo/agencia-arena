// =============================================
// CONFIGURACIÓN DE GALERÍA
// Imágenes válidas de la carpeta IMG
// (excluye: logo.png, background-dots.png, ARENA-#ffdd00-AGENCIARENA.png)
// =============================================
const galleryImages = [
    { src: 'assets/img/project3.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/015.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/017.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/019.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0110.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0112.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0113.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0115.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0117.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0124.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0132.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0137.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0139.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0140.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0141.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0144.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0145.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0150.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0151.png', alt: 'Proyecto Agencia Arena' },
    { src: 'assets/img/0155.png', alt: 'Proyecto Agencia Arena' },
];

// Cuántas fotos mostrar por lote
const FOTOS_POR_LOTE = 13;
let fotosVisibles = 13;

// =============================================
// RENDERIZADO DE LA GALERÍA
// =============================================
function renderGaleria() {
    const grid = document.getElementById('galeria-grid');
    if (!grid) return;
    grid.innerHTML = '';

    const limite = Math.min(fotosVisibles, galleryImages.length);
    for (let i = 0; i < limite; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';

        // Primer elemento desplazado en pantallas grandes
        if (i === 0) item.classList.add('first-item');

        item.setAttribute('data-index', i);
        item.onclick = () => abrirLightbox(i);

        const img = document.createElement('img');
        img.src = galleryImages[i].src;
        img.alt = galleryImages[i].alt;
        img.loading = 'lazy';

        item.appendChild(img);
        grid.appendChild(item);
    }

    if (fotosVisibles < galleryImages.length) {
        const verMas = document.createElement('div');
        verMas.className = 'grid-item ver-mas-btn';
        verMas.id = 'ver-mas-btn';
        verMas.onclick = mostrarMasFotos;
        verMas.innerHTML = `
            <span>VER MÁS</span>
            <span><i class="fa-solid fa-chevron-right"></i></span>
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
    document.body.style.overflow = 'hidden'; // Evita scroll de fondo cuando el modal está abierto
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

// Cerrar al hacer clic en el fondo del modal
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
                navigateLightbox(1); // Deslizar izquierda -> siguiente
            } else {
                navigateLightbox(-1); // Deslizar derecha -> anterior
            }
        }
    }, { passive: true });
}

// Navegación con teclado
document.addEventListener('keydown', function (e) {
    const modal = document.getElementById('lightbox');
    if (!modal || !modal.classList.contains('active')) return;
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'Escape') closeLightbox();
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
// INICIALIZACIÓN
// =============================================
renderGaleria();
updateActiveNav();
