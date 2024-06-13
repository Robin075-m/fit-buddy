

console.log('Hallo')


//filter

let options = {
  valueNames: ['naam', 'dag'],
};

let userList = new List('mainSection', options);



// Pill code voor wanneer het van kleur verandert
document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener("click", () => pill.classList.toggle("pill--selected"))
})


// De kaarten geven een animatie wanneer ze worden geresized
window.addEventListener('resize', function () {
  const kaarten = document.querySelector('.kaarten');
  kaarten.style.transition = 'transform 0.5s ease-out';
  kaarten.style.transform = 'scale(0.95)'; // Scale down when resizing

  setTimeout(() => {
   kaarten.style.transform = 'scale(1)'; // De kaarten resetten naar hun originele vorm
  }, 500);
});




