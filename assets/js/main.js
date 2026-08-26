// =============================================
// CONFIGURACIÓN DE GALERÍA — MARCAS Y MINI LOOPS
// 13 Marcas ordenadas de 1 a 13 con sus carpetas
// =============================================
const galleryBrands = [
    {
        id: 'nicolaides',
        title: 'Nicolaides',
        desc: 'Creación de logo, página web, packaging y branding.',
        category: 'BRANDING',
        images: [
            'assets/img/1_Nicolaides/019.png',
            'assets/img/1_Nicolaides/0110.png',
            'assets/img/1_Nicolaides/0111.png',
            'assets/img/1_Nicolaides/0112.png'
        ]
    },
    {
        id: 'nissan',
        title: 'Nissan',
        desc: 'Revista interna.',
        category: 'TRADE MARKETING',
        images: [
            'assets/img/2_Nissan/0150.png',
            'assets/img/2_Nissan/0149.png'
        ]
    },
    {
        id: 'european-windows',
        title: 'European Windows',
        desc: 'Creación de página web y Stand.',
        category: 'TRADE MARKETING',
        images: [
            'assets/img/3_European Windows/015.png',
            'assets/img/3_European Windows/013.png',
            'assets/img/3_European Windows/014.png',
            'assets/img/3_European Windows/016.png'
        ]
    },
    {
        id: 'bci',
        title: 'BCI',
        desc: 'Campaña de tránsito.',
        category: 'RRSS',
        images: [
            'assets/img/4_BCI/0117.png',
            'assets/img/4_BCI/0116.png'
        ]
    },
    {
        id: 'jarry-ip',
        title: 'Jarry IP',
        desc: 'Creación de página web y branding.',
        category: 'BRANDING',
        images: [
            'assets/img/5_Jarry IP/0113.png',
            'assets/img/5_Jarry IP/0114.png'
        ]
    },
    {
        id: 'kgiun',
        title: 'KGIUN+',
        desc: 'Creación de logo, packaging, branding y página web.',
        category: 'BRANDING',
        images: [
            'assets/img/6_Kgiun/017.png',
            'assets/img/6_Kgiun/018.png'
        ]
    },
    {
        id: 'hotel-haka-piri-mana',
        title: 'Hotel Haka Piri Mana',
        desc: 'Creación de logo, branding.',
        category: 'BRANDING',
        images: [
            'assets/img/7_Hotel Haka Piri Mana/0124.png',
            'assets/img/7_Hotel Haka Piri Mana/0125.png'
        ]
    },
    {
        id: 'shara',
        title: 'Shara',
        desc: 'Creación de logo y Packaging.',
        category: 'BRANDING',
        images: [
            'assets/img/8_Shara/0140.png'
        ]
    },
    {
        id: 'agralia',
        title: 'AGRALIA',
        desc: 'Avisos de prensa y folletería.',
        category: 'PUBLICIDAD',
        images: [
            'assets/img/9_Agralia/0132.png',
            'assets/img/9_Agralia/0133.png',
            'assets/img/9_Agralia/0134.png'
        ]
    },
    {
        id: 'pacx',
        title: 'PACX',
        desc: 'Creación de logo, papelería, folletería y branding.',
        category: 'BRANDING',
        images: [
            'assets/img/10_PACX/0144.png',
            'assets/img/10_PACX/0143.png'
        ]
    },
    {
        id: 'innova-college',
        title: 'INNOVACOLLEGE',
        desc: 'Mails y folletería.',
        category: 'EDITORIAL',
        images: [
            'assets/img/11_Innova College/0151.png',
            'assets/img/11_Innova College/0152.png'
        ]
    },
    {
        id: 'clinica-iram',
        title: 'Clínica IRAM',
        desc: 'Branding.',
        category: 'PACKAGING',
        images: [
            'assets/img/12_Clínica Iram/0141.png',
            'assets/img/12_Clínica Iram/0142.png'
        ]
    },
    {
        id: 'vai-tea',
        title: 'VAI TEA',
        desc: 'Creación de logo y merchandising.',
        category: 'PACKAGING',
        images: [
            'assets/img/13_Vai Tea/0139.png'
        ]
    },
    {
        id: 'ver-mas',
        title: 'VER MÁS',
        desc: 'Explorar más aplicaciones y proyectos.',
        category: 'EXPERIENCIA',
        isVerMas: true,
        images: [
            'assets/img/14_Ver mas/01.png',
            'assets/img/14_Ver mas/0115.png',
            'assets/img/14_Ver mas/0118.png',
            'assets/img/14_Ver mas/0119.png',
            'assets/img/14_Ver mas/012.png',
            'assets/img/14_Ver mas/0120.png',
            'assets/img/14_Ver mas/0121.png',
            'assets/img/14_Ver mas/0122.png',
            'assets/img/14_Ver mas/0123.png',
            'assets/img/14_Ver mas/0126.png',
            'assets/img/14_Ver mas/0127.png',
            'assets/img/14_Ver mas/0129.png',
            'assets/img/14_Ver mas/0130.png',
            'assets/img/14_Ver mas/0131.png',
            'assets/img/14_Ver mas/0135.png',
            'assets/img/14_Ver mas/0136.png',
            'assets/img/14_Ver mas/0137.png',
            'assets/img/14_Ver mas/0138.png',
            'assets/img/14_Ver mas/0153.png',
            'assets/img/14_Ver mas/0154.png',
            'assets/img/14_Ver mas/0155.png'
        ]
    }
];

