// =========================================
// AVENTRA - Main Script
// =========================================

// ---------- FAQ Toggle ----------
function toggleFaq(element) {
    element.classList.toggle('active');
}

// ---------- Transport Read More ----------
function toggleTransportDetails() {
    const details = document.getElementById('transportDetails');
    const btnSpan = document.querySelector('#transportToggleBtn span');
    const icon = document.getElementById('transportToggleIcon');
    const isOpen = details.classList.toggle('open');

    btnSpan.textContent = isOpen ? 'Read Less' : 'Read More';
    icon.style.transform = isOpen ? 'rotate(180deg)' : 'rotate(0deg)';
}

document.addEventListener('DOMContentLoaded', function () {

    // ---------- Menu mobile (hamburger) ----------
    const menuBtn = document.getElementById('menuToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    const menuIcon = document.getElementById('menuIcon');

    function closeMenu() {
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuIcon.className = 'fa-solid fa-bars text-xl';
    }

    menuBtn.addEventListener('click', function () {
        const isOpen = mobileMenu.classList.toggle('open');
        menuBtn.setAttribute('aria-expanded', isOpen);
        menuIcon.className = isOpen ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
    });

    // Tutup menu setelah link diklik
    document.querySelectorAll('.mobile-link').forEach(function (link) {
        link.addEventListener('click', closeMenu);
    });

    // ---------- Tandai menu aktif saat scroll ----------
    const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
    const sections = document.querySelectorAll('[data-nav-section]');

    const observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(function (link) {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }, { rootMargin: '-45% 0px -50% 0px' });

    sections.forEach(function (section) { observer.observe(section); });

    // ---------- Lightbox galeri ----------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    document.querySelectorAll('.gallery-item').forEach(function (item) {
        item.addEventListener('click', function () {
            const img = item.querySelector('img');
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightbox.classList.add('open');
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
        lightboxImg.src = '';
    }

    lightbox.addEventListener('click', function (e) {
        if (e.target !== lightboxImg) closeLightbox();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
            closeMenu();
        }
    });
});
