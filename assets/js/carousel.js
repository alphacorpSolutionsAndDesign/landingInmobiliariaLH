import { updateCarousel } from './carouselUtils.js'

document.addEventListener('DOMContentLoaded', () => {
    const carousels = document.querySelectorAll(".carousel");
    
    carousels.forEach(carousel => {
        const slides = carousel.querySelector("#carouselSlides");
        const indicators = carousel.querySelectorAll("#carouselIndicators button");
        const prevButton = carousel.querySelector("#prev");
        const nextButton = carousel.querySelector("#next");
        const totalSlides = indicators.length;
        let currentIndex = 0;
        let startX = 0;
        let endX = 0;

        // Buttons
        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
            updateCarousel(currentIndex, slides, indicators);
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateCarousel(currentIndex, slides, indicators);
        });

        // Indicators
        indicators.forEach(btn => {
            btn.addEventListener('click', () => {
                currentIndex = parseInt(btn.getAttribute("data-slide"));
                updateCarousel(currentIndex, slides, indicators);
            });
        });

        // Autoplay
        setInterval(() => {
            let index = -1
            index = (currentIndex += 1) % totalSlides;
            updateCarousel(index, slides, indicators);
        }, 8000);

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
                    currentIndex = (currentIndex + 1) % totalSlides; 
                } else {
                    // Swipe Right to Left
                    currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
                };
                updateCarousel(currentIndex, slides, indicators);
            }
        };
    });
});