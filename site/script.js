$(document).ready(function() {
    console.log("jQuery загружен и готов к работе!");
    
    // === 1. ПЛАВНАЯ ПРОКРУТКА ===
    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const targetId = $(this).attr('href');
        if (targetId === '#') return;
        
        const targetElement = $(targetId);
        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top - 80
            }, 800);
            
            // Закрываем мобильное меню если открыто
            $('.nav-menu').removeClass('active');
        }
    });
    
    // === 2. ФИКСИРОВАННАЯ НАВИГАЦИЯ ===
    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
        
        // Показываем/скрываем навигацию
        if (scrollTop > 100) {
            $('.main-nav').addClass('visible');
        } else {
            $('.main-nav').removeClass('visible');
        }
        
        // Показываем/скрываем кнопку "Наверх"
        if (scrollTop > 300) {
            $('#back-to-top').addClass('visible');
        } else {
            $('#back-to-top').removeClass('visible');
        }
        
        // Подсвечиваем активный пункт меню
        $('section').each(function() {
            const sectionTop = $(this).offset().top - 100;
            const sectionBottom = sectionTop + $(this).outerHeight();
            const sectionId = $(this).attr('id');
            
            if (scrollTop >= sectionTop && scrollTop < sectionBottom) {
                $('.nav-link').removeClass('active');
                $(`.nav-link[href="#${sectionId}"]`).addClass('active');
            }
        });
    });
    
    // Кнопка "Наверх"
    $('#back-to-top').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
    
    // === 3. МОБИЛЬНОЕ МЕНЮ ===
    $('.nav-toggle').on('click', function() {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });
    
    
    
    // === 4. МОДАЛЬНОЕ ОКНО ДЛЯ ДОСТИЖЕНИЙ ===
    $('.achievement-more').on('click', function() {
        const card = $(this).closest('.achievement-card');
        const title = card.find('.achievement-title').text();
        const description = card.find('.achievement-description').text();
        const year = card.find('.achievement-year').text();
        const imgSrc = card.find('img').attr('src');
        
        // Заполняем модальное окно
        $('#modal-title').text(title);
        $('#modal-description').text(description);
        $('#modal-year').text(year);
        $('#modal-img').attr('src', imgSrc).attr('alt', title);
        
        // Показываем модальное окно
        $('#achievement-modal').addClass('active');
        $('body').css('overflow', 'hidden'); // Блокируем скролл страницы
    });
    
    // Закрытие модального окна
    $('.modal-close, .modal-overlay').on('click', function(e) {
        if ($(e.target).is('.modal-close') || $(e.target).is('.modal-overlay')) {
            $('#achievement-modal').removeClass('active');
            $('body').css('overflow', 'auto'); // Восстанавливаем скролл
        }
    });
    
    // Закрытие по ESC
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('#achievement-modal').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
    
    // === 7. АНИМАЦИЯ СТАТИСТИКИ ===
    function animateStats() {
        $('.stat-number').each(function() {
            const $this = $(this);
            const countTo = $this.data('count');
            
            $({ countNum: 0 }).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing: 'swing',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(countTo);
                }
            });
        });
    }
    
    // Запускаем анимацию статистики при скролле к секции
    $(window).on('scroll', function() {
        const techSection = $('#technologies');
        const scrollTop = $(this).scrollTop();
        const sectionTop = techSection.offset().top - 500;
        
        if (scrollTop > sectionTop && !techSection.hasClass('animated')) {
            animateStats();
            techSection.addClass('animated');
            
            // Анимируем полосы прогресса
            $('.level-fill').each(function() {
                const width = $(this).data('width');
                $(this).animate({ width: width + '%' }, 1500);
            });
        }
    });
    
    // === 6. ВАЛИДАЦИЯ И ОТПРАВКА ФОРМЫ ===
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        // Сбрасываем сообщения об ошибках
        $('.error-message').text('');
        $('.form-control').removeClass('error');
        $('#form-message').removeClass('success error').text('');
        
        let isValid = true;
        
        // Валидация имени
        const name = $('#name').val().trim();
        if (!name) {
            $('#name-error').text('Пожалуйста, введите ваше имя');
            $('#name').addClass('error');
            isValid = false;
        } else if (name.length < 2) {
            $('#name-error').text('Имя должно содержать минимум 2 символа');
            $('#name').addClass('error');
            isValid = false;
        }
        
        // Валидация email
        const email = $('#email').val().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            $('#email-error').text('Пожалуйста, введите ваш email');
            $('#email').addClass('error');
            isValid = false;
        } else if (!emailRegex.test(email)) {
            $('#email-error').text('Пожалуйста, введите корректный email');
            $('#email').addClass('error');
            isValid = false;
        }
        
        // Валидация сообщения
        const message = $('#message').val().trim();
        if (!message) {
            $('#message-error').text('Пожалуйста, введите сообщение');
            $('#message').addClass('error');
            isValid = false;
        } else if (message.length < 10) {
            $('#message-error').text('Сообщение должно содержать минимум 10 символов');
            $('#message').addClass('error');
            isValid = false;
        }
        
        if (!isValid) {
            return;
        }
        
        // Показываем индикатор загрузки
        const submitBtn = $('.submit-btn');
        submitBtn.addClass('loading').prop('disabled', true);
        
        // Имитация отправки на сервер (в реальном проекте здесь будет AJAX запрос)
        setTimeout(function() {
            // Скрываем индикатор загрузки
            submitBtn.removeClass('loading').prop('disabled', false);
            
            // Показываем сообщение об успехе
            $('#form-message')
                .text(`Спасибо, ${name}! Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время по адресу ${email}.`)
                .addClass('success')
                .fadeIn();
            
            // Очищаем форму
            $('#contactForm')[0].reset();
            
            // Скрываем сообщение через 5 секунд
            setTimeout(function() {
                $('#form-message').fadeOut();
            }, 5000);
            
            // Анимация успешной отправки
            $('.contact-form').animate({
                boxShadow: '0 0 20px rgba(46, 204, 113, 0.3)'
            }, 300).animate({
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
            }, 300);
            
            // Отправляем данные в консоль (для отладки)
            console.log('Форма отправлена:', {
                name: name,
                email: email,
                subject: $('#subject').val(),
                message: message
            });
        }, 2000);
    });
    
    // Валидация в реальном времени
    $('.form-control').on('input', function() {
        $(this).removeClass('error');
        $(this).next('.error-message').text('');
    });
    
    // === 7. СЧЕТЧИК ПОСЕТИТЕЛЕЙ ===
    function updateVisitorCount() {
        // Получаем текущее количество из localStorage или устанавливаем случайное
        let count = localStorage.getItem('visitorCount');
        
        if (!count) {
            // Генерируем случайное число для демонстрации
            count = Math.floor(Math.random() * 50) + 100;
            localStorage.setItem('visitorCount', count);
        }
        
        // Увеличиваем счетчик
        count = parseInt(count) + 1;
        localStorage.setItem('visitorCount', count);
        
        // Анимируем изменение числа
        $('#visitor-count').prop('Counter', 0).animate({
            Counter: count
        }, {
            duration: 2000,
            easing: 'swing',
            step: function(now) {
                $(this).text(Math.ceil(now));
            }
        });
    }
    
    // Обновляем счетчик при загрузке страницы
    updateVisitorCount();
    
  
    // === 8. ИНТЕРАКТИВНЫЕ ЭЛЕМЕНТЫ ===
    
    // Эффект при наведении на карточки технологий
    $('.technology-card').on('mouseenter', function() {
        $(this).find('.technology-icon').css({
            transform: 'scale(1.1) rotate(5deg)'
        });
    }).on('mouseleave', function() {
        $(this).find('.technology-icon').css({
            transform: 'scale(1) rotate(0deg)'
        });
    });
    
    // Эффект при наведении на социальные ссылки
    $('.social-link').on('mouseenter', function() {
        $(this).css({
            transform: 'translateY(-5px) rotate(5deg)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            transform: 'translateY(0) rotate(0deg)'
        });
    });
    
    // Клик по элементам контактов для копирования
    $('.contact-text').on('click', function() {
        const text = $(this).text().replace(/\s+/g, ' ').trim();
        const label = $(this).find('strong').text().replace(':', '');
        
        // Временное выделение
        $(this).css('background-color', 'rgba(99, 102, 241, 0.2)');
        setTimeout(() => {
            $(this).css('background-color', 'transparent');
        }, 300);
        
        // Показываем всплывающее уведомление
        showToast(`${label} скопирован в буфер обмена: ${text}`);
        
        // Копируем в буфер обмена
        navigator.clipboard.writeText(text.split('\n')[1].trim()).then(() => {
            console.log(`${label} скопирован:`, text);
        });
    });
    
    // === 9. ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ===
    
    // Функция для показа всплывающих уведомлений
    function showToast(message) {
        const toast = $('<div>')
            .addClass('toast')
            .text(message)
            .css({
                position: 'fixed',
                bottom: '100px',
                right: '30px',
                backgroundColor: 'var(--primary)',
                color: 'white',
                padding: '15px 25px',
                borderRadius: '10px',
                zIndex: '2000',
                boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
                transform: 'translateX(150%)',
                transition: 'transform 0.3s ease'
            })
            .appendTo('body');
        
        setTimeout(() => {
            toast.css('transform', 'translateX(0)');
        }, 10);
        
        setTimeout(() => {
            toast.css('transform', 'translateX(150%)');
            setTimeout(() => toast.remove(), 300);
        }, 3000);
    }
    
    // === 12. ТЕМНАЯ/СВЕТЛАЯ ТЕМА (опционально) ===
    const themeToggle = $('<button>')
        .addClass('theme-toggle')
        .html('<i class="fas fa-moon"></i>')
        .css({
            position: 'fixed',
            bottom: '90px',
            right: '30px',
            width: '45px',
            height: '45px',
            backgroundColor: 'var(--primary)',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            cursor: 'pointer',
            zIndex: '999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2em'
        })
        .appendTo('body');
    
    themeToggle.on('click', function() {
        $('body').toggleClass('light-theme');
        if ($('body').hasClass('light-theme')) {
            $(this).html('<i class="fas fa-sun"></i>');
            showToast('Светлая тема включена');
        } else {
            $(this).html('<i class="fas fa-moon"></i>');
            showToast('Темная тема включена');
        }
    });
    
    // Стили для светлой темы
    $('<style>')
        .text(`
            body.light-theme {
                --dark-bg: #F8FAFC;
                --dark-bg-secondary: #E2E8F0;
                --text-light: #1E293B;
                --text-gray: #64748B;
                --secondary: #E2E8F0;
                --achievements-bg: #F1F5F9;
                --contacts-bg: #E2E8F0;
                --technologies-bg: #F8FAFC;
            }
        `)
        .appendTo('head');
    
    console.log("Все jQuery функции инициализированы!");
});