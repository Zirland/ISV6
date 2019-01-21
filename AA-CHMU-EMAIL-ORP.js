//------ Automatická akce "Výstraha e-mail pro ORP" ----- 
//!JS
// Verze 20

//Číselník ORP viz samostatný soubor
var omezitNaOrp = 337; 
var zobrazitVyhled = false; 
var zmeny = true;
// viz dokumentace

// zde vytvoříme tělo mailu dle obsahu CAP pomocí skriptu z knihovny
#import "CHMU_EMAIL_ORP"; 

print(resultText);

//----- Knihovna JS "CHMU_EMAIL_ORP" -----
//!JS
//Verze 20

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
}

// Zjednodušené zobrazení rozdílů (porovnává se celý text)
function SimpleHighlightDiff(newValue, oldValue)
{
    var resultText = '';
    var newText = newValue ? newValue.toString() : '';
    var oldText = oldValue ? oldValue.toString() : '';

    if (oldText == newText)
    {
        resultText += oldText;
    }
    else
    {
        resultText += '<del>' + oldText + '</del>';
        resultText += oldText && newText ? '<br/>' : '';
        resultText += '<ins>' + newText + '</ins>';
    }
    
    return resultText;
}

// Zvýraznění rozdílů dvou textů
function HighlightDiff(newValue, oldValue)
{
    var resultText = '';

    // Převedeme na pole podle mezer
    var newValueSplit = newValue != undefined ? newValue.split(' ') : [];
    var oldValueSplit = oldValue != undefined ? oldValue.split(' ') : [];

    if (newValueSplit.length == 0 || oldValueSplit.length == 0)
    {
        resultText = SimpleHighlightDiff(newValue, oldValue);
    }
    else
    {
        // Spočteme si matici vzdáleností
        var matrix = GetLCSLength(newValueSplit, oldValueSplit);

        var i = newValueSplit.length;
        var j = oldValueSplit.length;

        var changeList = [];

        while (i > 0 && j > 0)
        {
            if (newValueSplit[i - 1] == oldValueSplit[j - 1])
            {
                var changeValue = {};
                changeValue.text = newValueSplit[i - 1];
                changeValue.change = 0;

                changeList.push(changeValue);

                i--;
                j--;
            }
            else if (matrix[i][j - 1] > matrix[i - 1][j])
            {
                var changeValue = {};
                changeValue.text = oldValueSplit[j - 1];
                changeValue.change = -1;

                changeList.push(changeValue);

                j--;
            }
            else
            {
                var changeValue = {};
                changeValue.text = newValueSplit[i - 1];
                changeValue.change = 1;

                changeList.push(changeValue);

                i--;
            }
        }

        while (i > 0)
        {
            var changeValue = {};
            changeValue.text = newValueSplit[i - 1];
            changeValue.change = 1;

            changeList.push(changeValue);

            i--;
        }

        while (j > 0)
        {
            var changeValue = {};
            changeValue.text = oldValueSplit[j - 1];
            changeValue.change = -1;

            changeList.push(changeValue);

            j--;
        }

        var lastChange = 0;

        // Slova máme v seznamu v opačném pořadí
        for (var index = changeList.length; index > 0; index--)
        {
            if (lastChange != changeList[index - 1].change)
            {
                if (index != changeList.length)
                {
                    resultText += (lastChange == -1 ? '</del>' : '');
                }

                lastChange = changeList[index - 1].change;

                if (lastChange == 1)
                {
                    resultText += '<ins>';
                }
                else if (lastChange == -1)
                {
                    resultText += '<del>';
                }
                else
                {
                    resultText += '<plain>';
                }
            }

            resultText += changeList[index - 1].text + ' ';
        }

        if (changeList.length > 0)
        {
            if (lastChange == 1) {
                resultText += '</ins>';
            }
            else if (lastChange == -1) {
                resultText += '</del>';
            }
            else {
                resultText += '</plain>';
            }
        }
    }

    return resultText;
}

