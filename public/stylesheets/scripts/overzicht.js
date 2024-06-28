

// console.log('Hallo')


// //filter
//items die gefilterd gaan worden
// // let options = {
// //   valueNames: ['naam', 'dag'],
// // };

// // let userList = new List('mainSection', options);



// // // Pill code voor wanneer het van kleur verandert
// // document.querySelectorAll('.pill').forEach(pill => {
// //   pill.addEventListener("click", () => pill.classList.toggle("pill--selected"))
// // })


// // // De kaarten geven een animatie wanneer ze worden geresized
// // window.addEventListener('resize', function () {
// //   const kaarten = document.querySelector('.kaarten');
// //   kaarten.style.transition = 'transform 0.5s ease-out';
// //   kaarten.style.transform = 'scale(0.95)'; // Scale down when resizing

// //   setTimeout(() => {
// //    kaarten.style.transform = 'scale(1)'; // De kaarten resetten naar hun originele vorm
// //   }, 500);
// // });

// // new

//  let options = {
//   valueNames: ['naam', 'dag'],
// };
// let userList = new List('mainSection', options);

//  Function to filter list based on selected days
// let userList = new List('mainSection', options);

//  function filterList() {
//   // Get all checked checkboxes values
//   let checkedDays = Array.from(document.querySelectorAll('.weekday:checked'))
//     .map(checkbox => checkbox.value);

//   // Filter the list based on checked checkboxes
//   userList.filter(item => {
//     let days = item.values().dag.replace('Beschikbaar op: ', '').split(', ');
//     return checkedDays.length === 0 || checkedDays.every(day => days.includes(day));
//   });

//   // Show or hide list items based on visibility
//   let listItems = document.querySelectorAll('.kaarten li');
//   listItems.forEach(li => {
//     let days = li.querySelector('.dag').innerText.replace('Beschikbaar op: ', '').split(', ');
//     li.classList.toggle('visible', checkedDays.length === 0 || checkedDays.every(day => days.includes(day)));
//   });
// }

// // Function to handle label click
// function handleLabelClick(e) {
//   e.preventDefault(); // Prevent default label click behavior

//   let checkbox = document.querySelector(`#${e.target.htmlFor}`);
//   checkbox.checked = !checkbox.checked; // Toggle the checkbox
//   filterList(); // Apply the filter
// }

// // // Attach event listener to labels
// // document.querySelectorAll('.weekDays-selector label').forEach(label => {
// //   label.addEventListener('click', handleLabelClick);
// // });

// // // Initial call to filter list to handle any pre-checked checkboxes
// // filterList();



