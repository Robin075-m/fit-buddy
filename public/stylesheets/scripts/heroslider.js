let currentIndex = 0;
const totalSlides = document.querySelectorAll('.sec-1-input').length;


function bannerSwitcher() {
    const next = document.querySelector('.sec-1-input:checked').nextElementSibling;

    if (currentIndex < totalSlides - 1) {
        currentIndex++;
        if (next && next.classList.contains('sec-1-input')) {
            next.checked = true;
        }
    } else {
        clearInterval(bannerTimer);
    }
}

// Set the interval to auto-switch banners
let bannerTimer = setInterval(bannerSwitcher, 5000);

// Allow manual control after auto-switch stops
document.querySelectorAll('article .controls label').forEach(label => {
    label.addEventListener('click', function () {
        clearInterval(bannerTimer); // Stop automatic switching
        currentIndex = Array.from(document.querySelectorAll('.sec-1-input')).indexOf(document.querySelector('.sec-1-input:checked')); // Update currentIndex to the clicked slide
    });
});
