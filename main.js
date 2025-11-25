//main.js (النسخة النهائية والموحدة)
document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navWrapper = document.querySelector('.main-nav-wrapper');
    const navLinks = document.querySelectorAll('.main-nav-wrapper nav ul li a');
    const header = document.querySelector('header');
    const heroSection = document.querySelector('#hero');

    function toggleMenu() {
        if (navWrapper && hamburger) {
            navWrapper.classList.toggle('open');
            hamburger.classList.toggle('open');
            document.body.classList.toggle('no-scroll');
        }
    }

    if (hamburger) {
        hamburger.addEventListener('click', toggleMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navWrapper.classList.contains('open')) {
                toggleMenu(); 
            }
        });
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
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
    
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }
    
    function toggleHeaderBackground() {
        if (!header) return;
        
        if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/')) {
            const scrollThreshold = 100; 
            if (window.scrollY > scrollThreshold) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        }
    }

    window.addEventListener('scroll', toggleHeaderBackground);
    toggleHeaderBackground();
});


document.addEventListener('DOMContentLoaded', () => {

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
                currentStepElement.style.display = 'none';
                nextStepElement.style.display = 'block';

                progressSteps.forEach(step => step.classList.remove('active'));
                
                for (let i = 1; i <= nextStep; i++) {
                    const stepElement = document.querySelector(`.booking-progress-bar .step[data-step="${i}"]`);
                    if (stepElement) {
                        stepElement.classList.add('active');
                    }
                }
                
                const percentage = (nextStep - 1) * 33.33; // 25%, 50%, 75%
                progressBarLine.style.width = `${percentage}%`;

                nextStepElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        }

        nextStepButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const currentStep = parseInt(e.target.closest('.booking-step').id.replace('step-', ''));
                const nextStep = parseInt(e.target.dataset.nextStep);
                
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
        
        const finalForm = document.getElementById('final-booking-form');
        if (finalForm) {
            finalForm.addEventListener('submit', (e) => {
                e.preventDefault();
                goToStep(3, 4); 
            });
        }
    }
    
});


document.addEventListener('DOMContentLoaded', () => {
    const bookingFormSection = document.getElementById('booking-form');
    if (bookingFormSection) {
      
        const calendarDays = document.querySelectorAll('.calendar-grid span');
        const timeSlots = document.querySelectorAll('.time-slot');
        const timeSlotTitle = document.querySelector('.time-slots-box h4');

        calendarDays.forEach(day => {
            day.addEventListener('click', () => {
                calendarDays.forEach(d => d.classList.remove('selected-day'));
                day.classList.add('selected-day');
                
                const dayNumber = day.textContent.trim();
                timeSlotTitle.textContent = `الثلاثاء ${dayNumber} نوفمبر (تم التحديد)`;

                timeSlots.forEach(slot => slot.classList.remove('disabled-slot'));
            });
        });
        
        timeSlots.forEach(slot => {
            slot.addEventListener('click', () => {
                timeSlots.forEach(s => s.classList.remove('selected-slot'));
                slot.classList.add('selected-slot');
                
                const nextBtn = document.querySelector('#step-2 .next-step-btn');
                nextBtn.disabled = false;
            });
        });

        const nextBtnStep2 = document.querySelector('#step-2 .next-step-btn');
        if (nextBtnStep2) {
             nextBtnStep2.disabled = true;
        }

        nextStepButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                const currentStep = parseInt(e.target.closest('.booking-step').id.replace('step-', ''));
                const nextStep = parseInt(e.target.dataset.nextStep);
        
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

});