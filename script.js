
var selectedStyle = 'modern minimalist';
var IDEA = 'тестовый генератор';

function selectStyle(style) {
    selectedStyle = style;
    document.getElementById('logo-style').value = style;
    document.querySelectorAll('.style-card').forEach(function(c) { c.classList.remove('active'); });
    event.currentTarget.classList.add('active');
    document.getElementById('generator').scrollIntoView({behavior: 'smooth'});
}

document.addEventListener('DOMContentLoaded', function() {
    var nav = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        nav.style.boxShadow = window.scrollY > 50 ? '0 2px 10px rgba(0,0,0,0.1)' : 'none';
    });
    document.querySelectorAll('a[href^="#"]').forEach(function(a) {
        a.addEventListener('click', function(e) {
            e.preventDefault();
            var t = document.querySelector(this.getAttribute('href'));
            if (t) t.scrollIntoView({behavior: 'smooth', block: 'start'});
        });
    });
    var obs = new IntersectionObserver(function(entries) {
        entries.forEach(function(e) {
            if (e.isIntersecting) { e.target.style.opacity = '1'; e.target.style.transform = 'translateY(0)'; }
        });
    }, {threshold: 0.1});
    document.querySelectorAll('.feature-card,.faq-item,.style-card,.step').forEach(function(el) {
        el.style.opacity = '0'; el.style.transform = 'translateY(20px)'; el.style.transition = 'opacity .5s,transform .5s';
        obs.observe(el);
    });
});

function generateLogo() {
    var name = document.getElementById('company-name').value.trim();
    if (!name) { alert('Введите название или запрос'); return; }

    var style = document.getElementById('logo-style').value;
    var result = document.getElementById('logo-result');
    var loading = document.getElementById('loading');
    var preview = document.getElementById('logo-preview');
    var img = document.getElementById('logo-image');
    var brand = document.getElementById('logo-brand');
    var dlBtns = document.getElementById('download-buttons');
    var genBtn = document.getElementById('generate-btn');

    result.style.display = 'block';
    loading.style.display = 'block';
    preview.style.display = 'none';
    dlBtns.style.display = 'none';
    genBtn.disabled = true;
    genBtn.textContent = 'Генерация...';

    var seed = Math.floor(Math.random() * 999999);
    var prompt = style + ' ' + name + ' ' + IDEA + ', professional, centered, white background, high quality, 4k';
    var encoded = encodeURIComponent(prompt);
    var url = 'https://image.pollinations.ai/prompt/' + encoded + '?width=512&height=512&seed=' + seed + '&nologo=true';

    img.onload = function() {
        loading.style.display = 'none';
        preview.style.display = 'inline-block';
        brand.textContent = name;
        dlBtns.style.display = 'flex';
        genBtn.disabled = false;
        genBtn.textContent = 'Сгенерировать';
    };
    img.onerror = function() {
        loading.innerHTML = '<p style="color:#ef4444">Ошибка генерации. Попробуйте снова.</p>';
        genBtn.disabled = false;
        genBtn.textContent = 'Сгенерировать';
    };
    img.src = url;
}

function downloadLogo() {
    var img = document.getElementById('logo-image');
    if (!img.src) return;
    var a = document.createElement('a');
    a.href = img.src;
    a.download = IDEA + '-' + Date.now() + '.png';
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}