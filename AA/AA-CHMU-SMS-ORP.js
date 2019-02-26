//!JS
// Verze 29

// zde např. Mělník. Číselník ORP viz samostatný soubor
var omezitNaOrp = 141; 
var detailni = 1;
var oddelovac = '\n'; 
// viz dokumentace k [CHMU-SMS]

// zde vytvoříme tělo SMS dle obsahu CAP pomocí skriptu z knihovny
#import "CHMU-SMS-ORP"; 

if (vystupText != '') {
    // Upozorňuji, že tělo SMS zprávy nekončí zalomením řádku. Já si proto odřádkuji. Ale vy nemusíte, pokud nechcete.
    vystupText += "\n";

    // Podpis na konci každé SMS.
    vystupText += "OPIS GŘ HZS ČR";
}

if (vystupText !== 'undefined' && vystupText) {
    print(vystupText);
}
