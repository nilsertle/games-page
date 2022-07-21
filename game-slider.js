const swiper = new Swiper('.swiper-container', {
    speed: 400,
    spaceBetween: 100,
    effect: 'slide',
    slidesPerView: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    pagination: {
        el: '.swiper-pagination',
    },
    loop: true,
});

// const swiper = document.querySelector('.swiper-container').swiper;

// swiper.slideNext();
