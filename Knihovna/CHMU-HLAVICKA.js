// Verze 49

resultText += '<!DOCTYPE html>';
resultText += '<HTML>';
resultText += '<HEAD>';
resultText += '<META charset="utf-8"/>';
resultText += '<TITLE>' + vystraha.id + '</TITLE>';

#import "CHMU-STYL";

resultText += '</HEAD>';
resultText += '<BODY>';

if (distrSeznamNahore == true) {
    resultText += 'Distribuce: ';

    var dist = '';

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
    for (var k = 0; k < krajList.length && found == false; k++) {
        for (var i = 0; i < krajList[k].info.length && found == false; i++) {
            info = krajList[k].info[i];

            if (info.jev_kod && info.jev_kod != 'OUTLOOK') {
                found = true;
            }
        }

        for (var o = 0; o < krajList[k].okresList.length && found == false; o++) {
            for (var i = 0; i < krajList[k].okresList[o].info.length; i++) {
                info = krajList[k].okresList[o].info[i];

                if (info.jev_kod && info.jev_kod != 'OUTLOOK') {
                    found = true;
                }
            }

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

var hpps = false;
var sivs = false;
var svrs = false;

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
    default:
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
