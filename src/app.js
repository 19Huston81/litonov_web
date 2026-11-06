// ===== ДАННЫЕ =====
const QUOTES = [
  {
    text: "Мы должны быть рабами законов, чтобы стать свободными",
    author: "Марк Туллий Цицерон",
  },
  {
    text: "Поступай так, чтобы максима твоего поступка могла бы стать основой всеобщего закона",
    author: "Иммануил Кант",
  },
  {
    text: "Законы подобны паутине: мелкие насекомые в ней запутываются, большие — никогда",
    author: "Фрэнсис Бэкон",
  },
  {
    text: "Незнание закона не освобождает от ответственности. А вот знание нередко освобождает",
    author: "Станислав Ежи Лец",
  },
  { text: "Закон есть разум, свободный от страсти", author: "Аристотель" },
  {
    text: "Свобода есть право делать всё, что дозволено законами",
    author: "Шарль Луи Монтескье",
  },
];

const REVIEWS = [
  {
    text: "Александр Михайлович — настоящий профессионал. Взялся за моё дело, когда другие отказывались. Благодаря его работе приговор был смягчён.",
    author: "Сергей К.",
    tag: "Уголовное дело",
  },
  {
    text: "Обратилась по вопросу раздела имущества. Александр чётко объяснил мои права, грамотно составил все документы. Суд мы выиграли!",
    author: "Марина К.",
    tag: "Семейный спор",
  },
  {
    text: "Помог с оформлением документов для нашей компании и сопровождением сделки. Работает быстро, ответственно. Стали постоянными клиентами.",
    author: "ООО «ТрансАвто»",
    tag: "Юридическое сопровождение",
  },
  {
    text: "Обратился по административному делу — лишение прав. Александр Михайлович нашел процессуальные нарушения, и дело прекратили. Спасибо!",
    author: "Дмитрий В.",
    tag: "Административное дело",
  },
  {
    text: "Помог оформить наследство после длительного спора. Очень внимательный и чуткий специалист. Всегда на связи, объясняет каждый шаг доступно.",
    author: "Светлана Р.",
    tag: "Наследственный спор",
  },
  {
    text: "Обратились как семья участника СВО. Александр провел бесплатную консультацию и помог разобраться с выплатами. Огромное спасибо!",
    author: "Семья Пупкиных",
    tag: "Защита семьи участника СВО",
  },
];

const FAQ_DATA = [
  {
    q: "Сколько стоит первичная консультация?",
    a: "Первичная консультация платная, стоимость уточняйте по телефону. Бесплатная консультация — по четвергам с 15:00 до 17:00 для участников СВО и семьям погибших бойцов.",
  },
  {
    q: "Как быстро вы можете взяться за дело?",
    a: "В срочных случаях — в течение нескольких часов. После первого обращения согласовываем удобное время и приступаем к работе без промедлений.",
  },
  {
    q: "Работаете ли вы с делами в других городах?",
    a: "Да, работаю в Нижнем Новгороде и Новгородской области, а также в других регионах России. Консультацию можно получить дистанционно — по телефону, WhatsApp или Telegram.",
  },
  {
    q: "Возможна ли консультация онлайн?",
    a: "Да, консультация доступна онлайн через Telegram или WhatsApp. Напишите или позвоните — договоримся об удобном формате.",
  },
  {
    q: "Какие гарантии вы предоставляете?",
    a: "Честно оцениваю перспективы дела на первой консультации. Никаких ложных обещаний — только профессиональная работа и защита ваших интересов до конца.",
  },
];

const SPECIALIZATIONS = [
  "Договорные и арбитражные споры",
  "Защита прав потребителей",
  "Семейные и трудовые споры",
  "Жилищные и имущественные споры",
  "Представительство по делам о банкротстве граждан",
  "Налоговые и таможенные споры",
  "Подготовка юридических документов",
  "Правовая помощь участникам СВО, ветеранам боевых действий и членам их семей",
];

const FALLBACK_ENDPOINT = "./send.php";

// ===== SCROLL REVEAL =====
function initReveal() {
  const els = document.querySelectorAll("[data-reveal]:not(.in)");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("in"));
    return;
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          io.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14, rootMargin: "0px 0px -40px 0px" },
  );
  els.forEach((el) => io.observe(el));
}

