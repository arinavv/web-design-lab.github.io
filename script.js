document.addEventListener('DOMContentLoaded', () => {
    
    const reveal = () => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('active'); });
        }, { threshold: 0.1 });
        document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    };
    reveal();

    const track = document.getElementById('slider-track');
    if (track) {
        const items = Array.from(track.querySelectorAll('.slider-item'));
        items.forEach(item => track.appendChild(item.cloneNode(true)));
        items.forEach(item => track.insertBefore(item.cloneNode(true), track.firstChild));

        const updateSlider = () => {
            const centerX = window.innerWidth / 2;
            const scrollLeft = track.scrollLeft;
            const singleWidth = track.scrollWidth / 3;
            if (scrollLeft <= 1) track.scrollLeft = singleWidth;
            if (scrollLeft + track.offsetWidth >= track.scrollWidth - 1) track.scrollLeft = singleWidth;
            track.querySelectorAll('.slider-item').forEach(item => {
                const rect = item.getBoundingClientRect();
                const dist = Math.abs(centerX - (rect.left + rect.width / 2));
                const proximity = Math.max(0, 1 - dist / (window.innerWidth * 0.6));
                item.style.transform = `scale(${0.85 + (0.15 * proximity)})`;
                item.style.opacity = 0.4 + (0.6 * proximity);
            });
        };
        track.addEventListener('scroll', updateSlider);
        setTimeout(() => { track.scrollLeft = track.scrollWidth / 3; updateSlider(); }, 100);

        const arrowLeft = document.querySelector('.arrow-left');
        const arrowRight = document.querySelector('.arrow-right');
        let autoScrollInterval = null;
        let isHovering = false;

        const scrollOneSlide = (direction) => {
            const slide = track.querySelector('.slider-item');
            if (!slide) return;
            const slideWidth = slide.offsetWidth;
            const slideMargin = parseFloat(getComputedStyle(slide).marginLeft) || 0;
            const scrollAmount = slideWidth + (slideMargin * 2);
            const newScrollLeft = track.scrollLeft + (direction === 'right' ? scrollAmount : -scrollAmount);
            track.scrollTo({ left: newScrollLeft, behavior: 'smooth' });
        };
        if (arrowLeft) arrowLeft.addEventListener('click', (e) => { e.stopPropagation(); scrollOneSlide('left'); resetAutoScrollTimer(); });
        if (arrowRight) arrowRight.addEventListener('click', (e) => { e.stopPropagation(); scrollOneSlide('right'); resetAutoScrollTimer(); });

        const startAutoScroll = () => { if (autoScrollInterval) clearInterval(autoScrollInterval); autoScrollInterval = setInterval(() => { if (!isHovering) scrollOneSlide('right'); }, 4000); };
        const stopAutoScroll = () => { if (autoScrollInterval) { clearInterval(autoScrollInterval); autoScrollInterval = null; } };
        const resetAutoScrollTimer = () => { stopAutoScroll(); startAutoScroll(); };
        const pauseAutoScroll = () => { isHovering = true; };
        const resumeAutoScroll = () => { isHovering = false; };

        track.addEventListener('mouseenter', pauseAutoScroll);
        track.addEventListener('mouseleave', resumeAutoScroll);
        if (arrowLeft) { arrowLeft.addEventListener('mouseenter', pauseAutoScroll); arrowLeft.addEventListener('mouseleave', resumeAutoScroll); }
        if (arrowRight) { arrowRight.addEventListener('mouseenter', pauseAutoScroll); arrowRight.addEventListener('mouseleave', resumeAutoScroll); }
        startAutoScroll();
    }

    // модалка заказа
    const modal = document.getElementById('order-modal');
    const closeBtn = document.querySelector('.close-modal');
    document.querySelectorAll('.p-card a, .btn-apple-sm').forEach(btn => {
        btn.addEventListener('click', (e) => { e.preventDefault(); modal.classList.add('active'); document.body.style.overflow = 'hidden'; });
    });
    const closeModal = () => { modal.classList.remove('active'); document.body.style.overflow = ''; };
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (modal) modal.addEventListener('click', (e) => { if(e.target === modal) closeModal(); });

    const heroBtn = document.getElementById('main-dna-btn');
    if (heroBtn) {
        heroBtn.addEventListener('click', function() {
            this.classList.add('is-loading');
            setTimeout(() => { this.classList.remove('is-loading'); this.querySelector('.btn-text').textContent = "Готово ✓"; }, 2000);
        });
    }

    // ========== КЕЙСЫ С ГАЛЕРЕЕЙ (4 изображения) ==========
    const caseModal = document.getElementById('case-modal');
    const caseClose = document.querySelector('.case-close');
    const caseTitle = document.getElementById('case-title');
    const caseCodeElem = document.getElementById('case-code');
    const caseFullDesc = document.getElementById('case-full-description');
    const caseGallery = document.getElementById('case-gallery');
    
    const casesData = {
        case1: {
            title: 'Minimalism 2.0',
            code: 'MJ v6.1 | [Code: NT-44]',
            fullDesc: 'Для бренда Nordic Tech мы разработали систему промптов, которая позволила генерировать более 100 уникальных постеров в едином минималистичном стиле всего за 2 дня. Использовались параметры --stylize 250 --no text, noise. Результат: полное соответствие бренд-айдентике и экономия 80% времени дизайнера.',
            gallery: ['images/Nordic Tech.png']
        },
        case2: {
            title: 'Belarus DNA',
            code: 'MJ v6.1 | [Code: BY-01]',
            fullDesc: 'Национальный бренд одежды получил визуальный код, объединяющий традиционные мотивы и современный minimalism. После внедрения промптов узнаваемость бренда в соцсетях выросла на 35%, а стоимость создания контента снизилась в 3 раза.',
            gallery: ['images/Neo Motif.png']
        },
        case3: {
            title: 'Digital Folk',
            code: 'MJ v6.1 | [Code: ETH-09]',
            fullDesc: 'Для музыкального фестиваля мы создали промпты, смешивающие этнические узоры и киберпанк-эстетику. За неделю сгенерировано 50+ афиш, которые использовались в наружной рекламе и digital-кампаниях. Посещаемость фестиваля выросла на 20%.',
            gallery: ['images/Cyber Ethno.png']
        },
        case4: {
            title: 'Future Abstract',
            code: 'MJ v6.1 | [Code: QA-12]',
            fullDesc: 'Абстрактная графика для рекламной кампании и AR-фильтров. Промпты обеспечили бесконечное разнообразие форм при сохранении цветовой гаммы и настроения. Рекламная кампания получила премию в номинации "Лучший визуал".',
            gallery: ['images/Quantum Arc.png']
        }
    };
    
    function openCaseModal(caseId) {
        const data = casesData[caseId];
        if (!data) return;
        caseTitle.textContent = data.title;
        caseCodeElem.textContent = data.code;
        caseFullDesc.textContent = data.fullDesc;
        
        // Отрисовка галереи
        if (data.gallery && data.gallery.length) {
            caseGallery.innerHTML = data.gallery.map(src => 
                `<img src="${src}" alt="${data.title}" style="width:100%; border-radius:24px; margin-bottom:16px;">`
            ).join('');
        } else {
            caseGallery.innerHTML = '';
        }
        
        caseModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    const sliderTrackForCases = document.getElementById('slider-track');
    if (sliderTrackForCases) {
        sliderTrackForCases.addEventListener('click', (e) => {
            const card = e.target.closest('.case-clickable');
            if (card) { const caseId = card.getAttribute('data-case'); if (caseId) openCaseModal(caseId); e.stopPropagation(); }
        });
    }
    if (caseClose) caseClose.addEventListener('click', () => { caseModal.classList.remove('active'); document.body.style.overflow = ''; });
    if (caseModal) caseModal.addEventListener('click', (e) => { if (e.target === caseModal) { caseModal.classList.remove('active'); document.body.style.overflow = ''; } });
    const orderSimilar = document.querySelector('.order-similar');
    if (orderSimilar) orderSimilar.addEventListener('click', () => { caseModal.classList.remove('active'); const orderModal = document.getElementById('order-modal'); if (orderModal) orderModal.classList.add('active'); });

    // счётчик
    let spots = 3;
    const spotsSpan = document.getElementById('spots-counter');
    const timerSpan = document.querySelector('#timer span');
    function updateSpots() { if (spots > 0) { spots--; if (spotsSpan) spotsSpan.textContent = spots; } }
    setInterval(() => { if (spots > 0) updateSpots(); }, 30000);
    function updateTimer() {
        const now = new Date(); const endOfDay = new Date(); endOfDay.setHours(23,59,59,999);
        const diff = endOfDay - now;
        if (diff <= 0) { if (timerSpan) timerSpan.textContent = "00:00:00"; return; }
        const hours = Math.floor(diff/3600000), minutes = Math.floor((diff%3600000)/60000), seconds = Math.floor((diff%60000)/1000);
        if (timerSpan) timerSpan.textContent = `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}`;
    }
    updateTimer(); setInterval(updateTimer, 1000);

    // модалки тарифов
    const planModal = document.getElementById('plan-modal');
    const planClose = document.querySelector('.plan-close');
    const planTitle = document.getElementById('plan-modal-title');
    const planDesc = document.getElementById('plan-modal-description');
    const planFeatures = document.getElementById('plan-modal-features');
    const plansData = {
        basic: { title:'Basic DNA', desc:'Идеальный старт для небольших проектов и тестирования возможностей AI-промптинга.', features:['5 базовых промптов (Midjourney v6.1)','Гайд по использованию с примерами','7 дней поддержки в Telegram','Право коммерческого использования','Простой чек-лист для команды'] },
        full: { title:'Full DNA', desc:'Полный пакет для брендов, которые хотят системный подход и долгосрочный результат. Включает LoRA-обучение и обучение команды.', features:['25 уникальных промптов с параметрами','LoRA-обучение под ваш стиль (1 модель)','Полный AI-брендбук (45+ страниц)','1 час обучения команды (Zoom)','14 дней приоритетной поддержки','Доступ к закрытому сообществу'] },
        enterprise: { title:'Enterprise', desc:'Для крупных компаний и агентств с высокими нагрузками. Полная интеграция в ваш пайплайн и персональный инженер.', features:['Неограниченное количество промптов','API-интеграция в ваши процессы','Персональный AI-инженер (до 20 ч/мес)','Обучение всей команды (до 8 часов)','SLA до 4 часов, 24/7 поддержка','Юридическое сопровождение документов'] }
    };
    document.querySelectorAll('.btn-details').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const plan = btn.getAttribute('data-plan');
            if (!plan || !plansData[plan]) return;
            const data = plansData[plan];
            planTitle.textContent = data.title;
            planDesc.textContent = data.desc;
            planFeatures.innerHTML = `<ul>${data.features.map(f => `<li>${f}</li>`).join('')}</ul>`;
            planModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });
    if (planClose) planClose.addEventListener('click', () => { planModal.classList.remove('active'); document.body.style.overflow = ''; });
    if (planModal) planModal.addEventListener('click', (e) => { if (e.target === planModal) { planModal.classList.remove('active'); document.body.style.overflow = ''; } });
    const orderFromModal = document.querySelector('.order-from-modal');
    if (orderFromModal) orderFromModal.addEventListener('click', (e) => { e.preventDefault(); planModal.classList.remove('active'); const orderModal = document.getElementById('order-modal'); if (orderModal) orderModal.classList.add('active'); });

    // FAQ аккордеон
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        question.addEventListener('click', () => { item.classList.toggle('active'); });
    });

    // викторина
    const getPromoBtn = document.getElementById('get-promo-btn');
    const promoResultDiv = document.getElementById('promo-result');
    const generatedPromptSpan = document.getElementById('generated-prompt');
    const copyBtn = document.getElementById('copy-prompt-btn');
    function generatePrompt(answers) {
        const { q1,q2,q3 } = answers;
        let style='', mood='', subject='';
        if (q1==='minimal') style='minimalist, clean, geometric, white space';
        else if (q1==='cyber') style='cyberpunk, neon, dark streets, holograms';
        else style='organic, flowing shapes, biophilic, nature-inspired';
        if (q2==='cold') mood='cold color palette, blue, silver, futuristic';
        else if (q2==='warm') mood='warm tones, golden hour, cozy atmosphere';
        else mood='balanced, neutral grey, natural light';
        if (q3==='social') subject='social media post, vibrant composition, text space';
        else if (q3==='product') subject='product packaging, mockup, studio lighting';
        else subject='concept art, surreal landscape, high detail';
        return `/imagine prompt: ${subject}, ${style}, ${mood}, 8k, cinematic lighting --ar 16:9 --v 6.1`;
    }
    if (getPromoBtn) {
        getPromoBtn.addEventListener('click', () => {
            const q1 = document.querySelector('input[name="q1"]:checked');
            const q2 = document.querySelector('input[name="q2"]:checked');
            const q3 = document.querySelector('input[name="q3"]:checked');
            if (!q1 || !q2 || !q3) { alert('Пожалуйста, ответьте на все 3 вопроса!'); return; }
            const answers = { q1:q1.value, q2:q2.value, q3:q3.value };
            generatedPromptSpan.textContent = generatePrompt(answers);
            promoResultDiv.style.display = 'block';
            promoResultDiv.scrollIntoView({ behavior:'smooth', block:'nearest' });
        });
    }
    if (copyBtn) {
        copyBtn.addEventListener('click', () => {
            navigator.clipboard.writeText(generatedPromptSpan.textContent).then(() => {
                copyBtn.textContent = '✓ Скопировано!';
                setTimeout(() => { copyBtn.textContent = 'Скопировать'; }, 2000);
            });
        });
    }

    // форма обратной связи
    const feedbackForm = document.getElementById('feedback-form');
    const formStatus = document.getElementById('form-status');
    if (feedbackForm) {
        feedbackForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const name = document.getElementById('contact-name').value.trim();
            const contact = document.getElementById('contact-email').value.trim();
            const typeSelect = document.getElementById('contact-type');
            const type = typeSelect.options[typeSelect.selectedIndex].text;
            const message = document.getElementById('contact-message').value.trim();
            if (!name || !contact || !message) {
                formStatus.textContent = 'Заполните все поля'; formStatus.style.color = '#ef4444';
                setTimeout(() => formStatus.textContent = '', 3000); return;
            }
            const submitBtn = document.getElementById('submit-feedback');
            submitBtn.classList.add('is-loading');
            setTimeout(() => {
                submitBtn.classList.remove('is-loading');
                formStatus.textContent = `✅ Спасибо, ${name}! Ваш ${type.toLowerCase()} принят. Мы ответим в течение 2 часов.`;
                formStatus.style.color = '#22c55e';
                feedbackForm.reset();
                setTimeout(() => formStatus.textContent = '', 5000);
            }, 1000);
        });
    }

    // активная навигация
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav a:not(.btn-apple-sm)');
    function updateActiveNav() {
        let current = '';
        const scrollPos = window.scrollY + 100;
        sections.forEach(section => {
            const top = section.offsetTop, bottom = top + section.offsetHeight;
            if (scrollPos >= top && scrollPos < bottom) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
        });
    }
    window.addEventListener('scroll', updateActiveNav);
    updateActiveNav();

    // кнопка наверх
    const scrollToTopBtn = document.getElementById('scrollToTopBtn');
    if (scrollToTopBtn) {
        window.addEventListener('scroll', () => { if (window.scrollY > 500) scrollToTopBtn.classList.add('show'); else scrollToTopBtn.classList.remove('show'); });
        scrollToTopBtn.addEventListener('click', () => { window.scrollTo({ top:0, behavior:'smooth' }); });
    }
});