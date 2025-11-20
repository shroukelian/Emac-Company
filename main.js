//main.js (النسخة النهائية والموحدة)
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navWrapper = document.querySelector('.main-nav-wrapper');
    const navLinks = document.querySelectorAll('.main-nav-wrapper nav ul li a');
    const header = document.querySelector('header');
    const heroSection = document.querySelector('#hero');

    // وظيفة فتح/إغلاق القائمة (تفعيل الهامبرغر)
    function toggleMenu() {
        if (navWrapper && hamburger) {
            navWrapper.classList.toggle('open');
            hamburger.classList.toggle('open');
        }
    }

    // === التفعيل الرئيسي لزر الهامبرغر (المشكلة هنا) ===
    if (hamburger) {
        // التأكد من أن الحدث مرتبط بشكل صحيح
        hamburger.addEventListener('click', toggleMenu);
    }

    // إغلاق القائمة عند النقر على أي رابط
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navWrapper.classList.contains('open')) {
                toggleMenu(); 
            }
        });
    });

    // === وظيفة الأنميشن عند التمرير (Intersection Observer) ===
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                // نوقف الانيميشن عند الخروج من مجال الرؤية (لإعادة تشغيله عند السكرول)
                entry.target.classList.remove('is-visible'); 
            }
        });
    }, {
        rootMargin: '0px',
        threshold: 0.1 
    });

    document.querySelectorAll('.animate-on-scroll').forEach(element => {
        observer.observe(element);
    });
    
    // وظيفة لعرض السنة الحالية في الفوتر
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    /* ملاحظة: تم حذف الكود القديم لـ toggleHeaderBackground من هذه النسخة */
});
//main.js (إعادة تفعيل وظيفة التمرير)

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navWrapper = document.querySelector('.main-nav-wrapper');
    const navLinks = document.querySelectorAll('.main-nav-wrapper nav ul li a');
    const header = document.querySelector('header');
    const heroSection = document.querySelector('#hero');

    // ... (وظيفة toggleMenu و event listeners سابقة) ...

    // === وظيفة تغيير لون الهيدر عند التمرير (Sticky Header) ===
    function toggleHeaderBackground() {
        if (!heroSection || !header) return;
        
        // إذا كنا على الصفحة الرئيسية (index.html) فقط نطبق تأثير التمرير
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            const scrollThreshold = 100; 
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    // ربط الوظيفة بحدث التمرير
    window.addEventListener('scroll', toggleHeaderBackground);
    // تشغيل الوظيفة عند التحميل للتأكد من الحالة الأولية
    toggleHeaderBackground();
    
    // ... (باقي كود الأنميشن وحقوق النشر) ...
});