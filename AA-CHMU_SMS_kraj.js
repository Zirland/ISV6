//------ Automatická akce "Výstraha SMS pro kraj" ----- 
//!JS
// Verze 16

// zde např. Kraj Vysočina. Číselník krajů viz níže
var omezitNaKraj = 108;
var detailni = 0;

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
// viz dokumentace k [CHMU-SMS]

// zde vytvoříme tělo SMS dle obsahu CAP pomocí skriptu z knihovny
#import "CHMU_SMS_KRAJ"; 

// Upozorňuji, že tělo SMS zprávy nekončí zalomením řádku. Já si proto odřádkuji. Ale vy nemusíte, pokud nechcete.
vystupText += "\n";

// Podpis na konci každé SMS.
vystupText += "OPIS GŘ HZS ČR";
print(vystupText);

//----- Knihovna JS "CHMU_SMS_KRAJ" -----
//!JS
// Verze 16
var zacatky = [];
var konce = [];
var seznjevu = [];

var KRAJE_KODY  = { "19": "PHA", "27": "SČK", "35": "JČK", "43": "PLK", "51": "KVK", "60": "ULK", "78": "LIK", "86": "KHK", "94": "PAK", "108": "VYK", "116": "JMK", "124": "OLK", "132": "MSK", "141": "ZLK" };

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
    "REG.NO2" : "Regulace NO2",
};

// Odstranění duplicitních výskytů kódů jevů
function removeDuplicates(arr) {
    var unique_array = []
    for(var i = 0;i < arr.length; i++){
        if(unique_array.indexOf(arr[i]) == -1){
            unique_array.push(arr[i])
        }
    }
    return unique_array
}

// Úprava formátu data
function Normalize(datum) {
    var datumString = datum.toString();

    datumDen = datumString.substring(8,10);
    datumMesic = datumString.substring(5,7);
    datumRok = datumString.substring(0,4)
    datumCas = datumString.substring(11,16);
    datumHodiny = datumCas.substring(0,2);
    datumMinuty = datumCas.substring(3,5);

    datum = datumRok + datumMesic + datumDen + datumHodiny + datumMinuty;

    return datum;
}

function ZobrazDatum(datum) {
    if (datum == 999999999999) {
        format_datum = 'odvolání';
    } else {
        var normDatum = datum.toString();

        normDatumRok = normDatum.substring(0,4);
        normDatumMesic = normDatum.substring(4,6);
        normDatumDen = normDatum.substring(6,8);
        normDatumHodina = normDatum.substring(8,10);
        normDatumMinuta = normDatum.substring(10,12);

        format_datum = Number(normDatumDen) + "." + Number(normDatumMesic) + ". " + normDatumHodina + ":" + normDatumMinuta;
    }

    return format_datum;
}

var resultText = vystupText = '';

if (vystraha.info)
{
    var poleJevy = [];
    // Naplníme si seznam kódů jevů z výstrahy
    for (var i = 0; i < vystraha.info.length; i++) {
        // Z výpisu vyloučíme jevy Výhled nebezpečných jevů
        if (vystraha.info[i].stupen_kod != "OUTLOOK") { 
            poleJevy.push(vystraha.info[i].stupen_kod);
        }
    }

    // Promažeme duplicity
    poleJevy = removeDuplicates(poleJevy);

    // Vezmeme kód jevu a najdeme si všechny časové období v tomto kraji.
    for (var h = 0; h < poleJevy.length; h++) {
        var jevKrajeList = [];
        for (var i = 0; i < vystraha.info.length; i++) {
            if (poleJevy[h] == vystraha.info[i].stupen_kod) {
                var found = omezitNaKraj == -1;
                for (var j = 0; j < vystraha.info[i].kraj.length && !found; j++) {
                    found = vystraha.info[i].kraj[j].UID == omezitNaKraj;
                }
                for (var j = 0; j < vystraha.info[i].kraj.length; j++) {
                    if (found) {
                        // Pokud jsme našli výskyt jevu v kraji, připíšeme kraj do seznamu
                        jevKrajeList.push(vystraha.info[i].kraj[j].UID);
                        warn_type = "SVRS";
                        if (vystraha.info[i].SIVS == "1") {
                            warn_type = "SIVS";
                        }
                        if (vystraha.info[i].HPPS == "1") {
                            warn_type = "HPPS";
                        }
                        seznjevu.push(warn_type);
                        zacatek = Normalize(vystraha.info[i].dc_zacatek);
                        zacatky.push(zacatek);
                        konec = 999999999999;
                        if (vystraha.info[i].dc_konec) {
                            konec = Normalize(vystraha.info[i].dc_konec);
                        }
                        konce.push(konec);

                        zahajeni = ZobrazDatum(zacatek);
                        ukonceni = ZobrazDatum(konec);
                    }
                }
            }
        }
        // Vymažeme duplicity, kdy je v jednom kraji jev opakovaně a následně kraje seřadíme
        jevKrajeList = removeDuplicates(jevKrajeList);
        jevKrajeList = jevKrajeList.sort(function (a, b) {return a-b});

        // Pokud máme ve zvoleném kraji výstrahu, přípravíme tělo se seznamem jevů, případně seznamem krajů a detailní platností
        if (jevKrajeList.length > 0) {
            if (omezitNaKraj == -1) {
                resultText += JEVY_NAZVY[poleJevy[h]];
                resultText += ' pro kraje ';

                var seznkraje = '';

                for (var t = 0; t < jevKrajeList.length; t++) {
                    seznkraje += KRAJE_KODY[jevKrajeList[t]] + ', ';
                }
                seznkraje = seznkraje.substring(0, seznkraje.length-2);
                resultText += seznkraje + '\n';
            } else {
                if (detailni) {
                    resultText += JEVY_NAZVY[poleJevy[h]] + ' od ' + zahajeni + ' do ' + ukonceni + '\n';
                } else {
                    resultText += JEVY_NAZVY[poleJevy[h]] + '\n';
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
    total_ukonceni = ZobrazDatum(end);

    // Sestavíme hlavičku zprávy
    rezim = "SVRS";
    if (seznjevu.indexOf("SIVS") > -1) {
        rezim = "SIVS";
    }
    if (seznjevu.indexOf("HPPS") > -1) {
        rezim = "HPPS";
    }

    if (start == "Infinity") {
        vystupText += 'Informace ČHMÚ: není v platnosti žádná výstraha.\n';
    } else {
        switch (vystraha.ucel) {
            case 'Exercise' :
                uvod = 'Cvičná zpráva '; break;
            case 'System' :
                uvod = 'Systémová zpráva '; break;
            case 'Test' :
                uvod = 'Testovací zpráva '; break;
            default : 
                uvod = 'Výstraha '; break;
            break;
        }

        switch (rezim) {
            case "HPPS" :
                uvod += 'HPPS: ';
            break;
            case "SIVS" :
                uvod += 'SIVS: ';
            break;
            case "SVRS" :
                uvod += 'SVRS: ';
            break;
        }

        vystupText += uvod;

        // Připojíme připravený výpis jevů
        vystupText += resultText;
        

        // Doplníme o celkovou platnost (celostátní a souhrnná sestava) a na GŘ také odkaz na OPIN WOCZ59
        if (omezitNaKraj == -1 || !detailni) {
            vystupText += 'Platnost od ' + total_zahajeni + ' do ' + total_ukonceni + '\n';
        }
        if (omezitNaKraj == -1) {
            vystupText += 'Podrobnosti: http://bit.ly/2Sb0ItG\n';
        }
    }
}

vystupText = vystupText.substring(0, vystupText.length-1);