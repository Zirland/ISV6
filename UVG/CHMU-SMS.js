// Verze 37

var omezitNaKraj = -1;
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

var zacatky = [];
var konce = [];
var seznjevu = [];

var KRAJE_KODY  = { "19": "PHA", "27": "SČK", "35": "JČK", "43": "PLK", "51": "KVK", "60": "ULK", "78": "LIK", "86": "KHK", "94": "PAK", "108": "VYK", "116": "JMK", "124": "OLK", "132": "MSK", "141": "ZLK" };

var JEVY_NAZVY = {
    "I.1" : "Vysoké teploty",
    "PI.1" : "VÝSKYT Vysoké teploty",
    "I.2" : "Velmi vysoké teploty",
    "PI.2" : "VÝSKYT Velmi vysoké teploty",
    "I.3" : "Extrémně vysoké teploty",
    "PI.3" : "VÝSKYT Extrémně vysoké teploty",
    "I.4" : "Silný mráz",
    "PI.4" : "VÝSKYT Silný mráz",
    "I.5" : "Velmi silný mráz",
    "PI.5" : "VÝSKYT Velmi silný mráz",
    "I.6" : "Extrémní mráz",
    "PI.6" : "VÝSKYT Extrémní mráz",
    "II.1" : "Mráz ve vegetačním období",
    "PII.1" : "VÝSKYT Mráz ve vegetačním období",
    "II.2" : "Prudký pokles teploty",
    "PII.2" : "VÝSKYT Prudký pokles teploty",
    "III.1" : "Silný vítr",
    "PIII.1" : "VÝSKYT Silný vítr",
    "III.2" : "Velmi silný vítr",
    "PIII.2" : "VÝSKYT Velmi silný vítr",
    "III.3" : "Extrémně silný vítr",
    "PIII.3" : "VÝSKYT Extrémně silný vítr",
    "IV.1" : "Nová sněhová pokrývka",
    "PIV.1" : "VÝSKYT Nová sněhová pokrývka",
    "IV.2" : "Vysoká nová sněhová pokrývka",
    "PIV.2" : "VÝSKYT Vysoká nová sněhová pokrývka",
    "IV.3" : "Extrémní sněhová pokrývka",
    "PIV.3" : "VÝSKYT Extrémní sněhová pokrývka",
    "IV.4" : "Vysoká celková sněhová pokrývka",
    "PIV.4" : "VÝSKYT Vysoká celková sněhová pokrývka",
    "V.1" : "Silné sněžení",
    "PV.1" : "VÝSKYT Silné sněžení",
    "V.2" : "Extrémně silné sněžení",
    "PV.2" : "VÝSKYT Extrémně silné sněžení",
    "VI.1" : "Sněhové jazyky",
    "PVI.1" : "VÝSKYT Sněhové jazyky",
    "VI.2" : "Závěje",
    "PVI.2" : "VÝSKYT Závěje",
    "VI.3" : "Sněhová bouře",
    "PVI.3" : "VÝSKYT Sněhová bouře",
    "VII.1" : "Náledí",
    "PVII.1" : "VÝSKYT Náledí",
    "VIII.1" : "Ledovka",
    "PVIII.1" : "VÝSKYT Ledovka",
    "VIII.2" : "Silná ledovka",
    "PVIII.2" : "VÝSKYT Silná ledovka",
    "VIII.3" : "Velmi silná ledovka",
    "PVIII.3" : "VÝSKYT Velmi silná ledovka",
    "IX.1" : "Mrznoucí mlhy",
    "PIX.1" : "VÝSKYT Mrznoucí mlhy",
    "IX.2" : "Silná námraza ",
    "PIX.2" : "VÝSKYT Silná námraza ",
    "X.1" : "Silné bouřky",
    "PX.1" : "VÝSKYT Silné bouřky",
    "X.2" : "Velmi silné bouřky",
    "PX.2" : "VÝSKYT Velmi silné bouřky",
    "X.2a" : "Velmi silné bouřky s přívalovými srážkami",
    "PX.2a" : "VÝSKYT Velmi silné bouřky s přívalovými srážkami",
    "X.3" : "Extrémně silné bouřky",
    "PX.3" : "VÝSKYT Extrémně silné bouřky",
    "X.3a" : "Extrémně silné bouřky s přívalovými srážkami",
    "PX.3a" : "VÝSKYT Extrémně silné bouřky s přívalovými srážkami",
    "XI.1" : "Vydatný déšť",
    "PXI.1" : "VÝSKYT Vydatný déšť",
    "XI.2" : "Velmi vydatný déšť",
    "PXI.2" : "VÝSKYT Velmi vydatný déšť",
    "XI.3" : "Extrémní srážky",
    "PXI.3" : "VÝSKYT Extrémní srážky",
    "XII.1" : "Povodňová bdělost",
    "PXII.1" : "VÝSKYT Povodňová bdělost",
    "XII.2" : "Povodňová pohotovost",
    "PXII.2" : "VÝSKYT Povodňová pohotovost",
    "XII.3" : "Povodňové ohrožení",
    "PXII.3" : "VÝSKYT Povodňové ohrožení",
    "XII.4" : "Extrémní povodňové ohrožení",
    "PXII.4" : "VÝSKYT Extrémní povodňové ohrožení",
    "XIII.1" : "Povodňová bdělost (dotok)",
    "PXIII.1" : "VÝSKYT Povodňová bdělost (dotok)",
    "XIII.2" : "Povodňová pohotovost (dotok)",
    "PXIII.2" : "VÝSKYT Povodňová pohotovost (dotok)",
    "XIII.3" : "Povodňové ohrožení (dotok)",
    "PXIII.3" : "VÝSKYT Povodňové ohrožení (dotok)",
    "XIII.4" : "Extrémní povodňové ohrožení (dotok)",
    "PXIII.4" : "VÝSKYT Extrémní povodňové ohrožení (dotok)",
    "XIV.1" : "Nebezpečí požárů",
    "PXIV.1" : "VÝSKYT Nebezpečí požárů",
    "XIV.2" : "Vysoké nebezpečí požárů",
    "PXIV.2" : "VÝSKYT Vysoké nebezpečí požárů",
    "XV.1" : "Jiný jev",
    "PXV.1" : "VÝSKYT Jiný jev",
    "XV.2" : "Jiný jev",
    "PXV.2" : "VÝSKYT Jiný jev",
    "XV.3" : "Jiný jev",
    "PXV.3" : "VÝSKYT Jiný jev",
    "OUTLOOK" : "Výhled nebezpečných jevů",
    "POUTLOOK" : "Výhled nebezpečných jevů",
    "SMOGSIT.O3" : "Smogová situace O3",
    "PSMOGSIT.O3" : "Smogová situace O3",
    "WARN.O3" : "Varování O3",
    "PWARN.O3" : "Varování O3",
    "SMOGSIT.PM10" : "Smogová situace PM10",
    "PSMOGSIT.PM10" : "Smogová situace PM10",
    "REG.PM10" : "Regulace PM10",
    "PREG.PM10" : "Regulace PM10",
    "SMOGSIT.SO2" : "Smogová situace SO2",
    "PSMOGSIT.SO2" : "Smogová situace SO2",
    "REG.SO2" : "Regulace SO2",
    "PREG.SO2" : "Regulace SO2",
    "SMOGSIT.NO2" : "Smogová situace NO2",
    "PSMOGSIT.NO2" : "Smogová situace NO2",
    "REG.NO2" : "Regulace NO2",
    "PREG.NO2" : "Regulace NO2",
};

