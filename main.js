// ============================================================
// GSAP
// ============================================================

gsap.registerPlugin(ScrollTrigger);


// ============================================================
// LOADER + INITIAL SETUP
// ============================================================


let currentLanguage = 'en';

function applyTranslations(language) {
    const dictionary = translations[language];

    if (!dictionary) {
        console.warn(`Translations not found for: ${language}`);
        return;
    }

    currentLanguage = language;
    document.documentElement.lang = language;

    // Translate normal HTML elements.
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.dataset.i18n;
        const value = dictionary[key];

        if (value !== undefined) {
            element.textContent = value;
        }
    });

    // Translate HTML attributes, such as aria-label.
    document.querySelectorAll('[data-i18n-attr]').forEach(element => {
        element.dataset.i18nAttr.split(';').forEach(entry => {
            const [attribute, key] = entry.trim().split(':');
            const value = dictionary[key];

            if (attribute && value !== undefined) {
                element.setAttribute(attribute, value);
            }
        });
    });

    // Rebuild project cards in the selected language.
    createCards();

    // Refresh an open project without closing its overlay.
    if (activeProject !== null) {
        activeProjectCard = document.querySelector(
            `.scroll-carousel__card[data-project="${activeProject}"]`
        );

        updateProjectText(activeProject);
        showProjectImage(activeImage);
    }
        // Let other parts (like the character dialogue) know the language changed.
    window.dispatchEvent(new Event('translationsapplied'));
}

// Listen for the hiker widget's language selection.
window.addEventListener('flagchange', event => {
    const language = event.detail === 'NL' ? 'nl' : 'en';
    applyTranslations(language);
});


window.addEventListener('load', () => {

    // ----------------------------
    // Loader
    // ----------------------------

    setTimeout(() => {
        const loaderWrapper = document.querySelector('.loader_wrapper');

        if (loaderWrapper) {
            loaderWrapper.classList.add('loaded');

            setTimeout(() => {
                loaderWrapper.style.display = 'none';
            }, 1000);
        }
    }, 2150);


    // ----------------------------
    // Loading animation letters
    // ----------------------------

  
    // ----------------------------
    // Loading animation images
    // ----------------------------

    const logos = document.querySelectorAll('#loading-animation img');

    let currentIndex = 0;

    function showNextLogo() {
        if (!logos.length) return;

        logos.forEach(logo => {
            logo.style.display = 'none';
        });

        logos[currentIndex].style.display = 'block';

        currentIndex = (currentIndex + 1) % logos.length;

        setTimeout(showNextLogo, 360);
    }

    showNextLogo();


    



    // ----------------------------
    // Grain effect
    // ----------------------------

    const options = {
        animate: true,
        patternWidth: 349.54,
        patternHeight: 419.61,
        grainOpacity: 0.3,
        grainDensity: 2,
        grainWidth: 0.8,
        grainHeight: 0.8
    };

    if (typeof grained === 'function') {
        grained('#grained-background', options);
    }


    // ----------------------------
    // Start at top
    // ----------------------------

    window.scrollTo(0, 0);




    // Apply the default language and create translated cards
    applyTranslations(currentLanguage);


    // ----------------------------
    // Setup carousel
    // ----------------------------

    setupHorizontalScroll();


    // ----------------------------
    // Main animations
    // ----------------------------

    setupMainAnimations();


    // ----------------------------
    // Text reveal animations
    // ----------------------------

    setupTextAnimations();



    // ----------------------------
    // Wave animation
    // ----------------------------

    updateWave();


    // ----------------------------
    // Refresh ScrollTrigger
    // ----------------------------

    ScrollTrigger.refresh();

});


// ============================================================
// LENIS SMOOTH SCROLL
// ============================================================

const lenis = new Lenis();


// Tell ScrollTrigger whenever Lenis scrolls
lenis.on('scroll', ScrollTrigger.update);


// Use GSAP's ticker instead of a separate requestAnimationFrame loop
gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
});


// Prevent GSAP from trying to compensate for lag
gsap.ticker.lagSmoothing(0);


// ============================================================
// MAIN CONTAINER ANIMATIONS
// ============================================================

function setupMainAnimations() {

    const container = document.querySelector('.container');
    const content = document.querySelector('.content');

    if (!container || !content) return;

    gsap.timeline({
        scrollTrigger: {
            trigger: container,
            start: 'top top',
            end: '+=100%',
            pin: true,
            pinSpacing: true,
            scrub: 0.5,

            onEnter: () => {
                startWave();
            },

            onLeave: () => {
                stopWave();
            },

            onEnterBack: () => {
                startWave();
            },

            onLeaveBack: () => {
                stopWave();
            }
        }
    })
    .to(content, {
        scale: 55,
        transformOrigin: 'center center',
        ease: 'none'
    });

    // "Scroll down" hint fades out as soon as the user starts scrolling
    const hint = document.querySelector('.scroll-hint');

    if (hint) {
        gsap.to(hint, {
            opacity: 0,
            y: 24,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top top',
                end: '+=20%',
                scrub: true
            }
        });
    }

}


// ============================================================
// INTRO TEXT REVEAL
// ============================================================

