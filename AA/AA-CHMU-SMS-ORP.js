//!JS
// Verze 44

//Číselník ORP viz samostatný soubor
var omezitNaOrp = 1945; 
var detailni = 1;
var oddelovac = '\n'; 

#import "CHMU-SMS-ORP"; 

if (vystupText != '') {
    vystupText += "\n";
    vystupText += "OPIS GŘ HZS ČR";
}

if (vystupText !== 'undefined' && vystupText) {
    print(vystupText);
}
