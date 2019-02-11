//!JS
// Verze 26

// viz dokumentace
var omezitNaKraj = -1;
var zobrazitVyhled = false;
var zobrazitZmeny = false;
// Výsledkem této vzorové akce je
// celostátní sestava,
// která se vytváří pouze v situaci,
// kdy na území ČR je platná výstraha a dojde ke změně.

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

// zde vytvoříme tělo mailu dle obsahu CAP pomocí skriptu z knihovny
#import "CHMU-MAIL-2"; 

if (resultText !== 'undefined' && resultText) {
    print(resultText);
}
