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



// script.js

// script.js

document.addEventListener('DOMContentLoaded', function() {
  // Get references to elements
  var filterButton = document.getElementById('filterButton');
  var closeModal = document.getElementById('closeModal');
  var closeModalButton = document.getElementById('closeModalbutton');
  var modal = document.getElementById('id01');

  // Add event listener to show modal when filter button is clicked
  filterButton.addEventListener('click', function() {
    showModal();
  });

  // Add event listener to hide modal when close button is clicked
  closeModal.addEventListener('click', function() {
    hideModal();
  });



  closeModalButton.addEventListener('click', function() {
    hideModal();
  });

  // Function to show the modal
  function showModal() {
    modal.style.display = 'block';
  }

  // Function to hide the modal
  function hideModal() {
    modal.style.display = 'none';
  }
});
