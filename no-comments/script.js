// ===== 角色配置 =====
// x, y, w, h 是热区坐标（占图片宽高的百分比）
// image: 角色图片路径，放在 images/ 文件夹下
var characterAreas = [
    {
        id: "chiikawa", name: "吉伊", emoji: "🐹",
        image: "images/chiikawa.png",
        shortDesc: "白色小仓鼠，天真爱哭但关键时刻很勇敢~",
        fullDesc: "吉伊（ちいかわ）是本作的主角，一只白色的小仓鼠。性格天真可爱，有点爱哭，但在关键时刻总能鼓起勇气。它和哈奇是好朋友，经常一起冒险、打工、吃东西。",
        x: 2, y: 5, w: 30, h: 80
    },
    {
        id: "hachiware", name: "哈奇", emoji: "🐱",
        image: "images/hachiware.png",
        shortDesc: "蓝色小猫，开朗可靠，是吉伊最好的朋友~",
        fullDesc: "哈奇（ハチワレ）是一只蓝色的小猫，吉伊最要好的伙伴。性格开朗乐观，可靠又温柔，经常照顾吉伊和其他朋友。",
        x: 34, y: 5, w: 30, h: 80
    },
    {
        id: "usagi", name: "兔子", emoji: "🐰",
        image: "images/usagi.png",
        shortDesc: "粉色兔子，活泼搞怪，总是充满能量~",
        fullDesc: "兔子（うさぎ）是一只粉色的兔子，性格超级活泼，经常做出各种搞怪的事情逗大家开心。",
        x: 66, y: 5, w: 30, h: 80
    },
    {
        id: "momonga", name: "鼯鼠", emoji: "🐿️",
        image: "images/momonga.png",
        shortDesc: "小飞鼠，可以在空中滑翔的可爱伙伴~",
        fullDesc: "鼯鼠（モモンガ）是一只可爱的小飞鼠，它可以在空中滑翔，是伙伴们的好朋友。",
        x: 74, y: 20, w: 18, h: 35
    },
    {
        id: "kurimanju", name: "栗子馒头", emoji: "🌰",
        image: "images/kurimanju.png",
        shortDesc: "甜甜的栗子味小馒头，贪吃又可爱~",
        fullDesc: "栗子馒头（くりまんじゅう）是一个可爱的栗子形点心角色，性格贪吃，总是想着美食。它的外表圆滚滚的，非常讨人喜欢。",
        x: 5, y: 52, w: 18, h: 30
    },
    {
        id: "yoroi", name: "铠甲人", emoji: "⚔️",
        image: "images/yoroi.png",
        shortDesc: "穿着铠甲的神秘角色，其实很温柔~",
        fullDesc: "铠甲人（鎧さん）是一个全身穿着铠甲的神秘角色。虽然外表看起来很威武，但其实性格温柔，是可靠的伙伴。",
        x: 26, y: 50, w: 18, h: 32
    },
    {
        id: "rakko", name: "海獭", emoji: "🦦",
        image: "images/rakko.png",
        shortDesc: "可爱的海獭，喜欢在水中玩耍~",
        fullDesc: "海獭（ラッコ）是一只可爱的海獭角色，喜欢在水中游泳和玩耍。性格温和，是大家的好朋友。",
        x: 48, y: 52, w: 18, h: 30
    },
    {
        id: "shisa", name: "石狮子", emoji: "🦁",
        image: "images/shisa.png",
        shortDesc: "像守护神一样的石狮子角色~",
        fullDesc: "石狮子（シーサー）是像冲绳守护神一样的角色，有着威严的外表但内心善良，守护着伙伴们的安全。",
        x: 68, y: 50, w: 16, h: 32
    },
    {
        id: "kani", name: "螃蟹", emoji: "🦀",
        image: "images/kani.png",
        shortDesc: "横着走的小螃蟹，造型超可爱~",
        fullDesc: "螃蟹（カニ）是吉伊卡哇中的一只小螃蟹角色，横着走路的样子非常可爱，是伙伴们的开心果。",
        x: 84, y: 48, w: 14, h: 30
    }
];

