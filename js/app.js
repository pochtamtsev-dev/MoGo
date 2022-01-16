document.addEventListener('DOMContentLoaded', function () {
    // Burger
    const header = document.querySelector('.header');
    const navToggle = document.querySelector('.nav-toggle');
    const navBar = document.querySelector('.nav');
    navToggle.addEventListener('click', function(e){
        e.preventDefault();
        navToggle.classList.toggle('active');
        header.classList.toggle('active');
        navBar.classList.toggle('active');
    }, false);

    //Fixed Header
    let scrollOffset = 0,
        intro = document.querySelector('.intro'),
        introHeight = intro.offsetHeight;

    window.addEventListener('scroll', function(){
        scrollOffset = window.pageYOffset;
        if(scrollOffset >= introHeight) {
            header.classList.add('header--fixed');
        } else {
            header.classList.remove('header--fixed')
        }
    }, false);

    // Search-Box
    const searchBtn = document.querySelector('.search__search-btn');
    const cancelBtn = document.querySelector('.search__cancel-btn');
    const searchBox = document.querySelector('.search');
    const searchInput = document.querySelector('.search__input');

    searchBtn.addEventListener('click', () => {
        searchBox.classList.add('active');
        searchInput.classList.add('active');
        searchBtn.classList.add('active');
        cancelBtn.classList.add('active');
    }, false);

    cancelBtn.addEventListener('click', () => {
        searchBox.classList.remove('active');
        searchInput.classList.remove('active');
        searchBtn.classList.remove('active');
        cancelBtn.classList.remove('active');
    }, false);

    // Smooth Scroll
    const navItems = document.querySelectorAll('.nav__link[data-goto]');
    if(navItems.length > 0){
        navItems.forEach(navItem =>{
            navItem.addEventListener('click', onNavLinkClick, false);
        })
    }

    function onNavLinkClick(e){
        const navItem = e.target;
        document.querySelector('.nav__link.active').classList.remove('active');
        navItem.classList.add('active');

        if(navItem.dataset.goto && document.querySelector(navItem.dataset.goto)){

            const gotoBlock = document.querySelector(navItem.dataset.goto);
            const gotoBlockValue = offest(gotoBlock).top - header.offsetHeight;

            window.scrollTo({
                top: gotoBlockValue,
                behavior: "smooth"
            });
        }
        e.preventDefault();
    }

    // Intro Slider
    const sliderItems = document.querySelectorAll('.intro-slider-nav__item');
    const sliderLinks = document.querySelectorAll('.intro-slider-nav__link');
    let timeId;
    let progress;
    let width;
    const introSettings = {
        loop: true,
        speed: 1000,
        spaceBetween: 200,
        grabCursor: true,
        hashNavigation: {
            watchState: true
        },
        initialSlide: 0,
    }
    const slider = new Swiper('.intro-slider', introSettings);
    slider.on('transitionEnd', () => changeActiveSlide(slider.realIndex));

    function changeActiveSlide(index, event) {
        clearInterval(timeId);
        progress.style.width = '0%';
        progress.parentElement.parentElement.classList.remove('active');
        moveProgress(sliderItems[index]);
    }

    function moveProgress(elem) {
        width = 0;
        elem.classList.add('active');
        progress = elem.children[0].querySelector('.progress');
        timeId = setInterval(function () {
            if (progress.style.width != '100%') {
                progress.style.width = `${width++}%`;
            }
            else {
                slider.slideNext();
                clearInterval(timeId);
                width = 0;
                elem.classList.remove('active');
                progress.style.width = '0%';
            }
        }, 100);
    }
    moveProgress(sliderItems[slider.realIndex]);

    // Anim Counters
    function countUp(el){
        const windowHeight = window.innerHeight;
        const elemOffset = offest(el).top;
        const elemHeight = el.offsetHeight;
        const animStart = 4;
        let show = true;
        let elemPoint = windowHeight - elemHeight / animStart;

        window.addEventListener('scroll', function(){
            if (show && (window.pageYOffset > elemOffset - elemPoint) && window.pageYOffset < (elemOffset + elemHeight)){
                show = false;

                let i = 1;
                let time = 4;
                let num = +el.dataset.num;
                let step = 1000 * 4 / num;

                const intID = setInterval(function(){
                    if(i <= num){
                        el.innerHTML = i;
                    } else {
                        clearInterval(intID);
                    }
                    i++;
                }, step);
            }
        })
    }

    let counters = document.querySelectorAll('.stat__count');
    if(counters.length > 0){
        counters.forEach((item) => countUp(item));
    }

    function offest(el) {
        const rect = el.getBoundingClientRect(),
              scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
              scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        return {
            top: rect.top + scrollTop,
                left: rect.left + scrollLeft
        }
    }

    // Accordion
    const accTrigers = document.querySelectorAll('.accordion__header');
    accTrigers.forEach((el)=>{
        el.addEventListener('click', function(){
            const parent = el.parentNode;
            if(parent.classList.contains('active')){
                parent.classList.remove('active');
            } else {
                document.querySelectorAll('.accordion__item').forEach((el)=> el.classList.remove('active'));
                parent.classList.toggle('active');
            }

        });
    });

    // Reviews slider
    const reviewSettings = {
        loop: true,
        navigation: {
            nextEl: '.review-slider-next',
            prevEl: '.review-slider-prev',
        },


    }
    const reviewSlider = new Swiper('.reviews-slider', reviewSettings)
});
