// Verze 76

var omezitNaKraj = 78;

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
    '141': 'Zlínský kraj',
    '132': 'Moravskoslezský kraj'
};

var JEVY_NAZVY = {
    'I.1': 'Vysoké teploty',
    '0I.1': 'VÝSKYT Vysoké teploty',
    'I.2': 'Velmi vysoké teploty',
    '0I.2': 'VÝSKYT Velmi vysoké teploty',
    'I.3': 'Extrémně vysoké teploty',
    '0I.3': 'VÝSKYT Extrémně vysoké teploty',
    'I.4': 'Silný mráz',
    '0I.4': 'VÝSKYT Silný mráz',
    'I.5': 'Velmi silný mráz',
    '0I.5': 'VÝSKYT Velmi silný mráz',
    'I.6': 'Extrémní mráz',
    '0I.6': 'VÝSKYT Extrémní mráz',
    'II.1': 'Mráz ve vegetačním období',
    '0II.1': 'VÝSKYT Mráz ve vegetačním období',
    'II.2': 'Prudký pokles teploty',
    '0II.2': 'VÝSKYT Prudký pokles teploty',
    'III.1': 'Silný vítr',
    '0III.1': 'VÝSKYT Silný vítr',
    'III.2': 'Velmi silný vítr',
    '0III.2': 'VÝSKYT Velmi silný vítr',
    'III.3': 'Extrémně silný vítr',
    '0III.3': 'VÝSKYT Extrémně silný vítr',
    'IV.1': 'Nová sněhová pokrývka',
    '0IV.1': 'VÝSKYT Nová sněhová pokrývka',
    'IV.2': 'Vysoká nová sněhová pokrývka',
    '0IV.2': 'VÝSKYT Vysoká nová sněhová pokrývka',
    'IV.3': 'Extrémní sněhová pokrývka',
    '0IV.3': 'VÝSKYT Extrémní sněhová pokrývka',
    'IV.4': 'Vysoká celková sněhová pokrývka',
    '0IV.4': 'VÝSKYT Vysoká celková sněhová pokrývka',
    'V.1': 'Silné sněžení',
    '0V.1': 'VÝSKYT Silné sněžení',
    'V.2': 'Extrémně silné sněžení',
    '0V.2': 'VÝSKYT Extrémně silné sněžení',
    'VI.1': 'Sněhové jazyky',
    '0VI.1': 'VÝSKYT Sněhové jazyky',
    'VI.2': 'Závěje',
    '0VI.2': 'VÝSKYT Závěje',
    'VI.3': 'Sněhová bouře',
    '0VI.3': 'VÝSKYT Sněhová bouře',
    'VII.1': 'Náledí',
    '0VII.1': 'VÝSKYT Náledí',
    'VIII.1': 'Ledovka',
    '0VIII.1': 'VÝSKYT Ledovka',
    'VIII.2': 'Silná ledovka',
    '0VIII.2': 'VÝSKYT Silná ledovka',
    'VIII.3': 'Velmi silná ledovka',
    '0VIII.3': 'VÝSKYT Velmi silná ledovka',
    'IX.1': 'Mrznoucí mlhy',
    '0IX.1': 'VÝSKYT Mrznoucí mlhy',
    'IX.2': 'Silná námraza ',
    '0IX.2': 'VÝSKYT Silná námraza ',
    'X.1': 'Silné bouřky',
    '0X.1': 'VÝSKYT Silné bouřky',
    'X.2': 'Velmi silné bouřky',
    '0X.2': 'VÝSKYT Velmi silné bouřky',
    'X.2a': 'Velmi silné bouřky s přívalovými srážkami',
    '0X.2a': 'VÝSKYT Velmi silné bouřky s přívalovými srážkami',
    'X.3': 'Extrémně silné bouřky',
    '0X.3': 'VÝSKYT Extrémně silné bouřky',
    'X.3a': 'Extrémně silné bouřky s přívalovými srážkami',
    '0X.3a': 'VÝSKYT Extrémně silné bouřky s přívalovými srážkami',
    'XI.1': 'Vydatný déšť',
    '0XI.1': 'VÝSKYT Vydatný déšť',
    'XI.2': 'Velmi vydatný déšť',
    '0XI.2': 'VÝSKYT Velmi vydatný déšť',
    'XI.3': 'Extrémní srážky',
    '0XI.3': 'VÝSKYT Extrémní srážky',
    'XII.1': 'Povodňová bdělost',
    '0XII.1': 'VÝSKYT Povodňová bdělost',
    'XII.2': 'Povodňová pohotovost',
    '0XII.2': 'VÝSKYT Povodňová pohotovost',
    'XII.3': 'Povodňové ohrožení',
    '0XII.3': 'VÝSKYT Povodňové ohrožení',
    'XII.4': 'Extrémní povodňové ohrožení',
    '0XII.4': 'VÝSKYT Extrémní povodňové ohrožení',
    'XIII.1': 'Povodňová bdělost (dotok)',
    '0XIII.1': 'VÝSKYT Povodňová bdělost (dotok)',
    'XIII.2': 'Povodňová pohotovost (dotok)',
    '0XIII.2': 'VÝSKYT Povodňová pohotovost (dotok)',
    'XIII.3': 'Povodňové ohrožení (dotok)',
    '0XIII.3': 'VÝSKYT Povodňové ohrožení (dotok)',
    'XIII.4': 'Extrémní povodňové ohrožení (dotok)',
    '0XIII.4': 'VÝSKYT Extrémní povodňové ohrožení (dotok)',
    'XIV.1': 'Nebezpečí požárů',
    '0XIV.1': 'VÝSKYT Nebezpečí požárů',
    'XIV.2': 'Vysoké nebezpečí požárů',
    '0XIV.2': 'VÝSKYT Vysoké nebezpečí požárů',
    'XV.1': 'Jiný jev',
    '0XV.1': 'VÝSKYT Jiný jev',
    'XV.2': 'Jiný jev',
    '0XV.2': 'VÝSKYT Jiný jev',
    'XV.3': 'Jiný jev',
    '0XV.3': 'VÝSKYT Jiný jev',
    'OUTLOOK': 'Výhled nebezpečných jevů',
    '0OUTLOOK': 'Výhled nebezpečných jevů',
    'SMOGSIT.O3': 'Smogová situace O3',
    '0SMOGSIT.O3': 'Smogová situace O3',
    'WARN.O3': 'Varování O3',
    '0WARN.O3': 'Varování O3',
    'SMOGSIT.PM10': 'Smogová situace PM10',
    '0SMOGSIT.PM10': 'Smogová situace PM10',
    'REG.PM10': 'Regulace PM10',
    '0REG.PM10': 'Regulace PM10',
    'SMOGSIT.SO2': 'Smogová situace SO2',
    '0SMOGSIT.SO2': 'Smogová situace SO2',
    'REG.SO2': 'Regulace SO2',
    '0REG.SO2': 'Regulace SO2',
    'SMOGSIT.NO2': 'Smogová situace NO2',
    '0SMOGSIT.NO2': 'Smogová situace NO2',
    'REG.NO2': 'Regulace NO2',
    '0REG.NO2': 'Regulace NO2',
};

