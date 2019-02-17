//Verze 26

#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";

// Úprava formátu data
function Normalize(datum) {
    var datumString = datum.toString();

    datumDen = datumString.substring(8,10);
    datumMesic = datumString.substring(5,7);
    datumRok = datumString.substring(0,4)
    datumCas = datumString.substring(11,19);
    datumHodiny = datumCas.substring(0,2);
    datumMinuty = datumCas.substring(3,5);
    datumSekundy = datumCas.substring(6,8)

    datum = datumRok + datumMesic + datumDen + datumHodiny + datumMinuty + datumSekundy;

    return datum;
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
                format_datum = Number(normDatumDen) + '.' + Number(normDatumMesic) + '.' + normDatumRok + ' ' + normDatumHodina + ':' + normDatumMinuta + ':' + normDatumSekunda;
        }
        
    }

    return format_datum;
}

// Připravíme seznam jevů podle území
function PrepareInfo(orp, vystraha)
{
    var infoList = [];

    // Připravíme si pole info jevů
    for (var i = 0; i < vystraha.info.length; i++)
    {
        var vyskaList = [];
        vystraha.info[i].orp = [];
        vystraha.info[i].vyska = '';
        vystraha.info[i].krajPom = false;
        vystraha.info[i].okresPom = false;
        var orpSplit = vystraha.info[i].orp_list.toString().split(',');

        for (var j = 0; j < orpSplit.length; j++)
        {
            // Najdeme, jestli se nejedná o údaj s výškou
            var index = orpSplit[j].indexOf('[');
            if (index == -1)
            {
                vystraha.info[i].orp.push(orpSplit[j]);
            }
            else
            {
                var vyska = orpSplit[j].substring(index);
                if (vyskaList.indexOf(vyska) == -1)
                {
                    vyskaList.push(vyska);
                }
            }
        }

        // Pokud máme alespoň jedno ORP bez určení výšky
        if (vystraha.info[i].orp.length > 0)
        {
            infoList.push(vystraha.info[i]);
        }

        // Přes všechny dohledané výšky
        for (var v = 0; v < vyskaList.length; v++)
        {
            // Vytvoříme kopii pro danou výšku
            var info = JSON.parse(JSON.stringify(vystraha.info[i]));
            info.orp = [];
            info.vyska = vyskaList[v];

            // Při kopírování se nad datumy volá Date.toISOString() a pak se načte jako string,
            // převedeme tedy datumy zpět na typ datum
            info.dc_konec = new Date(info.dc_konec);
            info.dc_zacatek = new Date(info.dc_zacatek);

            for (var j = 0; j < orpSplit.length; j++)
            {
                // Záznam pro tuto výšku
                if (orpSplit[j].indexOf(vyskaList[v]) != -1)
                {
                    // Najdeme, kde výška začíná
                    var index = orpSplit[j].indexOf('[');
                    {
                        info.orp.push(orpSplit[j].substring(0, index));
                    }
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
    
    var krajList = [];
    var posledniKraj = {};
    var posledniOkres = {};
    var posledniOrp = {};
    var krajChange = true;
    var okresChange = true;

    for (var i = 0; i < orp.length; i++)
    {
        // Pokud se změnil kraj, tak ho přidáme do kolekce
        if (posledniKraj.id != orp[i].kraj.id)
        {
            // Uložíme si info jevy, které jsou pro celý kraj
            for (var j = 0; j < infoList.length; j++)
            {
                if (posledniKraj.info && infoList[j].krajPom)
                {
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
        }
        else
        {
            krajChange = false;
        }

        // Pokud se změnil okres, tak ho přidáme do kolekce
        if (posledniOkres.id != orp[i].okres.id)
        {
            // Uložíme si info jevy, které jsou pro celý okres
            for (var j = 0; j < infoList.length; j++)
            {
                if (posledniOkres.info && infoList[j].okresPom)
                {
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
        }
        else
        {
            okresChange = false;
        }

        // ORP se nám vždycky mění
        posledniOrp = {};
        posledniOrp.id = orp[i].id;
        posledniOrp.nazev = orp[i].nazev;
        posledniOrp.info = [];

        posledniOkres.orpList.push(posledniOrp);

        for (var j = 0; j < infoList.length; j++)
        {
            var maOrp = infoList[j].orp.indexOf(orp[i].id.toString()) != -1;

            if (posledniOrp.info && maOrp)
            {
                posledniOrp.info.push(infoList[j]);
            }

            if (krajChange)
            {
                infoList[j].krajPom = maOrp
            }
            else
            {
                infoList[j].krajPom &= maOrp;
            }

            if (okresChange)
            {
                infoList[j].okresPom = maOrp
            }
            else
            {
                infoList[j].okresPom &= maOrp;
            }
        }
    }

    // Uložíme si info jevy, které jsou pro celý kraj
    for (var j = 0; j < infoList.length; j++)
    {
        if (infoList[j].krajPom)
        {
            posledniKraj.info.push(infoList[j]);
        }
    }

    // Uložíme si info jevy, které jsou pro celý okres
    for (var j = 0; j < infoList.length; j++)
    {
        if (infoList[j].okresPom)
        {
            posledniOkres.info.push(infoList[j]);
        }
    }

    return krajList;
}

function PrintInfoList(krajList, ref_krajList)
{
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

    for (var k = 0; k < krajList.length; k++)
    {
        zpracovanyInfoStupen = [];
        ref_zpracovanyInfoStupen = [];
        first = true;

        if (ref_krajList.length > 0)
        {
            // Všechny, které jsme v daném kraji zrušili
            for (var ri = 0; ri < ref_krajList[k].info.length; ri++)
            {
                ref_info = ref_krajList[k].info[ri];
                found = false;

                // Zkusíme najít odpovídající záznam ve výstraze
                for (var i = 0; i < krajList[k].info.length; i++)
                {
                    if (krajList[k].info[i].jev_kod == ref_info.jev_kod)
                    {
                        found = true;
                        break;
                    }
                }

                // Pokud jsme výstrahu nenašli
                if (!found && zobrazitZmeny)
                {
                    if (first)
                    {
                        first = false;
                        resultText += '</div><br/><div><b>' + KRAJE_NAZVY[ref_krajList[k].id] + '</b>';
                        empty = false;
                    }

                    ref_zpracovanyInfoStupen.push(ref_info.jev_kod);
                    pomoc = PrintInfo(null, ref_info);
                    resultText += pomoc.split('|')[0];
                    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                }
            }
        }

        // Výstrahy pro celý kraj
        for (var i = 0; i < krajList[k].info.length; i++)
        {
            info = krajList[k].info[i];
            zpracovanyInfoStupen.push(info.jev_kod);
            ref_info = null;

            // Pokud máme referenční výstrahu
            if (ref_krajList.length > 0)
            {
                // Zkusíme najít odpovídající záznam v referenční / předchozí výstraze
                for (var ri = 0; ri < ref_krajList[k].info.length; ri++)
                {
                    if (ref_krajList[k].info[ri].jev_kod == info.jev_kod)
                    {
                        ref_info = ref_krajList[k].info[ri];
                        ref_zpracovanyInfoStupen.push(ref_info.jev_kod);
                        break;
                    }
                }
            }

            if (first)
            {
                first = false;
                resultText += '</div><br/><div><b>' + KRAJE_NAZVY[krajList[k].id] + '</b>';
                empty = false;
            }

            pomoc = PrintInfo(info, ref_info);
            resultText += pomoc.split('|')[0];
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);
        }

        // Výstrahy pro okres
        for (var o = 0; o < krajList[k].okresList.length; o++)
        {
            first = true;
            zpracovanyInfoStupenOkres = [];
            ref_zpracovanyInfoStupenOkres = [];

            if (ref_krajList.length > 0)
            {
                // Všechny, které jsme v daném okrese zrušili
                for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++)
                {
                    ref_info = ref_krajList[k].okresList[o].info[ri];
                    found = false;

                    // Pokud tato výstraha není již zpracovaná z pokrytí kraje
                    if (ref_zpracovanyInfoStupen.indexOf(ref_info.jev_kod) == -1)
                    {
                        if (zpracovanyInfoStupen.indexOf(ref_info.jev_kod) == -1)
                        {
                            // Zkusíme najít odpovídající záznam ve výstraze
                            for (var i = 0; i < krajList[k].okresList[o].info.length; i++)
                            {
                                if (krajList[k].okresList[o].info[i].jev_kod == ref_info.jev_kod)
                                {
                                    found = true;
                                    break;
                                }
                            }
                        }

                        // Pokud jsme výstrahu nenašli
                        if (!found && zobrazitZmeny)
                        {
                            if (first)
                            {
                                first = false;
                                resultText += '</div><br/><div><b>Okres ' + ref_krajList[k].okresList[o].nazev + '</b>';
                                empty = false;
                            }

                            ref_zpracovanyInfoStupenOkres.push(ref_info.jev_kod);
                            pomoc = PrintInfo(null, ref_info);
                            resultText += pomoc.split('|')[0];
                            zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                        }
                    }
                }
            }

            for (var i = 0; i < krajList[k].okresList[o].info.length; i++)
            {
                info = krajList[k].okresList[o].info[i];

                // Pokud zatím není zpracováno z pokrytí kraje
                if (zpracovanyInfoStupen.indexOf(info.jev_kod) == -1)
                {
                    zpracovanyInfoStupenOkres.push(info.jev_kod);
                    ref_info = null;

                    // Pokud máme referenční výstrahu
                    if (ref_krajList.length > 0)
                    {
                        // Pokud zatím není zpracováno z pokrytí kraje
                        if (ref_zpracovanyInfoStupen.indexOf(info.jev_kod) == -1)
                        {
                            for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++)
                            {
                                if (ref_krajList[k].okresList[o].info[ri].jev_kod == info.jev_kod)
                                {
                                    ref_info = ref_krajList[k].okresList[o].info[ri];
                                    ref_zpracovanyInfoStupenOkres.push(ref_info.jev_kod);
                                    break;
                                }
                            }
                        }
                    }

                    if (first)
                    {
                        first = false;
                        resultText += '</div><br/><div><b>Okres ' + krajList[k].okresList[o].nazev + '</b>';
                        empty = false;
                    }

                    pomoc = PrintInfo(info, ref_info);
                    resultText += pomoc.split('|')[0];
                    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                }
            }

            // Výstrahy pro orp
            for (var ol = 0; ol < krajList[k].okresList[o].orpList.length; ol++)
            {
                first = true;

                if (ref_krajList.length > 0)
                {
                    // Všechny, které jsme v daném ORP zrušili
                    for (var ri = 0; ri < ref_krajList[k].okresList[o].orpList[ol].info.length; ri++)
                    {
                        ref_info = ref_krajList[k].okresList[o].orpList[ol].info[ri];
                        found = false;

                        // Pokud tato výstraha není již zpracovaná z pokrytí kraje nebo okresu
                        if (ref_zpracovanyInfoStupen.indexOf(ref_info.jev_kod) == -1
                            && ref_zpracovanyInfoStupenOkres.indexOf(ref_info.jev_kod) == -1)
                        {
                            if (zpracovanyInfoStupen.indexOf(ref_info.jev_kod) == -1
                                && zpracovanyInfoStupenOkres.indexOf(ref_info.jev_kod) == -1)
                            {
                                // Zkusíme najít odpovídající záznam ve výstraze
                                for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++)
                                {
                                    if (krajList[k].okresList[o].orpList[ol].info[i].jev_kod == ref_info.jev_kod)
                                    {
                                        found = true;
                                        break;
                                    }
                                }
                            }

                            // Pokud jsme výstrahu nenašli
                            if (!found && zobrazitZmeny)
                            {
                                if (first)
                                {
                                    first = false;
                                    resultText += '</div><br/><div><b>ORP ' + ref_krajList[k].okresList[o].orpList[ol].nazev + '</b>';
                                    empty = false;
                                }

                                pomoc = PrintInfo(null, ref_info);
                                resultText += pomoc.split('|')[0];
                                zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                            }
                        }
                    }
                }

                for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++)
                {
                    info = krajList[k].okresList[o].orpList[ol].info[i];

                    // Pokud zatím není zpracováno z pokrytí kraje nebo okresu
                    if (zpracovanyInfoStupen.indexOf(info.jev_kod) == -1
                        && zpracovanyInfoStupenOkres.indexOf(info.jev_kod) == -1)
                    {
                        ref_info = null;

                        // Pokud máme referenční výstrahu
                        if (ref_krajList.length > 0)
                        {
                            // Pokud zatím není zpracováno z pokrytí kraje
                            if (ref_zpracovanyInfoStupen.indexOf(info.jev_kod) == -1
                                && ref_zpracovanyInfoStupenOkres.indexOf(info.jev_kod) == -1)
                            {
                                for (var ri = 0; ri < ref_krajList[k].okresList[o].orpList[ol].info.length; ri++)
                                {
                                    if (ref_krajList[k].okresList[o].orpList[ol].info[ri].jev_kod == info.jev_kod)
                                    {
                                        ref_info = ref_krajList[k].okresList[o].orpList[ol].info[ri];
                                        break;
                                    }
                                }
                            }
                        }

                        if (first)
                        {
                            first = false;
                            resultText += '</div><br/><div><b>ORP ' + krajList[k].okresList[o].orpList[ol].nazev + '</b>';
                            empty = false;
                        }

                        pomoc = PrintInfo(info, ref_info);
                        resultText += pomoc.split('|')[0];
                        zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                    }
                }
            }
        }
    }

    // Pokud nemáme původní výstrahu, ale máme jen referenční
    if (krajList.length == 0 && ref_krajList.length > 0 && zobrazitZmeny)
    {
        for (var k = 0; k < ref_krajList.length; k++)
        {
            first = true;

            // Všechny, které jsme v daném kraji zrušili
            for (var ri = 0; ri < ref_krajList[k].info.length; ri++)
            {
                ref_info = ref_krajList[k].info[ri];
                
                if (first)
                {
                    first = false;
                    resultText += '</div><br/><div><b>' + KRAJE_NAZVY[ref_krajList[k].id] + '</b>';
                    empty = false;
                }

                ref_zpracovanyInfoStupen.push(ref_info.jev_kod);
                pomoc = PrintInfo(null, ref_info);
                resultText += pomoc.split('|')[0];
                zmen = Number(zmen) + Number(pomoc.split('|')[1]);
            }

            // Výstrahy pro okres
            for (var o = 0; o < ref_krajList[k].okresList.length; o++)
            {
                first = true;
                ref_zpracovanyInfoStupenOkres = [];

                // Všechny, které jsme v daném okrese zrušili
                for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++)
                {
                    ref_info = ref_krajList[k].okresList[o].info[ri];

                    // Pokud tato výstraha není již zpracovaná z pokrytí kraje
                    if (ref_zpracovanyInfoStupen.indexOf(ref_info.jev_kod) == -1)
                    {
                        if (first)
                        {
                            first = false;
                            resultText += '</div><br/><div><b>Okres ' + ref_krajList[k].okresList[o].nazev + '</b>';
                            empty = false;
                        }

                        ref_zpracovanyInfoStupenOkres.push(ref_info.jev_kod);
                        pomoc = PrintInfo(null, ref_info);
                        resultText += pomoc.split('|')[0];
                        zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                    }
                }

                // Výstrahy pro orp
                for (var ol = 0; ol < ref_krajList[k].okresList[o].orpList.length; ol++)
                {
                    first = true;

                    // Všechny, které jsme v daném ORP zrušili
                    for (var ri = 0; ri < ref_krajList[k].okresList[o].orpList[ol].info.length; ri++)
                    {
                        ref_info = ref_krajList[k].okresList[o].orpList[ol].info[ri];

                        // Pokud tato výstraha není již zpracovaná z pokrytí kraje nebo okresu
                        if (ref_zpracovanyInfoStupen.indexOf(ref_info.jev_kod) == -1
                            && ref_zpracovanyInfoStupenOkres.indexOf(ref_info.jev_kod) == -1)
                        {
                            if (first)
                            {
                                first = false;
                                resultText += '</div><br/><div><b>ORP ' + ref_krajList[k].okresList[o].orpList[ol].nazev + '</b>';
                                empty = false;
                            }

                            pomoc = PrintInfo(null, ref_info);
                            resultText += pomoc.split('|')[0];
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

function GetWarningColor(info)
{
    // Barva podle závažnosti
    var color = '';

    if (info)
    {
        switch (info.zavaznost_kod) {
            case 'Moderate' : 
                color = 'Žlutá';
            break;
            case 'Severe' : 
                color = 'Oranžová';
            break;
            case 'Extreme' : 
                color = 'Červená';
            break;
        }
    }

    return color;
}

function PozadiColor(info)
{
    // Barva podle závažnosti
    var pozadi = '#fff';

    if (info)
    {
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
        }
    }

    return pozadi;
}

function PrintVyska(info)
{

    var vyskaText = '';

    if (info && info.vyska)
    {
        var vyska = info.vyska.substring(1, info.vyska.length - 1);
        var vyskaSplit = vyska.split('-');

        if (vyskaSplit.length == 2)
        {
            if (vyskaSplit[0] && vyskaSplit[1])
            {
                vyskaText = '<br/>mezi ' + Math.round(vyskaSplit[0] * 0.3048) + ' a ' + Math.round(vyskaSplit[1] * 0.3048) + ' m n.m.';
            }
            else if (vyskaSplit[0])
            {
                vyskaText = '<br/>nad ' + Math.round(vyskaSplit[0] * 0.3048) + ' m n.m.';
            }
            else if (vyskaSplit[1])
            {
                vyskaText = '<br/>pod ' + Math.round(vyskaSplit[1] * 0.3048) + ' m n.m.';
            }
        }
        else
        {
            vyskaText = '<br/>' + Math.round(vyska * 0.3048);
        }
    }

    return vyskaText;
}

function PrintInfo(info, ref_info)
{
    var resultText = '';
    var zmen = 0;
    var pomoc = '';

    if (info) {
        if (info.jistota_kod == 'Observed') {
            vyskyt = '<b>Výskyt jevu</b><br>';
        } else {
            vyskyt = '';
        }
    } 
    if (ref_info) {
        if (ref_info.jistota_kod == 'Observed') {
            ref_vyskyt = '<b>Výskyt jevu</b><br>';
        } else {
            ref_vyskyt = '';
        }
    } 

    if (zobrazitZmeny) {
        resultText += '<table class="tg" width="100%">';

        // Hlavička
        resultText += '<tr>';
            resultText += '<td width="20%">';
            pomoc = SimpleHighlightDiff(info != null ? vyskyt : '', ref_info != null ? ref_vyskyt : '');
            resultText += pomoc.split('|')[0];
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);

            pomoc = HighlightDiff(info != null ? JEVY_NAZVY[info.stupen_kod] : '', ref_info != null ? JEVY_NAZVY[ref_info.stupen_kod] : '');
            resultText += pomoc.split('|')[0];
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);

            pomoc = HighlightDiff(info != null ? PrintVyska(info) : '', ref_info != null ? PrintVyska(ref_info) : '');
            resultText += pomoc.split('|')[0];
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);

            resultText += '</td>';
            resultText += '<td width="20%" style="background-color: ' + PozadiColor(info) + ';">';

            pomoc = SimpleHighlightDiff(info != null ? GetWarningColor(info) : '', ref_info != null ? GetWarningColor(ref_info) : '');
            resultText += pomoc.split('|')[0];
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);

            resultText += '</td>';
            resultText += '<td><table class="no" border="0">';
                resultText += '<tr><td>';
                
                if (info && ref_info && !UkoncenyJev(ref_info.dc_konec, vytvoreni) && info.nalehavost_kod == 'Immediate') {
                    resultText += ZobrazDatum(info.dc_zacatek, 'short');
                } else {
                    pomoc = SimpleHighlightDiff(info != null ? ZobrazDatum(info.dc_zacatek, 'short') : '', ref_info != null ? ZobrazDatum(ref_info.dc_zacatek, 'short') : '');
                    resultText += pomoc.split('|')[0];
                    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                }
                
                resultText += '</td>';
                resultText += '<td>&nbsp;–&nbsp;</td>';

                resultText += '<td>';
                pomoc = SimpleHighlightDiff(info != null ?  ZobrazDatum(info.dc_konec, 'short', 1) : '', ref_info != null ?  ZobrazDatum(ref_info.dc_konec, 'short', 1) : '');
                resultText += pomoc.split('|')[0];
                zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                resultText += '</td></tr>';
            resultText += '</table></td>';
        resultText += '</tr>';

        if (info) {
            if (info.popis) {var upr_info = info.popis.replace(/&lt;br\/&gt;/g,' ');}
            if (info.hydroPredpoved) {var upr_hydro = info.hydroPredpoved.replace(/&lt;br\/&gt;/g,' ');}
            if (info.doporuceni) {var upr_doporuceni = info.doporuceni.replace(/&lt;br\/&gt;/g,' ');}
        }
        if (ref_info) {
            if (ref_info.popis) {var ref_upr_info = ref_info.popis.replace(/&lt;br\/&gt;/g,' ');}
            if (ref_info.hydroPredpoved) {var ref_upr_hydro = ref_info.hydroPredpoved.replace(/&lt;br\/&gt;/g,' ');}
            if (ref_info.doporuceni) {var ref_upr_doporuceni = ref_info.doporuceni.replace(/&lt;br\/&gt;/g,' ');}
        }

        // Popis
        resultText += '<tr>';
            resultText += '<td colspan="3"><b>Popis:</b> '

            pomoc = HighlightDiff(info != null ? upr_info : '', ref_info != null ? ref_upr_info : '');
            resultText += pomoc.split('|')[0];
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);

            resultText += '</td>';
        resultText += '</tr>';

        // Hydrologická zpráva
        if (info && (info.hydroPredpoved)) {
            resultText += '<tr>';
            resultText += '<td colspan="3"><b>Hydrologická informační zpráva</b>: ';

            pomoc = HighlightDiff(info != null ? upr_hydro : '', ref_info != null ? ref_upr_hydro : '');
            resultText += pomoc.split('|')[0];
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);


            resultText += '</td>';
            resultText += '</tr>';
        }

        // Doporučení
        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Doporučení:</b> ';

        pomoc = HighlightDiff(info != null ? upr_doporuceni : '', ref_info != null ? ref_upr_doporuceni : '');
        resultText += pomoc.split('|')[0];
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        resultText += '</td>';
        resultText += '</tr>';
        resultText += '</table>';
    } else {
        resultText += '<table class="tg" width="100%">';

        // Hlavička
        resultText += '<tr>';
            resultText += '<td width="20%">' + (info != null ? vyskyt : '');
            resultText += (info != null ? JEVY_NAZVY[info.stupen_kod] : '');
            resultText += (info != null ? PrintVyska(info) : '') + '</td>';
            resultText += '<td width="20%" style="background-color: ' + PozadiColor(info) + ';">' + (info != null ? GetWarningColor(info) : '') + '</td>';
            resultText += '<td><table class="no" border="0">';
                resultText += '<tr><td>' + (info != null ? ZobrazDatum(info.dc_zacatek, 'short') : '') + '</td>';
                resultText += '<td>&nbsp;–&nbsp;</td>';
                resultText += '<td>' + (info != null ?  ZobrazDatum(info.dc_konec, 'short', 1) : '') + '</td></tr>';
            resultText += '</table></td>';
        resultText += '</tr>';

        if (info) {
            if (info.popis) {var upr_info = info.popis.replace(/&lt;br\/&gt;/g,' ');}
            if (info.hydroPredpoved) {var upr_hydro = info.hydroPredpoved.replace(/&lt;br\/&gt;/g,' ');}
            if (info.doporuceni) {var upr_doporuceni = info.doporuceni.replace(/&lt;br\/&gt;/g,' ');}
        }
        if (ref_info) {
            if (ref_info.popis) {var ref_upr_info = ref_info.popis.replace(/&lt;br\/&gt;/g,' ');}
            if (ref_info.hydroPredpoved) {var ref_upr_hydro = ref_info.hydroPredpoved.replace(/&lt;br\/&gt;/g,' ');}
            if (ref_info.doporuceni) {var ref_upr_doporuceni = ref_info.doporuceni.replace(/&lt;br\/&gt;/g,' ');}
        }

        // Popis
        resultText += '<tr>';
            resultText += '<td colspan="3"><b>Popis:</b> ' + (info != null ? upr_info : '') + '</td>';
        resultText += '</tr>';

        // Hydrologická zpráva
        if (info && (info.hydroPredpoved)) {
            resultText += '<tr>';
            resultText += '<td colspan="3"><b>Hydrologická informační zpráva</b>: ' + (info != null ? upr_hydro : '') + '</td>';
            resultText += '</tr>';
        }

        // Doporučení
        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Doporučení:</b> ' + (info != null ? upr_doporuceni : '') + '</td>';
        resultText += '</tr>';

        resultText += '</table>';
    }

    resultText = resultText + '|' + zmen;
    return resultText;
}

if (!razeniPodleNazvu) {
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
}

if (hlavniKraj != -1)
{
    var orpTmp = [];

    for (var i = 0; i < orp.length; i++)
    {
        // Pokud se jedná o hlavní kraj
        if (hlavniKraj == orp[i].kraj.id)
        {
            // Dáme na začátek seznamu
            orpTmp.push(orp[i]);
        }
    }

    if (zobrazovatVsechnyKraje)
    {
        for (var i = 0; i < orp.length; i++)
        {
            // Pokud se nejedná o hlavní kraj
            if (hlavniKraj != orp[i].kraj.id)
            {
                // Dáme na konec seznamu
                orpTmp.push(orp[i]);
            }
        }
    }

    orp = orpTmp;
}

// Samotná zpráva
var resultText = '';
var krajList = [];
var ref_krajList = [];
var info;
var vytvoreni = vystraha.dc_odeslano;
var pomoc = '';

// Připravíme jednotlivé info jevy
if (vystraha.info && vystraha.info.length > 0)
{
    krajList = PrepareInfo(orp, vystraha);
}

if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0)
{
    ref_krajList = PrepareInfo(orp, ref_vystraha);
}

// Hlavička HTML stránky
resultText += '<HTML>';
resultText += '<HEAD>';
    resultText += '<META charset="utf-8"/>';
    resultText += '<TITLE>' + vystraha.id + '</TITLE>';

    #import "CHMU-STYL";

resultText += '</HEAD>';
resultText += '<BODY>';

var found = false;
if (vystraha.ucel == 'Actual') {
    // Dohledáme, zda máme alespoň jeden jev, který není OUTLOOK
    for (var k = 0; k < krajList.length && found == false; k++)
    {
        for (var i = 0; i < krajList[k].info.length && found == false; i++)
        {
            info = krajList[k].info[i];

            if (info.jev_kod && info.jev_kod != 'OUTLOOK')
            {
                found = true;
            }
        }

        // Výstrahy pro okres
        for (var o = 0; o < krajList[k].okresList.length && found == false; o++)
        {
            for (var i = 0; i < krajList[k].okresList[o].info.length; i++)
            {
                info = krajList[k].okresList[o].info[i];

                if (info.jev_kod && info.jev_kod != 'OUTLOOK')
                {
                    found = true;
                }
            }

            // Výstrahy pro orp
            for (var ol = 0; ol < krajList[k].okresList[o].orpList.length && found == false; ol++)
            {
                for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++)
                {
                    info = krajList[k].okresList[o].orpList[ol].info[i];

                    if (info.jev_kod && info.jev_kod != 'OUTLOOK')
                    {
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
for (var k = 0; k < krajList.length && (hpps == false || sivs == false || svrs == false); k++)
{
    for (var i = 0; i < krajList[k].info.length && (hpps == false || sivs == false || svrs == false); i++)
    {
        info = krajList[k].info[i];

        if (info.HPPS && info.HPPS == '1')
        {
            hpps = true;
        }

        if (info.SIVS && info.SIVS == '1')
        {
            sivs = true;
        }

        if (info.SVRS && info.SVRS == '1')
        {
            svrs = true;
        }
    }

    // Výstrahy pro okres
    for (var o = 0; o < krajList[k].okresList.length && (hpps == false || sivs == false || svrs == false); o++)
    {
        for (var i = 0; i < krajList[k].okresList[o].info.length; i++)
        {
            info = krajList[k].okresList[o].info[i];

            if (info.HPPS && info.HPPS == '1')
            {
                hpps = true;
            }

            if (info.SIVS && info.SIVS == '1')
            {
                sivs = true;
            }

            if (info.SVRS && info.SVRS == '1')
            {
                svrs = true;
            }
        }

        // Výstrahy pro orp
        for (var ol = 0; ol < krajList[k].okresList[o].orpList.length && (hpps == false || sivs == false || svrs == false); ol++)
        {
            for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++)
            {
                info = krajList[k].okresList[o].orpList[ol].info[i];

                if (info.HPPS && info.HPPS == '1')
                {
                    hpps = true;
                }

                if (info.SIVS && info.SIVS == '1')
                {
                    sivs = true;
                }

                if (info.SVRS && info.SVRS == '1')
                {
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
        header = 'ÚČELOVÁ INFORMACE ČHMÚ - TESTOVACÍ ZPRÁVA';
        if (svrs && !sivs && !hpps) {
            header += '<br/>SMOGOVÝ VAROVNÝ A REGULAČNÍ SYSTÉM'
        }
        if (sivs && !hpps) {
            header += '<br/>SYSTÉM INTEGROVANÉ VÝSTRAŽNÉ SLUŽBY';
        }
        if (hpps) {
            header += '<br/>PŘEDPOVĚDNÍ POVODŇOVÁ SLUŽBA ČHMÚ';
        }
    break;
    case 'Actual' :
        header = 'VÝSTRAHA ČHMÚ';
        if (svrs && !sivs && !hpps) {
            header = 'ZPRÁVA SMOGOVÉHO VAROVNÉHO A REGULAČNÍHO SYSTÉMU'
        }
        if (sivs && !hpps) {
            header += '<br/>SYSTÉM INTEGROVANÉ VÝSTRAŽNÉ SLUŽBY';
        }
        if (hpps) {
            header += '<br/>VÝSTRAHA PŘEDPOVĚDNÍ POVODŇOVÉ SLUŽBY ČHMÚ';
        }
        if (!found) {
            header = 'INFORMAČNÍ ZPRÁVA ČHMÚ';
        }
    break;

}

resultText += '<div class="header">' + header + '</div>';
resultText += '<br/>Zpráva č. ' + vystraha.id.substring(vystraha.id.length - 6);
resultText += '<br/>Odesláno: ' + ZobrazDatum(vystraha.dc_odeslano, 'long');

if (vystraha.reference)
{
    var referenceSplit = vystraha.reference.split(',');
    resultText += '<br/>Zpráva aktualizuje předchozí zprávu č. ' + referenceSplit[1].substring(referenceSplit[1].length - 6)
        + ' vydanou ' + referenceSplit[2].substring(8, 10) + '.' + referenceSplit[2].substring(5, 7) + '.' + referenceSplit[2].substring(0, 4)
        + ' v ' + referenceSplit[2].substring(11, 19) + ' hodin';
}

resultText += vystraha.poznamka ? '<br/>Poznámka: ' + vystraha.poznamka : '';

resultText += '<br/>Územní platnost: ';
if (hlavniKraj == '-1' || zobrazovatVsechnyKraje) {
    resultText += 'Česká republika';
} else {
    resultText += KRAJE_NAZVY[hlavniKraj];
}

resultText += '<hr/>';

var empty = true;
var zmen = 0;

if (vystraha.info && vystraha.info.length > 0)
{
    // Najdeme všechny situace
    var situace = [];

    for (var i = 0; i < vystraha.info.length; i++)
    {
        if (vystraha.info[i].situace)
        {
            if (situace.indexOf(vystraha.info[i].situace) == -1)
            {
                // Vložíme situaci, kterou ještě nemáme
                situace.push(vystraha.info[i].situace);
            }
        }
    }

   if (situace.length > 0)
    {
        var upr_situace = situace[0].replace(/&lt;br\/&gt;/g,' ');
        resultText += '<br/><b>Meteorologická situace:</b> ' + upr_situace;
        resultText += '<hr/><div>';
    }

    pomoc = PrintInfoList(krajList, ref_krajList);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}
else if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0)
{
    // Výstraha ruší všechny předchozí jevy, tak je vypíšeme

    // Připravíme jednotlivé info jevy
    ref_krajList = PrepareInfo(orp, ref_vystraha);

    // Provedeme výpis
    pomoc = PrintInfoList(krajList, ref_krajList);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}

if (empty)
{
    resultText += '</div><br/><div>Na zvoleném území není v platnosti žádný nebezpečný jev.';
}

resultText += '</div><hr/>';
resultText += '<br/>Distribuce: ';

var dist = '';

// Vytáhneme informaci, kterých krajů se výstraha týká
for (var k = 0; k < krajList.length; k++)
{
    var found = krajList[k].info.length > 0 || (ref_krajList.length > 0 && ref_krajList[k].info.length > 0);

    for (var o = 0; o < krajList[k].okresList.length && !found; o++)
    {
        found = krajList[k].okresList[o].info.length > 0 || (ref_krajList.length > 0 && ref_krajList[k].okresList[o].info.length > 0);

        for (var ol = 0; ol < krajList[k].okresList[o].orpList.length && !found; ol++)
        {
            found = krajList[k].okresList[o].orpList[ol].info.length > 0 || (ref_krajList.length > 0 && ref_krajList[k].okresList[o].orpList[ol].info.length > 0);
        }
    }

    if (found)
    {
        dist += (dist ? ', ' : '') + KRAJE_KODY[krajList[k].id];
    }
}

if (krajList.length == 0)
{
    for (var k = 0; k < ref_krajList.length; k++)
    {
        var found = ref_krajList[k].info.length > 0;

        for (var o = 0; o < ref_krajList[k].okresList.length && !found; o++)
        {
            found = ref_krajList[k].okresList[o].info.length > 0;

            for (var ol = 0; ol < ref_krajList[k].okresList[o].orpList.length && !found; ol++)
            {
                found = ref_krajList[k].okresList[o].orpList[ol].info.length > 0;
            }
        }

        if (found)
        {
            dist += (dist ? ', ' : '') + KRAJE_KODY[ref_krajList[k].id];
        }
    }
}

resultText += dist;

// Ukončení stránky
resultText += '</BODY>';
resultText += '</HTML>';

if ((Number(zmen) == 0 && pouzeZmeny && zobrazitZmeny) || (empty && pouzeZmeny)) {
    resultText = '';
}