//   // this work below works
//Het haalt alle geselecteerde dagen op door alle aangevinkte checkboxes te vinden en hun waarden te verzamelen.
// haalt de huidige waarden van de leeftijdsbereikschuifregelaars op.
  let options = {
    valueNames: ['dag', 'leeftijd', ]
  };
  let userList = new List('mainSection', options);

  // Function to filter list based on selected days and age range
  function filterList() {
    // Get all checked checkboxes values
    let checkedDays = Array.from(document.querySelectorAll('.weekday:checked'))
      .map(checkbox => checkbox.value);
      //map om alleen de checked boxes van de checkbox te pakken 
//map is een methode die beschikbaar is op arrays in JavaScript. Het wordt gebruikt om een nieuwe array te maken door elk element in een bestaande array te transformeren op basis van een opgegeven functie.
   
// Get age range values
    const minAge = parseInt(document.getElementById('slider-min').value);
    const maxAge = parseInt(document.getElementById('slider-max').value);
//pakt de vakue van de min en  max slider 
    // Filter the list based on checked checkboxes and age range
    let visibleCount = 0; // Dit wordt gebruikt om bij te houden hoeveel items zichtbaar zijn na de filtering.
    userList.filter(item => { //filter() is een array-methode die wordt gebruikt om een nieuwe array te maken met alle elementen die voldoen aan de voorwaarden gespecificeerd in de callback-functie. Hier wordt userList gefilterd op basis van bepaalde voorwaarden.
      let days = item.values().dag.replace('Beschikbaar op: ', '').split(', ');
      let age = parseInt(item.values().leeftijd.replace('Age: ', ''));
   // Controleer of de dagen overeenkomen met de geselecteerde dagen
      let daysMatch = checkedDays.length === 0 || checkedDays.every(day => days.includes(day));
      let ageMatch = age >= minAge && age <= maxAge;

      let visible = daysMatch && ageMatch; //als deze twee waar zijn
      if (visible) visibleCount++; //verhoogt de count
      return visible; //laat vissible items zien
    });

    // Update the visible count of trainers
    document.querySelector('.beschikbareBuddies').textContent = `${visibleCount} Buddies Beschikbaar`;

    // Show or hide list items based on visibility
    let listItems = document.querySelectorAll('.kaarten li');
    listItems.forEach(li => {
      let days = li.querySelector('.dag').innerText.replace('Beschikbaar op: ', '').split(', ');
      let age = parseInt(li.querySelector('.leeftijd').innerText.replace('Age: ', ''));

      let daysMatch = checkedDays.length === 0 || checkedDays.every(day => days.includes(day));
      let ageMatch = age >= minAge && age <= maxAge;

      li.classList.toggle('visible', daysMatch && ageMatch);
    });
  }

  // Function to handle label click
  function handleLabelClick(e) {
    e.preventDefault();//Voorkom standaard gedrag van het klikken op het label

    let checkbox = document.querySelector(`#${e.target.htmlFor}`); 
    //Vind de bijbehorende checkbox en wissel de status ervan om
    checkbox.checked = !checkbox.checked; // Toggle the checkbox
    filterList(); // Apply the filter
  }

  // Attach event listener to labels
  document.querySelectorAll('.weekDays-selector label').forEach(label => {
    label.addEventListener('click', handleLabelClick);
  });

  // Attach event listeners to range sliders
  document.getElementById('slider-min').addEventListener('input', filterList);
  document.getElementById('slider-max').addEventListener('input', filterList);

  // Initial call to filter list to handle any pre-checked checkboxes or pre-set slider values
  filterList();

  // Slider values update function
  function updateSliderValues() {
    const sliderMin = document.getElementById('slider-min');
    const sliderMax = document.getElementById('slider-max');
    const sliderMinValue = document.getElementById('slider-min-value');
    const sliderMaxValue = document.getElementById('slider-max-value');
    const rangeFill = document.querySelector('.range-fill');

    const min = parseInt(sliderMin.value);
    const max = parseInt(sliderMax.value);

    sliderMinValue.textContent = min;
    sliderMaxValue.textContent = max + (max === 50 ? '+' : '');

    // Zorg ervoor dat de sliders elkaar niet overlappen
    if (min >= max) {
      sliderMin.value = max - 1;
      sliderMinValue.textContent = max - 1;
    }

    if (max <= min) {
      sliderMax.value = min + 1;
      sliderMaxValue.textContent = min + 1;
    }

    // Calculate the percentage positions
    const minPercent = ((min - 18) / (50 - 18)) * 100;
    const maxPercent = ((max - 18) / (50 - 18)) * 100;

    // Update the fill width and left position
    rangeFill.style.setProperty('--fill-left', `${minPercent}%`);
    rangeFill.style.setProperty('--fill-width', `${maxPercent - minPercent}%`);
  }

  // Attach slider value update function
  document.getElementById('slider-min').addEventListener('input', updateSliderValues);
  document.getElementById('slider-max').addEventListener('input', updateSliderValues);

  // Initial call to update slider values
  updateSliderValues();
// //this code above works

document.addEventListener('DOMContentLoaded', function() {
  const sliderMin = document.getElementById('slider-min');
  const sliderMax = document.getElementById('slider-max');
  const sliderMinValue = document.getElementById('slider-min-value');
  const sliderMaxValue = document.getElementById('slider-max-value');
  const rangeFill = document.querySelector('.range-fill');

  function updateSliderValues() {
    const min = parseInt(sliderMin.value);
    const max = parseInt(sliderMax.value);

    sliderMinValue.textContent = min;
    sliderMaxValue.textContent = max + (max === 50 ? '+' : '');

    if (min >= max) {
      sliderMin.value = max - 1;
      sliderMinValue.textContent = max - 1;
    }

    if (max <= min) {
      sliderMax.value = min + 1;
      sliderMaxValue.textContent = min + 1;
    }

    // Calculate the percentage positions
    const minPercent = ((min - 18) / (50 - 18)) * 100;
    const maxPercent = ((max - 18) / (50 - 18)) * 100;

    // Update the fill width and left position
    rangeFill.style.setProperty('--fill-left', `${minPercent}%`);
    rangeFill.style.setProperty('--fill-width', `${maxPercent - minPercent}%`);
  }

  sliderMin.addEventListener('input', updateSliderValues);
  sliderMax.addEventListener('input', updateSliderValues);

  // Initial values
  updateSliderValues();
});

