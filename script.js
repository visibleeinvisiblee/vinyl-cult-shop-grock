// Генерація продуктів
function renderProducts() {
    const container = document.getElementById('products-container');
    container.innerHTML = '';
    products.forEach(product => {
        const div = document.createElement('div');
        div.className = `product ${product.category}`;
        div.innerHTML = `
            <img src="${product.img}" alt="${product.name}" ${product.category === 'lamps' ? 'id="lamp-img"' : ''}>
            <h3>${product.name}</h3>
            <p>${product.desc}</p>
            <div class="price">${product.price}</div>
            <button class="order-btn" onclick="openModal('${product.name}')">Замовити</button>
            ${product.category === 'lamps' ? '<div class="slider-group"><label>Яскравість: <input type="range" min="0.5" max="2" step="0.1" value="1" onchange="changeBrightness(this.value)"></label></div>' : ''}
            ${product.category === 'watches' ? '<div class="slider-group"><label>Час: <input type="range" min="0" max="12" step="1" value="12" onchange="changeTime(this.value)"></label></div>' : ''}
        `;
        container.appendChild(div);
    });
}

// Фільтр по категоріях (для меню)
document.querySelectorAll('.nav-list a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = link.getAttribute('href').substring(1);
        document.querySelectorAll('.product').forEach(p => {
            p.style.display = target === 'vinyl' || target === 'cyber' ? (p.classList.contains(target) ? 'block' : 'none') : (p.classList.contains(target) ? 'block' : 'none');
        });
        // Плавний скрол
        document.getElementById(target)?.scrollIntoView({ behavior: 'smooth' });
    });
});

// Слайдери
function changeBrightness(value) {
    const img = document.querySelector('#lamp-img') || document.querySelector('.demo-img');
    if (img) img.style.filter = `brightness(${value})`;
}

function changeTime(value) {
    const hourHand = document.querySelector('.hour');
    const minuteHand = document.querySelector('.minute');
    if (hourHand) hourHand.style.transform = `rotate(${value * 30}deg)`; // 30deg per hour
    if (minuteHand) minuteHand.style.transform = `rotate(0deg)`; // Спростимо, тільки години
}

// Модалка
function openModal(productName) {
    const modal = document.getElementById('order-modal');
    const form = document.getElementById('order-form');
    form.querySelector('textarea').placeholder += ` для ${productName}`;
    modal.classList.remove('hidden');
}

document.querySelector('.close').addEventListener('click', () => {
    document.getElementById('order-modal').classList.add('hidden');
});

document.getElementById('order-form').addEventListener('submit', (e) => {
    e.preventDefault();
    // Заміни на свій email/Telegram bot
    alert('Замовлення надіслано! Пиши в Instagram для деталей.');
    document.getElementById('order-modal').classList.add('hidden');
});

// Ініціалізація
renderProducts();
