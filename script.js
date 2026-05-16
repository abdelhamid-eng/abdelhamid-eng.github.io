// ==========================================
// 1. التحكم في الشريط الجانبي (Sidebar Toggle)
// ==========================================
const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector("#btn");

if (sidebarBtn && sidebar) {
    sidebarBtn.addEventListener("click", (e) => {
        sidebar.classList.toggle("close");
        e.stopPropagation(); // منع تداخل الأوامر
    });
}

// ==========================================
// 2. التحكم في الوضع الليلي/النهاري (Theme Toggle)
// ==========================================
const themeBtn = document.querySelector("#theme-btn");
const body = document.body;

if (themeBtn) {
    const currentTheme = localStorage.getItem("theme");
    if (currentTheme === "light") {
        body.classList.add("light-mode");
        themeBtn.classList.replace("bx-moon", "bx-sun");
    }

    themeBtn.addEventListener("click", () => {
        body.classList.toggle("light-mode");
        if (body.classList.contains("light-mode")) {
            themeBtn.classList.replace("bx-moon", "bx-sun");
            localStorage.setItem("theme", "light");
        } else {
            themeBtn.classList.replace("bx-sun", "bx-moon");
            localStorage.setItem("theme", "dark");
        }
    });
}

// ==========================================
// 3. محرك البحث الداخلي الحي (Live Search)
// ==========================================
const searchInput = document.getElementById("searchInput");
const projectCards = document.querySelectorAll(".project-card");

if (searchInput) {
    searchInput.addEventListener("keyup", (event) => {
        const searchQuery = event.target.value.toLowerCase();

        projectCards.forEach(card => {
            const titleElement = card.querySelector("h3");
            const descElement = card.querySelector("p");
            
            const title = titleElement ? titleElement.innerText.toLowerCase() : "";
            const description = descElement ? descElement.innerText.toLowerCase() : "";

            if (title.includes(searchQuery) || description.includes(searchQuery)) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
}

// ==========================================
// 4. تفعيل الروابط الجانبية للشاشات الصغيرة
// ==========================================
const navLinks = document.querySelectorAll('.nav-links li a');
navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        if(window.innerWidth <= 768 && sidebar) {
            sidebar.classList.add("close");
        }
    });
});

// ==========================================
// 5. نظام النوافذ المنبثقة والمجلدات (Modal Navigation)
// ==========================================
let modalHistory = [];

function openModal(title, contentId) {
    modalHistory = [{title: title, id: contentId}]; 
    renderModal();
    const modal = document.getElementById('myModal');
    if (modal) modal.style.display = 'flex';
}

function navigateModal(title, contentId) {
    modalHistory.push({title: title, id: contentId}); 
    renderModal();
}

function goBackModal() {
    modalHistory.pop(); 
    renderModal();
}

function renderModal() {
    if (modalHistory.length === 0) return;
    
    const current = modalHistory[modalHistory.length - 1];
    const titleElement = document.getElementById('modalTitle');
    const contentSource = document.getElementById(current.id);
    const dynamicContent = document.getElementById('modalDynamicContent');

    if (!contentSource) {
        if (dynamicContent) dynamicContent.innerHTML = "<p style='color:#ef4444;'>Contenu introuvable...</p>";
        return;
    }

    if (titleElement) {
        if (modalHistory.length > 1) {
            titleElement.innerHTML = "<button onclick='goBackModal()' class='back-btn'><i class='bx bx-arrow-back'></i> Retour</button> <span style='display:block; margin-top:10px;'>" + current.title + "</span>";
        } else {
            titleElement.innerHTML = current.title;
        }
    }
if (dynamicContent) {
        dynamicContent.innerHTML = contentSource.innerHTML;
    }
}

function closeModal() {
    const modal = document.getElementById("myModal");
    if (modal) modal.style.display = "none";
}

window.onclick = function(event) {
    let modal = document.getElementById("myModal");
    if (event.target === modal) {
        closeModal();
    }
}

// ==========================================
// 6. الإغلاق التلقائي للقائمة في الهواتف عند تحميل الصفحة
// ==========================================
window.addEventListener('load', () => {
    if (window.innerWidth <= 768 && sidebar) {
        sidebar.classList.add("close");
    }
});