function setupTextAnimations() {

    const paragraphs = document.querySelectorAll('.reveal-type');

    paragraphs.forEach((paragraph) => {

        // -----------------------------------------
        // Split into WORDS only
        // -----------------------------------------

        const split = new SplitType(paragraph, {
            types: 'words'
        });

        // -----------------------------------------
        // Make every word its own non-breaking unit
        // -----------------------------------------

        split.words.forEach(word => {

            word.style.display = 'inline-block';
            word.style.whiteSpace = 'nowrap';

        });

        // -----------------------------------------
        // Start hidden + below
        // -----------------------------------------

        gsap.set(split.words, {
            opacity: 0,
            y: 30
        });

        // -----------------------------------------
        // Animate words
        // -----------------------------------------

        gsap.to(split.words, {

            opacity: 1,
            y: 0,

            stagger: 0.06,

            ease: 'power2.out',

            scrollTrigger: {

                trigger: paragraph,

                start: 'top 75%',
                end: 'top 60%',

                scrub: 0.3

            }

        });

    });


    // -----------------------------------------
    // BUTTON
    // -----------------------------------------

    const button = document.querySelector('.nes-btn');

    if (button) {

        gsap.fromTo(

            button,

            {
                opacity: 0,
                y: 30
            },

            {
                opacity: 1,
                y: 0,

                ease: 'power2.out',

                scrollTrigger: {

                    trigger: button,

                    start: 'top 83%',
                    end: 'top 73%',

                    scrub: 0.3

                }

            }

        );

    }

}


// // ============================================================
// PERFORMANCE FRIENDLY WAVE
// ============================================================

const path = document.getElementById("wavePath");

let motion = 0;
let waveAnimationFrame = null;
let waveActive = true;

function updateWave() {

    if (!path || !waveActive) {
        waveAnimationFrame = null;
        return;
    }

    const width = 1600;
    const height = 500;
    const baseline = 200;
    const points = 18;

    motion += 0.0075;

    let d = `M0 ${baseline}`;

    let prevX = 0;
    let prevY = baseline;

    for (let i = 1; i <= points; i++) {

        const baseX = (i / points) * width;

        const x =
            baseX +
            Math.sin(i * 1.3 + motion * 1.8) * 20 +
            Math.cos(i * 2.5 + motion) * 12;

        const crash =
            Math.pow(
                Math.max(0, Math.sin(motion * 0.35)),
                5
            ) * 110;

        const y =
            baseline +
            Math.sin(i * 0.9 + motion * 2) * 24 +
            Math.exp(
                -Math.pow(
                    i - (8 + Math.sin(motion * 0.3) * 5),
                    2
                ) / 2
            ) * crash;

        const cx = (prevX + x) / 2;
        const cy = (prevY + y) / 2;

        d += ` Q ${prevX} ${prevY}, ${cx} ${cy}`;

        prevX = x;
        prevY = y;
    }

    d += ` T ${width} ${baseline}`;
    d += ` L ${width} ${height}`;
    d += ` L 0 ${height} Z`;

    path.setAttribute("d", d);

    waveAnimationFrame = requestAnimationFrame(updateWave);
}


// Start / stop wave
function startWave() {

    if (waveActive) return;

    waveActive = true;

    if (!waveAnimationFrame) {
        waveAnimationFrame = requestAnimationFrame(updateWave);
    }
}


function stopWave() {

    waveActive = false;

    if (waveAnimationFrame) {
        cancelAnimationFrame(waveAnimationFrame);
        waveAnimationFrame = null;
    }
}


// ============================================================
// ONLY RUN WAVE WHILE MAIN CONTAINER IS VISIBLE
// ============================================================

const waveContainer = document.querySelector(".container");

if (waveContainer) {

    const waveObserver = new IntersectionObserver(
        (entries) => {

            const entry = entries[0];

            if (entry.isIntersecting) {
                startWave();
            } else {
                stopWave();
            }

        },
        {
            threshold: 0
        }
    );

    waveObserver.observe(waveContainer);

    // Start initially
    waveActive = false;
    startWave();
}


// ============================================================
// CAROUSEL DATA
// ============================================================

