// ===== HEADER SCROLL =====
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
});

// ===== BURGER MENU =====
const burger = document.getElementById('burger');
const nav = document.getElementById('nav');
burger.addEventListener('click', () => {
  nav.classList.toggle('open');
  const spans = burger.querySelectorAll('span');
  if (nav.classList.contains('open')) {
    spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close nav on link click
nav.querySelectorAll('.nav__link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    burger.querySelectorAll('span').forEach(s => {
      s.style.transform = '';
      s.style.opacity = '';
    });
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== MODAL =====
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

function openModal(html) {
  modalContent.innerHTML = html;
  modal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modal.classList.remove('open');
  document.body.style.overflow = '';
}

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') closeModal();
});

// ===== LOGIN BUTTON =====
document.getElementById('loginBtn').addEventListener('click', () => {
  openModal(`
    <h2>Kirish</h2>
    <p style="margin-bottom:24px;color:var(--text-muted)">Qiziltepa Tezkor hisobingizga kiring</p>
    <div class="form__group">
      <label>Telefon raqam</label>
      <input type="tel" placeholder="+998 XX XXX XX XX" id="loginPhone"/>
    </div>
    <div class="form__group">
      <label>Parol</label>
      <input type="password" placeholder="Parolni kiriting" id="loginPass"/>
    </div>
    <button class="btn btn--primary btn--full" onclick="handleLogin()" style="margin-top:8px">Kirish</button>
    <p style="text-align:center;margin-top:16px;font-size:14px;color:var(--text-muted)">
      Hisobingiz yo'qmi? <a href="#" style="color:var(--red);font-weight:700" onclick="showRegister()">Ro'yxatdan o'tish</a>
    </p>
  `);
});

function handleLogin() {
  const phone = document.getElementById('loginPhone').value;
  const pass = document.getElementById('loginPass').value;
  if (!phone || !pass) {
    showToast('⚠️ Barcha maydonlarni to\'ldiring!');
    return;
  }
  closeModal();
  showToast('✅ Muvaffaqiyatli kirildi!');
}

function showRegister() {
  openModal(`
    <h2>Ro'yxatdan o'tish</h2>
    <p style="margin-bottom:24px;color:var(--text-muted)">Yangi hisob yaratish</p>
    <div class="form__group">
      <label>To'liq ism</label>
      <input type="text" placeholder="Ism Familiya" id="regName"/>
    </div>
    <div class="form__group">
      <label>Telefon raqam</label>
      <input type="tel" placeholder="+998 XX XXX XX XX" id="regPhone"/>
    </div>
    <div class="form__group">
      <label>Parol</label>
      <input type="password" placeholder="Parol o'ylab toping" id="regPass"/>
    </div>
    <button class="btn btn--primary btn--full" onclick="handleRegister()" style="margin-top:8px">Ro'yxatdan o'tish</button>
  `);
}

function handleRegister() {
  const name = document.getElementById('regName').value;
  const phone = document.getElementById('regPhone').value;
  const pass = document.getElementById('regPass').value;
  if (!name || !phone || !pass) {
    showToast('⚠️ Barcha maydonlarni to\'ldiring!');
    return;
  }
  closeModal();
  showToast('🎉 Muvaffaqiyatli ro\'yxatdan o\'tdingiz!');
}

// ===== ORDER BUTTON =====
document.getElementById('orderBtn').addEventListener('click', () => {
  openModal(`
    <h2>🛒 Buyurtma berish</h2>
    <p style="margin-bottom:24px;color:var(--text-muted)">Tezkor buyurtma berib, 30 daqiqada qabul qiling!</p>
    <div class="form__group">
      <label>Manzil</label>
      <input type="text" placeholder="Ko'cha, uy raqami" id="orderAddr"/>
    </div>
    <div class="form__group">
      <label>Telefon</label>
      <input type="tel" placeholder="+998 XX XXX XX XX" id="orderPhone"/>
    </div>
    <div class="form__group">
      <label>Kategoriya</label>
      <select style="width:100%;padding:12px 16px;border:2px solid var(--border);border-radius:10px;font-size:15px;font-family:var(--font-body)">
        <option>🛒 Oziq-ovqat</option>
        <option>🥦 Meva-sabzavot</option>
        <option>💊 Dori-darmon</option>
        <option>🧹 Maishiy kimyo</option>
        <option>🍰 Non & Konditer</option>
        <option>🧃 Ichimliklar</option>
      </select>
    </div>
    <button class="btn btn--primary btn--full" onclick="submitOrder()" style="margin-top:8px">⚡ Buyurtma berish</button>
  `);
});

function submitOrder() {
  const addr = document.getElementById('orderAddr').value;
  const phone = document.getElementById('orderPhone').value;
  if (!addr || !phone) {
    showToast('⚠️ Manzil va telefon raqamni kiriting!');
    return;
  }
  closeModal();
  showToast('🚀 Buyurtmangiz qabul qilindi! Tez orada kuryer yo\'lga tushadi.');
}

