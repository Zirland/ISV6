//!JS
// Verze 31

// zde např. Kraj Vysočina. Číselník krajů viz níže
var omezitNaKraj = 108;
var detailni = 0;
var oddelovac = '\n';

var KRAJE_NAZVY = {
    "-1": "Česká republika",
    "19": "Hlavní město Praha",
    "27": "Středočeský kraj",
    "35": "Jihočeský kraj",
    "43": "Plzeňský kraj",
    "51": "Karlovarský kraj",
    "60": "Ústecký kraj",
    "78": "Liberecký kraj",
    "86": "Královéhradecký kraj",
    "94": "Pardubický kraj",
    "108": "Kraj Vysočina",
    "116": "Jihomoravský kraj",
    "124": "Olomoucký kraj",
    "132": "Moravskoslezský kraj",
    "141": "Zlínský kraj"
};
// viz dokumentace k [CHMU-SMS]

// zde vytvoříme tělo SMS dle obsahu CAP pomocí skriptu z knihovny
#import "CHMU-SMS-KRAJ"; 

if (vystupText != '') {
    // Upozorňuji, že tělo SMS zprávy nekončí zalomením řádku. Já si proto odřádkuji. Ale vy nemusíte, pokud nechcete.
    vystupText += "\n";

    // Podpis na konci každé SMS.
    vystupText += "OPIS GŘ HZS ČR";
}

if (vystupText !== 'undefined' && vystupText) {
    print(vystupText);
}
