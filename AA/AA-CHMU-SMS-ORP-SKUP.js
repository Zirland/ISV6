//!JS
// Verze 70

var mojeUzemi = [1139, 1147, 1155];
var detailni = 1;
var vypisOrp = true;
var oddelovac = '\n';

#import "CHMU-SMS-ORP-SKUP";

if (vystupText != '') {
    vystupText += '\n';
    vystupText += 'OPIS GŘ HZS ČR';
}

if (vystupText !== 'undefined' && vystupText) {
    print(vystupText);
}
