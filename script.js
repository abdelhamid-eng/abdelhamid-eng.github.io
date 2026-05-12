// ==========================================
// 1. التحكم في الشريط الجانبي (Sidebar Toggle)
// ==========================================
const sidebar = document.querySelector(".sidebar");
const sidebarBtn = document.querySelector("#btn");

// عند النقر على زر القائمة، قم بتبديل كلاس 'close'
sidebarBtn.addEventListener("click", () => {
    sidebar.classList.toggle("close");
});

// ==========================================
// 2. التحكم في الوضع الليلي/النهاري (Theme Toggle)
// ==========================================
const themeBtn = document.querySelector("#theme-btn");
const body = document.body;

// التحقق مما إذا كان الزائر قد اختار وضعاً معيناً في زيارة سابقة
const currentTheme = localStorage.getItem("theme");
if (currentTheme === "light") {
    body.classList.add("light-mode");
    themeBtn.classList.replace("bx-moon", "bx-sun"); // تغيير الأيقونة للشمس
}

// عند النقر على زر الوضع الليلي
themeBtn.addEventListener("click", () => {
    body.classList.toggle("light-mode");
    
    // تغيير الأيقونة وحفظ الإعداد في ذاكرة المتصفح
    if (body.classList.contains("light-mode")) {
        themeBtn.classList.replace("bx-moon", "bx-sun");
        localStorage.setItem("theme", "light"); // حفظ الوضع الفاتح
    } else {
        themeBtn.classList.replace("bx-sun", "bx-moon");
        localStorage.setItem("theme", "dark"); // حفظ الوضع الداكن
    }
});

// ==========================================
// 3. محرك البحث الداخلي الحي (Live Search)
// ==========================================
const searchInput = document.getElementById("searchInput");
const projectCards = document.querySelectorAll(".project-card");

searchInput.addEventListener("keyup", (event) => {
    // تحويل النص المكتوب إلى حروف صغيرة لتسهيل المقارنة
    const searchQuery = event.target.value.toLowerCase();

    // المرور على كل بطاقة في الموقع
    projectCards.forEach(card => {
        // جلب العنوان والوصف الخاص بكل بطاقة
        const title = card.querySelector("h3").innerText.toLowerCase();
        const description = card.querySelector("p").innerText.toLowerCase();

        // إذا كان العنوان أو الوصف يحتوي على كلمة البحث، أظهر البطاقة، وإلا أخفها
        if (title.includes(searchQuery) || description.includes(searchQuery)) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });
});

// ==========================================
// 4. تفعيل الروابط الجانبية (Smooth Scrolling)
// ==========================================
const navLinks = document.querySelectorAll('.nav-links li a');

navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
        // إغلاق القائمة الجانبية في شاشات الهواتف عند الضغط على رابط
        if(window.innerWidth <= 768) {
            sidebar.classList.add("close");
        }
    });
});
