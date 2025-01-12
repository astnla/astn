// Function to initialize a carousel and its modal
function initializeCarousel(carouselSelector, imagesClass, modalSelector) {
    const carouselContainer = document.querySelector(carouselSelector);
    const carouselImages = carouselContainer.querySelector(`.${imagesClass}`); // Updated to use the imagesClass parameter
    const prevButton = carouselContainer.querySelector('.prev');
    const nextButton = carouselContainer.querySelector('.next');
    const modal = document.querySelector(modalSelector);
    const modalImage = modal.querySelector('.modal-image');
    const modalPrev = modal.querySelector('.modal-prev');
    const modalNext = modal.querySelector('.modal-next');
    const closeModalButton = modal.querySelector('.close-modal');
    let currentIndex = 0;
    const totalImages = carouselContainer.querySelectorAll(`.${imagesClass} img`).length; // Updated to use the imagesClass parameter

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
        modalImage.src = carouselContainer.querySelectorAll(`.${imagesClass} img`)[index].dataset.full; // Updated to use the imagesClass parameter
        modal.style.display = 'flex'; // Ensure modal is displayed
        setTimeout(() => {
            modal.classList.add('show'); // Add "show" class for fade-in effect
        }, 10);
    }

    // Close modal
    function closeModal() {
        modal.classList.remove('show'); // Remove "show" class for fade-out effect
        setTimeout(() => {
            modal.style.display = 'none'; // Hide modal after fade-out transition
        }, 500);
    }

    // Navigate modal images with infinite scrolling
    modalPrev.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent modal close
        currentIndex = (currentIndex === 0) ? totalImages - 1 : currentIndex - 1;
        modalImage.src = carouselContainer.querySelectorAll(`.${imagesClass} img`)[currentIndex].dataset.full; // Updated to use the imagesClass parameter
    });

    modalNext.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent modal close
        currentIndex = (currentIndex === totalImages - 1) ? 0 : currentIndex + 1;
        modalImage.src = carouselContainer.querySelectorAll(`.${imagesClass} img`)[currentIndex].dataset.full; // Updated to use the imagesClass parameter
    });

    // Open modal on image click
    carouselContainer.querySelectorAll(`.${imagesClass} img`).forEach((img, index) => { // Updated to use the imagesClass parameter
        img.addEventListener('click', () => openModal(index));
    });

    // Close modal on "close" button click
    closeModalButton.addEventListener('click', closeModal);

    // Close modal when clicking outside the image
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    // Initialize carousel position
    updateCarousel();
}

// Initialize multiple carousels and modals
initializeCarousel('.carousel', 'carousel-images', '#modal'); // First carousel
initializeCarousel('.carousel-2', 'carousel-images-2', '#modal-2'); // Second carousel