var JEVY_SKUPINY = {
    I: 'Extrémní teploty',
    II: 'Pokles teplot pod nulu',
    III: 'Vítr',
    IV: 'Sněhová pokrývka',
    V: 'Sněhové srážky',
    VI: 'Sněhové jevy',
    VII: 'Náledí',
    VIII: 'Ledovka',
    IX: 'Námrazové jevy',
    X: 'Bouřkové jevy',
    XI: 'Dešťové srážky',
    XII: 'Povodňové jevy',
    XIII: 'Dotok',
    XIV: 'Požáry',
    XV: 'Jiné jevy',
    OUTLOOK: 'Výhled jevů',
    O3: 'Přízemní ozón',
    NO2: 'Oxid dusičitý',
    SO2: 'Oxid siřičitý',
    PM10: 'Prachové částice',
};

function SimpleHighlightDiff(newValue, oldValue) {
    var resultText = '';
    var zmena = 0;
    var newText = newValue ? newValue.toString() : '';
    var oldText = oldValue ? oldValue.toString() : '';

    if (oldText != newText) {
        zmena = 1;
    }

    resultText = resultText + '|' + zmena;
    return resultText;
}

function HighlightDiff(newValue, oldValue) {
    var resultText = '';
    var zmena = 0;

    var newValueSplit = newValue != undefined ? newValue.split(' ') : [];
    var oldValueSplit = oldValue != undefined ? oldValue.split(' ') : [];

    if (newValueSplit.length == 0 || oldValueSplit.length == 0) {
        resultText = '';
    } else {
        var matrix = GetLCSLength(newValueSplit, oldValueSplit);

        var i = newValueSplit.length;
        var j = oldValueSplit.length;

        var changeList = [];

        while (i > 0 && j > 0) {
            if (newValueSplit[i - 1] == oldValueSplit[j - 1]) {
                var changeValue = {};
                changeValue.text = newValueSplit[i - 1];
                changeValue.change = 0;

                changeList.push(changeValue);

                i--;
                j--;
            } else if (matrix[i][j - 1] > matrix[i - 1][j]) {
                var changeValue = {};
                changeValue.text = oldValueSplit[j - 1];
                changeValue.change = -1;

                changeList.push(changeValue);

                j--;
            } else {
                var changeValue = {};
                changeValue.text = newValueSplit[i - 1];
                changeValue.change = 1;

                changeList.push(changeValue);

                i--;
            }
        }

        while (i > 0) {
            var changeValue = {};
            changeValue.text = newValueSplit[i - 1];
            changeValue.change = 1;

            changeList.push(changeValue);

            i--;
        }

        while (j > 0) {
            var changeValue = {};
            changeValue.text = oldValueSplit[j - 1];
            changeValue.change = -1;

            changeList.push(changeValue);

            j--;
        }

        var lastChange = 0;

        for (var index = changeList.length; index > 0; index--) {
            if (lastChange != changeList[index - 1].change) {
                lastChange = changeList[index - 1].change;

                if (lastChange == 1) {
                    zmena = 1;
                } else if (lastChange == -1) {
                    zmena = 1;
                }
            }
        }

        resultText = resultText + '|' + zmena;
    }

    return resultText;
}

