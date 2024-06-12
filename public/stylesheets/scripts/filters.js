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
