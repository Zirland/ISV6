// Verze 75

#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";
#import "CHMU-DATUMY";
#import "CHMU-PREPARE";

if (!razeniPodleNazvu) {
    var orpSort = orp;
    orpSort.sort(function(a, b) {
        var kraj1 = parseFloat(a.kraj.id);
        var kraj2 = parseFloat(b.kraj.id);
        var okres1 = parseFloat(a.okres.id);
        var okres2 = parseFloat(b.okres.id);
        var orp1 = parseFloat(a.id);
        var orp2 = parseFloat(b.id);

        if (kraj1 < kraj2) return -1;
        if (kraj1 > kraj2) return 1;
        if (okres1 < okres2) return -1;
        if (okres1 > okres2) return 1;
        if (orp1 < orp2) return -1;
        if (orp1 > orp2) return 1;
        return 0;
    });
}

if (hlavniKraj != -1) {
    var orpTmp = [];

    for (var i = 0; i < orp.length; i++) {
        if (hlavniKraj == orp[i].kraj.id) {
            orpTmp.push(orp[i]);
        }
    }

    if (zobrazovatVsechnyKraje) {
        for (var i = 0; i < orp.length; i++) {
            if (hlavniKraj != orp[i].kraj.id) {
                orpTmp.push(orp[i]);
            }
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

#import "CHMU-HLAVICKA";

resultText += '<br/>Územní platnost: ';
if (hlavniKraj == '-1' || zobrazovatVsechnyKraje) {
    resultText += 'Česká republika';
} else {
    resultText += KRAJE_NAZVY[hlavniKraj];
}

resultText += '<hr/>';

var empty = true;
var zmen = 0;

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

    pomoc = PrintInfoList(krajList, ref_krajList, 1);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
} else if (
    typeof ref_vystraha !== 'undefined' &&
    ref_vystraha.info &&
    ref_vystraha.info.length > 0
) {
    pomoc = PrintInfoList(krajList, ref_krajList, 1);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}

if (empty) {
    resultText +=
        '</div><br/><div>Na zvoleném území není v platnosti žádný nebezpečný jev.';
}

if (distrSeznamNahore == false) {
    resultText += '</div><hr/>';
    resultText += '<br/>Distribuce: ';

    var dist = '';

    for (var k = 0; k < krajList.length; k++) {
        var found =
            krajList[k].info.length > 0 ||
            (ref_krajList.length > 0 && ref_krajList[k].info.length > 0);

        for (var o = 0; o < krajList[k].okresList.length && !found; o++) {
            found =
                krajList[k].okresList[o].info.length > 0 ||
                (ref_krajList.length > 0 &&
                    ref_krajList[k].okresList[o].info.length > 0);

            for (
                var ol = 0;
                ol < krajList[k].okresList[o].orpList.length && !found;
                ol++
            ) {
                found =
                    krajList[k].okresList[o].orpList[ol].info.length > 0 ||
                    (ref_krajList.length > 0 &&
                        ref_krajList[k].okresList[o].orpList[ol].info.length >
                            0);
            }
        }

        if (found) {
            dist += (dist ? ', ' : '') + KRAJE_KODY[krajList[k].id];
        }
    }

    if (krajList.length == 0) {
        for (var k = 0; k < ref_krajList.length; k++) {
            var found = ref_krajList[k].info.length > 0;

            for (
                var o = 0;
                o < ref_krajList[k].okresList.length && !found;
                o++
            ) {
                found = ref_krajList[k].okresList[o].info.length > 0;

                for (
                    var ol = 0;
                    ol < ref_krajList[k].okresList[o].orpList.length && !found;
                    ol++
                ) {
                    found =
                        ref_krajList[k].okresList[o].orpList[ol].info.length >
                        0;
                }
            }

            if (found) {
                dist += (dist ? ', ' : '') + KRAJE_KODY[ref_krajList[k].id];
            }
        }
    }

    resultText += dist;
}

resultText += '</BODY>';
resultText += '</HTML>';

if (Number(zmen) == 0 && pouzeZmeny) {
    resultText = '';
}
