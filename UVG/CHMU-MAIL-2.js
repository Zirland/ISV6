// Verze 47

var omezitNaKraj = -1;
var zobrazitVyhled = true;
var distrSeznamNahore = false;

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

var KRAJE_KODY  = { "19": "PHA", "27": "SČK", "35": "JČK", "43": "PLK", "51": "KVK", "60": "ULK", "78": "LIK", "86": "KHK", "94": "PAK", "108": "VYK", "116": "JMK", "124": "OLK", "132": "MSK", "141": "ZLK"};

var JEVY_NAZVY = {
    "I.1" : "Vysoké teploty",
    "I.2" : "Velmi vysoké teploty",
    "I.3" : "Extrémně vysoké teploty",
    "I.4" : "Silný mráz",
    "I.5" : "Velmi silný mráz",
    "I.6" : "Extrémní mráz",
    "II.1" : "Mráz ve vegetačním období",
    "II.2" : "Prudký pokles teploty",
    "III.1" : "Silný vítr",
    "III.2" : "Velmi silný vítr",
    "III.3" : "Extrémně silný vítr",
    "IV.1" : "Nová sněhová pokrývka",
    "IV.2" : "Vysoká nová sněhová pokrývka",
    "IV.3" : "Extrémní sněhová pokrývka",
    "IV.4" : "Vysoká celková sněhová pokrývka",
    "V.1" : "Silné sněžení",
    "V.2" : "Extrémně silné sněžení",
    "VI.1" : "Sněhové jazyky",
    "VI.2" : "Závěje",
    "VI.3" : "Sněhová bouře",
    "VII.1" : "Náledí",
    "VIII.1" : "Ledovka",
    "VIII.2" : "Silná ledovka",
    "VIII.3" : "Velmi silná ledovka",
    "IX.1" : "Mrznoucí mlhy",
    "IX.2" : "Silná námraza ",
    "X.1" : "Silné bouřky",
    "X.2" : "Velmi silné bouřky",
    "X.2a" : "Velmi silné bouřky s přívalovými srážkami",
    "X.3" : "Extrémně silné bouřky",
    "X.3a" : "Extrémně silné bouřky s přívalovými srážkami",
    "XI.1" : "Vydatný déšť",
    "XI.2" : "Velmi vydatný déšť",
    "XI.3" : "Extrémní srážky",
    "XII.1" : "Povodňová bdělost",
    "XII.2" : "Povodňová pohotovost",
    "XII.3" : "Povodňové ohrožení",
    "XII.4" : "Extrémní povodňové ohrožení",
    "XIII.1" : "Povodňová bdělost – dotok",
    "XIII.2" : "Povodňová pohotovost – dotok",
    "XIII.3" : "Povodňové ohrožení – dotok",
    "XIII.4" : "Extrémní povodňové ohrožení – dotok",
    "XIV.1" : "Nebezpečí požárů",
    "XIV.2" : "Vysoké nebezpečí požárů",
    "XV.1" : "Jiný jev",
    "XV.2" : "Jiný jev",
    "XV.3" : "Jiný jev",
    "OUTLOOK" : "Výhled nebezpečných jevů",
    "SMOGSIT.O3" : "Smogová situace O3",
    "WARN.O3" : "Varování O3",
    "SMOGSIT.PM10" : "Smogová situace PM10",
    "REG.PM10" : "Regulace PM10",
    "SMOGSIT.SO2" : "Smogová situace SO2",
    "REG.SO2" : "Regulace SO2",
    "SMOGSIT.NO2" : "Smogová situace NO2",
    "REG.NO2" : "Regulace NO2"
};

function GetWarningColor(info) {
    // Barva podle závažnosti
    var color = '';

    if (info) {
        switch (info.zavaznost_kod) {
            case 'Moderate' : 
                color = 'Nízký st. nebezpečí';
            break;
            case 'Severe' : 
                color = 'Vysoký st. nebezpečí';
            break;
            case 'Extreme' : 
                color = 'Extrémní st. nebezpečí';
            break;
            default :
                color = '';
            break;
        }
    }

    return color;
}

function PozadiColor(info) {
    // Barva podle závažnosti
    var pozadi = '#fff';

    if (info) {
        switch (info.zavaznost_kod) {
            case 'Moderate' : 
                pozadi = '#ff0';
            break;
            case 'Severe' : 
                pozadi = '#ffa500';
            break;
            case 'Extreme' : 
                pozadi = '#f00';
            break;
            default :
                pozadi = '#fff';
            break;
        }
    }

    return pozadi;
}

function ZobrazDatum(datum, format, end) {
    if (!datum) {
        format_datum = 'do odvolání';
    } else {
        var normDatum = Normalize(datum);

        var normDatumRok = normDatum.substring(0,4);
        var normDatumMesic = normDatum.substring(4,6);
        var normDatumDen = normDatum.substring(6,8);
        var normDatumHodina = normDatum.substring(8,10);
        var normDatumMinuta = normDatum.substring(10,12);
        var normDatumSekunda = '00';

    if (normDatumHodina == '00' && normDatumMinuta == '00' && end) {
        var myNewDay = new Date(normDatumRok, normDatumMesic-1, normDatumDen-1);
        var newNormDatum = Normalize(myNewDay);
        normDatumRok = newNormDatum.substring(0,4);
        normDatumMesic = newNormDatum.substring(4,6);
        normDatumDen = newNormDatum.substring(6,8);
        normDatumHodina = '24';
    }

        switch (format) {
            case 'short' :
                format_datum = Number(normDatumDen) + '.' + Number(normDatumMesic) + '. ' + normDatumHodina + ':' + normDatumMinuta;
            break;
            case 'long' :
            default :
                format_datum = Number(normDatumDen) + '.' + Number(normDatumMesic) + '.' + normDatumRok + ' ' + normDatumHodina + ':' + normDatumMinuta + ':' + normDatumSekunda;
            break;
        }
    }

    return format_datum;
}