// Metoda pro spočtení vzdálenosti slov (dvou polí)
function GetLCSLength(newValueSplit, oldValueSplit)
{
    // Vytvoříme dvojrozměrné pole a inicializujeme ho nulou
    var matrix = new Array(newValueSplit.length + 1);

    for (var i = 0; i < newValueSplit.length + 1; i++)
    {
        matrix[i] = new Array(oldValueSplit.length + 1);

        for (var j = 0; j < oldValueSplit.length + 1; j++)
        {
            matrix[i][j] = 0;
        }
    }

    // Spočteme vzdálenosti
    for (var i = 1; i < (newValueSplit.length + 1); i++)
    {
        for (var j = 1; j < (oldValueSplit.length + 1); j++)
        {
            if (newValueSplit[i - 1] == oldValueSplit[j - 1])
            {
                matrix[i][j] = matrix[i - 1][j - 1] + 1;
            }
            else
            {
                matrix[i][j] = Math.max(matrix[i][j - 1], matrix[i - 1][j]);
            }
        }
    }

    return matrix;
}

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
        konecJev = "1.1.2100 01:00:00";
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

function ZobrazDatum(datum, format) {
    if (!datum) {
        format_datum = 'do odvolání';
    } else {
        var normDatum = Normalize(datum);

        normDatumRok = normDatum.substring(0,4);
        normDatumMesic = normDatum.substring(4,6);
        normDatumDen = normDatum.substring(6,8);
        normDatumHodina = normDatum.substring(8,10);
        normDatumMinuta = normDatum.substring(10,12);
        normDatumSekunda = normDatum.substring(10,12);

        switch (format) {
            case 'short' :
                format_datum = Number(normDatumDen) + "." + Number(normDatumMesic) + ". " + normDatumHodina + ":" + normDatumMinuta;
            break;
            case 'long' :
                format_datum = Number(normDatumDen) + "." + Number(normDatumMesic) + "." + normDatumRok + ' ' + normDatumHodina + ":" + normDatumMinuta + ":" + normDatumSekunda;
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
            podminka = (infoList[x].jev_kod != "OUTLOOK" && !UkoncenyJev(infoList[x].dc_konec, vytvoreni));
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
                    if (krajList[k].info[i].stupen_kod == ref_info.stupen_kod)
                    {
                        found = true;
                        break;
                    }
                }

                // Pokud jsme výstrahu nenašli
                if (!found && zmeny)
                {
                    if (first)
                    {
                        first = false;
                        empty = false;
                    }

                    ref_zpracovanyInfoStupen.push(ref_info.stupen_kod);
                    resultText += PrintInfo(null, ref_info);
                }
            }
        }

        // Výstrahy pro celý kraj
        for (var i = 0; i < krajList[k].info.length; i++)
        {
            info = krajList[k].info[i];
            zpracovanyInfoStupen.push(info.stupen_kod);
            ref_info = null;

            // Pokud máme referenční výstrahu
            if (ref_krajList.length > 0)
            {
                // Zkusíme najít odpovídající záznam v referenční / předchozí výstraze
                for (var ri = 0; ri < ref_krajList[k].info.length; ri++)
                {
                    if (ref_krajList[k].info[ri].stupen_kod == info.stupen_kod)
                    {
                        ref_info = ref_krajList[k].info[ri];
                        ref_zpracovanyInfoStupen.push(ref_info.stupen_kod);
                        break;
                    }
                }
            }

            if (first)
            {
                first = false;
                empty = false;
            }

            resultText += PrintInfo(info, ref_info);
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
                    if (ref_zpracovanyInfoStupen.indexOf(ref_info.stupen_kod) == -1)
                    {
                        if (zpracovanyInfoStupen.indexOf(ref_info.stupen_kod) == -1)
                        {
                            // Zkusíme najít odpovídající záznam ve výstraze
                            for (var i = 0; i < krajList[k].okresList[o].info.length; i++)
                            {
                                if (krajList[k].okresList[o].info[i].stupen_kod == ref_info.stupen_kod)
                                {
                                    found = true;
                                    break;
                                }
                            }
                        }

                        // Pokud jsme výstrahu nenašli
                        if (!found && zmeny)
                        {
                            if (first)
                            {
                                first = false;
                                empty = false;
                            }

                            ref_zpracovanyInfoStupenOkres.push(ref_info.stupen_kod);
                            resultText += PrintInfo(null, ref_info);
                        }
                    }
                }
            }

            for (var i = 0; i < krajList[k].okresList[o].info.length; i++)
            {
                info = krajList[k].okresList[o].info[i];

                // Pokud zatím není zpracováno z pokrytí kraje
                if (zpracovanyInfoStupen.indexOf(info.stupen_kod) == -1)
                {
                    zpracovanyInfoStupenOkres.push(info.stupen_kod);
                    ref_info = null;

                    // Pokud máme referenční výstrahu
                    if (ref_krajList.length > 0)
                    {
                        // Pokud zatím není zpracováno z pokrytí kraje
                        if (ref_zpracovanyInfoStupen.indexOf(info.stupen_kod) == -1)
                        {
                            for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++)
                            {
                                if (ref_krajList[k].okresList[o].info[ri].stupen_kod == info.stupen_kod)
                                {
                                    ref_info = ref_krajList[k].okresList[o].info[ri];
                                    ref_zpracovanyInfoStupenOkres.push(ref_info.stupen_kod);
                                    break;
                                }
                            }
                        }
                    }

                    if (first)
                    {
                        first = false;
                        empty = false;
                    }

                    resultText += PrintInfo(info, ref_info);
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
                        if (ref_zpracovanyInfoStupen.indexOf(ref_info.stupen_kod) == -1
                            && ref_zpracovanyInfoStupenOkres.indexOf(ref_info.stupen_kod) == -1)
                        {
                            if (zpracovanyInfoStupen.indexOf(ref_info.stupen_kod) == -1
                                && zpracovanyInfoStupenOkres.indexOf(ref_info.stupen_kod) == -1)
                            {
                                // Zkusíme najít odpovídající záznam ve výstraze
                                for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++)
                                {
                                    if (krajList[k].okresList[o].orpList[ol].info[i].stupen_kod == ref_info.stupen_kod)
                                    {
                                        found = true;
                                        break;
                                    }
                                }
                            }

                            // Pokud jsme výstrahu nenašli
                            if (!found && zmeny)
                            {
                                if (first)
                                {
                                    first = false;
                                    empty = false;
                                }

                                resultText += PrintInfo(null, ref_info);
                            }
                        }
                    }
                }

                for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++)
                {
                    info = krajList[k].okresList[o].orpList[ol].info[i];

                    // Pokud zatím není zpracováno z pokrytí kraje nebo okresu
                    if (zpracovanyInfoStupen.indexOf(info.stupen_kod) == -1
                        && zpracovanyInfoStupenOkres.indexOf(info.stupen_kod) == -1)
                    {
                        ref_info = null;

                        // Pokud máme referenční výstrahu
                        if (ref_krajList.length > 0)
                        {
                            // Pokud zatím není zpracováno z pokrytí kraje
                            if (ref_zpracovanyInfoStupen.indexOf(info.stupen_kod) == -1
                                && ref_zpracovanyInfoStupenOkres.indexOf(info.stupen_kod) == -1)
                            {
                                for (var ri = 0; ri < ref_krajList[k].okresList[o].orpList[ol].info.length; ri++)
                                {
                                    if (ref_krajList[k].okresList[o].orpList[ol].info[ri].stupen_kod == info.stupen_kod)
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
                            empty = false;
                        }

                        resultText += PrintInfo(info, ref_info);
                    }
                }
            }
        }
    }

    // Pokud nemáme původní výstrahu, ale máme jen referenční
    if (krajList.length == 0 && ref_krajList.length > 0 && zmeny)
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
                    empty = false;
                }

                ref_zpracovanyInfoStupen.push(ref_info.stupen_kod);
                resultText += PrintInfo(null, ref_info);
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
                    if (ref_zpracovanyInfoStupen.indexOf(ref_info.stupen_kod) == -1)
                    {
                        if (first)
                        {
                            first = false;
                            empty = false;
                        }

                        ref_zpracovanyInfoStupenOkres.push(ref_info.stupen_kod);
                        resultText += PrintInfo(null, ref_info);
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
                        if (ref_zpracovanyInfoStupen.indexOf(ref_info.stupen_kod) == -1
                            && ref_zpracovanyInfoStupenOkres.indexOf(ref_info.stupen_kod) == -1)
                        {
                            if (first)
                            {
                                first = false;
                                empty = false;
                            }

                            resultText += PrintInfo(null, ref_info);
                        }
                    }
                }
            }
        }
    }

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
                color = "Žlutá";
            break;
            case 'Severe' : 
                color = "Oranžová";
            break;
            case 'Extreme' : 
                color = "Červená";
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
                pozadi = "#ff0";
            break;
            case 'Severe' : 
                pozadi = "#ffa500";
            break;
            case 'Extreme' : 
                pozadi = "#f00";
            break;
        }
    }

    return pozadi;
}

