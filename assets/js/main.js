gsap.registerPlugin(ScrollTrigger, TextPlugin);

  // ── CURSOR ──
  const cursor = document.getElementById('cursor');
  const ring = document.getElementById('cursor-ring');
  let mouseX = 0, mouseY = 0, ringX = 0, ringY = 0;
  window.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; });
  function animateCursor() {
    gsap.set(cursor, { x: mouseX, y: mouseY });
    ringX += (mouseX - ringX) * 0.12;
    ringY += (mouseY - ringY) * 0.12;
    gsap.set(ring, { x: ringX, y: ringY });
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  // ── LOADER ──
  const loaderBar = document.getElementById('loader-bar');
  const loaderNum = document.getElementById('loader-num');
  let prog = 0;
  const loaderInterval = setInterval(() => {
    prog += Math.random() * 12;
    if (prog >= 100) { prog = 100; clearInterval(loaderInterval); }
    loaderBar.style.width = prog + '%';
    loaderNum.textContent = String(Math.floor(prog)).padStart(3, '0');
    if (prog === 100) {
      setTimeout(() => {
        gsap.to('#loader', {
          yPercent: -100, duration: 1.2, ease: 'power4.inOut',
          onComplete: () => {
            document.getElementById('loader').style.display = 'none';
            startHeroAnimations();
          }
        });
      }, 400);
    }
  }, 60);

  // ── HERO ANIMATIONS ──
  function startHeroAnimations() {
    const tl = gsap.timeline();
    tl.to('.hero-tag', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' })
      .to('.hero-name', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.4')
      .to('.hero-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6')
      .to('.hero-scroll-hint', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.4')
      .to('.hero-img-wrap', { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
      .to('.hero-stats', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.6');

    // Typed text
    const phrases = ['scalable WordPress solutions.', 'high-performance web apps.', 'meaningful digital experiences.'];
    let pi = 0;
    function typeNext() {
      const el = document.getElementById('typed');
      gsap.to(el, {
        duration: phrases[pi].length * 0.045,
        text: { value: phrases[pi], delimiter: '' },
        ease: 'none',
        onComplete: () => {
          setTimeout(() => {
            gsap.to(el, {
              duration: phrases[pi].length * 0.025,
              text: { value: '', delimiter: '' },
              ease: 'none',
              onComplete: () => { pi = (pi + 1) % phrases.length; typeNext(); }
            });
          }, 2000);
        }
      });
    }
    setTimeout(typeNext, 1500);
  }

  // ── SCROLL PROGRESS ──
  window.addEventListener('scroll', () => {
    const scrolled = (window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100;
    document.getElementById('progress-bar').style.width = scrolled + '%';
  });

  // ── SCROLL REVEALS ──
  gsap.utils.toArray('.reveal').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 50 },
      {
        opacity: 1, y: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });
  gsap.utils.toArray('.reveal-left').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, x: -50 },
      {
        opacity: 1, x: 0, duration: 1, ease: 'power3.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // ── FEAT CARDS stagger ──
  gsap.utils.toArray('.feat-card').forEach((card, i) => {
    gsap.fromTo(card,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: (i % 3) * 0.12,
        scrollTrigger: { trigger: card, start: 'top 88%', toggleActions: 'play none none none' }
      }
    );
  });

  // ── SKILL CHIPS stagger ──
  gsap.utils.toArray('.skill-chip').forEach((chip, i) => {
    gsap.fromTo(chip,
      { opacity: 0, scale: 0.8 },
      {
        opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(1.5)', delay: i * 0.06,
        scrollTrigger: { trigger: '.skills-cloud', start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // ── SECTION TITLE SPLIT ──
  gsap.utils.toArray('.section-title').forEach(el => {
    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1, y: 0, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: el, start: 'top 85%', toggleActions: 'play none none none' }
      }
    );
  });

  // ── MARQUEE pause on hover ──
  const marquee = document.querySelector('.marquee');
  document.querySelector('.marquee-wrap').addEventListener('mouseenter', () => {
    marquee.style.animationPlayState = 'paused';
  });
  document.querySelector('.marquee-wrap').addEventListener('mouseleave', () => {
    marquee.style.animationPlayState = 'running';
  });

  // ── NAV scroll effect ──
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('navbar');
    if (window.scrollY > 60) {
      nav.style.padding = '16px 48px';
    } else {
      nav.style.padding = '28px 48px';
    }
  });
  document.getElementById('navbar').style.transition = 'padding 0.4s';