function GetLCSLength(newValueSplit, oldValueSplit) {
    var matrix = new Array(newValueSplit.length + 1);

    for (var i = 0; i < newValueSplit.length + 1; i++) {
        matrix[i] = new Array(oldValueSplit.length + 1);

        for (var j = 0; j < oldValueSplit.length + 1; j++) {
            matrix[i][j] = 0;
        }
    }

    for (var i = 1; i < newValueSplit.length + 1; i++) {
        for (var j = 1; j < oldValueSplit.length + 1; j++) {
            if (newValueSplit[i - 1] == oldValueSplit[j - 1]) {
                matrix[i][j] = matrix[i - 1][j - 1] + 1;
            } else {
                matrix[i][j] = Math.max(matrix[i][j - 1], matrix[i - 1][j]);
            }
        }
    }

    return matrix;
}

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

function ZobrazDatum(datum, format, end) {
    var normDatum = Normalize(datum);
    var format_datum = '';
    if (normDatum == 21000101010000 || normDatum == 'NaNNaNNaNNaNNaNNaN') {
        format_datum = 'do odvolání';
    } else {
        var normDatumRok = normDatum.substring(0, 4);
        var normDatumMesic = normDatum.substring(4, 6);
        var normDatumDen = normDatum.substring(6, 8);
        var normDatumHodina = normDatum.substring(8, 10);
        var normDatumMinuta = normDatum.substring(10, 12);
        var normDatumSekunda = normDatum.substring(12, 14);

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

        switch (format) {
            case 'short':
                format_datum =
                    Number(normDatumDen) +
                    '.' +
                    Number(normDatumMesic) +
                    '. ' +
                    normDatumHodina +
                    ':' +
                    normDatumMinuta;
                break;
            case 'long':
            default:
                format_datum =
                    Number(normDatumDen) +
                    '.' +
                    Number(normDatumMesic) +
                    '.' +
                    normDatumRok +
                    ' ' +
                    normDatumHodina +
                    ':' +
                    normDatumMinuta +
                    ':' +
                    normDatumSekunda;
                break;
        }
    }

    return format_datum;
}

function PrepareInfo(orp, vystraha) {
    var infoList = [];

    for (var i = 0; i < vystraha.info.length; i++) {
        var vyskaList = [];
        vystraha.info[i].orp = [];
        vystraha.info[i].vyska = '';
        vystraha.info[i].krajPom = false;
        vystraha.info[i].okresPom = false;
        var orpSplit = vystraha.info[i].orp_list.toString().split(',');

        for (var j = 0; j < orpSplit.length; j++) {
            var index = orpSplit[j].indexOf('[');
            if (index == -1) {
                vystraha.info[i].orp.push(orpSplit[j]);
            } else {
                var vyska = orpSplit[j].substring(index);
                if (vyskaList.indexOf(vyska) == -1) {
                    vyskaList.push(vyska);
                }
            }
        }

        if (vystraha.info[i].orp.length > 0) {
            infoList.push(vystraha.info[i]);
        }

        for (var v = 0; v < vyskaList.length; v++) {
            var info = JSON.parse(JSON.stringify(vystraha.info[i]));
            info.orp = [];
            info.vyska = vyskaList[v];

            info.dc_konec = new Date(info.dc_konec);
            info.dc_zacatek = new Date(info.dc_zacatek);

            for (var j = 0; j < orpSplit.length; j++) {
                if (orpSplit[j].indexOf(vyskaList[v]) != -1) {
                    var index = orpSplit[j].indexOf('[');
                    info.orp.push(orpSplit[j].substring(0, index));
                }
            }

            infoList.push(info);
        }
    }

    var infoListFilter = [];
    for (var x = 0; x < infoList.length; x++) {
        var podminka = true;
        podminka =
            infoList[x].jev_kod != 'OUTLOOK' &&
            !UkoncenyJev(infoList[x].dc_konec, vytvoreni);

        if (podminka) {
            infoListFilter.push(infoList[x]);
        }
    }

    infoList = infoListFilter;

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

    var krajList = [];
    var posledniKraj = {};
    var posledniOkres = {};
    var posledniOrp = {};
    var krajChange = true;
    var okresChange = true;

    for (var i = 0; i < orp.length; i++) {
        if (posledniKraj.id != orp[i].kraj.id) {
            for (var j = 0; j < infoList.length; j++) {
                if (posledniKraj.info && infoList[j].krajPom) {
                    posledniKraj.info.push(infoList[j]);
                }
            }

            posledniKraj = {};
            posledniKraj.id = orp[i].kraj.id;
            posledniKraj.nazev = orp[i].kraj.nazev;
            posledniKraj.zkratka = orp[i].kraj.zkratka;
            posledniKraj.info = [];
            posledniKraj.okresList = [];

            krajList.push(posledniKraj);
            krajChange = true;
        } else {
            krajChange = false;
        }

        if (posledniOkres.id != orp[i].okres.id) {
            for (var j = 0; j < infoList.length; j++) {
                if (posledniOkres.info && infoList[j].okresPom) {
                    posledniOkres.info.push(infoList[j]);
                }
            }

            posledniOkres = {};
            posledniOkres.id = orp[i].okres.id;
            posledniOkres.nazev = orp[i].okres.nazev;
            posledniOkres.zkratka = orp[i].okres.zkratka;
            posledniOkres.info = [];
            posledniOkres.orpList = [];

            posledniKraj.okresList.push(posledniOkres);
            okresChange = true;
        } else {
            okresChange = false;
        }

        posledniOrp = {};
        posledniOrp.id = orp[i].id;
        posledniOrp.nazev = orp[i].nazev;
        posledniOrp.info = [];

        posledniOkres.orpList.push(posledniOrp);

        for (var j = 0; j < infoList.length; j++) {
            var maOrp = infoList[j].orp.indexOf(orp[i].id.toString()) != -1;

            if (posledniOrp.info && maOrp) {
                posledniOrp.info.push(infoList[j]);
            }

            if (krajChange) {
                infoList[j].krajPom = maOrp;
            } else {
                infoList[j].krajPom &= maOrp;
            }

            if (okresChange) {
                infoList[j].okresPom = maOrp;
            } else {
                infoList[j].okresPom &= maOrp;
            }
        }
    }

    for (var j = 0; j < infoList.length; j++) {
        if (infoList[j].krajPom) {
            posledniKraj.info.push(infoList[j]);
        }
    }

    for (var j = 0; j < infoList.length; j++) {
        if (infoList[j].okresPom) {
            posledniOkres.info.push(infoList[j]);
        }
    }

    return krajList;
}

