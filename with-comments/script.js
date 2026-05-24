/**
 * Web课程期末作业 - 个人主页 脚本文件（注释版）
 * 包含JavaScript核心知识点的详细注释
 *
 * 知识点覆盖：
 * - DOM选择与操作
 * - 事件监听
 * - 函数定义与调用
 * - localStorage本地存储
 * - 定时器与动画
 * - 条件判断与循环
 */

// ==================== 1. 打字机效果 ====================

/**
 * 打字机效果函数
 * 模拟逐字输入的效果，通过定时器逐个显示文字
 *
 * @param {string} text - 要显示的文字
 * @param {HTMLElement} element - 显示文字的目标元素
 * @param {number} speed - 每个字显示间隔（毫秒），默认100ms
 * @param {Function} callback - 文字显示完后的回调函数
 */
function typeWriter(text, element, speed, callback) {
    // 变量声明
    // let：声明一个块级作用域的变量（推荐使用）
    // 旧的方式 var 有作用域问题，现代JS优先用 let 和 const
    let index = 0;      // 当前显示到第几个字

    // setInterval：每隔指定毫秒数执行一次函数
    // 返回值是一个定时器ID，用于后面清除定时器
    const timer = setInterval(function () {
        // 检查：如果还没显示完所有文字
        if (index < text.length) {
            // charAt(index)：获取字符串中第 index 个字符
            // 将新字符追加到元素的内容后面
            element.textContent += text.charAt(index);
            index++;    // 索引+1，指向下一个字

        } else {
            // 文字显示完毕时执行
            clearInterval(timer);   // 清除定时器，停止重复执行
            // 如果传了回调函数，就执行它
            if (callback) {
                callback();
            }
        }
    }, speed); // 每隔 speed 毫秒执行一次
}


// ==================== 2. 页面加载时初始化 ====================

// window.onload：当整个页面（包括图片等资源）加载完毕后触发
// 更常用的方式是 DOMContentLoaded，但 onload 也常用于简单场景
window.addEventListener("DOMContentLoaded", function () {
    // ---- 打字机效果 ----
    // document.getElementById()：通过id获取页面元素
    const typingElement = document.getElementById("typing-text");
    // 要逐字显示的文本数组
    const texts = [
        "一名热爱编程的计算机专业学生",
        "正在学习前端开发技术",
        "欢迎来到我的个人主页！"
    ];

    /**
     * 循环播放打字机效果
     * 每次显示一段文字，完成后删除再显示下一段
     * @param {number} i - 当前要显示的文本索引
     */
    function startTyping(i) {
        // 确保索引在有效范围内（用取模运算循环）
        const index = i % texts.length;
        // 清空元素内容（删除上一段文字）
        typingElement.textContent = "";

        // 调用打字机函数，传入当前文本、目标元素、速度、回调
        typeWriter(texts[index], typingElement, 100, function () {
            // 这段文字打完后，等1.5秒再开始下一段
            // setTimeout：延迟执行，只执行一次
            setTimeout(function () {
                startTyping(i + 1); // 递归调用，播放下一个文本
            }, 1500);
        });
    }

    // 启动打字机效果，从第0段文字开始
    startTyping(0);

    // ---- 进度条动画 ----
    // querySelectorAll：通过CSS选择器查找所有匹配的元素
    // 返回一个 NodeList（类数组），可以用 forEach 遍历
    const progressBars = document.querySelectorAll(".progress-fill");

    // 监听滚动事件，当进度条进入视野时才播放动画
    window.addEventListener("scroll", function () {
        progressBars.forEach(function (bar) {
            // getBoundingClientRect()：获取元素相对于视口的位置
            const rect = bar.getBoundingClientRect();
            // 检查元素是否在视口内（顶部距离 < 窗口高度）
            if (rect.top < window.innerHeight) {
                // 读取 data-width 自定义属性的值，设置为进度条宽度
                // getAttribute()：获取HTML元素的属性值
                bar.style.width = bar.getAttribute("data-width");
            }
        });
    });

    // 页面加载时立即检查一次（防止有的进度条一开始就在视野内）
    // dispatchEvent：手动触发一个事件
    window.dispatchEvent(new Event("scroll"));

    // ---- 暗色模式 ----
    // 从 localStorage 读取之前保存的主题设置
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
        // setAttribute：给HTML元素设置属性
        document.documentElement.setAttribute("data-theme", "dark");
        document.getElementById("theme-toggle").textContent = "☀️ 亮色模式";
    }
});


