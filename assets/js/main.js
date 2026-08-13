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
let fotosVisibles = 13; // 4 arriba, 5 al medio, 4 abajo (+ el botón = 5)


// =============================================
// RENDERIZADO DE LA GALERÍA
// =============================================
function renderGaleria() {
    const grid = document.getElementById('galeria-grid');
    grid.innerHTML = '';

    const limite = Math.min(fotosVisibles, galleryImages.length);
    for (let i = 0; i < limite; i++) {
        const item = document.createElement('div');
        item.className = 'grid-item';

        // 🟢 LA MAGIA: Le da una clase a la foto 1 para que salte un espacio
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
    abrirLightbox(13); // Comienza en la foto oculta n° 14
}



// =============================================
// LIGHTBOX — Array global unificado
// Toda la galería es un único conjunto continuo.
// Las flechas recorren TODAS las fotos sin bucles por grupos.
// =============================================
let lightboxIndex = 0;

function abrirLightbox(index) {
    lightboxIndex = index;
    actualizarLightbox();
    document.getElementById('lightbox').classList.add('active');
}

function actualizarLightbox() {
    document.getElementById('lightbox-img').src = galleryImages[lightboxIndex].src;
    document.getElementById('lightbox-img').alt = galleryImages[lightboxIndex].alt;
}

function navigateLightbox(direccion) {
    lightboxIndex += direccion;
    // Navegación circular continua entre TODAS las fotos
    if (lightboxIndex < 0) lightboxIndex = galleryImages.length - 1;
    if (lightboxIndex >= galleryImages.length) lightboxIndex = 0;
    actualizarLightbox();
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Cerrar al hacer clic en el fondo del modal
document.getElementById('lightbox').addEventListener('click', function (e) {
    if (e.target === this) closeLightbox();
});

// Navegación con teclado
document.addEventListener('keydown', function (e) {
    if (!document.getElementById('lightbox').classList.contains('active')) return;
    if (e.key === 'ArrowRight') navigateLightbox(1);
    if (e.key === 'ArrowLeft') navigateLightbox(-1);
    if (e.key === 'Escape') closeLightbox();
});

// =============================================
// SCROLL SPY — Resalta la sección activa en el menú
// =============================================
const sections = document.querySelectorAll('.section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        if (pageYOffset >= (section.offsetTop - 120)) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// =============================================
// INICIALIZACIÓN
// =============================================
renderGaleria();
