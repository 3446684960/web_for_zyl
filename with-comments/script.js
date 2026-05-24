/**
 * Web课程期末作业 - 吉伊卡哇主题小站 脚本文件（注释版）
 *
 * 涵盖JS核心知识点：
 * - DOM查询与操作（getElementById / querySelectorAll / createElement / appendChild）
 * - 事件处理（addEventListener / click / mousemove / input / keydown / submit）
 * - 定时器（setTimeout / setInterval / clearTimeout / clearInterval）
 * - HTTP异步请求（fetch / Promise / .then / .catch）
 * - 数组与对象（forEach / 索引 / 属性 / 对象字面量）
 * - 正则表达式（RegExp.test）
 * - 条件判断与循环
 * - Math随机数
 *
 * 功能模块：
 * 1.  角色配置（热区坐标 + 图片路径）
 * 2.  侧边栏页面导航
 * 3.  天气弹窗（fetch API调用 wttr.in）
 * 4.  角色合照热区交互（悬停3秒消失 + 点击固定）
 * 5.  九宫格角色图鉴（动态生成）
 * 6.  角色详情弹窗
 * 7.  戳一戳吉伊小游戏
 * 8.  趣味小知识随机切换
 * 9.  主页浮动装饰图标（IIFE自执行函数）
 * 10. 右下角浮动小伙伴
 * 11. 留言表单验证
 * 12. ESC关闭所有弹窗
 */

// ==================== 1. 角色配置 ====================
/**
 * 角色配置数组
 * 每个角色包含：
 *   id, name, emoji  - 基本信息
 *   image            - 九宫格图片路径（放在 images/ 文件夹下）
 *   shortDesc        - 悬停浮窗的简短描述
 *   fullDesc         - 弹窗中的详细介绍
 *   x, y, w, h       - 热区坐标（占合照图片宽高的百分比，0-100）
 *
 * 调整热区坐标的方法：
 *   打开角色介绍页，鼠标在合照上移动，观察浮窗出现的位置，
 *   然后调整对应的 x, y, w, h 值，直到浮窗准确覆盖角色
 */
