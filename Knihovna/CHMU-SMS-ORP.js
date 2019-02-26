// Verze 29

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

// Připravíme si obsah výstrahy
function PrepareInfo (vystraha) {
    var infoList = [];

    // Připravíme si pole info jevů
    for (var i = 0; i < vystraha.info.length; i++)
    {
        var vyskaList = [];
        vystraha.info[i].orp = [];
        vystraha.info[i].vyska = '';
        var orpSplit = vystraha.info[i].orp_list.toString().split(',');

        for (var j = 0; j < orpSplit.length; j++)
        {
            // Najdeme, jestli se nejedná o údaj s výškou
            var index = orpSplit[j].indexOf('[');
            // nemáme výšku, do seznamu přidáme kód ORP
            if (index == -1)
            {
                vystraha.info[i].orp.push(orpSplit[j]);
            }
            // máme výšku, do seznamu přidáme pouze kód ORP bez výšky
            else 
            {
                vystraha.info[i].orp.push(orpSplit[j].substring(0, index));
            }
        }

        // Pokud máme jev alespoň v jednom ORP
        if (vystraha.info[i].orp.length > 0)
        {
            infoList.push(vystraha.info[i]);
        }
    }

    var infoListFilter = [];
    for (var x = 0; x < infoList.length; x++) {
        // vyloučíme z výpisu SMS všechny Výhledy nebezpečných jevů
        if (infoList[x].jev_kod != 'OUTLOOK') {
            infoListFilter.push(infoList[x]);
        }
    }
    
    infoList = infoListFilter;

    return infoList;
}

var resultText = vystupText = '';
var sms1 = sms2 = '';
var infoList = [];

if (vystraha.info && vystraha.info.length > 0) {
    infoList = PrepareInfo(vystraha);
}

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0) {
    ref_infoList = PrepareInfo(ref_vystraha);
}

if (infoList) {
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

    var platne = [];

    // Vyhodnotíme zda jev platí v tomto ORP
    for (var h = 0; h < poleJevy.length; h++) {
        for (var i = 0; i < vystraha.info.length; i++) {
            if (poleJevy[h] == vystraha.info[i].stupen_kod) {
                var found = omezitNaOrp == -1;
                var orp_list = '';
                if (vystraha.info[i].orp) {
                    orp_list = vystraha.info[i].orp.toString();
                }
                var orp_pole = orp_list.split(',');
                orp_pole = orp_pole.sort(function (a, b) {return a-b});
                hledej = omezitNaOrp.toString();
                found = orp_pole.indexOf(hledej) > -1;
                if (found) {
                    platne.push(vystraha.info[i]);
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

    // Vypíšeme seznam platných jevů na tomto území, případně i včetně detailní platnosti
    for (j = 0; j < platne.length; j++) { 
        if (detailni) {
            resultText += JEVY_NAZVY[platne[j].stupen_kod] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
            sms1 += JEVY_NAZVY[platne[j].stupen_kod] + ' do ' + ukonceni + oddelovac;
        } else {
            resultText += JEVY_NAZVY[platne[j].stupen_kod] + oddelovac;
            sms1 = JEVY_NAZVY[platne[j].stupen_kod] + oddelovac;
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
                uvod += 'HPPS: ';
            break;
            case 'SIVS' :
                uvod += 'SIVS: ';
            break;
            case 'SVRS' :
                uvod += 'SVRS: ';
            break;
        }

        vystupText += uvod;

        // Připojíme připravený výpis jevů
        vystupText += resultText;

        // Doplníme o celkovou platnost (celostátní a souhrnná sestava) a na GŘ také odkaz na OPIN WOCZ59
        if (omezitNaOrp == -1 || !detailni) {
            vystupText += 'Platnost od ' + total_zahajeni + ' do ' + total_ukonceni + oddelovac;
            sms1 += 'Platnost do ' + total_ukonceni + oddelovac;
        }
        if (omezitNaOrp == -1) {
            vystupText += 'Podrobnosti: http://bit.ly/2Sb0ItG' + oddelovac;
        }
    }
    vystupText = vystupText.substring(0, vystupText.length - oddelovac.length);
}

resultText = '';
zacatky = konce = seznjevu = [];

if (typeof(ref_infoList) != 'undefined' && ref_infoList) {
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

    var platne2 = [];

    // Vyhodnotíme zda jev platí v tomto ORP
    for (var h = 0; h < poleJevy2.length; h++) {
        for (var i = 0; i < ref_vystraha.info.length; i++) {
            if (poleJevy2[h] == ref_vystraha.info[i].stupen_kod) {
                var found = omezitNaOrp == -1;
                var orp_list = '';
                if (ref_vystraha.info[i].orp) {
                    orp_list = ref_vystraha.info[i].orp.toString();
                }
                var orp_pole = orp_list.split(',');
                orp_pole = orp_pole.sort(function (a, b) {return a-b});
                hledej = omezitNaOrp.toString();
                found = orp_pole.indexOf(hledej) > -1;
                if (found) {
                    platne2.push(ref_vystraha.info[i]);
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

    // Vypíšeme seznam platných jevů na tomto území, případně i včetně detailní platnosti
    for (j = 0; j < platne2.length; j++) { 
        if (detailni) {
            resultText += JEVY_NAZVY[platne[j].stupen_kod] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
            sms2 += JEVY_NAZVY[platne[j].stupen_kod] + ' do ' + ukonceni + oddelovac;
        } else {
            resultText += JEVY_NAZVY[platne[j].stupen_kod] + oddelovac;
            sms2 = JEVY_NAZVY[platne[j].stupen_kod] + oddelovac;
        }
    }

    // Vypočítáme celkovou dobu platnosti výstrahy
    starty = Math.min.apply(null, zacatky);
    start = starty.toString();

    endy = Math.max.apply(null, konce);
    end = endy.toString();

    total_zahajeni = ZobrazDatumSMS(start);
    total_ukonceni = ZobrazDatumSMS(end, 1);

    if (start != 'Infinity') {
        // Doplníme o celkovou platnost (celostátní a souhrnná sestava) a na GŘ také odkaz na OPIN WOCZ59
        if (omezitNaOrp == -1 || !detailni) {
            sms2 += 'Platnost do ' + total_ukonceni + oddelovac;
        }
    }
}

if (sms1 == sms2) {
    vystupText = '';
}
