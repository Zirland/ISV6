// Verze 76

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
var resultText = '';
var vystupText = '';

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

var orpTmp = [];
for (var i = 0; i < orp.length; i++) {
    for (var j = 0; j < orp.length; j++) {
        if (mojeUzemi[j] == orp[i].id) {
            orpTmp.push(orp[i]);
        }
    }
}

orp = orpTmp;

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
        for (var i = 0; i < vystraha.info.length; i++) {
            for (j = 0; j < mojeUzemi.length; j++) {
                if (
                    vystraha.info[i].orp_list
                        .toString()
                        .split(',')
                        .indexOf(mojeUzemi[j].toString()) > -1
                ) {
                    infoList.push(vystraha.info[i]);
                }
            }
        }

        infoList = infoList.sort(function (a, b) {
            var vyskyt1 = 0;
            var vyskyt2 = 0;
            var start1 = parseFloat(Normalize(a.dc_zacatek));
            var start2 = parseFloat(Normalize(b.dc_zacatek));
            var jev1 = a.stupen_kod;
            var jev2 = b.stupen_kod;
            var barva1 = a.stupen_kod.split('.')[1];
            if (typeof barva1 !== 'undefined' && barva1) {
                var zavaznost1 = Number(barva1.substring(0, 1));
            } else {
                var zavaznost1 = 0;
            }
            var barva2 = b.stupen_kod.split('.')[1];
            if (typeof barva2 !== 'undefined' && barva2) {
                var zavaznost2 = Number(barva2.substring(0, 1));
            } else {
                var zavaznost2 = 0;
            }

            if (a.jistota_kod == 'Observed') {
                vyskyt1 = 1;
            }
            if (b.jistota_kod == 'Observed') {
                vyskyt2 = 1;
            }
            if (vyskyt1 > vyskyt2) return -1;
            if (vyskyt1 < vyskyt2) return 1;
            if (start1 < start2) return -1;
            if (start1 > start2) return 1;
            if (zavaznost1 > zavaznost2) return -1;
            if (zavaznost1 < zavaznost2) return 1;
            if (jev1 < jev2) return -1;
            if (jev1 > jev2) return 1;
            return 0;
        });
    }

    if (infoList) {
        var poleJevy = [];
        var platne = [];
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
                platne.push(infoList[i]);
            }
        }

        poleJevy = removeDuplicates(poleJevy);

        for (var h = 0; h < poleJevy.length; h++) {
            for (var i = 0; i < platne.length; i++) {
                var pomKodIvnj = '';
                if (platne[i].jistota_kod == 'Observed') {
                    pomKodIvnj = '0';
                }
                var splitkodJev = platne[i].stupen_kod.split('.');
                var skupinaJev = splitkodJev[0];
                if (
                    skupinaJev == 'WARN' ||
                    skupinaJev == 'REG' ||
                    skupinaJev == 'SMOGSIT'
                ) {
                    skupinaJev = splitkodJev[1];
                }

                if (poleJevy[h] == pomKodIvnj + skupinaJev) {
                    var zacatek = Normalize(platne[i].dc_zacatek);
                    zacatky.push(zacatek);
                }
            }
            resultText += JEVY_SKUPINY[poleJevy[h]] + ', ';
        }

        var starty = Math.min.apply(null, zacatky);
        var start = starty.toString();

        if (start == 'Infinity') {
            vystupText += 'informace ČHMÚ - byla ukončena platnost vydané výstrahy.';
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
