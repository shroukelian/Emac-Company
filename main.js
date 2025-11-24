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
            // منع التمرير على الخلفية عند فتح القائمة
            document.body.classList.toggle('no-scroll');
        }
    }

    // === التفعيل الرئيسي لزر الهامبرغر ===
    if (hamburger) {
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
    
    // === وظيفة تغيير لون الهيدر عند التمرير (Sticky Header) ===
    function toggleHeaderBackground() {
        if (!header) return;
        
        // إذا كنا على الصفحة الرئيسية (index.html) أو المسار الأساسي فقط نطبق تأثير التمرير
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
});

// main.js (إضافة منطق الخطوات المتعددة)

document.addEventListener('DOMContentLoaded', () => {
    // ... (الكود السابق) ...

    // *******************************************************
    // === Multi-Step Form Logic ===
    // *******************************************************
    const bookingFormSection = document.getElementById('booking-form');
    if (bookingFormSection) {
        const nextStepButtons = document.querySelectorAll('.next-step-btn');
        const prevStepButtons = document.querySelectorAll('.prev-step-btn');
        const progressSteps = document.querySelectorAll('.booking-progress-bar .step');
        const progressBarLine = document.querySelector('.booking-progress-bar .progress-line');

        function goToStep(currentStep, nextStep) {
            const currentStepElement = document.getElementById(`step-${currentStep}`);
            const nextStepElement = document.getElementById(`step-${nextStep}`);

            if (currentStepElement && nextStepElement) {
                // إخفاء الخطوة الحالية وإظهار التالية
                currentStepElement.style.display = 'none';
                nextStepElement.style.display = 'block';

                // تحديث شريط التقدم (اللون والمؤشر)
                progressSteps.forEach(step => step.classList.remove('active'));
                
                for (let i = 1; i <= nextStep; i++) {
                    const stepElement = document.querySelector(`.booking-progress-bar .step[data-step="${i}"]`);
                    if (stepElement) {
                        stepElement.classList.add('active');
                    }
                }
                
                // تحديث شريط التعبئة
                const percentage = (nextStep - 1) * 33.33; // 25%, 50%, 75%
                progressBarLine.style.width = `${percentage}%`;

                // التمرير لأعلى الصفحة الجديدة
                nextStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        nextStepButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const currentStep = parseInt(e.target.closest('.booking-step').id.replace('step-', ''));
                const nextStep = parseInt(e.target.dataset.nextStep);
                
                // إضافة التحقق من صحة الحقول (بسيط)
                if (currentStep === 1) {
                    const service = document.getElementById('b-service').value;
                    const location = document.getElementById('b-location').value;
                    if (!service || !location) {
                        alert('الرجاء اختيار الخدمة والموقع للمتابعة.');
                        return;
                    }
                }

                goToStep(currentStep, nextStep);
            });
        });
        
        prevStepButtons.forEach(button => {
             button.addEventListener('click', (e) => {
                const currentStep = parseInt(e.target.closest('.booking-step').id.replace('step-', ''));
                const prevStep = parseInt(e.target.dataset.prevStep);
                goToStep(currentStep, prevStep);
            });
        });
        
        // محاكاة إرسال النموذج في الخطوة 3
        const finalForm = document.getElementById('final-booking-form');
        if (finalForm) {
            finalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                goToStep(3, 4); 
            });
        }
    }
    
    // ... (بقية كود main.js) ...
});

// main.js (إضافة تفاعلية للتقويم واختيار الوقت)

document.addEventListener('DOMContentLoaded', () => {
    // ... (الكود السابق) ...

    // *******************************************************
    // === Multi-Step Form Logic (التكملة) ===
    // *******************************************************
    const bookingFormSection = document.getElementById('booking-form');
    if (bookingFormSection) {
        // ... (بقية كود الخطوات) ...

        // **********************************************
        // === Step 2: Calendar and Time Slots Logic ===
        // **********************************************
        const calendarDays = document.querySelectorAll('.calendar-grid span');
        const timeSlots = document.querySelectorAll('.time-slot');
        const timeSlotTitle = document.querySelector('.time-slots-box h4');

        // 1. تحديد يوم من التقويم
        calendarDays.forEach(day => {
            day.addEventListener('click', () => {
                // إزالة التحديد من جميع الأيام
                calendarDays.forEach(d => d.classList.remove('selected-day'));
                // إضافة التحديد لليوم المضغوط
                day.classList.add('selected-day');
                
                // تحديث عنوان الأوقات (محاكاة)
                const dayNumber = day.textContent.trim();
                timeSlotTitle.textContent = `الثلاثاء ${dayNumber} نوفمبر (تم التحديد)`;

                // تفعيل الأوقات (محاكاة ظهور الأوقات)
                timeSlots.forEach(slot => slot.classList.remove('disabled-slot'));
            });
        });
        
        // 2. تحديد وقت من الأوقات المتاحة
        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                // إزالة التحديد من جميع الأوقات
                timeSlots.forEach(s => s.classList.remove('selected-slot'));
                // إضافة التحديد للوقت المضغوط
                slot.classList.add('selected-slot');
                
                // تفعيل زر "التالي" هنا (إذا أردت جعل التحديد شرطاً)
                const nextBtn = document.querySelector('#step-2 .next-step-btn');
                nextBtn.disabled = false;
            });
        });

        // جعل زر "التالي" في الخطوة 2 معطلاً بشكل افتراضي
        const nextBtnStep2 = document.querySelector('#step-2 .next-step-btn');
        if (nextBtnStep2) {
             nextBtnStep2.disabled = true;
        }

        // إضافة شرط بسيط للتحقق قبل الانتقال إلى الخطوة 3
        nextStepButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const currentStep = parseInt(e.target.closest('.booking-step').id.replace('step-', ''));
                const nextStep = parseInt(e.target.dataset.nextStep);
                
                // ... (تحقق الخطوة 1 السابق) ...

                // **تحقق الخطوة 2: اختيار الوقت**
                if (currentStep === 2) {
                    const selectedDay = document.querySelector('.calendar-grid .selected-day');
                    const selectedSlot = document.querySelector('.time-slot.selected-slot');
                    
                    if (!selectedDay || !selectedSlot) {
                        alert('الرجاء اختيار اليوم والوقت المناسبين للمتابعة.');
                        return;
                    }
                }
                
                goToStep(currentStep, nextStep);
            });
        });
    }

    // ... (بقية كود main.js) ...
});