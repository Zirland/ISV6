// Verze 73

var omezitNaKraj = -1;
var detailni = 1;
var vypisOrp = false;
var oddelovac = '\n';

var KRAJE_NAZVY = {
    '-1': 'Česká republika',
    '19': 'Hlavní město Praha',
    '27': 'Středočeský kraj',
    '35': 'Jihočeský kraj',
    '43': 'Plzeňský kraj',
    '51': 'Karlovarský kraj',
    '60': 'Ústecký kraj',
    '78': 'Liberecký kraj',
    '86': 'Královéhradecký kraj',
    '94': 'Pardubický kraj',
    '108': 'Kraj Vysočina',
    '116': 'Jihomoravský kraj',
    '124': 'Olomoucký kraj',
    '132': 'Moravskoslezský kraj',
    '141': 'Zlínský kraj',
};

var KRAJE_KODY = {
    '-1': 'ČR',
    '19': 'PHA',
    '27': 'SČK',
    '35': 'JČK',
    '43': 'PLK',
    '51': 'KVK',
    '60': 'ULK',
    '78': 'LIK',
    '86': 'KHK',
    '94': 'PAK',
    '108': 'VYK',
    '116': 'JMK',
    '124': 'OLK',
    '132': 'MSK',
    '141': 'ZLK',
};

var JEVY_SKUPINY = {
    'I': 'Maximální a minimální teploty',
    'II': 'Pokles teplot pod nulu',
    'III': 'Vítr',
    'IV': 'Sněhová pokrývka',
    'V': 'Sněhové srážky',
    'VI': 'Sněhové jevy',
    'VII': 'Náledí',
    'VIII': 'Ledovka',
    'IX': 'Námrazové jevy',
    'X': 'Bouřkové jevy',
    'XI': 'Dešťové srážky',
    'XII': 'Povodňové jevy',
    'XIII': 'Dotok',
    'XIV': 'Požáry',
    'XV': 'Jiné jevy',
    'OUTLOOK': 'Výhled jevů',
    'O3': 'Přízemní ozón',
    'NO2': 'Oxid dusičitý',
    'SO2': 'Oxid siřičitý',
    'PM10': 'Prachové částice',
};

function Normalize(datum) {
    if (!datum) {
        datum = '1.1.2100 01:00:00';
    }
    var datumString = new Date(datum);

    var datumDen = datumString.getDate();
    if (datumDen < 10) {
        datumDen = '0' + datumDen;
    }
    var datumMesic = datumString.getMonth() + 1;
    if (datumMesic < 10) {
        datumMesic = '0' + datumMesic;
    }
    var datumRok = datumString.getFullYear();
    var datumHodiny = datumString.getHours();
    if (datumHodiny < 10) {
        datumHodiny = '0' + datumHodiny;
    }
    var datumMinuty = datumString.getMinutes();
    if (datumMinuty < 10) {
        datumMinuty = '0' + datumMinuty;
    }
    var datumSekundy = datumString.getSeconds();
    if (datumSekundy < 10) {
        datumSekundy = '0' + datumSekundy;
    }

    datum =
        datumRok.toString() +
        datumMesic.toString() +
        datumDen.toString() +
        datumHodiny.toString() +
        datumMinuty.toString() +
        datumSekundy.toString();

    return datum;
}

function UkoncenyJev(konecJev, casZprava) {
    if (!konecJev) {
        konecJev = '1.1.2100 01:00:00';
    }

    var konecJev_format = Normalize(konecJev);
    var casZprava_format = Normalize(casZprava);

    var kjYear = konecJev_format.substring(0, 4);
    var kjMonth = konecJev_format.substring(4, 6);
    var kjDay = konecJev_format.substring(6, 8);
    var kjHour = konecJev_format.substring(8, 10);
    var kjMinute = konecJev_format.substring(10, 12);
    var kjSecond = konecJev_format.substring(12, 14);
    var myEndTime = new Date(
        kjYear,
        kjMonth - 1,
        kjDay,
        kjHour,
        kjMinute,
        kjSecond
    );

    myEndTime.setMinutes(myEndTime.getMinutes() - 30);
    konecJev_format = Normalize(myEndTime);

    var konecJev_format_num = Number(konecJev_format);
    var casZprava_format_num = Number(casZprava_format);

    if (konecJev_format_num < casZprava_format_num) {
        return true;
    } else {
        return false;
    }
}

function ZobrazDatum(datum, end) {
    var format_datum = '';
    if (datum == 21000101010000) {
        format_datum = 'odvolání';
    } else {
        var normDatum = datum.toString();

        var normDatumRok = normDatum.substring(0, 4);
        var normDatumMesic = normDatum.substring(4, 6);
        var normDatumDen = normDatum.substring(6, 8);
        var normDatumHodina = normDatum.substring(8, 10);
        var normDatumMinuta = normDatum.substring(10, 12);

        if (normDatumHodina == '00' && normDatumMinuta == '00' && end) {
            var myNewDay = new Date(
                normDatumRok,
                normDatumMesic - 1,
                normDatumDen - 1
            );
            var newNormDatum = Normalize(myNewDay);
            normDatumRok = newNormDatum.substring(0, 4);
            normDatumMesic = newNormDatum.substring(4, 6);
            normDatumDen = newNormDatum.substring(6, 8);
            normDatumHodina = '24';
        }

        format_datum =
            Number(normDatumDen) +
            '.' +
            Number(normDatumMesic) +
            '. ' +
            normDatumHodina +
            ':' +
            normDatumMinuta;
    }

    return format_datum;
}