// Pre-cargar imágenes para transiciones instantáneas sin parpadeo
function preloadAllBrandImages() {
    galleryBrands.forEach(brand => {
        brand.images.forEach(src => {
            const img = new Image();
            img.src = src;
        });
    });
}

// =============================================
// RENDERIZADO DE LA GALERÍA (MINI LOOPS EN HOVER)
// =============================================
function renderGaleria() {
    const grid = document.getElementById('galeria-grid');
    if (!grid) return;
    grid.innerHTML = '';

    galleryBrands.forEach((brand, brandIndex) => {
        const item = document.createElement('div');
        item.className = 'grid-item gallery-card';
        if (brandIndex === 0) item.classList.add('first-item');
        item.setAttribute('data-brand-index', brandIndex);

        if (brand.isVerMas) {
            item.classList.add('ver-mas-btn');
            item.id = 'ver-mas-btn';
            item.innerHTML = `
                <div class="ver-mas-content">
                    <span>VER MÁS</span>
                    <span><i class="fa-solid fa-chevron-right"></i></span>
                </div>
            `;
            item.onclick = () => abrirLightbox(brandIndex, 0);
        } else {
            const hasMultiple = brand.images.length > 1;
            item.innerHTML = `
                <div class="card-img-wrap">
                    <img src="${brand.images[0]}" alt="${brand.title}" loading="lazy" class="card-thumb-img">
                    ${hasMultiple ? `<span class="card-multi-badge" title="${brand.images.length} imágenes"><i class="fa-regular fa-images"></i> ${brand.images.length}</span>` : ''}
                </div>
                <div class="card-info">
                    <h3 class="card-title">${brand.title}</h3>
                    <p class="card-desc">${brand.desc || ''}</p>
                </div>
            `;
            item.onclick = () => abrirLightbox(brandIndex, 0);

            // Mini Loop automático al dejar el mouse apoyado sobre la tarjeta
            if (hasMultiple) {
                let hoverInterval = null;
                let currentHoverIdx = 0;
                const thumbImg = item.querySelector('.card-thumb-img');

                item.addEventListener('mouseenter', () => {
                    clearInterval(hoverInterval);
                    hoverInterval = setInterval(() => {
                        currentHoverIdx = (currentHoverIdx + 1) % brand.images.length;
                        if (thumbImg) {
                            thumbImg.style.opacity = '0.35';
                            setTimeout(() => {
                                thumbImg.src = brand.images[currentHoverIdx];
                                thumbImg.style.opacity = '1';
                            }, 100);
                        }
                    }, 1100);
                });

                item.addEventListener('mouseleave', () => {
                    clearInterval(hoverInterval);
                    currentHoverIdx = 0;
                    if (thumbImg) {
                        thumbImg.src = brand.images[0];
                        thumbImg.style.opacity = '1';
                    }
                });
            }
        }

        grid.appendChild(item);
    });
}

// =============================================
// LIGHTBOX — MINI LOOPS POR MARCA SELECCIONADA
// =============================================
let activeBrandIndex = 0;
let activeBrandImgIndex = 0;

function abrirLightbox(brandIndex, imgIndex = 0) {
    if (!galleryBrands[brandIndex]) return;
    activeBrandIndex = brandIndex;
    activeBrandImgIndex = imgIndex;
    actualizarLightbox();

    const modal = document.getElementById('lightbox');
    if (modal) modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function actualizarLightbox() {
    const brand = galleryBrands[activeBrandIndex];
    if (!brand) return;

    const img = document.getElementById('lightbox-img');
    const titleEl = document.getElementById('lightbox-title');
    const counterEl = document.getElementById('lightbox-counter');
    const prevBtn = document.getElementById('lightbox-prev');
    const nextBtn = document.getElementById('lightbox-next');

    if (img) {
        img.style.opacity = '0.25';
        img.src = brand.images[activeBrandImgIndex];
        img.alt = `${brand.title} - ${activeBrandImgIndex + 1}`;
        setTimeout(() => {
            img.style.opacity = '1';
        }, 100);
    }

    if (titleEl) {
        titleEl.textContent = brand.title;
    }

    if (counterEl) {
        if (brand.images.length > 1) {
            counterEl.textContent = `${activeBrandImgIndex + 1} / ${brand.images.length}`;
            counterEl.style.display = 'inline-block';
        } else {
            counterEl.style.display = 'none';
        }
    }

    if (prevBtn && nextBtn) {
        if (brand.images.length > 1) {
            prevBtn.style.display = 'flex';
            nextBtn.style.display = 'flex';
        } else {
            prevBtn.style.display = 'none';
            nextBtn.style.display = 'none';
        }
    }
}

function navigateLightbox(direccion) {
    const brand = galleryBrands[activeBrandIndex];
    if (!brand || brand.images.length <= 1) return;

    // Loop estricto dentro de la marca activa
    activeBrandImgIndex = (activeBrandImgIndex + direccion + brand.images.length) % brand.images.length;
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

    // Soporte táctil (Swipe) en celulares para cambiar de foto dentro del mini loop
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

// Navegación con teclado para Lightbox (Loop y Escape para cerrar)
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
preloadAllBrandImages();
updateActiveNav();
initMobileNav();
