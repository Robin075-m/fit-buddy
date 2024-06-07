console.log("hoi")

const nextBtn = document.querySelector('.next');
const prevBtn = document.querySelector('.prev');
const carousel = document.querySelector('.carousel');
const list = document.querySelector('.list');
const item = document.querySelectorAll('.item')
const runningTime = document.querySelector('.timeRunning')

let timeRunning = 3000
let timeAutoNext = 10000

nextBtn.onclick = function() {
    showslider('next')
}

prevBtn.onclick = function() {
    showslider('prev')
}

let runTimeout 
let runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)

function resetTimeAnimation() {
    runningTime.style.animation = 'none'
    runningTime.offsetHeight /* zorgt evoor dat de bar bovenaan reset*/
    runningTime.style.animation = null
    runningTime.style.animation = 'runningTime 10s linear 1 forwards'

}

function showslider(type) {
    let sliderItemsDom = list.querySelectorAll('.carousel .list .item')
    if(type === 'next'){
        list.appendChild(sliderItemsDom[0])
        carousel.classList.add('next')
    } else {
        list.prepend(sliderItemsDom[sliderItemsDom.length - 1])
        carousel.classList.add('prev')
    }


    clearTimeout(runTimeout)

    runTimeout = setTimeout( () => {
        carousel.classList.remove('next')
        carousel.classList.remove('prev')
    }, timeRunning)


clearTimeout(runNextAuto)
runNextAuto = setTimeout(() => {
    nextBtn.click()
}, timeAutoNext)

    resetTimeAnimation()
}

// Start de animatie

resetTimeAnimation()