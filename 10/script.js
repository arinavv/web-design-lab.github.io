// Главная функция, которая выполняется после загрузки DOM
$(document).ready(function() {
    console.log("DOM загружен, jQuery готов к работе!");
    
    // ========== ЗАДАНИЕ 1: Основы селекторов и манипуляций ==========
    
    // Кнопка для выполнения задания 1
    $("#task1-btn").click(function() {
        // 1. Изменяем текст заголовка страницы
        $("#main-title").text("jQuery - это просто!").css({
            "color": "#8fffc7",
            "transition": "color 0.5s ease"
        });
        
        // 2. Покрасить четные элементы в серый, нечетные в белый
        $("#todo-list li:even").addClass("even").removeClass("odd");
        $("#todo-list li:odd").addClass("odd").removeClass("even");
        
        // 3. Добавить новый пункт в конец списка с анимацией
        if (!$("#todo-list li:contains('Изучить jQuery')").length) {
            $("<li>")
                .text("Изучить jQuery")
                .hide()
                .appendTo("#todo-list")
                .fadeIn(1000);
        }
        
        // Обновляем стили для всех элементов списка
        updateListStyles();
        
        // Показываем сообщение об успешном выполнении
        showNotification("Задание 1 выполнено успешно!", "success");
    });
    
    // Кнопка сброса изменений
    $("#reset-btn").click(function() {
        // Восстанавливаем исходный заголовок
        $("#main-title").text("Лабораторная работа №10").css("color", "#ffffff");
        
        // Удаляем добавленный пункт "Изучить jQuery"
        $("#todo-list li:contains('Изучить jQuery')").fadeOut(500, function() {
            $(this).remove();
        });
        
        // Убираем классы стилей и восстанавливаем исходные
        $("#todo-list li").removeClass("even odd").css({
            "background": "rgba(26, 42, 58, 0.7)",
            "color": "#e0e1dd"
        });
        
        // Показываем сообщение о сбросе
        showNotification("Изменения сброшены", "info");
    });
    
    // Функция для обновления стилей списка
    function updateListStyles() {
        $("#todo-list li:even").addClass("even").removeClass("odd");
        $("#todo-list li:odd").addClass("odd").removeClass("even");
    }
    
    // ========== ЗАДАНИЕ 2: Работа с событиями и формами ==========
    
    // Проверка поля "Имя" при потере фокуса
    $("#name").blur(function() {
        validateNameField();
    });
    
    // Проверка поля "Имя" при вводе
    $("#name").on("input", function() {
        validateNameField();
    });
    
    // Функция валидации поля имени
    function validateNameField() {
        const nameInput = $("#name");
        const nameValue = nameInput.val().trim();
        const errorElement = $("#name-error");
        
        if (nameValue === "") {
            nameInput.addClass("error").removeClass("success");
            errorElement.text("Поле 'Имя' не может быть пустым");
        } else if (nameValue.length < 2) {
            nameInput.addClass("error").removeClass("success");
            errorElement.text("Имя должно содержать минимум 2 символа");
        } else {
            nameInput.removeClass("error").addClass("success");
            errorElement.text("");
        }
    }
    
    // Обработка отправки формы
    $("#user-form").submit(function(event) {
        // Отменяем стандартную отправку формы
        event.preventDefault();
        
        const name = $("#name").val().trim();
        const password = $("#password").val();
        
        // Проверяем валидность имени
        if (name === "" || name.length < 2) {
            $("#name").addClass("error");
            $("#name-error").text("Пожалуйста, введите корректное имя");
            $("#greeting-message")
                .text("Пожалуйста, исправьте ошибки в форме")
                .css("color", "#ff6b6b")
                .slideDown();
            return;
        }
        
        // Проверяем пароль
        if (password.length < 6) {
            $("#greeting-message")
                .html("Привет, <strong>" + name + "</strong>!<br>Пароль должен содержать минимум 6 символов.")
                .css("color", "#ffa726")
                .slideDown();
            return;
        }
        
        // Выводим приветствие
        $("#greeting-message")
            .html("Привет, <strong>" + name + "</strong>!<br>Рады видеть вас на нашей странице!")
            .css("color", "#8fffc7")
            .slideDown();
        
        // Анимация для сообщения
        $("#greeting-message").animate({
            padding: "25px"
        }, 300);
        
        // Показываем уведомление
        showNotification("Форма успешно отправлена!", "success");
    });
    
    // Кнопка очистки формы
    $("#clear-form-btn").click(function() {
        $("#user-form")[0].reset();
        $("#name, #password").removeClass("error success");
        $("#name-error").text("");
        $("#greeting-message").slideUp();
        
        showNotification("Форма очищена", "info");
    });
    
    // ========== ДОПОЛНИТЕЛЬНЫЕ ЭЛЕМЕНТЫ JQUERY ==========
    
    // Анимация элемента
    $("#animate-btn").click(function() {
        const animatedBox = $("#animated-box");
        const btn = $(this);
        
        // Блокируем кнопку на время анимации
        btn.prop("disabled", true).text("Анимация выполняется...");
        
        animatedBox
            .animate({
                width: "200px",
                height: "200px",
                opacity: 0.5,
                marginLeft: "50px",
                borderRadius: "50%"
            }, 1000)
            .animate({
                width: "100px",
                height: "100px",
                opacity: 1,
                marginLeft: "0",
                borderRadius: "10px",
                backgroundColor: "#ff6b6b"
            }, 1000)
            .animate({
                backgroundColor: "#8fffc7"
            }, 500, function() {
                // Разблокируем кнопку после завершения анимации
                btn.prop("disabled", false).text("Запустить анимацию");
            });
    });
    
    // Показать/скрыть контент
    $("#toggle-btn").click(function() {
        const toggleContent = $("#toggle-content");
        const btn = $(this);
        
        toggleContent.slideToggle(500, function() {
            if ($(this).is(":visible")) {
                btn.text("Скрыть текст").addClass("btn-secondary").removeClass("btn-primary");
            } else {
                btn.text("Показать текст").addClass("btn-primary").removeClass("btn-secondary");
            }
        });
    });
    
    // Динамическое добавление контента
    $("#add-content-btn").click(function() {
        const dynamicContent = $("#dynamic-content");
        const btn = $(this);
        const itemCount = dynamicContent.children(".dynamic-item").length + 1;
        
        // Создаем новый элемент
        const newItem = $("<div>")
            .addClass("dynamic-item")
            .html(`
                <p><strong>Элемент #${itemCount}</strong></p>
                <p>Добавлен: ${new Date().toLocaleTimeString()}</p>
                <button class="btn btn-secondary remove-item-btn" style="padding: 5px 10px; font-size: 0.8rem; margin-top: 5px;">
                    Удалить
                </button>
            `)
            .hide();
        
        // Добавляем элемент
        dynamicContent.append(newItem);
        newItem.slideDown(500);
        
        // Ограничиваем количество элементов
        if (itemCount >= 5) {
            btn.prop("disabled", true).text("Достигнут лимит (5 элементов)");
            showNotification("Достигнут максимальный лимит элементов", "warning");
        }
    });
    
    // Удаление динамических элементов (делегирование событий)
    $("#dynamic-content").on("click", ".remove-item-btn", function() {
        const item = $(this).closest(".dynamic-item");
        item.slideUp(300, function() {
            $(this).remove();
            // Активируем кнопку добавления
            $("#add-content-btn").prop("disabled", false).text("Добавить элемент");
        });
    });
    
    // ========== ДОПОЛНИТЕЛЬНЫЕ ЭФФЕКТЫ ==========
    
    // Эффект при наведении на элементы списка
    $("#todo-list").on("mouseenter", "li", function() {
        $(this).stop(true).animate({
            paddingLeft: "30px"
        }, 200);
    }).on("mouseleave", "li", function() {
        $(this).stop(true).animate({
            paddingLeft: "20px"
        }, 200);
    });
    
    // Изменение цвета фона при клике на элемент списка
    $("#todo-list").on("click", "li", function() {
        const originalColor = $(this).css("background-color");
        
        $(this).animate({
            backgroundColor: "#576266"
        }, 200).animate({
            backgroundColor: originalColor
        }, 200);
    });
    
    // Кнопка "Наверх"
    $("#back-to-top").click(function() {
        $("html, body").animate({
            scrollTop: 0
        }, 800);
        return false;
    });
    
    // Показываем кнопку "Наверх" при прокрутке
    $(window).scroll(function() {
        if ($(this).scrollTop() > 300) {
            $("#back-to-top").fadeIn();
        } else {
            $("#back-to-top").fadeOut();
        }
    });
    
    // Показываем приветственное сообщение при первом посещении
    setTimeout(function() {
        if ($("#greeting-message").text() === "") {
            $("#greeting-message")
                .html("Добро пожаловать!<br>Выполните задания лабораторной работы.")
                .css("color", "#b0bec5")
                .slideDown();
            
            setTimeout(function() {
                $("#greeting-message").slideUp();
            }, 5000);
        }
    }, 2000);
    
    // ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
    
    // Функция для показа уведомлений
    function showNotification(message, type) {
        // Создаем элемент уведомления
        const notification = $("<div>")
            .addClass("notification")
            .text(message)
            .css({
                "position": "fixed",
                "top": "20px",
                "right": "20px",
                "padding": "15px 20px",
                "border-radius": "8px",
                "z-index": "1000",
                "font-weight": "bold",
                "box-shadow": "0 5px 15px rgba(0,0,0,0.3)",
                "transform": "translateX(150%)",
                "transition": "transform 0.5s ease"
            });
        
        // Устанавливаем цвет в зависимости от типа
        switch(type) {
            case "success":
                notification.css({
                    "background": "linear-gradient(135deg, #4CAF50, #2E7D32)",
                    "color": "white",
                    "border-left": "4px solid #8fffc7"
                });
                break;
            case "error":
                notification.css({
                    "background": "linear-gradient(135deg, #f44336, #c62828)",
                    "color": "white",
                    "border-left": "4px solid #ff6b6b"
                });
                break;
            case "warning":
                notification.css({
                    "background": "linear-gradient(135deg, #ff9800, #ef6c00)",
                    "color": "white",
                    "border-left": "4px solid #ffa726"
                });
                break;
            default:
                notification.css({
                    "background": "linear-gradient(135deg, #2196F3, #1565C0)",
                    "color": "white",
                    "border-left": "4px solid #64b5f6"
                });
        }
        
        // Добавляем уведомление на страницу
        $("body").append(notification);
        
        // Показываем уведомление
        setTimeout(function() {
            notification.css("transform", "translateX(0)");
        }, 10);
        
        // Скрываем уведомление через 3 секунды
        setTimeout(function() {
            notification.css("transform", "translateX(150%)");
            
            // Удаляем уведомление после анимации
            setTimeout(function() {
                notification.remove();
            }, 500);
        }, 3000);
    }
    
    // Инициализация кнопки "Наверх"
    $("#back-to-top").hide();
    
    // Логирование готовности
    console.log("jQuery скрипт успешно загружен и инициализирован");
});