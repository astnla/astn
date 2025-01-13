// Function to initialize a carousel and its modal
function initializeCarousel(carouselSelector, imagesClass, modalSelector) {
    const carouselContainer = document.querySelector(carouselSelector);
    const carouselImages = carouselContainer.querySelector(`.${imagesClass}`);
    const prevButton = carouselContainer.querySelector('.prev');
    const nextButton = carouselContainer.querySelector('.next');
    const modal = document.querySelector(modalSelector);
    const modalImage = modal.querySelector('.modal-image');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    const closeModalButton = modal.querySelector('.close-modal');
    let currentIndex = 0;
    const totalImages = carouselContainer.querySelectorAll(`.${imagesClass} img`).length;

    // Check if the device is a touch device
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

    // Touch variables
    let startX = 0;
    let endX = 0;

    // Update carousel position
    function updateCarousel() {
        const offset = -currentIndex * 100;
        carouselImages.style.transform = `translateX(${offset}%)`;
    }

    // Infinite scrolling logic for carousel
    prevButton.addEventListener('click', () => {
        currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
        updateCarousel();
    });

    nextButton.addEventListener('click', () => {
        currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
        updateCarousel();
    });

    // Open modal
    function openModal(index) {
        currentIndex = index;
        modalImage.src = carouselContainer.querySelectorAll(`.${imagesClass} img`)[index].dataset.full;
        modal.style.display = 'flex';
        setTimeout(() => {
            modal.classList.add('show');
        }, 10);
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => {
            modal.style.display = 'none';
        }, 500);
    }

    // Navigate modal images with infinite scrolling and sync carousel
    modalPrev.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
        modalImage.src = carouselContainer.querySelectorAll(`.${imagesClass} img`)[currentIndex].dataset.full;
        updateCarousel(); // Sync the carousel
    });

    modalNext.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
        modalImage.src = carouselContainer.querySelectorAll(`.${imagesClass} img`)[currentIndex].dataset.full;
        updateCarousel(); // Sync the carousel
    });

    // Open modal on image click
    carouselContainer.querySelectorAll(`.${imagesClass} img`).forEach((img, index) => {
        img.addEventListener('click', () => openModal(index));
    });

    // Close modal on "close" button click
    closeModalButton.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Add swipe functionality only for touch devices
    if (isTouchDevice) {
        // Touch start event for carousel
        carouselImages.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        // Touch end event for carousel
        carouselImages.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleSwipe();
        });

        // Handle swipe for carousel
        function handleSwipe() {
            const swipeThreshold = 50; // Minimum swipe distance
            const swipeDistance = endX - startX;

            if (swipeDistance > swipeThreshold) {
                // Swipe right
                currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
                updateCarousel();
            } else if (swipeDistance < -swipeThreshold) {
                // Swipe left
                currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
                updateCarousel();
            }
        }

        // Touch start event for modal
        modal.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        // Touch end event for modal
        modal.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            handleModalSwipe();
        });

        // Handle swipe for modal
        function handleModalSwipe() {
            const swipeThreshold = 50;
            const swipeDistance = endX - startX;

            if (swipeDistance > swipeThreshold) {
                // Swipe right in modal
                currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
                modalImage.src = carouselContainer.querySelectorAll(`.${imagesClass} img`)[currentIndex].dataset.full;
                updateCarousel(); // Sync the carousel
            } else if (swipeDistance < -swipeThreshold) {
                // Swipe left in modal
                currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
                modalImage.src = carouselContainer.querySelectorAll(`.${imagesClass} img`)[currentIndex].dataset.full;
                updateCarousel(); // Sync the carousel
            }
        }
    }

    // Initialize carousel position
    updateCarousel();
}

// Initialize multiple carousels and modals
initializeCarousel('.carousel', 'carousel-images', '#modal');
