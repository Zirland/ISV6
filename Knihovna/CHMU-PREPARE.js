// Verze 58

function PrepareInfo(orp, vystraha) {
    var infoList = [];

    for (var i = 0; i < vystraha.info.length; i++) {
        var vyskaList = [];
        vystraha.info[i].orp = [];
        vystraha.info[i].vyska = '';
        vystraha.info[i].krajPom = false;
        vystraha.info[i].okresPom = false;
        var orpSplit = vystraha.info[i].orp_list.toString().split(',');

        for (var j = 0; j < orpSplit.length; j++) {
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

        if (vystraha.info[i].orp.length > 0) {
            infoList.push(vystraha.info[i]);
        }

        for (var v = 0; v < vyskaList.length; v++) {
            var info = JSON.parse(JSON.stringify(vystraha.info[i]));
            info.orp = [];
            info.vyska = vyskaList[v];

            info.dc_konec = new Date(info.dc_konec);
            info.dc_zacatek = new Date(info.dc_zacatek);

            for (var j = 0; j < orpSplit.length; j++) {
                if (orpSplit[j].indexOf(vyskaList[v]) != -1) {
                    var index = orpSplit[j].indexOf('[');
                    info.orp.push(orpSplit[j].substring(0, index));
                }
            }

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
        var vyskyt1 = 0;
        var vyskyt2 = 0;
        var start1 = parseFloat(Normalize(a.dc_zacatek));
        var start2 = parseFloat(Normalize(b.dc_zacatek));
        var jev1 = a.stupen_kod;
        var jev2 = b.stupen_kod;

        if (a.jistota_kod == 'Observed') {
            vyskyt1 = 1;
        }
        if (b.jistota_kod == 'Observed') {
            vyskyt2 = 1;
        }
        if (vyskyt1 > vyskyt2) return -1;
        if (vyskyt1 < vyskyt2) return 1;
        if (start1 < start2) return -1;
        if (start1 > start2) return 1;
        if (jev1 < jev2) return -1;
        if (jev1 > jev2) return 1;
        return 0;
    });

    var krajList = [];
    var posledniKraj = {};
    var posledniOkres = {};
    var posledniOrp = {};
    var krajChange = true;
    var okresChange = true;

    for (var i = 0; i < orp.length; i++) {
        if (posledniKraj.id != orp[i].kraj.id) {
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

        if (posledniOkres.id != orp[i].okres.id) {
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

    for (var j = 0; j < infoList.length; j++) {
        if (infoList[j].krajPom) {
            posledniKraj.info.push(infoList[j]);
        }
    }

    for (var j = 0; j < infoList.length; j++) {
        if (infoList[j].okresPom) {
            posledniOkres.info.push(infoList[j]);
        }
    }

    return krajList;
}

function PrintInfoList(krajList, ref_krajList, headers) {
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

    for (var k = 0; k < krajList.length; k++) {
        zpracovanyInfoStupen = [];
        ref_zpracovanyInfoStupen = [];
        first = true;
        opakovanyKraj = [];
        opakovanyOkres = [];
        opakovanyOrp = [];

        if (ref_krajList.length > 0) {
            for (var ri = 0; ri < ref_krajList[k].info.length; ri++) {
                ref_info = ref_krajList[k].info[ri];
                found = false;

                for (var i = 0; i < krajList[k].info.length; i++) {
                    if (krajList[k].info[i].jev_kod == ref_info.jev_kod) {
                        found = true;
                        break;
                    }
                }

                if (!found && zobrazitZmeny) {
                    if (first) {
                        first = false;
                        (headers == 0 ? '' : resultText += '</div><br/><div><b>' + KRAJE_NAZVY[ref_krajList[k].id] + '</b>');
                    }

                    ref_zpracovanyInfoStupen.push(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec);
                    pomoc = PrintInfo(null, ref_info);
                    resultText += pomoc.split('|')[0];
                    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                }
            }
        }

        for (var i = 0; i < krajList[k].info.length; i++) {
            info = krajList[k].info[i];
            zpracovanyInfoStupen.push(info.jev_kod + (info.vyska ? info.vyska : '[]') + info.dc_zacatek + '-' + info.dc_konec);
            ref_info = null;

            if (ref_krajList.length > 0) {
                for (var ri = 0; ri < ref_krajList[k].info.length; ri++) {
                    if (ref_krajList[k].info[ri].jev_kod == info.jev_kod && opakovanyKraj.indexOf(k.toString() + '-' + ri.toString()) == -1) {
                        opakovanyKraj.push(k.toString() + '-' + ri.toString());
                        ref_info = ref_krajList[k].info[ri];
                        ref_zpracovanyInfoStupen.push(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec);
                        break;
                    }
                }
            }

            if (first) {
                first = false;
                (headers == 0 ? '' : resultText += '</div><br/><div><b>' + KRAJE_NAZVY[krajList[k].id] + '</b>');
                empty = false;
            }

            pomoc = PrintInfo(info, ref_info);
            resultText += pomoc.split('|')[0];
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);
        }

        for (var o = 0; o < krajList[k].okresList.length; o++) {
            first = true;
            zpracovanyInfoStupenOkres = [];
            ref_zpracovanyInfoStupenOkres = [];

            if (ref_krajList.length > 0) {
                for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++) {
                    ref_info = ref_krajList[k].okresList[o].info[ri];
                    found = false;

                    if (ref_zpracovanyInfoStupen.indexOf(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec) == -1) {
                        if (zpracovanyInfoStupen.indexOf(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec) == -1) {
                            for (var i = 0; i < krajList[k].okresList[o].info.length; i++) {
                                if (krajList[k].okresList[o].info[i].jev_kod == ref_info.jev_kod) {
                                    found = true;
                                    break;
                                }
                            }
                        }

                        if (!found && zobrazitZmeny) {
                            if (first) {
                                first = false;
                                (headers == 0 ? '' : resultText += '</div><br/><div><b>Okres ' + ref_krajList[k].okresList[o].nazev + '</b>');
                            }

                            ref_zpracovanyInfoStupenOkres.push(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec);
                            pomoc = PrintInfo(null, ref_info);
                            resultText += pomoc.split('|')[0];
                            zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                        }
                    }
                }
            }

            for (var i = 0; i < krajList[k].okresList[o].info.length; i++) {
                info = krajList[k].okresList[o].info[i];

                if (zpracovanyInfoStupen.indexOf(info.jev_kod + (info.vyska ? info.vyska : '[]') + info.dc_zacatek + '-' + info.dc_konec) == -1) {
                    zpracovanyInfoStupenOkres.push(info.jev_kod + (info.vyska ? info.vyska : '[]') + info.dc_zacatek + '-' + info.dc_konec);
                    ref_info = null;

                    if (ref_krajList.length > 0) {
                        if (ref_zpracovanyInfoStupen.indexOf(info.jev_kod + (info.vyska ? info.vyska : '[]') + info.dc_zacatek + '-' + info.dc_konec) == -1) {
                            for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++) {
                                if (ref_krajList[k].okresList[o].info[ri].jev_kod == info.jev_kod && opakovanyOkres.indexOf(k.toString() + '-' + o.toString() + '-' + ri.toString()) == -1 && ref_zpracovanyInfoStupen.indexOf(ref_krajList[k].okresList[o].info[ri].jev_kod + (ref_krajList[k].okresList[o].info[ri].vyska ? ref_krajList[k].okresList[o].info[ri].vyska : '[]') + ref_krajList[k].okresList[o].info[ri].dc_zacatek + '-' + ref_krajList[k].okresList[o].info[ri].dc_konec) == -1) {
                                    opakovanyOkres.push(k.toString() + '-' + o.toString() + '-' + ri.toString());
                                    ref_info = ref_krajList[k].okresList[o].info[ri];
                                    ref_zpracovanyInfoStupenOkres.push(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec);
                                    break;
                                }
                            }
                        }
                    }

                    if (first) {
                        first = false;
                        (headers == 0 ? '' : resultText += '</div><br/><div><b>Okres ' + krajList[k].okresList[o].nazev + '</b>');
                        empty = false;
                    }

                    pomoc = PrintInfo(info, ref_info);
                    resultText += pomoc.split('|')[0];
                    zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                }
            }

            for (var ol = 0; ol < krajList[k].okresList[o].orpList.length; ol++) {
                first = true;

                if (ref_krajList.length > 0) {
                    for (var ri = 0; ri < ref_krajList[k].okresList[o].orpList[ol].info.length; ri++) {
                        ref_info = ref_krajList[k].okresList[o].orpList[ol].info[ri];
                        found = false;

                        if (ref_zpracovanyInfoStupen.indexOf(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec) == -1 && ref_zpracovanyInfoStupenOkres.indexOf(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec) == -1) {
                            if (zpracovanyInfoStupen.indexOf(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec) == -1 && zpracovanyInfoStupenOkres.indexOf(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec) == -1) {
                                for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++) {
                                    if (krajList[k].okresList[o].orpList[ol].info[i].jev_kod == ref_info.jev_kod) {
                                        found = true;
                                        break;
                                    }
                                }
                            }

                            if (!found && zobrazitZmeny) {
                                if (first) {
                                    first = false;
                                    (headers == 0 ? '' : resultText += '</div><br/><div><b>ORP ' + ref_krajList[k].okresList[o].orpList[ol].nazev + '</b>');
                                }

                                pomoc = PrintInfo(null, ref_info);
                                resultText += pomoc.split('|')[0];
                                zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                            }
                        }
                    }
                }

                for (var i = 0; i < krajList[k].okresList[o].orpList[ol].info.length; i++) {
                    info = krajList[k].okresList[o].orpList[ol].info[i];

                    if (zpracovanyInfoStupen.indexOf(info.jev_kod + (info.vyska ? info.vyska : '[]') + info.dc_zacatek + '-' + info.dc_konec) == -1 && zpracovanyInfoStupenOkres.indexOf(info.jev_kod + (info.vyska ? info.vyska : '[]') + info.dc_zacatek + '-' + info.dc_konec) == -1) {
                        ref_info = null;

                        if (ref_krajList.length > 0) {
                            if (ref_zpracovanyInfoStupen.indexOf(info.jev_kod + (info.vyska ? info.vyska : '[]') + info.dc_zacatek + '-' + info.dc_konec) == -1 && ref_zpracovanyInfoStupenOkres.indexOf(info.jev_kod + (info.vyska ? info.vyska : '[]') + info.dc_zacatek + '-' + info.dc_konec) == -1) {
                                for (var ri = 0; ri < ref_krajList[k].okresList[o].orpList[ol].info.length; ri++) {
                                    if (ref_krajList[k].okresList[o].orpList[ol].info[ri].jev_kod == info.jev_kod && opakovanyOrp.indexOf(k.toString() + '-' + o.toString() + '-' + ol.toString() + '-' + ri.toString()) == -1 && ref_zpracovanyInfoStupen.indexOf(ref_krajList[k].okresList[o].orpList[ol].info[ri].jev_kod + (ref_krajList[k].okresList[o].orpList[ol].info[ri].vyska ? ref_krajList[k].okresList[o].orpList[ol].info[ri].vyska : '[]') + ref_krajList[k].okresList[o].orpList[ol].info[ri].dc_zacatek + '-' + ref_krajList[k].okresList[o].orpList[ol].info[ri].dc_konec) == -1 && ref_zpracovanyInfoStupenOkres.indexOf(ref_krajList[k].okresList[o].orpList[ol].info[ri].jev_kod + (ref_krajList[k].okresList[o].orpList[ol].info[ri].vyska ? ref_krajList[k].okresList[o].orpList[ol].info[ri].vyska : '[]') + ref_krajList[k].okresList[o].orpList[ol].info[ri].dc_zacatek + '-' + ref_krajList[k].okresList[o].orpList[ol].info[ri].dc_konec) == -1) {
                                        opakovanyOrp.push(k.toString() + '-' + o.toString() + '-' + ol.toString() + '-' + ri.toString());
                                        ref_info = ref_krajList[k].okresList[o].orpList[ol].info[ri];
                                        break;
                                    }
                                }
                            }
                        }

                        if (first) {
                            first = false;
                            (headers == 0 ? '' : resultText += '</div><br/><div><b>ORP ' + krajList[k].okresList[o].orpList[ol].nazev + '</b>');
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

    if (krajList.length == 0 && ref_krajList.length > 0) {
        for (var k = 0; k < ref_krajList.length; k++) {
            ref_zpracovanyInfoStupen = [];
            first = true;

            for (var ri = 0; ri < ref_krajList[k].info.length; ri++) {
                ref_info = ref_krajList[k].info[ri];
                
                if (first) {
                    first = false;
                    (headers == 0 ? '' : resultText += '</div><br/><div><b>' + KRAJE_NAZVY[ref_krajList[k].id] + '</b>');
                }

                ref_zpracovanyInfoStupen.push(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec);
                pomoc = PrintInfo(null, ref_info);
                resultText += pomoc.split('|')[0];
                zmen = Number(zmen) + Number(pomoc.split('|')[1]);
            }

            for (var o = 0; o < ref_krajList[k].okresList.length; o++) {
                first = true;
                ref_zpracovanyInfoStupenOkres = [];

                for (var ri = 0; ri < ref_krajList[k].okresList[o].info.length; ri++) {
                    ref_info = ref_krajList[k].okresList[o].info[ri];

                    if (ref_zpracovanyInfoStupen.indexOf(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec) == -1) {
                        if (first) {
                            first = false;
                            (headers == 0 ? '' : resultText += '</div><br/><div><b>Okres ' + ref_krajList[k].okresList[o].nazev + '</b>');
                        }

                        ref_zpracovanyInfoStupenOkres.push(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec);
                        pomoc = PrintInfo(null, ref_info);
                        resultText += pomoc.split('|')[0];
                        zmen = Number(zmen) + Number(pomoc.split('|')[1]);
                    }
                }

                for (var ol = 0; ol < ref_krajList[k].okresList[o].orpList.length; ol++) {
                    first = true;

                    for (var ri = 0; ri < ref_krajList[k].okresList[o].orpList[ol].info.length; ri++) {
                        ref_info = ref_krajList[k].okresList[o].orpList[ol].info[ri];

                        if (ref_zpracovanyInfoStupen.indexOf(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec) == -1 && ref_zpracovanyInfoStupenOkres.indexOf(ref_info.jev_kod + (ref_info.vyska ? ref_info.vyska : '[]') + ref_info.dc_zacatek + '-' + ref_info.dc_konec) == -1) {
                            if (first) {
                                first = false;
                                (headers == 0 ? '' : resultText += '</div><br/><div><b>ORP ' + ref_krajList[k].okresList[o].orpList[ol].nazev + '</b>');
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

function GetWarningColor(info) {
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
    var zmen = 0;
    var pomoc = '';

    if (info) {
        var vyskyt = '';
        var upr_info = '';
        var upr_hydro = '';
        var upr_doporuceni = '';

        if (info.jistota_kod == 'Observed') {
            vyskyt = '<b>Výskyt jevu</b><br>';
        }
        if (info.popis) {
            upr_info = info.popis.replace(/<br\/>/g,' ');
        }
        if (info.hydroPredpoved) {
            upr_hydro = info.hydroPredpoved.replace(/\t/g,'&emsp;');
            upr_hydro = upr_hydro.replace(/\n/g,'<br>');
        }
        if (info.doporuceni) {
            upr_doporuceni = info.doporuceni.replace(/<br\/>/g,' ');
            upr_doporuceni = upr_doporuceni.replace(/hasičské záchranné služby/g,'hasičského záchranného sboru');
        }
    }

    if (ref_info) {
        var ref_vyskyt = '';
        var ref_upr_info = '';
        var ref_upr_hydro = '';
        var ref_upr_doporuceni = '';

        if (ref_info.jistota_kod == 'Observed') {
            ref_vyskyt = '<b>Výskyt jevu</b><br>';
        }
        if (ref_info.popis) {
            ref_upr_info = ref_info.popis.replace(/<br\/>/g,' ');
        }
        if (ref_info.hydroPredpoved) {
            ref_upr_hydro = ref_info.hydroPredpoved.replace(/\t/g,'&emsp;');
            ref_upr_hydro = ref_upr_hydro.replace(/\n/g,'<br>');
        }
        if (ref_info.doporuceni) {
            ref_upr_doporuceni = ref_info.doporuceni.replace(/<br\/>/g,' ');
            ref_upr_doporuceni = ref_upr_doporuceni.replace(/hasičské záchranné služby/g,'hasičského záchranného sboru');
        }
    }

    if (zobrazitZmeny) {
        resultText += '<table class="tg" width="100%" border="1">';

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

        pomoc = HighlightDiff(info != null ? GetWarningColor(info) : '', ref_info != null ? GetWarningColor(ref_info) : '');
        resultText += pomoc.split('|')[0];
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        resultText += '</td>';
        resultText += '<td>';

        if ((info != null && info.SVRS == '1') || (ref_info != null && ref_info.SVRS == '1')) {
            resultText += 'do odvolání';
        } else {
            resultText += '<table class="no" border="0">';
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
            resultText += '</table>';
        }
        resultText += '</td>';
        resultText += '</tr>';

        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Popis:</b> ';

        pomoc = HighlightDiff(info != null ? upr_info : '', ref_info != null ? ref_upr_info : '');
        resultText += pomoc.split('|')[0];
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        resultText += '</td>';
        resultText += '</tr>';

        if (info && (info.hydroPredpoved)) {
            resultText += '<tr>';
            resultText += '<td colspan="3"><b>Hydrologická regionální informační zpráva</b>: ';

            pomoc = HighlightDiff(info != null ? upr_hydro : '', ref_info != null ? ref_upr_hydro : '');
            resultText += pomoc.split('|')[0];
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);

            resultText += '</td>';
            resultText += '</tr>';
        }

        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Doporučení:</b> ';

        pomoc = HighlightDiff(info != null ? upr_doporuceni : '', ref_info != null ? ref_upr_doporuceni : '');
        resultText += pomoc.split('|')[0];
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        resultText += '</td>';
        resultText += '</tr>';
        resultText += '</table>';
    } else {
        resultText += '<table class="tg" width="100%" border="1 ">';

        resultText += '<tr>';
        resultText += '<td width="20%">';
        pomoc = SimpleHighlightDiff(info != null ? vyskyt : '', ref_info != null ? ref_vyskyt : '');
        resultText += (info != null ? vyskyt : '');
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        pomoc = HighlightDiff(info != null ? JEVY_NAZVY[info.stupen_kod] : '', ref_info != null ? JEVY_NAZVY[ref_info.stupen_kod] : '');
        resultText += (info != null ? JEVY_NAZVY[info.stupen_kod] : '');
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        pomoc = HighlightDiff(info != null ? PrintVyska(info) : '', ref_info != null ? PrintVyska(ref_info) : '');
        resultText += (info != null ? PrintVyska(info) : '') + '</td>';
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        resultText += '</td>';
        resultText += '<td width="20%" style="background-color: ' + PozadiColor(info) + ';">';

        pomoc = HighlightDiff(info != null ? GetWarningColor(info) : '', ref_info != null ? GetWarningColor(ref_info) : '');
        resultText += (info != null ? GetWarningColor(info) : '');
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        resultText += '</td>';
        resultText += '<td>';

        if ((info != null && info.SVRS == '1') || (ref_info != null && ref_info.SVRS == '1')) {
            resultText += 'do odvolání';
        } else {
            resultText += '<table class="no" border="0">';
            resultText += '<tr><td>';

            if (info && ref_info && !UkoncenyJev(ref_info.dc_konec, vytvoreni) && info.nalehavost_kod == 'Immediate') {
                resultText += (info != null ? ZobrazDatum(info.dc_zacatek, 'short') : '');
            } else {
                pomoc = SimpleHighlightDiff(info != null ? ZobrazDatum(info.dc_zacatek, 'short') : '', ref_info != null ? ZobrazDatum(ref_info.dc_zacatek, 'short') : '');
                resultText += (info != null ? ZobrazDatum(info.dc_zacatek, 'short') : '');
                zmen = Number(zmen) + Number(pomoc.split('|')[1]);
            }
                
            resultText += '</td>';
            resultText += '<td>&nbsp;–&nbsp;</td>';
            resultText += '<td>';
            pomoc = SimpleHighlightDiff(info != null ?  ZobrazDatum(info.dc_konec, 'short', 1) : '', ref_info != null ?  ZobrazDatum(ref_info.dc_konec, 'short', 1) : '');
            resultText += (info != null ?  ZobrazDatum(info.dc_konec, 'short', 1) : '');
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);
            resultText += '</td></tr>';
            resultText += '</table>';
        }
        resultText += '</td>';
        resultText += '</tr>';

        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Popis:</b> ';

        pomoc = HighlightDiff(info != null ? upr_info : '', ref_info != null ? ref_upr_info : '');
        resultText += (info != null ? upr_info : '');
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        resultText += '</td>';
        resultText += '</tr>';

        if (info && (info.hydroPredpoved)) {
            resultText += '<tr>';
            resultText += '<td colspan="3"><b>Hydrologická regionální informační zpráva</b>: ';

            pomoc = HighlightDiff(info != null ? upr_hydro : '', ref_info != null ? ref_upr_hydro : '');
            resultText += (info != null ? upr_hydro : '');
            zmen = Number(zmen) + Number(pomoc.split('|')[1]);

            resultText += '</td>';
            resultText += '</tr>';
        }

        resultText += '<tr>';
        resultText += '<td colspan="3"><b>Doporučení:</b> ';

        pomoc = HighlightDiff(info != null ? upr_doporuceni : '', ref_info != null ? ref_upr_doporuceni : '');
        resultText += (info != null ? upr_doporuceni : '');
        zmen = Number(zmen) + Number(pomoc.split('|')[1]);

        resultText += '</td>';
        resultText += '</tr>';
        resultText += '</table>';
    }

    resultText = resultText + '|' + zmen;
    return resultText;
}