// ==================== 3. 暗色/亮色模式切换 ====================

// 获取切换按钮
const themeToggle = document.getElementById("theme-toggle");

// addEventListener：给元素绑定事件监听器
// 第一个参数是事件类型（click = 鼠标点击）
// 第二个参数是事件发生时执行的函数（事件处理函数）
themeToggle.addEventListener("click", function () {
    // document.documentElement 就是 <html> 元素
    const htmlElement = document.documentElement;

    // 判断当前是否有暗色主题属性
    if (htmlElement.getAttribute("data-theme") === "dark") {
        // 如果是暗色 → 切换为亮色
        htmlElement.removeAttribute("data-theme");  // 移除属性
        themeToggle.textContent = "🌙 暗色模式";    // 修改按钮文字
        localStorage.setItem("theme", "light");     // 保存到本地存储
    } else {
        // 如果是亮色 → 切换为暗色
        htmlElement.setAttribute("data-theme", "dark");
        themeToggle.textContent = "☀️ 亮色模式";
        localStorage.setItem("theme", "dark");
    }
});


// ==================== 4. 平滑滚动到指定区域 ====================

/**
 * 滚动到指定id的元素位置
 * 这个函数在HTML中通过 onclick 调用
 *
 * @param {string} sectionId - 目标元素的id
 */
function scrollToSection(sectionId) {
    // 获取目标元素
    const target = document.getElementById(sectionId);
    if (target) {
        // scrollIntoView：浏览器内置方法，滚动到元素可见位置
        // behavior: "smooth" 表示平滑滚动（有过渡动画）
        target.scrollIntoView({ behavior: "smooth" });
    }
}


// ==================== 5. 表单验证 ====================

// 获取表单元素
const contactForm = document.getElementById("contact-form");
const successMessage = document.getElementById("success-message");

// 监听表单的 submit（提交）事件
contactForm.addEventListener("submit", function (event) {
    // preventDefault()：阻止表单的默认提交行为
    // 这样页面不会刷新，我们可以自己处理提交逻辑
    event.preventDefault();

    // 获取各输入框的值
    // .value：获取输入框的当前值
    // .trim()：去除字符串首尾的空格
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    // 先清除所有旧的错误提示
    clearErrors();

    // 标记是否有验证失败
    let isValid = true;

    // ---- 验证姓名 ----
    if (name === "") {
        // 如果姓名为空，显示错误信息
        showError("name-error", "请输入您的姓名");
        // classList.add()：给元素添加一个CSS类
        document.getElementById("name").classList.add("error");
        isValid = false;
    }

    // ---- 验证邮箱 ----
    if (email === "") {
        showError("email-error", "请输入您的邮箱地址");
        document.getElementById("email").classList.add("error");
        isValid = false;
    } else if (!isValidEmail(email)) {
        // 检查邮箱格式是否正确
        showError("email-error", "请输入正确的邮箱格式（如：example@mail.com）");
        document.getElementById("email").classList.add("error");
        isValid = false;
    }

    // ---- 验证主题 ----
    if (subject === "") {
        showError("subject-error", "请输入留言主题");
        document.getElementById("subject").classList.add("error");
        isValid = false;
    }

    // ---- 验证留言内容 ----
    if (message === "") {
        showError("message-error", "请输入留言内容");
        document.getElementById("message").classList.add("error");
        isValid = false;
    } else if (message.length < 10) {
        // 留言内容至少10个字符
        showError("message-error", "留言内容至少需要10个字符");
        document.getElementById("message").classList.add("error");
        isValid = false;
    }

    // 如果验证全部通过
    if (isValid) {
        // 隐藏表单
        contactForm.style.display = "none";
        // 显示成功提示
        successMessage.classList.add("show");

        // 打印表单数据到控制台（实际项目中会发送到服务器）
        console.log("表单提交数据：", {
            name: name,
            email: email,
            subject: subject,
            message: message
        });

        // 3秒后重置表单（方便演示多次提交）
        setTimeout(function () {
            contactForm.style.display = "block";
            contactForm.reset(); // reset()：清空表单所有输入
            successMessage.classList.remove("show");
        }, 3000);
    }
});