var characterAreas = [
    {
        id: "chiikawa", name: "吉伊", emoji: "🐹",
        image: "images/chiikawa.png",
        shortDesc: "白色小仓鼠，天真爱哭但关键时刻很勇敢~",
        fullDesc: "吉伊（ちいかわ）是本作的主角，一只白色的小仓鼠。性格天真可爱，有点爱哭，但在关键时刻总能鼓起勇气。它和哈奇是好朋友，经常一起冒险、打工、吃东西。",
        x: 2, y: 5, w: 30, h: 80   // ← 左边第一个：吉伊
    },
    {
        id: "hachiware", name: "哈奇", emoji: "🐱",
        image: "images/hachiware.png",
        shortDesc: "蓝色小猫，开朗可靠，是吉伊最好的朋友~",
        fullDesc: "哈奇（ハチワレ）是一只蓝色的小猫，吉伊最要好的伙伴。性格开朗乐观，可靠又温柔，经常照顾吉伊和其他朋友。",
        x: 34, y: 5, w: 30, h: 80  // ← 中间：哈奇
    },
    {
        id: "usagi", name: "兔子", emoji: "🐰",
        image: "images/usagi.png",
        shortDesc: "粉色兔子，活泼搞怪，总是充满能量~",
        fullDesc: "兔子（うさぎ）是一只粉色的兔子，性格超级活泼，经常做出各种搞怪的事情逗大家开心。",
        x: 66, y: 5, w: 30, h: 80  // ← 右边第三个：兔子
    },
    {
        id: "momonga", name: "鼯鼠", emoji: "🐿️",
        image: "images/momonga.png",
        shortDesc: "小飞鼠，可以在空中滑翔的可爱伙伴~",
        fullDesc: "鼯鼠（モモンガ）是一只可爱的小飞鼠，它可以在空中滑翔，是伙伴们的好朋友。",
        x: 74, y: 20, w: 18, h: 35  // ← 调整这些值框住鼯鼠
    },
    {
        id: "kurimanju", name: "栗子馒头", emoji: "🌰",
        image: "images/kurimanju.png",
        shortDesc: "甜甜的栗子味小馒头，贪吃又可爱~",
        fullDesc: "栗子馒头（くりまんじゅう）是一个可爱的栗子形点心角色，性格贪吃，总是想着美食。它的外表圆滚滚的，非常讨人喜欢。",
        x: 5, y: 52, w: 18, h: 30   // ← 调整这些值框住栗子馒头
    },
    {
        id: "yoroi", name: "铠甲人", emoji: "⚔️",
        image: "images/yoroi.png",
        shortDesc: "穿着铠甲的神秘角色，其实很温柔~",
        fullDesc: "铠甲人（鎧さん）是一个全身穿着铠甲的神秘角色。虽然外表看起来很威武，但其实性格温柔，是可靠的伙伴。",
        x: 26, y: 50, w: 18, h: 32  // ← 调整这些值框住铠甲人
    },
    {
        id: "rakko", name: "海獭", emoji: "🦦",
        image: "images/rakko.png",
        shortDesc: "可爱的海獭，喜欢在水中玩耍~",
        fullDesc: "海獭（ラッコ）是一只可爱的海獭角色，喜欢在水中游泳和玩耍。性格温和，是大家的好朋友。",
        x: 48, y: 52, w: 18, h: 30  // ← 调整这些值框住海獭
    },
    {
        id: "shisa", name: "石狮子", emoji: "🦁",
        image: "images/shisa.png",
        shortDesc: "像守护神一样的石狮子角色~",
        fullDesc: "石狮子（シーサー）是像冲绳守护神一样的角色，有着威严的外表但内心善良，守护着伙伴们的安全。",
        x: 68, y: 50, w: 16, h: 32  // ← 调整这些值框住石狮子
    },
    {
        id: "kani", name: "螃蟹", emoji: "🦀",
        image: "images/kani.png",
        shortDesc: "横着走的小螃蟹，造型超可爱~",
        fullDesc: "螃蟹（カニ）是吉伊卡哇中的一只小螃蟹角色，横着走路的样子非常可爱，是伙伴们的开心果。",
        x: 84, y: 48, w: 14, h: 30  // ← 调整这些值框住螃蟹
    }
];


// ==================== 2. 趣味小知识库 ====================
/**
 * 小知识数组
 * 主页点击"换一条"按钮时，用 Math.random() 随机选取一条显示
 */
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


// ==================== 3. 页面导航 ====================

/**
 * querySelectorAll：通过CSS选择器查找所有匹配的元素
 * 返回 NodeList（类数组），可以用 forEach 遍历
 */
var navItems = document.querySelectorAll(".nav-item[data-page]");
var pages = document.querySelectorAll(".page");

/**
 * 切换到指定页面
 * 1. 更新侧边栏高亮（添加/移除 .active 类）
 * 2. 显示/隐藏对应的 page section
 *
 * @param {string} pageName - 页面名称（home / characters / contact）
 */
