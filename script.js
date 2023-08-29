document.addEventListener('DOMContentLoaded', function() {
  const cards = document.querySelectorAll('.card');
  let startX, currentX, currentIndex = 0;

  cards.forEach((card, index) => {
    card.addEventListener('mousedown', handleCardMouseDown);
    card.addEventListener('touchstart', handleCardTouchStart);
    
    if (index === 0) {
      card.style.animation = 'bounce 1s infinite';
    }
  });

  function handleCardMouseDown(e) {
    startX = e.clientX;
    this.addEventListener('mousemove', handleCardMouseMove);
    document.addEventListener('mouseup', handleCardMouseUp);
  }

  function handleCardTouchStart(e) {
    startX = e.touches[0].clientX;
    this.addEventListener('touchmove', handleCardTouchMove);
    document.addEventListener('touchend', handleCardTouchEnd);
  }

  function handleCardMouseMove(e) {
    currentX = e.clientX;
    const deltaX = currentX - startX;
    this.style.transform = `translateX(${deltaX}px)`;
  }

  function handleCardMouseUp() {
    const deltaX = currentX - startX;
    const threshold = window.innerWidth * 0.1; // 10% threshold

    if (deltaX > threshold) {
      currentIndex = Math.max(currentIndex - 1, 0);
    } else if (-deltaX > threshold) {
      currentIndex = Math.min(currentIndex + 1, cards.length - 1);
    }

    updateCardTransform();
    this.removeEventListener('mousemove', handleCardMouseMove);
    document.removeEventListener('mouseup', handleCardMouseUp);
  }

  function handleCardTouchMove(e) {
    currentX = e.touches[0].clientX;
    const deltaX = currentX - startX;
    this.style.transform = `translateX(${deltaX}px)`;
  }

  function handleCardTouchEnd() {
    const deltaX = currentX - startX;
    const threshold = window.innerWidth * 0.1; // 10% threshold

    if (deltaX > threshold) {
      currentIndex = Math.max(currentIndex - 1, 0);
    } else if (-deltaX > threshold) {
      currentIndex = Math.min(currentIndex + 1, cards.length - 1);
    }

    updateCardTransform();
    this.removeEventListener('touchmove', handleCardTouchMove);
    document.removeEventListener('touchend', handleCardTouchEnd);
  }

  function updateCardTransform() {
    cards.forEach((card, index) => {
      const distance = index - currentIndex;
      card.style.transform = `translateX(${distance * 100}%)`;
    });
  }

  updateCardTransform();
});
