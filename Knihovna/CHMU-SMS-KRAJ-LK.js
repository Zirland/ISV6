// Verze 61

#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";
#import "CHMU-DATUMY";
#import "CHMU-PREPARE";

function removeDuplicates(arr) {
    var unique_array = [];
    for (var i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i]);
        }
    }
    return unique_array;
}

var zobrazitVyhled = false;
var zobrazitZmeny = true;
var vystupText = '';

var orpTmp = [];

for (var i = 0; i < orp.length; i++) {
    if (omezitNaKraj == orp[i].kraj.id) {
        orpTmp.push(orp[i]);
    }
}

orp = orpTmp;

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
    var zacatky = [];
    vystupText += 'Na Váš e-mail byla odeslána ';

    if (vystraha.info) {
        var infoList = [];
        for (var l = 0; l < vystraha.info.length; l++) {
            infoList.push(vystraha.info[l]);
        }

        infoList = infoList.sort(function(a, b) {
            var vyskyt1 = 0;
            var vyskyt2 = 0;
            var jev1 = a.stupen_kod;
            var jev2 = b.stupen_kod;

            if (a.jistota_kod == 'Observed') {
                vyskyt1 = 1;
            }
            if (b.jistota_kod == 'Observed') {
                vyskyt2 = 1;
            }
            if (vyskyt1 > vyskyt2) return -1;
            if (vyskyt1 < vyskyt2) return 1;
            if (jev1 < jev2) return -1;
            if (jev1 > jev2) return 1;
            return 0;
        });
    }

    if (infoList) {
        var poleJevy = [];
        for (var i = 0; i < infoList.length; i++) {
            if (infoList[i].stupen_kod != 'OUTLOOK') {
                var pomKod = '';
                if (infoList[i].jistota_kod == 'Observed') {
                    pomKod += '0';
                }
                var splitkod = infoList[i].stupen_kod.split('.');
                var skupina = splitkod[0];
                if (
                    skupina == 'WARN' ||
                    skupina == 'REG' ||
                    skupina == 'SMOGSIT'
                ) {
                    skupina = splitkod[1];
                }

                pomKod += skupina;
                poleJevy.push(pomKod);
            }
        }

        poleJevy = removeDuplicates(poleJevy);

        for (var h = 0; h < poleJevy.length; h++) {
            var jevKrajeList = [];
            for (var i = 0; i < infoList.length; i++) {
                var pomKodIvnj = '';
                if (infoList[i].jistota_kod == 'Observed') {
                    pomKodIvnj = '0';
                }
                var splitkodJev = infoList[i].stupen_kod.split('.');
                var skupinaJev = splitkodJev[0];
                if (
                    skupinaJev == 'WARN' ||
                    skupinaJev == 'REG' ||
                    skupinaJev == 'SMOGSIT'
                ) {
                    skupinaJev = splitkodJev[1];
                }

                if (poleJevy[h] == pomKodIvnj + skupinaJev) {
                    var found = false;
                    for (
                        var j = 0;
                        j < infoList[i].kraj.length && !found;
                        j++
                    ) {
                        found = infoList[i].kraj[j].UID == omezitNaKraj;
                    }
                    for (var j = 0; j < infoList[i].kraj.length; j++) {
                        if (found) {
                            jevKrajeList.push(infoList[i].kraj[j].UID);
                            var zacatek = Normalize(infoList[i].dc_zacatek);
                            zacatky.push(zacatek);
                        }
                    }
                }
            }
            jevKrajeList = removeDuplicates(jevKrajeList);
            jevKrajeList = jevKrajeList.sort(function(a, b) {
                return a - b;
            });

            if (jevKrajeList.length > 0) {
                resultText += JEVY_SKUPINY[poleJevy[h]] + ', ';
            }
        }

        var starty = Math.min.apply(null, zacatky);
        var start = starty.toString();

        if (start == 'Infinity') {
            vystupText += 'informace ČHMÚ - není v platnosti žádná výstraha.';
            vystupText += ', ';
        } else {
            var uvod = '';
            switch (vystraha.ucel) {
                case 'Exercise':
                    uvod = 'cvičná zpráva ČHMÚ - ';
                    break;
                case 'System':
                    uvod = 'systémová zpráva ČHMÚ - ';
                    break;
                case 'Test':
                    uvod = 'testovací zpráva ČHMÚ - ';
                    break;
                default:
                    uvod = 'výstraha ČHMÚ - ';
                    break;
            }

            vystupText += uvod;
            vystupText += resultText;
        }
        vystupText = vystupText.substring(0, vystupText.length - 2);
    }
}
