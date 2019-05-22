//!JS
// Verze 41

var hlavniKraj = -1;
var zobrazovatVsechnyKraje = true;
var razeniPodleNazvu = false;
var zobrazitVyhled = false;
var zobrazitZmeny = true;
var pouzeZmeny = true;
var distrSeznamNahore = false;

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

#import "CHMU-EMAIL-KRAJ"; 

if (resultText !== 'undefined' && resultText) {
    print(resultText);
}
