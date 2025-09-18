//JavaScript para el carrusel de la sección "Comunidad"

document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel__container');
    const carouselItems = document.querySelectorAll('.carousel__item');
    const prevButton = document.querySelector('.carousel__button--prev');
    const nextButton = document.querySelector('.carousel__button--next');
    const indicatorsContainer = document.querySelector('.carousel__indicators');
    
    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    let isAnimating = false;
    
    // Inicializar el carrusel
    initCarousel();
    
    function initCarousel() {
        initIndicators();
        updateCarousel();
        
        // Event listeners
        prevButton.addEventListener('click', () => navigate('prev'));
        nextButton.addEventListener('click', () => navigate('next'));
        window.addEventListener('resize', handleResize);
    }
    
    function navigate(direction) {
        if (isAnimating) return;
        
        isAnimating = true;
        
        if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        } else if (direction === 'next' && currentIndex < carouselItems.length - itemsPerView) {
            currentIndex++;
        }
        
        updateCarousel();
        
        // Reset animation flag después de la transición
        setTimeout(() => {
            isAnimating = false;
        }, 500);
    }
    
    function updateCarousel() {
        const itemWidth = carouselItems[0].offsetWidth + parseInt(getComputedStyle(carouselItems[0]).marginRight) * 2;
        const translateX = -currentIndex * itemWidth;
        carouselContainer.style.transform = `translateX(${translateX}px)`;
        
        updateIndicators();
        updateButtonStates();
    }
    
    function getItemsPerView() {
        const width = window.innerWidth;
        if (width < 576) return 1;
        if (width < 768) return 1;
        if (width < 992) return 2;
        if (width < 1200) return 3;
        return 4;
    }
    
    function initIndicators() {
        const totalItems = carouselItems.length;
        const totalPages = Math.ceil(totalItems / itemsPerView);
        
        indicatorsContainer.innerHTML = '';
        
        for (let i = 0; i < totalPages; i++) {
            const indicator = document.createElement('div');
            indicator.classList.add('carousel__indicator');
            if (i === 0) indicator.classList.add('active');
            
            indicator.addEventListener('click', () => {
                currentIndex = i * itemsPerView;
                updateCarousel();
            });
            
            indicatorsContainer.appendChild(indicator);
        }
    }
    
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel__indicator');
        const activeIndicator = Math.floor(currentIndex / itemsPerView);
        
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle('active', index === activeIndicator);
        });
    }
    
    function updateButtonStates() {
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex >= carouselItems.length - itemsPerView;
        
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentIndex >= carouselItems.length - itemsPerView ? '0.5' : '1';
    }
    
    function handleResize() {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            currentIndex = Math.min(currentIndex, Math.max(0, carouselItems.length - itemsPerView));
            initIndicators();
            updateCarousel();
        }
    }
});