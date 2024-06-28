// let currentIndex = 0; // Houdt bij welke slide momenteel wordt weergegeven
// //0 betekent voor de eerste dus de currentindex is eerste slide
// const totalSlides = document.querySelectorAll('.sec-1-input').length; // Het totale aantal slides

// function bannerSwitcher() {
//     const next = document.querySelector('.sec-1-input:checked').nextElementSibling; // Vindt het volgende input element
// //Vindt de volgende slide door het volgende input-element te zoeken dat volgt op de momenteel geselecteerde.
//     // Checkt of we nog niet bij de laatste slide zijn
//     if (currentIndex < totalSlides - 1) {
//         currentIndex++; // Verhoogt de huidige slide-index
// //++
//         // min een want we beginnen bij 0 dus bijvoorbeeld als we 5 slides hebben is 5 min 1 want de eerste is nul
//         // Controleert of er een volgende slide is en zet deze op geselecteerd als het een sec-1-input is
//         if (next && next.classList.contains('sec-1-input')) { 
//             next.checked = true; // laat de voldende slide zien 
//         }
//     } else {
//         currentIndex = 0;
//     document.querySelectorAll('.sec-1-input')[0].checked = true; // Zet de eerste slide aan
//     clearInterval(bannerTimer); // Stop de automatische wisseling
//     }
// }

// // Interval om automatisch tussen slides te schakelen
// let bannerTimer = setInterval(bannerSwitcher, 3000); // Wisselt elke 3 seconden automatisch

// // Sta handmatige bediening toe nadat de automatische wisseling is gestopt
// document.querySelectorAll('article .controls label').forEach(label => {
//     label.addEventListener('click', function () {
//         clearInterval(bannerTimer); // Stop de automatische wisseling
//         currentIndex = Array.from(document.querySelectorAll('.sec-1-input')).indexOf(document.querySelector('.sec-1-input:checked')); // Update de huidige slide-index naar de geklikte slide
//     });
// });


//new code met js fill 

let currentIndex = 0; // Houdt bij welke slide momenteel wordt weergegeven
const slides = document.querySelectorAll('.sec-1-input'); // Alle slides
const totalSlides = slides.length; // Het totale aantal slides

let bannerTimer = setInterval(bannerSwitcher, 4000); // Interval voor automatische schakeling (elke 4 seconden)


// Functie om de invulanimatie te starten voor de huidige slide
function startFillAnimation(index) {
    // Zoek het label met de voortgangsbalk voor de huidige slide
    const currentSlideId = slides[index].id;
    const currentLabel = document.querySelector(`label[for="${currentSlideId}"] .progressbar`);

    // Controleer of het label met de voortgangsbalk bestaat en start de invulanimatie
    if (currentLabel) {
        currentLabel.style.width = '100%'; // Start de invulanimatie door de breedte in te stellen op 100%
    }
}

// Functie om de invulanimatie te resetten voor alle labels
function resetFillAnimation() {
    document.querySelectorAll('label .progressbar').forEach(progress => {
        progress.style.width = '0'; // Stel de breedte van alle voortgangsbalken in op 0 om de animatie te resetten
    });
}

startFillAnimation(currentIndex);
// Functie om naar de volgende slide te schakelen
function bannerSwitcher() {
    const currentSlide = document.querySelector('.sec-1-input:checked');
    const next = currentSlide ? currentSlide.nextElementSibling : null; // Vind het volgende input element

    resetFillAnimation(); // Reset de invulanimatie voor alle labels

    // Controleer of er een volgende slide is en schakel naar deze slide
    if (next && next.classList.contains('sec-1-input')) {
        currentIndex++; // Ga naar de volgende slide
        next.checked = true; // Vink de volgende slide aan
    } else {
        currentIndex = 0; // Ga terug naar de eerste slide na één cyclus
        slides[0].checked = true; // Vink de eerste slide aan
        resetFillAnimation(); // Reset de invulanimatie voor alle labels bij het teruggaan naar de eerste slide
        clearInterval(bannerTimer); // Stop de automatische wisseling na één ronde
    }

    startFillAnimation(currentIndex); // Start de invulanimatie voor de huidige slide
}

// Start de invulanimatie voor de eerste slide wanneer de pagina laadt


// Sta handmatige bediening toe nadat de automatische wisseling is gestopt
document.querySelectorAll('article .controls label').forEach((label, index) => {
    label.addEventListener('click', function () {
        clearInterval(bannerTimer); // Stop de automatische wisseling
        currentIndex = index; // Update de huidige slide-index naar de geklikte slide

        resetFillAnimation(); // Reset de invulanimatie
        startFillAnimation(currentIndex); // Start de invulanimatie voor de geklikte slide
    });
});
