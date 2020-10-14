// Verze 70

#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";
#import "CHMU-DATUMY";
#import "CHMU-PREPARE";

var resultText = '';
var krajList = [];
var ref_krajList = [];
var info;
var vytvoreni = vystraha.dc_odeslano;
var pomoc = '';

var pom_mojeUzemi = [];
if (typeof mojeUzemi != 'object') {
    pom_mojeUzemi.push(mojeUzemi);
    mojeUzemi = pom_mojeUzemi;
}

if (vystraha.info && vystraha.info.length > 0) {
    krajList = PrepareInfo(orp, vystraha, mojeUzemi);
}

if (
    typeof ref_vystraha !== 'undefined' &&
    ref_vystraha.info &&
    ref_vystraha.info.length > 0
) {
    ref_krajList = PrepareInfo(orp, ref_vystraha, mojeUzemi);
}

var distrSeznamNahore = false;
#import "CHMU-HLAVICKA";

resultText += '<br/>Územní platnost: ' + nazevUzemi;
resultText += '<hr/>';

var empty = true;
var zmen = 0;
var headers;
if (mojeUzemi.length == 1) {
    headers = 0;
} else {
    headers = 1;
}

if (vystraha.info && vystraha.info.length > 0) {
    var situace = [];

    for (var i = 0; i < vystraha.info.length; i++) {
        if (vystraha.info[i].situace) {
            if (situace.indexOf(vystraha.info[i].situace) == -1) {
                situace.push(vystraha.info[i].situace);
            }
        }
    }

    if (situace.length > 0) {
        var upr_situace = situace[0].replace(/<br\/>/g, ' ');
        resultText += '<br/><b>Meteorologická situace:</b> ' + upr_situace;
        resultText += '<hr/><div>';
    }

    pomoc = PrintInfoList(krajList, ref_krajList, headers);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
} else if (
    typeof ref_vystraha !== 'undefined' &&
    ref_vystraha.info &&
    ref_vystraha.info.length > 0
) {
    pomoc = PrintInfoList(krajList, ref_krajList, headers);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}

if (empty) {
    resultText +=
        '</div><br/><div>Na zvoleném území není v platnosti žádný nebezpečný jev.';
}

resultText += '</div>';
resultText += '</BODY>';
resultText += '</HTML>';

if (Number(zmen) == 0 && pouzeZmeny) {
    resultText = '';
}
