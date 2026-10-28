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
    }, 3000);


    // ----------------------------
    // Loading animation letters
    // ----------------------------

    const letters = document.querySelectorAll('#loading-animation p');

    let currentIndex = 0;

    function showNextLetter() {
        if (!letters.length) return;

        letters.forEach(letter => {
            letter.style.display = 'none';
        });

        letters[currentIndex].style.display = 'block';

        currentIndex = (currentIndex + 1) % letters.length;

        setTimeout(showNextLetter, 300);
    }

    showNextLetter();


    



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

                start: 'top 70%',
                end: 'top 55%',

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

                    start: 'top 70%',
                    end: 'top 60%',

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
        'Microsoft Power Automate',
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

            <div class="card-status">
                ${text.status}
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


    function getDistance() {

        return Math.max(
            0,
            cardsContainer.scrollWidth -
            window.innerWidth +
            240
        );

    }


    function getStartPosition() {

        // Where the black section actually starts
        const sectionTop =
            container.getBoundingClientRect().top +
            window.scrollY;

        // Wait exactly 100vh after entering the black section
        return sectionTop + window.innerHeight;

    }


    function getEndPosition() {

        // Horizontal scrolling starts after 100vh
        // and continues for the remaining 200vh.
        return getStartPosition() + (window.innerHeight * 2);

    }


    gsap.to(cardsContainer, {

        x: () => -getDistance(),

        ease: 'none',

        scrollTrigger: {

            trigger: container,

            // EXACTLY 100vh after the black section starts
            start: () => getStartPosition(),

            // EXACTLY at the bottom of the 300vh section
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

const skillTabs = document.querySelectorAll('.skill-tab');
const skillPanels = document.querySelectorAll('.skill-panel');

skillTabs.forEach(tab => {

    tab.addEventListener('click', () => {

        const target = tab.dataset.tab;

        // Remove active state
        skillTabs.forEach(item => {
            item.classList.remove('active');
        });

        skillPanels.forEach(panel => {
            panel.classList.remove('active');
        });

        // Activate clicked tab
        tab.classList.add('active');

        const panel = document.getElementById(target);

        if (panel) {
            panel.classList.add('active');
        }

    });

});


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