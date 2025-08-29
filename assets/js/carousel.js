import { updateCarousel } from './carouselUtils.js'

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll(".carousel");
    
    carousels.forEach(carousel => {
        const speed = parseInt(carousel.getAttribute("data-speed"));
        const slides = carousel.querySelector("#carouselSlides");
        const indicators = carousel.querySelectorAll("#carouselIndicators button");
        const prevButton = carousel.querySelector("#prev");
        const nextButton = carousel.querySelector("#next");
        const totalSlides = indicators.length;
        let currentIndex = 0;
        let startX = 0;
        let endX = 0;
        let autoplayTimer;

        const resetAutoplay = () => {
            if (speed > 0) {
                clearTimeout(autoplayTimer);
                autoplayTimer = setTimeout(() => {
                    currentIndex = (currentIndex + 1) % totalSlides;
                    updateCarousel(currentIndex, slides, indicators);
                    resetAutoplay();
                }, speed);
            };
        };

        const goToSlide = (index) => {
            currentIndex = index;
            updateCarousel(currentIndex, slides, indicators);
            resetAutoplay();
        };

        // Buttons
        prevButton.addEventListener('click', () => {
            goToSlide((currentIndex -1 + totalSlides) % totalSlides);
        });

        nextButton.addEventListener('click', () => {
            goToSlide((currentIndex + 1) % totalSlides);
        });

        // Indicators
        indicators.forEach(btn => {
            btn.addEventListener('click', () => {
                goToSlide(parseInt(btn.getAttribute("data-slide")));
            });
        });

        // Mobile Swipe
        slides.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        slides.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        const handleSwipe = () => {
            const diff = startX - endX;
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    // Swipe Left to Right
                    goToSlide((currentIndex + 1) % totalSlides);
                } else {
                    // Swipe Right to Left
                    goToSlide((currentIndex - 1 + totalSlides) % totalSlides);
                };
                updateCarousel(currentIndex, slides, indicators);
            }
        };

        // Autoplay
        resetAutoplay();
    });
});