function PrintVyska(info) {
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

    if (zmeny) {
        resultText += '<table class="tg" width="100%">';

        // Hlavička
        resultText += '<tr>';
            resultText += '<td width="20%">' + SimpleHighlightDiff(info != null ? vyskyt : '', ref_info != null ? ref_vyskyt : '');
            resultText += HighlightDiff(info != null ? JEVY_NAZVY[info.stupen_kod] : '', ref_info != null ? JEVY_NAZVY[ref_info.stupen_kod] : '');
            resultText += HighlightDiff(info != null ? PrintVyska(info) : '', ref_info != null ? PrintVyska(ref_info) : '') + '</td>';
            resultText += '<td width="20%" style="background-color: ' + PozadiColor(info) + ';">' + SimpleHighlightDiff(info != null ? GetWarningColor(info) : '', ref_info != null ? GetWarningColor(ref_info) : '') + '</td>';
            resultText += '<td><table class="no">';
                resultText += '<tr><td>';
                
                if (info && ref_info && info.dc_zacatek < ref_info.dc_konec && info.nalehavost_kod == "Immediate") {
                    resultText += ZobrazDatum(info.dc_zacatek, 'short');
                } else {
                    resultText += SimpleHighlightDiff(info != null ? ZobrazDatum(info.dc_zacatek, 'short') : '', ref_info != null ? ZobrazDatum(ref_info.dc_zacatek, 'short') : '');
                }
                
                resultText += '</td>';
                resultText += '<td>&nbsp;–&nbsp;</td>';
                resultText += '<td>' + SimpleHighlightDiff(info != null ?  ZobrazDatum(info.dc_konec, 'short') : '', ref_info != null ?  ZobrazDatum(ref_info.dc_konec, 'short') : '') + '</td></tr>';
            resultText += '</table></td>';
        resultText += '</tr>';

        if (info) {
            if (info.popis) {var upr_info = info.popis.replace(/&lt;br\/&gt;/g," ");}
            if (info.hydroPredpoved) {var upr_hydro = info.hydroPredpoved.replace(/&lt;br\/&gt;/g," ");}
            if (info.doporuceni) {var upr_doporuceni = info.doporuceni.replace(/&lt;br\/&gt;/g," ");}
        }
        if (ref_info) {
            if (ref_info.popis) {var ref_upr_info = ref_info.popis.replace(/&lt;br\/&gt;/g," ");}
            if (ref_info.hydroPredpoved) {var ref_upr_hydro = ref_info.hydroPredpoved.replace(/&lt;br\/&gt;/g," ");}
            if (ref_info.doporuceni) {var ref_upr_doporuceni = ref_info.doporuceni.replace(/&lt;br\/&gt;/g," ");}
        }

        // Popis
        resultText += '<tr>';
            resultText += '<td colspan="3"><b>Popis:</b> ' + HighlightDiff(info != null ? upr_info : '', ref_info != null ? ref_upr_info : '') + '</td>';
        resultText += '</tr>';

        // Hydrologická zpráva
        if (info && (info.hydroPredpoved)) {
            resultText += '<tr>';
            resultText += '<td colspan="3"><b>Hydrologická informační zpráva</b>: ' + HighlightDiff(info != null ? upr_hydro : '', ref_info != null ? ref_upr_hydro : '') + '</td>';
            resultText += '</tr>';
        }

        // Doporučení
        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Doporučení:</b> ' + HighlightDiff(info != null ? upr_doporuceni : '', ref_info != null ? ref_upr_doporuceni : '') + '</td>';
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
            resultText += '<td><table class="no">';
                resultText += '<tr><td>' + (info != null ? ZobrazDatum(info.dc_zacatek, 'short') : '') + '</td>';
                resultText += '<td>&nbsp;–&nbsp;</td>';
                resultText += '<td>' + (info != null ?  ZobrazDatum(info.dc_konec, 'short') : '') + '</td></tr>';
            resultText += '</table></td>';
        resultText += '</tr>';

        if (info) {
            if (info.popis) {var upr_info = info.popis.replace(/&lt;br\/&gt;/g," ");}
            if (info.hydroPredpoved) {var upr_hydro = info.hydroPredpoved.replace(/&lt;br\/&gt;/g," ");}
            if (info.doporuceni) {var upr_doporuceni = info.doporuceni.replace(/&lt;br\/&gt;/g," ");}
        }
        if (ref_info) {
            if (ref_info.popis) {var ref_upr_info = ref_info.popis.replace(/&lt;br\/&gt;/g," ");}
            if (ref_info.hydroPredpoved) {var ref_upr_hydro = ref_info.hydroPredpoved.replace(/&lt;br\/&gt;/g," ");}
            if (ref_info.doporuceni) {var ref_upr_doporuceni = ref_info.doporuceni.replace(/&lt;br\/&gt;/g," ");}
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

    return resultText;
}

var orpTmp = [];

for (var i = 0; i < orp.length; i++) {
    // Pokud se jedná o vybrané ORP
    if (omezitNaOrp == orp[i].id)
    {
        // Dáme do seznamu
        orpTmp.push(orp[i]);
    }
}

orp = orpTmp;

// Samotná zpráva
var resultText = '';
var krajList = [];
var ref_krajList = [];
var info;
var vytvoreni = vystraha.dc_odeslano;

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

    resultText += '<style type="text/css">';
    resultText += '    ins {';
    resultText += '        color: green;';
    resultText += '        background: #dfd;';
    resultText += '        text-decoration: none;';
    resultText += '        }';
    resultText += '    del {';
    resultText += '        color: red;';
    resultText += '        background: #fdd;';
    resultText += '        text-decoration: line-through;';
    resultText += '        }';
    resultText += '    plain {';
    resultText += '        color: black;';
    resultText += '        background: white;';
    resultText += '        text-decoration: none;';
    resultText += '        }';
    resultText += '    body {font-family:serif;font-size:13px;height:100%;}';
    resultText += '    .header {font-size:15px;text-align:center;}';
    resultText += '    .tg  {border-collapse:collapse;border-spacing:0;}';
    resultText += '    .tg th{padding:5px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;font-family:serif;font-size:12px;font-variant:bold;}';
    resultText += '    .tg td{padding:5px 5px;border-style:solid;border-width:1px;overflow:hidden;word-break:normal;font-family:serif;font-size:12px;}';
    resultText += '    .no  {border-collapse:collapse;border-spacing:0;}';
    resultText += '    .no th{padding:0px 0px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;font-family:serif;font-size:12px;font-variant:bold;}';
    resultText += '    .no td{padding:0px 0px;border-style:solid;border-width:0px;overflow:hidden;word-break:normal;font-family:serif;font-size:12px;}';
    resultText += '    @media print {';
    resultText += '        div {page-break-inside: avoid;}';
    resultText += '    }';
    resultText += '</style>';

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

            if (info.jev_kod && info.jev_kod != "OUTLOOK")
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

                if (info.jev_kod && info.jev_kod != "OUTLOOK")
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

                    if (info.jev_kod && info.jev_kod != "OUTLOOK")
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

        if (info.HPPS && info.HPPS == "1")
        {
            hpps = true;
        }

        if (info.SIVS && info.SIVS == "1")
        {
            sivs = true;
        }

        if (info.SVRS && info.SVRS == "1")
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

            if (info.HPPS && info.HPPS == "1")
            {
                hpps = true;
            }

            if (info.SIVS && info.SIVS == "1")
            {
                sivs = true;
            }

            if (info.SVRS && info.SVRS == "1")
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

                if (info.HPPS && info.HPPS == "1")
                {
                    hpps = true;
                }

                if (info.SIVS && info.SIVS == "1")
                {
                    sivs = true;
                }

                if (info.SVRS && info.SVRS == "1")
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
        header = "ÚČELOVÁ INFORMACE ČHMÚ - TESTOVACÍ ZPRÁVA";
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
        header = "VÝSTRAHA ČHMÚ";
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
            header = "INFORMAČNÍ ZPRÁVA ČHMÚ";
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

var findOrp = orp.filter(function(e) {
    return e.id == omezitNaOrp;
});
if (findOrp.length > 0) {
    var nazevORP = findOrp[0].nazev;
}

resultText += 'ORP ' + nazevORP;
resultText += '<hr/>';

var empty = true;

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
        var upr_situace = situace[0].replace(/&lt;br\/&gt;/g," ");
        resultText += '<br/><b>Meteorologická situace:</b> ' + upr_situace;
        resultText += '<hr/><div>';
    }

    resultText += PrintInfoList(krajList, ref_krajList);
}
else if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0)
{
    // Výstraha ruší všechny předchozí jevy, tak je vypíšeme

    // Připravíme jednotlivé info jevy
    ref_krajList = PrepareInfo(orp, ref_vystraha);

    // Provedeme výpis
    resultText += PrintInfoList(krajList, ref_krajList);
}

if (empty)
{
    resultText += '</div><br/><div>Na zvoleném území není v platnosti žádný nebezpečný jev.';
}

resultText += '</div>';

// Ukončení stránky
resultText += '</BODY>';
resultText += '</HTML>';