// Verze 78

var omezitNaKraj = -1;
var detailni = 1;
var vypisOrp = false;
var oddelovac = '\n';
var JEVY_CISELNIK_PRECHOD = 20260701000000;

var vytvoreni = vystraha.dc_odeslano;

var KRAJE_NAZVY = {
  '-1': 'Česká republika',
  '19': 'Hlavní město Praha',
  '27': 'Středočeský kraj',
  '35': 'Jihočeský kraj',
  '43': 'Plzeňský kraj',
  '51': 'Karlovarský kraj',
  '60': 'Ústecký kraj',
  '78': 'Liberecký kraj',
  '86': 'Královéhradecký kraj',
  '94': 'Pardubický kraj',
  '108': 'Kraj Vysočina',
  '116': 'Jihomoravský kraj',
  '124': 'Olomoucký kraj',
  '141': 'Zlínský kraj',
  '132': 'Moravskoslezský kraj'
};

var KRAJE_KODY = {
  '-1': 'ČR',
  '19': 'PHA',
  '27': 'STC',
  '35': 'JHC',
  '43': 'PLK',
  '51': 'KVK',
  '60': 'ULK',
  '78': 'LBK',
  '86': 'HKK',
  '94': 'PAK',
  '108': 'VYS',
  '116': 'JHM',
  '124': 'OLK',
  '141': 'ZLK',
  '132': 'MSK'
};

function usesNewJevyCiselnik(cas) {
  if (!cas) {
    return false;
  }
  var d = new Date(cas);
  if (!isNaN(d.getTime())) {
    var den = d.getDate();
    if (den < 10) {
      den = '0' + den;
    }
    var mesic = d.getMonth() + 1;
    if (mesic < 10) {
      mesic = '0' + mesic;
    }
    var rok = d.getFullYear();
    var hodiny = d.getHours();
    if (hodiny < 10) {
      hodiny = '0' + hodiny;
    }
    var minuty = d.getMinutes();
    if (minuty < 10) {
      minuty = '0' + minuty;
    }
    var sekundy = d.getSeconds();
    if (sekundy < 10) {
      sekundy = '0' + sekundy;
    }
    var norm =
      rok.toString() +
      mesic.toString() +
      den.toString() +
      hodiny.toString() +
      minuty.toString() +
      sekundy.toString();
    return Number(norm) >= JEVY_CISELNIK_PRECHOD;
  }
  var parts = String(cas).match(/(\d{1,2})\.(\d{1,2})\.(\d{4})/);
  if (parts) {
    var denCz = parts[1];
    var mesicCz = parts[2];
    var rokCz = parts[3];
    if (denCz.length < 2) {
      denCz = '0' + denCz;
    }
    if (mesicCz.length < 2) {
      mesicCz = '0' + mesicCz;
    }
    var normCz = rokCz + mesicCz + denCz + '000000';
    return Number(normCz) >= JEVY_CISELNIK_PRECHOD;
  }
  return false;
}

if (!usesNewJevyCiselnik(vytvoreni)) {
  var JEVY_SKUPINY = {
    'I': 'Extrémní teploty',
    'II': 'Pokles teplot pod nulu',
    'III': 'Vítr',
    'IV': 'Sněhová pokrývka',
    'V': 'Sněhové srážky',
    'VI': 'Sněhové jevy',
    'VII': 'Náledí',
    'VIII': 'Ledovka',
    'IX': 'Námrazové jevy',
    'X': 'Bouřkové jevy',
    'XI': 'Dešťové srážky',
    'XII': 'Povodňové jevy',
    'XIII': 'Dotok',
    'XIV': 'Požáry',
    'XV': 'Jiné jevy',
    'OUTLOOK': 'Výhled jevů',
    'O3': 'Přízemní ozón',
    'NO2': 'Oxid dusičitý',
    'SO2': 'Oxid siřičitý',
    'PM10': 'Prachové částice',
  };
} else {
  var JEVY_SKUPINY = {
    'I': 'Vysoké teploty hospodářství',
    'II': 'Nízké teploty hospodářství',
    'III': 'Vysoké teploty zdraví',
    'IV': 'Nízké teploty zdraví',
    'V': 'Vítr',
    'VI': 'Sníh',
    'VII': 'Námraza na komunikacích',
    'VIII': 'Námraza na objektech',
    'IX': 'Konvektivní bouře',
    'X': 'Déšť',
    'XI': 'Povodňové jevy',
    'XII': 'Požáry',
    'XIII': 'Nezařazené jevy',
    'OUTLOOK': 'Výhled jevů',
    'O3': 'Přízemní ozón',
    'NO2': 'Oxid dusičitý',
    'SO2': 'Oxid siřičitý',
    'PM10': 'Prachové částice',
  };
};

