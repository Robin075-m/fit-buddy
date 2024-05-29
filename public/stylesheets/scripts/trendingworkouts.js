
//hier zijn alle js voor the trendingworkouts pagina

document.addEventListener("DOMContentLoaded", function () {
    var accordion = document.querySelector('.accordion ul');
    var closeButtons = document.querySelectorAll('.close');
    var listItems = document.querySelectorAll('.accordion ul li');


    closeButtons.forEach(function (closeButton) {
        closeButton.addEventListener('click', function () {
            accordion.classList.remove('opened');
            var listItem = this.closest('li');
            listItem.classList.remove('opened');
        });
    });

    var anchorLinks = document.querySelectorAll('ul li a');
    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault();
            accordion.classList.add('opened');
            var listItem = this.closest('li');

            // Close previously opened list item with smooth transition
            listItems.forEach(function (item) {
                if (item !== listItem && item.classList.contains('opened')) {
                    item.classList.remove('opened');
                    setTimeout(function () {
                        item.classList.add('no-delay');
                    }, 400);
                }
            });

            listItem.classList.add('opened');
            setTimeout(function () {
                listItem.classList.add('no-delay');
                listItem.classList.siblings().classList.remove('no-delay');
                listItem.querySelector('.close').classList.add('no-delay');
                listItem.querySelector('.close').classList.siblings().classList.remove('no-delay');
            }, 400);
        });
    });
});