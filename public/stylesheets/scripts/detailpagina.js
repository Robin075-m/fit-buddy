console.log ('hallo')

const form = document.querySelector("form");

form.addEventListener("submit", (e) =>{
 e.preventDefault;
// Er gebeurt niks als de form niet gevalideerd is
 if(!validateForm(form)) return;
})


const validateForm = (form) => {
    let valid = true;
    // checkt op empty invulvelden
    let name = form.querySelector(".name");
    let message = form.querySelector(".message");
    let email = form.querySelector(".email");
    console.log(".name")

    if(name.value == "" ) {
        giveError(name, "Please enter a name");
    }
}

const giveError = (field, message) => {
    let.parentElement = field.parentElement;
    parentElement.classList.add("error")
}