function PrintInfoList(krajList, ref_krajList, headers) {
    var resultText = '';
    var zpracovanyInfoStupen = [];
    var zpracovanyInfoStupenOkres = [];
    var ref_zpracovanyInfoStupen = [];
    var ref_zpracovanyInfoStupenOkres = [];
    var info;
    var ref_info;
    var found = false;
    var first = true;
    var zmen = 0;
    var pomoc = '';

    for (var k = 0; k < krajList.length; k++) {
        zpracovanyInfoStupen = [];
        ref_zpracovanyInfoStupen = [];
        first = true;
        var opakovanyKraj = [];
        var opakovanyOkres = [];
        var opakovanyOrp = [];

        if (ref_krajList.length > 0) {
            for (var ri = 0; ri < ref_krajList[k].info.length; ri++) {
                ref_info = ref_krajList[k].info[ri];
                found = false;

                for (var i = 0; i < krajList[k].info.length; i++) {
                    if (krajList[k].info[i].jev_kod == ref_info.jev_kod) {
                        found = true;
                        break;
                    }
                }

                if (!found) {
                    if (first) {
                        first = false;
                    }

                    ref_zpracovanyInfoStupen.push(
                        ref_info.jev_kod +
                        (ref_info.vyska ? ref_info.vyska : '[]') +
                        ref_info.dc_zacatek +
                        '-' +
                        ref_info.dc_konec
                    );
                    pomoc = PrintInfo(null, ref_info);
                    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                }
            }
        }

        for (var i = 0; i < krajList[k].info.length; i++) {
            info = krajList[k].info[i];
            zpracovanyInfoStupen.push(
                info.jev_kod +
                (info.vyska ? info.vyska : '[]') +
                info.dc_zacatek +
                '-' +
                info.dc_konec
            );
            ref_info = null;

            if (ref_krajList.length > 0) {
                for (var ri = 0; ri < ref_krajList[k].info.length; ri++) {
                    if (
                        ref_krajList[k].info[ri].jev_kod == info.jev_kod &&
                        opakovanyKraj.indexOf(
                            k.toString() + '-' + ri.toString()
                        ) == -1
                    ) {
                        opakovanyKraj.push(k.toString() + '-' + ri.toString());
                        ref_info = ref_krajList[k].info[ri];
                        ref_zpracovanyInfoStupen.push(
                            ref_info.jev_kod +
                            (ref_info.vyska ? ref_info.vyska : '[]') +
                            ref_info.dc_zacatek +
                            '-' +
                            ref_info.dc_konec
                        );
                        break;
                    }
                }
            }

            if (first) {
                first = false;
            }

            pomoc = PrintInfo(info, ref_info);
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);
        }

        for (var o = 0; o < krajList[k].okresList.length; o++) {
            first = true;
            zpracovanyInfoStupenOkres = [];
            ref_zpracovanyInfoStupenOkres = [];

            if (ref_krajList.length > 0) {
                for (
                    var ri = 0;
                    ri < ref_krajList[k].okresList[o].info.length;
                    ri++
                ) {
                    ref_info = ref_krajList[k].okresList[o].info[ri];
                    found = false;

                    if (
                        ref_zpracovanyInfoStupen.indexOf(
                            ref_info.jev_kod +
                            (ref_info.vyska ? ref_info.vyska : '[]') +
                            ref_info.dc_zacatek +
                            '-' +
                            ref_info.dc_konec
                        ) == -1
                    ) {
                        if (
                            zpracovanyInfoStupen.indexOf(
                                ref_info.jev_kod +
                                (ref_info.vyska ? ref_info.vyska : '[]') +
                                ref_info.dc_zacatek +
                                '-' +
                                ref_info.dc_konec
                            ) == -1
                        ) {
                            for (
                                var i = 0;
                                i < krajList[k].okresList[o].info.length;
                                i++
                            ) {
                                if (
                                    krajList[k].okresList[o].info[i].jev_kod ==
                                    ref_info.jev_kod
                                ) {
                                    found = true;
                                    break;
                                }
                            }
                        }

                        if (!found) {
                            if (first) {
                                first = false;
                            }

                            ref_zpracovanyInfoStupenOkres.push(
                                ref_info.jev_kod +
                                (ref_info.vyska ? ref_info.vyska : '[]') +
                                ref_info.dc_zacatek +
                                '-' +
                                ref_info.dc_konec
                            );
                            pomoc = PrintInfo(null, ref_info);
                            zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                        }
                    }
                }
            }

            for (var i = 0; i < krajList[k].okresList[o].info.length; i++) {
                info = krajList[k].okresList[o].info[i];

                if (
                    zpracovanyInfoStupen.indexOf(
                        info.jev_kod +
                        (info.vyska ? info.vyska : '[]') +
                        info.dc_zacatek +
                        '-' +
                        info.dc_konec
                    ) == -1
                ) {
                    zpracovanyInfoStupenOkres.push(
                        info.jev_kod +
                        (info.vyska ? info.vyska : '[]') +
                        info.dc_zacatek +
                        '-' +
                        info.dc_konec
                    );
                    ref_info = null;

                    if (ref_krajList.length > 0) {
                        if (
                            ref_zpracovanyInfoStupen.indexOf(
                                info.jev_kod +
                                (info.vyska ? info.vyska : '[]') +
                                info.dc_zacatek +
                                '-' +
                                info.dc_konec
                            ) == -1
                        ) {
                            for (
                                var ri = 0;
                                ri < ref_krajList[k].okresList[o].info.length;
                                ri++
                            ) {
                                if (
                                    ref_krajList[k].okresList[o].info[ri]
                                        .jev_kod == info.jev_kod &&
                                    opakovanyOkres.indexOf(
                                        k.toString() +
                                        '-' +
                                        o.toString() +
                                        '-' +
                                        ri.toString()
                                    ) == -1 &&
                                    ref_zpracovanyInfoStupen.indexOf(
                                        ref_krajList[k].okresList[o].info[ri]
                                            .jev_kod +
                                        (ref_krajList[k].okresList[o].info[
                                            ri
                                        ].vyska
                                            ? ref_krajList[k].okresList[o]
                                                .info[ri].vyska
                                            : '[]') +
                                        ref_krajList[k].okresList[o].info[
                                            ri
                                        ].dc_zacatek +
                                        '-' +
                                        ref_krajList[k].okresList[o].info[
                                            ri
                                        ].dc_konec
                                    ) == -1
                                ) {
                                    opakovanyOkres.push(
                                        k.toString() +
                                        '-' +
                                        o.toString() +
                                        '-' +
                                        ri.toString()
                                    );
                                    ref_info =
                                        ref_krajList[k].okresList[o].info[ri];
                                    ref_zpracovanyInfoStupenOkres.push(
                                        ref_info.jev_kod +
                                        (ref_info.vyska
                                            ? ref_info.vyska
                                            : '[]') +
                                        ref_info.dc_zacatek +
                                        '-' +
                                        ref_info.dc_konec
                                    );
                                    break;
                                }
                            }
                        }
                    }

                    if (first) {
                        first = false;
                    }

                    pomoc = PrintInfo(info, ref_info);
                    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                }
            }

            for (
                var ol = 0;
                ol < krajList[k].okresList[o].orpList.length;
                ol++
            ) {
                first = true;

                if (ref_krajList.length > 0) {
                    for (
                        var ri = 0;
                        ri <
                        ref_krajList[k].okresList[o].orpList[ol].info.length;
                        ri++
                    ) {
                        ref_info =
                            ref_krajList[k].okresList[o].orpList[ol].info[ri];
                        found = false;

                        if (
                            ref_zpracovanyInfoStupen.indexOf(
                                ref_info.jev_kod +
                                (ref_info.vyska ? ref_info.vyska : '[]') +
                                ref_info.dc_zacatek +
                                '-' +
                                ref_info.dc_konec
                            ) == -1 &&
                            ref_zpracovanyInfoStupenOkres.indexOf(
                                ref_info.jev_kod +
                                (ref_info.vyska ? ref_info.vyska : '[]') +
                                ref_info.dc_zacatek +
                                '-' +
                                ref_info.dc_konec
                            ) == -1
                        ) {
                            if (
                                zpracovanyInfoStupen.indexOf(
                                    ref_info.jev_kod +
                                    (ref_info.vyska
                                        ? ref_info.vyska
                                        : '[]') +
                                    ref_info.dc_zacatek +
                                    '-' +
                                    ref_info.dc_konec
                                ) == -1 &&
                                zpracovanyInfoStupenOkres.indexOf(
                                    ref_info.jev_kod +
                                    (ref_info.vyska
                                        ? ref_info.vyska
                                        : '[]') +
                                    ref_info.dc_zacatek +
                                    '-' +
                                    ref_info.dc_konec
                                ) == -1
                            ) {
                                for (
                                    var i = 0;
                                    i <
                                    krajList[k].okresList[o].orpList[ol].info
                                        .length;
                                    i++
                                ) {
                                    if (
                                        krajList[k].okresList[o].orpList[ol]
                                            .info[i].jev_kod == ref_info.jev_kod
                                    ) {
                                        found = true;
                                        break;
                                    }
                                }
                            }

                            if (!found) {
                                if (first) {
                                    first = false;
                                }

                                pomoc = PrintInfo(null, ref_info);
                                zmen =
                                    Number(zmen) + Number(pomoc.split('|')[1]);
                            }
                        }
                    }
                }

                for (
                    var i = 0;
                    i < krajList[k].okresList[o].orpList[ol].info.length;
                    i++
                ) {
                    info = krajList[k].okresList[o].orpList[ol].info[i];

                    if (
                        zpracovanyInfoStupen.indexOf(
                            info.jev_kod +
                            (info.vyska ? info.vyska : '[]') +
                            info.dc_zacatek +
                            '-' +
                            info.dc_konec
                        ) == -1 &&
                        zpracovanyInfoStupenOkres.indexOf(
                            info.jev_kod +
                            (info.vyska ? info.vyska : '[]') +
                            info.dc_zacatek +
                            '-' +
                            info.dc_konec
                        ) == -1
                    ) {
                        ref_info = null;

                        if (ref_krajList.length > 0) {
                            if (
                                ref_zpracovanyInfoStupen.indexOf(
                                    info.jev_kod +
                                    (info.vyska ? info.vyska : '[]') +
                                    info.dc_zacatek +
                                    '-' +
                                    info.dc_konec
                                ) == -1 &&
                                ref_zpracovanyInfoStupenOkres.indexOf(
                                    info.jev_kod +
                                    (info.vyska ? info.vyska : '[]') +
                                    info.dc_zacatek +
                                    '-' +
                                    info.dc_konec
                                ) == -1
                            ) {
                                for (
                                    var ri = 0;
                                    ri <
                                    ref_krajList[k].okresList[o].orpList[ol]
                                        .info.length;
                                    ri++
                                ) {
                                    if (
                                        ref_krajList[k].okresList[o].orpList[ol]
                                            .info[ri].jev_kod == info.jev_kod &&
                                        opakovanyOrp.indexOf(
                                            k.toString() +
                                            '-' +
                                            o.toString() +
                                            '-' +
                                            ol.toString() +
                                            '-' +
                                            ri.toString()
                                        ) == -1 &&
                                        ref_zpracovanyInfoStupen.indexOf(
                                            ref_krajList[k].okresList[o]
                                                .orpList[ol].info[ri].jev_kod +
                                            (ref_krajList[k].okresList[o]
                                                .orpList[ol].info[ri].vyska
                                                ? ref_krajList[k].okresList[
                                                    o
                                                ].orpList[ol].info[ri]
                                                    .vyska
                                                : '[]') +
                                            ref_krajList[k].okresList[o]
                                                .orpList[ol].info[ri]
                                                .dc_zacatek +
                                            '-' +
                                            ref_krajList[k].okresList[o]
                                                .orpList[ol].info[ri]
                                                .dc_konec
                                        ) == -1 &&
                                        ref_zpracovanyInfoStupenOkres.indexOf(
                                            ref_krajList[k].okresList[o]
                                                .orpList[ol].info[ri].jev_kod +
                                            (ref_krajList[k].okresList[o]
                                                .orpList[ol].info[ri].vyska
                                                ? ref_krajList[k].okresList[
                                                    o
                                                ].orpList[ol].info[ri]
                                                    .vyska
                                                : '[]') +
                                            ref_krajList[k].okresList[o]
                                                .orpList[ol].info[ri]
                                                .dc_zacatek +
                                            '-' +
                                            ref_krajList[k].okresList[o]
                                                .orpList[ol].info[ri]
                                                .dc_konec
                                        ) == -1
                                    ) {
                                        opakovanyOrp.push(
                                            k.toString() +
                                            '-' +
                                            o.toString() +
                                            '-' +
                                            ol.toString() +
                                            '-' +
                                            ri.toString()
                                        );
                                        ref_info =
                                            ref_krajList[k].okresList[o]
                                                .orpList[ol].info[ri];
                                        break;
                                    }
                                }
                            }
                        }

                        if (first) {
                            first = false;
                        }

                        pomoc = PrintInfo(info, ref_info);
                        zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                    }
                }
            }
        }
    }

    if (krajList.length == 0 && ref_krajList.length > 0) {
        for (var k = 0; k < ref_krajList.length; k++) {
            ref_zpracovanyInfoStupen = [];
            first = true;

            for (var ri = 0; ri < ref_krajList[k].info.length; ri++) {
                ref_info = ref_krajList[k].info[ri];

                if (first) {
                    first = false;
                }

                ref_zpracovanyInfoStupen.push(
                    ref_info.jev_kod +
                    (ref_info.vyska ? ref_info.vyska : '[]') +
                    ref_info.dc_zacatek +
                    '-' +
                    ref_info.dc_konec
                );
                pomoc = PrintInfo(null, ref_info);
                zmen = Number(zmen) + Number(pomoc.split('|')[1]);
            }

            for (var o = 0; o < ref_krajList[k].okresList.length; o++) {
                first = true;
                ref_zpracovanyInfoStupenOkres = [];

                for (
                    var ri = 0;
                    ri < ref_krajList[k].okresList[o].info.length;
                    ri++
                ) {
                    ref_info = ref_krajList[k].okresList[o].info[ri];

                    if (
                        ref_zpracovanyInfoStupen.indexOf(
                            ref_info.jev_kod +
                            (ref_info.vyska ? ref_info.vyska : '[]') +
                            ref_info.dc_zacatek +
                            '-' +
                            ref_info.dc_konec
                        ) == -1
                    ) {
                        if (first) {
                            first = false;
                        }

                        ref_zpracovanyInfoStupenOkres.push(
                            ref_info.jev_kod +
                            (ref_info.vyska ? ref_info.vyska : '[]') +
                            ref_info.dc_zacatek +
                            '-' +
                            ref_info.dc_konec
                        );
                        pomoc = PrintInfo(null, ref_info);
                        zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                    }
                }

                for (
                    var ol = 0;
                    ol < ref_krajList[k].okresList[o].orpList.length;
                    ol++
                ) {
                    first = true;

                    for (
                        var ri = 0;
                        ri <
                        ref_krajList[k].okresList[o].orpList[ol].info.length;
                        ri++
                    ) {
                        ref_info =
                            ref_krajList[k].okresList[o].orpList[ol].info[ri];

                        if (
                            ref_zpracovanyInfoStupen.indexOf(
                                ref_info.jev_kod +
                                (ref_info.vyska ? ref_info.vyska : '[]') +
                                ref_info.dc_zacatek +
                                '-' +
                                ref_info.dc_konec
                            ) == -1 &&
                            ref_zpracovanyInfoStupenOkres.indexOf(
                                ref_info.jev_kod +
                                (ref_info.vyska ? ref_info.vyska : '[]') +
                                ref_info.dc_zacatek +
                                '-' +
                                ref_info.dc_konec
                            ) == -1
                        ) {
                            if (first) {
                                first = false;
                            }

                            pomoc = PrintInfo(null, ref_info);
                            zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                        }
                    }
                }
            }
        }
    }

    resultText = resultText + '|' + zmen;
    return resultText;
}

