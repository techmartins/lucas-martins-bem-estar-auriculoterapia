// ---------- Reveal on scroll ----------
const revealEls = document.querySelectorAll('.reveal');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if(e.isIntersecting){
      e.target.classList.add('in');
      io.unobserve(e.target);
    }
  });
}, {threshold:0.12});
revealEls.forEach(el => io.observe(el));

// ---------- FAQ accordion ----------
document.querySelectorAll('.faq-item').forEach(item => {
  const answer = item.querySelector('.faq-a');
  item.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq-item.open').forEach(o => {
      o.classList.remove('open');
      o.querySelector('.faq-a').style.maxHeight = null;
    });
    if(!isOpen){
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
    }
  });
});

// ---------- Signature constellation background ----------
const canvas = document.getElementById('constellation');
const ctx = canvas ? canvas.getContext('2d') : null;
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

if(canvas && ctx && !prefersReduced){
  let w, h, points;

  function resize(){
    w = canvas.width = window.innerWidth;
    h = canvas.height = Math.max(window.innerHeight, document.body.scrollHeight);
    const density = Math.max(28, Math.floor((w * h) / 65000));
    points = Array.from({length: density}, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.12,
      vy: (Math.random() - 0.5) * 0.12,
      r: Math.random() * 1.6 + 0.8
    }));
  }

  function step(){
    ctx.clearRect(0, 0, w, h);
    const linkDist = 130;

    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;
      if(p.x < 0 || p.x > w) p.vx *= -1;
      if(p.y < 0 || p.y > h) p.vy *= -1;
    });

    for(let i = 0; i < points.length; i++){
      for(let j = i + 1; j < points.length; j++){
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < linkDist){
          ctx.strokeStyle = `rgba(43,38,32,${0.07 * (1 - dist/linkDist)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    points.forEach(p => {
      ctx.fillStyle = 'rgba(196,98,45,0.35)';
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();
    });

    requestAnimationFrame(step);
  }

  resize();
  step();
  window.addEventListener('resize', resize);
}

// ---------- Load Services section from external file ----------
// (function loadServicesSection(){
//   const host = document.getElementById('servicos-host');
//   if(!host) {
//     console.error('[servicos] Element #servicos-host not found');
//     return;
//   }

//   fetch('assets/sections/servicos.html')
//     .then(r => {
//       if(!r.ok) {
//         throw new Error(`[servicos] Failed to load servicos.html (status: ${r.status})`);
//       }
//       return r.text();
//     })
//     .then(html => {
//       host.innerHTML = html;
//       console.log('[servicos] Section injected successfully');

//       // Re-bind reveal elements that were loaded dynamically
//       document.querySelectorAll('.reveal').forEach(el => {
//         if(!el.classList.contains('in')) io.observe(el);
//       });
//     })
//     .catch(err => {
//       console.error(err);
//       host.innerHTML = `
//         <section id="servicos" style="padding:88px 0;">
//           <div class="wrap">
//             <div class="section-head">
//               <h2 style="font-family:'Fraunces', serif; margin-bottom:10px;">Erro ao carregar Serviços</h2>
//               <p style="opacity:0.8;">${err && err.message ? err.message : 'Falha desconhecida.'}</p>
//             </div>
//           </div>
//         </section>
//       `;
//     });
// })();
