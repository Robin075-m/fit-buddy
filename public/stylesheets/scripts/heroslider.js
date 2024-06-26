let currentIndex = 0; // Dit houdt bij welke slide momenteel wordt weergegeven
const totalSlides = document.querySelectorAll('.sec-1-input').length; // Het totale aantal slides

function bannerSwitcher() {
    const next = document.querySelector('.sec-1-input:checked').nextElementSibling; // Vindt het volgende geselecteerde input element

    // Checkt of we nog niet bij de laatste slide zijn
    if (currentIndex < totalSlides - 1) {
        currentIndex++; // Verhoogt de huidige slide-index
        // Controleert of er een volgende slide is en zet deze op geselecteerd als het een sec-1-input is
        if (next && next.classList.contains('sec-1-input')) {
            next.checked = true;
        }
    } else {
        clearInterval(bannerTimer); // Stopt de automatische wisseling als we bij de laatste slide zijn
    }
}
// Interval om automatisch tussen slides te schakelen
let bannerTimer = setInterval(bannerSwitcher, 5000); // Wisselt elke 5 seconden automatisch

// Sta handmatige bediening toe nadat de automatische wisseling is gestopt
document.querySelectorAll('article .controls label').forEach(label => {
    label.addEventListener('click', function () {
        clearInterval(bannerTimer); // Stop de automatische wisseling
        currentIndex = Array.from(document.querySelectorAll('.sec-1-input')).indexOf(document.querySelector('.sec-1-input:checked')); 
        // Update de huidige slide-index naar de geklikte slide
    });
});