function GetWarningColor(info) {
    var color = '';

    if (info) {
        switch (info.jistota_kod) {
            case 'Possible':
                switch (info.zavaznost_kod) {
                    case 'Moderate':
                    case 'Severe':
                        color = 'Nízký st. nebezpečí';
                        break;
                        case 'Extreme':
                        color = 'Vysoký st. nebezpečí';
                        break;
                    default:
                        color = '';
                        break;
                }
                break;    
            default:
                switch (info.zavaznost_kod) {
                    case 'Moderate':
                        color = 'Nízký st. nebezpečí';
                        break;
                    case 'Severe':
                        color = 'Vysoký st. nebezpečí';
                        break;
                    case 'Extreme':
                        color = 'Extrémní st. nebezpečí';
                        break;
                    default:
                        color = '';
                        break;
                }
                break;
        }
    }
    return color;
}

function PozadiColor(info) {
    var pozadi = '#fff';

    if (info) {
        switch (info.jistota_kod) {
            case 'Possible':
                switch (info.zavaznost_kod) {
                    case 'Moderate':
                    case 'Severe':
                        pozadi = '#ff0';
                        break;
                        case 'Extreme':
                            pozadi = '#ffa500';
                        break;
                    default:
                        pozadi = '#fff';
                        break;
                }
                break;    
            default:
                switch (info.zavaznost_kod) {
                    case 'Moderate':
                        pozadi = '#ff0';
                        break;
                    case 'Severe':
                        pozadi = '#ffa500';
                        break;
                    case 'Extreme':
                        pozadi = '#f00';
                        break;
                    default:
                        pozadi = '#fff';
                        break;
                }
                break;
        }
    }

    return pozadi;
}

