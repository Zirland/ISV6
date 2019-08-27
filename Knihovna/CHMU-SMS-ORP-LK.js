//Verze 60

#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";
#import "CHMU-DATUMY";
#import "CHMU-PREPARE";

var zobrazitVyhled = false;
var zobrazitZmeny = true;
var orpTmp = [];

for (var i = 0; i < orp.length; i++) {
    if (omezitNaOrp == orp[i].id) {
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

    function removeDuplicates(arr) {
        var unique_array = [];
        for (var i = 0; i < arr.length; i++) {
            if (unique_array.indexOf(arr[i]) == -1) {
                unique_array.push(arr[i]);
            }
        }
        return unique_array;
    }
    
    var zacatky = [];
    var konce = [];
    var sms1 = '';
    var seznjevu = [];
    var resultText = '';
    var vystupText = '';
    
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
        var platne = [];
        for (var i = 0; i < infoList.length; i++) {
            if (
                infoList[i].stupen_kod != 'OUTLOOK' &&
                infoList[i].orp_list
                    .toString()
                    .split(',')
                    .indexOf(omezitNaOrp.toString()) > -1
            ) {
                var pomKod = '';
                if (infoList[i].jistota_kod == 'Observed') {
                    pomKod += '0';
                }
                var splitkod = infoList[i].stupen_kod.split('.');
                var skupina = splitkod[0];
                if (skupina == 'WARN' || skupina == 'REG' || skupina == 'SMOGSIT') {
                    skupina = splitkod[1];
                }
    
                pomKod += skupina;
                poleJevy.push(pomKod);
                platne.push(infoList[i]);
            }
        }
    
        poleJevy = removeDuplicates(poleJevy);
    
        for (var h = 0; h < poleJevy.length; h++) {
            var jevStart = [];
            var jevEnd = [];
            for (var i = 0; i < platne.length; i++) {
                var pomKodIvnj = '';
                if (platne[i].jistota_kod == 'Observed') {
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
                    var warn_type = 'SVRS';
                    if (platne[i].SIVS == '1') {
                        warn_type = 'SIVS';
                    }
                    if (platne[i].HPPS == '1') {
                        warn_type = 'HPPS';
                    }
                    seznjevu.push(warn_type);
                    var zacatek = Normalize(platne[i].dc_zacatek);
                    zacatky.push(zacatek);
                    var konec = Normalize(platne[i].dc_konec);
                    konce.push(konec);
    
                    jevStart.push(zacatek);
                    jevEnd.push(konec);
                }
            }
            if (detailni) {
                var jevStarty = Math.min.apply(null, jevStart);
                var jevZacatek = jevStarty.toString();
    
                var jevEndy = Math.max.apply(null, jevEnd);
                var jevKonec = jevEndy.toString();
    
                var zahajeni = ZobrazDatumSMS(jevZacatek);
                var ukonceni = ZobrazDatumSMS(jevKonec, 1);
    
                resultText +=
                    JEVY_SKUPINY[poleJevy[h]] +
                    ' od ' +
                    zahajeni +
                    ' do ' +
                    ukonceni +
                    oddelovac;
                sms1 +=
                    JEVY_SKUPINY[poleJevy[h]] +
                    ' od ' +
                    zahajeni +
                    ' do ' +
                    ukonceni +
                    oddelovac;
            } else {
                resultText += JEVY_SKUPINY[poleJevy[h]] + oddelovac;
                sms1 += JEVY_SKUPINY[poleJevy[h]] + oddelovac;
            }
        }
    
        var starty = Math.min.apply(null, zacatky);
        var start = starty.toString();
    
        var endy = Math.max.apply(null, konce);
        var end = endy.toString();
    
        var total_zahajeni = ZobrazDatumSMS(start);
        var total_ukonceni = ZobrazDatumSMS(end, 1);
    
        var rezim = 'SVRS';
        if (seznjevu.indexOf('SIVS') > -1) {
            rezim = 'SIVS';
        }
        if (seznjevu.indexOf('HPPS') > -1) {
            rezim = 'HPPS';
        }
    
        if (start == 'Infinity') {
            vystupText +=
                'Informace ČHMÚ: není v platnosti žádná výstraha.' + oddelovac;
            sms1 += vystupText;
        } else {
            switch (vystraha.ucel) {
                case 'Exercise':
                    var uvod = 'Cvičná zpráva ';
                    break;
                case 'System':
                    var uvod = 'Systémová zpráva ';
                    break;
                case 'Test':
                    var uvod = 'Testovací zpráva ';
                    break;
                default:
                    var uvod = 'Výstraha ';
                    break;
            }
    
            switch (rezim) {
                case 'HPPS':
                    uvod += 'HPPS ';
                    break;
                case 'SIVS':
                    uvod += 'SIVS ';
                    break;
                case 'SVRS':
                    uvod += 'SVRS ';
                    break;
                default:
                    uvod += 'ČHMÚ';
                    break;
            }
    
            var poradi_zpravy = vystraha.id.substring(vystraha.id.length - 6);
            uvod += 'č. ' + Number(poradi_zpravy) + ': ';
            vystupText += uvod;
    
            vystupText += resultText;
    
            if (!detailni) {
                vystupText +=
                    'Platnost od ' +
                    total_zahajeni +
                    ' do ' +
                    total_ukonceni +
                    oddelovac;
                sms1 +=
                    'Platnost od ' +
                    total_zahajeni +
                    ' do ' +
                    total_ukonceni +
                    oddelovac;
            }
        }
        vystupText = vystupText.substring(0, vystupText.length - oddelovac.length);
    }
    

    resultText = 'Na Váš e-mail byla odeslána zpráva.';
}
