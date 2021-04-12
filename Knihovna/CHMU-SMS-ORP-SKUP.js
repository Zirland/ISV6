// Verze 73

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

var pom_mojeUzemi = [];
if (typeof mojeUzemi != 'object') {
    pom_mojeUzemi.push(mojeUzemi);
    mojeUzemi = pom_mojeUzemi;
}

var zacatky2 = [];
var konce2 = [];
var sms2 = '';

if (typeof ref_vystraha !== 'undefined' && ref_vystraha.info) {
    var ref_infoList = [];
    for (var i = 0; i < ref_vystraha.info.length; i++) {
        for (j = 0; j < mojeUzemi.length; j++) {
            if (
                ref_vystraha.info[i].orp_list
                    .toString()
                    .split(',')
                    .indexOf(mojeUzemi[j].toString()) > -1
            ) {
                ref_infoList.push(ref_vystraha.info[i]);
            }
        }
    }

    ref_infoList = ref_infoList.sort(function (a, b) {
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

if (ref_infoList) {
    var poleJevy2 = [];
    var platne2 = [];
    for (var i = 0; i < ref_infoList.length; i++) {
        if (
            ref_infoList[i].stupen_kod != 'OUTLOOK' &&
            !UkoncenyJev(ref_infoList[i].dc_konec, vystraha.dc_odeslano)
        ) {
            var pomKod2 = '';
            if (ref_infoList[i].jistota_kod == 'Observed') {
                pomKod2 += '0';
            }
            var splitkod2 = ref_infoList[i].stupen_kod.split('.');
            var skupina2 = splitkod2[0];
            if (
                skupina2 == 'WARN' ||
                skupina2 == 'REG' ||
                skupina2 == 'SMOGSIT'
            ) {
                skupina2 = splitkod2[1];
            }

            pomKod2 += skupina2;
            poleJevy2.push(pomKod2);
            platne2.push(ref_infoList[i]);
        }
    }

    poleJevy2 = removeDuplicates(poleJevy2);

    for (var h = 0; h < poleJevy2.length; h++) {
        var jevStart2 = [];
        var jevEnd2 = [];
        var jevOrpList2 = [];
        for (var i = 0; i < platne2.length; i++) {
            var pomKodIvnj2 = '';
            if (platne2[i].jistota_kod == 'Observed') {
                pomKodIvnj2 = '0';
            }

            var splitkodJev2 = platne2[i].stupen_kod.split('.');
            var skupinaJev2 = splitkodJev2[0];
            if (
                skupinaJev2 == 'WARN' ||
                skupinaJev2 == 'REG' ||
                skupinaJev2 == 'SMOGSIT'
            ) {
                skupinaJev2 = splitkodJev2[1];
            }

            if (poleJevy2[h] == pomKodIvnj2 + skupinaJev2) {
                var OrpList2 = ref_infoList[i].orp_list;
                var OrpListArr2 = OrpList2.toString().split(',');

                for (var k = 0; k < OrpListArr2.length; k++) {
                    for (var l = 0; l < orp.length; l++) {
                        for (var m = 0; m < mojeUzemi.length; m++) {
                            if (
                                OrpListArr2[k] == orp[l].id &&
                                orp[l].id == mojeUzemi[m]
                            ) {
                                jevOrpList2.push(orp[l].nazev);
                            }
                        }
                    }
                }

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

        jevOrpList2 = removeDuplicates(jevOrpList2);
        jevOrpList2 = jevOrpList2.sort(function (a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });

        sms2 += JEVY_SKUPINY[poleJevy2[h]];
        if (vypisOrp) {
            sms2 += ' pro ORP ';

            var seznOrp2 = '';

            for (var t = 0; t < jevOrpList2.length; t++) {
                seznOrp2 += jevOrpList2[t] + ', ';
            }
            seznOrp2 = seznOrp2.substring(0, seznOrp2.length - 2);
            sms2 += seznOrp2;
        }
        if (detailni) {
            var jevStarty2 = Math.min.apply(null, jevStart2);
            var jevZacatek2 = jevStarty2.toString();

            var jevEndy2 = Math.max.apply(null, jevEnd2);
            var jevKonec2 = jevEndy2.toString();

            var zahajeni2 = ZobrazDatumSMS(jevZacatek2);
            var ukonceni2 = ZobrazDatumSMS(jevKonec2, 1);

            sms2 += ' od ' + zahajeni2 + ' do ' + ukonceni2 + oddelovac;
        } else {
            sms2 += oddelovac;
        }
    }

    var starty2 = Math.min.apply(null, zacatky2);
    var start2 = starty2.toString();

    var endy2 = Math.max.apply(null, konce2);
    var end2 = endy2.toString();

    var total_zahajeni2 = ZobrazDatumSMS(start2);
    var total_ukonceni2 = ZobrazDatumSMS(end2, 1);

    if (start2 == 'Infinity' && poleJevy2 && poleJevy2.length > 0) {
        sms2 += 'Informace ČHMÚ: byla ukončena platnost vydané výstrahy.' + oddelovac;
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

var zacatky = [];
var konce = [];
var sms1 = '';
var seznjevu = [];
var resultText = '';
var vystupText = '';

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
        var jevOrpList = [];
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
                var OrpList = infoList[i].orp_list;
                var OrpListArr = OrpList.toString().split(',');

                for (var k = 0; k < OrpListArr.length; k++) {
                    for (var l = 0; l < orp.length; l++) {
                        for (var m = 0; m < mojeUzemi.length; m++) {
                            if (
                                OrpListArr[k] == orp[l].id &&
                                orp[l].id == mojeUzemi[m]
                            ) {
                                jevOrpList.push(orp[l].nazev);
                            }
                        }
                    }
                }

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

        jevOrpList = removeDuplicates(jevOrpList);
        jevOrpList = jevOrpList.sort(function (a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });

        resultText += JEVY_SKUPINY[poleJevy[h]];
        sms1 += JEVY_SKUPINY[poleJevy[h]];
        if (vypisOrp) {
            resultText += ' pro ORP ';
            sms1 += ' pro ORP ';

            var seznOrp = '';

            for (var t = 0; t < jevOrpList.length; t++) {
                seznOrp += jevOrpList[t] + ', ';
            }
            seznOrp = seznOrp.substring(0, seznOrp.length - 2);
            resultText += seznOrp;
            sms1 += seznOrp;
        }
        if (detailni) {
            var jevStarty = Math.min.apply(null, jevStart);
            var jevZacatek = jevStarty.toString();

            var jevEndy = Math.max.apply(null, jevEnd);
            var jevKonec = jevEndy.toString();

            var zahajeni = ZobrazDatumSMS(jevZacatek);
            var ukonceni = ZobrazDatumSMS(jevKonec, 1);

            resultText += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
            sms1 += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
        } else {
            resultText += oddelovac;
            sms1 += oddelovac;
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

    if (start == 'Infinity' && poleJevy2 && poleJevy2.length > 0) {
        vystupText +=
            'Informace ČHMÚ: byla ukončena platnost vydané výstrahy.' + oddelovac;
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

if (sms1 == sms2) {
    vystupText = '';
}