// ===== 趣味小知识 =====
var funFacts = [
    '🐹 吉伊卡哇的全称是「なんか小さくてかわいいやつ」，直译就是"又小又可爱的家伙"。',
    "📺 吉伊卡哇最初是在Twitter上连载的短篇漫画，因为太受欢迎后来出了动画。",
    "🐱 哈奇（Hachiware）的名字来源于日语「八割れ」，指的是它头上的八字纹。",
    "🐰 兔子虽然看起来疯疯癫癫的，但它是团队中战斗力最强的角色！",
    "🍜 吉伊卡哇的世界里，角色们需要「打工」来赚取食物和日用品。",
    "🏆 吉伊卡哇获得过「2021年日本角色大赏」大奖。",
    "🎵 动画的片尾曲「ひとりごつ」非常洗脑，很多粉丝都会唱。",
    "💀 别看画风软萌，吉伊卡哇的剧情有时候会突然出现黑暗和恐怖元素！",
    "🍙 吉伊最喜欢吃的食物是饭团和拉面。",
    "🎮 吉伊卡哇有官方的手机游戏，可以在App Store和Google Play下载。"
];

// ===== 页面导航 =====
var navItems = document.querySelectorAll(".nav-item[data-page]");
var pages = document.querySelectorAll(".page");

function switchPage(pageName) {
    navItems.forEach(function (item) {
        item.classList.remove("active");
        if (item.getAttribute("data-page") === pageName) {
            item.classList.add("active");
        }
    });
    pages.forEach(function (page) {
        page.classList.remove("active");
    });
    var target = document.getElementById("page-" + pageName);
    if (target) {
        target.classList.add("active");
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

navItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.preventDefault();
        switchPage(item.getAttribute("data-page"));
    });
});

document.querySelectorAll("[data-page]").forEach(function (el) {
    if (!el.classList.contains("nav-item")) {
        el.addEventListener("click", function () {
            switchPage(el.getAttribute("data-page"));
        });
    }
});

// 侧边栏弹窗触发器
document.getElementById("side-weather").addEventListener("click", function (e) {
    e.preventDefault();
    openWeatherModal();
});
document.getElementById("side-game").addEventListener("click", function (e) {
    e.preventDefault();
    openGameModal();
});

// ===== 天气弹窗 =====
var weatherModal = document.getElementById("weather-modal");
var weatherClose = document.getElementById("weather-close");
var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var weatherResultContainer = document.getElementById("weather-result-container");

function openWeatherModal() { weatherModal.classList.add("show"); cityInput.focus(); }
function closeWeatherModal() { weatherModal.classList.remove("show"); }

weatherClose.addEventListener("click", closeWeatherModal);
weatherModal.addEventListener("click", function (e) {
    if (e.target === weatherModal) closeWeatherModal();
});

function fetchWeather(city) {
    var url = "https://wttr.in/" + encodeURIComponent(city) + "?format=j1";
    weatherResultContainer.innerHTML = '<div class="weather-placeholder"><span>⏳</span><p>查询中...</p></div>';
    fetch(url)
        .then(function (res) { if (!res.ok) throw new Error("fail"); return res.json(); })
        .then(function (data) {
            var c = data.current_condition[0];
            var icons = {
                "Sunny": "☀️", "Clear": "🌙", "Partly cloudy": "⛅",
                "Cloudy": "☁️", "Overcast": "☁️", "Mist": "🌫️", "Fog": "🌫️",
                "Light rain": "🌦️", "Rain": "🌧️", "Heavy rain": "⛈️",
                "Snow": "❄️", "Light snow": "🌨️"
            };
            var icon = "🌈";
            Object.keys(icons).forEach(function (k) {
                if (c.weatherDesc[0].value.indexOf(k) !== -1) icon = icons[k];
            });
            weatherResultContainer.innerHTML =
                '<div class="weather-result show">' +
                    '<div class="weather-city-name">' + icon + ' ' + city + '</div>' +
                    '<div class="weather-temp-main">' + c.temp_C + '°C</div>' +
                    '<div class="weather-desc-text">' + c.weatherDesc[0].value + '</div>' +
                    '<div class="weather-detail-row">' +
                        '<div class="weather-detail-item"><div class="weather-detail-label">体感</div><div class="weather-detail-value">' + c.FeelsLikeC + '°C</div></div>' +
                        '<div class="weather-detail-item"><div class="weather-detail-label">湿度</div><div class="weather-detail-value">' + c.humidity + '%</div></div>' +
                        '<div class="weather-detail-item"><div class="weather-detail-label">风速</div><div class="weather-detail-value">' + c.windspeedKmph + 'km/h</div></div>' +
                    '</div>' +
                '</div>';
        })
        .catch(function () {
            weatherResultContainer.innerHTML = '<div class="weather-placeholder"><span>😢</span><p>查询失败，请检查城市名</p></div>';
        });
}

