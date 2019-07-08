// Verze 57

#import "CHMU-CISELNIK";
#import "CHMU-DATUMY";

function removeDuplicates(arr) {
    var unique_array = [];
    for (var i = 0;i < arr.length; i++) {
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

    infoList = infoList.sort(function (a, b) {
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
            pomKod += infoList[i].stupen_kod;
            poleJevy.push(pomKod);
        }
    }

    poleJevy = removeDuplicates(poleJevy);

    for (var h = 0; h < poleJevy.length; h++) {
        var jevStart = [];
        var jevEnd = [];
        var jevKrajeList = [];
        var jevOrpList = [];
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

                        var OrpList = infoList[i].orp_list;
                        var OrpListArr = OrpList.split(',');
                        for (var k = 0; k < OrpListArr.length; k++) {
                            for (var l = 0; l < orp.length; l++) {
                                if (OrpListArr[k] == orp[l].id && orp[l].kraj.id == omezitNaKraj) {
                                    jevOrpList.push(orp[l].nazev);
                                }
                            }
                        }

                        var warn_type = 'SVRS';
                        if (infoList[i].SIVS == '1') {
                            warn_type = 'SIVS';
                        }
                        if (infoList[i].HPPS == '1') {
                            warn_type = 'HPPS';
                        }
                        seznjevu.push(warn_type);
                        var zacatek = Normalize(infoList[i].dc_zacatek);
                        zacatky.push(zacatek);
                        var konec = Normalize(infoList[i].dc_konec);
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
        jevOrpList = removeDuplicates(jevOrpList);
        jevOrpList = jevOrpList.sort(function (a, b) {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
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
            } else {
                resultText += JEVY_NAZVY[poleJevy[h]];
                sms1 += JEVY_NAZVY[poleJevy[h]];
                if (vypisOrp) {
                    resultText += ' pro ORP ';
                    sms1 += ' pro ORP ';

                    var seznOrp = '';

                    for (var t = 0; t < jevOrpList.length; t++) {
                        seznOrp += jevOrpList[t] + ', ';
                    }
                    seznOrp = seznOrp.substring(0, seznOrp.length-2);
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
        vystupText += 'Informace ČHMÚ: není v platnosti žádná výstraha.' + oddelovac;
        sms1 += vystupText;
    } else {
        switch (vystraha.ucel) {
            case 'Exercise' :
                var uvod = 'Cvičná zpráva ';
            break;
            case 'System' :
                var uvod = 'Systémová zpráva ';
            break;
            case 'Test' :
                var uvod = 'Testovací zpráva ';
            break;
            default : 
                var uvod = 'Výstraha ';
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

var zacatky2 = [];
var konce2 = [];
var sms2 = '';

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info) {
    var ref_infoList = [];
    for (var l = 0; l < ref_vystraha.info.length; l++) {
        ref_infoList.push(ref_vystraha.info[l]);
    }

    ref_infoList = ref_infoList.sort(function (a, b) {
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

    for (var h = 0; h < poleJevy2.length; h++) {
        var jevStart2 = [];
        var jevEnd2 = [];
        var jevKrajeList2 = [];
        var jevOrpList2 = [];
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

                        var OrpList2 = ref_infoList[i].orp_list;
                        var OrpListArr2 = OrpList2.split(',');
                        for (var k = 0; k < OrpListArr2.length; k++) {
                            for (var l = 0; l < orp.length; l++) {
                                if (OrpListArr2[k] == orp[l].id && orp[l].kraj.id == omezitNaKraj) {
                                    jevOrpList2.push(orp[l].nazev);
                                }
                            }
                        }

                        var nyni = Zaokrouhli(vystraha.dc_odeslano);
                        var zacatek2 = Normalize(ref_infoList[i].dc_zacatek);
                        if (zacatek2 < nyni) {
                            zacatky2.push(nyni);
                            jevStart2.push(nyni);
                        } else {
                            zacatky2.push(zacatek2);
                            jevStart2.push(zacatek2);
                        }
                        var konec2 = Normalize(ref_infoList[i].dc_konec);
                        konce2.push(konec2);
                        jevEnd2.push(konec2);
                    }
                }
            }
        }
        jevKrajeList2 = removeDuplicates(jevKrajeList2);
        jevKrajeList2 = jevKrajeList2.sort(function (a, b) {
            return a-b;
        });
        jevOrpList2 = removeDuplicates(jevOrpList2);
        jevOrpList2 = jevOrpList2.sort(function (a, b) {
            if (a < b)
                return -1;
            if (a > b)
                return 1;
            return 0;
        });

        if (jevKrajeList2.length > 0) {
            if (omezitNaKraj == -1) {
                sms2 += JEVY_NAZVY[poleJevy2[h]];
                sms2 += ' pro kraje ';

                var seznkraje2 = '';

                for (var t = 0; t < jevKrajeList2.length; t++) {
                    seznkraje2 += KRAJE_KODY[jevKrajeList2[t]] + ', ';
                }
                seznkraje2 = seznkraje2.substring(0, seznkraje2.length-2);
                sms2 += seznkraje2;

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
            } else {
                sms2 += JEVY_NAZVY[poleJevy2[h]];
                if (vypisOrp) {
                    sms2 += ' pro ORP ';

                    var seznOrp2 = '';

                    for (var t = 0; t < jevOrpList2.length; t++) {
                        seznOrp2 += jevOrpList2[t] + ', ';
                    }
                    seznOrp2 = seznOrp2.substring(0, seznOrp2.length-2);
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
            sms2 += 'Platnost od ' + total_zahajeni2 + ' do ' + total_ukonceni2 + oddelovac;
        }
    }
}

if (sms1 == sms2) {
    vystupText = '';
}
