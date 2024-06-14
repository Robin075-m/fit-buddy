

// console.log('Hallo')


// //filter

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

  let options = {
    valueNames: ['dag', 'leeftijd', ]
  };
  let userList = new List('mainSection', options);

  // Function to filter list based on selected days and age range
  function filterList() {
    // Get all checked checkboxes values
    let checkedDays = Array.from(document.querySelectorAll('.weekday:checked'))
      .map(checkbox => checkbox.value);

    // Get age range values
    const minAge = parseInt(document.getElementById('slider-min').value);
    const maxAge = parseInt(document.getElementById('slider-max').value);

    // Filter the list based on checked checkboxes and age range
    let visibleCount = 0;
    userList.filter(item => {
      let days = item.values().dag.replace('Beschikbaar op: ', '').split(', ');
      let age = parseInt(item.values().leeftijd.replace('Age: ', ''));

      let daysMatch = checkedDays.length === 0 || checkedDays.every(day => days.includes(day));
      let ageMatch = age >= minAge && age <= maxAge;

      let visible = daysMatch && ageMatch;
      if (visible) visibleCount++;
      return visible;
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
    e.preventDefault(); // Prevent default label click behavior

    let checkbox = document.querySelector(`#${e.target.htmlFor}`);
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

