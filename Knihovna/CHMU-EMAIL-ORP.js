//Verze 26

#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";
#import "CHMU-DATUMY";
#import "CHMU-PREPARE";

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
var findOrp = orp.filter(function(e) {
    return e.id == omezitNaOrp;
});
if (findOrp.length > 0) {
    var nazevORP = findOrp[0].nazev;
}
resultText += 'ORP ' + nazevORP;
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

    pomoc = PrintInfoList(krajList, ref_krajList, 0);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}
else if (typeof(ref_vystraha) != 'undefined' && ref_vystraha.info && ref_vystraha.info.length > 0)
{
    // Výstraha ruší všechny předchozí jevy, tak je vypíšeme

    // Připravíme jednotlivé info jevy
    ref_krajList = PrepareInfo(orp, ref_vystraha);

    // Provedeme výpis
    pomoc = PrintInfoList(krajList, ref_krajList, 0);
    resultText += pomoc.split('|')[0];
    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}

if (empty)
{
    resultText += '</div><br/><div>Na zvoleném území není v platnosti žádný nebezpečný jev.';
}

resultText += '</div>';

// Ukončení stránky
resultText += '</BODY>';
resultText += '</HTML>';

if ((Number(zmen) == 0 && pouzeZmeny && zobrazitZmeny) || (empty && pouzeZmeny)) {
    resultText = '';
}