// ===== TYPEWRITER =====
function initTypewriter() {
  const el = document.getElementById("typewriter");
  if (!el) return;
  let idx = 0,
    pos = SPECIALIZATIONS[0].length,
    deleting = false;

  function tick() {
    const word = SPECIALIZATIONS[idx];
    if (!deleting) {
      pos++;
      if (pos >= word.length) {
        deleting = true;
        setTimeout(tick, 2100);
        el.textContent = word.slice(0, pos);
        return;
      }
      setTimeout(tick, 65);
    } else {
      pos--;
      if (pos <= 0) {
        deleting = false;
        idx = (idx + 1) % SPECIALIZATIONS.length;
        setTimeout(tick, 350);
        el.textContent = "";
        return;
      }
      setTimeout(tick, 32);
    }
    el.textContent = word.slice(0, pos);
  }
  setTimeout(tick, 2400);
}

let scrollY = 0;

// ===== HEADER / MOBILE MENU =====
function initHeader() {
  const header = document.getElementById("site-header");
  const burger = document.getElementById("burger");
  const menu = document.getElementById("mobile-menu");
  const navLinks = document.querySelectorAll(".main-nav a");
  const SPY = [
    "#about",
    "#services",
    "#principles",
    "#reviews",
    "#faq",
    "#contacts",
  ];

  let scrollY = 0;

  // Единая функция для управления состоянием меню и скролла
  function setMenuState(isOpen) {
    if (isOpen) {
      // ОТКРЫТИЕ: запоминаем позицию и фиксируем body
      scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.classList.add("menu-open");

      menu.classList.add("open");
      burger.classList.add("open");
      burger.setAttribute("aria-expanded", "true");
    } else {
      // ЗАКРЫТИЕ: возвращаем body в нормальное состояние
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.classList.remove("menu-open");

      menu.classList.remove("open");
      burger.classList.remove("open");
      burger.setAttribute("aria-expanded", "false");

      // Возвращаем скролл на прежнее место
      window.scrollTo(0, scrollY);
    }
  }

  // 1. Клик по бургеру
  burger.addEventListener("click", () => {
    const isOpen = menu.classList.contains("open");
    setMenuState(!isOpen);
  });

  // 2. Закрытие меню по клику на ссылку (ВАЖНО: вызываем setMenuState(false))
  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();

      // Сначала корректно закрываем меню и разблокируем body
      setMenuState(false);

      // Затем плавно скроллим к цели (с небольшой задержкой, чтобы body успел вернуться в flow)
      setTimeout(() => {
        const target = document.querySelector(a.getAttribute("href"));
        if (target) target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    });
  });

  // 3. Scroll-spy и изменение шапки
  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("scrolled", window.scrollY > 40);

      let current = "";
      for (const href of SPY) {
        const el = document.querySelector(href);
        if (el && el.offsetTop - 140 <= window.scrollY) current = href;
      }
      navLinks.forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === current);
      });
      menu.querySelectorAll("nav a").forEach((a) => {
        a.classList.toggle("active", a.getAttribute("href") === current);
      });
    },
    { passive: true },
  );
}

burger.addEventListener("click", () => {
  const open = menu.classList.toggle("open");
  burger.classList.toggle("open", open);
  burger.setAttribute("aria-expanded", open);

  if (open) {
    // 1. Запоминаем текущую позицию прокрутки
    scrollY = window.scrollY;
    // 2. Фиксируем body, чтобы страница не прыгала вверх
    document.body.style.position = "fixed";
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = "100%";
    document.body.classList.add("menu-open");
  } else {
    // 3. При закрытии снимаем фиксацию
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
    document.body.classList.remove("menu-open");
    // 4. Возвращаем пользователя ровно на то место, где он был
    window.scrollTo(0, scrollY);
  }
});

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
  document.querySelectorAll("[data-scroll]").forEach((a) => {
    a.addEventListener("click", (e) => {
      e.preventDefault();
      const href = a.getAttribute("href");
      const target = document.querySelector(href);
      if (target) target.scrollIntoView({ behavior: "smooth" });
    });
  });
}

// ===== RENDER QUOTE =====
function renderQuote() {
  const el = document.getElementById("about-quote");
  const q = QUOTES[Math.floor(Math.random() * QUOTES.length)];
  el.innerHTML = `«${q.text}»<footer>— ${q.author}</footer>`;
}