// Připravíme seznam jevů podle území
function PrepareInfo(vystraha) {
    var infoList = [];

    // Připravíme si pole info jevů
    for (var i = 0; i < vystraha.info.length; i++) {
        var vyskaList = [];
        vystraha.info[i].orp = [];
        vystraha.info[i].vyska = '';
        vystraha.info[i].krajPom = false;
        vystraha.info[i].okresPom = false;
        var orpSplit = vystraha.info[i].orp_list.toString().split(',');

        for (var j = 0; j < orpSplit.length; j++) {
            // Najdeme, jestli se nejedná o údaj s výškou
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

        // Pokud máme alespoň jedno ORP bez určení výšky
        if (vystraha.info[i].orp.length > 0) {
            infoList.push(vystraha.info[i]);
        }

        // Přes všechny dohledané výšky
        for (var v = 0; v < vyskaList.length; v++) {
            // Vytvoříme kopii pro danou výšku
            var info = JSON.parse(JSON.stringify(vystraha.info[i]));
            info.orp = [];
            info.vyska = vyskaList[v];

            // Při kopírování se nad datumy volá Date.toISOString() a pak se načte jako string,
            // převedeme tedy datumy zpět na typ datum
            info.dc_konec = new Date(info.dc_konec);
            info.dc_zacatek = new Date(info.dc_zacatek);

            for (var j = 0; j < orpSplit.length; j++) {
                // Záznam pro tuto výšku
                if (orpSplit[j].indexOf(vyskaList[v]) != -1) {
                    // Najdeme, kde výška začíná
                    var index = orpSplit[j].indexOf('[');
                    info.orp.push(orpSplit[j].substring(0, index));
                }
            }

            // Uložíme do seznamu
            infoList.push(info);

        }
    }

    var infoListFilter = [];
    for (var x = 0; x < infoList.length; x++) {
        var podminka = true;
        if (zobrazitVyhled) {
            podminka = (!UkoncenyJev(infoList[x].dc_konec, vytvoreni));
        } else {
            podminka = (infoList[x].jev_kod != 'OUTLOOK' && !UkoncenyJev(infoList[x].dc_konec, vytvoreni));
        }
        
        if (podminka) {
            infoListFilter.push(infoList[x]);
        }
    }
    
    infoList = infoListFilter;

    infoList = infoList.sort(function (a, b) {
        var start1 = parseFloat(Normalize(a.dc_zacatek));
        var start2 = parseFloat(Normalize(b.dc_zacatek));

        if (start1 < start2) return -1;
        if (start1 > start2) return 1;
        return 0;
    });

    return infoList;
}

// Zjišťuje, zda je konecJev nenastane v období 30 minut od casZpravy
function UkoncenyJev(konecJev, casZprava) {
    if (!konecJev) {
        konecJev = '1.1.2100 01:00:00';
    }

    var konecJev_format = Normalize(konecJev);
    var casZprava_format = Normalize(casZprava);

    var kjYear = konecJev_format.substring(0,4);
    var kjMonth = konecJev_format.substring(4,6);
    var kjDay = konecJev_format.substring(6,8);
    var kjHour = konecJev_format.substring(8,10);
    var kjMinute = konecJev_format.substring(10,12);
    var myEndTime = new Date(kjYear, kjMonth-1, kjDay, kjHour, kjMinute, '00');

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

// Úprava formátu data
function Normalize(datum) {
    var datumString = datum.toString();
    datumDen = datumString.substring(0,2);
    datumDen_porovn = datumDen.replace(/\.$/, '');
    if (datumDen == datumDen_porovn) {
        datumMesic = datumString.substring(3,5);
        datumMesic_porovn = datumMesic.replace(/\.$/, '');
        if (datumMesic == datumMesic_porovn) {
            datumRok = datumString.substring(6,10);
            datumCas = datumString.substring(11,16);
            datumCas = datumCas.replace(/\:$/, '');
        } else {
            datumMesic = '0' + datumMesic_porovn;
            datumRok = datumString.substring(5,9);
            datumCas = datumString.substring(10,15);
            datumCas = datumCas.replace(/\:$/, '');
        }
    } else {
        datumDen = '0' + datumDen_porovn;
        datumMesic = datumString.substring(2,4);
        datumMesic_porovn = datumMesic.replace(/\.$/, '');
        if (datumMesic == datumMesic_porovn) {
            datumRok = datumString.substring(5,9);
            datumCas = datumString.substring(10,15);
            datumCas = datumCas.replace(/\:$/, '');
        } else {
            datumMesic = '0' + datumMesic_porovn;
            datumRok = datumString.substring(4,8);
            datumCas = datumString.substring(9,14);
            datumCas = datumCas.replace(/\:$/, '');
        }
    }

    datumHodiny = datumCas.substring(0,2);
    datumHodiny_porovn = datumHodiny.replace(/\:$/, '');
    if (datumHodiny == datumHodiny_porovn) {
        datumMinuty = datumCas.substring(3,5);
        datumSekundy = datumCas.substring(6,8);
    } else {
        datumHodiny = '0' + datumHodiny_porovn;
        datumMinuty = datumCas.substring(2,4);
        datumSekundy = datumCas.substring(5,7);
    }

    datum = datumRok + datumMesic + datumDen + datumHodiny + datumMinuty + datumSekundy;

    return datum;
}

function PrepareKraje(orp, infoList) {
    var krajList = [];
    var posledniKraj = {};
    var posledniOkres = {};
    var posledniOrp = {};
    var krajChange = true;
    var okresChange = true;

    for (var i = 0; i < orp.length; i++) {
        // Pokud se změnil kraj, tak ho přidáme do kolekce
        if (posledniKraj.id != orp[i].kraj.id) {
            // Uložíme si info jevy, které jsou pro celý kraj
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

        // Pokud se změnil okres, tak ho přidáme do kolekce
        if (posledniOkres.id != orp[i].okres.id) {
            // Uložíme si info jevy, které jsou pro celý okres
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

        // ORP se nám vždycky mění
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

    // Uložíme si info jevy, které jsou pro celý kraj
    for (var j = 0; j < infoList.length; j++) {
        if (infoList[j].krajPom) {
            posledniKraj.info.push(infoList[j]);
        }
    }

    // Uložíme si info jevy, které jsou pro celý okres
    for (var j = 0; j < infoList.length; j++) {
        if (infoList[j].okresPom) {
            posledniOkres.info.push(infoList[j]);
        }
    }

    return krajList;
}

function Remove(arr, item) {
    for (var i = arr.length; i--;) {
        if (arr[i] === item) {
            arr.splice(i, 1);
        }
    }
}

function JevUzemi(info) {
    var resultText = '';
    var orp_seznam = info.orp.toString();

    var orp_pole = orp_seznam.split(',');
    orp_pole = orp_pole.sort(function (a, b) {
        return a-b;
    });

    uzemiKraje = [];
    uzemiOkresu = [];

    if (orp_pole.indexOf('19') != -1) { // Praha
        uzemiOkresu.push('3100');
        Remove(orp_pole, '19');
    } 
    if (uzemiOkresu.indexOf('3100') != -1) { // Hl. m. Praha
        uzemiKraje.push('19');
        Remove(uzemiOkresu, '3100');
    }
    if (orp_pole.indexOf('27') != -1 && orp_pole.indexOf('35') != -1 && orp_pole.indexOf('43') != -1) { // Benešov
        uzemiOkresu.push('3201');
        Remove(orp_pole, '27');
        Remove(orp_pole, '35');
        Remove(orp_pole, '43');
    } 
    if (orp_pole.indexOf('51') != -1 && orp_pole.indexOf('60') != -1) { // Beroun
        uzemiOkresu.push('3202');
        Remove(orp_pole, '51');
        Remove(orp_pole, '60');
    }
    if (orp_pole.indexOf('78') != -1 && orp_pole.indexOf('86') != -1) { // Kladno
        uzemiOkresu.push('3203');
        Remove(orp_pole, '78');
        Remove(orp_pole, '86');
    }
    if (orp_pole.indexOf('94') != -1 && orp_pole.indexOf('108') != -1) { // Kolín
        uzemiOkresu.push('3204');
        Remove(orp_pole, '94');
        Remove(orp_pole, '108');
    }
    if (orp_pole.indexOf('116') != -1 && orp_pole.indexOf('124') != -1) { // Kutná Hora
        uzemiOkresu.push('3205');
        Remove(orp_pole, '116');
        Remove(orp_pole, '124');
    }
    if (orp_pole.indexOf('132') != -1 && orp_pole.indexOf('141') != -1 && orp_pole.indexOf('159') != -1) { // Mělník
        uzemiOkresu.push('3206');
        Remove(orp_pole, '132');
        Remove(orp_pole, '141');
        Remove(orp_pole, '159');
    }
    if (orp_pole.indexOf('167') != -1 && orp_pole.indexOf('175') != -1) { // Mladá Boleslav
        uzemiOkresu.push('3207');
        Remove(orp_pole, '167');
        Remove(orp_pole, '175');
    }
    if (orp_pole.indexOf('183') != -1 && orp_pole.indexOf('191') != -1 && orp_pole.indexOf('205') != -1) { // Nymburk
        uzemiOkresu.push('3208');
        Remove(orp_pole, '183');
        Remove(orp_pole, '191');
        Remove(orp_pole, '205');
    }
    if (orp_pole.indexOf('213') != -1 && orp_pole.indexOf('221') != -1) { // Praha-východ
        uzemiOkresu.push('3209');
        Remove(orp_pole, '213');
        Remove(orp_pole, '221');
    }
    if (orp_pole.indexOf('230') != -1) { // Praha-západ
        uzemiOkresu.push('3210');
        Remove(orp_pole, '230');
    }
    if (orp_pole.indexOf('248') != -1 && orp_pole.indexOf('256') != -1 && orp_pole.indexOf('264') != -1) { // Příbram
        uzemiOkresu.push('3211');
        Remove(orp_pole, '248');
        Remove(orp_pole, '256');
        Remove(orp_pole, '264');
    }
    if (orp_pole.indexOf('272') != -1) { // Rakovník
        uzemiOkresu.push('3212');
        Remove(orp_pole, '272');
    }
    // Středočeský kraj
    if (uzemiOkresu.indexOf('3201') != -1 && uzemiOkresu.indexOf('3202') != -1 && uzemiOkresu.indexOf('3203') != -1 && uzemiOkresu.indexOf('3204') != -1 && uzemiOkresu.indexOf('3205') != -1 && uzemiOkresu.indexOf('3206') != -1 && uzemiOkresu.indexOf('3207') != -1 && uzemiOkresu.indexOf('3208') != -1 && uzemiOkresu.indexOf('3209') != -1 && uzemiOkresu.indexOf('3210') != -1 && uzemiOkresu.indexOf('3211') != -1 && uzemiOkresu.indexOf('3212') != -1) {
        uzemiKraje.push('27');
        Remove(uzemiOkresu, '3201');
        Remove(uzemiOkresu, '3202');
        Remove(uzemiOkresu, '3203');
        Remove(uzemiOkresu, '3204');
        Remove(uzemiOkresu, '3205');
        Remove(uzemiOkresu, '3206');
        Remove(uzemiOkresu, '3207');
        Remove(uzemiOkresu, '3208');
        Remove(uzemiOkresu, '3209');
        Remove(uzemiOkresu, '3210');
        Remove(uzemiOkresu, '3211');
        Remove(uzemiOkresu, '3212');
    }
    if (orp_pole.indexOf('302') != -1 && orp_pole.indexOf('281') != -1 && orp_pole.indexOf('299') != -1) { // České Budějovice
        uzemiOkresu.push('3301');
        Remove(orp_pole, '302');
        Remove(orp_pole, '281');
        Remove(orp_pole, '299');
    }
    if (orp_pole.indexOf('329') != -1 && orp_pole.indexOf('311') != -1) { // Český Krumlov
        uzemiOkresu.push('3302');
        Remove(orp_pole, '329');
        Remove(orp_pole, '311');
    }
    if (orp_pole.indexOf('337') != -1 && orp_pole.indexOf('345') != -1 && orp_pole.indexOf('353') != -1) { // Jindřichův Hradec
        uzemiOkresu.push('3303');
        Remove(orp_pole, '337');
        Remove(orp_pole, '345');
        Remove(orp_pole, '353');
    }
    if (orp_pole.indexOf('396') != -1 && orp_pole.indexOf('400') != -1) { // Písek
        uzemiOkresu.push('3305');
        Remove(orp_pole, '396');
        Remove(orp_pole, '400');
    }
    if (orp_pole.indexOf('418') != -1 && orp_pole.indexOf('426') != -1) { // Prachatice
        uzemiOkresu.push('3306');
        Remove(orp_pole, '418');
        Remove(orp_pole, '426');
    }
    if (orp_pole.indexOf('434') != -1 && orp_pole.indexOf('442') != -1 && orp_pole.indexOf('451') != -1) { // Strakonice
        uzemiOkresu.push('3307');
        Remove(orp_pole, '434');
        Remove(orp_pole, '442');
        Remove(orp_pole, '451');
    }
    if (orp_pole.indexOf('469') != -1 && orp_pole.indexOf('477') != -1) { // Tábor
        uzemiOkresu.push('3308');
        Remove(orp_pole, '469');
        Remove(orp_pole, '477');
    }
    // Jihočeský kraj
    if (uzemiOkresu.indexOf('3301') != -1 && uzemiOkresu.indexOf('3302') != -1 && uzemiOkresu.indexOf('3303') != -1 && uzemiOkresu.indexOf('3305') != -1 && uzemiOkresu.indexOf('3306') != -1 && uzemiOkresu.indexOf('3307') != -1 && uzemiOkresu.indexOf('3308') != -1) {
        uzemiKraje.push('35');
        Remove(uzemiOkresu, '3301');
        Remove(uzemiOkresu, '3302');
        Remove(uzemiOkresu, '3303');
        Remove(uzemiOkresu, '3305');
        Remove(uzemiOkresu, '3306');
        Remove(uzemiOkresu, '3307');
        Remove(uzemiOkresu, '3308');
    }
    if (orp_pole.indexOf('485') != -1 && orp_pole.indexOf('493') != -1) { // Domažlice
        uzemiOkresu.push('3401');
        Remove(orp_pole, '485');
        Remove(orp_pole, '493');
    }
    if (orp_pole.indexOf('558') != -1 && orp_pole.indexOf('566') != -1 && orp_pole.indexOf('574') != -1) { // Klatovy
        uzemiOkresu.push('3404');
        Remove(orp_pole, '558');
        Remove(orp_pole, '566');
        Remove(orp_pole, '574');
    }
    if (orp_pole.indexOf('591') != -1 && orp_pole.indexOf('604') != -1 && orp_pole.indexOf('612') != -1 && orp_pole.indexOf('621') != -1) { // Plzeň-jih
        uzemiOkresu.push('3406');
        Remove(orp_pole, '591');
        Remove(orp_pole, '604');
        Remove(orp_pole, '612');
        Remove(orp_pole, '621');
    }
    if (orp_pole.indexOf('582') != -1) { // Plzeň-město
        uzemiOkresu.push('3405');
        Remove(orp_pole, '582');
    }
    if (orp_pole.indexOf('639') != -1 && orp_pole.indexOf('647') != -1) { // Plzeň-sever
        uzemiOkresu.push('3407');
        Remove(orp_pole, '639');
        Remove(orp_pole, '647');
    }
    if (orp_pole.indexOf('655') != -1) { // Rokycany
        uzemiOkresu.push('3408');
        Remove(orp_pole, '655');
    }
    if (orp_pole.indexOf('680') != -1 && orp_pole.indexOf('698') != -1) { // Tachov
        uzemiOkresu.push('3410');
        Remove(orp_pole, '680');
        Remove(orp_pole, '698');
    }
    // Plzeňský kraj
    if (uzemiOkresu.indexOf('3401') != -1 && uzemiOkresu.indexOf('3404') != -1 && uzemiOkresu.indexOf('3405') != -1 && uzemiOkresu.indexOf('3406') != -1 && uzemiOkresu.indexOf('3407') != -1 && uzemiOkresu.indexOf('3408') != -1 && uzemiOkresu.indexOf('3410') != -1) {
        uzemiKraje.push('43');
        Remove(uzemiOkresu, '3401');
        Remove(uzemiOkresu, '3404');
        Remove(uzemiOkresu, '3405');
        Remove(uzemiOkresu, '3406');
        Remove(uzemiOkresu, '3407');
        Remove(uzemiOkresu, '3408');
        Remove(uzemiOkresu, '3410');
    }
    if (orp_pole.indexOf('507') != -1 && orp_pole.indexOf('515') != -1 && orp_pole.indexOf('523') != -1) { // Cheb
        uzemiOkresu.push('3402');
        Remove(orp_pole, '507');
        Remove(orp_pole, '515');
        Remove(orp_pole, '523');
    }
    if (orp_pole.indexOf('531') != -1 && orp_pole.indexOf('540') != -1) { // Karlovy Vary
        uzemiOkresu.push('3403');
        Remove(orp_pole, '531');
        Remove(orp_pole, '540');
    }
    if (orp_pole.indexOf('663') != -1 && orp_pole.indexOf('671') != -1) { // Sokolov
        uzemiOkresu.push('3409');
        Remove(orp_pole, '663');
        Remove(orp_pole, '671');
    }
    // Karlovarský kraj
    if (uzemiOkresu.indexOf('3402') != -1 && uzemiOkresu.indexOf('3403') != -1 && uzemiOkresu.indexOf('3409') != -1) {
        uzemiKraje.push('51');
        Remove(uzemiOkresu, '3402');
        Remove(uzemiOkresu, '3403');
        Remove(uzemiOkresu, '3409');
    }
    if (orp_pole.indexOf('728') != -1 && orp_pole.indexOf('736') != -1 && orp_pole.indexOf('744') != -1) { // Děčín
        uzemiOkresu.push('3502');
        Remove(orp_pole, '728');
        Remove(orp_pole, '736');
        Remove(orp_pole, '744');
    }
    if (orp_pole.indexOf('752') != -1 && orp_pole.indexOf('761') != -1) { // Chomutov
        uzemiOkresu.push('3503');
        Remove(orp_pole, '752');
        Remove(orp_pole, '761');
    }
    if (orp_pole.indexOf('825') != -1 && orp_pole.indexOf('833') != -1 && orp_pole.indexOf('841') != -1) { // Litoměřice
        uzemiOkresu.push('3506');
        Remove(orp_pole, '825');
        Remove(orp_pole, '833');
        Remove(orp_pole, '841');
    }
    if (orp_pole.indexOf('850') != -1 && orp_pole.indexOf('868') != -1 && orp_pole.indexOf('876') != -1) { // Louny
        uzemiOkresu.push('3507');
        Remove(orp_pole, '850');
        Remove(orp_pole, '868');
        Remove(orp_pole, '876');
    }
    if (orp_pole.indexOf('884') != -1 && orp_pole.indexOf('892') != -1) { // Most
        uzemiOkresu.push('3508');
        Remove(orp_pole, '884');
        Remove(orp_pole, '892');
    }
    if (orp_pole.indexOf('906') != -1 && orp_pole.indexOf('914') != -1) { // Teplice
        uzemiOkresu.push('3509');
        Remove(orp_pole, '906');
        Remove(orp_pole, '914');
    }
    if (orp_pole.indexOf('922') != -1) { // Ústí nad Labem
        uzemiOkresu.push('3510');
        Remove(orp_pole, '922');
    }
    // Ústecký kraj
    if (uzemiOkresu.indexOf('3502') != -1 && uzemiOkresu.indexOf('3503') != -1 && uzemiOkresu.indexOf('3506') != -1 && uzemiOkresu.indexOf('3507') != -1 && uzemiOkresu.indexOf('3508') != -1 && uzemiOkresu.indexOf('3509') != -1 && uzemiOkresu.indexOf('3510') != -1) {
        uzemiKraje.push('60');
        Remove(uzemiOkresu, '3502');
        Remove(uzemiOkresu, '3503');
        Remove(uzemiOkresu, '3506');
        Remove(uzemiOkresu, '3507');
        Remove(uzemiOkresu, '3508');
        Remove(uzemiOkresu, '3509');
        Remove(uzemiOkresu, '3510');
    }
    if (orp_pole.indexOf('710') != -1 && orp_pole.indexOf('701') != -1) { // Česká Lípa
        uzemiOkresu.push('3501');
        Remove(orp_pole, '710');
        Remove(orp_pole, '701');
    }
    if (orp_pole.indexOf('779') != -1 && orp_pole.indexOf('787') != -1 && orp_pole.indexOf('795') != -1) { // Jablonec nad Nisou
        uzemiOkresu.push('3504');
        Remove(orp_pole, '779');
        Remove(orp_pole, '787');
        Remove(orp_pole, '795');
    }
    if (orp_pole.indexOf('809') != -1 && orp_pole.indexOf('817') != -1) { // Liberec
        uzemiOkresu.push('3505');
        Remove(orp_pole, '809');
        Remove(orp_pole, '817');
    }
    if (orp_pole.indexOf('1139') != -1 && orp_pole.indexOf('1147') != -1 && orp_pole.indexOf('1155') != -1) { // Turnov
        uzemiOkresu.push('3608');
        Remove(orp_pole, '1139');
        Remove(orp_pole, '1147');
        Remove(orp_pole, '1155');
    }
    // Liberecký kraj
    if (uzemiOkresu.indexOf('3501') != -1 && uzemiOkresu.indexOf('3504') != -1 && uzemiOkresu.indexOf('3505') != -1 && uzemiOkresu.indexOf('3608') != -1) {
        uzemiKraje.push('78');
        Remove(uzemiOkresu, '3501');
        Remove(uzemiOkresu, '3504');
        Remove(uzemiOkresu, '3505');
        Remove(uzemiOkresu, '3608');
    }
    if (orp_pole.indexOf('965') != -1 && orp_pole.indexOf('973') != -1) { // Hradec Králové
        uzemiOkresu.push('3602');
        Remove(orp_pole, '965');
        Remove(orp_pole, '973');
    }
    if (orp_pole.indexOf('1007') != -1 && orp_pole.indexOf('1015') != -1 && orp_pole.indexOf('1023') != -1) { // Jičín
        uzemiOkresu.push('3604');
        Remove(orp_pole, '1007');
        Remove(orp_pole, '1015');
        Remove(orp_pole, '1023');
    }
    if (orp_pole.indexOf('1031') != -1 && orp_pole.indexOf('1040') != -1 && orp_pole.indexOf('1066') != -1 && orp_pole.indexOf('1058') != -1) { // Náchod
        uzemiOkresu.push('3605');
        Remove(orp_pole, '1031');
        Remove(orp_pole, '1040');
        Remove(orp_pole, '1066');
        Remove(orp_pole, '1058');
    }
    if (orp_pole.indexOf('1104') != -1 && orp_pole.indexOf('1112') != -1 && orp_pole.indexOf('1121') != -1) { // Rychnov nad Kněžnou
        uzemiOkresu.push('3607');
        Remove(orp_pole, '1104');
        Remove(orp_pole, '1112');
        Remove(orp_pole, '1121');
    }
    if (orp_pole.indexOf('1201') != -1 && orp_pole.indexOf('1210') != -1 && orp_pole.indexOf('1228') != -1) { // Trutnov
        uzemiOkresu.push('3610');
        Remove(orp_pole, '1201');
        Remove(orp_pole, '1210');
        Remove(orp_pole, '1228');
    }
    // Královéhradecký kraj
    if (uzemiOkresu.indexOf('3602') != -1 && uzemiOkresu.indexOf('3604') != -1 && uzemiOkresu.indexOf('3605') != -1 && uzemiOkresu.indexOf('3607') != -1 && uzemiOkresu.indexOf('3610') != -1) {
        uzemiKraje.push('86');
        Remove(uzemiOkresu, '3602');
        Remove(uzemiOkresu, '3604');
        Remove(uzemiOkresu, '3605');
        Remove(uzemiOkresu, '3607');
        Remove(uzemiOkresu, '3610');
    }
    if (orp_pole.indexOf('990') != -1 && orp_pole.indexOf('981') != -1) { // Chrudim
        uzemiOkresu.push('3603');
        Remove(orp_pole, '990');
        Remove(orp_pole, '981');
    }
    if (orp_pole.indexOf('1074') != -1 && orp_pole.indexOf('1082') != -1 && orp_pole.indexOf('1091') != -1) { // Pardubice
        uzemiOkresu.push('3606');
        Remove(orp_pole, '1074');
        Remove(orp_pole, '1082');
        Remove(orp_pole, '1091');
    }
    if (orp_pole.indexOf('1163') != -1 && orp_pole.indexOf('1171') != -1 && orp_pole.indexOf('1180') != -1 && orp_pole.indexOf('1198') != -1) { // Svitavy
        uzemiOkresu.push('3609');
        Remove(orp_pole, '1163');
        Remove(orp_pole, '1171');
        Remove(orp_pole, '1180');
        Remove(orp_pole, '1198');
    }
    // Ústí nad Orlicí
    if (orp_pole.indexOf('1279') != -1 && orp_pole.indexOf('1236') != -1 && orp_pole.indexOf('1244') != -1 && orp_pole.indexOf('1287') != -1 && orp_pole.indexOf('1252') != -1 && orp_pole.indexOf('1261') != -1) {
        uzemiOkresu.push('3611');
        Remove(orp_pole, '1279');
        Remove(orp_pole, '1236');
        Remove(orp_pole, '1244');
        Remove(orp_pole, '1287');
        Remove(orp_pole, '1252');
        Remove(orp_pole, '1261');
    }
    // Pardubický kraj
    if (uzemiOkresu.indexOf('3603') != -1 && uzemiOkresu.indexOf('3606') != -1 && uzemiOkresu.indexOf('3609') != -1 && uzemiOkresu.indexOf('3611') != -1) {
        uzemiKraje.push('94');
        Remove(uzemiOkresu, '3603');
        Remove(uzemiOkresu, '3606');
        Remove(uzemiOkresu, '3609');
        Remove(uzemiOkresu, '3611');
    }
    if (orp_pole.indexOf('949') != -1 && orp_pole.indexOf('931') != -1 && orp_pole.indexOf('957') != -1) { // Havlíčkův Brod
        uzemiOkresu.push('3601');
        Remove(orp_pole, '949');
        Remove(orp_pole, '931');
        Remove(orp_pole, '957');
    }
    if (orp_pole.indexOf('1503') != -1 && orp_pole.indexOf('1511') != -1) { // Jihlava
        uzemiOkresu.push('3707');
        Remove(orp_pole, '1503');
        Remove(orp_pole, '1511');
    }
    if (orp_pole.indexOf('361') != -1 && orp_pole.indexOf('370') != -1 && orp_pole.indexOf('388') != -1) { // Pelhřimov
        uzemiOkresu.push('3304');
        Remove(orp_pole, '361');
        Remove(orp_pole, '370');
        Remove(orp_pole, '388');
    }
    if (orp_pole.indexOf('1571') != -1 && orp_pole.indexOf('1589') != -1 && orp_pole.indexOf('1597') != -1) { // Třebíč
        uzemiOkresu.push('3710');
        Remove(orp_pole, '1571');
        Remove(orp_pole, '1589');
        Remove(orp_pole, '1597');
    }
    if (orp_pole.indexOf('1678') != -1 && orp_pole.indexOf('1686') != -1 && orp_pole.indexOf('1694') != -1 && orp_pole.indexOf('1708') != -1) { // Žďár nad Sázavou
        uzemiOkresu.push('3714');
        Remove(orp_pole, '1678');
        Remove(orp_pole, '1686');
        Remove(orp_pole, '1694');
        Remove(orp_pole, '1708');
    }
    // Kraj Vysočina
    if (uzemiOkresu.indexOf('3601') != -1 && uzemiOkresu.indexOf('3707') != -1 && uzemiOkresu.indexOf('3304') != -1 && uzemiOkresu.indexOf('3710') != -1 && uzemiOkresu.indexOf('3714') != -1) {
        uzemiKraje.push('108');
        Remove(uzemiOkresu, '3601');
        Remove(uzemiOkresu, '3707');
        Remove(uzemiOkresu, '3304');
        Remove(uzemiOkresu, '3710');
        Remove(uzemiOkresu, '3714');
    }
    if (orp_pole.indexOf('1295') != -1 && orp_pole.indexOf('1309') != -1) { // Blansko
        uzemiOkresu.push('3701');
        Remove(orp_pole, '1295');
        Remove(orp_pole, '1309');
    }
    if (orp_pole.indexOf('1317') != -1) { // Brno-město
        uzemiOkresu.push('3702');
        Remove(orp_pole, '1317');
    }
    // Brno-venkov
    if (orp_pole.indexOf('1325') != -1 && orp_pole.indexOf('1333') != -1 && orp_pole.indexOf('1414') != -1 && orp_pole.indexOf('1341') != -1 && orp_pole.indexOf('1368') != -1 && orp_pole.indexOf('1350') != -1 && orp_pole.indexOf('1376') != -1) {
        uzemiOkresu.push('3703');
        Remove(orp_pole, '1325');
        Remove(orp_pole, '1333');
        Remove(orp_pole, '1414');
        Remove(orp_pole, '1341');
        Remove(orp_pole, '1368');
        Remove(orp_pole, '1350');
        Remove(orp_pole, '1376');
    }
    if (orp_pole.indexOf('1384') != -1 && orp_pole.indexOf('1392') != -1 && orp_pole.indexOf('1406') != -1) { // Břeclav
        uzemiOkresu.push('3704');
        Remove(orp_pole, '1384');
        Remove(orp_pole, '1392');
        Remove(orp_pole, '1406');
    }
    if (orp_pole.indexOf('1473') != -1 && orp_pole.indexOf('1481') != -1 && orp_pole.indexOf('1490') != -1) { // Hodonín
        uzemiOkresu.push('3706');
        Remove(orp_pole, '1473');
        Remove(orp_pole, '1481');
        Remove(orp_pole, '1490');
    }
    if (orp_pole.indexOf('1627') != -1 && orp_pole.indexOf('1635') != -1 && orp_pole.indexOf('1643') != -1) { // Vyškov
        uzemiOkresu.push('3712');
        Remove(orp_pole, '1627');
        Remove(orp_pole, '1635');
        Remove(orp_pole, '1643');
    }
    if (orp_pole.indexOf('1651') != -1 && orp_pole.indexOf('1660') != -1) { // Znojmo
        uzemiOkresu.push('3713');
        Remove(orp_pole, '1651');
        Remove(orp_pole, '1660');
    }
    // Jihomoravský kraj
    if (uzemiOkresu.indexOf('3701') != -1 && uzemiOkresu.indexOf('3702') != -1 && uzemiOkresu.indexOf('3703') != -1 && uzemiOkresu.indexOf('3704') != -1 && uzemiOkresu.indexOf('3706') != -1 && uzemiOkresu.indexOf('3712') != -1 && uzemiOkresu.indexOf('3713') != -1) {
        uzemiKraje.push('116');
        Remove(uzemiOkresu, '3701');
        Remove(uzemiOkresu, '3702');
        Remove(uzemiOkresu, '3703');
        Remove(uzemiOkresu, '3704');
        Remove(uzemiOkresu, '3706');
        Remove(uzemiOkresu, '3712');
        Remove(uzemiOkresu, '3713');
    }
    if (orp_pole.indexOf('2062') != -1) { // Jeseník
        uzemiOkresu.push('3811');
        Remove(orp_pole, '2062');
    }
    if (orp_pole.indexOf('1881') != -1 && orp_pole.indexOf('1899') != -1 && orp_pole.indexOf('1911') != -1 && orp_pole.indexOf('1902') != -1) { // Olomouc
        uzemiOkresu.push('3805');
        Remove(orp_pole, '1881');
        Remove(orp_pole, '1899');
        Remove(orp_pole, '1911');
        Remove(orp_pole, '1902');
    }
    if (orp_pole.indexOf('1554') != -1 && orp_pole.indexOf('1562') != -1) { // Prostějov
        uzemiOkresu.push('3709');
        Remove(orp_pole, '1554');
        Remove(orp_pole, '1562');
    }
    if (orp_pole.indexOf('1970') != -1 && orp_pole.indexOf('1988') != -1 && orp_pole.indexOf('1996') != -1) { // Přerov
        uzemiOkresu.push('3808');
        Remove(orp_pole, '1970');
        Remove(orp_pole, '1988');
        Remove(orp_pole, '1996');
    }
    if (orp_pole.indexOf('2003') != -1 && orp_pole.indexOf('2020') != -1 && orp_pole.indexOf('2011') != -1) { // Šumperk
        uzemiOkresu.push('3809');
        Remove(orp_pole, '2003');
        Remove(orp_pole, '2020');
        Remove(orp_pole, '2011');
    }
    // Olomoucký kraj
    if (uzemiOkresu.indexOf('3811') != -1 && uzemiOkresu.indexOf('3805') != -1 && uzemiOkresu.indexOf('3709') != -1 && uzemiOkresu.indexOf('3808') != -1 && uzemiOkresu.indexOf('3809') != -1) {
        uzemiKraje.push('124');
        Remove(uzemiOkresu, '3811');
        Remove(uzemiOkresu, '3805');
        Remove(uzemiOkresu, '3709');
        Remove(uzemiOkresu, '3808');
        Remove(uzemiOkresu, '3809');
    }
    if (orp_pole.indexOf('1520') != -1 && orp_pole.indexOf('1538') != -1 && orp_pole.indexOf('1546') != -1) { // Kroměříž
        uzemiOkresu.push('3708');
        Remove(orp_pole, '1520');
        Remove(orp_pole, '1538');
        Remove(orp_pole, '1546');
    }
    if (orp_pole.indexOf('1601') != -1 && orp_pole.indexOf('1619') != -1) { // Uherské Hradiště
        uzemiOkresu.push('3711');
        Remove(orp_pole, '1601');
        Remove(orp_pole, '1619');
    }
    if (orp_pole.indexOf('2038') != -1 && orp_pole.indexOf('2046') != -1 && orp_pole.indexOf('2054') != -1) { // Vsetín
        uzemiOkresu.push('3810');
        Remove(orp_pole, '2038');
        Remove(orp_pole, '2046');
        Remove(orp_pole, '2054');
    }
    // Zlín
    if (orp_pole.indexOf('1422') != -1 && orp_pole.indexOf('1431') != -1 && orp_pole.indexOf('1449') != -1 && orp_pole.indexOf('1457') != -1 && orp_pole.indexOf('1465') != -1) {
        uzemiOkresu.push('3705');
        Remove(orp_pole, '1422');
        Remove(orp_pole, '1431');
        Remove(orp_pole, '1449');
        Remove(orp_pole, '1457');
        Remove(orp_pole, '1465');
    }
    // Zlínský kraj
    if (uzemiOkresu.indexOf('3708') != -1 && uzemiOkresu.indexOf('3711') != -1 && uzemiOkresu.indexOf('3810') != -1 && uzemiOkresu.indexOf('3705') != -1) {
        uzemiKraje.push('141');
        Remove(uzemiOkresu, '3708');
        Remove(uzemiOkresu, '3711');
        Remove(uzemiOkresu, '3810');
        Remove(uzemiOkresu, '3705');
    }
    if (orp_pole.indexOf('1716') != -1 && orp_pole.indexOf('1724') != -1 && orp_pole.indexOf('1732') != -1) { // Bruntál
        uzemiOkresu.push('3801');
        Remove(orp_pole, '1716');
        Remove(orp_pole, '1724');
        Remove(orp_pole, '1732');
    }
    if (orp_pole.indexOf('1741') != -1 && orp_pole.indexOf('1759') != -1 && orp_pole.indexOf('1767') != -1 && orp_pole.indexOf('1775') != -1) { // Frýdek-Místek
        uzemiOkresu.push('3802');
        Remove(orp_pole, '1741');
        Remove(orp_pole, '1759');
        Remove(orp_pole, '1767');
        Remove(orp_pole, '1775');
    }
    // Karviná
    if (orp_pole.indexOf('1783') != -1 && orp_pole.indexOf('1821') != -1 && orp_pole.indexOf('1791') != -1 && orp_pole.indexOf('1805') != -1 && orp_pole.indexOf('1813') != -1) {
        uzemiOkresu.push('3803');
        Remove(orp_pole, '1783');
        Remove(orp_pole, '1821');
        Remove(orp_pole, '1791');
        Remove(orp_pole, '1805');
        Remove(orp_pole, '1813');
    }
    // Nový Jičín
    if (orp_pole.indexOf('1830') != -1 && orp_pole.indexOf('1848') != -1 && orp_pole.indexOf('1856') != -1  && orp_pole.indexOf('1864') != -1 && orp_pole.indexOf('1872') != -1) {
        uzemiOkresu.push('3804');
        Remove(orp_pole, '1830');
        Remove(orp_pole, '1848');
        Remove(orp_pole, '1856');
        Remove(orp_pole, '1864');
        Remove(orp_pole, '1872');
    }
    if (orp_pole.indexOf('1929') != -1 && orp_pole.indexOf('1937') != -1 && orp_pole.indexOf('1945') != -1 && orp_pole.indexOf('1953') != -1) { // Opava
        uzemiOkresu.push('3806');
        Remove(orp_pole, '1929');
        Remove(orp_pole, '1937');
        Remove(orp_pole, '1945');
        Remove(orp_pole, '1953');
    }
    if (orp_pole.indexOf('1961') != -1) { // Ostrava-město
        uzemiOkresu.push('3807');
        Remove(orp_pole, '1961');
    }
    // Moravskoslezský kraj
    if (uzemiOkresu.indexOf('3801') != -1 && uzemiOkresu.indexOf('3802') != -1 && uzemiOkresu.indexOf('3803') != -1 && uzemiOkresu.indexOf('3804') != -1 && uzemiOkresu.indexOf('3806') != -1 && uzemiOkresu.indexOf('3807') != -1) {
        uzemiKraje.push('132');
        Remove(uzemiOkresu, '3801');
        Remove(uzemiOkresu, '3802');
        Remove(uzemiOkresu, '3803');
        Remove(uzemiOkresu, '3804');
        Remove(uzemiOkresu, '3806');
        Remove(uzemiOkresu, '3807');
    }

    var uzemiList = [];

    for (var a = 0; a < uzemiKraje.length; a++) {
        var uzemi = {};
        uzemi.kraj = uzemiKraje[a];
        uzemi.nazev = '<b><u>' + KRAJE_NAZVY[uzemiKraje[a]] + '</u></b>';
        uzemi.okres = 0;
        uzemi.orp = 0;
        uzemiList.push(uzemi);
    }

    for (var b = 0; b < uzemiOkresu.length; b++) {
        var uzemi = {};
        var findOrp = orp.filter(function(e) {
            return e.okres.id == uzemiOkresu[b];
        });
        if (findOrp.length > 0) {
            uzemi.kraj = findOrp[0].kraj.id;
            uzemi.okres = findOrp[0].okres.id;
            uzemi.orp = 0;
            uzemi.nazev = '<u>Okres ' + findOrp[0].okres.nazev + '</u>';
            uzemiList.push(uzemi);
        }
    }

    for (var c = 0; c < orp_pole.length; c++) {
        var uzemi = {};
        var findOrp = orp.filter(function(e) {
            return e.id == orp_pole[c];
        });
        if (findOrp.length > 0) {
            uzemi.kraj = findOrp[0].kraj.id;
            uzemi.okres = findOrp[0].okres.id;
            uzemi.orp = orp_pole[c];
            uzemi.nazev = 'ORP ' + findOrp[0].nazev;
            uzemiList.push(uzemi);
        }
    }

    uzemiList.sort(function (a, b) {
        var kraj1 = parseFloat(a.kraj);
        var kraj2 = parseFloat(b.kraj);
        var okres1 = parseFloat(a.okres);
        var okres2 = parseFloat(b.okres);
        var orp1 = parseFloat(a.orp);
        var orp2 = parseFloat(b.orp);

        if (kraj1 < kraj2) return -1;
        if (kraj1 > kraj2) return 1;
        if (okres1 < okres2) return -1;
        if (okres1 > okres2) return 1;
        if (orp1 < orp2) return -1;
        if (orp1 > orp2) return 1;
        return 0;
    });

    if (omezitNaKraj != -1) {
        var uzemiTmp = [];

        for (var i = 0; i < uzemiList.length; i++) {
            // Pokud se jedná o hlavní kraj
            if (omezitNaKraj == uzemiList[i].kraj) {
                // Dáme na začátek seznamu
                uzemiTmp.push(uzemiList[i]);
            }
        }

        uzemiList = uzemiTmp;
    }

    for (var d = 0; d < uzemiList.length; d++) {
        if (d == 0 && omezitNaKraj == -1) {
            if (uzemiList[d].okres != 0) {
                resultText += '<b><u>' + KRAJE_NAZVY[uzemiList[d].kraj] + '</u></b> (';
            }
        }
        if (d > 0 && uzemiList[d].kraj != uzemiList[d-1].kraj && uzemiList[d-1].okres != 0 && omezitNaKraj == -1) {
            resultText = resultText.substring(0, resultText.length-2);
            resultText += ") – ";
        }
        if (d > 0 && uzemiList[d].kraj != uzemiList[d-1].kraj && uzemiList[d].okres != 0 && omezitNaKraj == -1) {
            resultText += '<b><u>' + KRAJE_NAZVY[uzemiList[d].kraj] + '</u></b> (';
        }

        resultText += uzemiList[d].nazev + ', ';

        if (d == (uzemiList.length-1) && uzemiList[d].okres != 0 && omezitNaKraj == -1) {
            resultText = resultText.substring(0, resultText.length-2);
            resultText += "), ";
        }
    }

    if (uzemiList.length > 0) {
        resultText = resultText.substring(0, resultText.length-2) + '\n';
    }

    // Česká republika
    if (resultText == '<b><u>Hlavní město Praha</u></b>, <b><u>Středočeský kraj</u></b>, <b><u>Jihočeský kraj</u></b>, <b><u>Plzeňský kraj</u></b>, <b><u>Karlovarský kraj</u></b>, <b><u>Ústecký kraj</u></b>, <b><u>Liberecký kraj</u></b>, <b><u>Královéhradecký kraj</u></b>, <b><u>Pardubický kraj</u></b>, <b><u>Kraj Vysočina</u></b>, <b><u>Jihomoravský kraj</u></b>, <b><u>Olomoucký kraj</u></b>, <b><u>Moravskoslezský kraj</u></b>, <b><u>Zlínský kraj</u></b>\n') {
        resultText = '<b><u>ČESKÁ REPUBLIKA</u></b>';
    }

    resultText += '|' + uzemiList.length;

    return resultText;
}

function PrintVyska(info) {
    var vyskaText = '';

    if (info && info.vyska) {
        var vyska = info.vyska.substring(1, info.vyska.length - 1);
        var vyskaSplit = vyska.split('-');

        if (vyskaSplit.length == 2) {
            if (vyskaSplit[0] && vyskaSplit[1]) {
                vyskaText = '<br/>mezi ' + Math.round(vyskaSplit[0] * 0.3048) + ' a ' + Math.round(vyskaSplit[1] * 0.3048) + ' m n.m.';
            } else if (vyskaSplit[0]) {
                vyskaText = '<br/>nad ' + Math.round(vyskaSplit[0] * 0.3048) + ' m n.m.';
            } else if (vyskaSplit[1]) {
                vyskaText = '<br/>pod ' + Math.round(vyskaSplit[1] * 0.3048) + ' m n.m.';
            }
        } else {
            vyskaText = '<br/>' + Math.round(vyska * 0.3048);
        }
    }

    return vyskaText;
}

function PrintInfo(info, ref_info) {
    var resultText = '';

    if (info) {
        if (info.jistota_kod == 'Observed') {
            vyskyt = '<b>Výskyt jevu</b><br>';
        } else {
            vyskyt = '';
        }
        if (info.popis) {
            var upr_info = info.popis.replace(/<br\/>/g,' ');
        }
        if (info.hydroPredpoved) {
            var upr_hydro = info.hydroPredpoved.replace(/\t/g,'&emsp;');
            upr_hydro = upr_hydro.replace(/\n/g,'<br>');
        }
        if (info.doporuceni) {
            var upr_doporuceni = info.doporuceni.replace(/<br\/>/g,' ');
            upr_doporuceni = upr_doporuceni.replace(/hasičské záchranné služby/g,'hasičského záchranného sboru');
        }
    }

    if (ref_info) {
        if (ref_info.jistota_kod == 'Observed') {
            ref_vyskyt = '<b>Výskyt jevu</b><br>';
        } else {
            ref_vyskyt = '';
        }
        if (ref_info.popis) {
            var ref_upr_info = ref_info.popis.replace(/<br\/>/g,' ');
        }
        if (ref_info.hydroPredpoved) {
            var ref_upr_hydro = ref_info.hydroPredpoved.replace(/\t/g,'&emsp;');
            ref_upr_hydro = ref_upr_hydro.replace(/\n/g,'<br>');
        }
        if (ref_info.doporuceni) {
            var ref_upr_doporuceni = ref_info.doporuceni.replace(/<br\/>/g,' ');
            ref_upr_doporuceni = ref_upr_doporuceni.replace(/hasičské záchranné služby/g,'hasičského záchranného sboru');
        }
    }

    if (info) {
        nactiUzemi = JevUzemi(info);
        pole_uzemi = nactiUzemi.split('|');
        uzemi_seznam = pole_uzemi[0];
        uzemi_count = pole_uzemi[1];
    }
    
    if (ref_info) {
        ref_nactiUzemi = JevUzemi(ref_info);
        ref_pole_uzemi = ref_nactiUzemi.split('|');
        ref_uzemi_seznam = ref_pole_uzemi[0];
        ref_uzemi_count = ref_pole_uzemi[1];
    }

    if (uzemi_count > 0) {
        resultText += '<br/><div><table class="tg" width="100%" border="1 ">';

        // Hlavička
        resultText += '<tr>';
        resultText += '<td width="20%">' + (info != null ? vyskyt : '');
        resultText += (info != null ? JEVY_NAZVY[info.stupen_kod] : '');
        resultText += (info != null ? PrintVyska(info) : '') + '</td>';
        resultText += '<td width="20%" style="background-color: ' + PozadiColor(info) + ';">' + (info != null ? GetWarningColor(info) : '') + '</td>';

        if ((info != null && info.SVRS == '1') || (ref_info != null && ref_info.SVRS == '1')) {
            resultText += '<td>do odvolání</td>';
        } else {
            resultText += '<td><table class="no" border="0">';
                resultText += '<tr><td>' + (info != null ? ZobrazDatum(info.dc_zacatek, 'short') : '') + '</td>';
                resultText += '<td>&nbsp;–&nbsp;</td>';
                resultText += '<td>' + (info != null ?  ZobrazDatum(info.dc_konec, 'short', 1) : '') + '</td></tr>';
            resultText += '</table></td>';
        }
        resultText += '</tr>';

        // Popis
        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Popis:</b> ' + (info != null ? upr_info : '') + '</td>';
        resultText += '</tr>';

        // Hydrologická zpráva
        if (info && (info.hydroPredpoved)) {
            resultText += '<tr>';
            resultText += '<td colspan="3"><b>Hydrologická regionální informační zpráva</b>: ' + (info != null ? upr_hydro : '') + '</td>';
            resultText += '</tr>';
        }

        // Doporučení
        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Doporučení:</b> ' + (info != null ? upr_doporuceni : '') + '</td>';
        resultText += '</tr>';

        // Územní platnost
        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Územní platnost:</b> ' + (info != null ? uzemi_seznam : '') + '</td>';
        resultText += '</tr>';

        resultText += '</table></div>';
    }

    return resultText;
}

var orpSort = orp;
orpSort.sort(function (a, b) {
    var kraj1 = parseFloat(a.kraj.id);
    var kraj2 = parseFloat(b.kraj.id);
    var okres1 = parseFloat(a.okres.id);
    var okres2 = parseFloat(b.okres.id);
    var orp1 = parseFloat(a.id);
    var orp2 = parseFloat(b.id);

    if (kraj1 < kraj2) return -1;
    if (kraj1 > kraj2) return 1;
    if (okres1 < okres2) return -1;
    if (okres1 > okres2) return 1;
    if (orp1 < orp2) return -1;
    if (orp1 > orp2) return 1;
    return 0;
});

if (omezitNaKraj != -1) {
    var orpTmp = [];

    for (var i = 0; i < orp.length; i++) {
        // Pokud se jedná o hlavní kraj
        if (omezitNaKraj == orp[i].kraj.id) {
            // Dáme na začátek seznamu
            orpTmp.push(orp[i]);
        }
    }

    orp = orpTmp;
}

// Samotná zpráva
var resultText = '';
var krajList = [];
var ref_krajList = [];
var vytvoreni = vystraha.dc_odeslano;

// Připravíme jednotlivé info jevy
if (vystraha.info && vystraha.info.length > 0) {
    infoList = PrepareInfo(vystraha);
    krajList = PrepareKraje(orp, infoList);
}

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0) {
    ref_infoList = PrepareInfo(ref_vystraha);
    ref_krajList = PrepareKraje(orp, ref_infoList);
}

// Hlavička HTML stránky
resultText += '<!DOCTYPE html>';
resultText += '<HTML>';
resultText += '<HEAD>';
resultText += '<META charset="utf-8"/>';
resultText += '<TITLE>' + vystraha.id + '</TITLE>';

resultText += '<style type="text/css">';
resultText += '    body {font-family:serif;font-size:13px;}';
resultText += '    .header {font-size:15px;text-align:center;}';
resultText += '    .tg  {border-collapse:collapse;border-spacing:0;}';
resultText += '    .tg td{padding:5px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;font-family:serif;font-size:12px;}';
resultText += '    .no  {border-collapse:collapse;border-spacing:0;}';
resultText += '    .no td{padding:0px 0px;border-style:none;border-width:0px;overflow:hidden;word-break:normal;font-family:serif;font-size:12px;}';
resultText += '    @media print {';
resultText += '        div {page-break-inside: avoid;}';
resultText += '    }';
resultText += '</style>';

resultText += '</HEAD>';
resultText += '<BODY>';

if (distrSeznamNahore == true) {
    resultText += 'Distribuce: ';

    var dist = '';

    // Vytáhneme informaci, kterých krajů se výstraha týká
    for (var k = 0; k < krajList.length; k++) {
        var found = krajList[k].info.length > 0 || (ref_krajList.length > 0 && ref_krajList[k].info.length > 0);

        for (var o = 0; o < krajList[k].okresList.length && !found; o++) {
            found = krajList[k].okresList[o].info.length > 0 || (ref_krajList.length > 0 && ref_krajList[k].okresList[o].info.length > 0);

            for (var ol = 0; ol < krajList[k].okresList[o].orpList.length && !found; ol++) {
                found = krajList[k].okresList[o].orpList[ol].info.length > 0 || (ref_krajList.length > 0 && ref_krajList[k].okresList[o].orpList[ol].info.length > 0);
            }
        }

        if (found) {
            dist += (dist ? ', ' : '') + KRAJE_KODY[krajList[k].id];
        }
    }

    if (krajList.length == 0) {
        for (var k = 0; k < ref_krajList.length; k++) {
            var found = ref_krajList[k].info.length > 0;

            for (var o = 0; o < ref_krajList[k].okresList.length && !found; o++) {
                found = ref_krajList[k].okresList[o].info.length > 0;

                for (var ol = 0; ol < ref_krajList[k].okresList[o].orpList.length && !found; ol++) {
                    found = ref_krajList[k].okresList[o].orpList[ol].info.length > 0;
                }
            }

            if (found) {
                dist += (dist ? ', ' : '') + KRAJE_KODY[ref_krajList[k].id];
            }
        }
    }

    resultText += dist + '<hr/>';
}

var found = false;
if (vystraha.ucel == 'Actual') {
    // Dohledáme, zda máme alespoň jeden jev, který není OUTLOOK
    for (var k = 0; k < krajList.length && found == false; k++) {
        for (var i = 0; i < krajList[k].info.length && found == false; i++) {
            info = krajList[k].info[i];

            if (info.jev_kod && info.jev_kod != 'OUTLOOK') {
                found = true;
            }
        }

        // Výstrahy pro okres
        for (var o = 0; o < krajList[k].okresList.length && found == false; o++) {
            for (var i = 0; i < krajList[k].okresList[o].info.length; i++) {
                info = krajList[k].okresList[o].info[i];

                if (info.jev_kod && info.jev_kod != 'OUTLOOK') {
                    found = true;
                }
            }

            // Výstrahy pro orp
            for (var ol = 0; ol < krajList[k].okresList[o].orpList.length && found == false; ol++) {
                for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++) {
                    info = krajList[k].okresList[o].orpList[ol].info[i];

                    if (info.jev_kod && info.jev_kod != 'OUTLOOK') {
                        found = true;
                    }
                }
            }
        }
    }
}

// Zjistíme zda je někde příznak HPPS, SIVS nebo SVRS
var hpps = false;
var sivs = false;
var svrs = false;

// Výstrahy pro kraj
for (var k = 0; k < krajList.length && (hpps == false || sivs == false || svrs == false); k++) {
    for (var i = 0; i < krajList[k].info.length && (hpps == false || sivs == false || svrs == false); i++) {
        info = krajList[k].info[i];

        if (info.HPPS && info.HPPS == '1') {
            hpps = true;
        }

        if (info.SIVS && info.SIVS == '1') {
            sivs = true;
        }

        if (info.SVRS && info.SVRS == '1') {
            svrs = true;
        }
    }

    // Výstrahy pro okres
    for (var o = 0; o < krajList[k].okresList.length && (hpps == false || sivs == false || svrs == false); o++) {
        for (var i = 0; i < krajList[k].okresList[o].info.length; i++) {
            info = krajList[k].okresList[o].info[i];

            if (info.HPPS && info.HPPS == '1') {
                hpps = true;
            }

            if (info.SIVS && info.SIVS == '1') {
                sivs = true;
            }

            if (info.SVRS && info.SVRS == '1') {
                svrs = true;
            }
        }

        // Výstrahy pro orp
        for (var ol = 0; ol < krajList[k].okresList[o].orpList.length && (hpps == false || sivs == false || svrs == false); ol++) {
            for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++) {
                info = krajList[k].okresList[o].orpList[ol].info[i];

                if (info.HPPS && info.HPPS == '1') {
                    hpps = true;
                }

                if (info.SIVS && info.SIVS == '1') {
                    sivs = true;
                }

                if (info.SVRS && info.SVRS == '1') {
                    svrs = true;
                }
            }
        }
    }
}

// Text v těle
switch (vystraha.ucel) {
    case 'Exercise' :
    case 'System' :
    case 'Test' :
        header = 'ÚČELOVÁ INFORMACE ČHMÚ – TESTOVACÍ ZPRÁVA';
        if (svrs && !sivs && !hpps) {
            header += '<br/>SMOGOVÝ VAROVNÝ A REGULAČNÍ SYSTÉM';
        }
        if (sivs && !hpps) {
            header += '<br/>SYSTÉM INTEGROVANÉ VÝSTRAŽNÉ SLUŽBY';
        }
        if (hpps) {
            header += '<br/>PŘEDPOVĚDNÍ POVODŇOVÁ SLUŽBA ČHMÚ';
        }
    break;
    case 'Actual' :
    default :
        header = 'VÝSTRAHA ČHMÚ';
        if (svrs && !sivs && !hpps) {
            header = 'ZPRÁVA SMOGOVÉHO VAROVNÉHO A REGULAČNÍHO SYSTÉMU';
        }
        if (sivs && !hpps) {
            header += '<br/>SYSTÉM INTEGROVANÉ VÝSTRAŽNÉ SLUŽBY';
        }
        if (hpps) {
            header += '<br/>VÝSTRAHA PŘEDPOVĚDNÍ POVODŇOVÉ SLUŽBY ČHMÚ';
        }
        if (!found) {
            header = 'INFORMAČNÍ ZPRÁVA ČHMÚ';
        }
    break;
}

resultText += '<div class="header">' + header + '</div>';
resultText += '<br/>Zpráva č. ' + vystraha.id.substring(vystraha.id.length - 6);
resultText += '<br/>Odesláno: ' + ZobrazDatum(vystraha.dc_odeslano, 'long');

if (vystraha.reference) {
    var referenceSplit = vystraha.reference.split(',');
    resultText += '<br/>Zpráva aktualizuje předchozí zprávu č. ' + referenceSplit[1].substring(referenceSplit[1].length - 6) + ' vydanou ' + referenceSplit[2].substring(8, 10) + '.' + referenceSplit[2].substring(5, 7) + '.' + referenceSplit[2].substring(0, 4) + ' v ' + referenceSplit[2].substring(11, 19) + ' hodin';
}

resultText += vystraha.poznamka ? '<br/>Poznámka: ' + vystraha.poznamka : '';

resultText += '<br/>Územní platnost: ';
if (omezitNaKraj == '-1') {
    resultText += 'Česká republika';
} else {
    resultText += KRAJE_NAZVY[omezitNaKraj];
}

resultText += '<hr/>';

var empty = true;

if (vystraha.info && vystraha.info.length > 0) {
    // Najdeme všechny situace
    var situace = [];

    for (var i = 0; i < vystraha.info.length; i++) {
        if (vystraha.info[i].situace) {
            if (situace.indexOf(vystraha.info[i].situace) == -1) {
                // Vložíme situaci, kterou ještě nemáme
                situace.push(vystraha.info[i].situace);
            }
        }
    }

    if (situace.length > 0) {
        var upr_situace = situace[0].replace(/<br\/>/g,' ');
        resultText += '<br/><b>Meteorologická situace:</b> ' + upr_situace;
        resultText += '<hr/>';
    }

    for (x = 0; x < infoList.length; x++) {
        var info = infoList[x];
        resultText += PrintInfo(info);
        empty = false;
    }
}

if (empty) {
    resultText += '<br/>Na zvoleném území není v platnosti žádný nebezpečný jev.';
}

if (distrSeznamNahore == false) {
    resultText += '<hr/>';
    resultText += '<br/>Distribuce: ';

    var dist = '';

    // Vytáhneme informaci, kterých krajů se výstraha týká
    for (var k = 0; k < krajList.length; k++) {
        var found = krajList[k].info.length > 0 || (ref_krajList.length > 0 && ref_krajList[k].info.length > 0);

        for (var o = 0; o < krajList[k].okresList.length && !found; o++) {
            found = krajList[k].okresList[o].info.length > 0 || (ref_krajList.length > 0 && ref_krajList[k].okresList[o].info.length > 0);

            for (var ol = 0; ol < krajList[k].okresList[o].orpList.length && !found; ol++) {
                found = krajList[k].okresList[o].orpList[ol].info.length > 0 || (ref_krajList.length > 0 && ref_krajList[k].okresList[o].orpList[ol].info.length > 0);
            }
        }

        if (found) {
            dist += (dist ? ', ' : '') + KRAJE_KODY[krajList[k].id];
        }
    }

    if (krajList.length == 0) {
        for (var k = 0; k < ref_krajList.length; k++) {
            var found = ref_krajList[k].info.length > 0;

            for (var o = 0; o < ref_krajList[k].okresList.length && !found; o++) {
                found = ref_krajList[k].okresList[o].info.length > 0;

                for (var ol = 0; ol < ref_krajList[k].okresList[o].orpList.length && !found; ol++) {
                    found = ref_krajList[k].okresList[o].orpList[ol].info.length > 0;
                }
            }

            if (found) {
                dist += (dist ? ', ' : '') + KRAJE_KODY[ref_krajList[k].id];
            }
        }
    }

    resultText += dist;
}

resultText += '<br/>';
resultText += '<br/>';

// Ukončení stránky
resultText += '</BODY>';
resultText += '</HTML>';

return resultText;
