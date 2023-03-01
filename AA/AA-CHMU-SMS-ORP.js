//!JS
// Verze 76

var mojeUzemi = [1139, 1147, 1155];
var detailni = 1;
var vypisOrp = true;
var oddelovac = '\n';

#import "CHMU-SMS-ORP";

if (vystupText != '') {
    vystupText += oddelovac;
    vystupText += 'NOPIS GŘ HZS ČR';
}

if (vystupText !== 'undefined' && vystupText) {
    print(vystupText);
}