function PrintVyska(info) {
    var vyskaText = '';

    if (info && info.vyska) {
        var vyska = info.vyska.substring(1, info.vyska.length - 1);
        var vyskaSplit = vyska.split('-');

        if (vyskaSplit.length == 2) {
            if (vyskaSplit[0] && vyskaSplit[1]) {
                vyskaText =
                    '<br/>mezi ' +
                    Math.round(vyskaSplit[0] * 0.3048) +
                    ' a ' +
                    Math.round(vyskaSplit[1] * 0.3048) +
                    ' m n.m.';
            } else if (vyskaSplit[0]) {
                vyskaText =
                    '<br/>nad ' +
                    Math.round(vyskaSplit[0] * 0.3048) +
                    ' m n.m.';
            } else if (vyskaSplit[1]) {
                vyskaText =
                    '<br/>pod ' +
                    Math.round(vyskaSplit[1] * 0.3048) +
                    ' m n.m.';
            }
        } else {
            vyskaText = '<br/>' + Math.round(vyska * 0.3048);
        }
    }

    return vyskaText;
}

function PrintInfo(info, ref_info) {
    var resultText = '';
    var zmen = 0;
    var pomoc = '';

    if (info) {
        var vyskyt = '';
        var upr_info = '';
        var upr_hydro = '';
        var upr_doporuceni = '';

        if (info.jistota_kod == 'Observed') {
            vyskyt = '<b>Výskyt jevu</b><br>';
        }
        if (info.popis) {
            upr_info = info.popis.replace(/<br\/>/g, ' ');
        }
        if (info.hydroPredpoved) {
            upr_hydro = info.hydroPredpoved.replace(/\t/g, '&emsp;');
            upr_hydro = upr_hydro.replace(/\n/g, '<br>');
        }
        if (info.doporuceni) {
            upr_doporuceni = info.doporuceni.replace(/<br\/>/g, ' ');
        }
    }

    if (ref_info) {
        var ref_vyskyt = '';
        var ref_upr_info = '';
        var ref_upr_hydro = '';
        var ref_upr_doporuceni = '';

        if (ref_info.jistota_kod == 'Observed') {
            ref_vyskyt = '<b>Výskyt jevu</b><br>';
        }
        if (ref_info.popis) {
            ref_upr_info = ref_info.popis.replace(/<br\/>/g, ' ');
        }
        if (ref_info.hydroPredpoved) {
            ref_upr_hydro = ref_info.hydroPredpoved.replace(/\t/g, '&emsp;');
            ref_upr_hydro = ref_upr_hydro.replace(/\n/g, '<br>');
        }
        if (ref_info.doporuceni) {
            ref_upr_doporuceni = ref_info.doporuceni.replace(/<br\/>/g, ' ');
        }
    }

    pomoc = SimpleHighlightDiff(
        info != null ? vyskyt : '',
        ref_info != null ? ref_vyskyt : ''
    );
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);

    pomoc = HighlightDiff(
        info != null ? JEVY_NAZVY[info.stupen_kod] : '',
        ref_info != null ? JEVY_NAZVY[ref_info.stupen_kod] : ''
    );
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);

    pomoc = HighlightDiff(
        info != null ? PrintVyska(info) : '',
        ref_info != null ? PrintVyska(ref_info) : ''
    );
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);

    pomoc = HighlightDiff(
        info != null ? GetWarningColor(info) : '',
        ref_info != null ? GetWarningColor(ref_info) : ''
    );
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);

    if (
        (info != null && info.SVRS == '1') ||
        (ref_info != null && ref_info.SVRS == '1')
    ) {
        resultText += '';
    } else {
        if (
            info &&
            ref_info &&
            !UkoncenyJev(ref_info.dc_konec, vytvoreni) &&
            info.nalehavost_kod == 'Immediate'
        ) {
            resultText += '';
        } else {
            pomoc = SimpleHighlightDiff(
                info != null ? ZobrazDatum(info.dc_zacatek, 'short') : '',
                ref_info != null
                    ? ZobrazDatum(ref_info.dc_zacatek, 'short')
                    : ''
            );
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);
        }

        pomoc = SimpleHighlightDiff(
            info != null ? ZobrazDatum(info.dc_konec, 'short', 1) : '',
            ref_info != null ? ZobrazDatum(ref_info.dc_konec, 'short', 1) : ''
        );
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);
    }

    pomoc = HighlightDiff(
        info != null ? upr_info : '',
        ref_info != null ? ref_upr_info : ''
    );
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);

    if (info && info.hydroPredpoved) {
        pomoc = HighlightDiff(
            info != null ? upr_hydro : '',
            ref_info != null ? ref_upr_hydro : ''
        );
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);
    }

    pomoc = HighlightDiff(
        info != null ? upr_doporuceni : '',
        ref_info != null ? ref_upr_doporuceni : ''
    );
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);

    resultText = resultText + '|' + zmen;
    return resultText;
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

