export const updateCarousel = (index, slides, indicators) => {
    slides.style.transform = `translateX(-${index * 100}%)`;

    indicators.forEach((btn, i) => {
        btn.classList.toggle('opacity-100', i === index);
        btn.classList.toggle('opacity-50', i !== index);
        btn.classList.add('active', i === index);
        btn.classList.remove('active', i !== index);
    });
};