searchBtn.addEventListener("click", function () {
    var city = cityInput.value.trim();
    if (city) fetchWeather(city);
});
cityInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        var city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});

// ===== 角色合照热区 =====
var characterPhoto = document.getElementById("character-photo");
var imageWrapper = document.getElementById("character-image-wrapper");
var tooltip = document.getElementById("tooltip");
var tooltipName = document.getElementById("tooltip-name");
var tooltipDesc = document.getElementById("tooltip-desc");
var tooltipClose = document.getElementById("tooltip-close");
var imagePlaceholder = document.getElementById("image-placeholder");

var tooltipTimer = null;
var tooltipPinned = false;
var currentHoverArea = null;

// 生成九宫格角色卡片
var charGridSection = document.createElement("div");
charGridSection.className = "char-grid-section";
charGridSection.innerHTML = '<h3>九宫格角色图鉴（点击查看详情）</h3><div class="char-grid" id="char-grid"></div>';
var charGrid = charGridSection.querySelector("#char-grid");

characterAreas.forEach(function (char) {
    var card = document.createElement("div");
    card.className = "char-grid-card";

    var img = document.createElement("img");
    img.className = "char-grid-img";
    img.src = char.image;
    img.alt = char.name;
    img.loading = "lazy";
    img.addEventListener("error", function () {
        img.style.display = "none";
        var placeholder = document.createElement("div");
        placeholder.className = "char-grid-img-placeholder";
        placeholder.textContent = char.emoji;
        card.insertBefore(placeholder, card.firstChild);
    });

    var nameEl = document.createElement("div");
    nameEl.className = "char-grid-name";
    nameEl.textContent = char.name;

    card.appendChild(img);
    card.appendChild(nameEl);
    card.addEventListener("click", function () { openCharModal(char); });
    charGrid.appendChild(card);
});

// 把九宫格插入角色页面
var charCardsContainer = document.getElementById("character-cards");
charCardsContainer.innerHTML = "";
charCardsContainer.appendChild(charGridSection);

// 图片加载
characterPhoto.addEventListener("load", function () { characterPhoto.classList.add("loaded"); });
if (characterPhoto.complete && characterPhoto.naturalWidth > 0) {
    characterPhoto.classList.add("loaded");
} else {
    characterPhoto.addEventListener("error", function () {
        characterPhoto.style.display = "none";
        imagePlaceholder.style.display = "flex";
    });
}

tooltipClose.addEventListener("click", function (e) { e.stopPropagation(); hideTooltip(true); });

function showTooltip(char, x, y) {
    clearTimeout(tooltipTimer);
    tooltipName.textContent = char.emoji + " " + char.name;
    tooltipDesc.textContent = char.shortDesc;
    tooltip.classList.add("visible");
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
    currentHoverArea = char;
}

function hideTooltip(force) {
    if (tooltipPinned && !force) return;
    tooltip.classList.remove("visible");
    tooltip.classList.remove("pinned");
    tooltipPinned = false;
    currentHoverArea = null;
}

function pinTooltip() { tooltipPinned = true; tooltip.classList.add("pinned"); clearTimeout(tooltipTimer); }

imageWrapper.addEventListener("mousemove", function (e) {
    if (!characterPhoto.classList.contains("loaded")) return;
    var rect = characterPhoto.getBoundingClientRect();
    var mx = ((e.clientX - rect.left) / rect.width) * 100;
    var my = ((e.clientY - rect.top) / rect.height) * 100;
    var found = null;
    for (var i = 0; i < characterAreas.length; i++) {
        var a = characterAreas[i];
        if (mx >= a.x && mx <= a.x + a.w && my >= a.y && my <= a.y + a.h) { found = a; break; }
    }
    if (found) {
        if (tooltipPinned && currentHoverArea === found) return;
        var tx = e.clientX - imageWrapper.getBoundingClientRect().left + 18;
        var ty = e.clientY - imageWrapper.getBoundingClientRect().top - 14;
        if (tx + 230 > imageWrapper.offsetWidth) tx = tx - 250;
        if (ty < 0) ty = 12;
        if (tooltipPinned && currentHoverArea !== found) hideTooltip(true);
        showTooltip(found, tx, ty);
    } else {
        if (tooltipPinned) return;
        clearTimeout(tooltipTimer);
        tooltipTimer = setTimeout(function () { hideTooltip(true); }, 3000);
    }
});

