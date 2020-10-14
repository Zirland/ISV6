// Verze 71

#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";
#import "CHMU-DATUMY";
#import "CHMU-PREPARE";

var zobrazitVyhled = false;
var zobrazitZmeny = true;

if (omezitNaKraj != -1) {
    var orpTmp = [];

    for (var i = 0; i < orp.length; i++) {
        if (omezitNaKraj == orp[i].kraj.id) {
            orpTmp.push(orp[i]);
        }
    }

    orp = orpTmp;
}

var resultText = '';
var krajList = [];
var ref_krajList = [];
var info;
var vytvoreni = vystraha.dc_odeslano;
var pomoc = '';

if (vystraha.info && vystraha.info.length > 0) {
    krajList = PrepareInfo(orp, vystraha);
}

if (
    typeof ref_vystraha !== 'undefined' &&
    ref_vystraha.info &&
    ref_vystraha.info.length > 0
) {
    ref_krajList = PrepareInfo(orp, ref_vystraha);
}

var empty = true;
var zmen = 0;

if (vystraha.info && vystraha.info.length > 0) {
    pomoc = PrintInfoList(krajList, ref_krajList);
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
} else if (
    typeof ref_vystraha !== 'undefined' &&
    ref_vystraha.info &&
    ref_vystraha.info.length > 0
) {
    pomoc = PrintInfoList(krajList, ref_krajList);
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}

if (Number(zmen) != 0) {
    resultText = 'Na Váš e-mail byla odeslána zpráva.';
}