const cards = [

{
    id: 'orderProcessing',
    coverImage: 'project-images/po-confirm.png',

    images: [
        {
            url: 'project-images/po-confirm2.png',
            label: 'SKETCH // AUTOMATION PROTOTYPE'
        },
        {
            url: 'project-images/po-confirm3.png',
            label: 'SCREENSHOT // AUTOMATION FLOW'
        }
    ],

    title: 'AI-Powered Order Processing',
    type: 'WORK PROJECT',
    status: 'COMPLETED',

    description:
        'Developed and implemented an end-to-end order processing solution that transforms a previously manual workflow into an automated process, extracting order data from PDF, XML and Excel documents, structuring it for downstream processing, and enabling fully automated execution through a zero-click mode. The solution demonstrated the potential to automate approximately 37% of manually processed orders, equivalent to an estimated 350 orders per month, significantly reducing manual data entry and streamlining order processing.',

    technologies: [
        'Power Automate',
        'AI (IDP)',
        'HTML/CSS/JS',
        'SFTP',
        'Navision'
    ],

    year: '2026'
},

{
    id: 'aquaponics',
    coverImage: 'project-images/aquaponics.png',

    images: [
        {
            url: 'project-images/aquaponics2.png',
            label: 'SKETCH // AQUAPONICS SYSTEM'
        },
        {
            url: 'project-images/aquaponics3.jpg',
            label: 'PICTURE // AQUAPONICS FARM'
        },
        {
            url: 'project-images/aquaponics4.png',
            label: 'POC // DIGITAL SOLUTION'
        },
        {
            url: 'project-images/aquaponics5.jpg',
            label: 'PICTURE // PRESENTING THE PROJECT'
        }
    ],

    title: 'AI Aquaponics System',
    type: 'COMMUNITY PROJECT - SOUTH AFRICA',
    status: 'COMPLETED',

    description:
        'Integrated and programmed an AI-powered farm management system that predicts how changing conditions, such as high temperatures, affect crop growth and helps determine optimal growing conditions. Automated tasks such as watering, temperature alerts, and shading curtains to reduce manual work and improve growing conditions.',

    technologies: [
        'Python',
        'AI / Predictive Modeling',
        'IoT',
        'Workflow Automation',
        'Sensor Data Analytics'
    ],

    year: '2022'
},

{
    id: 'onboarding',
    coverImage: 'project-images/newhire.png',

    images: [
        {
            url: 'project-images/newhire2.png',
            label: 'SKETCH // ONBOARDING EXPERIENCE'
        },
        {
            url: 'project-images/newhire3.png',
            label: 'PROCESS // ONBOARDING EXPERIENCE'
        },
        {
            url: 'project-images/newhire4.png',
            label: 'PROCESS // ONBOARDING EXPERIENCE DETAILED'
        }
    ],

    title: 'Employee Onboarding',
    type: 'WORK PROJECT',
    status: 'COMPLETED',

    description:
        'Automated the onboarding process from the initial request to the employee’s first day. Connected HR, team leads, and other departments to manage contracts, employee records, notifications, and first-day preparations in one workflow.',

    technologies: [
        'Microsoft Power Apps',
        'Microsoft Power Automate',
        'Adobe Sign'
    ],

    year: '2025'
},

{
    id: 'podTracking',
    coverImage: 'project-images/pod-retrieval.png',

    images: [
        {
            url: 'project-images/pod-retrieval2.png',
            label: 'SKETCH // POD RETRIEVAL'
        },
        {
            url: 'project-images/pod-retrieval3.png',
            label: 'PROCESS // POD RETRIEVAL'
        }
    ],

    title: 'POD Tracking & API Integration',
    type: 'PROJECT',
    status: 'COMPLETED',

    description:
        'An automated proof-of-delivery retrieval system that checks orders daily against carrier APIs to track delivery status and collect proof of delivery. Automatically stores delivery data and flags missing records or undelivered shipments, reducing manual checks and helping ensure audit compliance.',

    technologies: [
        'JavaScript',
        'API',
        'Microsoft Power Automate',
        'JSON'
    ],

    year: '2026'
},

{
    id: 'learningPlatform',
    coverImage: 'project-images/lowcode.png',

    images: [
        {
            url: 'project-images/lowcode2.png',
            label: 'SKETCH // DIGITAL LEARNING PLATFORM'
        },
        {
            url: 'project-images/DLE3.png',
            label: 'PROTOTYPE // POWER APPS COURSE'
        },
        {
            url: 'project-images/DLE4.png',
            label: 'GOAL // DIGITAL LEARNING ENVIRONMENT'
        }
    ],

    title: 'Digital Learning Platform',
    type: 'WORK PROJECT',
    status: 'COMPLETED',

    description:
        'Managed a project to develop a proof of concept for an online learning platform that makes practical knowledge about tools such as Power Apps accessible to small and medium-sized businesses. Coordinated different project elements and stakeholders, including Fontys and the Municipality of Groningen, to create a learning experience that helps people gain practical skills and apply them in their work.',

    technologies: [
        'Project Management',
        'UX/UI Design',
        'Stakeholder Management',
        'Prototyping'
    ],

    year: '2022'
},

{
    id: 'casualGolf',
    coverImage: 'project-images/casualgolf.png',

    images: [
        {
            url: 'project-images/casualgolf2.png',
            label: 'SCREENSHOT // CASUALGOLF EXPERIENCE'
        }
    ],

    title: 'CasualGolf.',
    type: 'START-UP',
    status: 'FAILED :(',

    description:
        'Designed and built a webshop for a golf clothing brand, covering the store setup, product design, and online marketing. Worked across the full process, from creating the brand’s product offering and online store to developing marketing materials and promoting the brand.',

    technologies: [
        'Shopify',
        'E-commerce Management',
        'Product Design',
        'Branding',
        'Digital Marketing'
    ],

    year: '2023'
}

];

// ============================================================
// PROJECT EXPANSION SYSTEM
// ============================================================

const projectOverlay =
    document.getElementById('projectOverlay');

const projectDetail =
    document.querySelector('.project-detail');

const closeProjectButton =
    document.getElementById('closeProject');

const detailImage =
    document.getElementById('detailImage');

const detailImageLabel =
    document.getElementById('detailImageLabel');

const detailTitle =
    document.getElementById('detailTitle');

const detailStatus =
    document.getElementById('detailStatus');

const detailType =
    document.getElementById('detailType');

const detailYear =
    document.getElementById('detailYear');

const detailDescription =
    document.getElementById('detailDescription');

const detailTechnologies =
    document.getElementById('detailTechnologies');

const galleryPrev =
    document.getElementById('galleryPrev');

const galleryNext =
    document.getElementById('galleryNext');


let activeProject = null;
let activeImage = 0;
let projectTimeline = null;
let activeProjectCard = null;
let activeProjectCardRect = null;


// ============================================================
// IMAGE
// ============================================================

function showProjectImage(imageIndex) {

    if (activeProject === null) return;

    const project =
        cards[activeProject];

    if (!project || !project.images?.length) return;

    const image =
        project.images[imageIndex];

    if (!image) return;

    activeImage = imageIndex;

    const hasMultipleImages = project.images.length > 1;

    if (galleryPrev) {
        galleryPrev.style.display =
            hasMultipleImages ? 'flex' : 'none';
    }

    if (galleryNext) {
        galleryNext.style.display =
            hasMultipleImages ? 'flex' : 'none';
    }


    // Prevent old image from flashing
    detailImage.classList.remove('loaded');


    detailImage.onload = () => {

        detailImage.classList.add('loaded');

    };


    detailImage.src = image.url;

    const translatedProject =
    translations[currentLanguage]?.projects?.[project.id];

    const translatedLabel =
        translatedProject?.imageLabels?.[imageIndex]
        ?? image.label;

    const translatedTitle =
        translatedProject?.title ?? project.title;

    detailImage.alt =
        `${translatedTitle} — ${translatedLabel}`;

    detailImageLabel.textContent =
        translatedLabel;

}