// ===== REVIEWS SLIDER =====
function initReviews() {
  const track = document.getElementById("reviews-track");
  const dotsEl = document.getElementById("reviews-dots");
  const viewport = document.getElementById("reviews-viewport");
  const wrap = document.getElementById("reviews-wrap");
  let index = 0,
    paused = false,
    touchX = null;
  const total = REVIEWS.length;

  // Render slides
  REVIEWS.forEach((r) => {
    const initials = r.author
      .replace(/[«»]/g, "")
      .split(/\s+/)
      .slice(0, 2)
      .map((w) => w[0]?.toUpperCase() ?? "")
      .join("");
    const stars = Array.from({ length: 5 })
      .map(
        () =>
          `<svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.6 2.9 5.9 6.5.95-4.7 4.58 1.1 6.47L12 17.45 6.2 20.5l1.1-6.47L2.6 9.45l6.5-.95L12 2.6Z"/></svg>`,
      )
      .join("");
    track.innerHTML += `<div class="review-slide"><div class="review-card"><span class="review-quote-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M4 12.5C4 8.4 6.8 5.6 10.5 5v2.6c-2 .5-3.4 1.9-3.6 3.9h3.6V19H4v-6.5Zm9.5 0c0-4.1 2.8-6.9 6.5-7.5v2.6c-2 .5-3.4 1.9-3.6 3.9H20V19h-6.5v-6.5Z"/></svg></span><div class="review-stars">${stars}</div><blockquote>${r.text}</blockquote><div class="review-author"><span class="review-avatar">${initials}</span><div><b>${r.author}</b><span>${r.tag}</span></div></div></div></div>`;
  });

  // Render dots
  for (let i = 0; i < total; i++) {
    dotsEl.innerHTML += `<button class="${i === 0 ? "active" : ""}" data-idx="${i}" aria-label="Отзыв ${i + 1}"></button>`;
  }

  function go(dir) {
    index = (index + dir + total) % total;
    update();
  }

  function update() {
    track.style.transform = `translateX(-${index * 100}%)`;
    dotsEl
      .querySelectorAll("button")
      .forEach((d, i) => d.classList.toggle("active", i === index));
  }

  document
    .getElementById("review-prev")
    .addEventListener("click", () => go(-1));
  document.getElementById("review-next").addEventListener("click", () => go(1));
  dotsEl.querySelectorAll("button").forEach((d) =>
    d.addEventListener("click", () => {
      index = parseInt(d.dataset.idx);
      update();
    }),
  );

  // Auto-play
  setInterval(() => {
    if (!paused) go(1);
  }, 6000);
  wrap.addEventListener("mouseenter", () => (paused = true));
  wrap.addEventListener("mouseleave", () => (paused = false));

  // Touch
  viewport.addEventListener("touchstart", (e) => {
    touchX = e.touches[0].clientX;
  });
  viewport.addEventListener("touchend", (e) => {
    if (touchX === null) return;
    const dx = e.changedTouches[0].clientX - touchX;
    if (Math.abs(dx) > 48) go(dx < 0 ? 1 : -1);
    touchX = null;
  });
}

// ===== FAQ =====
function initFaq() {
  const list = document.getElementById("faq-list");

  FAQ_DATA.forEach((item, i) => {
    list.innerHTML += `<div class="faq-item${i === 0 ? " open" : ""}"><button class="faq-q" aria-expanded="${i === 0}"><span>${item.q}</span><span class="faq-icon"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 5v14M5 12h14"/></svg></span></button><div class="faq-a"><div class="faq-a-inner"><p>${item.a}</p></div></div></div>`;
  });

  list.querySelectorAll(".faq-q").forEach((btn) => {
    btn.addEventListener("click", () => {
      const item = btn.closest(".faq-item");
      const wasOpen = item.classList.contains("open");
      list.querySelectorAll(".faq-item").forEach((fi) => {
        fi.classList.remove("open");
        fi.querySelector(".faq-q").setAttribute("aria-expanded", "false");
      });
      if (!wasOpen) {
        item.classList.add("open");
        btn.setAttribute("aria-expanded", "true");
      }
    });
  });
}

// ===== COUNT-UP =====
function initCountUp() {
  const statsGrid = document.getElementById("stats-grid");
  if (!statsGrid) return;

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        statsGrid.querySelectorAll(".stat").forEach((stat, i) => {
          const target = parseInt(stat.dataset.target);
          const suffix = stat.dataset.suffix;
          const numEl = stat.querySelector(".stat-num");
          const duration = 1600 + i * 140;
          const t0 = performance.now();

          function tick(now) {
            const p = Math.min((now - t0) / duration, 1);
            const eased = 1 - Math.pow(1 - p, 3);
            numEl.textContent = Math.round(eased * target) + suffix;
            if (p < 1) requestAnimationFrame(tick);
          }
          setTimeout(() => requestAnimationFrame(tick), i * 140);
        });
        io.disconnect();
      }
    },
    { threshold: 0.25 },
  );

  io.observe(statsGrid);
}

