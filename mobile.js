// ============================================================
// MOBILE.JS
// Load AFTER main.js and flag-hiker.js. Does not require edits
// to those files.
// ============================================================

(function () {

    const mqPhone = window.matchMedia('(max-width: 1180px)');
    const mqTouch = window.matchMedia('(hover: none)');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;


    // ----------------------------
    // ScrollTrigger: don't re-measure when the address bar collapses
    // ----------------------------

    if (typeof ScrollTrigger !== 'undefined') {
        ScrollTrigger.config({ ignoreMobileResize: true });
    }


    // ----------------------------
    // Haptics (Android only, silently ignored elsewhere)
    // ----------------------------

    function haptic(ms = 8) {
        if (reduceMotion || !mqTouch.matches) return;
        if (navigator.vibrate) navigator.vibrate(ms);
    }

    document.addEventListener('click', event => {
        if (event.target.closest(
            '.cs-tab, .scroll-carousel__card, .project-gallery-arrow, .m-lang'
        )) {
            haptic();
        }
    });


    // ----------------------------
    // Language toggle (replaces the hiker on touch devices)
    // Uses the same 'flagchange' event as the hiker, so main.js
    // translates everything exactly as before.
    // ----------------------------

    function buildLanguageButton() {
        if (document.querySelector('.m-lang')) return;

        const button = document.createElement('button');
        button.className = 'm-lang';
        button.type = 'button';
        button.innerHTML = '<span data-l="en">EN</span><span data-l="nl">NL</span>';

        function sync() {
            const lang = document.documentElement.lang === 'nl' ? 'nl' : 'en';

            button.querySelectorAll('span').forEach(span => {
                span.classList.toggle('on', span.dataset.l === lang);
            });

            button.setAttribute(
                'aria-label',
                lang === 'nl'
                    ? 'Taal: Nederlands. Tik om naar Engels te wisselen'
                    : 'Language: English. Tap to switch to Dutch'
            );
        }

        button.addEventListener('click', () => {
            const next = document.documentElement.lang === 'nl' ? 'GB' : 'NL';
            window.dispatchEvent(new CustomEvent('flagchange', { detail: next }));
        });

        window.addEventListener('translationsapplied', sync);

        document.body.appendChild(button);
        sync();

        // fade in after the loader has finished
        setTimeout(() => button.classList.add('show'), 150);
    }

    window.addEventListener('load', () => {
        if (!mqTouch.matches) return;
        setTimeout(buildLanguageButton, 3000);
    });


    // ----------------------------
    // Swipe left / right in the project gallery
    // (reuses the existing arrow buttons, so all logic stays in main.js)
    // ----------------------------

    const galleryImage = document.querySelector('.project-detail__image');
    const galleryPrev = document.getElementById('galleryPrev');
    const galleryNext = document.getElementById('galleryNext');

    if (galleryImage) {
        let startX = 0;
        let startY = 0;

        galleryImage.addEventListener('touchstart', event => {
            startX = event.touches[0].clientX;
            startY = event.touches[0].clientY;
        }, { passive: true });

        galleryImage.addEventListener('touchend', event => {
            const touch = event.changedTouches[0];
            const dx = touch.clientX - startX;
            const dy = touch.clientY - startY;

            // clearly horizontal and long enough
            if (Math.abs(dx) < 40 || Math.abs(dx) < Math.abs(dy) * 1.5) return;

            (dx < 0 ? galleryNext : galleryPrev)?.click();
        }, { passive: true });
    }


    // ----------------------------
    // Tab buttons are icon-only on phones: give them accessible names
    // ----------------------------

    function labelTabs() {
        document.querySelectorAll('.cs-tab').forEach(tab => {
            const label = tab.querySelector('.cs-tab__label');
            if (label) tab.setAttribute('aria-label', label.textContent.trim());
        });
    }

    labelTabs();
    window.addEventListener('translationsapplied', labelTabs);


    // ----------------------------
    // Lighter wave on phones: update every 2nd frame (~30 fps)
    // Wraps the existing updateWave() from main.js.
    // ----------------------------

    if (mqPhone.matches && typeof updateWave === 'function') {
        const baseUpdateWave = updateWave;
        let frame = 0;

        updateWave = function () {
            // let the original handle the "inactive" case (it cleans up)
            if (!waveActive) return baseUpdateWave();

            if (++frame % 2) {
                waveAnimationFrame = requestAnimationFrame(updateWave);
                return;
            }

            baseUpdateWave();
        };
    }

    // ----------------------------
    // Wave mask: scale with the title
    // The mask path uses fixed pixel coordinates (1600x500), which only
    // lines up with the title at its desktop size (17em). On smaller
    // screens the title is smaller, so the wave has to shrink with it.
    // ----------------------------

    function scaleWaveMask() {
        const path = document.getElementById('wavePath');
        const title = document.querySelector('.content .wave');

        if (!path || !title) return;

        const reference = 17 * parseFloat(getComputedStyle(title.parentElement).fontSize);
        const scale = parseFloat(getComputedStyle(title).fontSize) / reference;

        if (Math.abs(scale - 1) < 0.001) {
            path.removeAttribute('transform');
        } else {
            path.setAttribute('transform', `scale(${scale})`);
        }
    }

    scaleWaveMask();
    window.addEventListener('load', scaleWaveMask);
    window.addEventListener('resize', scaleWaveMask);
    window.addEventListener('orientationchange', scaleWaveMask);
    if (document.fonts?.ready) document.fonts.ready.then(scaleWaveMask);

})();