// ============================================================
// RESET PROJECT UI
// ============================================================

function resetProjectUI() {

    activeProject = null;

    activeImage = 0;

    detailImage.classList.remove('loaded');

    detailImage.src = '';

    detailImage.alt = '';

    detailTitle.textContent =
        'PROJECT TITLE';

    detailDescription.textContent =
        '';

    detailTechnologies.innerHTML =
        '';

}


// ============================================================
// OPEN PROJECT
// ============================================================


function updateProjectText(index) {
    const project = cards[index];
    if (!project) return;

    const text =
        translations[currentLanguage]?.projects?.[project.id] ?? project;

    detailTitle.textContent = text.title;
    detailType.textContent = text.type;
    detailYear.textContent = project.year;
    detailDescription.textContent = text.description;

    detailStatus.textContent = `● ${text.status}`;

    // Keep the existing CSS status classes working.
    detailStatus.classList.remove(
        'ongoing',
        'completed',
        'failed'
    );

    if (project.status === 'ONGOING') {
        detailStatus.classList.add('ongoing');
    }

    if (project.status === 'COMPLETED') {
        detailStatus.classList.add('completed');
    }

    if (project.status === 'FAILED :(') {
        detailStatus.classList.add('failed');
    }
}


function openProject(index) {

        // Reset overlay background for every new project
    gsap.killTweensOf('.project-overlay__background');

    gsap.set('.project-overlay__background', {
        opacity: 1
    });

    projectOverlay.style.backgroundColor = 'rgba(0, 0, 0, 0.75)';
    activeProject = index;
    activeImage = 0;

    activeProjectCard = document.querySelector(
        `.scroll-carousel__card[data-project="${index}"]`
    );

    const project = cards[index];

    if (!project || !projectOverlay || !projectDetail) {
        console.warn('Project overlay elements missing.');
        return;
    }

    if (projectTimeline) {
        projectTimeline.kill();
        projectTimeline = null;
    }


    // --------------------------------------------------------
    // Remember the card position
    // --------------------------------------------------------

    if (activeProjectCard) {

        const rect =
            activeProjectCard.getBoundingClientRect();

        activeProjectCardRect = {
            left: rect.left,
            top: rect.top,
            width: rect.width,
            height: rect.height
        };

        // Only hide the card visually.
        // DO NOT modify its transform.
        gsap.set(activeProjectCard, {
            opacity: 0
        });

    }


    // --------------------------------------------------------
    // IMPORTANT:
    // Reset ALL animated modal elements before opening.
    // This fixes the "next project has no text" problem.
    // --------------------------------------------------------

    gsap.killTweensOf([
        projectDetail,
        projectOverlay,
        detailStatus,
        detailTitle,
        '.project-detail__meta',
        '.project-description',
        '.project-tech',
        '.project-detail__top'
    ]);


    gsap.set(projectDetail, {
        x: 0,
        y: 60,
        scale: 0.92,
        opacity: 0
    });


    gsap.set([
        detailStatus,
        detailTitle,
        '.project-detail__meta',
        '.project-description',
        '.project-tech',
        '.project-detail__top'
    ], {
        opacity: 1,
        x: 0
    });


    // --------------------------------------------------------
    // Fill project information
    // --------------------------------------------------------

    updateProjectText(index);

    detailStatus.classList.remove(
        'ongoing',
        'completed',
        'failed'
    );

    if (project.status === 'ONGOING') {
        detailStatus.classList.add('ongoing');
    }

    if (project.status === 'COMPLETED') {
        detailStatus.classList.add('completed');
    }

    if (project.status === 'FAILED :(') {
        detailStatus.classList.add('failed');
    }


    // --------------------------------------------------------
    // Technologies
    // --------------------------------------------------------

    detailTechnologies.innerHTML = '';

    project.technologies.forEach(tech => {

        const item =
            document.createElement('span');

        item.className =
            'project-tech__item';

        item.textContent =
            tech;

        detailTechnologies.appendChild(item);

    });


    // --------------------------------------------------------
    // Gallery
    // --------------------------------------------------------


    showProjectImage(0);


    // --------------------------------------------------------
    // Show overlay
    // --------------------------------------------------------

    projectOverlay.style.display = 'flex';
    projectOverlay.style.visibility = 'visible';
    projectOverlay.style.pointerEvents = 'auto';
    projectOverlay.style.opacity = '1';
    projectOverlay.style.zIndex = '99999';

    projectDetail.style.display = 'block';
    projectDetail.style.visibility = 'visible';
    projectDetail.style.pointerEvents = 'auto';


    // --------------------------------------------------------
    // Lock scrolling
    // --------------------------------------------------------

    document.body.style.overflow = 'hidden';

    lenis.stop();


    // --------------------------------------------------------
    // OPEN ANIMATION
    // --------------------------------------------------------

    projectTimeline =
        gsap.timeline();

    projectTimeline.to(
        projectDetail,
        {
            y: 0,
            scale: 1,
            opacity: 1,
            duration: 0.45,
            ease: 'power3.out'
        }
    );


    projectTimeline.from(
        [
            detailStatus,
            detailTitle,
            '.project-detail__meta',
            '.project-description',
            '.project-tech'
        ],
        {
            opacity: 0,
            x: 20,
            duration: 0.3,
            stagger: 0.04,
            ease: 'power2.out'
        },
        '-=.25'
    );

}


// ============================================================
// CLOSE PROJECT
// ============================================================

// ============================================================
// CLOSE PROJECT
// ============================================================

