//Verze 7

/*
    UVG mapa je v aplikaci Spojař rozšířena o elementy:
    
    ref_vystraha - odpovídající elementům předcházející výstrahy (pokud výstraha má referenci / odkaz na předchozí výstrahu)

    ref_vystraha.id
    ref_vystraha.poznamka
    ref_vystraha.info[x].jev_kod
    ref_vystraha.info[x].jev_nazev
    ...
    
    seznam ORP - seřazených abecedně podle názvu kraje, názvu okresu a pak názvu ORP

    orp[x].id
    orp[x].nazev
    orp[x].kraj
    orp[x].kraj.id
    orp[x].kraj.nazev
    orp[x].kraj.zkratka
    orp[x].okres
    orp[x].okres.id
    orp[x].okres.nazev
    orp[x].okres.zkratka
*/

/*
    Pokud budeme chtít ve výpisu mít nějaký kraj jako první, tak nastavíme proměnou "hlavniKraj" (-1 je bez přeřazení)

    19	Hlavní město Praha
    35	Jihočeský
    116	Jihomoravský
    51	Karlovarský
    86	Královéhradecký
    78	Liberecký
    132	Moravskoslezský
    124	Olomoucký
    94	Pardubický
    43	Plzeňský
    27	Středočeský
    60	Ústecký
    108	Vysočina
    141	Zlínský
*/

var hlavniKraj = -1;

// Chceme zobrazovat jevy ze všech krajů (používá se pouze pokud je nastaven i hlavní kraj)
var zobrazovatVsechnyKraje = true;

// Zjednodušené zobrazení rozdílů (porovnává se celý text)
function SimpleHighlightDiff(newValue, oldValue)
{
    var resultText = '';
    var newText = newValue ? newValue.toString() : '';
    var oldText = oldValue ? oldValue.toString() : '';

    if (oldText == newText)
    {
        resultText += '<font color="black">' + oldText + '</font>';
    }
    else
    {
        resultText += '<font color="red"><s>' + oldText + '</s></font>';
        resultText += oldText && newText ? '<br/>' : '';
        resultText += '<font color="green">' + newText + '</font>';
    }
    
    return resultText;
}

