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