function closeProject() {

    if (projectTimeline) {
        projectTimeline.kill();
        projectTimeline = null;
    }

    const card = activeProjectCard;


    // --------------------------------------------------------
    // Immediately prevent interaction
    // --------------------------------------------------------

    projectDetail.style.pointerEvents = 'none';
    projectOverlay.style.pointerEvents = 'none';


    // --------------------------------------------------------
    // Safe fallback
    // --------------------------------------------------------

    if (!card || !activeProjectCardRect) {

        projectDetail.style.visibility = 'hidden';
        projectDetail.style.display = 'none';
        projectDetail.style.opacity = '0';

        projectOverlay.style.visibility = 'hidden';
        projectOverlay.style.display = 'none';
        projectOverlay.style.opacity = '0';

        document.body.style.overflow = '';
        lenis.start();

        resetProjectUI();

        gsap.set(projectDetail, {
            clearProps: 'transform,opacity'
        });

        gsap.set([
            detailStatus,
            detailTitle,
            '.project-detail__meta',
            '.project-description',
            '.project-tech',
            '.project-detail__top'
        ], {
            clearProps: 'transform,opacity'
        });

        activeProjectCard = null;
        activeProjectCardRect = null;

        return;
    }


    // --------------------------------------------------------
    // Get current positions
    // --------------------------------------------------------

    const detailRect =
        projectDetail.getBoundingClientRect();

    const cardRect =
        card.getBoundingClientRect();


    // Calculate distance from modal center → card center

    const targetX =
        (cardRect.left + cardRect.width / 2) -
        (detailRect.left + detailRect.width / 2);

    const targetY =
        (cardRect.top + cardRect.height / 2) -
        (detailRect.top + detailRect.height / 2);


    // --------------------------------------------------------
    // CLOSE TIMELINE
    // --------------------------------------------------------

    projectTimeline = gsap.timeline({
        onComplete: () => {

            // ------------------------------------------------
            // Completely hide modal
            // ------------------------------------------------

            projectDetail.style.visibility = 'hidden';
            projectDetail.style.display = 'none';
            projectDetail.style.pointerEvents = 'none';

            projectOverlay.style.visibility = 'hidden';
            projectOverlay.style.display = 'none';
            projectOverlay.style.pointerEvents = 'none';


            // ------------------------------------------------
            // Reset modal
            // ------------------------------------------------

            gsap.set(projectDetail, {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 0
            });


            // ------------------------------------------------
            // Restore modal children for next project
            // ------------------------------------------------

            gsap.set([
                detailStatus,
                detailTitle,
                '.project-detail__meta',
                '.project-description',
                '.project-tech',
                '.project-detail__top'
            ], {
                x: 0,
                opacity: 1
            });


            // ------------------------------------------------
            // Make absolutely sure card is visible
            // ------------------------------------------------

            gsap.set(card, {
                opacity: 1,
                scale: 1
            });


            // ------------------------------------------------
            // Restore scrolling
            // ------------------------------------------------

            document.body.style.overflow = '';

            lenis.start();


            // ------------------------------------------------
            // Reset project data
            // ------------------------------------------------

            resetProjectUI();

            activeProjectCard = null;
            activeProjectCardRect = null;


            requestAnimationFrame(() => {

                ScrollTrigger.refresh();
                ScrollTrigger.update();

            });

        }
    });


    // ========================================================
    // 1. Fade project content
    // ========================================================

    projectTimeline.to(
        [
            detailStatus,
            detailTitle,
            '.project-detail__meta',
            '.project-description',
            '.project-tech'
        ],
        {
            opacity: 0,
            x: -8,
            duration: 0.2,
            stagger: 0.01,
            ease: 'power2.in'
        }
    );


// ========================================================
// 2. MOVE MODAL TOWARD CARD
// ========================================================

projectTimeline.to(
    projectDetail,
    {
        x: targetX,
        y: targetY,
        scale: 0.72,
        duration: 0.7,
        ease: 'power3.inOut'
    },
    '-=0.04'
);


// ========================================================
// 3. CARD APPEARS + SHRINKS
//    Start this BEFORE the modal reaches the card.
// ========================================================

projectTimeline.fromTo(
    card,
    {
        opacity: 0,
        scale: 1.12
    },
    {
        opacity: 1,
        scale: 1,
        duration: 0.48,
        ease: 'power3.out'
    },
    '-=0.42'
);


// ========================================================
// 4. BACKGROUND FADES AT THE SAME TIME
// ========================================================

projectTimeline.to(
    '.project-overlay__background',
    {
        opacity: 0,
        duration: 0.30,
        ease: 'power2.out'
    },
    '-=0.30'
);

projectTimeline.to(
    projectOverlay,
    {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        duration: 0.30,
        ease: 'power2.out'
    },
    '<'
);


// ========================================================
// 5. MAKE MODAL DISAPPEAR WHILE CARD IS STILL MOVING
// ========================================================

projectTimeline.set(
    projectDetail,
    {
        opacity: 0,
        visibility: 'hidden'
    },
    '-=0.30'
);

}


// ============================================================
// CLOSE BUTTON
// ============================================================

if (closeProjectButton) {

    closeProjectButton.addEventListener(
        'click',
        closeProject
    );

}


// ============================================================
// BACKGROUND CLICK
// ============================================================

if (projectOverlay) {

    projectOverlay.addEventListener(
        'click',
        (event) => {

            if (
                event.target === projectOverlay ||
                event.target.classList.contains(
                    'project-overlay__background'
                )
            ) {

                closeProject();

            }

        }
    );

}


// ============================================================
// ESC
// ============================================================

document.addEventListener(
    'keydown',
    (event) => {

        if (
            event.key === 'Escape' &&
            activeProject !== null
        ) {

            closeProject();

        }

    }
);