// Odstranění duplicitních výskytů kódů jevů
function removeDuplicates(arr) {
    var unique_array = []
    for (var i = 0;i < arr.length; i++) {
        if (unique_array.indexOf(arr[i]) == -1) {
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

// Úprava formátu data
function Normalize(datum) {
    var datumString = datum.toString();
    datumDen = datumString.substring(0,2);
    datumDen_porovn = datumDen.replace(/\.$/, '');
    if (datumDen == datumDen_porovn) {
        datumMesic = datumString.substring(3,5);
        datumMesic_porovn = datumMesic.replace(/\.$/, '');
        if (datumMesic == datumMesic_porovn) {
            datumRok = datumString.substring(6,10)
            datumCas = datumString.substring(11,16);
            datumCas = datumCas.replace(/\:$/, '');
        } else {
            datumMesic = '0' + datumMesic_porovn;
            datumRok = datumString.substring(5,9)
            datumCas = datumString.substring(10,15);
            datumCas = datumCas.replace(/\:$/, '');
        }
    } else {
        datumDen = '0' + datumDen_porovn;
        datumMesic = datumString.substring(2,4);
        datumMesic_porovn = datumMesic.replace(/\.$/, '');
        if (datumMesic == datumMesic_porovn) {
            datumRok = datumString.substring(5,9)
            datumCas = datumString.substring(10,15);
            datumCas = datumCas.replace(/\:$/, '');
        } else {
            datumMesic = '0' + datumMesic_porovn;
            datumRok = datumString.substring(4,8)
            datumCas = datumString.substring(9,14);
            datumCas = datumCas.replace(/\:$/, '');
        }
    }

    datumHodiny = datumCas.substring(0,2);
    datumHodiny_porovn = datumHodiny.replace(/\:$/, '');
    if (datumHodiny == datumHodiny_porovn) {
        datumMinuty = datumCas.substring(3,5);
    } else {
        datumHodiny = '0' + datumHodiny_porovn;
        datumMinuty = datumCas.substring(2,4);
    }

    datum = datumRok + datumMesic + datumDen + datumHodiny + datumMinuty;

    return datum;
}

function UkoncenyJev(konecJev, casZprava) {
    if (!konecJev) {
        konecJev = '1.1.2100 01:00';
    }

    var konecJev_format = Normalize(konecJev);
    var casZprava_format = Normalize(casZprava);

    var kjYear = konecJev_format.substring(0,4);
    var kjMonth = konecJev_format.substring(4,6);
    var kjDay = konecJev_format.substring(6,8);
    var kjHour = konecJev_format.substring(8,10);
    var kjMinute = konecJev_format.substring(10,12);
    var myEndTime = new Date(kjYear, kjMonth-1, kjDay, kjHour, kjMinute);

    myEndTime.setMinutes(myEndTime.getMinutes() - 30);
    konecJev_format = Normalize(myEndTime);

    konecJev_format_num = Number(konecJev_format);
    casZprava_format_num = Number(casZprava_format);

    output = konecJev_format_num + '<' + casZprava_format_num;

    if (konecJev_format_num < casZprava_format_num) {
        return true;
    } else {
        return false;
    }
}

function ZobrazDatum(datum, end) {
    if (datum == 999999999999) {
        format_datum = 'odvolání';
    } else {
        var normDatum = datum.toString();

        var normDatumRok = normDatum.substring(0,4);
        var normDatumMesic = normDatum.substring(4,6);
        var normDatumDen = normDatum.substring(6,8);
        var normDatumHodina = normDatum.substring(8,10);
        var normDatumMinuta = normDatum.substring(10,12);

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

var resultText = vystupText = '';
var sms1 = sms2 = '';

if (vystraha.info) {
    var poleJevy = [];
    // Naplníme si seznam kódů jevů z výstrahy
    for (var i = 0; i < vystraha.info.length; i++) {
        // Z výpisu vyloučíme jevy Výhled nebezpečných jevů
        if (vystraha.info[i].stupen_kod != 'OUTLOOK') { 
            var pomKod = '';
            if (vystraha.info[i].jistota_kod == 'Observed') {
                pomKod += 'P';
            }
            pomKod += vystraha.info[i].stupen_kod;
            poleJevy.push(pomKod);
        }
    }

    // Promažeme duplicity
    poleJevy = removeDuplicates(poleJevy);

    // Vezmeme kód jevu a najdeme si všechny časové období v tomto kraji.
    for (var h = 0; h < poleJevy.length; h++) {
        var jevStart = jevEnd = [];
        var jevKrajeList = [];
        for (var i = 0; i < vystraha.info.length; i++) {
            var pomKodIvnj = '';
            if (vystraha.info[i].jistota_kod == 'Observed') {
                pomKodIvnj = 'P';
            }
            if (poleJevy[h] == pomKodIvnj + vystraha.info[i].stupen_kod) {
                var found = omezitNaKraj == -1;
                for (var j = 0; j < vystraha.info[i].kraj.length && !found; j++) {
                    found = vystraha.info[i].kraj[j].UID == omezitNaKraj;
                }
                for (var j = 0; j < vystraha.info[i].kraj.length; j++) {
                    if (found) {
                        // Pokud jsme našli výskyt jevu v kraji, připíšeme kraj do seznamu
                        jevKrajeList.push(vystraha.info[i].kraj[j].UID);
                        warn_type = 'SVRS';
                        if (vystraha.info[i].SIVS == '1') {
                            warn_type = 'SIVS';
                        }
                        if (vystraha.info[i].HPPS == '1') {
                            warn_type = 'HPPS';
                        }
                        seznjevu.push(warn_type);
                        zacatek = Normalize(vystraha.info[i].dc_zacatek);
                        zacatky.push(zacatek);
                        konec = 999999999999;
                        if (vystraha.info[i].dc_konec) {
                            konec = Normalize(vystraha.info[i].dc_konec);
                        }
                        konce.push(konec);

                        jevStart.push(zacatek);
                        jevEnd.push(konec);
                    }
                }
            }
        }
        // Vymažeme duplicity, kdy je v jednom kraji jev opakovaně a následně kraje seřadíme
        jevKrajeList = removeDuplicates(jevKrajeList);
        jevKrajeList = jevKrajeList.sort(function (a, b) {
            return a-b;
        });

        // Pokud máme ve zvoleném kraji výstrahu, přípravíme tělo se seznamem jevů, případně seznamem krajů a detailní platností
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

                    zahajeni = ZobrazDatum(jevZacatek);
                    ukonceni = ZobrazDatum(jevKonec, 1);

                    resultText += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                    sms1 += ' do ' + ukonceni + oddelovac;
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

                    zahajeni = ZobrazDatum(jevZacatek);
                    ukonceni = ZobrazDatum(jevKonec, 1);

                    resultText += JEVY_NAZVY[poleJevy[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                    sms1 += JEVY_NAZVY[poleJevy[h]] + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += JEVY_NAZVY[poleJevy[h]] + oddelovac;
                    sms1 = JEVY_NAZVY[poleJevy[h]] + oddelovac;
                }
            }
        }
    }

    // Vypočítáme celkovou dobu platnosti výstrahy
    starty = Math.min.apply(null, zacatky);
    start = starty.toString();

    endy = Math.max.apply(null, konce);
    end = endy.toString();

    total_zahajeni = ZobrazDatum(start);
    total_ukonceni = ZobrazDatum(end, 1);

    // Sestavíme hlavičku zprávy
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
        }

        var poradi_zpravy = vystraha.id.substring(vystraha.id.length - 6);
        uvod += 'č. ' + Number(poradi_zpravy) + ': ';
        vystupText += uvod;

        // Připojíme připravený výpis jevů
        vystupText += resultText;

        // Doplníme o celkovou platnost (celostátní a souhrnná sestava) a na GŘ také odkaz na OPIN WOCZ59
        if (!detailni) {
            vystupText += 'Platnost od ' + total_zahajeni + ' do ' + total_ukonceni + oddelovac;
            sms1 += 'Platnost do ' + total_ukonceni + oddelovac;
        }
        if (omezitNaKraj == -1) {
            vystupText += 'Podrobnosti: http://bit.ly/2Sb0ItG' + oddelovac;
        }
    }
    vystupText = vystupText.substring(0, vystupText.length - oddelovac.length);
}

resultText = '';
zacatky = konce = [];

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info) {
    var poleJevy2 = [];
    // Naplníme si seznam kódů jevů z výstrahy
    for (var i = 0; i < ref_vystraha.info.length; i++) {
        // Z výpisu vyloučíme jevy Výhled nebezpečných jevů a vypršelé jevy
        if (ref_vystraha.info[i].stupen_kod != 'OUTLOOK' && !UkoncenyJev(ref_vystraha.info[i].dc_konec, vystraha.dc_odeslano)) { 
            var pomKod2 = '';
            if (ref_vystraha.info[i].jistota_kod == 'Observed') {
                pomKod2 += 'P';
            }
            pomKod2 += ref_vystraha.info[i].stupen_kod;
            poleJevy2.push(pomKod2);
        }
    }

    // Promažeme duplicity
    poleJevy2 = removeDuplicates(poleJevy2);

    // Vezmeme kód jevu a najdeme si všechny časové období v tomto kraji.
    for (var h = 0; h < poleJevy2.length; h++) {
        var jevStart = jevEnd = [];
        var jevKrajeList2 = [];
        for (var i = 0; i < ref_vystraha.info.length; i++) {
            var pomKod2Ivnj = '';
            if (ref_vystraha.info[i].jistota_kod == 'Observed') {
                pomKod2Ivnj = 'P';
            }
            if (poleJevy2[h] == pomKod2Ivnj + ref_vystraha.info[i].stupen_kod) {
                var found = omezitNaKraj == -1;
                for (var j = 0; j < ref_vystraha.info[i].kraj.length && !found; j++) {
                    found = ref_vystraha.info[i].kraj[j].UID == omezitNaKraj;
                }
                for (var j = 0; j < ref_vystraha.info[i].kraj.length; j++) {
                    if (found) {
                        // Pokud jsme našli výskyt jevu v kraji, připíšeme kraj do seznamu
                        jevKrajeList2.push(ref_vystraha.info[i].kraj[j].UID);
                        zacatek = Normalize(ref_vystraha.info[i].dc_zacatek);
                        zacatky.push(zacatek);
                        konec = 999999999999;
                        if (ref_vystraha.info[i].dc_konec) {
                            konec = Normalize(ref_vystraha.info[i].dc_konec);
                        }
                        konce.push(konec);

                        jevStart.push(zacatek);
                        jevEnd.push(konec);
                    }
                }
            }
        }
        // Vymažeme duplicity, kdy je v jednom kraji jev opakovaně a následně kraje seřadíme
        jevKrajeList2 = removeDuplicates(jevKrajeList2);
        jevKrajeList2 = jevKrajeList2.sort(function (a, b) {
            return a-b;
        });

        // Pokud máme ve zvoleném kraji výstrahu, přípravíme tělo se seznamem jevů, případně seznamem krajů a detailní platností
        if (jevKrajeList2.length > 0) {
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

                    zahajeni = ZobrazDatum(jevZacatek);
                    ukonceni = ZobrazDatum(jevKonec, 1);

                    resultText += JEVY_NAZVY[poleJevy[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                    sms2 += JEVY_NAZVY[poleJevy[h]] + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += JEVY_NAZVY[poleJevy[h]] + oddelovac;
                    sms2 = JEVY_NAZVY[poleJevy[h]] + oddelovac;
                }
            }
        }
    }

    // Vypočítáme celkovou dobu platnosti výstrahy
    starty = Math.min.apply(null, zacatky);
    start = starty.toString();

    endy = Math.max.apply(null, konce);
    end = endy.toString();

    total_zahajeni = ZobrazDatum(start);
    total_ukonceni = ZobrazDatum(end, 1);

    if (start == 'Infinity') {
        sms2 += 'Informace ČHMÚ: není v platnosti žádná výstraha.' + oddelovac;
    } else {
        // Doplníme o celkovou platnost (celostátní a souhrnná sestava) a na GŘ také odkaz na OPIN WOCZ59
        if (!detailni) {
            sms2 += 'Platnost do ' + total_ukonceni + oddelovac;
        }
    }
}

if (sms1 == sms2) {
    vystupText = '';
}

return vystupText;
