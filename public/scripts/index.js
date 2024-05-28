// dit is alle algemene js code 
var bars = document.getElementById("nav-action");
var nav = document.getElementById("nav");



bars.addEventListener("click", barClicked, false);

function barClicked() {
    bars.classList.toggle('active');
    nav.classList.toggle('visible');

}