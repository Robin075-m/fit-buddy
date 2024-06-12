let rangeMin = 100;
const range = document.querySelector(".range-selected");
const rangeInput = document.querySelectorAll(".range-input input");
const rangePrice = document.querySelectorAll(".range-price input");


rangeInput.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minRange = parseInt(rangeInput[0].value);
      let maxRange = parseInt(rangeInput[1].value);
      if (maxRange - minRange < rangeMin) {     
        if (e.target.className === "min") {
          rangeInput[0].value = maxRange - rangeMin;        
        } else {
          rangeInput[1].value = minRange + rangeMin;        
        }
      } else {
        rangePrice[0].value = minRange;
        rangePrice[1].value = maxRange;
        range.style.left = (minRange / rangeInput[0].max) * 100 + "%";
        range.style.right = 100 - (maxRange / rangeInput[1].max) * 100 + "%";
      }
    });
  });


  rangePrice.forEach((input) => {
    input.addEventListener("input", (e) => {
      let minPrice = rangePrice[0].value;
      let maxPrice = rangePrice[1].value;
      if (maxPrice - minPrice >= rangeMin && maxPrice <= rangeInput[1].max) {
        if (e.target.className === "min") {
          rangeInput[0].value = minPrice;
          range.style.left = (minPrice / rangeInput[0].max) * 100 + "%";
        } else {
          rangeInput[1].value = maxPrice;
          range.style.right = 100 - (maxPrice / rangeInput[1].max) * 100 + "%";
        }
      }
    });
  });








  document.addEventListener('DOMContentLoaded', function() {
    document.addEventListener('keypress', function(e) {
      cwrite(e.which, 'Keypress event');
      if (e.which === 120) { // ASCII code for 'x'
        custom_dialog_toggle('Keypress x', 'You opened this window by pressing x');
      }
    });
  });

  function custom_dialog_toggle(title, text) {
    if (title !== undefined) document.getElementById('dlg-header').innerHTML = title;
    if (text !== undefined) document.getElementById('dlg-content').innerHTML = text;
    var dialogStateCheckbox = document.getElementById('dialog_state');
    cwrite('Current state: ' + dialogStateCheckbox.checked, 'custom_dialog_toggle');
    dialogStateCheckbox.checked = !dialogStateCheckbox.checked;
    document.getElementById('dialog').style.display = dialogStateCheckbox.checked ? 'block' : 'none';
  }

  // Console logging function for debugging
  // cwrite(str, title)
  //      str:              string to be appended to console
  //      title (optional): title of the string
  // (c)  Tuomas Hatakka 2015
  //      http://tuomashatakka.fi
  function cwrite(str, title) {
    var ce = document.getElementById('console');
    var sg = "<p>";
    if (title !== undefined) sg = sg + "<em>" + title + "</em> ";
    sg = sg + str + "</p>";
    ce.insertAdjacentHTML('afterbegin', sg);
    if (ce.children.length > 6) ce.removeChild(ce.lastChild);
  }





  document.addEventListener('DOMContentLoaded', function() {
    const range1 = document.getElementById('age-range');
    const range2 = document.getElementById('age-range-2');
    const rangeVal = document.getElementById('age-range-val');
    const rangeTrack = document.createElement('div');
    rangeTrack.classList.add('range-track');
    range1.parentElement.appendChild(rangeTrack);

    function updateRange() {
        const minValue = Math.min(parseInt(range1.value), parseInt(range2.value));
        const maxValue = Math.max(parseInt(range1.value), parseInt(range2.value));

        rangeVal.textContent = `${minValue} - ${maxValue == 51 ? '50+' : maxValue}`;
        
        const minPercent = ((minValue - range1.min) / (range1.max - range1.min)) * 100;
        const maxPercent = ((maxValue - range1.min) / (range1.max - range1.min)) * 100;

        rangeTrack.style.left = `${minPercent}%`;
        rangeTrack.style.width = `${maxPercent - minPercent}%`;
    }

    range1.addEventListener('input', updateRange);
    range2.addEventListener('input', updateRange);

    updateRange();
});
