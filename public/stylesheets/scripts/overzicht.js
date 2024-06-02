

console.log('Hallo')


//filter

let options = {
  valueNames: ['naam'],
};

let userList = new List('mainSection', options);



// Pill code voor wanneer het van kleur verandert
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener("click", () => pill.classList.toggle("pill--selected"))
})





// De kaarten geven een animatie wanneer ze worden geresized
window.addEventListener('resize', function () {
  const grid = document.querySelector('.kaarten');
  grid.style.transition = 'transform 0.5s ease-out';
  grid.style.transform = 'scale(0.95)'; // Scale down when resizing

  setTimeout(() => {
    grid.style.transform = 'scale(1)'; // Gaat weer terug naar zijn originele vorm
  }, 500);
});