imageWrapper.addEventListener("mouseleave", function () {
    if (tooltipPinned) return;
    clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(function () { hideTooltip(true); }, 3000);
});

imageWrapper.addEventListener("click", function (e) {
    if (!characterPhoto.classList.contains("loaded")) return;
    if (e.target === tooltipClose) return;
    var rect = characterPhoto.getBoundingClientRect();
    var mx = ((e.clientX - rect.left) / rect.width) * 100;
    var my = ((e.clientY - rect.top) / rect.height) * 100;
    var found = null;
    for (var i = 0; i < characterAreas.length; i++) {
        var a = characterAreas[i];
        if (mx >= a.x && mx <= a.x + a.w && my >= a.y && my <= a.y + a.h) { found = a; break; }
    }
    if (found) {
        if (tooltipPinned && currentHoverArea === found) { openCharModal(found); return; }
        clearTimeout(tooltipTimer);
        var tx = e.clientX - imageWrapper.getBoundingClientRect().left + 18;
        var ty = e.clientY - imageWrapper.getBoundingClientRect().top - 14;
        if (tx + 230 > imageWrapper.offsetWidth) tx = tx - 250;
        if (ty < 0) ty = 12;
        showTooltip(found, tx, ty);
        pinTooltip();
    } else {
        if (tooltipPinned) hideTooltip(true);
    }
});

// ===== 角色详情弹窗 =====
var charModal = document.getElementById("char-modal");
var charModalClose = document.getElementById("char-modal-close");

function openCharModal(char) {
    var emojiEl = document.getElementById("char-modal-emoji");
    emojiEl.innerHTML = '<img src="' + char.image + '" alt="' + char.name + '" class="modal-char-img">';
    document.getElementById("char-modal-name").textContent = char.name;
    document.getElementById("char-modal-desc").textContent = char.fullDesc;
    charModal.classList.add("show");
}

function closeCharModal() { charModal.classList.remove("show"); }
charModalClose.addEventListener("click", closeCharModal);
charModal.addEventListener("click", function (e) { if (e.target === charModal) closeCharModal(); });

// ===== 小彩蛋游戏 =====
var gameModal = document.getElementById("game-modal");
var gameClose = document.getElementById("game-close");
var gameArea = document.getElementById("game-area");
var gameTarget = document.getElementById("game-target");
var gameScoreEl = document.getElementById("game-score");
var gameTimeEl = document.getElementById("game-time");
var btnStartGame = document.getElementById("btn-start-game");
var gameScore = 0, gameTime = 30, gameRunning = false, gameTimer = null;

function openGameModal() { gameModal.classList.add("show"); resetGame(); }
function closeGameModal() { gameModal.classList.remove("show"); stopGame(); }

gameClose.addEventListener("click", closeGameModal);
gameModal.addEventListener("click", function (e) { if (e.target === gameModal) closeGameModal(); });

function resetGame() {
    stopGame();
    gameScore = 0; gameTime = 30;
    gameScoreEl.textContent = "0"; gameTimeEl.textContent = "30";
    gameTarget.style.left = "50%"; gameTarget.style.top = "50%";
    gameTarget.style.display = "block";
    btnStartGame.style.display = "inline-block";
}

function stopGame() { gameRunning = false; clearInterval(gameTimer); }

function moveTarget() {
    var maxX = gameArea.offsetWidth - 60, maxY = gameArea.offsetHeight - 60;
    gameTarget.style.left = Math.floor(Math.random() * maxX) + "px";
    gameTarget.style.top = Math.floor(Math.random() * maxY) + "px";
    gameTarget.style.animation = "none";
    gameTarget.offsetHeight;
    gameTarget.style.animation = "targetPop 0.25s ease";
}

gameTarget.addEventListener("click", function (e) {
    if (!gameRunning) return;
    e.stopPropagation();
    gameScore++;
    gameScoreEl.textContent = gameScore;
    moveTarget();
});

btnStartGame.addEventListener("click", function () {
    gameScore = 0; gameTime = 30;
    gameScoreEl.textContent = "0"; gameTimeEl.textContent = "30";
    gameRunning = true;
    btnStartGame.style.display = "none";
    moveTarget();
    gameTimer = setInterval(function () {
        gameTime--;
        gameTimeEl.textContent = gameTime;
        if (gameTime <= 0) {
            stopGame();
            gameTarget.style.display = "none";
            alert("游戏结束！你的得分是：" + gameScore + " 分 🎉");
            btnStartGame.style.display = "inline-block";
            gameTarget.style.display = "block";
        }
    }, 1000);
});

