$(document).ready(function() {
    console.log("jQuery загружен и готов к работе!");

    $('a[href^="#"]').on('click', function(e) {
        e.preventDefault();
        
        const targetId = $(this).attr('href');
        if (targetId === '#') return;
        
        const targetElement = $(targetId);
        if (targetElement.length) {
            $('html, body').animate({
                scrollTop: targetElement.offset().top - 80
            }, 800);
            
            $('.nav-menu').removeClass('active');
        }
    });

    $(window).on('scroll', function() {
        const scrollTop = $(this).scrollTop();
     
        if (scrollTop > 100) {
            $('.main-nav').addClass('visible');
        } else {
            $('.main-nav').removeClass('visible');
        }
        if (scrollTop > 300) {
            $('#back-to-top').addClass('visible');
        } else {
            $('#back-to-top').removeClass('visible');
        }
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
    
    $('#back-to-top').on('click', function() {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    $('.nav-toggle').on('click', function() {
        $('.nav-menu').toggleClass('active');
        $(this).toggleClass('active');
    });
    
    
    $('.achievement-more').on('click', function() {
        const card = $(this).closest('.achievement-card');
        const title = card.find('.achievement-title').text();
        const description = card.find('.achievement-description').text();
        const year = card.find('.achievement-year').text();
        const imgSrc = card.find('img').attr('src');
        
        $('#modal-title').text(title);
        $('#modal-description').text(description);
        $('#modal-year').text(year);
        $('#modal-img').attr('src', imgSrc).attr('alt', title);
        
        $('#achievement-modal').addClass('active');
        $('body').css('overflow', 'hidden'); 
    });
    
    $('.modal-close, .modal-overlay').on('click', function(e) {
        if ($(e.target).is('.modal-close') || $(e.target).is('.modal-overlay')) {
            $('#achievement-modal').removeClass('active');
            $('body').css('overflow', 'auto'); 
        }
    });
  
    $(document).on('keydown', function(e) {
        if (e.key === 'Escape') {
            $('#achievement-modal').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });
    
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
    
    $(window).on('scroll', function() {
        const techSection = $('#technologies');
        const scrollTop = $(this).scrollTop();
        const sectionTop = techSection.offset().top - 500;
        
        if (scrollTop > sectionTop && !techSection.hasClass('animated')) {
            animateStats();
            techSection.addClass('animated');
            
            $('.level-fill').each(function() {
                const width = $(this).data('width');
                $(this).animate({ width: width + '%' }, 1500);
            });
        }
    });
    
    $('#contactForm').on('submit', function(e) {
        e.preventDefault();
        
        $('.error-message').text('');
        $('.form-control').removeClass('error');
        $('#form-message').removeClass('success error').text('');
        
        let isValid = true;
        
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
        
        const submitBtn = $('.submit-btn');
        submitBtn.addClass('loading').prop('disabled', true);
     
        setTimeout(function() {
     
            submitBtn.removeClass('loading').prop('disabled', false);
            
            $('#form-message')
                .text(`Спасибо, ${name}! Ваше сообщение успешно отправлено. Я свяжусь с вами в ближайшее время по адресу ${email}.`)
                .addClass('success')
                .fadeIn();
            
            $('#contactForm')[0].reset();
            
            setTimeout(function() {
                $('#form-message').fadeOut();
            }, 5000);
            
            $('.contact-form').animate({
                boxShadow: '0 0 20px rgba(46, 204, 113, 0.3)'
            }, 300).animate({
                boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)'
            }, 300);
            
            console.log('Форма отправлена:', {
                name: name,
                email: email,
                subject: $('#subject').val(),
                message: message
            });
        }, 2000);
    });

    $('.form-control').on('input', function() {
        $(this).removeClass('error');
        $(this).next('.error-message').text('');
    });

    function updateVisitorCount() {
        let count = localStorage.getItem('visitorCount');
        
        if (!count) {
            count = Math.floor(Math.random() * 50) + 100;
            localStorage.setItem('visitorCount', count);
        }
        
        count = parseInt(count) + 1;
        localStorage.setItem('visitorCount', count);

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

    updateVisitorCount();
    

    $('.technology-card').on('mouseenter', function() {
        $(this).find('.technology-icon').css({
            transform: 'scale(1.1) rotate(5deg)'
        });
    }).on('mouseleave', function() {
        $(this).find('.technology-icon').css({
            transform: 'scale(1) rotate(0deg)'
        });
    });
 
    $('.social-link').on('mouseenter', function() {
        $(this).css({
            transform: 'translateY(-5px) rotate(5deg)'
        });
    }).on('mouseleave', function() {
        $(this).css({
            transform: 'translateY(0) rotate(0deg)'
        });
    });
    
    $('.contact-text').on('click', function() {
        const text = $(this).text().replace(/\s+/g, ' ').trim();
        const label = $(this).find('strong').text().replace(':', '');
 
        $(this).css('background-color', 'rgba(99, 102, 241, 0.2)');
        setTimeout(() => {
            $(this).css('background-color', 'transparent');
        }, 300);
       
        showToast(`${label} скопирован в буфер обмена: ${text}`);
  
        navigator.clipboard.writeText(text.split('\n')[1].trim()).then(() => {
            console.log(`${label} скопирован:`, text);
        });
    });
    
 
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
