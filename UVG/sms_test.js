// Verze 54

var omezitNaKraj = 141;
var detailni = 1;
var oddelovac = '\n';

var KRAJE_NAZVY = {
    "-1": "Česká republika",
    "19": "Hlavní město Praha",
    "27": "Středočeský kraj",
    "35": "Jihočeský kraj",
    "43": "Plzeňský kraj",
    "51": "Karlovarský kraj",
    "60": "Ústecký kraj",
    "78": "Liberecký kraj",
    "86": "Královéhradecký kraj",
    "94": "Pardubický kraj",
    "108": "Kraj Vysočina",
    "116": "Jihomoravský kraj",
    "124": "Olomoucký kraj",
    "132": "Moravskoslezský kraj",
    "141": "Zlínský kraj"
};

var KRAJE_KODY  = { "19": "PHA", "27": "SČK", "35": "JČK", "43": "PLK", "51": "KVK", "60": "ULK", "78": "LIK", "86": "KHK", "94": "PAK", "108": "VYK", "116": "JMK", "124": "OLK", "132": "MSK", "141": "ZLK" };

var JEVY_NAZVY = {
    "I.1" : "Vysoké teploty",
    "0I.1" : "VÝSKYT Vysoké teploty",
    "I.2" : "Velmi vysoké teploty",
    "0I.2" : "VÝSKYT Velmi vysoké teploty",
    "I.3" : "Extrémně vysoké teploty",
    "0I.3" : "VÝSKYT Extrémně vysoké teploty",
    "I.4" : "Silný mráz",
    "0I.4" : "VÝSKYT Silný mráz",
    "I.5" : "Velmi silný mráz",
    "0I.5" : "VÝSKYT Velmi silný mráz",
    "I.6" : "Extrémní mráz",
    "0I.6" : "VÝSKYT Extrémní mráz",
    "II.1" : "Mráz ve vegetačním období",
    "0II.1" : "VÝSKYT Mráz ve vegetačním období",
    "II.2" : "Prudký pokles teploty",
    "0II.2" : "VÝSKYT Prudký pokles teploty",
    "III.1" : "Silný vítr",
    "0III.1" : "VÝSKYT Silný vítr",
    "III.2" : "Velmi silný vítr",
    "0III.2" : "VÝSKYT Velmi silný vítr",
    "III.3" : "Extrémně silný vítr",
    "0III.3" : "VÝSKYT Extrémně silný vítr",
    "IV.1" : "Nová sněhová pokrývka",
    "0IV.1" : "VÝSKYT Nová sněhová pokrývka",
    "IV.2" : "Vysoká nová sněhová pokrývka",
    "0IV.2" : "VÝSKYT Vysoká nová sněhová pokrývka",
    "IV.3" : "Extrémní sněhová pokrývka",
    "0IV.3" : "VÝSKYT Extrémní sněhová pokrývka",
    "IV.4" : "Vysoká celková sněhová pokrývka",
    "0IV.4" : "VÝSKYT Vysoká celková sněhová pokrývka",
    "V.1" : "Silné sněžení",
    "0V.1" : "VÝSKYT Silné sněžení",
    "V.2" : "Extrémně silné sněžení",
    "0V.2" : "VÝSKYT Extrémně silné sněžení",
    "VI.1" : "Sněhové jazyky",
    "0VI.1" : "VÝSKYT Sněhové jazyky",
    "VI.2" : "Závěje",
    "0VI.2" : "VÝSKYT Závěje",
    "VI.3" : "Sněhová bouře",
    "0VI.3" : "VÝSKYT Sněhová bouře",
    "VII.1" : "Náledí",
    "0VII.1" : "VÝSKYT Náledí",
    "VIII.1" : "Ledovka",
    "0VIII.1" : "VÝSKYT Ledovka",
    "VIII.2" : "Silná ledovka",
    "0VIII.2" : "VÝSKYT Silná ledovka",
    "VIII.3" : "Velmi silná ledovka",
    "0VIII.3" : "VÝSKYT Velmi silná ledovka",
    "IX.1" : "Mrznoucí mlhy",
    "0IX.1" : "VÝSKYT Mrznoucí mlhy",
    "IX.2" : "Silná námraza ",
    "0IX.2" : "VÝSKYT Silná námraza ",
    "X.1" : "Silné bouřky",
    "0X.1" : "VÝSKYT Silné bouřky",
    "X.2" : "Velmi silné bouřky",
    "0X.2" : "VÝSKYT Velmi silné bouřky",
    "X.2a" : "Velmi silné bouřky s přívalovými srážkami",
    "0X.2a" : "VÝSKYT Velmi silné bouřky s přívalovými srážkami",
    "X.3" : "Extrémně silné bouřky",
    "0X.3" : "VÝSKYT Extrémně silné bouřky",
    "X.3a" : "Extrémně silné bouřky s přívalovými srážkami",
    "0X.3a" : "VÝSKYT Extrémně silné bouřky s přívalovými srážkami",
    "XI.1" : "Vydatný déšť",
    "0XI.1" : "VÝSKYT Vydatný déšť",
    "XI.2" : "Velmi vydatný déšť",
    "0XI.2" : "VÝSKYT Velmi vydatný déšť",
    "XI.3" : "Extrémní srážky",
    "0XI.3" : "VÝSKYT Extrémní srážky",
    "XII.1" : "Povodňová bdělost",
    "0XII.1" : "VÝSKYT Povodňová bdělost",
    "XII.2" : "Povodňová pohotovost",
    "0XII.2" : "VÝSKYT Povodňová pohotovost",
    "XII.3" : "Povodňové ohrožení",
    "0XII.3" : "VÝSKYT Povodňové ohrožení",
    "XII.4" : "Extrémní povodňové ohrožení",
    "0XII.4" : "VÝSKYT Extrémní povodňové ohrožení",
    "XIII.1" : "Povodňová bdělost (dotok)",
    "0XIII.1" : "VÝSKYT Povodňová bdělost (dotok)",
    "XIII.2" : "Povodňová pohotovost (dotok)",
    "0XIII.2" : "VÝSKYT Povodňová pohotovost (dotok)",
    "XIII.3" : "Povodňové ohrožení (dotok)",
    "0XIII.3" : "VÝSKYT Povodňové ohrožení (dotok)",
    "XIII.4" : "Extrémní povodňové ohrožení (dotok)",
    "0XIII.4" : "VÝSKYT Extrémní povodňové ohrožení (dotok)",
    "XIV.1" : "Nebezpečí požárů",
    "0XIV.1" : "VÝSKYT Nebezpečí požárů",
    "XIV.2" : "Vysoké nebezpečí požárů",
    "0XIV.2" : "VÝSKYT Vysoké nebezpečí požárů",
    "XV.1" : "Jiný jev",
    "0XV.1" : "VÝSKYT Jiný jev",
    "XV.2" : "Jiný jev",
    "0XV.2" : "VÝSKYT Jiný jev",
    "XV.3" : "Jiný jev",
    "0XV.3" : "VÝSKYT Jiný jev",
    "OUTLOOK" : "Výhled nebezpečných jevů",
    "0OUTLOOK" : "Výhled nebezpečných jevů",
    "SMOGSIT.O3" : "Smogová situace O3",
    "0SMOGSIT.O3" : "Smogová situace O3",
    "WARN.O3" : "Varování O3",
    "0WARN.O3" : "Varování O3",
    "SMOGSIT.PM10" : "Smogová situace PM10",
    "0SMOGSIT.PM10" : "Smogová situace PM10",
    "REG.PM10" : "Regulace PM10",
    "0REG.PM10" : "Regulace PM10",
    "SMOGSIT.SO2" : "Smogová situace SO2",
    "0SMOGSIT.SO2" : "Smogová situace SO2",
    "REG.SO2" : "Regulace SO2",
    "0REG.SO2" : "Regulace SO2",
    "SMOGSIT.NO2" : "Smogová situace NO2",
    "0SMOGSIT.NO2" : "Smogová situace NO2",
    "REG.NO2" : "Regulace NO2",
    "0REG.NO2" : "Regulace NO2"
};

