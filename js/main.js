// =========================================
// AVENTRA - Main Script
// Dipakai oleh index.html dan semua halaman di folder packages/
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
    if (!details) return;
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
        if (!mobileMenu) return;
        mobileMenu.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuIcon.className = 'fa-solid fa-bars text-xl';
    }

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', function () {
            const isOpen = mobileMenu.classList.toggle('open');
            menuBtn.setAttribute('aria-expanded', isOpen);
            menuIcon.className = isOpen ? 'fa-solid fa-xmark text-xl' : 'fa-solid fa-bars text-xl';
        });
        document.querySelectorAll('.mobile-link').forEach(function (link) {
            link.addEventListener('click', closeMenu);
        });
    }

    // ---------- Tandai menu aktif saat scroll (hanya di halaman utama) ----------
    const sections = document.querySelectorAll('[data-nav-section]');
    if (sections.length && 'IntersectionObserver' in window) {
        const navLinks = document.querySelectorAll('.nav-link, .mobile-link');
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
    }

    // ---------- Lightbox galeri (hanya jika ada) ----------
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');

    function closeLightbox() {
        if (!lightbox) return;
        lightbox.classList.add('hidden');
        lightbox.classList.remove('flex');
        lightboxImg.removeAttribute('src');
    }

    if (lightbox && lightboxImg) {
        document.querySelectorAll('.gallery-item').forEach(function (item) {
            item.addEventListener('click', function () {
                const img = item.querySelector('img');
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
                lightbox.classList.remove('hidden');
                lightbox.classList.add('flex');
            });
        });
        lightbox.addEventListener('click', function (e) {
            if (e.target !== lightboxImg) closeLightbox();
        });
    }

    // ---------- Itinerary: buka/tutup per hari ----------
    document.querySelectorAll('.day-toggle').forEach(function (btn) {
        btn.addEventListener('click', function () {
            const day = btn.closest('.day-card');
            const isOpen = day.classList.toggle('open');
            btn.setAttribute('aria-expanded', isOpen);
        });
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            closeLightbox();
            closeMenu();
        }
    });
});

// =========================================
// Pelacakan klik WhatsApp untuk Google Ads
// -----------------------------------------
// Isi WA_CONVERSION_LABEL dengan label konversi dari Google Ads
// (Tujuan > Konversi > buat konversi "Klik WhatsApp" > lihat bagian
//  "send_to": 'AW-17994951214/XXXXXXXXXXX' — salin bagian setelah garis miring).
// Selama masih kosong, klik tetap tercatat sebagai event "whatsapp_click"
// tetapi BELUM dihitung sebagai konversi di Google Ads.
// =========================================
const WA_CONVERSION_LABEL = '';

document.addEventListener('click', function (e) {
    const link = e.target.closest('a[href*="wa.me/"]');
    if (!link || typeof gtag !== 'function') return;

    const where = link.dataset.waSource || document.title;
    gtag('event', 'whatsapp_click', { link_url: link.href, page_title: where });

    if (WA_CONVERSION_LABEL) {
        gtag('event', 'conversion', {
            send_to: 'AW-17994951214/' + WA_CONVERSION_LABEL
        });
    }
});