function switchPage(pageName) {
    // 遍历所有导航项，更新激活状态
    navItems.forEach(function (item) {
        item.classList.remove("active");       // 移除旧的
        if (item.getAttribute("data-page") === pageName) {
            item.classList.add("active");      // 给匹配的添加
        }
    });

    // 隐藏所有页面
    pages.forEach(function (page) {
        page.classList.remove("active");
    });

    // 显示目标页面
    var target = document.getElementById("page-" + pageName);
    if (target) {
        target.classList.add("active");
        // scrollIntoView：滚动到元素可见位置，smooth=平滑滚动
        target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
}

// 为每个侧边栏导航项绑定点击事件
navItems.forEach(function (item) {
    item.addEventListener("click", function (e) {
        e.preventDefault();  // 阻止 <a> 标签默认跳转
        switchPage(item.getAttribute("data-page"));
    });
});

// 主页中所有带 data-page 属性的按钮也能导航
document.querySelectorAll("[data-page]").forEach(function (el) {
    if (!el.classList.contains("nav-item")) {
        el.addEventListener("click", function () {
            switchPage(el.getAttribute("data-page"));
        });
    }
});

// 侧边栏的弹窗触发器（天气小助手、小彩蛋）
document.getElementById("side-weather").addEventListener("click", function (e) {
    e.preventDefault();
    openWeatherModal();
});
document.getElementById("side-game").addEventListener("click", function (e) {
    e.preventDefault();
    openGameModal();
});


// ==================== 4. 天气预报弹窗 ====================

var weatherModal = document.getElementById("weather-modal");
var weatherClose = document.getElementById("weather-close");
var cityInput = document.getElementById("city-input");
var searchBtn = document.getElementById("search-btn");
var weatherResultContainer = document.getElementById("weather-result-container");

function openWeatherModal() { weatherModal.classList.add("show"); cityInput.focus(); }
function closeWeatherModal() { weatherModal.classList.remove("show"); }

// 点击关闭按钮关闭弹窗
weatherClose.addEventListener("click", closeWeatherModal);
// 点击遮罩层（弹窗外的暗色区域）也能关闭
weatherModal.addEventListener("click", function (e) {
    if (e.target === weatherModal) closeWeatherModal();
});

/**
 * 使用 fetch API 调用 wttr.in 免费天气接口
 *
 * fetch() 返回一个 Promise 对象
 * Promise 处理异步操作：pending → fulfilled（成功）或 rejected（失败）
 * .then(callback)  处理成功结果
 * .catch(callback) 处理失败情况
 *
 * @param {string} city - 城市名称（中英文均可）
 */
function fetchWeather(city) {
    // encodeURIComponent：对URL参数中的中文进行编码
    var url = "https://wttr.in/" + encodeURIComponent(city) + "?format=j1";

    // 显示加载状态
    weatherResultContainer.innerHTML = '<div class="weather-placeholder"><span>⏳</span><p>查询中...</p></div>';

    fetch(url)
        .then(function (res) {
            // res.ok：HTTP状态码 200-299 返回 true
            if (!res.ok) throw new Error("fail");
            return res.json(); // 解析JSON（也是异步的，返回Promise）
        })
        .then(function (data) {
            var c = data.current_condition[0]; // 当前天气数据

            // 天气描述 → emoji图标映射表
            var icons = {
                "Sunny": "☀️", "Clear": "🌙", "Partly cloudy": "⛅",
                "Cloudy": "☁️", "Overcast": "☁️", "Mist": "🌫️", "Fog": "🌫️",
                "Light rain": "🌦️", "Rain": "🌧️", "Heavy rain": "⛈️",
                "Snow": "❄️", "Light snow": "🌨️"
            };

            // 根据天气描述匹配图标
            var icon = "🌈";
            Object.keys(icons).forEach(function (k) {
                // indexOf：查找子串位置，找不到返回 -1
                if (c.weatherDesc[0].value.indexOf(k) !== -1) icon = icons[k];
            });

            // 渲染天气结果（innerHTML插入HTML字符串）
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
            // 网络错误或城市名无效
            weatherResultContainer.innerHTML = '<div class="weather-placeholder"><span>😢</span><p>查询失败，请检查城市名</p></div>';
        });
}

// 点击查询按钮
searchBtn.addEventListener("click", function () {
    var city = cityInput.value.trim(); // trim() 去除首尾空格
    if (city) fetchWeather(city);
});

// 按回车键也能查询
cityInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {
        var city = cityInput.value.trim();
        if (city) fetchWeather(city);
    }
});


// ==================== 5. 角色合照热区交互 ====================
/**
 * 热区交互核心逻辑：
 *
 * 悬停（mousemove）：
 *   1. 计算鼠标在合照上的百分比坐标
 *   2. 遍历 characterAreas 数组，检查鼠标是否落在某个热区内
 *   3. 在热区内 → 调用 showTooltip() 显示浮窗，清除隐藏定时器
 *   4. 不在热区内 → 启动 setTimeout，3秒后隐藏浮窗（除非已固定）
 *
 * 鼠标离开（mouseleave）：
 *   - 启动3秒倒计时隐藏浮窗（除非已固定）
 *
 * 点击（click）：
 *   1. 在热区内 → 调用 pinTooltip() 固定浮窗
 *   2. 已固定的浮窗再次点击 → 打开角色详情弹窗
 *   3. 点击空白区域 → 取消固定
 */