// ============================================================
// KEYBOARD IMAGE NAVIGATION
// ============================================================

document.addEventListener(
    'keydown',
    (event) => {

        if (activeProject === null) return;

        const project =
            cards[activeProject];

        if (!project?.images?.length) return;


        if (event.key === 'ArrowRight') {

            const next =
                (activeImage + 1) %
                project.images.length;

            showProjectImage(next);

        }


        if (event.key === 'ArrowLeft') {

            const previous =
                (activeImage - 1 +
                project.images.length) %
                project.images.length;

            showProjectImage(previous);

        }

    }

    
);

// ============================================================
// MOUSE / TOUCH IMAGE NAVIGATION
// ============================================================

if (galleryPrev) {

    galleryPrev.addEventListener('click', (event) => {

        event.stopPropagation();

        if (activeProject === null) return;

        const project = cards[activeProject];

        if (!project?.images || project.images.length < 2) {
            return;
        }

        const previous =
            (activeImage - 1 + project.images.length) %
            project.images.length;

        showProjectImage(previous);

    });

}


if (galleryNext) {

    galleryNext.addEventListener('click', (event) => {

        event.stopPropagation();

        if (activeProject === null) return;

        const project = cards[activeProject];

        if (!project?.images || project.images.length < 2) {
            return;
        }

        const next =
            (activeImage + 1) %
            project.images.length;

        showProjectImage(next);

    });

}

// ============================================================
// CREATE CARDS
// ============================================================

// ============================================================
// CREATE CARDS
// ============================================================


function createCards() {
    const cardsContainer = document.querySelector(
        '.scroll-carousel__cards'
    );

    if (!cardsContainer) return;

    cardsContainer.innerHTML = '';

    cards.forEach((card, index) => {
        const text =
            translations[currentLanguage]?.projects?.[card.id] ?? card;

        const cardDiv = document.createElement('div');
        cardDiv.className = 'scroll-carousel__card';
        cardDiv.dataset.project = index;

        const projectNumber = String(index + 1).padStart(2, '0');
        const coverImage = card.coverImage || '';

        cardDiv.innerHTML = `
            <img
                src="${coverImage}"
                alt="${text.title}"
                loading="lazy"
            >

            <div class="card-scanlines"></div>

            <div class="card-number">
                PROJECT ${projectNumber}
            </div>

            <div class="scroll-carousel__card-title">
                ${text.title}
            </div>

            <div class="card-footer">
                <span>▶ VIEW PROJECT</span>
                <span>${projectNumber}/${String(cards.length).padStart(2, '0')}</span>
            </div>

            <div class="card-glitch"></div>
        `;

        cardDiv.addEventListener('click', () => {
            openProject(index);
        });

        cardsContainer.appendChild(cardDiv);
    });
}


function setupHorizontalScroll() {

    const container = document.querySelector(
        '.scroll-carousel__container'
    );

    const cardsContainer = document.querySelector(
        '.scroll-carousel__cards'
    );

    if (!container || !cardsContainer) return;


    // How far the cards have to move so the LAST card ends perfectly:
    //  - wide screens: the last card's right margin mirrors the first
    //    card's left margin (same as the original desktop behaviour)
    //  - narrow screens (about one card visible): the last card is centred
    function getDistance() {

        const cardList = cardsContainer.children;

        if (!cardList.length) return 0;

        const first = cardList[0];
        const last = cardList[cardList.length - 1];

        const currentX = gsap.getProperty(cardsContainer, 'x') || 0;

        const firstRect = first.getBoundingClientRect();
        const lastRect = last.getBoundingClientRect();

        // positions when the carousel is at x = 0
        const startLeft = firstRect.left - currentX;
        const lastRight = lastRect.right - currentX;

        const viewport = window.innerWidth;

        const targetRight = viewport / lastRect.width < 1.7
            ? (viewport + lastRect.width) / 2
            : viewport - startLeft;

        return Math.max(0, lastRight - targetRight);

    }


    // Scroll length of the horizontal part (a bit faster than 1:1)
    function getLength() {

        return Math.max(
            window.innerHeight * 0.6,
            getDistance() * 0.85
        );

    }


    function getStartPosition() {

        // Make the section exactly as tall as it needs to be:
        // one screen (sticky) + the horizontal scroll length.
        container.style.height =
            (window.innerHeight + getLength()) + 'px';

        // Where the black section actually starts
        const sectionTop =
            container.getBoundingClientRect().top +
            window.scrollY;

        // Compensates for the hero pin spacing (as before)
        return sectionTop + window.innerHeight;

    }


    function getEndPosition() {

        return getStartPosition() + getLength();

    }


    gsap.to(cardsContainer, {

        x: () => -getDistance(),

        ease: 'none',

        scrollTrigger: {

            trigger: container,

            start: () => getStartPosition(),

            end: () => getEndPosition(),

            scrub: true,

            invalidateOnRefresh: true

        }

    });

}

// ============================================================
// SMOOTH NAVIGATION
// ============================================================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener('click', (e) => {

        const targetId = link.getAttribute('href');
        const target = document.querySelector(targetId);

        if (!target) return;

        e.preventDefault();

        lenis.scrollTo(target, {
            offset: 0,
            duration: 1.5,
            easing: (t) => 1 - Math.pow(1 - t, 4)
        });

    });

});

// ============================================================
// SKILLS TABS
// ============================================================

// ============================================================
// CHARACTER SCREEN  (replaces the old "SKILLS TABS" block)
// ============================================================

