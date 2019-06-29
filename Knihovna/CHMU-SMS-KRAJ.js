// Verze 52

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

        if (start1 < start2) return -1;
        if (start1 > start2) return 1;
        return 0;
    });

    infoList = infoList.sort(function (a, b) {
        var jev1 = a.stupen_kod;
        var jev2 = b.stupen_kod;

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
            pomKod += infoList[i].stupen_kod;
            poleJevy.push(pomKod);
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
        var jevKrajeList = [];
        for (var i = 0; i < infoList.length; i++) {
            var pomKodIvnj = '';
            if (infoList[i].jistota_kod == 'Observed') {
                pomKodIvnj = '0';
            }
            if (poleJevy[h] == pomKodIvnj + infoList[i].stupen_kod) {
                var found = omezitNaKraj == -1;
                for (var j = 0; j < infoList[i].kraj.length && !found; j++) {
                    found = infoList[i].kraj[j].UID == omezitNaKraj;
                }
                for (var j = 0; j < infoList[i].kraj.length; j++) {
                    if (found) {
                        jevKrajeList.push(infoList[i].kraj[j].UID);
                        warn_type = 'SVRS';
                        if (infoList[i].SIVS == '1') {
                            warn_type = 'SIVS';
                        }
                        if (infoList[i].HPPS == '1') {
                            warn_type = 'HPPS';
                        }
                        seznjevu.push(warn_type);
                        zacatek = Normalize(infoList[i].dc_zacatek);
                        zacatky.push(zacatek);
                        konec = 99999999999999;
                        if (infoList[i].dc_konec) {
                            konec = Normalize(infoList[i].dc_konec);
                        }
                        konce.push(konec);

                        jevStart.push(zacatek);
                        jevEnd.push(konec);
                    }
                }
            }
        }
        jevKrajeList = removeDuplicates(jevKrajeList);
        jevKrajeList = jevKrajeList.sort(function (a, b) {
            return a-b;
        });

        if (jevKrajeList.length > 0) {
            if (omezitNaKraj == -1) {
                resultText += JEVY_NAZVY[poleJevy[h]];
                sms1 += JEVY_NAZVY[poleJevy[h]];
                resultText += ' pro kraje ';
                sms1 += ' pro kraje ';

                var seznkraje = '';

                for (var t = 0; t < jevKrajeList.length; t++) {
                    seznkraje += KRAJE_KODY[jevKrajeList[t]] + ', ';
                }
                seznkraje = seznkraje.substring(0, seznkraje.length-2);
                resultText += seznkraje;
                sms1 += seznkraje;

                if (detailni) {
                    jevStarty = Math.min.apply(null, jevStart);
                    jevZacatek = jevStarty.toString();

                    jevEndy = Math.max.apply(null, jevEnd);
                    jevKonec = jevEndy.toString();

                    zahajeni = ZobrazDatumSMS(jevZacatek);
                    ukonceni = ZobrazDatumSMS(jevKonec, 1);

                    resultText += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                    sms1 += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += oddelovac;
                    sms1 += oddelovac;
                }
            } else {
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
        if (omezitNaKraj == -1) {
            vystupText += 'Podrobnosti: http://bit.ly/2Sb0ItG' + oddelovac;
        }
    }
    vystupText = vystupText.substring(0, vystupText.length - oddelovac.length);
}

resultText = '';
zacatky = [];
konce = [];

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info) {
    var ref_infoList = [];
    for (var l = 0; l < ref_vystraha.info.length; l++) {
        ref_infoList.push(ref_vystraha.info[l]);
    }

    ref_infoList = ref_infoList.sort(function (a, b) {
        var start1 = parseFloat(Normalize(a.dc_zacatek));
        var start2 = parseFloat(Normalize(b.dc_zacatek));

        if (start1 < start2) return -1;
        if (start1 > start2) return 1;
        return 0;
    });

    ref_infoList = ref_infoList.sort(function (a, b) {
        var jev1 = a.stupen_kod;
        var jev2 = b.stupen_kod;

        if (jev1 < jev2) return -1;
        if (jev1 > jev2) return 1;
        return 0;
    });
}

if (ref_infoList) {
    var poleJevy2 = [];
    for (var i = 0; i < ref_infoList.length; i++) {
        if (ref_infoList[i].stupen_kod != 'OUTLOOK' && !UkoncenyJev(ref_infoList[i].dc_konec, vystraha.dc_odeslano)) { 
            var pomKod2 = '';
            if (ref_infoList[i].jistota_kod == 'Observed') {
                pomKod2 += '0';
            }
            pomKod2 += ref_infoList[i].stupen_kod;
            poleJevy2.push(pomKod2);
        }
    }

    poleJevy2 = removeDuplicates(poleJevy2);

    poleJevy2 = poleJevy2.sort(function (a, b) {
        if (a < b) return -1;
        if (a > b) return 1;
        return 0;
    });

    for (var h = 0; h < poleJevy2.length; h++) {
        var jevStart = [];
        var jevEnd = [];
        var jevKrajeList2 = [];
        for (var i = 0; i < ref_infoList.length; i++) {
            var pomKod2Ivnj = '';
            if (ref_infoList[i].jistota_kod == 'Observed') {
                pomKod2Ivnj = '0';
            }
            if (poleJevy2[h] == pomKod2Ivnj + ref_infoList[i].stupen_kod) {
                var found = omezitNaKraj == -1;
                for (var j = 0; j < ref_infoList[i].kraj.length && !found; j++) {
                    found = ref_infoList[i].kraj[j].UID == omezitNaKraj;
                }
                for (var j = 0; j < ref_infoList[i].kraj.length; j++) {
                    if (found) {
                        jevKrajeList2.push(ref_infoList[i].kraj[j].UID);

                        var nyni = Zaokrouhli(vystraha.dc_odeslano);
                        var zacatek = Normalize(ref_infoList[i].dc_zacatek);
                        if (zacatek < nyni) {
                            zacatky.push(nyni);
                            jevStart.push(nyni);
                        } else {
                            zacatky.push(zacatek);
                            jevStart.push(zacatek);
                        }
                        konec = 99999999999999;
                        if (ref_infoList[i].dc_konec) {
                            konec = Normalize(ref_vystraha.info[i].dc_konec);
                        }
                        konce.push(konec);
                        jevEnd.push(konec);
                    }
                }
            }
        }
        jevKrajeList2 = removeDuplicates(jevKrajeList2);
        jevKrajeList2 = jevKrajeList2.sort(function (a, b) {
            return a-b;
        });

        if (jevKrajeList2.length > 0) {
            if (omezitNaKraj == -1) {
                resultText += JEVY_NAZVY[poleJevy2[h]];
                sms2 += JEVY_NAZVY[poleJevy2[h]];
                resultText += ' pro kraje ';
                sms2 += ' pro kraje ';

                var seznkraje = '';

                for (var t = 0; t < jevKrajeList2.length; t++) {
                    seznkraje += KRAJE_KODY[jevKrajeList2[t]] + ', ';
                }
                seznkraje = seznkraje.substring(0, seznkraje.length-2);
                resultText += seznkraje;
                sms2 += seznkraje;
                if (detailni) {
                    jevStarty = Math.min.apply(null, jevStart);
                    jevZacatek = jevStarty.toString();

                    jevEndy = Math.max.apply(null, jevEnd);
                    jevKonec = jevEndy.toString();

                    zahajeni = ZobrazDatumSMS(jevZacatek);
                    ukonceni = ZobrazDatumSMS(jevKonec, 1);

                    resultText += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                    sms2 += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += oddelovac;
                    sms2 = oddelovac;
                }
            } else {
                if (detailni) {
                    jevStarty = Math.min.apply(null, jevStart);
                    jevZacatek = jevStarty.toString();

                    jevEndy = Math.max.apply(null, jevEnd);
                    jevKonec = jevEndy.toString();

                    zahajeni = ZobrazDatumSMS(jevZacatek);
                    ukonceni = ZobrazDatumSMS(jevKonec, 1);

                    resultText += JEVY_NAZVY[poleJevy2[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                    sms2 += JEVY_NAZVY[poleJevy2[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += JEVY_NAZVY[poleJevy2[h]] + oddelovac;
                    sms2 = JEVY_NAZVY[poleJevy2[h]] + oddelovac;
                }
            }
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