function Normalize(datum) {
  if (!datum) {
    datum = '1.1.2100 01:00:00';
  }
  var datumString = new Date(datum);

  var datumDen = datumString.getDate();
  if (datumDen < 10) {
    datumDen = '0' + datumDen;
  }
  var datumMesic = datumString.getMonth() + 1;
  if (datumMesic < 10) {
    datumMesic = '0' + datumMesic;
  }
  var datumRok = datumString.getFullYear();
  var datumHodiny = datumString.getHours();
  if (datumHodiny < 10) {
    datumHodiny = '0' + datumHodiny;
  }
  var datumMinuty = datumString.getMinutes();
  if (datumMinuty < 10) {
    datumMinuty = '0' + datumMinuty;
  }
  var datumSekundy = datumString.getSeconds();
  if (datumSekundy < 10) {
    datumSekundy = '0' + datumSekundy;
  }

  datum =
    datumRok.toString() +
    datumMesic.toString() +
    datumDen.toString() +
    datumHodiny.toString() +
    datumMinuty.toString() +
    datumSekundy.toString();

  return datum;
}

function UkoncenyJev(konecJev, casZprava) {
  if (!konecJev) {
    konecJev = '1.1.2100 01:00:00';
  }

  var konecJev_format = Normalize(konecJev);
  var casZprava_format = Normalize(casZprava);

  var kjYear = konecJev_format.substring(0, 4);
  var kjMonth = konecJev_format.substring(4, 6);
  var kjDay = konecJev_format.substring(6, 8);
  var kjHour = konecJev_format.substring(8, 10);
  var kjMinute = konecJev_format.substring(10, 12);
  var kjSecond = konecJev_format.substring(12, 14);
  var myEndTime = new Date(
    kjYear,
    kjMonth - 1,
    kjDay,
    kjHour,
    kjMinute,
    kjSecond
  );

  myEndTime.setMinutes(myEndTime.getMinutes() - 30);
  konecJev_format = Normalize(myEndTime);

  var konecJev_format_num = Number(konecJev_format);
  var casZprava_format_num = Number(casZprava_format);

  if (konecJev_format_num < casZprava_format_num) {
    return true;
  } else {
    return false;
  }
}

function ZobrazDatum(datum, end) {
  var format_datum = '';
  if (datum == 21000101010000 || datum == 'NaNNaNNaNNaNNaNNaN') {
    format_datum = 'odvolání';
  } else {
    var normDatum = datum.toString();

    var normDatumRok = normDatum.substring(0, 4);
    var normDatumMesic = normDatum.substring(4, 6);
    var normDatumDen = normDatum.substring(6, 8);
    var normDatumHodina = normDatum.substring(8, 10);
    var normDatumMinuta = normDatum.substring(10, 12);

    if (normDatumHodina == '00' && normDatumMinuta == '00' && end) {
      var myNewDay = new Date(
        normDatumRok,
        normDatumMesic - 1,
        normDatumDen - 1
      );
      var newNormDatum = Normalize(myNewDay);
      normDatumRok = newNormDatum.substring(0, 4);
      normDatumMesic = newNormDatum.substring(4, 6);
      normDatumDen = newNormDatum.substring(6, 8);
      normDatumHodina = '24';
    }

    format_datum =
      Number(normDatumDen) +
      '.' +
      Number(normDatumMesic) +
      '. ' +
      normDatumHodina +
      ':' +
      normDatumMinuta;
  }

  return format_datum;
}