(function () {
    const tabs = document.querySelectorAll('.cs-tab');
    const pages = document.querySelectorAll('.cs-page');
    const typeEl = document.getElementById('typeText');
    const nextBtn = document.getElementById('dlgNext');

        // Inner page scrolling that never traps the page scroll
    let lastPageScroll = 0;
    lenis.on('scroll', () => { lastPageScroll = performance.now(); });

    pages.forEach(p => {
        let lastInnerWheel = 0;

        p.addEventListener('wheel', e => {
            if (!p.classList.contains('active')) return;

            // Page doesn't overflow: nothing to scroll inside
            if (p.scrollHeight <= p.clientHeight + 1) return;

            const now = performance.now();
            const dir = e.deltaY > 0 ? 1 : -1;
            const atTop = p.scrollTop <= 0;
            const atBottom = p.scrollTop + p.clientHeight >= p.scrollHeight - 1;
            const atEdge = (dir < 0 && atTop) || (dir > 0 && atBottom);

            // The main page is gliding in the same direction as the wheel
            // (e.g. you scrolled down into the section): let it keep going.
            // If you reversed direction, the inner list gets priority.
            const pageGliding = now - lastPageScroll < 250 && lenis.direction === dir;
            if (pageGliding) return;

            if (atEdge) {
                // Hand over to the main page, but only after a short pause,
                // so trackpad momentum doesn't carry you out of the list.
                if (now - lastInnerWheel > 200) return;
                e.preventDefault();
                e.stopPropagation();
                lastInnerWheel = now; // keep absorbing until momentum dies
                return;
            }

            // Otherwise scroll the inner list and keep Lenis out of it
            e.preventDefault();
            e.stopPropagation();
            lastInnerWheel = now;
            p.scrollTop += e.deltaY;
        }, { passive: false });
    });

    // ---------- DIALOGUE LINES (edit these!) ----------
    const getLines = () =>
        translations[currentLanguage]?.dialogue ?? translations.en.dialogue;

    // ---------- PIXEL ICONS (1 = filled pixel, 10x10) ----------
    const ICONS = {
        char:  ['..........','...1111...','..111111..','..111111..','...1111...','..........','.11111111.','1111111111','1111111111','1111111111'],
        sword: ['........11','.......111','......111.','.....111..','1...111...','11.111....','.1111.....','..11......','.1111.....','11..11....'],
        scroll:['.11111111.','1111111111','1.........1','1.111111.1','1.........1','1.111111.1','1.........1','1.1111...1','1111111111','.11111111.'],
        star:  ['....11....','....11....','...1111...','1111111111','.11111111.','..111111..','..111111..','.111..111.','.11....11.','.1......1.'],
        chat:  ['.11111111.','1111111111','1111111111','1111111111','1111111111','1111111111','.11111111.','..111.....','..11......','..1.......'],
        map:   ['.11......1','.1111111..','.1.....1..','.1.11..1..','.1.11..1..','.1.....1..','.1111111..','.1........','.1........','.1........'],
        hourglass: ['1111111111','.11....11.','..11..11..','...1111...','....11....','....11....','...1111...','..111111..','.11111111.','1111111111'],
        check: ['..........','.........1','........11','1......11.','11....11..','.11..11...','..1111....','...11.....','..........','..........']
    };

    function pixelSVG(rows) {
        let r = '';
        rows.forEach((row, y) => [...row].forEach((ch, x) => {
            if (ch === '1') r += `<rect x="${x}" y="${y}" width="1" height="1"/>`;
        }));
        return `<svg viewBox="0 0 10 10" fill="#1a1a1a" aria-hidden="true">${r}</svg>`;
    }

    tabs.forEach(t => {
        const rows = ICONS[t.dataset.icon];
        if (rows) t.querySelector('.cs-tab__icon').innerHTML = pixelSVG(rows);
    });

    // Pixel icon on every side quest: check if done, hourglass if not
    document.querySelectorAll('.cs-sq').forEach(sq => {
        const icon = sq.classList.contains('done') ? ICONS.check : ICONS.hourglass;
        sq.querySelector('.cs-sq__check').innerHTML = pixelSVG(icon);
    });

    // Language pips
    document.querySelectorAll('.cs-pips').forEach(el => {
        const on = parseInt(el.dataset.pips, 10) || 0;
        el.innerHTML = Array.from({ length: 5 }, (_, i) => `<i class="${i < on ? 'on' : ''}"></i>`).join('');
    });

    // Bars fill from 0
    function fillBars(page) {
        const bars = page.querySelectorAll('.cs-bar i');
        bars.forEach(b => (b.style.width = '0'));
        requestAnimationFrame(() => requestAnimationFrame(() =>
            bars.forEach(b => (b.style.width = b.dataset.w + '%'))));
    }

    // Quest meters: segments light up and the number counts to its current value
function fillMeters(page) {
    page.querySelectorAll('.cs-meter').forEach(meter => {
        const start   = parseFloat(meter.dataset.start);
        const current = parseFloat(meter.dataset.current);
        const goal    = parseFloat(meter.dataset.goal);
        const dec     = parseInt(meter.dataset.decimals, 10) || 0;
        const total   = parseInt(meter.dataset.segments, 10) || 10;

        const track = meter.querySelector('.cs-meter__track');
        const now   = meter.querySelector('.cs-meter__now');

        meter.querySelector('.cs-meter__start').textContent = start.toFixed(dec);
        meter.querySelector('.cs-meter__goal').textContent  = goal.toFixed(dec);

        (meter._timers || []).forEach(clearTimeout);
        meter._timers = [];

        const frac = Math.min(1, Math.max(0, (current - start) / (goal - start)));
        const lit  = Math.round(frac * total);

        track.innerHTML = Array.from({ length: total }, () => '<i></i>').join('');
        meter.classList.toggle('complete', current === goal);

        const segs = [...track.children];
        now.textContent = (lit === 0 ? current : start).toFixed(dec);

        for (let i = 0; i < lit; i++) {
            meter._timers.push(setTimeout(() => {
                segs[i].classList.add('on');
                const value = i === lit - 1
                    ? current
                    : start + ((i + 1) / lit) * (current - start);
                now.textContent = value.toFixed(dec);
            }, 150 + i * 70));
        }
    });
}

    // ---------- DIALOGUE ENGINE ----------
    let lineIndex = 0, typing = false, timer = null;

     function typeLine() {
        if (!typeEl) return;
        clearInterval(timer);
        const text = getLines()[lineIndex];
        let i = 0;
        typing = true;
        typeEl.textContent = '';
        nextBtn.classList.remove('end');
        nextBtn.textContent = '▼';
        timer = setInterval(() => {
            typeEl.textContent = text.slice(0, ++i);
            if (i >= text.length) finishLine();
        }, 26);
    }

    function finishLine() {
        clearInterval(timer);
        typing = false;
        const lines = getLines();
        typeEl.textContent = lines[lineIndex];
        const last = lineIndex === lines.length - 1;
        nextBtn.classList.toggle('end', last);
    }

    function advance() {
        if (typing) return finishLine();
        if (lineIndex >= getLines().length - 1) return;
        lineIndex++;
        typeLine();
    }

    nextBtn?.addEventListener('click', advance);
    document.querySelector('.cs-dialog')?.addEventListener('click', e => {
        if (e.target !== nextBtn) advance();
    });

    // When the language switches, show the current line in the new language
    window.addEventListener('translationsapplied', () => {
        if (typeEl && typeEl.textContent) finishLine();
    });

    // ---------- PAGES ----------
    function openPage(name) {
        tabs.forEach(t => t.classList.toggle('active', t.dataset.page === name));
        pages.forEach(p => p.classList.toggle('active', p.id === 'page-' + name));
        const page = document.getElementById('page-' + name);
        if (!page) return;
        page.scrollTop = 0;
        fillBars(page);
        fillMeters(page); 
        if (name === 'character') { lineIndex = 0; typeLine(); }
    }

    tabs.forEach(tab => tab.addEventListener('click', () => openPage(tab.dataset.page)));

    // Left / right arrow keys move between pages while a tab has focus
    document.querySelector('.cs__menu')?.addEventListener('keydown', e => {
        if (!['ArrowRight', 'ArrowLeft'].includes(e.key)) return;
        const list = [...tabs];
        const cur = list.findIndex(t => t.classList.contains('active'));
        const next = (cur + (e.key === 'ArrowRight' ? 1 : -1) + list.length) % list.length;
        list[next].focus();
        openPage(list[next].dataset.page);
        e.preventDefault();
    });

    // Start when the section scrolls into view
    const section = document.getElementById('skills');
    if (section) {
        new IntersectionObserver((entries, obs) => {
            if (entries[0].isIntersecting) { openPage('character'); obs.disconnect(); }
        }, { threshold: 0.4 }).observe(section);
    }
})();


