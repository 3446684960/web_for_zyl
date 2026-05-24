function typeWriter(text, element, speed, callback) {
    let index = 0;
    const timer = setInterval(function () {
        if (index < text.length) {
            element.textContent += text.charAt(index);
            index++;
        } else {
            clearInterval(timer);
            if (callback) {
                callback();
            }
        }
    }, speed);
}

window.addEventListener("DOMContentLoaded", function () {
    const typingElement = document.getElementById("typing-text");
    const texts = [
        "一名热爱编程的计算机专业学生",
        "正在学习前端开发技术",
        "欢迎来到我的个人主页！"
    ];

    function startTyping(i) {
        const index = i % texts.length;
        typingElement.textContent = "";
        typeWriter(texts[index], typingElement, 100, function () {
            setTimeout(function () {
                startTyping(i + 1);
            }, 1500);
        });
    }

    startTyping(0);

    const progressBars = document.querySelectorAll(".progress-fill");
    window.addEventListener("scroll", function () {
        progressBars.forEach(function (bar) {
            const rect = bar.getBoundingClientRect();
            if (rect.top < window.innerHeight) {
                bar.style.width = bar.getAttribute("data-width");
            }
        });
    });

    window.dispatchEvent(new Event("scroll"));

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        document.getElementById("theme-toggle").textContent = "☀️ 亮色模式";
    }
});

const themeToggle = document.getElementById("theme-toggle");
themeToggle.addEventListener("click", function () {
    const htmlElement = document.documentElement;
    if (htmlElement.getAttribute("data-theme") === "dark") {
        htmlElement.removeAttribute("data-theme");
        themeToggle.textContent = "🌙 暗色模式";
        localStorage.setItem("theme", "light");
    } else {
        htmlElement.setAttribute("data-theme", "dark");
        themeToggle.textContent = "☀️ 亮色模式";
        localStorage.setItem("theme", "dark");
    }
});

function scrollToSection(sectionId) {
    const target = document.getElementById(sectionId);
    if (target) {
        target.scrollIntoView({ behavior: "smooth" });
    }
}

const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

contactForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    clearErrors();

    let isValid = true;

    if (name === "") {
        showError("name-error", "请输入您的姓名");
        document.getElementById("name").classList.add("error");
        isValid = false;
    }

    if (email === "") {
        showError("email-error", "请输入您的邮箱地址");
        document.getElementById("email").classList.add("error");
        isValid = false;
    } else if (!isValidEmail(email)) {
        showError("email-error", "请输入正确的邮箱格式（如：example@mail.com）");
        document.getElementById("email").classList.add("error");
        isValid = false;
    }

    if (subject === "") {
        showError("subject-error", "请输入留言主题");
        document.getElementById("subject").classList.add("error");
        isValid = false;
    }

    if (message === "") {
        showError("message-error", "请输入留言内容");
        document.getElementById("message").classList.add("error");
        isValid = false;
    } else if (message.length < 10) {
        showError("message-error", "留言内容至少需要10个字符");
        document.getElementById("message").classList.add("error");
        isValid = false;
    }

    if (isValid) {
        contactForm.style.display = "none";
        successMessage.classList.add("show");

        console.log("表单提交数据：", {
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        setTimeout(function () {
            contactForm.style.display = "block";
            contactForm.reset();
            successMessage.classList.remove("show");
        }, 3000);
    }
});

function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
}

function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;
    errorElement.classList.add("show");
}

function clearErrors() {
    const errors = document.querySelectorAll(".error-msg");
    errors.forEach(function (error) {
        error.textContent = "";
        error.classList.remove("show");
    });

    const inputs = document.querySelectorAll(".form-group input, .form-group textarea");
    inputs.forEach(function (input) {
        input.classList.remove("error");
    });
}

const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");
formInputs.forEach(function (input) {
    input.addEventListener("input", function () {
        input.classList.remove("error");
        const errorMsg = document.getElementById(input.id + "-error");
        if (errorMsg) {
            errorMsg.classList.remove("show");
        }
    });
});

const backToTopBtn = document.getElementById("back-to-top");

window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
        backToTopBtn.classList.add("show");
    } else {
        backToTopBtn.classList.remove("show");
    }
});

backToTopBtn.addEventListener("click", function () {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    } else {
        navbar.style.boxShadow = "var(--shadow)";
    }
});
