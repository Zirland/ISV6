//!JS
// Verze 23

//Číselník ORP viz samostatný soubor
// viz dokumentace
var omezitNaOrp = 337; 
var zobrazitVyhled = false; 
var zobrazitZmeny = true;
var pouzeZmeny = true;
// Výsledkem této vzorové akce je
// lokální sestava pro ORP Dačice,
// která se vytváří pouze v situaci,
// kdy na území správního obvodu ORP dojde ke změně.

// zde vytvoříme tělo mailu dle obsahu CAP pomocí skriptu z knihovny
#import "CHMU-EMAIL-ORP"; 

if (resultText !== 'undefined' && resultText) {
    print(resultText);
}