var characterPhoto = document.getElementById("character-photo");
var imageWrapper = document.getElementById("character-image-wrapper");
var tooltip = document.getElementById("tooltip");
var tooltipName = document.getElementById("tooltip-name");
var tooltipDesc = document.getElementById("tooltip-desc");
var tooltipClose = document.getElementById("tooltip-close");
var imagePlaceholder = document.getElementById("image-placeholder");

var tooltipTimer = null;     // 延迟隐藏定时器ID
var tooltipPinned = false;   // 浮窗是否已固定
var currentHoverArea = null; // 当前鼠标所在角色

// ---- 动态生成九宫格角色图鉴 ----
var charGridSection = document.createElement("div");
charGridSection.className = "char-grid-section";
charGridSection.innerHTML = '<h3>九宫格角色图鉴（点击查看详情）</h3><div class="char-grid" id="char-grid"></div>';
var charGrid = charGridSection.querySelector("#char-grid");

// 遍历角色数组，为每个角色创建一个卡片
characterAreas.forEach(function (char) {
    var card = document.createElement("div");
    card.className = "char-grid-card";

    // 创建图片元素
    var img = document.createElement("img");
    img.className = "char-grid-img";
    img.src = char.image;
    img.alt = char.name;
    img.loading = "lazy";    // 懒加载：图片进入视口才加载

    // 图片加载失败时显示emoji占位符
    img.addEventListener("error", function () {
        img.style.display = "none";
        var placeholder = document.createElement("div");
        placeholder.className = "char-grid-img-placeholder";
        placeholder.textContent = char.emoji;
        // insertBefore：在指定子元素之前插入新元素
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

// 将九宫格插入角色介绍页
var charCardsContainer = document.getElementById("character-cards");
charCardsContainer.innerHTML = "";
charCardsContainer.appendChild(charGridSection);

// ---- 合照图片加载处理 ----
characterPhoto.addEventListener("load", function () {
    characterPhoto.classList.add("loaded");
});

// 如果图片已被浏览器缓存（complete = true 且 naturalWidth > 0），直接显示
if (characterPhoto.complete && characterPhoto.naturalWidth > 0) {
    characterPhoto.classList.add("loaded");
} else {
    characterPhoto.addEventListener("error", function () {
        characterPhoto.style.display = "none";
        imagePlaceholder.style.display = "flex";
    });
}

// 浮窗关闭按钮
tooltipClose.addEventListener("click", function (e) {
    e.stopPropagation(); // 阻止事件冒泡到imageWrapper
    hideTooltip(true);   // force = true，强制隐藏
});

/**
 * 显示浮窗
 * @param {Object} char - 角色对象
 * @param {number} x - left位置（px）
 * @param {number} y - top位置（px）
 */
function showTooltip(char, x, y) {
    clearTimeout(tooltipTimer);  // 清除之前的隐藏定时器
    tooltipName.textContent = char.emoji + " " + char.name;
    tooltipDesc.textContent = char.shortDesc;
    tooltip.classList.add("visible");
    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
    currentHoverArea = char;
}

/**
 * 隐藏浮窗
 * @param {boolean} force - 是否强制隐藏（忽略pinned状态）
 */
function hideTooltip(force) {
    if (tooltipPinned && !force) return; // 已固定且非强制 → 不隐藏
    tooltip.classList.remove("visible");
    tooltip.classList.remove("pinned");
    tooltipPinned = false;
    currentHoverArea = null;
}

/** 固定浮窗 */
function pinTooltip() {
    tooltipPinned = true;
    tooltip.classList.add("pinned");
    clearTimeout(tooltipTimer);
}

// ---- 鼠标在图片上移动 ----
imageWrapper.addEventListener("mousemove", function (e) {
    if (!characterPhoto.classList.contains("loaded")) return;

    // getBoundingClientRect()：获取元素相对于视口的位置和尺寸
    var rect = characterPhoto.getBoundingClientRect();
    // 计算鼠标位置占图片宽高的百分比
    var mx = ((e.clientX - rect.left) / rect.width) * 100;
    var my = ((e.clientY - rect.top) / rect.height) * 100;

    // 遍历热区数组，检查鼠标是否在某个热区内
    var found = null;
    for (var i = 0; i < characterAreas.length; i++) {
        var a = characterAreas[i];
        if (mx >= a.x && mx <= a.x + a.w && my >= a.y && my <= a.y + a.h) {
            found = a;
            break;  // 找到就退出循环
        }
    }

    if (found) {
        // 已固定且鼠标还在同一角色上 → 不变
        if (tooltipPinned && currentHoverArea === found) return;

        // 计算浮窗位置（在鼠标右下方偏移18px/14px）
        var tx = e.clientX - imageWrapper.getBoundingClientRect().left + 18;
        var ty = e.clientY - imageWrapper.getBoundingClientRect().top - 14;

        // 边界检测：浮窗超出容器右侧 → 放到鼠标左边
        if (tx + 230 > imageWrapper.offsetWidth) tx = tx - 250;
        // 边界检测：浮窗超出容器顶部 → 下移
        if (ty < 0) ty = 12;

        // 如果之前固定了另一个角色 → 取消固定
        if (tooltipPinned && currentHoverArea !== found) hideTooltip(true);

        showTooltip(found, tx, ty);
    } else {
        // 鼠标不在任何热区上
        if (tooltipPinned) return; // 已固定则不动
        clearTimeout(tooltipTimer);
        // setTimeout：延迟3秒后执行
        tooltipTimer = setTimeout(function () { hideTooltip(true); }, 3000);
    }
});

// ---- 鼠标离开图片容器 ----
imageWrapper.addEventListener("mouseleave", function () {
    if (tooltipPinned) return;
    clearTimeout(tooltipTimer);
    tooltipTimer = setTimeout(function () { hideTooltip(true); }, 3000);
});

// ---- 点击图片 ----
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
        // 如果该角色已固定 → 打开详情弹窗
        if (tooltipPinned && currentHoverArea === found) { openCharModal(found); return; }
        // 否则固定浮窗
        clearTimeout(tooltipTimer);
        var tx = e.clientX - imageWrapper.getBoundingClientRect().left + 18;
        var ty = e.clientY - imageWrapper.getBoundingClientRect().top - 14;
        if (tx + 230 > imageWrapper.offsetWidth) tx = tx - 250;
        if (ty < 0) ty = 12;
        showTooltip(found, tx, ty);
        pinTooltip();
    } else {
        // 点击空白区域 → 取消固定
        if (tooltipPinned) hideTooltip(true);
    }
});


// ==================== 6. 角色详情弹窗 ====================

var charModal = document.getElementById("char-modal");
var charModalClose = document.getElementById("char-modal-close");

function openCharModal(char) {
    // 弹窗中显示角色图片（不再是emoji），alt属性用于图片加载失败时显示角色名
    var emojiEl = document.getElementById("char-modal-emoji");
    emojiEl.innerHTML = '<img src="' + char.image + '" alt="' + char.name + '" class="modal-char-img">';
    document.getElementById("char-modal-name").textContent = char.name;
    document.getElementById("char-modal-desc").textContent = char.fullDesc;
    charModal.classList.add("show");
}

function closeCharModal() { charModal.classList.remove("show"); }
charModalClose.addEventListener("click", closeCharModal);
charModal.addEventListener("click", function (e) {
    if (e.target === charModal) closeCharModal();
});


// ==================== 7. 戳一戳吉伊小游戏 ====================
/**
 * 简单点击游戏：
 * - 吉伊emoji在游戏区域内随机跳动
 * - 点击它得分 +1，同时跳到新位置
 * - 30秒倒计时，结束后弹窗显示得分
 */

var gameModal = document.getElementById("game-modal");
var gameClose = document.getElementById("game-close");
var gameArea = document.getElementById("game-area");
var gameTarget = document.getElementById("game-target");
var gameScoreEl = document.getElementById("game-score");
var gameTimeEl = document.getElementById("game-time");
var btnStartGame = document.getElementById("btn-start-game");

var gameScore = 0, gameTime = 30;
var gameRunning = false, gameTimer = null;

function openGameModal() { gameModal.classList.add("show"); resetGame(); }
function closeGameModal() { gameModal.classList.remove("show"); stopGame(); }

gameClose.addEventListener("click", closeGameModal);
gameModal.addEventListener("click", function (e) { if (e.target === gameModal) closeGameModal(); });

function resetGame() {
    stopGame();
    gameScore = 0; gameTime = 30;
    gameScoreEl.textContent = "0";
    gameTimeEl.textContent = "30";
    gameTarget.style.left = "50%";
    gameTarget.style.top = "50%";
    gameTarget.style.display = "block";
    btnStartGame.style.display = "inline-block";
}

function stopGame() {
    gameRunning = false;
    clearInterval(gameTimer); // 停止定时器
}

/** 将目标随机移动到游戏区域的某个位置 */
function moveTarget() {
    // offsetWidth/offsetHeight：元素的渲染宽高
    var maxX = gameArea.offsetWidth - 60;
    var maxY = gameArea.offsetHeight - 60;
    // Math.random() 生成 0~1 的随机数，Math.floor 向下取整
    gameTarget.style.left = Math.floor(Math.random() * maxX) + "px";
    gameTarget.style.top = Math.floor(Math.random() * maxY) + "px";
    // 重置动画
    gameTarget.style.animation = "none";
    gameTarget.offsetHeight; // 触发回流（reflow），强制浏览器重绘
    gameTarget.style.animation = "targetPop 0.25s ease";
}

// 点击目标得分
gameTarget.addEventListener("click", function (e) {
    if (!gameRunning) return;
    e.stopPropagation();
    gameScore++;
    gameScoreEl.textContent = gameScore;
    moveTarget();
});

// 开始游戏
btnStartGame.addEventListener("click", function () {
    gameScore = 0; gameTime = 30;
    gameScoreEl.textContent = "0"; gameTimeEl.textContent = "30";
    gameRunning = true;
    btnStartGame.style.display = "none";
    moveTarget();

    // setInterval：每隔1000ms（1秒）执行一次，返回定时器ID
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


// ==================== 8. 趣味小知识随机切换 ====================

var factText = document.getElementById("fact-text");
var btnFact = document.getElementById("btn-fact");
var lastFactIndex = -1;

btnFact.addEventListener("click", function () {
    var idx;
    // do...while：至少执行一次，且确保不跟上一条重复
    do {
        idx = Math.floor(Math.random() * funFacts.length);
    } while (idx === lastFactIndex && funFacts.length > 1);
    lastFactIndex = idx;
    factText.textContent = funFacts[idx]; // textContent 设置纯文本（不会解析HTML）
});


// ==================== 9. 主页浮动装饰图标 ====================
/**
 * IIFE（Immediately Invoked Function Expression）自执行函数
 * 格式：(function() { ... })();
 * 定义后立即执行，不需要显式调用
 *
 * 在Hero区域生成12个随机浮动装饰图标
 */
(function () {
    var container = document.getElementById("floating-icons");
    if (!container) return; // 防御性检查

    var icons = ["🌸", "🍀", "✨", "🌿", "💚", "🐾", "⭐", "🌱"];

    for (var i = 0; i < 12; i++) {
        var el = document.createElement("span");
        el.className = "float-icon";
        el.textContent = icons[Math.floor(Math.random() * icons.length)];
        // 随机位置（百分比），避免靠边太近（0~90%）
        el.style.left = (Math.random() * 90) + "%";
        el.style.top = (Math.random() * 90) + "%";
        // 随机动画延迟和时长，错开动画节奏
        el.style.animationDelay = (Math.random() * 8) + "s";
        el.style.animationDuration = (6 + Math.random() * 10) + "s";
        el.style.fontSize = (18 + Math.random() * 24) + "px";
        // appendChild：将新元素添加到父容器
        container.appendChild(el);
    }
})();


// ==================== 10. 右下角浮动小伙伴 ====================

var mascot = document.getElementById("floating-mascot");
var mascotBubble = document.getElementById("mascot-bubble");
var mascotMessages = ["你好呀~", "今天开心吗？", "戳戳我~", "うれしたのし！", "加油！", "来玩呀~", "好天气！", "吃了吗？"];
var msgIndex = 0;

mascot.addEventListener("click", function () {
    // % 取模运算实现循环显示
    mascotBubble.textContent = mascotMessages[msgIndex % mascotMessages.length];
    msgIndex++;
    // 显示气泡
    mascotBubble.style.opacity = "1";
    mascotBubble.style.visibility = "visible";
    // 2秒后自动隐藏
    setTimeout(function () {
        mascotBubble.style.opacity = "0";
        mascotBubble.style.visibility = "hidden";
    }, 2000);

    // 点击弹跳重置动画
    mascot.style.animation = "none";
    mascot.offsetHeight; // 触发回流
    mascot.style.animation = "floatMascot 3s ease-in-out infinite";
});


// ==================== 11. 留言表单验证 ====================

var contactForm = document.getElementById("contact-form");
var successMessage = document.getElementById("success-message");

// 监听表单的 submit 事件
contactForm.addEventListener("submit", function (e) {
    e.preventDefault(); // 阻止页面刷新

    // 获取所有输入值，trim() 去除首尾空格
    var name = document.getElementById("name").value.trim();
    var email = document.getElementById("email").value.trim();
    var subject = document.getElementById("subject").value.trim();
    var message = document.getElementById("message").value.trim();

    clearErrors(); // 清除旧的错误提示
    var valid = true;

    if (!name) { showFieldError("name", "name-error", "请输入你的昵称"); valid = false; }
    if (!email) { showFieldError("email", "email-error", "请输入你的邮箱地址"); valid = false; }
    // 正则表达式 /pattern/.test(string) 测试是否匹配
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showFieldError("email", "email-error", "请输入正确的邮箱格式");
        valid = false;
    }
    if (!subject) { showFieldError("subject", "subject-error", "请输入留言主题"); valid = false; }
    if (!message) { showFieldError("message", "message-error", "请输入留言内容"); valid = false; }
    else if (message.length < 10) { showFieldError("message", "message-error", "留言内容至少需要10个字符"); valid = false; }

    if (valid) {
        // 验证通过：隐藏表单，显示成功提示
        contactForm.style.display = "none";
        successMessage.classList.add("show");
        // console.log：在浏览器控制台输出数据（F12→Console查看）
        console.log("留言数据：", { name: name, email: email, subject: subject, message: message });
        // 3秒后自动恢复（方便演示多次提交）
        setTimeout(function () {
            contactForm.style.display = "block";
            contactForm.reset(); // reset()清空表单
            successMessage.classList.remove("show");
        }, 3000);
    }
});

/** 显示输入框错误 */
function showFieldError(fieldId, errorId, msg) {
    document.getElementById(fieldId).classList.add("error");
    var errEl = document.getElementById(errorId);
    errEl.textContent = msg;
    errEl.classList.add("show");
}

/** 清除所有错误 */
function clearErrors() {
    document.querySelectorAll(".error-msg").forEach(function (el) {
        el.textContent = "";
        el.classList.remove("show");
    });
    document.querySelectorAll(".form-group input, .form-group textarea").forEach(function (el) {
        el.classList.remove("error");
    });
}

// 实时清除单个输入框错误（用户重新输入时自动隐藏错误提示）
document.querySelectorAll(".form-group input, .form-group textarea").forEach(function (input) {
    // input 事件：输入框内容每次变化时触发
    input.addEventListener("input", function () {
        input.classList.remove("error");
        var errEl = document.getElementById(input.id + "-error");
        if (errEl) errEl.classList.remove("show");
    });
});


// ==================== 12. ESC 关闭所有弹窗 ====================
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeWeatherModal();
        closeCharModal();
        closeGameModal();
        hideTooltip(true);
    }
});
