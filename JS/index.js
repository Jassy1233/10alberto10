document.addEventListener("DOMContentLoaded", function () {
    // NAV
    const nav = document.getElementById('nav');
    addEventListener('scroll', () => nav.classList.toggle('s', scrollY > 40));


    // Scroll reveals
    const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) e.target.classList.add('v'); }), { threshold: 0.1 });
    document.querySelectorAll('.r, .rl, .rr').forEach(el => ro.observe(el));

    // Counters
    function runCounter(el) {
        const to = parseFloat(el.dataset.to);
        const sfx = el.dataset.sfx || '';
        const dec = parseInt(el.dataset.dec || 0);
        const t0 = performance.now();
        (function frame(now) {
            const p = Math.min((now - t0) / 1400, 1);
            const e = 1 - Math.pow(1 - p, 3);
            el.textContent = (e * to).toFixed(dec) + sfx;
            if (p < 1) requestAnimationFrame(frame);
        })(t0);
    }

    const co = new IntersectionObserver(es => es.forEach(e => {
        if (e.isIntersecting && !e.target.dataset.done) { e.target.dataset.done = '1'; runCounter(e.target); }
    }), { threshold: 0.4 });
    document.querySelectorAll('.counter[data-to]').forEach(el => co.observe(el));

    // Hero counters after entry animations
    setTimeout(() => {
        document.querySelectorAll('.h-stats .counter').forEach(el => {
            if (!el.dataset.done) { el.dataset.done = '1'; runCounter(el); }
        });
    }, 1200);
})