  // We halen het root element op
  const root = document.documentElement;
  
  // Ophalen van het aantal getoonde marquee elementen uit de CSS variabele
  const marqueeElementsDisplayed = getComputedStyle(root).getPropertyValue("--marquee-elements-displayed");
  
  // Selecteer de lijst met marquee content
  const marqueeContent = document.querySelector("ul.marquee-content");
  
  // Stel het aantal marquee elementen in als een CSS variabele
  root.style.setProperty("--marquee-elements", marqueeContent.children.length);
  
  // Voeg extra kopieën van de lijstitems toe om het scrollen vloeiender te maken
  for (let i = 0; i < marqueeElementsDisplayed; i++) {
    marqueeContent.appendChild(marqueeContent.children[i].cloneNode(true));
  }