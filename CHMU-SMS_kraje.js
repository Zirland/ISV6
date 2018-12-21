var KRAJE_KODY  = {
    "19": "Hlavní město Praha",
    "27": "Středočeský",
    "35": "Jihočeský",
    "43": "Plzeňský",
    "51": "Karlovarský",
    "60": "Ústecký",
    "78": "Liberecký",
    "86": "Královéhradecký",
    "94": "Pardubický",
    "108": "Vysočina",
    "116": "Jihomoravský",
    "124": "Olomoucký",
    "132": "Moravskoslezský",
    "141": "Zlínský"
}

var omezitNaKraj = 94;
var zacatky = [];
var konce = [];

var resultText = 'Výstrahy ČHMU kraj ' + KRAJE_KODY[omezitNaKraj] + ': ';

if (vystraha.info)
{
    for (var i = 0; i < vystraha.info.length; i++)
    {
        var found = omezitNaKraj == -1;
        for (var j = 0; j < vystraha.info[i].kraj.length && !found; j++)
        {
            found = vystraha.info[i].kraj[j].UID == omezitNaKraj;
        }

        if (found)
        {
            zacatek = vystraha.info[i].dc_zacatek.toString();
            zacatekDen = zacatek.substring(0,2);
            zacatekDen_porovn = zacatekDen.replace(/\.$/, "");
            if (zacatekDen == zacatekDen_porovn) {
                zacatekMesic = zacatek.substring(3,5);
                zacatekMesic_porovn = zacatekMesic.replace(/\.$/, "");
                if (zacatekMesic == zacatekMesic_porovn) {
                    zacatekRok = zacatek.substring(6,10)
                    zacatekCas = zacatek.substring(11,16);
                    zacatekCas = zacatekCas.replace(/\:$/, "");
                } else {
                    zacatekMesic = '0' + zacatekMesic_porovn;
                    zacatekRok = zacatek.substring(5,9)
                    zacatekCas = zacatek.substring(10,15);
                    zacatekCas = zacatekCas.replace(/\:$/, "");
                }
            } else {
                zacatekDen = '0' + zacatekDen_porovn;
                zacatekMesic = zacatek.substring(2,4);
                zacatekMesic_porovn = zacatekMesic.replace(/\.$/, "");
                if (zacatekMesic == zacatekMesic_porovn) {
                    zacatekRok = zacatek.substring(5,9)
                    zacatekCas = zacatek.substring(10,15);
                    zacatekCas = zacatekCas.replace(/\:$/, "");
                } else {
                    zacatekMesic = '0' + zacatekMesic_porovn;
                    zacatekRok = zacatek.substring(4,8)
                    zacatekCas = zacatek.substring(9,14);
                    zacatekCas = zacatekCas.replace(/\:$/, "");
                }
            }

            zacatekHodina = zacatekCas.substring(0,2);
            zacatekHodina_porovn = zacatekHodina.replace(/\:$/, "");
            if (zacatekHodina == zacatekHodina_porovn) {
                zacatekMinuta = zacatekCas.substring(3,5);
            } else {
                zacatekHodina = '0' + zacatekHodina_porovn;
                zacatekMinuta = zacatekCas.substring(2,4);
            }

            zacatek_format = zacatekRok + zacatekMesic + zacatekDen + zacatekHodina + zacatekMinuta;
            zacatek_format = Number(zacatek_format);

            if (vystraha.info[i].jev_kod != "OUTLOOK") {
                zacatky.push(zacatek_format);
            }

            konec = '999999999999';
            if (vystraha.info[i].dc_konec) {
                konec = vystraha.info[i].dc_konec.toString();
            }
            
            konecDen = konec.substring(0,2);
            konecDen_porovn = konecDen.replace(/\.$/, "");
            if (konecDen == konecDen_porovn) {
                konecMesic = konec.substring(3,5);
                konecMesic_porovn = konecMesic.replace(/\.$/, "");
                if (konecMesic == konecMesic_porovn) {
                    konecRok = konec.substring(6,10)
                    konecCas = konec.substring(11,16);
                    konecCas = konecCas.replace(/\:$/, "");
                } else {
                    konecMesic = '0' + konecMesic_porovn;
                    konecRok = konec.substring(5,9)
                    konecCas = konec.substring(10,15);
                    konecCas = konecCas.replace(/\:$/, "");
                }
             } else {
                konecDen = '0' + konecDen_porovn;
                konecMesic = konec.substring(2,4);
                konecMesic_porovn = konecMesic.replace(/\.$/, "");
                if (konecMesic == konecMesic_porovn) {
                    konecRok = konec.substring(5,9)
                    konecCas = konec.substring(10,15);
                    konecCas = konecCas.replace(/\:$/, "");
                } else {
                    konecMesic = '0' + konecMesic_porovn;
                    konecRok = konec.substring(4,8)
                    konecCas = konec.substring(9,14);
                    konecCas = konecCas.replace(/\:$/, "");
                }
            }

            konecHodina = konecCas.substring(0,2);
            konecHodina_porovn = konecHodina.replace(/\:$/, "");
            if (konecHodina == konecHodina_porovn) {
                konecMinuta = konecCas.substring(3,5);
            } else {
                konecHodina = '0' + konecHodina_porovn;
                konecMinuta = konecCas.substring(2,4);
            }

            konec_format = konecRok + konecMesic + konecDen + konecHodina + konecMinuta;
            konec_format = Number(konec_format);
            if (konec == "999999999999") {
                konec_format = 999999999999;
            }

            if (vystraha.info[i].jev_kod != "OUTLOOK") {
                konce.push(konec_format);
           
                resultText += vystraha.info[i].jev + '\n';
            }
        }
    }

    starty = Math.min.apply(null, zacatky);
    start = starty.toString();

    endy = Math.max.apply(null, konce);
    end = endy.toString();

    zahajeni = start.substring(6,8) + '.' + start.substring(4,6) + '. ' + start.substring(8,10) + ':' + start.substring(10,12);
    ukonceni = end.substring(6,8) + '.' + end.substring(4,6) + '. ' + end.substring(8,10) + ':' + end.substring(10,12);
    if (end == "999999999999") {
        ukonceni = 'odvolání.';
    }

    if (start == "Infinity") {
        resultText += 'není v platnosti žádná výstraha.';
    } else {
        resultText += 'Platnost od ' + zahajeni + ' do ' + ukonceni + '\n';
    }
}

return resultText;