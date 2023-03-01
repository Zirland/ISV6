//!JS
// Verze 76

var omezitNaOrp = 337;
var oddelovac = '\n';

#import "CHMU-NOTIF-ORP";

if (resultText != '') {
    resultText += oddelovac;
    resultText += 'NOPIS GŘ HZS ČR';
}

if (resultText !== 'undefined' && resultText) {
    print(resultText);
}
