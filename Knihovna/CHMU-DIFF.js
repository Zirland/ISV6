// Verze 43

zobrazitZmeny = true;

if (omezitNaKraj != -1) {
    var orpTmp = [];

    for (var i = 0; i < orp.length; i++) {
        // Pokud se jedná o hlavní kraj
        if (omezitNaKraj == orp[i].kraj.id) {
            // Dáme na začátek seznamu
            orpTmp.push(orp[i]);
        }
    }

    orp = orpTmp;
}

// Samotná zpráva
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

var zmen = 0;

if (vystraha.info && vystraha.info.length > 0) {
    pomoc = PrintInfoList(krajList, ref_krajList);
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
} else if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0) {
    // Výstraha ruší všechny předchozí jevy, tak je vypíšeme

    // Připravíme jednotlivé info jevy
    ref_krajList = PrepareInfo(orp, ref_vystraha);

    // Provedeme výpis
    pomoc = PrintInfoList(krajList, ref_krajList);
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}