document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel');
    const slides = Array.from(carousel.children);
    const dotsContainer = document.querySelector('.dots-wrapper');
    const arrowLeft = document.querySelector('.arrow.left');
    const arrowRight = document.querySelector('.arrow.right');
    let currentIndex = 0;
    const totalSlides = slides.length;
    let startX = 0;
    let isSwiping = false;

    // Ajouter les dots dynamiquement
    slides.forEach(() => {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        dotsContainer.appendChild(dot);
    });

    const dots = Array.from(dotsContainer.children);

    // Initialiser les dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => goToSlide(index));
    });

    const goToSlide = (index) => {
        currentIndex = (index + totalSlides) % totalSlides;
        updateCarousel();
    };

    const updateCarousel = () => {
        const prevIndex1 = (currentIndex - 1 + totalSlides) % totalSlides;
        const prevIndex2 = (currentIndex - 2 + totalSlides) % totalSlides;
        const nextIndex1 = (currentIndex + 1) % totalSlides;
        const nextIndex2 = (currentIndex + 2) % totalSlides;

        slides.forEach((slide, index) => {
            slide.classList.remove('active', 'visible', 'prev-1', 'prev-2', 'next-1', 'next-2');
            if (index === currentIndex) {
                slide.classList.add('active', 'visible');
            } else if (index === prevIndex1) {
                slide.classList.add('prev-1', 'visible');
            } else if (index === prevIndex2) {
                slide.classList.add('prev-2', 'visible');
            } else if (index === nextIndex1) {
                slide.classList.add('next-1', 'visible');
            } else if (index === nextIndex2) {
                slide.classList.add('next-2', 'visible');
            }
        });

        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    };

    const nextSlide = () => {
        currentIndex = (currentIndex + 1) % totalSlides;
        updateCarousel();
    };

    const prevSlide = () => {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        updateCarousel();
    };

    arrowRight.addEventListener('click', nextSlide);
    arrowLeft.addEventListener('click', prevSlide);

    slides.forEach((slide, index) => {
        slide.addEventListener('click', () => goToSlide(index));
    });

    // Swipe
    carousel.addEventListener('touchstart', (event) => {
        startX = event.touches[0].clientX;
        isSwiping = true;
    });

    carousel.addEventListener('touchmove', (event) => {
        if (!isSwiping) return;
        const endX = event.touches[0].clientX;
        const deltaX = startX - endX;
        if (deltaX > 100) {
            // Swipe à gauche (slide suivante)
            nextSlide();
            isSwiping = false;
        } else if (deltaX < -100) {
            // Swipe à droite (slide précédente)
            prevSlide();
            isSwiping = false;
        }
    });

    carousel.addEventListener('touchend', () => {
        isSwiping = false;
    });

    updateCarousel();
});
