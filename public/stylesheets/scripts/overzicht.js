

// card 3d effect

console.log ('Hallo')


// De hoeveelheid graden dat de kaart mag draaien
var limits = 15.0;

$(".card-container").mousemove(function (e) {

    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left;
    var y = e.clientY - rect.top;



    console.log(".card-container")
});

