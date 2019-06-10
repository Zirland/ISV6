// Verze 46

#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";
#import "CHMU-DATUMY";
#import "CHMU-PREPARE";

var orpTmp = [];

for (var i = 0; i < orp.length; i++) {
    // Pokud se jedná o vybrané ORP
    if (omezitNaOrp == orp[i].id)
    {
        // Dáme do seznamu
       orpTmp.push(orp[i]);
    }
}

orp = orpTmp;

// Samotná zpráva
var resultText = '';
var krajList = [];
var ref_krajList = [];
var info;
var vytvoreni = vystraha.dc_odeslano;
var pomoc = '';

// Připravíme jednotlivé info jevy
if (vystraha.info && vystraha.info.length > 0) {
    krajList = PrepareInfo(orp, vystraha);
}

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0) {
    ref_krajList = PrepareInfo(orp, ref_vystraha);
}

var distrSeznamNahore = false;
#import "CHMU-HLAVICKA";

resultText += '<br/>Územní platnost: ';
var findOrp = orp.filter(function(e) {
    return e.id == omezitNaOrp;
});
if (findOrp.length > 0) {
    var nazevORP = findOrp[0].nazev;
}
resultText += 'ORP ' + nazevORP;
resultText += '<hr/>';

var empty = true;
var zmen = 0;

if (vystraha.info && vystraha.info.length > 0) {
    // Najdeme všechny situace
    var situace = [];

    for (var i = 0; i < vystraha.info.length; i++) {
        if (vystraha.info[i].situace) {
            if (situace.indexOf(vystraha.info[i].situace) == -1) {
                // Vložíme situaci, kterou ještě nemáme
                situace.push(vystraha.info[i].situace);
            }
        }
    }

   if (situace.length > 0) {
        var upr_situace = situace[0].replace(/<br\/>/g,' ');
        resultText += '<br/><b>Meteorologická situace:</b> ' + upr_situace;
        resultText += '<hr/><div>';
    }

    pomoc = PrintInfoList(krajList, ref_krajList, 0);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
} else if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0) {
    // Výstraha ruší všechny předchozí jevy, tak je vypíšeme

    // Připravíme jednotlivé info jevy
    ref_krajList = PrepareInfo(orp, ref_vystraha);

    // Provedeme výpis
    pomoc = PrintInfoList(krajList, ref_krajList, 0);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}

if (empty) {
    resultText += '</div><br/><div>Na zvoleném území není v platnosti žádný nebezpečný jev.';
}

resultText += '</div>';

// Ukončení stránky
resultText += '</BODY>';
resultText += '</HTML>';

if (Number(zmen) == 0 && pouzeZmeny && zobrazitZmeny) {
    resultText = '';
}
