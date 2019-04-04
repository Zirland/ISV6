// Verze 36

#import "CHMU-CISELNIK";
#import "CHMU-DATUMY";

var zacatky = [];
var konce = [];
var seznjevu = [];

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

var resultText = vystupText = '';
var sms1 = sms2 = '';

if (vystraha.info)
{
    var poleJevy = [];
    // Naplníme si seznam kódů jevů z výstrahy
    for (var i = 0; i < vystraha.info.length; i++) {
        // Z výpisu vyloučíme jevy Výhled nebezpečných jevů
        if (vystraha.info[i].stupen_kod != 'OUTLOOK') { 
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
                        konec = 99999999999999;
                        if (vystraha.info[i].dc_konec) {
                            konec = Normalize(vystraha.info[i].dc_konec);
                        }
                        konce.push(konec);

                        zahajeni = ZobrazDatumSMS(zacatek);
                        ukonceni = ZobrazDatumSMS(konec, 1);
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
                resultText += seznkraje + oddelovac;
                sms1 = resultText;
            } else {
                if (detailni) {
                    resultText += JEVY_NAZVY[poleJevy[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
                    sms1 += JEVY_NAZVY[poleJevy[h]] + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += JEVY_NAZVY[poleJevy[h]] + oddelovac;
                    sms1 += JEVY_NAZVY[poleJevy[h]] + oddelovac;
                }
            }
        }
    }

    // Vypočítáme celkovou dobu platnosti výstrahy
    starty = Math.min.apply(null, zacatky);
    start = starty.toString();

    endy = Math.max.apply(null, konce);
    end = endy.toString();

    total_zahajeni = ZobrazDatumSMS(start);
    total_ukonceni = ZobrazDatumSMS(end, 1);

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
        if (omezitNaKraj == -1 || !detailni) {
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
zacatky = konce = seznjevu = [];

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0)
{
    var poleJevy2 = [];
    // Naplníme si seznam kódů jevů z výstrahy
    for (var i = 0; i < ref_vystraha.info.length; i++) {
        // Z výpisu vyloučíme jevy Výhled nebezpečných jevů a vypršelé jevy
        if (ref_vystraha.info[i].stupen_kod != 'OUTLOOK' && !UkoncenyJev(ref_vystraha.info[i].dc_konec, vystraha.dc_odeslano)) { 
            poleJevy2.push(ref_vystraha.info[i].stupen_kod);
        }
    }

    // Promažeme duplicity
    poleJevy2 = removeDuplicates(poleJevy2);

    // Vezmeme kód jevu a najdeme si všechny časové období v tomto kraji.
    for (var h = 0; h < poleJevy2.length; h++) {
        var jevKrajeList2 = [];
        for (var i = 0; i < ref_vystraha.info.length; i++) {
            if (poleJevy2[h] == ref_vystraha.info[i].stupen_kod) {
                var found = omezitNaKraj == -1;
                for (var j = 0; j < ref_vystraha.info[i].kraj.length && !found; j++) {
                    found = ref_vystraha.info[i].kraj[j].UID == omezitNaKraj;
                }
                for (var j = 0; j < ref_vystraha.info[i].kraj.length; j++) {
                    if (found) {
                        // Pokud jsme našli výskyt jevu v kraji, připíšeme kraj do seznamu
                        jevKrajeList2.push(ref_vystraha.info[i].kraj[j].UID);

                        zacatek = Normalize(ref_vystraha.info[i].dc_zacatek);
                        zacatky.push(zacatek);
                        konec = 99999999999999;
                        if (ref_vystraha.info[i].dc_konec) {
                            konec = Normalize(ref_vystraha.info[i].dc_konec);
                        }
                        konce.push(konec);

                        zahajeni = ZobrazDatumSMS(zacatek);
                        ukonceni = ZobrazDatumSMS(konec, 1);
                    }
                }
            }
        }
        // Vymažeme duplicity, kdy je v jednom kraji jev opakovaně a následně kraje seřadíme
        jevKrajeList2 = removeDuplicates(jevKrajeList2);
        jevKrajeList2 = jevKrajeList2.sort(function (a, b) {return a-b});

        // Pokud máme ve zvoleném kraji výstrahu, přípravíme tělo se seznamem jevů, případně seznamem krajů a detailní platností
        if (jevKrajeList2.length > 0) {
            if (omezitNaKraj == -1) {
                resultText += JEVY_NAZVY[poleJevy2[h]];
                resultText += ' pro kraje ';

                var seznkraje = '';

                for (var t = 0; t < jevKrajeList2.length; t++) {
                    seznkraje += KRAJE_KODY[jevKrajeList2[t]] + ', ';
                }
                seznkraje = seznkraje.substring(0, seznkraje.length-2);
                resultText += seznkraje + oddelovac;
            } else {
                if (detailni) {
                    resultText += JEVY_NAZVY[poleJevy2[h]] + ' do ' + ukonceni + oddelovac;
                } else {
                    resultText += JEVY_NAZVY[poleJevy2[h]] + oddelovac;
                }
            }
        }
    }

    sms2 += resultText;

    // Vypočítáme celkovou dobu platnosti výstrahy
    starty = Math.min.apply(null, zacatky);
    start = starty.toString();

    endy = Math.max.apply(null, konce);
    end = endy.toString();

    total_zahajeni = ZobrazDatumSMS(start);
    total_ukonceni = ZobrazDatumSMS(end, 1);

    if (start != 'Infinity') {
        // Doplníme o celkovou platnost (celostátní a souhrnná sestava) a na GŘ také odkaz na OPIN WOCZ59
        if (omezitNaKraj == -1 || !detailni) {
            sms2 += 'Platnost do ' + total_ukonceni + oddelovac;
        }
    }
}

if (sms1 == sms2) {
    vystupText = '';
}