function removeDuplicates(arr) {
  var unique_array = [];
  var seen = {};
  for (var i = 0; i < arr.length; i++) {
    var key = typeof arr[i] + '|' + arr[i];
    if (!seen[key]) {
      seen[key] = true;
      unique_array.push(arr[i]);
    }
  }
  return unique_array;
}

function sortNumericAsc(a, b) {
  return a - b;
}

function sortLexAsc(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function getEventWindow(jevStart, jevEnd) {
  return {
    zacatek: Math.min.apply(null, jevStart).toString(),
    konec: Math.max.apply(null, jevEnd).toString(),
  };
}

function joinKrajeCodes(jevKrajeList) {
  var seznkraje = [];
  for (var t = 0; t < jevKrajeList.length; t++) {
    seznkraje.push(KRAJE_KODY[jevKrajeList[t]]);
  }
  return seznkraje.join(', ');
}

function joinOrpNames(jevOrpList) {
  var seznOrp = [];
  for (var t = 0; t < jevOrpList.length; t++) {
    seznOrp.push(jevOrpList[t]);
  }
  return seznOrp.join(', ');
}

function getWarningSeverity(stupen_kod) {
  var barva = stupen_kod.split('.')[1];
  if (typeof barva !== 'undefined' && barva) {
    return Number(barva.substring(0, 1));
  }
  return 0;
}

function compareInfoByPriority(a, b) {
  var vyskyt1 = a.jistota_kod == 'Observed' ? 1 : 0;
  var vyskyt2 = b.jistota_kod == 'Observed' ? 1 : 0;
  var start1 = parseFloat(Normalize(a.dc_zacatek));
  var start2 = parseFloat(Normalize(b.dc_zacatek));
  var jev1 = a.stupen_kod;
  var jev2 = b.stupen_kod;
  var zavaznost1 = getWarningSeverity(jev1);
  var zavaznost2 = getWarningSeverity(jev2);

  if (vyskyt1 > vyskyt2) return -1;
  if (vyskyt1 < vyskyt2) return 1;
  if (start1 < start2) return -1;
  if (start1 > start2) return 1;
  if (zavaznost1 > zavaznost2) return -1;
  if (zavaznost1 < zavaznost2) return 1;
  if (jev1 < jev2) return -1;
  if (jev1 > jev2) return 1;
  return 0;
}

function getJevGroupCode(infoItem) {
  var splitkod = infoItem.stupen_kod.split('.');
  var skupina = splitkod[0];
  if (skupina == 'WARN' || skupina == 'REG' || skupina == 'SMOGSIT') {
    skupina = splitkod[1];
  }
  return (infoItem.jistota_kod == 'Observed' ? '0' : '') + skupina;
}

function appendDetailRange(text, start, end) {
  return text + ' od ' + start + ' do ' + end + oddelovac;
}

function buildInfoListSorted(sourceInfo) {
  var list = [];
  for (var i = 0; i < sourceInfo.length; i++) {
    list.push(sourceInfo[i]);
  }
  return list.sort(compareInfoByPriority);
}

function appendValidity(text, start, end) {
  return text + 'Platnost od ' + start + ' do ' + end + oddelovac;
}

function getWarnType(infoItem) {
  var warnType = 'SVRS';
  if (infoItem.SIVS == '1') {
    warnType = 'SIVS';
  }
  if (infoItem.HPPS == '1') {
    warnType = 'HPPS';
  }
  return warnType;
}

function getRezim(seznjevu) {
  var rezim = 'SVRS';
  if (seznjevu.indexOf('SIVS') > -1) {
    rezim = 'SIVS';
  }
  if (seznjevu.indexOf('HPPS') > -1) {
    rezim = 'HPPS';
  }
  return rezim;
}

function buildUvod(ucel, rezim, id) {
  var uvod;
  switch (ucel) {
    case 'Exercise':
      uvod = 'Cvičná zpráva ';
      break;
    case 'System':
      uvod = 'Systémová zpráva ';
      break;
    case 'Test':
      uvod = 'Testovací zpráva ';
      break;
    default:
      uvod = 'Výstraha ';
      break;
  }

  switch (rezim) {
    case 'HPPS':
      uvod += 'HPPS ';
      break;
    case 'SIVS':
      uvod += 'SIVS ';
      break;
    case 'SVRS':
      uvod += 'SVRS ';
      break;
    default:
      uvod += 'ČHMÚ';
      break;
  }

  var poradi_zpravy = id.substring(id.length - 6);
  uvod += 'č. ' + Number(poradi_zpravy) + ': ';
  return uvod;
}

function hasMatchingKraj(kraje, omezitNaKraj) {
  if (omezitNaKraj == -1) {
    return true;
  }
  for (var j = 0; j < kraje.length; j++) {
    if (kraje[j].UID == omezitNaKraj) {
      return true;
    }
  }
  return false;
}

function parseOrpIds(orp_list) {
  var ids = [];
  var orpListArr = orp_list.toString().split(',');
  for (var k = 0; k < orpListArr.length; k++) {
    ids.push(orpListArr[k].split('[')[0]);
  }
  return ids;
}

function appendSmsDetail(smsText, jevStart, jevEnd) {
  var jevWindow = getEventWindow(jevStart, jevEnd);
  return appendDetailRange(
    smsText,
    ZobrazDatum(jevWindow.zacatek),
    ZobrazDatum(jevWindow.konec, 1)
  );
}

function appendResultAndSmsDetail(
  resultText,
  smsText,
  jevStart,
  jevStarttxt,
  jevEnd
) {
  var jevWindow = getEventWindow(jevStart, jevEnd);
  var jevStarttxtWindow = Math.min.apply(null, jevStarttxt).toString();
  var zahajeni = ZobrazDatum(jevWindow.zacatek);
  var zahajenitxt = ZobrazDatum(jevStarttxtWindow);
  var ukonceni = ZobrazDatum(jevWindow.konec, 1);
  return {
    resultText: appendDetailRange(resultText, zahajenitxt, ukonceni),
    smsText: appendDetailRange(smsText, zahajeni, ukonceni),
  };
}

var zacatky2 = [];
var konce2 = [];
var sms2 = '';
var nyni = Normalize(vystraha.dc_odeslano);
var orpById = {};
if (typeof orp !== 'undefined' && orp) {
  for (var oi = 0; oi < orp.length; oi++) {
    orpById[orp[oi].id] = {
      nazev: orp[oi].nazev,
      krajId: orp[oi].kraj.id,
    };
  }
}

if (typeof ref_vystraha !== 'undefined' && ref_vystraha.info) {
  var ref_infoList = buildInfoListSorted(ref_vystraha.info);
}

if (ref_infoList) {
  var poleJevy2 = [];
  for (var i = 0; i < ref_infoList.length; i++) {
    if (
      ref_infoList[i].stupen_kod != 'OUTLOOK' &&
      !UkoncenyJev(ref_infoList[i].dc_konec, vystraha.dc_odeslano)
    ) {
      poleJevy2.push(getJevGroupCode(ref_infoList[i]));
    }
  }

  poleJevy2 = removeDuplicates(poleJevy2);

  for (var h = 0; h < poleJevy2.length; h++) {
    var jevStart2 = [];
    var jevEnd2 = [];
    var jevKrajeList2 = [];
    var jevOrpList2 = [];
    for (var i = 0; i < ref_infoList.length; i++) {
      if (poleJevy2[h] == getJevGroupCode(ref_infoList[i])) {
        var found = hasMatchingKraj(
          ref_infoList[i].kraj,
          omezitNaKraj
        );
        for (var j = 0; j < ref_infoList[i].kraj.length; j++) {
          if (found) {
            jevKrajeList2.push(ref_infoList[i].kraj[j].UID);

            var orpIds2 = parseOrpIds(ref_infoList[i].orp_list);
            for (var k = 0; k < orpIds2.length; k++) {
              var OrpListSplit2 = orpIds2[k];
              var orpData2 = orpById[OrpListSplit2];
              if (
                orpData2 &&
                orpData2.krajId == omezitNaKraj
              ) {
                jevOrpList2.push(orpData2.nazev);
              }
            }

            var zacatek2 = Normalize(ref_infoList[i].dc_zacatek);
            if (zacatek2 < nyni) {
              zacatky2.push(0);
              jevStart2.push(0);
            } else {
              zacatky2.push(zacatek2);
              jevStart2.push(zacatek2);
            }
            var konec2 = Normalize(ref_infoList[i].dc_konec);
            konce2.push(konec2);
            jevEnd2.push(konec2);
          }
        }
      }
    }

    jevKrajeList2 = removeDuplicates(jevKrajeList2);
    jevKrajeList2 = jevKrajeList2.sort(sortNumericAsc);
    jevOrpList2 = removeDuplicates(jevOrpList2);
    jevOrpList2 = jevOrpList2.sort(sortLexAsc);

    if (jevKrajeList2.length > 0) {
      if (omezitNaKraj == -1) {
        sms2 += JEVY_SKUPINY[poleJevy2[h]];
        sms2 += ' pro kraje ';

        sms2 += joinKrajeCodes(jevKrajeList2);

        if (detailni) {
          sms2 = appendSmsDetail(sms2, jevStart2, jevEnd2);
        } else {
          sms2 += oddelovac;
        }
      } else {
        sms2 += JEVY_SKUPINY[poleJevy2[h]];
        if (vypisOrp) {
          sms2 += ' pro ORP ';

          sms2 += joinOrpNames(jevOrpList2);
        }
        if (detailni) {
          sms2 = appendSmsDetail(sms2, jevStart2, jevEnd2);
        } else {
          sms2 += oddelovac;
        }
      }
    }
  }

  var starty2 = Math.min.apply(null, zacatky2);
  var start2 = starty2.toString();

  var endy2 = Math.max.apply(null, konce2);
  var end2 = endy2.toString();

  var total_zahajeni2 = ZobrazDatum(start2);
  var total_ukonceni2 = ZobrazDatum(end2, 1);

  if (start2 == 'Infinity' && poleJevy2 && poleJevy2.length > 0) {
    sms2 +=
      'Informace ČHMÚ: byla ukončena platnost vydané výstrahy.' +
      oddelovac;
  } else {
    if (!detailni) {
      sms2 = appendValidity(sms2, total_zahajeni2, total_ukonceni2);
    }
  }
}

var zacatky = [];
var zacatkytxt = [];
var konce = [];
var sms1 = '';
var seznjevu = [];
var resultText = '';
var vystupText = '';

if (vystraha.info) {
  var infoList = buildInfoListSorted(vystraha.info);
}

if (infoList) {
  var poleJevy = [];
  for (var i = 0; i < infoList.length; i++) {
    if (infoList[i].stupen_kod != 'OUTLOOK') {
      poleJevy.push(getJevGroupCode(infoList[i]));
    }
  }

  poleJevy = removeDuplicates(poleJevy);

  for (var h = 0; h < poleJevy.length; h++) {
    var jevStart = [];
    var jevStarttxt = [];
    var jevEnd = [];
    var jevKrajeList = [];
    var jevOrpList = [];
    for (var i = 0; i < infoList.length; i++) {
      if (poleJevy[h] == getJevGroupCode(infoList[i])) {
        var found = hasMatchingKraj(infoList[i].kraj, omezitNaKraj);
        for (var j = 0; j < infoList[i].kraj.length; j++) {
          if (found) {
            jevKrajeList.push(infoList[i].kraj[j].UID);

            var orpIds = parseOrpIds(infoList[i].orp_list);
            for (var k = 0; k < orpIds.length; k++) {
              var OrpListSplit = orpIds[k];
              var orpData = orpById[OrpListSplit];
              if (orpData && orpData.krajId == omezitNaKraj) {
                jevOrpList.push(orpData.nazev);
              }
            }

            seznjevu.push(getWarnType(infoList[i]));
            var zacatek = Normalize(infoList[i].dc_zacatek);
            if (zacatek < nyni) {
              jevStart.push(0);
              zacatky.push(0);
            } else {
              jevStart.push(zacatek);
              zacatky.push(zacatek);
            }
            zacatkytxt.push(zacatek);
            jevStarttxt.push(zacatek);

            var konec = Normalize(infoList[i].dc_konec);
            konce.push(konec);
            jevEnd.push(konec);
          }
        }
      }
    }
    jevKrajeList = removeDuplicates(jevKrajeList);
    jevKrajeList = jevKrajeList.sort(sortNumericAsc);
    jevOrpList = removeDuplicates(jevOrpList);
    jevOrpList = jevOrpList.sort(sortLexAsc);

    if (jevKrajeList.length > 0) {
      if (omezitNaKraj == -1) {
        resultText += JEVY_SKUPINY[poleJevy[h]];
        sms1 += JEVY_SKUPINY[poleJevy[h]];
        resultText += ' pro kraje ';
        sms1 += ' pro kraje ';

        var seznkraje = joinKrajeCodes(jevKrajeList);
        resultText += seznkraje;
        sms1 += seznkraje;

        if (detailni) {
          var detailTexts = appendResultAndSmsDetail(
            resultText,
            sms1,
            jevStart,
            jevStarttxt,
            jevEnd
          );
          resultText = detailTexts.resultText;
          sms1 = detailTexts.smsText;
        } else {
          resultText += oddelovac;
          sms1 += oddelovac;
        }
      } else {
        resultText += JEVY_SKUPINY[poleJevy[h]];
        sms1 += JEVY_SKUPINY[poleJevy[h]];
        if (vypisOrp) {
          resultText += ' pro ORP ';
          sms1 += ' pro ORP ';

          var seznOrp = joinOrpNames(jevOrpList);
          resultText += seznOrp;
          sms1 += seznOrp;
        }
        if (detailni) {
          var detailTexts = appendResultAndSmsDetail(
            resultText,
            sms1,
            jevStart,
            jevStarttxt,
            jevEnd
          );
          resultText = detailTexts.resultText;
          sms1 = detailTexts.smsText;
        } else {
          resultText += oddelovac;
          sms1 += oddelovac;
        }
      }
    }
  }

  var starty = Math.min.apply(null, zacatky);
  var start = starty.toString();

  var startytxt = Math.min.apply(null, zacatkytxt);
  var starttxt = startytxt.toString();

  var endy = Math.max.apply(null, konce);
  var end = endy.toString();

  var total_zahajeni = ZobrazDatum(start);
  var total_zahajenitxt = ZobrazDatum(starttxt);
  var total_ukonceni = ZobrazDatum(end, 1);

  var rezim = getRezim(seznjevu);

  if (start == 'Infinity' && poleJevy2 && poleJevy2.length > 0) {
    vystupText +=
      'Informace ČHMÚ: byla ukončena platnost vydané výstrahy.' +
      oddelovac;
    sms1 += vystupText;
  } else {
    var uvod = buildUvod(vystraha.ucel, rezim, vystraha.id);
    vystupText += uvod;

    vystupText += resultText;

    if (!detailni) {
      vystupText = appendValidity(
        vystupText,
        total_zahajenitxt,
        total_ukonceni
      );
      sms1 = appendValidity(sms1, total_zahajeni, total_ukonceni);
    }
    if (omezitNaKraj == -1) {
      vystupText += 'Podrobnosti: https://vystrahy-cr.chmi.cz' + oddelovac;
    }
  }
  vystupText = vystupText.substring(0, vystupText.length - oddelovac.length);
}

if (sms1 == sms2) {
  vystupText = '';
}

return vystupText;
