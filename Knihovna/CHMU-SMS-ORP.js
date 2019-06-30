// Verze 53

#import "CHMU-CISELNIK";
#import "CHMU-DATUMY";

var zacatky = [];
var konce = [];
var seznjevu = [];

function removeDuplicates(arr) {
    var unique_array = [];
    for (var i = 0;i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i]);
        }
    }
    return unique_array;
}

var resultText = '';
var vystupText = '';
var sms1 = '';
var sms2 = '';

if (vystraha.info) {
    var infoList = [];
    for (var l = 0; l < vystraha.info.length; l++) {
        infoList.push(vystraha.info[l]);
    }

    infoList = infoList.sort(function (a, b) {
        var start1 = parseFloat(Normalize(a.dc_zacatek));
        var start2 = parseFloat(Normalize(b.dc_zacatek));
        var jev1 = a.stupen_kod;
        var jev2 = b.stupen_kod;

        if (start1 < start2) return -1;
        if (start1 > start2) return 1;
        if (jev1 < jev2) return -1;
        if (jev1 > jev2) return 1;
        return 0;
    });
}

if (infoList) {
    var poleJevy = [];
    var platne = [];
    for (var i = 0; i < infoList.length; i++) {
        if (infoList[i].stupen_kod != 'OUTLOOK' && (infoList[i].orp_list.toString().split(',').indexOf(omezitNaOrp.toString()) > -1)) { 
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

    poleJevy = poleJevy.sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    for (var h = 0; h < poleJevy.length; h++) {
        var jevStart = [];
        var jevEnd = [];
        for (var i = 0; i < platne.length; i++) {
            var pomKodIvnj = '';
            if (platne[i].jistota_kod == 'Observed') {
                pomKodIvnj = '0';
            }
            if (poleJevy[h] == pomKodIvnj + platne[i].stupen_kod) {
                warn_type = 'SVRS';
                if (platne[i].SIVS == '1') {
                    warn_type = 'SIVS';
                }
                if (platne[i].HPPS == '1') {
                    warn_type = 'HPPS';
                }
                seznjevu.push(warn_type);
                zacatek = Normalize(platne[i].dc_zacatek);
                zacatky.push(zacatek);
                konec = Normalize(platne[i].dc_konec);
                konce.push(konec);

                jevStart.push(zacatek);
                jevEnd.push(konec);
            }
        }
        if (detailni) {
            jevStarty = Math.min.apply(null, jevStart);
            jevZacatek = jevStarty.toString();

            jevEndy = Math.max.apply(null, jevEnd);
            jevKonec = jevEndy.toString();

            zahajeni = ZobrazDatumSMS(jevZacatek);
            ukonceni = ZobrazDatumSMS(jevKonec, 1);

            resultText += JEVY_NAZVY[poleJevy[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
            sms1 += JEVY_NAZVY[poleJevy[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
        } else {
            resultText += JEVY_NAZVY[poleJevy[h]] + oddelovac;
            sms1 = JEVY_NAZVY[poleJevy[h]] + oddelovac;
        }
    }

    starty = Math.min.apply(null, zacatky);
    start = starty.toString();

    endy = Math.max.apply(null, konce);
    end = endy.toString();

    total_zahajeni = ZobrazDatumSMS(start);
    total_ukonceni = ZobrazDatumSMS(end, 1);

    rezim = 'SVRS';
    if (seznjevu.indexOf('SIVS') > -1) {
        rezim = 'SIVS';
    }
    if (seznjevu.indexOf('HPPS') > -1) {
        rezim = 'HPPS';
    }

    if (start == 'Infinity') {
        vystupText += 'Informace ČHMÚ: není v platnosti žádná výstraha.' + oddelovac;
        sms1 += vystupText;
    } else {
        switch (vystraha.ucel) {
            case 'Exercise' :
                uvod = 'Cvičná zpráva ';
            break;
            case 'System' :
                uvod = 'Systémová zpráva ';
            break;
            case 'Test' :
                uvod = 'Testovací zpráva ';
            break;
            default : 
                uvod = 'Výstraha ';
            break;
        }

        switch (rezim) {
            case 'HPPS' :
                uvod += 'HPPS ';
            break;
            case 'SIVS' :
                uvod += 'SIVS ';
            break;
            case 'SVRS' :
                uvod += 'SVRS ';
            break;
            default :
                uvod += 'ČHMÚ';
            break;
        }

        var poradi_zpravy = vystraha.id.substring(vystraha.id.length - 6);
        uvod += 'č. ' + Number(poradi_zpravy) + ': ';
        vystupText += uvod;

        vystupText += resultText;

        if (!detailni) {
            vystupText += 'Platnost od ' + total_zahajeni + ' do ' + total_ukonceni + oddelovac;
            sms1 += 'Platnost od ' + total_zahajeni + ' do ' + total_ukonceni + oddelovac;
        }
    }
    vystupText = vystupText.substring(0, vystupText.length - oddelovac.length);
}

resultText = '';
zacatky = [];
konce = [];

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0) {
    var ref_infoList = [];
    for (var l = 0; l < ref_vystraha.info.length; l++) {
        ref_infoList.push(ref_vystraha.info[l]);
    }

    ref_infoList = ref_infoList.sort(function (a, b) {
        var start1 = parseFloat(Normalize(a.dc_zacatek));
        var start2 = parseFloat(Normalize(b.dc_zacatek));
        var jev1 = a.stupen_kod;
        var jev2 = b.stupen_kod;

        if (start1 < start2) return -1;
        if (start1 > start2) return 1;
        if (jev1 < jev2) return -1;
        if (jev1 > jev2) return 1;
        return 0;
    });
}

if (ref_infoList) {
    var poleJevy2 = [];
    var platne2 = [];
    for (var i = 0; i < ref_infoList.length; i++) {
        if (ref_infoList[i].stupen_kod != 'OUTLOOK' && (ref_infoList[i].orp_list.toString().split(',').indexOf(omezitNaOrp.toString()) > -1)) { 
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

    poleJevy2 = poleJevy2.sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    for (var h = 0; h < poleJevy2.length; h++) {
        var jevStart = jevEnd = [];
        for (var i = 0; i < platne2.length; i++) {
           var pomKodIvnj2 = '';
            if (platne2[i].jistota_kod == 'Observed') {
                pomKodIvnj2 = '0';
            }
            if (poleJevy2[h] == pomKodIvnj + platne2[i].stupen_kod) {
                warn_type = 'SVRS';
                if (platne2[i].SIVS == '1') {
                    warn_type = 'SIVS';
                }
                if (platne2[i].HPPS == '1') {
                    warn_type = 'HPPS';
                }
                seznjevu.push(warn_type);
                zacatek = Normalize(platne2[i].dc_zacatek);
                zacatky.push(zacatek);
                konec = Normalize(platne2[i].dc_konec);
                konce.push(konec);

                jevEnd.push(konec);
            }
        }
        if (detailni) {
            jevEndy = Math.max.apply(null, jevEnd);
            jevKonec = jevEndy.toString();

            ukonceni = ZobrazDatumSMS(jevKonec, 1);

            sms2 += JEVY_NAZVY[poleJevy2[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
        } else {
            sms2 = JEVY_NAZVY[poleJevy2[h]] + oddelovac;
        }
    }

    starty = Math.min.apply(null, zacatky);
    start = starty.toString();

    endy = Math.max.apply(null, konce);
    end = endy.toString();

    total_zahajeni = ZobrazDatumSMS(start);
    total_ukonceni = ZobrazDatumSMS(end, 1);

    if (start == 'Infinity') {
        sms2 += 'Informace ČHMÚ: není v platnosti žádná výstraha.' + oddelovac;
    } else {
        if (!detailni) {
            sms2 += 'Platnost od ' + total_zahajeni + ' do ' + total_ukonceni + oddelovac;
        }
    }
}

if (sms1 == sms2) {
    vystupText = '';
}