/**
 * 使用正则表达式验证邮箱格式
 *
 * 正则表达式（RegExp）：用于匹配字符串的模式
 * /^[^\s@]+@[^\s@]+\.[^\s@]+$/ 的含义：
 *   ^         - 字符串开始
 *   [^\s@]+   - 一个或多个非空格、非@的字符（用户名部分）
 *   @         - 必须包含@符号
 *   [^\s@]+   - 一个或多个非空格、非@的字符（域名部分）
 *   \.        - 必须包含一个点（.需要转义）
 *   [^\s@]+   - 一个或多个非空格、非@的字符（顶级域名）
 *   $         - 字符串结束
 *
 * @param {string} email - 要验证的邮箱地址
 * @returns {boolean} - 是否为有效的邮箱格式
 */
function isValidEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // test()：正则表达式的方法，匹配成功返回true，失败返回false
    return emailPattern.test(email);
}

/**
 * 显示错误提示信息
 *
 * @param {string} elementId - 错误信息元素的id
 * @param {string} message - 要显示的错误文字
 */
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    errorElement.textContent = message;     // 设置文字内容
    errorElement.classList.add("show");     // 添加show类使其显示
}

/**
 * 清除所有错误提示
 * 在每次提交前调用，避免旧的错误残留
 */
function clearErrors() {
    // 获取所有错误信息元素
    const errors = document.querySelectorAll(".error-msg");
    errors.forEach(function (error) {
        error.textContent = "";             // 清空文字
        error.classList.remove("show");     // 隐藏
    });

    // 移除所有输入框上的error样式类
    const inputs = document.querySelectorAll(".form-group input, .form-group textarea");
    inputs.forEach(function (input) {
        input.classList.remove("error");
    });
}

// 实时清除单个输入框的错误状态（用户体验优化）
// 获取所有输入框
const formInputs = document.querySelectorAll(".form-group input, .form-group textarea");
formInputs.forEach(function (input) {
    // input 事件：输入框内容发生变化时触发
    input.addEventListener("input", function () {
        // 当用户重新输入时，清除这个输入框的错误状态
        input.classList.remove("error");
        // 找到对应的错误提示元素并隐藏
        const errorMsg = document.getElementById(input.id + "-error");
        if (errorMsg) {
            errorMsg.classList.remove("show");
        }
    });
});


// ==================== 6. 回到顶部按钮 ====================

const backToTopBtn = document.getElementById("back-to-top");

// 监听页面滚动事件
window.addEventListener("scroll", function () {
    // window.scrollY：页面垂直滚动的距离（单位：像素）
    if (window.scrollY > 500) {
        // 滚动超过500px时显示按钮
        backToTopBtn.classList.add("show");
    } else {
        // 否则隐藏
        backToTopBtn.classList.remove("show");
    }
});

// 点击按钮时滚动回顶部
backToTopBtn.addEventListener("click", function () {
    // window.scrollTo()：滚动到指定位置
    window.scrollTo({
        top: 0,              // 滚动到顶部（0px位置）
        behavior: "smooth"   // 平滑滚动
    });
});


// ==================== 7. 导航栏滚动阴影效果 ====================

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
        // 滚动超过50px时增加阴影，强化悬浮感
        navbar.style.boxShadow = "0 4px 20px rgba(0, 0, 0, 0.15)";
    } else {
        // 回到顶部时恢复默认阴影
        navbar.style.boxShadow = "var(--shadow)";
    }
});
