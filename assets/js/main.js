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
    
    // Si el modal legal no está abierto, restauramos el scroll
    const legalModal = document.getElementById('legal-modal');
    if (!legalModal || !legalModal.classList.contains('active')) {
        document.body.style.overflow = '';
    }
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

// =============================================
// MODAL LEGAL (POLÍTICAS Y TÉRMINOS - CHILE)
// =============================================
const legalContent = {
    privacidad: {
        title: "Política de Privacidad",
        body: `
            <p>En <strong>Agencia Arena</strong>, la privacidad y protección de los datos de nuestros usuarios y clientes es fundamental. La presente Política de Privacidad describe el tratamiento de datos personales conforme a la <strong>Ley N° 19.628 sobre Protección de la Vida Privada</strong> de la República de Chile y sus actualizaciones normativas.</p>

            <h3>1. Información recopilada</h3>
            <p>Este sitio web tiene un carácter informativo y de presentación de portafolio. No recopilamos datos personales de forma automatizada salvo aquellos que usted nos proporciona voluntariamente al contactarnos mediante correo electrónico (<code>mailto:</code>), llamadas telefónicas o WhatsApp.</p>

            <h3>2. Finalidad del tratamiento</h3>
            <p>Los datos de contacto que usted nos remite son utilizados exclusivamente para:</p>
            <ul>
                <li>Atender cotizaciones, solicitudes de propuesta y consultas comerciales.</li>
                <li>Coordinar proyectos y servicios de publicidad, branding, diseño y marketing digital.</li>
            </ul>

            <h3>3. Confidencialidad y no cesión a terceros</h3>
            <p>Agencia Arena no comercializa, transfiere ni cede datos personales a terceras partes bajo ninguna circunstancia, salvo requerimiento legal de tribunales o autoridades competentes.</p>

            <h3>4. Derechos del titular</h3>
            <p>Conforme a la legislación chilena, usted tiene derecho al acceso, rectificación, cancelación u oposición respecto a sus datos personales. Para ejercer estos derechos, puede escribir a <a href="mailto:pgonzalez@agenciarena.cl">pgonzalez@agenciarena.cl</a> o <a href="mailto:agana@agenciarena.cl">agana@agenciarena.cl</a>.</p>

            <h3>5. Actualizaciones</h3>
            <p>Esta política podrá actualizarse periódicamente para reflejar mejoras operativas o adecuaciones normativas. Última actualización: 2026.</p>
        `
    },
    terminos: {
        title: "Términos y Condiciones de Uso",
        body: `
            <p>Bienvenido al sitio web de <strong>Agencia Arena</strong>. Al navegar en este sitio, usted acepta los siguientes Términos y Condiciones de Uso.</p>

            <h3>1. Propiedad Intelectual</h3>
            <p>Todos los contenidos, piezas gráficas, marcas, logotipos, campañas y proyectos presentados en este portafolio son propiedad intelectual exclusiva de Agencia Arena o de sus respectivos clientes titulares. Queda prohibida su reproducción o uso comercial no autorizado.</p>

            <h3>2. Uso del sitio web</h3>
            <p>El usuario se compromete a hacer un uso legítimo y adecuado de los contenidos disponibles, respetando los derechos de autor y las normas de convivencia digital.</p>

            <h3>3. Enlaces externos</h3>
            <p>Este sitio puede incluir enlaces a plataformas externas (como Instagram o WhatsApp). Agencia Arena no se responsabiliza por las políticas o contenidos de dichas aplicaciones de terceros.</p>

            <h3>4. Legislación y jurisdicción</h3>
            <p>Los presentes términos se rigen por las leyes de la <strong>República de Chile</strong>. Cualquier controversia será sometida a la jurisdicción de los Tribunales Ordinarios de Justicia de Chile.</p>
        `
    }
};

function openLegalModal(type) {
    const modal = document.getElementById('legal-modal');
    const title = document.getElementById('legal-modal-title');
    const body = document.getElementById('legal-modal-body');

    if (!modal || !title || !body) return;

    const data = legalContent[type] || legalContent.privacidad;
    title.textContent = data.title;
    body.innerHTML = data.body;

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
}

function closeLegalModal() {
    const modal = document.getElementById('legal-modal');
    if (modal) {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }
    
    // Si el lightbox no está abierto, restauramos el scroll
    const lightbox = document.getElementById('lightbox');
    if (!lightbox || !lightbox.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

// Cerrar modal legal al hacer clic en el backdrop
const legalModalEl = document.getElementById('legal-modal');
if (legalModalEl) {
    legalModalEl.addEventListener('click', function (e) {
        if (e.target === this) closeLegalModal();
    });
}

// Navegación con teclado común para ambos modales
document.addEventListener('keydown', function (e) {
    const lightboxModal = document.getElementById('lightbox');
    const legalModal = document.getElementById('legal-modal');

    if (e.key === 'Escape') {
        if (legalModal && legalModal.classList.contains('active')) closeLegalModal();
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
// INICIALIZACIÓN
// =============================================
renderGaleria();
updateActiveNav();
