const translations = {
    en: {
        "nav.projects": "Projects",
        "nav.about": "About Me",
        "nav.contact": "Contact",
        "hero.scroll": "SCROLL DOWN • SCROLL DOWN •",
        "hero.scrollLabel": "Scroll down",

        "intro.paragraph1.before": "I'm an IT & Business graduate who loves",
        "intro.paragraph1.highlight": "solving problems",
        "intro.paragraph1.after": "with technology.",

        "intro.paragraph2": "I'm always curious about how things work. Then I usually can't help myself from trying to make them better.",

        "intro.paragraph3.before": "I'm currently",
        "intro.paragraph3.highlight": "open to new opportunities",
        "intro.paragraph3.after": "where I can grow, build innovative solutions, and make an impact using technology.",
        "intro.moreAbout": "More about me :)",

        "project.close": "Close project",
        "project.previousImage": "Previous image",
        "project.nextImage": "Next image",
        "project.database": "PROJECT DATABASE",
        "project.equipment": "EQUIPMENT",

        projects: {
            orderProcessing: {
                title: "AI-Powered Order Processing",
                type: "WORK PROJECT",
                status: "COMPLETED",
                description: "Developed & implemented an order processing solution that transforms a previously manual workflow into an automated process, extracting order data from PDF, XML and Excel documents, structuring it for AI-processing, and enabling fully automated execution through a zero-click mode. The solution automated approximately 37% of manually processed orders, ~ 350 orders per month, significantly reducing manual data entry and streamlining order processing.",
                imageLabels: [
                    "SKETCH // AUTOMATION PROTOTYPE",
                    "SCREENSHOT // AUTOMATION FLOW"
                ]
            },

            aquaponics: {
                title: "AI Aquaponics System",
                type: "COMMUNITY PROJECT - SOUTH AFRICA",
                status: "COMPLETED",
                description: "Integrated and programmed an AI-powered farm management system that predicts how changing conditions, such as high temperatures, affect crop growth and helps determine optimal growing conditions. Automated tasks such as watering, temperature alerts, and shading curtains to reduce manual work and improve growing conditions.",
                imageLabels: [
                    "SKETCH // AQUAPONICS SYSTEM",
                    "PICTURE // AQUAPONICS FARM",
                    "POC // DIGITAL SOLUTION",
                    "PICTURE // PRESENTING THE PROJECT"
                ]
            },

            onboarding: {
                title: "Employee Onboarding",
                type: "WORK PROJECT",
                status: "COMPLETED",
                description: "Automated the onboarding process from the initial request to the employee’s first day. Connected HR, team leads, and other departments to manage contracts, employee records, notifications, and first-day preparations in one workflow.",
                imageLabels: [
                    "SKETCH // ONBOARDING EXPERIENCE",
                    "PROCESS // ONBOARDING EXPERIENCE",
                    "PROCESS // DETAILED ONBOARDING EXPERIENCE"
                ]
            },

            podTracking: {
                title: "POD Tracking & API Integration",
                type: "PROJECT",
                status: "COMPLETED",
                description: "An automated proof-of-delivery retrieval system that checks orders daily against carrier APIs to track delivery status and collect proof of delivery. Automatically stores delivery data and flags missing records or undelivered shipments, reducing manual checks and helping ensure audit compliance.",
                imageLabels: [
                    "SKETCH // POD RETRIEVAL",
                    "PROCESS // POD RETRIEVAL"
                ]
            },

            learningPlatform: {
                title: "Digital Learning Platform",
                type: "WORK PROJECT",
                status: "COMPLETED",
                description: "Managed a project to develop a proof of concept for an online learning platform that makes practical knowledge about tools such as Power Apps accessible to small and medium-sized businesses. Coordinated different project elements and stakeholders, including Fontys and the Municipality of Groningen, to create a learning experience that helps people gain practical skills and apply them in their work.",
                imageLabels: [
                    "SKETCH // DIGITAL LEARNING PLATFORM",
                    "PROTOTYPE // POWER APPS COURSE",
                    "GOAL // DIGITAL LEARNING ENVIRONMENT"
                ]
            },

            casualGolf: {
                title: "CasualGolf.",
                type: "START-UP",
                status: "FAILED :(",
                description: "Designed and built a webshop for a golf clothing brand, covering the store setup, product design, and online marketing. Worked across the full process, from creating the brand’s product offering and online store to developing marketing materials and promoting the brand.",
                imageLabels: [
                    "SCREENSHOT // CASUALGOLF EXPERIENCE"
                ]
            }
        },
        "cs.menuLabel": "Character menu",
        "cs.tab.character": "CHARACTER",
        "cs.tab.work": "WORK XP",
        "cs.tab.school": "SCHOOL",
        "cs.tab.skills": "SKILLS",
        "cs.tab.languages": "LANGUAGES",
        "cs.tab.sidequests": "SIDE QUESTS",

        "cs.class": "LVL 25 · IT & BUSINESS ENGINEER",
        "cs.stat.hp": "HP · ENERGY",
        "cs.stat.mp": "MP · CURIOSITY",
        "cs.stat.xp": "XP · NEXT LEVEL",

        "cs.hobbies.title": "▸ HOBBIES",
        "cs.hobbies.golf": "Golf",
        "cs.hobbies.music": "Music Production",
        "cs.hobbies.adventuring": "Adventuring",
        "cs.hobbies.video": "Videography",
        "cs.hobbies.fit": "Staying fit",

        "cs.equipped.title": "▸ EQUIPPED",
        "cs.equipped.ai": "Artificial Intelligence (AI)",
        "cs.equipped.reporting": "Reporting (Power BI/Grafana)",
        "cs.equipped.sql": "SQL & Database Management",

        "cs.more.title": "▸ MORE ABOUT ME",
        "cs.more.text": "I am a curious spirit, I often spend my evenings learning new things, trying out ideas and challenging myself. I love the concept of side-quests, always looking for new experiences, being spontaneous and saying yes to random stuff outside of my comfort-zone! :)",

        "cs.work.bechtle.date": "01-2025 — NOW",
        "cs.work.bechtle.title": "POWER PLATFORM ENGINEER & DATA ANALYST",
        "cs.work.bechtle.text": "Developing business automation solutions, data-driven reporting, and AI integrations to optimize internal processes and improve business efficiency. Progressed from Data Analyst to Business Analyst / Power Platform Engineer by identifying and implementing automation opportunities that significantly reduced manual workload and enabled the company to pursue tenders that were previously unfeasible.",
        "cs.work.amexio.title": "GRADUATION INTERN · CONSULTANCY",
        "cs.work.amexio.text": "Researched and developed a Reporting API that enables customers to independently create and configure Grafana dashboards. Translated stakeholder requirements into a scalable technical solution, replacing time-consuming, customer-specific manual dashboard creation with a more flexible and maintainable reporting process.",
        "cs.work.fontys.title": "RESEARCH INTERN · INTERACTION DESIGN",
        "cs.work.fontys.text": "In this internship I managed a project to find/create a space where Fontys is able to share their learning materials within the brainport area, so smaller businesses could easily find and create low-code apps or digital ideas that allow their company to grow.",
        "cs.work.casualgolf.title": "SHOPIFY MANAGER",
        "cs.work.casualgolf.text": "Managed day-to-day e-commerce operations, maintaining the Shopify storefront and executing marketing activities and visual content creation to support the brand's online presence.",

        "cs.school.fontysName": "@ FONTYS UNIVERSITY OF APPLIED SCIENCES",
        "cs.school.ict.text": "During my studies at Fontys I learned through a project-based approach, working with real companies' business challenges. Through these projects I gained experience in programming, databases, business processes, and project management, while learning how to apply IT to solve practical problems.",
        "cs.school.kea.title": "DIGITAL PRODUCT DEVELOPMENT",
        "cs.school.kea.text": "During my studies at KEA, I worked on several start-up projects, developing functional SaaS products. I applied design thinking, SaaS development, UI/UX design, and project management, while gaining experience in understanding why start-ups fail and how to turn ideas into viable products through collaboration with real start-ups in Copenhagen.",
        "cs.school.cert.title": "CERTIFICATIONS",
        "cs.school.cert.text": "List certificates I obtained during my professional career.",

        "cs.tag.apiDev": "API Development",
        "cs.tag.dataAnalysis": "Data Analysis",
        "cs.tag.research": "Research",
        "cs.tag.stakeholder": "Stakeholder Management",
        "cs.tag.toolSelection": "Tool selection",
        "cs.tag.digitalMarketing": "Digital Marketing",
        "cs.tag.ai": "Artificial Intelligence",
        "cs.tag.startupMgmt": "Start-up Management",

        "cs.skills.tech": "💻 TECH",
        "cs.skills.business": "💼 BUSINESS",
        "cs.skills.creative": "🎨 CREATIVE",
        "cs.skills.ai": "Artificial Intelligence",
        "cs.skills.processAuto": "Process automation & improvement",
        "cs.skills.bridging": "Bridging business & IT",
        "cs.skills.pm": "Project management",
        "cs.skills.stakeholder": "Stakeholder management",
        "cs.skills.webdesign": "Web design",
        "cs.skills.creativeApproach": "Trying different, creative approaches",
        "cs.passives.label": "PASSIVES:",
        "cs.passives.curious": "CURIOUS +20 INSPIRATION",
        "cs.passives.creative": "CREATIVE +10 IDEAS",
        "cs.passives.proactive": "PROACTIVE +25 GETTING THINGS DONE",

        "cs.lang.nl.name": "DUTCH",
        "cs.lang.nl.text": "As my native language, I am fluent in both written and spoken Dutch.",
        "cs.lang.nl.lvl": "NATIVE",
        "cs.lang.en.name": "ENGLISH",
        "cs.lang.en.text": "Having spoken English my whole life, I am fluent in both written and spoken English.",
        "cs.lang.en.lvl": "FLUENT",
        "cs.lang.code.name": "CODE",
        "cs.lang.code.text": "Proficient in JavaScript, HTML, CSS, Python, R, DAX & SQL.",
        "cs.lang.code.lvl": "LV. 4",
        "cs.lang.es.name": "SPANISH",
        "cs.lang.es.text": "Currently learning Spanish! (A2)",
        "cs.lang.es.lvl": "LOCKED",

        "cs.sq.portfolio.title": "CREATE A PERSONAL PORTFOLIO",
        "cs.sq.portfolio.text": "Learn new programming skills to create a space that reflects my creativity and professional abilities.",
        "cs.sq.golf.title": "BECOME A SCRATCH GOLFER",
        "cs.sq.golf.text": "Chasing those “perfect” golf rounds for a couple of years now. The spark hasn't faded yet.",
        "cs.sq.music.title": "RELEASE A MUSIC PROJECT",
        "cs.sq.music.text": "Turn a collection of ideas into something tangible people can engage with.",
        "cs.sq.travel.title": "TRAVEL THE WORLD",
        "cs.sq.travel.text": "I love engaging with different cultures and meeting new people!",
        "cs.sq.abroad.title": "WORK ABROAD",
        "cs.sq.abroad.text": "Take my skills somewhere new and experience working in another country.",
        "cs.meter.start": "START",
        "cs.meter.goal": "GOAL",
        "cs.meter.hcp": "HCP",
        "cs.meter.visited": "VISITED",

        dialogue: [
            "Hey, I'm Thijs. I've been obsessed with puzzles and problem-solving since I was a kid.",
            "That curiosity eventually led me to IT, where I get to explore new technologies and learn new things.",
            "I love taking on challenging problems and finding ways to make things work better.",
            "Thank you for visiting my portfolio! If you want to know more about me, you can scroll the cartridges for my projects, or use the icons up here to explore my story."
        ],
    },

    nl: {
        "nav.projects": "Projecten",
        "nav.about": "Over mij",
        "nav.contact": "Contact",
        "hero.scroll": "SCROLL OMLAAG • SCROLL OMLAAG •",
        "hero.scrollLabel": "Scroll omlaag",

        "intro.paragraph1.before": "Ik ben afgestudeerd in IT & Business en hou ervan om",
        "intro.paragraph1.highlight": "problemen op te lossen",
        "intro.paragraph1.after": "met technologie.",

        "intro.paragraph2": "Ik ben altijd nieuwsgierig naar hoe dingen werken. Daarna kan ik het meestal niet laten om te kijken hoe ze geoptimaliseerd kunnen worden. :)",

        "intro.paragraph3.before": "Ik sta momenteel",
        "intro.paragraph3.highlight": "op zoek naar nieuwe uitdagingen",
        "intro.paragraph3.after": "waarin ik mezelf kan ontwikkelen, innovatieve oplossingen kan bouwen en met technologie impact kan maken.",

        "intro.moreAbout": "Meer over mij :)",

        "project.close": "Project sluiten",
        "project.previousImage": "Vorige afbeelding",
        "project.nextImage": "Volgende afbeelding",
        "project.database": "PROJECTDATABASE",
        "project.equipment": "GEBRUIKTE TECHNOLOGIE",

        projects: {
            orderProcessing: {
                title: "Order-verwerking met AI",
                type: "WERKPROJECT",
                status: "AFGEROND",
                description: "Een oplossing ontwikkeld en gebouwd die de verwerking van orders automatiseert. De oplossing leest ordergegevens uit PDF-, XML- en Excel-bestanden en verwerkt deze automatisch, zonder handmatige stappen. Ongeveer 37% van de orders kan zo automatisch worden verwerkt, naar schatting 350 per maand. Dit bespaart handmatig werk en maakt de orderverwerking efficiënter.",                imageLabels: [
                    "SCHETS // AUTOMATISERINGSPROTOTYPE",
                    "SCREENSHOT // AUTOMATISERINGSFLOW"
                ]
            },

            aquaponics: {
                title: "AI aquaponics systeem",
                type: "COMMUNITYPROJECT - ZUID-AFRIKA",
                status: "AFGEROND",
                    description: "Een AI-systeem ontwikkeld en gebouwd voor het beheer van een aquaponicsysteem. Het systeem voorspelt hoe veranderingen, zoals hoge temperaturen, de groei van gewassen beïnvloeden en helpt de beste groeiomstandigheden te bepalen. Ook zijn taken zoals bewatering, temperatuuralarmen en schaduwdoeken geautomatiseerd. Dit vermindert handmatig werk en verbetert de groei van gewassen.",                imageLabels: [
                    "SCHETS // AQUAPONICASYSTEEM",
                    "FOTO // AQUAPONICABOERDERIJ",
                    "POC // DIGITALE OPLOSSING",
                    "FOTO // PRESENTATIE VAN HET PROJECT"
                ]
            },

            onboarding: {
                title: "Medewerker onboarding",
                type: "WERKPROJECT",
                status: "AFGEROND",
                description: "Het onboardingproces geautomatiseerd vanaf de eerste aanvraag tot de eerste werkdag van de medewerker. HR, teamleiders en andere afdelingen zijn met elkaar verbonden om contracten, personeelsgegevens, meldingen en voorbereidingen voor de eerste werkdag binnen één workflow te beheren.",
                imageLabels: [
                    "SCHETS // ONBOARDINGS AUTOMATISERING",
                    "PROCES // ONBOARDINGS AUTOMATISERING",
                    "PROCES // GEDETAILLEERDE ONBOARDINGS AUTOMATISERING"
                ]
            },

            podTracking: {
                title: "POD-tracking & API-integratie",
                type: "PROJECT",
                status: "AFGEROND",
                description: "Een geautomatiseerd systeem voor het ophalen van afleverbewijzen dat dagelijks orders controleert via vervoerders-API's om de bezorgstatus te volgen en afleverbewijzen te verzamelen. Het systeem slaat bezorggegevens automatisch op en signaleert ontbrekende gegevens of niet-afgeleverde zendingen. Hierdoor zijn minder handmatige controles nodig en wordt de naleving van auditvereisten ondersteund.",
                imageLabels: [
                    "SCHETS // OPHALEN VAN AFLEVERBEWIJZEN",
                    "PROCES // OPHALEN VAN AFLEVERBEWIJZEN"
                ]
            },

            learningPlatform: {
                title: "Digitale Leer-Platform",
                type: "WERKPROJECT",
                status: "AFGEROND",
                description: "Een project geleid voor de ontwikkeling van een proof of concept voor een online leerplatform dat praktische kennis over tools zoals Power Apps toegankelijk maakt voor kleine en middelgrote bedrijven. Verschillende projectonderdelen en belanghebbenden, waaronder Fontys en de gemeente Groningen, zijn gecoördineerd om een leerervaring te ontwikkelen waarmee mensen praktische vaardigheden opdoen en deze in hun werk kunnen toepassen.",
                imageLabels: [
                    "SKETCH // DIGITAAL LEERPLATFORM",
                    "PROTOTYPE // POWER APPS CURSUS",
                    "GOAL // DIGITAAL LEERPLATFORM"
                ]
            },

            casualGolf: {
                title: "CasualGolf",
                type: "START-UP",
                status: "NIET GESLAAGD :(",
                description: "Een webshop voor een golfkledingmerk ontworpen en gebouwd, inclusief de inrichting van de winkel, productontwerp en online marketing. Het volledige proces uitgevoerd: van het samenstellen van het productaanbod en bouwen van de webshop tot het ontwikkelen van marketingmateriaal en promotie van het merk.",
                imageLabels: [
                    "SCREENSHOT // CASUALGOLF-ERVARING"
                ]
            }
        },
        "cs.menuLabel": "Karaktermenu",
        "cs.tab.character": "KARAKTER",
        "cs.tab.work": "WERKERVARING",
        "cs.tab.school": "OPLEIDING",
        "cs.tab.skills": "VAARDIGHEDEN",
        "cs.tab.languages": "TALEN",
        "cs.tab.sidequests": "SIDE QUESTS",

        "cs.class": "LVL 25 · IT & BUSINESS ENGINEER",
        "cs.stat.hp": "HP · ENERGIE",
        "cs.stat.mp": "MP · NIEUWSGIERIGHEID",
        "cs.stat.xp": "XP · VOLGEND LEVEL",

        "cs.hobbies.title": "▸ HOBBY'S",
        "cs.hobbies.golf": "Golf",
        "cs.hobbies.music": "Muziek produceren",
        "cs.hobbies.adventuring": "Avonturieren",
        "cs.hobbies.video": "Videografie",
        "cs.hobbies.fit": "Fit blijven",

        "cs.equipped.title": "▸ UITRUSTING",
        "cs.equipped.ai": "Artificial Intelligence (AI)",
        "cs.equipped.reporting": "Reporting (Power BI/Grafana)",
        "cs.equipped.sql": "SQL & databasebeheer",

        "cs.more.title": "▸ MEER OVER MIJ",
        "cs.more.text": "Ik ben een nieuwsgierig type: ik besteed mijn avonden vaak met nieuwe dingen leren, creatief zijn en mezelf uitdagen. Ik ben altijd op zoek naar nieuwe ervaringen, ik hou van spontaan zijn en ja zeggen tegen willekeurige dingen buiten mijn comfortzone! :)",

        "cs.work.bechtle.date": "01-2025 — NU",
        "cs.work.bechtle.title": "POWER PLATFORM ENGINEER & DATA-ANALIST",
        "cs.work.bechtle.text": "Ontwikkelen van automatiseringen, datagedreven rapportages en AI-integraties om interne processen te optimaliseren en handmatig werk te verkleinen. Ik ben doorgegroeid van Data Analyst naar Business Analyst / Power Platform Engineer nadat ik veel automatiseringskansen gesignaleerd had en merkte dat pro-actieve oplossingen meer kansen bieden dan rapporten. Ik heb zelf het handmatige werk aanzienlijk verkleind en heb het bedrijf in staat gesteld om aanbestedingen aan te gaan die eerder niet haalbaar waren.",
        "cs.work.amexio.title": "AFSTUDEERSTAGIAIR · CONSULTANCY",
        "cs.work.amexio.text": "Onderzoek gedaan naar en een API ontwikkeld waarmee klanten zelfstandig Grafana-dashboards kunnen aanmaken en configureren. Hierbij heb ik wensen van stakeholders vertaald naar een schaalbare technische oplossing, die het kostbare, klantspecifieke handmatig maken van dashboards vervangt door een flexibeler en beter onderhoudbaar rapportageproces.",
        "cs.work.fontys.title": "ONDERZOEKSSTAGIAIR · INTERACTION DESIGN",
        "cs.work.fontys.text": "Tijdens deze stage leidde ik een project om een plek te vinden of te creëren waar Fontys haar leermateriaal kan delen binnen de Brainportregio, zodat kleinere bedrijven eenvoudig low-code apps en digitale ideeën kunnen vinden en bouwen waarmee hun bedrijf kan groeien.",
        "cs.work.casualgolf.title": "SHOPIFY MANAGER",
        "cs.work.casualgolf.text": "Voor dit bedrijf heb ik een e-commerce shop gemaakt en was ik verantwoordelijk voor het beheer hiervan, zowel als het onderhouden van de webshop, het uitvoeren van marketingactiviteiten en productontwikkeling.",

        "cs.school.fontysName": "@ FONTYS HOGESCHOLEN",
        "cs.school.ict.text": "Tijdens mijn studie aan Fontys leerde ik projectmatig, door te werken aan echte bedrijfsuitdagingen. Via deze projecten deed ik ervaring op met programmeren, databases, bedrijfsprocessen en projectmanagement, en leerde ik hoe je IT toepast om praktische problemen op te lossen.",
        "cs.school.kea.title": "DIGITALE PRODUCTONTWIKKELING",
        "cs.school.kea.text": "Tijdens mijn studie aan KEA werkte ik aan diverse start-upprojecten waarin ik werkende SaaS-producten ontwikkelde. Ik paste design thinking, SaaS-ontwikkeling, UI/UX-design en projectmanagement toe en leerde waarom start-ups falen en hoe je ideeën samen met echte Kopenhaagse start-ups omzet in producten.",
        "cs.school.cert.title": "CERTIFICERINGEN",
        "cs.school.cert.text": "Een overzicht van de certificaten die ik tijdens mijn loopbaan heb behaald.",

        "cs.tag.apiDev": "API-ontwikkeling",
        "cs.tag.dataAnalysis": "Data-analyse",
        "cs.tag.research": "Onderzoek",
        "cs.tag.stakeholder": "Stakeholdermanagement",
        "cs.tag.toolSelection": "Toolselectie",
        "cs.tag.digitalMarketing": "Digitale marketing",
        "cs.tag.ai": "Kunstmatige intelligentie",
        "cs.tag.startupMgmt": "Start-upmanagement",

        "cs.skills.tech": "💻 TECH",
        "cs.skills.business": "💼 BUSINESS",
        "cs.skills.creative": "🎨 CREATIEF",
        "cs.skills.ai": "Artificial Intelligence",
        "cs.skills.processAuto": "Procesautomatisering & -verbetering",
        "cs.skills.bridging": "Brug slaan tussen business & IT",
        "cs.skills.pm": "Projectmanagement",
        "cs.skills.stakeholder": "Stakeholdermanagement",
        "cs.skills.webdesign": "Webdesign",
        "cs.skills.creativeApproach": "Andere, creatieve aanpakken uitproberen",
        "cs.passives.label": "PASSIVE SKILLS:",
        "cs.passives.curious": "NIEUWSGIERIG +20 INSPIRATIE",
        "cs.passives.creative": "CREATIEF +10 IDEEËN",
        "cs.passives.proactive": "PROACTIEF +25 DINGEN GEDAAN KRIJGEN",

        "cs.lang.nl.name": "NEDERLANDS",
        "cs.lang.nl.text": "Als Brabander spreek ik vloeiend Nederlands. Althans, dat vind ik zelf. De rest van Nederland heeft soms ondertiteling nodig.",
        "cs.lang.nl.lvl": "MOEDERTAAL",
        "cs.lang.en.name": "ENGELS",
        "cs.lang.en.text": "Ik spreek al mijn hele leven Engels en beheers het vloeiend, zowel schriftelijk als mondeling.",
        "cs.lang.en.lvl": "VLOEIEND",
        "cs.lang.code.name": "CODE",
        "cs.lang.code.text": "Vaardig in JavaScript, HTML, CSS, Python, R, DAX & SQL.",
        "cs.lang.code.lvl": "LVL. 4",
        "cs.lang.es.name": "SPAANS",
        "cs.lang.es.text": "Ik ben momenteel Spaans aan het leren! (A2)",
        "cs.lang.es.lvl": "LOCKED",

        "cs.sq.portfolio.title": "EEN PERSOONLIJK PORTFOLIO MAKEN",
        "cs.sq.portfolio.text": "Nieuwe skills leren om een plek te creëren die mijn creativiteit en professionele kwaliteiten laat zien!!",
        "cs.sq.golf.title": "SCRATCHGOLFER WORDEN",
        "cs.sq.golf.text": "Ookal lukt het niet om die ''perfecte'' golfronde te lopen, vind ik het nog steeds even leuk als toen ik begon!",
        "cs.sq.music.title": "EEN MUZIEKPROJECT UITBRENGEN",
        "cs.sq.music.text": "Een verzameling ideeën omzetten in iets tastbaars waar mensen naar kunnen luisteren.",
        "cs.sq.travel.title": "DE WERELD REIZEN",
        "cs.sq.travel.text": "Ik krijg enorm veel energie om meer te leren over andere culturen en nieuwe mensen te ontmoeten!",
        "cs.sq.abroad.title": "IN HET BUITENLAND WERKEN",
        "cs.sq.abroad.text": "Mijzelf nog meer uitdagen door een werkplek te vinden in het buitenland en daar voor een aantal jaar te werken (het liefst in een wereldstad!).",
        "cs.meter.start": "START",
        "cs.meter.goal": "DOEL",
        "cs.meter.hcp": "HCP",
        "cs.meter.visited": "BEZOCHT",

        dialogue: [
            "Hoi, ik ben Thijs. Ik ben al sinds kinds af aan gek op puzzels en problemen oplossen.",
            "Die speelse nieuwsgierigheid bracht me uiteindelijk bij IT, waar ik nieuwe technologieën kan ontdekken en steeds nieuwe dingen kan leren!",
            "Ik pak graag moeilijke problemen aan en ben constant op zoek naar efficientere manieren om herhaalbare taken te voltooien.",
            "Leuk dat je mijn portfolio bezoekt! Wil je meer over mij weten? Scroll door de kaarten hierboven voor de projecten die ik heb uitgevoerd, of gebruik de icoontjes hierboven voor meer info over mijzelf :)"
        ],
    }
};