// ===== HERO SEARCH =====
function handleSearch() {
  const address = document.getElementById('addressInput').value.trim();
  if (!address) {
    showToast('📍 Avval manzilni kiriting!');
    document.getElementById('addressInput').focus();
    return;
  }
  openModal(`
    <div style="text-align:center">
      <div style="font-size:64px;margin-bottom:16px">📍</div>
      <h2>Manzil topildi!</h2>
      <p style="color:var(--text-muted);margin:12px 0 24px">"${address}" manziliga yetkazib beramiz</p>
      <p style="background:var(--gray-light);border-radius:12px;padding:16px;font-weight:600;margin-bottom:24px">
        ⏱ Taxminiy vaqt: <span style="color:var(--red)">28–35 daqiqa</span>
      </p>
      <button class="btn btn--primary btn--full" onclick="closeModal();document.getElementById('categories').scrollIntoView({behavior:'smooth'})">
        🛍️ Mahsulot tanlash
      </button>
    </div>
  `);
}

document.getElementById('addressInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') handleSearch();
});

// ===== PROMO =====
function showPromo() {
  openModal(`
    <div style="text-align:center">
      <div style="font-size:56px;margin-bottom:16px">🎁</div>
      <h2>Sizning promo kodingiz</h2>
      <div class="promo-code">TEZKOR1</div>
      <p style="color:var(--text-muted);font-size:14px">
        Ushbu kodni birinchi buyurtmangizda kiriting va yetkazib berish bepul bo'ladi!
        Kod faqat 1 marta ishlatiladi.
      </p>
      <button class="btn btn--primary btn--full" style="margin-top:24px" onclick="copyPromo()">
        📋 Nusxa olish
      </button>
    </div>
  `);
}

function copyPromo() {
  navigator.clipboard.writeText('TEZKOR1').then(() => {
    showToast('✅ Promo kod nusxa olindi: TEZKOR1');
    closeModal();
  }).catch(() => {
    showToast('📋 Promo kod: TEZKOR1');
    closeModal();
  });
}

// ===== CATEGORY CARDS =====
document.querySelectorAll('.cat__card').forEach(card => {
  card.addEventListener('click', () => {
    const cat = card.dataset.cat;
    openModal(`
      <div style="text-align:center">
        <div style="font-size:56px;margin-bottom:16px">${card.querySelector('.cat__emoji').textContent}</div>
        <h2>${cat}</h2>
        <p style="color:var(--text-muted);margin:12px 0 24px">
          ${card.querySelector('.cat__count').textContent} mavjud. Buyurtma berish uchun ilovani yuklab oling.
        </p>
        <button class="btn btn--primary btn--full" onclick="closeModal();showToast('📱 Ilova tez orada chiqadi!')">
          📱 Ilovada ko'rish
        </button>
      </div>
    `);
  });
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const btn = this.querySelector('[type="submit"]');
  btn.textContent = 'Yuborilmoqda...';
  btn.disabled = true;
  setTimeout(() => {
    this.reset();
    btn.textContent = 'Yuborish';
    btn.disabled = false;
    showToast('✅ Xabaringiz muvaffaqiyatli yuborildi!');
  }, 1500);
});

// ===== TOAST =====
const toast = document.getElementById('toast');
let toastTimer;
function showToast(msg) {
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 3500);
}

// ===== SCROLL REVEAL =====
const revealElements = document.querySelectorAll(
  '.cat__card, .step, .feat__card, .review__card, .contact__item'
);
revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0) * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

revealElements.forEach((el, i) => {
  el.dataset.delay = i % 8;
  observer.observe(el);
});

// ===== BOTTOM NAV HELPERS =====
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}
function scrollToSection(id) {
  const el = document.getElementById(id);
  if (el) {
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: 'smooth' });
  }
}

// Bottom nav order button
const orderBtn2 = document.getElementById('orderBtn2');
if (orderBtn2) {
  orderBtn2.addEventListener('click', () => {
    document.getElementById('orderBtn').click();
  });
}

// Bottom nav active state
const bottomNavItems = document.querySelectorAll('.bottom-nav__item:not(.center-btn)');
function updateBottomNav() {
  const scrollY = window.scrollY + 140;
  let activeFound = false;
  const sectionMap = [
    { id: null, btn: 0 },           // home (top)
    { id: 'categories', btn: 1 },
    { id: 'features', btn: 3 },
    { id: 'contact', btn: 4 },
  ];
  if (window.scrollY < 200) {
    bottomNavItems.forEach((b, i) => b.classList.toggle('active', i === 0));
    return;
  }
  const contactEl = document.getElementById('contact');
  const catEl = document.getElementById('categories');
  const featEl = document.getElementById('features');
  if (contactEl && scrollY >= contactEl.offsetTop) {
    bottomNavItems.forEach((b, i) => b.classList.toggle('active', i === 3));
  } else if (featEl && scrollY >= featEl.offsetTop) {
    bottomNavItems.forEach((b, i) => b.classList.toggle('active', i === 2));
  } else if (catEl && scrollY >= catEl.offsetTop) {
    bottomNavItems.forEach((b, i) => b.classList.toggle('active', i === 1));
  } else {
    bottomNavItems.forEach((b, i) => b.classList.toggle('active', i === 0));
  }
}
window.addEventListener('scroll', updateBottomNav);

// ===== ACTIVE NAV LINK ON SCROLL =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__link');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY + 120;
  sections.forEach(sec => {
    const top = sec.offsetTop;
    const height = sec.offsetHeight;
    if (scrollY >= top && scrollY < top + height) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav__link[href="#${sec.id}"]`);
      if (active) active.classList.add('active');
    }
  });
});

// Active nav link style
const style = document.createElement('style');
style.textContent = `.nav__link.active { background: var(--gray-light); color: var(--red) !important; }`;
document.head.appendChild(style);