// ===== 趣味小知识 =====
var factText = document.getElementById("fact-text");
var btnFact = document.getElementById("btn-fact");
var lastFactIndex = -1;
btnFact.addEventListener("click", function () {
    var idx;
    do { idx = Math.floor(Math.random() * funFacts.length); }
    while (idx === lastFactIndex && funFacts.length > 1);
    lastFactIndex = idx;
    factText.textContent = funFacts[idx];
});

// ===== 浮动图标 =====
(function () {
    var container = document.getElementById("floating-icons");
    if (!container) return;
    var icons = ["🌸", "🍀", "✨", "🌿", "💚", "🐾", "⭐", "🌱"];
    for (var i = 0; i < 12; i++) {
        var el = document.createElement("span");
        el.className = "float-icon";
        el.textContent = icons[Math.floor(Math.random() * icons.length)];
        el.style.left = (Math.random() * 90) + "%";
        el.style.top = (Math.random() * 90) + "%";
        el.style.animationDelay = (Math.random() * 8) + "s";
        el.style.animationDuration = (6 + Math.random() * 10) + "s";
        el.style.fontSize = (18 + Math.random() * 24) + "px";
        container.appendChild(el);
    }
})();

// ===== 浮动小伙伴 =====
var mascot = document.getElementById("floating-mascot");
var mascotBubble = document.getElementById("mascot-bubble");
var mascotMessages = ["你好呀~", "今天开心吗？", "戳戳我~", "うれしたのし！", "加油！", "来玩呀~", "好天气！", "吃了吗？"];
var msgIndex = 0;

mascot.addEventListener("click", function () {
    mascotBubble.textContent = mascotMessages[msgIndex % mascotMessages.length];
    msgIndex++;
    mascotBubble.style.opacity = "1";
    mascotBubble.style.visibility = "visible";
    setTimeout(function () { mascotBubble.style.opacity = "0"; mascotBubble.style.visibility = "hidden"; }, 2000);
    mascot.style.animation = "none";
    mascot.offsetHeight;
    mascot.style.animation = "floatMascot 3s ease-in-out infinite";
});

// ===== 留言表单 =====
var contactForm = document.getElementById("contact-form");
var successMessage = document.getElementById("success-message");

contactForm.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var message = document.getElementById("message").value.trim();
    clearErrors();
    var valid = true;

    if (!name) { showFieldError("name", "name-error", "请输入你的昵称"); valid = false; }
    if (!email) { showFieldError("email", "email-error", "请输入你的邮箱地址"); valid = false; }
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { showFieldError("email", "email-error", "请输入正确的邮箱格式"); valid = false; }
    if (!subject) { showFieldError("subject", "subject-error", "请输入留言主题"); valid = false; }
    if (!message) { showFieldError("message", "message-error", "请输入留言内容"); valid = false; }
    else if (message.length < 10) { showFieldError("message", "message-error", "留言内容至少需要10个字符"); valid = false; }

    if (valid) {
        contactForm.style.display = "none";
        successMessage.classList.add("show");
        console.log("留言数据：", { name: name, email: email, subject: subject, message: message });
        setTimeout(function () { contactForm.style.display = "block"; contactForm.reset(); successMessage.classList.remove("show"); }, 3000);
    }
});

function showFieldError(fieldId, errorId, msg) {
    document.getElementById(fieldId).classList.add("error");
    var errEl = document.getElementById(errorId);
    errEl.textContent = msg;
    errEl.classList.add("show");
}

function clearErrors() {
    document.querySelectorAll(".error-msg").forEach(function (el) { el.textContent = ""; el.classList.remove("show"); });
    document.querySelectorAll(".form-group input, .form-group textarea").forEach(function (el) { el.classList.remove("error"); });
}

document.querySelectorAll(".form-group input, .form-group textarea").forEach(function (input) {
    input.addEventListener("input", function () {
        input.classList.remove("error");
        var errEl = document.getElementById(input.id + "-error");
        if (errEl) errEl.classList.remove("show");
    });
});

// ESC关闭弹窗
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeWeatherModal(); closeCharModal(); closeGameModal(); hideTooltip(true); }
});