function removeDuplicates(arr) {
    var unique_array = [];
    for (var i = 0; i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i]);
        }
    }
    return unique_array;
}

var zacatky2 = [];
var konce2 = [];
var sms2 = '';

if (typeof ref_vystraha !== 'undefined' && ref_vystraha.info) {
    var ref_infoList = [];
    for (var l = 0; l < ref_vystraha.info.length; l++) {
        ref_infoList.push(ref_vystraha.info[l]);
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
        }
    }

    poleJevy2 = removeDuplicates(poleJevy2);

    for (var h = 0; h < poleJevy2.length; h++) {
        var jevStart2 = [];
        var jevEnd2 = [];
        var jevKrajeList2 = [];
        var jevOrpList2 = [];
        for (var i = 0; i < ref_infoList.length; i++) {
            var pomKodIvnj2 = '';
            if (ref_infoList[i].jistota_kod == 'Observed') {
                pomKodIvnj2 = '0';
            }

            var splitkodJev2 = ref_infoList[i].stupen_kod.split('.');
            var skupinaJev2 = splitkodJev2[0];
            if (
                skupinaJev2 == 'WARN' ||
                skupinaJev2 == 'REG' ||
                skupinaJev2 == 'SMOGSIT'
            ) {
                skupinaJev2 = splitkodJev2[1];
            }

            if (poleJevy2[h] == pomKodIvnj2 + skupinaJev2) {
                var found = omezitNaKraj == -1;
                for (
                    var j = 0;
                    j < ref_infoList[i].kraj.length && !found;
                    j++
                ) {
                    found = ref_infoList[i].kraj[j].UID == omezitNaKraj;
                }
                for (var j = 0; j < ref_infoList[i].kraj.length; j++) {
                    if (found) {
                        jevKrajeList2.push(ref_infoList[i].kraj[j].UID);

                        var OrpList2 = ref_infoList[i].orp_list;
                        var OrpListArr2 = OrpList2.toString().split(',');
                        for (var k = 0; k < OrpListArr2.length; k++) {
                            var OrpListSplit2 = OrpListArr2[k].split('[')[0];
                            for (var l = 0; l < orp.length; l++) {
                                if (
                                    OrpListSplit2 == orp[l].id &&
                                    orp[l].kraj.id == omezitNaKraj
                                ) {
                                    jevOrpList2.push(orp[l].nazev);
                                }
                            }
                        }

                        var nyni = Normalize(vystraha.dc_odeslano);
                        var zacatek2 = Normalize(ref_infoList[i].dc_zacatek);
                        if (zacatek2 < nyni) {
                            zacatky2.push(0);
                            jevStart2.push(0);
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
            return a - b;
        });
        jevOrpList2 = removeDuplicates(jevOrpList2);
        jevOrpList2 = jevOrpList2.sort(function (a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });

        if (jevKrajeList2.length > 0) {
            if (omezitNaKraj == -1) {
                sms2 += JEVY_SKUPINY[poleJevy2[h]];
                sms2 += ' pro kraje ';

                var seznkraje2 = '';

                for (var t = 0; t < jevKrajeList2.length; t++) {
                    seznkraje2 += KRAJE_KODY[jevKrajeList2[t]] + ', ';
                }
                seznkraje2 = seznkraje2.substring(0, seznkraje2.length - 2);
                sms2 += seznkraje2;

                if (detailni) {
                    var jevStarty2 = Math.min.apply(null, jevStart2);
                    var jevZacatek2 = jevStarty2.toString();

                    var jevEndy2 = Math.max.apply(null, jevEnd2);
                    var jevKonec2 = jevEndy2.toString();

                    var zahajeni2 = ZobrazDatum(jevZacatek2);
                    var ukonceni2 = ZobrazDatum(jevKonec2, 1);

                    sms2 += ' od ' + zahajeni2 + ' do ' + ukonceni2 + oddelovac;
                } else {
                    sms2 += oddelovac;
                }
            } else {
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

                    var zahajeni2 = ZobrazDatum(jevZacatek2);
                    var ukonceni2 = ZobrazDatum(jevKonec2, 1);

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

    var total_zahajeni2 = ZobrazDatum(start2);
    var total_ukonceni2 = ZobrazDatum(end2, 1);

    if (start2 == 'Infinity' && poleJevy2 && poleJevy2.length > 0) {
        sms2 +=
            'Informace ČHMÚ: byla ukončena platnost vydané výstrahy.' +
            oddelovac;
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
var zacatkytxt = [];
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
        }
    }

    poleJevy = removeDuplicates(poleJevy);

    for (var h = 0; h < poleJevy.length; h++) {
        var jevStart = [];
        var jevStarttxt = [];
        var jevEnd = [];
        var jevKrajeList = [];
        var jevOrpList = [];
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
                var found = omezitNaKraj == -1;
                for (var j = 0; j < infoList[i].kraj.length && !found; j++) {
                    found = infoList[i].kraj[j].UID == omezitNaKraj;
                }
                for (var j = 0; j < infoList[i].kraj.length; j++) {
                    if (found) {
                        jevKrajeList.push(infoList[i].kraj[j].UID);

                        var OrpList = infoList[i].orp_list;
                        var OrpListArr = OrpList.toString().split(',');
                        for (var k = 0; k < OrpListArr.length; k++) {
                            var OrpListSplit = OrpListArr[k].split('[')[0];
                            for (var l = 0; l < orp.length; l++) {
                                if (
                                    OrpListSplit == orp[l].id &&
                                    orp[l].kraj.id == omezitNaKraj
                                ) {
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
                        if (zacatek < nyni) {
                            jevStart.push(0);
                            zacatky.push(0);
                        } else {
                            jevStart.push(zacatek);
                            zacatky.push(zacatek);
                        }
                        zacatkytxt.push(zacatek);
                        jevStarttxt.push(zacatek);

                        var konec = Normalize(infoList[i].dc_konec);
                        konce.push(konec);
                        jevEnd.push(konec);
                    }
                }
            }
        }
        jevKrajeList = removeDuplicates(jevKrajeList);
        jevKrajeList = jevKrajeList.sort(function (a, b) {
            return a - b;
        });
        jevOrpList = removeDuplicates(jevOrpList);
        jevOrpList = jevOrpList.sort(function (a, b) {
            if (a < b) return -1;
            if (a > b) return 1;
            return 0;
        });

        if (jevKrajeList.length > 0) {
            if (omezitNaKraj == -1) {
                resultText += JEVY_SKUPINY[poleJevy[h]];
                sms1 += JEVY_SKUPINY[poleJevy[h]];
                resultText += ' pro kraje ';
                sms1 += ' pro kraje ';

                var seznkraje = '';

                for (var t = 0; t < jevKrajeList.length; t++) {
                    seznkraje += KRAJE_KODY[jevKrajeList[t]] + ', ';
                }
                seznkraje = seznkraje.substring(0, seznkraje.length - 2);
                resultText += seznkraje;
                sms1 += seznkraje;

                if (detailni) {
                    var jevStarty = Math.min.apply(null, jevStart);
                    var jevZacatek = jevStarty.toString();

                    var jevStartytxt = Math.min.apply(null, jevStarttxt);
                    var jevZacatektxt = jevStartytxt.toString();

                    var jevEndy = Math.max.apply(null, jevEnd);
                    var jevKonec = jevEndy.toString();

                    var zahajeni = ZobrazDatum(jevZacatek);
                    var zahajenitxt = ZobrazDatum(jevZacatektxt);
                    var ukonceni = ZobrazDatum(jevKonec, 1);

                    resultText +=
                        ' od ' + zahajenitxt + ' do ' + ukonceni + oddelovac;
                    sms1 += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += oddelovac;
                    sms1 += oddelovac;
                }
            } else {
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

                    var jevStartytxt = Math.min.apply(null, jevStarttxt);
                    var jevZacatektxt = jevStartytxt.toString();

                    var jevEndy = Math.max.apply(null, jevEnd);
                    var jevKonec = jevEndy.toString();

                    var zahajeni = ZobrazDatum(jevZacatek);
                    var zahajenitxt = ZobrazDatum(jevZacatektxt);
                    var ukonceni = ZobrazDatum(jevKonec, 1);

                    resultText +=
                        ' od ' + zahajenitxt + ' do ' + ukonceni + oddelovac;
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

    var startytxt = Math.min.apply(null, zacatkytxt);
    var starttxt = startytxt.toString();

    var endy = Math.max.apply(null, konce);
    var end = endy.toString();

    var total_zahajeni = ZobrazDatum(start);
    var total_zahajenitxt = ZobrazDatum(starttxt);
    var total_ukonceni = ZobrazDatum(end, 1);

    var rezim = 'SVRS';
    if (seznjevu.indexOf('SIVS') > -1) {
        rezim = 'SIVS';
    }
    if (seznjevu.indexOf('HPPS') > -1) {
        rezim = 'HPPS';
    }

    if (start == 'Infinity' && poleJevy2 && poleJevy2.length > 0) {
        vystupText +=
            'Informace ČHMÚ: byla ukončena platnost vydané výstrahy.' +
            oddelovac;
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
                total_zahajenitxt +
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
        if (omezitNaKraj == -1) {
            vystupText += 'Podrobnosti: http://bit.ly/3uEnMUV' + oddelovac;
        }
    }
    vystupText = vystupText.substring(0, vystupText.length - oddelovac.length);
}

if (sms1 == sms2) {
    vystupText = '';
}

return vystupText;
