//Verze 58

#import "CHMU-CISELNIK";
#import "CHMU-DATUMY";

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
            pomKod += infoList[i].stupen_kod;
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
            if (poleJevy[h] == pomKodIvnj + platne[i].stupen_kod) {
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
                JEVY_NAZVY[poleJevy[h]] +
                ' od ' +
                zahajeni +
                ' do ' +
                ukonceni +
                oddelovac;
            sms1 +=
                JEVY_NAZVY[poleJevy[h]] +
                ' od ' +
                zahajeni +
                ' do ' +
                ukonceni +
                oddelovac;
        } else {
            resultText += JEVY_NAZVY[poleJevy[h]] + oddelovac;
            sms1 += JEVY_NAZVY[poleJevy[h]] + oddelovac;
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

var zacatky2 = [];
var konce2 = [];
var sms2 = '';

if (typeof ref_vystraha !== 'undefined' && ref_vystraha.info) {
    var ref_infoList = [];
    for (var l = 0; l < ref_vystraha.info.length; l++) {
        ref_infoList.push(ref_vystraha.info[l]);
    }

    ref_infoList = ref_infoList.sort(function(a, b) {
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

if (ref_infoList) {
    var poleJevy2 = [];
    var platne2 = [];
    for (var i = 0; i < ref_infoList.length; i++) {
        if (
            ref_infoList[i].stupen_kod != 'OUTLOOK' &&
            !UkoncenyJev(ref_infoList[i].dc_konec, vystraha.dc_odeslano) &&
            ref_infoList[i].orp_list
                .toString()
                .split(',')
                .indexOf(omezitNaOrp.toString()) > -1
        ) {
            var pomKod2 = '';
            if (ref_infoList[i].jistota_kod == 'Observed') {
                pomKod2 += '0';
            }
            pomKod2 += ref_infoList[i].stupen_kod;
            poleJevy2.push(pomKod2);
            platne2.push(ref_infoList[i]);
        }
    }

    poleJevy2 = removeDuplicates(poleJevy2);

    for (var h = 0; h < poleJevy2.length; h++) {
        var jevStart2 = [];
        var jevEnd2 = [];
        for (var i = 0; i < platne2.length; i++) {
            var pomKodIvnj2 = '';
            if (platne2[i].jistota_kod == 'Observed') {
                pomKodIvnj2 = '0';
            }
            if (poleJevy2[h] == pomKodIvnj + platne2[i].stupen_kod) {
                var nyni = Zaokrouhli(vystraha.dc_odeslano);
                var zacatek2 = Normalize(platne2[i].dc_zacatek);
                if (zacatek2 < nyni) {
                    zacatky2.push(nyni);
                    jevStart2.push(nyni);
                } else {
                    zacatky2.push(zacatek2);
                    jevStart2.push(zacatek2);
                }
                var konec2 = Normalize(platne2[i].dc_konec);
                konce2.push(konec2);
                jevEnd2.push(konec2);
            }
        }
        if (detailni) {
            var jevStarty2 = Math.min.apply(null, jevStart2);
            var jevZacatek2 = jevStarty2.toString();

            var jevEndy2 = Math.max.apply(null, jevEnd2);
            var jevKonec2 = jevEndy2.toString();

            var zahajeni2 = ZobrazDatumSMS(jevZacatek2);
            var ukonceni2 = ZobrazDatumSMS(jevKonec2, 1);

            sms2 +=
                JEVY_NAZVY[poleJevy2[h]] +
                ' od ' +
                zahajeni2 +
                ' do ' +
                ukonceni2 +
                oddelovac;
        } else {
            sms2 += JEVY_NAZVY[poleJevy2[h]] + oddelovac;
        }
    }

    var starty2 = Math.min.apply(null, zacatky2);
    var start2 = starty2.toString();

    var endy2 = Math.max.apply(null, konce2);
    var end2 = endy2.toString();

    var total_zahajeni2 = ZobrazDatumSMS(start2);
    var total_ukonceni2 = ZobrazDatumSMS(end2, 1);

    if (start2 == 'Infinity') {
        sms2 += 'Informace ČHMÚ: není v platnosti žádná výstraha.' + oddelovac;
    } else {
        if (!detailni) {
            sms2 +=
                'Platnost od ' +
                total_zahajeni2 +
                ' do ' +
                total_ukonceni2 +
                oddelovac;
        }
    }
}

if (sms1 == sms2) {
    vystupText = '';
}
