// Verze 54

var omezitNaKraj = -1;
var detailni = 1;
var oddelovac = '\n';



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

                    var zahajeni = ZobrazDatum(jevZacatek);
                    var ukonceni = ZobrazDatum(jevKonec, 1);

                    resultText += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                    sms1 += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += oddelovac;
                    sms1 += oddelovac;
                }
            } else {
                if (detailni) {
                    var jevStarty = Math.min.apply(null, jevStart);
                    var jevZacatek = jevStarty.toString();

                    var jevEndy = Math.max.apply(null, jevEnd);
                    var jevKonec = jevEndy.toString();

                    var zahajeni = ZobrazDatum(jevZacatek);
                    var ukonceni = ZobrazDatum(jevKonec, 1);

                    resultText += JEVY_NAZVY[poleJevy[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                    sms1 += JEVY_NAZVY[poleJevy[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += JEVY_NAZVY[poleJevy[h]] + oddelovac;
                    sms1 += JEVY_NAZVY[poleJevy[h]] + oddelovac;
                }
            }
        }
    }

    var starty = Math.min.apply(null, zacatky);
    var start = starty.toString();

    var endy = Math.max.apply(null, konce);
    var end = endy.toString();

    var total_zahajeni = ZobrazDatum(start);
    var total_ukonceni = ZobrazDatum(end, 1);

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


vystupText += '\n\n1: ' + sms1 + '\n2: ' + sms2; 

return vystupText;