// ============================================================
// OPTIONAL PERFORMANCE SETTINGS
// ============================================================

// Tell the browser that these elements will be transformed

const performanceElements = document.querySelectorAll(
    '.content, .container, .scroll-carousel__cards'
);


performanceElements.forEach(element => {

    element.style.willChange = 'transform';

});


// ============================================================
// LAST SECTION: white navbar
// As soon as the top of the screen reaches the pink section.
// ============================================================

(function () {
    const header = document.querySelector('header');
    const lastSection = document.getElementById('skills');

    function update() {
        if (!header || !lastSection) return;

        const top = lastSection.getBoundingClientRect().top;

        header.classList.toggle('nav-light', top <= header.offsetHeight * 0.5);
    }

    lenis.on('scroll', update);
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    window.addEventListener('load', update);
})();


// ============================================================
// CONTACT POP-UP
// ============================================================

(function () {
    const overlay = document.getElementById('contactOverlay');
    const win = document.getElementById('contactWindow');
    const closeBtn = document.getElementById('closeContact');
    const triggers = document.querySelectorAll('a[href="#contact"]');

    if (!overlay || !win || !closeBtn) return;

    let lastFocused = null;

    function openContact() {
        lastFocused = document.activeElement;
        overlay.classList.add('is-open');
        overlay.setAttribute('aria-hidden', 'false');
        if (typeof lenis !== 'undefined') lenis.stop();
        win.focus({ preventScroll: true });
    }

    function closeContact() {
        if (!overlay.classList.contains('is-open')) return;
        overlay.classList.remove('is-open');
        overlay.setAttribute('aria-hidden', 'true');
        if (typeof lenis !== 'undefined') lenis.start();
        if (lastFocused && lastFocused.focus) lastFocused.focus({ preventScroll: true });
    }

    triggers.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            openContact();
        });
    });

    closeBtn.addEventListener('click', closeContact);

    // click on the dark backdrop closes it
    overlay.addEventListener('click', (e) => {
        if (e.target === overlay) closeContact();
    });

    document.addEventListener('keydown', (e) => {
        if (!overlay.classList.contains('is-open')) return;

        if (e.key === 'Escape') {
            closeContact();
            return;
        }

        // keep Tab focus inside the pop-up
        if (e.key === 'Tab') {
            const items = win.querySelectorAll('a[href], button:not([disabled])');
            if (!items.length) return;
            const first = items[0];
            const last = items[items.length - 1];

            if (e.shiftKey && (document.activeElement === first || document.activeElement === win)) {
                e.preventDefault();
                last.focus();
            } else if (!e.shiftKey && document.activeElement === last) {
                e.preventDefault();
                first.focus();
            }
        }
    });
})();
