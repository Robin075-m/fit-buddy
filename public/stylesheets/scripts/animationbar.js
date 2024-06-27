  // We halen het root element op
  const root = document.documentElement;
  
  // Ophalen van het aantal getoonde marquee elementen uit de CSS variabele. //Aantal zichtbare pictogrammen
  const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
  
  // Selecteer de lijst met marquee content //Lijst met pictogrammen in de marquee 
  const marqueeContent = document.querySelector("ul.marquee-content");
  
  // Stel het aantal marquee elementen in als een CSS variabele //Aanpassing van het aantal pictogrammen op basis van de inhoud
  root.style.setProperty("--marquee-elements", marqueeContent.children.length);
  
  // Voeg extra kopieën van de lijstitems toe om het scrollen vloeiender te maken // Toevoegen van extra pictogrammen voor een continue scrollanimatie 
  for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
  }





  