// ===== FORM =====
function initForm() {
  const form = document.getElementById("contact-form");
  const formCard = document.getElementById("form-card");
  const submitBtn = document.getElementById("form-submit");
  const consentCheck = document.getElementById("consent-check");
  const consentLabel = document.getElementById("consent-label");
  const consentError = document.getElementById("consent-error");
  const formError = document.getElementById("form-error");
  const fieldPhone = document.getElementById("field-phone");
  const fieldEmail = document.getElementById("field-email");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    formError.style.display = "none";

    const phone = form.querySelector("[name=phone]").value;
    const email = form.querySelector("[name=email]").value;
    const honeypot = form.querySelector("[name=website]").value;

    if (honeypot) return;

    // Validate
    const digits = phone.replace(/\D/g, "");
    const phoneOk =
      /^[+]?[0-9\s\-()]+$/.test(phone.trim()) &&
      digits.length >= 10 &&
      digits.length <= 12;
    const emailOk =
      email.trim() === "" || /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email.trim());

    fieldPhone.classList.toggle("error", !phoneOk);
    fieldEmail.classList.toggle("error", !emailOk);

    if (!consentCheck.checked) {
      consentLabel.classList.add("field-error-mode");
      consentError.classList.add("show");
      return;
    }
    consentLabel.classList.remove("field-error-mode");
    consentError.classList.remove("show");

    if (!phoneOk || !emailOk) return;

    submitBtn.disabled = true;
    submitBtn.innerHTML = "Отправка…";

    try {
      const payload = JSON.stringify({
        Имя: form.querySelector("[name=name]").value || "—",
        Фамилия: form.querySelector("[name=surname]").value || "—",
        Телефон: phone,
        "E-mail": email || "—",
        Комментарий: form.querySelector("[name=comment]").value || "—",
        _subject: "Новая заявка с сайта юриста Литонова А.М.",
        _template: "table",
      });

      const res = await fetch(FALLBACK_ENDPOINT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: payload,
      });
      if (!res.ok) throw new Error("send failed");

      formCard.innerHTML = `<div class="form-success"><span class="form-success-icon"><svg width="38" height="38" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></svg></span><h3>Заявка отправлена</h3><p>Спасибо! Александр Михайлович свяжется с вами в ближайшее время. В срочных случаях звоните:<br /> +7 (908) 162-51-59.</p></div>`;
    } catch {
      formError.style.display = "block";
      submitBtn.disabled = false;
      submitBtn.innerHTML =
        'Отправить заявку <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M21 3 10.5 13.5M21 3l-7 18-3.5-7.5L3 10l18-7Z"/></svg>';
    }
  });

  consentCheck.addEventListener("change", () => {
    consentLabel.classList.remove("field-error-mode");
    consentError.classList.remove("show");
  });
}

// ===== PRIVACY MODAL =====
function initPrivacyModal() {
  const modal = document.getElementById("privacy-modal");
  const closeBtn = document.getElementById("modal-close");

  function open() {
    modal.classList.add("open");
    document.body.classList.add("modal-open");
  }
  function close() {
    modal.classList.remove("open");
    document.body.classList.remove("modal-open");
  }

  document.getElementById("btn-privacy").addEventListener("click", open);
  document.getElementById("btn-privacy-footer").addEventListener("click", open);
  closeBtn.addEventListener("click", close);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") close();
  });
}

// ===== TO-TOP =====
function initToTop() {
  const btn = document.getElementById("to-top");
  window.addEventListener(
    "scroll",
    () => {
      btn.classList.toggle("visible", window.scrollY > 600);
    },
    { passive: true },
  );
  btn.addEventListener("click", () =>
    window.scrollTo({ top: 0, behavior: "smooth" }),
  );
}

// ===== HERO BUTTONS =====
function initHeroButtons() {
  document.getElementById("btn-services")?.addEventListener("click", () => {
    document.querySelector("#services")?.scrollIntoView({ behavior: "smooth" });
  });
  document.getElementById("hero-scroll")?.addEventListener("click", () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  });
}

// ===== INIT =====
document.addEventListener("DOMContentLoaded", () => {
  renderQuote();
  initReviews();
  initFaq();
  initHeader();
  initSmoothScroll();
  initTypewriter();
  initCountUp();
  initForm();
  initPrivacyModal();
  initToTop();
  initHeroButtons();
  initReveal();
});
