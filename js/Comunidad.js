//JavaScript para el carrusel de la sección "Comunidad"

document.addEventListener('DOMContentLoaded', function() {
    const carouselContainer = document.querySelector('.carousel__container');
    const carouselItems = document.querySelectorAll('.carousel__item');
    const prevButton = document.querySelector('.carousel__button--prev');
    const nextButton = document.querySelector('.carousel__button--next');
    const indicatorsContainer = document.querySelector('.carousel__indicators');
    
    let currentIndex = 0;
    let itemsPerView = getItemsPerView();
    
    // Inicializar el carrusel
    initCarousel();
    
    // Inicializar el carrusel
    function initCarousel() {
        initIndicators();
        updateCarousel();
        
        // Event listeners para botones de navegación
        prevButton.addEventListener('click', () => {
            navigate('prev');
        });
        
        nextButton.addEventListener('click', () => {
            navigate('next');
        });
        
        // Actualizar en redimensionamiento de ventana
        window.addEventListener('resize', handleResize);
    }
    
    // Navegación del carrusel
    function navigate(direction) {
        if (direction === 'prev' && currentIndex > 0) {
            currentIndex--;
        } else if (direction === 'next' && currentIndex < carouselItems.length - itemsPerView) {
            currentIndex++;
        }
        updateCarousel();
    }
    
    // Actualizar la vista del carrusel
    function updateCarousel() {
        const itemWidth = carouselItems[0].offsetWidth + 20; // Ancho + margen
        const translateX = -currentIndex * itemWidth;
        carouselContainer.style.transform = `translateX(${translateX}px)`;
        
        updateIndicators();
        updateButtonStates();
    }
    
    // Obtener número de elementos por vista según el ancho de pantalla
    function getItemsPerView() {
        if (window.innerWidth < 576) return 1;
        if (window.innerWidth < 992) return 2;
        return 4;
    }
    
    // Inicializar indicadores
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
    
    // Actualizar estado de los indicadores
    function updateIndicators() {
        const indicators = document.querySelectorAll('.carousel__indicator');
        const activeIndicator = Math.floor(currentIndex / itemsPerView);
        
        indicators.forEach((indicator, index) => {
            if (index === activeIndicator) {
                indicator.classList.add('active');
            } else {
                indicator.classList.remove('active');
            }
        });
    }
    
    // Actualizar estado de los botones
    function updateButtonStates() {
        prevButton.style.opacity = currentIndex === 0 ? '0.5' : '1';
        prevButton.style.cursor = currentIndex === 0 ? 'default' : 'pointer';
        
        nextButton.style.opacity = currentIndex >= carouselItems.length - itemsPerView ? '0.5' : '1';
        nextButton.style.cursor = currentIndex >= carouselItems.length - itemsPerView ? 'default' : 'pointer';
    }
    
    // Manejar redimensionamiento de ventana
    function handleResize() {
        const newItemsPerView = getItemsPerView();
        if (newItemsPerView !== itemsPerView) {
            itemsPerView = newItemsPerView;
            currentIndex = 0;
            initIndicators();
            updateCarousel();
        }
    }
});