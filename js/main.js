// Toggle Menu Mobile
document.getElementById('menu-btn')?.addEventListener('click', () => {
    document.getElementById('mobile-menu').classList.toggle('hidden');
});

const originalText = {};

document.addEventListener("DOMContentLoaded", () => {
    // Kumpulkan teks asli (Bahasa Indonesia)
    document.querySelectorAll('[data-id]').forEach(el => {
        const id = el.getAttribute('data-id');
        originalText[id] = el.innerHTML;
    });

    // Cek bahasa yang tersimpan di localStorage
    const savedLang = localStorage.getItem('transportkita_lang') || 'id';
    switchLanguage(savedLang, false);
});

// Fungsi Switcher Bahasa
function switchLanguage(lang, savePreference = true) {
    if (savePreference) {
        localStorage.setItem('transportkita_lang', lang);
    }

    document.querySelectorAll('[data-id]').forEach(el => {
        const id = el.getAttribute('data-id');
        if (lang === 'en') {
            const enText = el.getAttribute('data-en');
            if (enText) el.innerHTML = enText;
        } else {
            if (originalText[id]) el.innerHTML = originalText[id];
        }
    });

    updateButtonStyles(lang);
}

function updateButtonStyles(lang) {
    const activeClasses = ["bg-brand-blue", "text-white"];
    const inactiveClasses = ["text-slate-600"];

    const idBtn = document.getElementById('lang-id-btn');
    const enBtn = document.getElementById('lang-en-btn');
    const idBtnMob = document.getElementById('lang-id-btn-mob');
    const enBtnMob = document.getElementById('lang-en-btn-mob');

    if (lang === 'en') {
        if(enBtn) { enBtn.classList.add(...activeClasses); enBtn.classList.remove(...inactiveClasses); }
        if(idBtn) { idBtn.classList.remove(...activeClasses); idBtn.classList.add(...inactiveClasses); }
        if(enBtnMob) { enBtnMob.classList.add(...activeClasses); enBtnMob.classList.remove(...inactiveClasses); }
        if(idBtnMob) { idBtnMob.classList.remove(...activeClasses); idBtnMob.classList.add(...inactiveClasses); }
    } else {
        if(idBtn) { idBtn.classList.add(...activeClasses); idBtn.classList.remove(...inactiveClasses); }
        if(enBtn) { enBtn.classList.remove(...activeClasses); enBtn.classList.add(...inactiveClasses); }
        if(idBtnMob) { idBtnMob.classList.add(...activeClasses); idBtnMob.classList.remove(...inactiveClasses); }
        if(enBtnMob) { enBtnMob.classList.remove(...activeClasses); enBtnMob.classList.add(...inactiveClasses); }
    }
}
