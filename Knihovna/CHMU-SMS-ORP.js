// Verze 43

#import "CHMU-CISELNIK";
#import "CHMU-DATUMY";

var zacatky = [];
var konce = [];
var seznjevu = [];

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

var resultText = vystupText = '';
var sms1 = sms2 = '';

if (vystraha.info) {
    var poleJevy = [];
    var platne = [];
    // Naplníme si seznam kódů jevů z výstrahy
    for (var i = 0; i < vystraha.info.length; i++) {
        // Z výpisu vyloučíme jevy Výhled nebezpečných jevů
        if (vystraha.info[i].stupen_kod != 'OUTLOOK' && (vystraha.info[i].orp_list.toString().split(',').indexOf(omezitNaOrp.toString()) > -1)) { 
            var pomKod = '';
            if (vystraha.info[i].jistota_kod == 'Observed') {
                pomKod += 'P';
            }
            pomKod += vystraha.info[i].stupen_kod;
            poleJevy.push(pomKod);
            platne.push(vystraha.info[i]);
        }
    }

    // Promažeme duplicity
    poleJevy = removeDuplicates(poleJevy);

    // Vyhodnotíme zda jev platí v tomto ORP
    for (var h = 0; h < poleJevy.length; h++) {
        var jevStart = jevEnd = [];
        for (var i = 0; i < platne.length; i++) {
            var pomKodIvnj = '';
            if (vystraha.info[i].jistota_kod == 'Observed') {
                pomKodIvnj = 'P';
            }
            if (poleJevy[h] == pomKodIvnj + platne[i].stupen_kod) {
                warn_type = 'SVRS';
                if (platne[i].SIVS == '1') {
                    warn_type = 'SIVS';
                }
                if (platne[i].HPPS == '1') {
                    warn_type = 'HPPS';
                }
                seznjevu.push(warn_type);
                zacatek = Normalize(platne[i].dc_zacatek);
                zacatky.push(zacatek);
                konec = 99999999999999;
                if (platne[i].dc_konec) {
                    konec = Normalize(platne[i].dc_konec);
                }
                konce.push(konec);

                jevStart.push(zacatek);
                jevEnd.push(konec);
            }
        }
        if (detailni) {
            jevStarty = Math.min.apply(null, jevStart);
            jevZacatek = jevStarty.toString();

            jevEndy = Math.max.apply(null, jevEnd);
            jevKonec = jevEndy.toString();

            zahajeni = ZobrazDatumSMS(jevZacatek);
            ukonceni = ZobrazDatumSMS(jevKonec, 1);

            resultText += JEVY_NAZVY[poleJevy[h]] + ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
            sms1 += JEVY_NAZVY[poleJevy[h]] + ' do ' + ukonceni + oddelovac;
        } else {
            resultText += JEVY_NAZVY[poleJevy[h]] + oddelovac;
            sms1 = JEVY_NAZVY[poleJevy[h]] + oddelovac;
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
        sms1 = vystupText;
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
        

        // Doplníme o celkovou platnost (souhrnná sestava) 
        if (!detailni) {
            vystupText += 'Platnost od ' + total_zahajeni + ' do ' + total_ukonceni + oddelovac;
            sms1 += 'Platnost do ' + total_ukonceni + oddelovac;
        }
    }
    vystupText = vystupText.substring(0, vystupText.length - oddelovac.length);
}

resultText = '';
zacatky = konce = [];

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0) {
    var poleJevy2 = [];
    var platne2 = [];
    // Naplníme si seznam kódů jevů z výstrahy
    for (var i = 0; i < ref_vystraha.info.length; i++) {
        // Z výpisu vyloučíme jevy Výhled nebezpečných jevů
        if (ref_vystraha.info[i].stupen_kod != 'OUTLOOK' && (ref_vystraha.info[i].orp_list.toString().split(',').indexOf(omezitNaOrp.toString()) > -1)) { 
            var pomKod2 = '';
            if (ref_vystraha.info[i].jistota_kod == 'Observed') {
                pomKod2 += 'P';
            }
            pomKod2 += ref_vystraha.info[i].stupen_kod;
            poleJevy2.push(pomKod2);
            platne2.push(ref_vystraha.info[i]);
        }
    }

    // Promažeme duplicity
    poleJevy2 = removeDuplicates(poleJevy2);

    // Vyhodnotíme zda jev platí v tomto ORP
    for (var h = 0; h < poleJevy2.length; h++) {
        var jevStart = jevEnd = [];
        for (var i = 0; i < platne2.length; i++) {
           var pomKodIvnj2 = '';
            if (ref_vystraha.info[i].jistota_kod == 'Observed') {
                pomKodIvnj2 = 'P';
            }
            if (poleJevy2[h] == pomKodIvnj + platne2[i].stupen_kod) {
                warn_type = 'SVRS';
                if (platne2[i].SIVS == '1') {
                    warn_type = 'SIVS';
                }
                if (platne2[i].HPPS == '1') {
                    warn_type = 'HPPS';
                }
                seznjevu.push(warn_type);
                zacatek = Normalize(platne2[i].dc_zacatek);
                zacatky.push(zacatek);
                konec = 99999999999999;
                if (platne2[i].dc_konec) {
                    konec = Normalize(platne2[i].dc_konec);
                }
                konce.push(konec);

                jevEnd.push(konec);
            }
        }
        if (detailni) {
            jevEndy = Math.max.apply(null, jevEnd);
            jevKonec = jevEndy.toString();

            ukonceni = ZobrazDatumSMS(jevKonec, 1);

            sms2 += JEVY_NAZVY[poleJevy2[h]] + ' do ' + ukonceni + oddelovac;
        } else {
            sms2 = JEVY_NAZVY[poleJevy2[h]] + oddelovac;
        }
    }

    // Vypočítáme celkovou dobu platnosti výstrahy
    starty = Math.min.apply(null, zacatky);
    start = starty.toString();

    endy = Math.max.apply(null, konce);
    end = endy.toString();

    total_zahajeni = ZobrazDatumSMS(start);
    total_ukonceni = ZobrazDatumSMS(end, 1);

    if (start == 'Infinity') {
        sms2 += 'Informace ČHMÚ: není v platnosti žádná výstraha.' + oddelovac;
    } else {
        if (!detailni) {
            sms2 += 'Platnost do ' + total_ukonceni + oddelovac;
        }
    }
}

if (sms1 == sms2) {
    vystupText = '';
}