function Normalize(datum) {
    if (!datum) {
        datum = '1.1.2100 01:00:00';
    }
    var datumString = new Date(datum);

    datumDen = datumString.getDate();
    if (datumDen < 10) {
        datumDen = '0' + datumDen;
    }
    datumMesic = datumString.getMonth() + 1;
    if (datumMesic < 10) {
        datumMesic = '0' + datumMesic;
    }
    datumRok = datumString.getFullYear();
    datumHodiny = datumString.getHours();
    if (datumHodiny < 10) {
        datumHodiny = '0' + datumHodiny;
    }
    datumMinuty = datumString.getMinutes();
    if (datumMinuty < 10) {
        datumMinuty = '0' + datumMinuty;
    }
    datumSekundy = datumString.getSeconds();
    if (datumSekundy < 10) {
        datumSekundy = '0' + datumSekundy;
    }

    datum = datumRok.toString() +  datumMesic.toString() + datumDen.toString() + datumHodiny.toString() + datumMinuty.toString() + datumSekundy.toString();

    return datum;
}

function ZobrazDatum(datum, end) {
    if (datum == 21000101010000) {
        format_datum = 'odvolání';
    } else {
        var normDatum = datum.toString();

        var normDatumRok = normDatum.substring(0,4);
        var normDatumMesic = normDatum.substring(4,6);
        var normDatumDen = normDatum.substring(6,8);
        var normDatumHodina = normDatum.substring(8,10);
        var normDatumMinuta = normDatum.substring(10,12);
        var normDatumSekunda = normDatum.substring(12,14);

        if (normDatumHodina == '00' && normDatumMinuta == '00' && end) {
            var myNewDay = new Date(normDatumRok, normDatumMesic-1, normDatumDen-1);
            var newNormDatum = Normalize(myNewDay);
            normDatumRok = newNormDatum.substring(0,4);
            normDatumMesic = newNormDatum.substring(4,6);
            normDatumDen = newNormDatum.substring(6,8);
            normDatumHodina = '24';
        }

        format_datum = Number(normDatumDen) + '.' + Number(normDatumMesic) + '. ' + normDatumHodina + ':' + normDatumMinuta;
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