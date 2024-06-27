document.addEventListener("DOMContentLoaded", function () {
    // Selecteer het accordion element
    var accordion = document.querySelector('.accordion ul');

    // Selecteer alle sluitknoppen
    var closeButtons = document.querySelectorAll('.close');

    // Selecteer alle lijstitems binnen het accordion
    var listItems = document.querySelectorAll('.accordion ul li');

    // Voeg klikgebeurtenissen toe aan alle sluitknoppen
    closeButtons.forEach(function (closeButton) {
        closeButton.addEventListener('click', function () {
            // Verwijder de klasse 'opened' van het accordion
            accordion.classList.remove('opened');

            // Vind het dichtstbijzijnde li element van de geklikte sluitknop en verwijder de klasse 'opened'
            var listItem = this.closest('li');
            listItem.classList.remove('opened');
        });
    });

    // Selecteer alle ankerlinks binnen de lijstitems
    var anchorLinks = document.querySelectorAll('ul li a');

    // Voeg klikgebeurtenissen toe aan alle ankerlinks
    anchorLinks.forEach(function (link) {
        link.addEventListener('click', function (event) {
            event.preventDefault(); // Voorkom standaard gedrag van de link (navigatie)

            // Voeg de klasse 'opened' toe aan het accordion
            accordion.classList.add('opened');

            // Vind het dichtstbijzijnde li element van de geklikte ankerlink
            var listItem = this.closest('li');

            // Sluit vooraf geopende lijstitems met een vloeiende overgang
            listItems.forEach(function (item) {
                if (item !== listItem && item.classList.contains('opened')) {
                    item.classList.remove('opened');
                    setTimeout(function () {
                        item.classList.add('no-delay');
                    }, 400);
                }
            });

            // Voeg de klasse 'opened' toe aan het geselecteerde lijstitem
            listItem.classList.add('opened');

            // Voer vertragingen in voor overgangseffecten
            setTimeout(function () {
                listItem.classList.add('no-delay'); // Voeg 'no-delay' toe aan het geselecteerde lijstitem

                // Verwijder 'no-delay' van andere lijstitems
                listItems.forEach(function (item) {
                    if (item !== listItem) {
                        item.classList.remove('no-delay');
                    }
                });

                // Voeg 'no-delay' toe aan de sluitknop van het geselecteerde lijstitem
                listItem.querySelector('.close').classList.add('no-delay');

                // Verwijder 'no-delay' van sluitknoppen van andere lijstitems
                listItems.forEach(function (item) {
                    var siblingCloseIcon = item.querySelector('.close');
                    if (siblingCloseIcon && siblingCloseIcon !== listItem.querySelector('.close')) {
                        siblingCloseIcon.classList.remove('no-delay');
                    }
                });
            }, 400);
        });
    });
});