// Zvíraznění rozdílů dvou textů
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
                    resultText += (lastChange == -1 ? '</s>' : '') + '</font>';
                }

                lastChange = changeList[index - 1].change;

                if (lastChange == 1)
                {
                    resultText += '<font color="green">';
                }
                else if (lastChange == -1)
                {
                    resultText += '<font color="red"><s>';
                }
                else
                {
                    resultText += '<font color="black">';
                }
            }

            resultText += changeList[index - 1].text + ' ';
        }

        if (changeList.length > 0)
        {
            resultText += (lastChange == -1 ? '</s>' : '') + '</font>';
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

// Připravýme seznam jevů podle území
function PrepareInfo(orp, vystraha)
{
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
                if (infoList[j].krajPom)
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
                if (infoList[j].okresPom)
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

            if (maOrp)
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
            // Všechny, které jsme v daném kraji zrušily
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

                // Pokud jsme výstrahu nenašly
                if (!found)
                {
                    if (first)
                    {
                        first = false;
                        resultText += '<br/><b>' + ref_krajList[k].nazev + '</b>';
                    }

                    ref_zpracovanyInfoStupen.push(ref_info.stupen_kod + ref_info.vyska);
                    resultText += PrintInfo(null, ref_info);
                }
            }
        }

        // Výstrahy pro celý kraj
        for (var i = 0; i < krajList[k].info.length; i++)
        {
            info = krajList[k].info[i];
            zpracovanyInfoStupen.push(info.stupen_kod + info.vyska);
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
                        ref_zpracovanyInfoStupen.push(ref_info.stupen_kod + ref_info.vyska);
                        break;
                    }
                }
            }

            if (first)
            {
                first = false;
                resultText += '<br/><b>' + krajList[k].nazev + '</b>';
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
                // Všechny, které jsme v daném okrese zrušily
                for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++)
                {
                    ref_info = ref_krajList[k].okresList[o].info[ri];
                    found = false;

                    // Pokud tato výstraha není již zpracovaná z pokrytí kraje
                    if (ref_zpracovanyInfoStupen.indexOf(ref_info.stupen_kod + ref_info.vyska) == -1)
                    {
                        if (zpracovanyInfoStupen.indexOf(ref_info.stupen_kod + ref_info.vyska) == -1)
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

                        // Pokud jsme výstrahu nenašly
                        if (!found)
                        {
                            if (first)
                            {
                                first = false;
                                resultText += '<br/><b>' + ref_krajList[k].nazev + ' - ' + ref_krajList[k].okresList[o].nazev + '</b>';
                            }

                            ref_zpracovanyInfoStupenOkres.push(ref_info.stupen_kod + ref_info.vyska);
                            resultText += PrintInfo(null, ref_info);
                        }
                    }
                }
            }

            for (var i = 0; i < krajList[k].okresList[o].info.length; i++)
            {
                info = krajList[k].okresList[o].info[i];

                // Pokud zatím není zpracováno z pokrytí kraje
                if (zpracovanyInfoStupen.indexOf(info.stupen_kod + info.vyska) == -1)
                {
                    zpracovanyInfoStupenOkres.push(info.stupen_kod + info.vyska);
                    ref_info = null;

                    // Pokud máme referenční výstrahu
                    if (ref_krajList.length > 0)
                    {
                        // Pokud zatím není zpracováno z pokrytí kraje
                        if (ref_zpracovanyInfoStupen.indexOf(info.stupen_kod + info.vyska) == -1)
                        {
                            for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++)
                            {
                                if (ref_krajList[k].okresList[o].info[ri].stupen_kod == info.stupen_kod)
                                {
                                    ref_info = ref_krajList[k].okresList[o].info[ri];
                                    ref_zpracovanyInfoStupenOkres.push(ref_info.stupen_kod + ref_info.vyska);
                                    break;
                                }
                            }
                        }
                    }

                    if (first)
                    {
                        first = false;
                        resultText += '<br/><b>' + krajList[k].nazev + ' - ' + krajList[k].okresList[o].nazev + '</b>';
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
                    // Všechny, které jsme v daném ORP zrušily
                    for (var ri = 0; ri < ref_krajList[k].okresList[o].orpList[ol].info.length; ri++)
                    {
                        ref_info = ref_krajList[k].okresList[o].orpList[ol].info[ri];
                        found = false;

                        // Pokud tato výstraha není již zpracovaná z pokrytí kraje nebo okresu
                        if (ref_zpracovanyInfoStupen.indexOf(ref_info.stupen_kod + ref_info.vyska) == -1
                            && ref_zpracovanyInfoStupenOkres.indexOf(ref_info.stupen_kod + ref_info.vyska) == -1)
                        {
                            if (zpracovanyInfoStupen.indexOf(ref_info.stupen_kod + ref_info.vyska) == -1
                                && zpracovanyInfoStupenOkres.indexOf(ref_info.stupen_kod + ref_info.vyska) == -1)
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

                            // Pokud jsme výstrahu nenašly
                            if (!found)
                            {
                                if (first)
                                {
                                    first = false;
                                    resultText += '<br/><b>' + ref_krajList[k].nazev + ' - ' + ref_krajList[k].okresList[o].nazev + ' - ' + ref_krajList[k].okresList[o].orpList[ol].nazev + '</b>';
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
                    if (zpracovanyInfoStupen.indexOf(info.stupen_kod + info.vyska) == -1
                        && zpracovanyInfoStupenOkres.indexOf(info.stupen_kod + info.vyska) == -1)
                    {
                        ref_info = null;

                        // Pokud máme referenční výstrahu
                        if (ref_krajList.length > 0)
                        {
                            // Pokud zatím není zpracováno z pokrytí kraje
                            if (ref_zpracovanyInfoStupen.indexOf(info.stupen_kod + info.vyska) == -1
                                && ref_zpracovanyInfoStupenOkres.indexOf(info.stupen_kod + info.vyska) == -1)
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
                            resultText += '<br/><b>' + krajList[k].nazev + ' - ' + krajList[k].okresList[o].nazev + ' - ' + krajList[k].okresList[o].orpList[ol].nazev + '</b>';
                        }

                        resultText += PrintInfo(info, ref_info);
                    }
                }
            }
        }
    }

    // Pokud nemáme původní výstrahu, ale máme jen referenční
    if (krajList.length == 0 && ref_krajList.length > 0)
    {
        for (var k = 0; k < ref_krajList.length; k++)
        {
            first = true;

            // Všechny, které jsme v daném kraji zrušily
            for (var ri = 0; ri < ref_krajList[k].info.length; ri++)
            {
                ref_info = ref_krajList[k].info[ri];
                
                if (first)
                {
                    first = false;
                    resultText += '<br/><b>' + ref_krajList[k].nazev + '</b>';
                }

                ref_zpracovanyInfoStupen.push(ref_info.stupen_kod + ref_info.vyska);
                resultText += PrintInfo(null, ref_info);
            }

            // Výstrahy pro okres
            for (var o = 0; o < ref_krajList[k].okresList.length; o++)
            {
                first = true;
                ref_zpracovanyInfoStupenOkres = [];

                // Všechny, které jsme v daném okrese zrušily
                for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++)
                {
                    ref_info = ref_krajList[k].okresList[o].info[ri];

                    // Pokud tato výstraha není již zpracovaná z pokrytí kraje
                    if (ref_zpracovanyInfoStupen.indexOf(ref_info.stupen_kod + ref_info.vyska) == -1)
                    {
                        if (first)
                        {
                            first = false;
                            resultText += '<br/><b>' + ref_krajList[k].nazev + ' - ' + ref_krajList[k].okresList[o].nazev + '</b>';
                        }

                        ref_zpracovanyInfoStupenOkres.push(ref_info.stupen_kod + ref_info.vyska);
                        resultText += PrintInfo(null, ref_info);
                    }
                }

                // Výstrahy pro orp
                for (var ol = 0; ol < ref_krajList[k].okresList[o].orpList.length; ol++)
                {
                    first = true;

                    // Všechny, které jsme v daném ORP zrušily
                    for (var ri = 0; ri < ref_krajList[k].okresList[o].orpList[ol].info.length; ri++)
                    {
                        ref_info = ref_krajList[k].okresList[o].orpList[ol].info[ri];

                        // Pokud tato výstraha není již zpracovaná z pokrytí kraje nebo okresu
                        if (ref_zpracovanyInfoStupen.indexOf(ref_info.stupen_kod + ref_info.vyska) == -1
                            && ref_zpracovanyInfoStupenOkres.indexOf(ref_info.stupen_kod + ref_info.vyska) == -1)
                        {
                            if (first)
                            {
                                first = false;
                                resultText += '<br/><b>' + ref_krajList[k].nazev + ' - ' + ref_krajList[k].okresList[o].nazev + ' - ' + ref_krajList[k].okresList[o].orpList[ol].nazev + '</b>';
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
    // Barva podle závažnosti a jistoty
    var color = 'Zelená';

    if (info)
    {
        if (info.zavaznost_kod == 'Moderate')
        {
            color = "Žlutá";
        }
        else if (info.zavaznost_kod == 'Severe')
        {
            color = "Oranžová";
        }
        else if (info.zavaznost_kod == 'Extreme')
        {
            color = "Červená";
        }
    }

    return color;
}

function PrintInfo(info, ref_info)
{
    var resultText = '';
    
    if (info && info.vyska)
    {
        resultText += '<br/>Výskyt je omezený nadmořskou výškou ';
        
        var vyska = info.vyska.substring(1, info.vyska.length - 1);
        var vyskaSplit = vyska.split('-');

        if (vyskaSplit.length == 2)
        {
            if (vyskaSplit[0] && vyskaSplit[1])
            {
                resultText += 'mezi ' + vyskaSplit[0] + ' až ' + vyskaSplit[1] + ' metrů';
            }
            else if (vyskaSplit[0])
            {
                resultText += 'nad ' + vyskaSplit[0] + ' metrů';
            }
            else if (vyskaSplit[1])
            {
                resultText += 'pod ' + vyskaSplit[1] + ' metrů';
            }
        }
        else
        {
            resultText += vyska;
        }
    }

    resultText += '<table border="1" width="99%">';

    // Hlavička
    resultText += '<tr>';
        resultText += '<td width="20%">' + HighlightDiff(info != null ? info.stupen_nazev : '', ref_info != null ? ref_info.stupen_nazev : '') + '</td>';
        resultText += '<td width="20%">' + SimpleHighlightDiff(info != null ? GetWarningColor(info) : '', ref_info != null ? GetWarningColor(ref_info) : '') + '</td>';
        resultText += '<td><table border="0">';
            resultText += '<tr><td>' + SimpleHighlightDiff(info != null ? info.dc_zacatek : '', ref_info != null ? ref_info.dc_zacatek : '') + '</td>';
            resultText += '<td> - </td>';
            resultText += '<td>' + SimpleHighlightDiff(info != null ? info.dc_konec : '', ref_info != null ? ref_info.dc_konec : '') + '<td><tr>';
        resultText += '</table></td>';
    resultText += '</tr>';

    // Upozornění na výskyt
    if (info && info.jistota_kod == 'Observed')
    {
        resultText += '<tr>';
            resultText += '<td colspan="3"><b>Výskyt nebezpečného jevu</b></td>';
        resultText += '</tr>';
    }

    // Popis
    resultText += '<tr>';
        resultText += '<td colspan="3"><b>Popis:</b> ' + HighlightDiff(info != null ? info.popis : '', ref_info != null ? ref_info.popis : '') + '</td>';
    resultText += '</tr>';

    // Toky řek
    if (info && (info.hydro1SPA || info.hydro2SPA || info.hydro3SPA))
    {
        resultText += '<tr>';
        resultText += '<td colspan="3">';
        resultText += '<table border="1">';
        resultText += '<tr><th>SPA</th><th>Tok</th><th>Stanice</th><th>Stav [cm]</th><th>Průtok [m3/s]</th><th>Tendence</th></tr>';

        if (info.hydro1SPA)
        {
            var rowSplit = info.hydro1SPA.split('&lt;br/&gt;');
            for (var i = 0; i < rowSplit.length; i++)
            {
                var columnSplit = rowSplit[i].split(',');
                if (columnSplit.length == 5)
                {
                    resultText += '<tr>';
                    resultText += '<td>' + 'I.' + '</td>';
                    resultText += '<td>' + columnSplit[0] + '</td>';
                    resultText += '<td>' + columnSplit[1] + '</td>';
                    resultText += '<td>' + columnSplit[2].substring(0, columnSplit[2].length - 3) + '</td>';
                    resultText += '<td>' + columnSplit[3].substring(0, columnSplit[3].length - 6) + '</td>';
                    resultText += '<td>' + (columnSplit[4] == ' rising' ? 'stoupá' : (columnSplit[4] == ' decreasing' ? 'klesá' : (columnSplit[4] == ' steady' ? 'setrvalý stav' : columnSplit[4]))) + '<td>';
                    resultText += '</tr>';
                }
            }
        }

        if (info.hydro2SPA)
        {
            var rowSplit = info.hydro2SPA.split('&lt;br/&gt;');
            for (var i = 0; i < rowSplit.length; i++)
            {
                var columnSplit = rowSplit[i].split(',');
                if (columnSplit.length == 5)
                {
                    resultText += '<tr>';
                    resultText += '<td>' + 'II.' + '</td>';
                    resultText += '<td>' + columnSplit[0] + '</td>';
                    resultText += '<td>' + columnSplit[1] + '</td>';
                    resultText += '<td>' + columnSplit[2].substring(0, columnSplit[2].length - 3) + '</td>';
                    resultText += '<td>' + columnSplit[3].substring(0, columnSplit[3].length - 6) + '</td>';
                    resultText += '<td>' + (columnSplit[4] == ' rising' ? 'stoupá' : (columnSplit[4] == ' decreasing' ? 'klesá' : (columnSplit[4] == ' steady' ? 'setrvalý stav' : columnSplit[4]))) + '<td>';
                    resultText += '</tr>';
                }
            }
        }

        if (info.hydro3SPA)
        {
            var rowSplit = info.hydro3SPA.split('&lt;br/&gt;');
            for (var i = 0; i < rowSplit.length; i++)
            {
                if (rowSplit[i])
                {
                    var columnSplit = rowSplit[i].split(',');
                    if (columnSplit.length == 5)
                    {
                        resultText += '<tr>';
                        resultText += '<td>' + 'III.' + '</td>';
                        resultText += '<td>' + columnSplit[0] + '</td>';
                        resultText += '<td>' + columnSplit[1] + '</td>';
                        resultText += '<td>' + columnSplit[2].substring(0, columnSplit[2].length - 3) + '</td>';
                        resultText += '<td>' + columnSplit[3].substring(0, columnSplit[3].length - 6) + '</td>';
                        resultText += '<td>' + (columnSplit[4] == ' rising' ? 'stoupá' : (columnSplit[4] == ' decreasing' ? 'klesá' : (columnSplit[4] == ' steady' ? 'setrvalý stav' : columnSplit[4]))) + '<td>';
                        resultText += '</tr>';
                    }
                }
            }
        }

        resultText += '</table>';
        resultText += '</td>';
        resultText += '</tr>';
    }

    // Doporučení
    resultText += '<tr>';
        resultText += '<td colspan="3"><b>Doporučení:</b> ' + HighlightDiff(info != null ? info.doporuceni : '', ref_info != null ? ref_info.doporuceni : '') + '</td>';
    resultText += '</tr>';

    resultText += '</table>';

    return resultText;
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
resultText += '</HEAD>';
resultText += '<BODY style="height:100%;">';

// Text v těle
resultText += 'Zpráva č. ' + vystraha.id.substring(vystraha.id.length - 6);

resultText += '<br/>';
switch (vystraha.ucel)
{
    case 'Actual':
        // Dohledáme, zda máme alespoň jeden jev, který není OUTLOOK
        var found = false;
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

        resultText += found ? 'VÝSTRAŽNÁ INFORMACE' : 'Informační zpráva';
        break;

    case 'Exercise': resultText += 'Cvičná zpráva'; break;
    case 'System': resultText += 'Systémová zpráva'; break;
    case 'Test': resultText += 'Testovací zpráva'; break;
    default: resultText += 'Informační zpráva'; break;
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

resultText += hpps ? ' <b>HPPS</b>' : '';
resultText += sivs ? ' <b>SIVS</b>' : '';
resultText += svrs ? ' <b>SVRS</b>' : '';

resultText += '<br/>Odesláno: ' + vystraha.dc_odeslano;

if (vystraha.reference)
{
    var referenceSplit = vystraha.reference.split(',');
    resultText += '<br/>Zpráva aktualizuje předchozí zprávu č. ' + referenceSplit[1].substring(referenceSplit[1].length - 6)
        + ' vydanou ' + referenceSplit[2].substring(8, 10) + '.' + referenceSplit[2].substring(5, 7) + '.' + referenceSplit[2].substring(0, 4)
        + ' v ' + referenceSplit[2].substring(11, 19) + ' hodin';
}

resultText += vystraha.poznamka ? '<br/>Poznámka: ' + vystraha.poznamka : '';

resultText += '<hr/>';

if (vystraha.info && vystraha.info.length > 0)
{
    // Najdeme všechny situace a doplňkové informace
    var situace = [];
    var doplnkovaInformace = [];
    var hydroPredpoved = [];

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

        if (vystraha.info[i].dopresneni)
        {
            if (doplnkovaInformace.indexOf(vystraha.info[i].dopresneni) == -1)
            {
                // Vložíme dopřesnění, které ještě nemáme
                doplnkovaInformace.push(vystraha.info[i].dopresneni);
            }
        }

        if (vystraha.info[i].hydroPredpoved)
        {
            if (hydroPredpoved.indexOf(vystraha.info[i].hydroPredpoved) == -1)
            {
                // Vložíme předpověď, kterou ještě nemáme
                doplnkovaInformace.push(vystraha.info[i].hydroPredpoved);
            }
        }
    }

    // Vypíšeme situaci
    if (situace.length > 0)
    {
        for (var i = 0; i < situace.length; i++)
        {
            resultText += '<br/><b>Situace '+ (i + 1) + ':</b> ' + situace[i];
        }
    }

    // Vypíšeme povodňovou situaci
    if (hydroPredpoved.length > 0)
    {
        for (var i = 0; i < hydroPredpoved.length; i++)
        {
            resultText += '<br/><b>Povodňová situace '+ (i + 1) + ':</b> ' + hydroPredpoved[i];
        }
    }

    if (situace.length > 0 || hydroPredpoved.length > 0)
    {
        resultText += '<hr/>';
    }

    // Provedeme výpis
    resultText += PrintInfoList(krajList, ref_krajList);

    // Vypíšeme doplňkovou informaci
    if (doplnkovaInformace.length > 0)
    {
        for (var i = 0; i < doplnkovaInformace.length; i++)
        {
            resultText += '<br/><br/><b>Doplňková informace '+ (i + 1) + ':</b> ' + doplnkovaInformace[i];
        }
    }
}
else if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0)
{
    // Výstraha ruší všechny předchozí jevy, tak je vypíšeme

    // Připravíme jednotlivé info jevy
    ref_krajList = PrepareInfo(orp, ref_vystraha);

    // Provedeme výpis
    resultText += PrintInfoList(krajList, ref_krajList);
}
else
{
    // Sem by se to nikdy nemělo dostat, ale pro jistotu
    resultText += '<br/>Výstraha je prázdná';
}

resultText += '<hr/>';
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
        dist += (dist ? ', ' : '') + krajList[k].nazev;
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
            dist += (dist ? ', ' : '') + ref_krajList[k].nazev;
        }
    }
}

resultText += dist;

// Ukončení stránky
resultText += '</BODY>';
resultText += '</HTML>';

// Vrácení výsledku
return resultText;