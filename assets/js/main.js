/**
* Template Name: MyResume - v4.3.0
* Template URL: https://bootstrapmade.com/free-html-bootstrap-template-my-resume/
* Author: BootstrapMade.com
* License: https://bootstrapmade.com/license/
*/
(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        let selectEl = select(el, all)
        if (selectEl) {
            if (all) {
                selectEl.forEach(e => e.addEventListener(type, listener))
            } else {
                selectEl.addEventListener(type, listener)
            }
        }
    }

    /**
     * Easy on scroll event listener 
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos,
            behavior: 'smooth'
        })
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('body').classList.toggle('mobile-nav-active')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let body = select('body')
            if (body.classList.contains('mobile-nav-active')) {
                body.classList.remove('mobile-nav-active')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Preloader
     */
    let preloader = select('#preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            preloader.remove()
        });
    }

    /**
     * Hero type effect
     */
    const typed = select('.typed')
    if (typed) {
        let typed_strings = typed.getAttribute('data-typed-items')
        typed_strings = typed_strings.split(',')
        new Typed('.typed', {
            strings: typed_strings,
            loop: true,
            typeSpeed: 100,
            backSpeed: 50,
            backDelay: 2000
        });
    }

    /**
     * Skills animation
     */
    let skilsContent = select('.skills-content');
    if (skilsContent) {
        new Waypoint({
            element: skilsContent,
            offset: '80%',
            handler: function (direction) {
                let progress = select('.progress .progress-bar', true);
                progress.forEach((el) => {
                    el.style.width = el.getAttribute('aria-valuenow') + '%'
                });
            }
        })
    }

    /**
     * Porfolio isotope and filter
     */
    window.addEventListener('load', () => {
        let portfolioContainer = select('.portfolio-container');
        if (portfolioContainer) {
            let portfolioIsotope = new Isotope(portfolioContainer, {
                itemSelector: '.portfolio-item'
            });

            let portfolioFilters = select('#portfolio-flters li', true);

            on('click', '#portfolio-flters li', function (e) {
                e.preventDefault();
                portfolioFilters.forEach(function (el) {
                    el.classList.remove('filter-active');
                });
                this.classList.add('filter-active');

                portfolioIsotope.arrange({
                    filter: this.getAttribute('data-filter')
                });
                portfolioIsotope.on('arrangeComplete', function () {
                    AOS.refresh()
                });
            }, true);
        }

    });

    /**
     * Initiate portfolio lightbox 
     */
    const portfolioLightbox = GLightbox({
        selector: '.portfolio-lightbox'
    });

    /**
     * Initiate portfolio details lightbox 
     */
    const portfolioDetailsLightbox = GLightbox({
        selector: '.portfolio-details-lightbox',
        width: '90%',
        height: '90vh'
    });

    /**
     * Portfolio details slider
     */
    new Swiper('.portfolio-details-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Testimonials slider
     */
    new Swiper('.testimonials-slider', {
        speed: 600,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });

    /**
     * Animation on scroll
     */
    window.addEventListener('load', () => {
        AOS.init({
            duration: 1000,
            easing: 'ease-in-out',
            once: true,
            mirror: false
        })
    });

})()

/* Custom Cursor JS starts */
class LimitFlames {
    constructor(framesPerSecond) {
        this.interval = Math.floor(1000 / framesPerSecond);
        this.previousTime = performance.now();
    }
    isLimitFlames(timestamp) {
        const deltaTime = timestamp - this.previousTime;
        const isLimitOver = deltaTime <= this.interval;
        if (!isLimitOver) {
            this.previousTime = timestamp - (deltaTime % this.interval);
        }
        return isLimitOver;
    }
}

function cursor() {
    //ポインタがない場合は終了
    if (!matchMedia('(pointer: fine)').matches) {
        return;
    }

    //対象が存在しない場合は終了
    const targetPointer = document.getElementById('js-cursor');
    if (!targetPointer) {
        return;
    }

    const targetPointerClassList = targetPointer.classList;

    //ポインタ設定
    let anime;
    //ポインタ表示
    const posi = {
        x: 0,
        y: 0
    }
    const start = {
        x: 0,
        y: 0
    }
    const delay = {
        x: 0,
        y: 0
    }
    const delayRatio = .85;

    let isRender = false;
    let isStopAnime = false;
    let limitFlames = new LimitFlames(60);
    function setPosition(x, y) {
        targetPointer.setAttribute('style', 'transform:translate3d(' + x + 'px, ' + y + 'px, 0);');
    }
    function roundValue(value) {
        return Math.round(value * 10) / 10;
    }
    function render(timestamp) {
        if (isStopAnime) {
            return;
        }
        //60fpsにフレームレート制限
        if (limitFlames.isLimitFlames(timestamp)) {
            startAnime();
            return;
        }
        delay.x *= delayRatio;
        delay.y *= delayRatio;
        const x = posi.x + roundValue(delay.x);
        const y = posi.y + roundValue(delay.y);
        setPosition(x, y);

        if (posi.x === x) {
            isStopAnime = true;
        }
        startAnime();
    };
    function startAnime() {
        anime = requestAnimationFrame(render);
    }
    function addCursorClass(className) {
        targetPointerClassList.add(className);
    }
    function removeCursorClass(className) {
        targetPointerClassList.remove(className);
    }

    document.addEventListener('mousemove', function (e) {
        posi.x = e.clientX;
        posi.y = e.clientY;

        if (isStopAnime) {
            startAnime();
            isStopAnime = false;
        }

        if (!isRender) {
            setPosition(posi.x, posi.y);
            addCursorClass('is-active');

            startAnime();
            isRender = true;

        } else {
            delay.x += start.x - posi.x;
            delay.y += start.y - posi.y;
        }
        start.x = posi.x;
        start.y = posi.y;

    });

    function focusLink() {
        const linkItems = document.querySelectorAll('a,button');
        if (linkItems.length === 0) {
            return;
        }
        const FOCUS_CLASS = 'is-focus';
        linkItems.forEach(function (linkItem) {
            linkItem.addEventListener('mouseenter', function () {
                addCursorClass(FOCUS_CLASS);
            });
            linkItem.addEventListener('mouseleave', function () {
                removeCursorClass(FOCUS_CLASS);
            });
        });
    }
    focusLink();

    //iframeの上では動作しないので非表示
    function deActiveIframe() {
        const iframeItems = document.querySelectorAll('iframe');
        if (iframeItems.length === 0) {
            return;
        }
        const HIDDEN_CLASS = 'is-hidden';
        iframeItems.forEach(function (iframeItem) {
            iframeItem.addEventListener('mouseenter', function () {
                addCursorClass(HIDDEN_CLASS);
            });
            iframeItem.addEventListener('mouseleave', function () {
                removeCursorClass(HIDDEN_CLASS);
            });
        });
    }
    deActiveIframe();
}
cursor();

/* Custom Cursor JS ends */