// ==========================================
// 7. إغلاق القائمة الجانبية عند اللمس خارجها (للهواتف)
// ==========================================
document.addEventListener("click", (e) => {
    if (window.innerWidth <= 768 && sidebar && !sidebar.classList.contains("close")) {
        // إذا كان مكان اللمس ليس داخل القائمة، وليس على الزر نفسه
        if (!sidebar.contains(e.target) && e.target !== sidebarBtn && !sidebarBtn.contains(e.target)) {
            sidebar.classList.add("close");
        }
    }
});

// ==========================================
// 8. تأثير الآلة الكاتبة (Typing Effect)
// ==========================================
const textArray = ["Élève Ingénieur (CPGE TSI)", "Développeur Python", "Spécialiste Web Scraping"];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
    const typedTextSpan = document.getElementById("typed-text");
    if (!typedTextSpan) return;

    const currentText = textArray[textIndex];
    
    if (isDeleting) {
        typedTextSpan.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typedTextSpan.textContent = currentText.substring(0, charIndex + 1);
        charIndex++;
    }

    let typeSpeed = isDeleting ? 50 : 100;

    if (!isDeleting && charIndex === currentText.length) {
        typeSpeed = 2000; // التوقف قليلاً بعد اكتمال الكلمة
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        textIndex = (textIndex + 1) % textArray.length;
        typeSpeed = 500; // التوقف قبل كتابة الكلمة الجديدة
    }

    setTimeout(typeEffect, typeSpeed);
}

// تشغيل التأثير عند تحميل الصفحة
window.addEventListener("load", typeEffect);


// ==========================================
// 9. تحريك عدادات الإنجاز (Number Counters)
// ==========================================
const counters = document.querySelectorAll('.counter');

counters.forEach(counter => {
    counter.innerText = '0';
    const updateCounter = () => {
        const target = +counter.getAttribute('data-target');
        const c = +counter.innerText;
        const increment = target / 50; // سرعة العداد

        if (c < target) {
            counter.innerText = `${Math.ceil(c + increment)}`;
            setTimeout(updateCounter, 30);
        } else {
            counter.innerText = target + "+"; // إضافة علامة + في النهاية
        }
    };
    
    // تشغيل العداد بعد ثانية واحدة من تحميل الصفحة
    setTimeout(updateCounter, 1000); 
});


// ==========================================
// 10. محرك الظهور السينمائي عند التمرير (Scroll Reveal)
// ==========================================
// أولاً: نحدد العناصر التي نريد تطبيق التأثير عليها تلقائياً
const elementsToReveal = document.querySelectorAll('.stat-box, .project-card, .section-divider, .about-container, .folder-card');

// نضيف كلاس reveal لها جميعاً
elementsToReveal.forEach(el => el.classList.add('reveal'));

// إعدادات المراقب الذكي
const revealOptions = {
    threshold: 0.15, // يظهر العنصر عندما يظهر 15% منه في الشاشة
    rootMargin: "0px 0px -50px 0px" 
};

const revealOnScroll = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        
        // إذا ظهر العنصر في الشاشة، نضيف له كلاس active ليتحرك
        entry.target.classList.add('active');
        
        // نتوقف عن مراقبته لكي لا يعيد الحركة مرة أخرى عند الصعود
        observer.unobserve(entry.target); 
    });
}, revealOptions);

// تشغيل المراقب على جميع العناصر
document.querySelectorAll('.reveal').forEach(el => revealOnScroll.observe(el));


// ==========================================
// شاشة الدخول السينمائية (Splash Screen)
// ==========================================
window.addEventListener('load', () => {
    const splashScreen = document.getElementById('splashScreen');
    
    if (splashScreen) {
        // ننتظر ثانية واحدة (1000 ملي ثانية) لكي يرى الزائر الشاشة
        setTimeout(() => {
            // إضافة الكلاس الذي يسحب الشاشة للأعلى
            splashScreen.classList.add('hidden');
            
            // بعد انتهاء الحركة (0.8 ثانية)، نقوم بإزالة الشاشة تماماً لكي لا تعيق النقر
            setTimeout(() => {
                splashScreen.style.display = 'none';
            }, 800);
            
        }, 1000); 
    }
});
