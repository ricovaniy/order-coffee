const submitButton = document.querySelector('.submit-button');
const modalOverlay = document.querySelector('.modal-overlay');
const closeButton = document.querySelector('.close');

submitButton.addEventListener('click', function() {
    modalOverlay.style.display = 'flex';
});

closeButton.addEventListener('click', function() {
    modalOverlay.style.display = 'none';
});
