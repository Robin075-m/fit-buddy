console.log ('hoi')

const div = document.querySelector(".text");
const text = "Oops er is een fout opgetreden..."; /* Display tekst*/

function textTypingEffect(element, text, i = 0) {
        element.textContent += text[i];


        // Als de tekst het einde van de tekst bereikt
        if ( i === text.length - 1) {
            return;
        }

        setTimeout(() => textTypingEffect(element, text, i + 1), 80);

}

textTypingEffect (div, text, 5);