var zobrazitVyhled = false;
var vystupText = '';

var orpTmp = [];

for (var i = 0; i < orp.length; i++) {
    if (omezitNaKraj == orp[i].kraj.id) {
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
    var zacatky = [];
    vystupText += 'Na Váš e-mail byla odeslána ';

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
                if (
                    skupina == 'WARN' ||
                    skupina == 'REG' ||
                    skupina == 'SMOGSIT'
                ) {
                    skupina = splitkod[1];
                }

                pomKod += skupina;
                poleJevy.push(pomKod);
            }
        }

        poleJevy = removeDuplicates(poleJevy);

        for (var h = 0; h < poleJevy.length; h++) {
            var jevKrajeList = [];
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
                    var found = false;
                    for (
                        var j = 0;
                        j < infoList[i].kraj.length && !found;
                        j++
                    ) {
                        found = infoList[i].kraj[j].UID == omezitNaKraj;
                    }
                    for (var j = 0; j < infoList[i].kraj.length; j++) {
                        if (found) {
                            jevKrajeList.push(infoList[i].kraj[j].UID);
                            var zacatek = Normalize(infoList[i].dc_zacatek);
                            zacatky.push(zacatek);
                        }
                    }
                }
            }
            jevKrajeList = removeDuplicates(jevKrajeList);
            jevKrajeList = jevKrajeList.sort(function (a, b) {
                return a - b;
            });

            if (jevKrajeList.length > 0) {
                resultText += JEVY_SKUPINY[poleJevy[h]] + ', ';
            }
        }

        var starty = Math.min.apply(null, zacatky);
        var start = starty.toString();

        if (start == 'Infinity') {
            vystupText += 'informace ČHMÚ - byla ukončena platnost vydané výstrahy.';
            vystupText += ', ';
        } else {
            var uvod = '';
            switch (vystraha.ucel) {
                case 'Exercise':
                    uvod = 'cvičná zpráva ČHMÚ - ';
                    break;
                case 'System':
                    uvod = 'systémová zpráva ČHMÚ - ';
                    break;
                case 'Test':
                    uvod = 'testovací zpráva ČHMÚ - ';
                    break;
                default:
                    uvod = 'výstraha ČHMÚ - ';
                    break;
            }

            vystupText += uvod;
            vystupText += resultText;
        }
        vystupText = vystupText.substring(0, vystupText.length - 2);
    }
}

if (vystupText != '') {
    vystupText += '. KOPIS HZS LK';
}

return vystupText;
