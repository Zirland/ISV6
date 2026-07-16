// Verze 79

#import "CHMU-DATUMY";
#import "CHMU-CISELNIK";
#import "CHMU-FUNKCE";

var pom_mojeUzemi = [];
if (typeof mojeUzemi != 'object') {
  pom_mojeUzemi.push(mojeUzemi);
  mojeUzemi = pom_mojeUzemi;
}
var orpById = {};
for (var oi = 0; oi < orp.length; oi++) {
  orpById[orp[oi].id] = orp[oi];
}

var zacatky2 = [];
var konce2 = [];
var sms2 = '';

if (typeof ref_vystraha !== 'undefined' && ref_vystraha.info) {
  var ref_infoList = [];
  for (var i = 0; i < ref_vystraha.info.length; i++) {
    var refOrpListArr = ref_vystraha.info[i].orp_list.toString().split(',');
    for (j = 0; j < mojeUzemi.length; j++) {
      if (refOrpListArr.indexOf(mojeUzemi[j].toString()) > -1) {
        ref_infoList.push(ref_vystraha.info[i]);
      }
    }
  }

  ref_infoList = ref_infoList.sort(compareInfoByPriority);
}

if (ref_infoList) {
  var poleJevy2 = [];
  var platne2 = [];
  for (var i = 0; i < ref_infoList.length; i++) {
    if (
      ref_infoList[i].stupen_kod != 'OUTLOOK' &&
      !UkoncenyJev(ref_infoList[i].dc_konec, vystraha.dc_odeslano)
    ) {
      var pomKod2 = '';
      if (ref_infoList[i].jistota_kod == 'Observed') {
        pomKod2 += '0';
      }
      pomKod2 += ref_infoList[i].stupen_kod;
      poleJevy2.push(pomKod2);
      platne2.push(ref_infoList[i]);
    }
  }

  poleJevy2 = removeDuplicates(poleJevy2);

  for (var h = 0; h < poleJevy2.length; h++) {
    var jevStart2 = [];
    var jevEnd2 = [];
    var jevOrpList2 = [];
    for (var i = 0; i < platne2.length; i++) {
      var pomKodIvnj2 = '';
      if (platne2[i].jistota_kod == 'Observed') {
        pomKodIvnj2 = '0';
      }
      if (poleJevy2[h] == pomKodIvnj2 + platne2[i].stupen_kod) {
        var OrpList2 = ref_infoList[i].orp_list;
        var OrpListArr2 = OrpList2.toString().split(',');

        for (var k = 0; k < OrpListArr2.length; k++) {
          var OrpListSplit2 = OrpListArr2[k].split('[')[0];
          var orpItem2 = orpById[OrpListSplit2];
          for (var m = 0; m < mojeUzemi.length; m++) {
            if (
              orpItem2 &&
              OrpListSplit2 == orpItem2.id &&
              orpItem2.id == mojeUzemi[m]
            ) {
              jevOrpList2.push(orpItem2.nazev);
            }
          }
        }

        var nyni = Normalize(vystraha.dc_odeslano);
        var zacatek2 = Normalize(platne2[i].dc_zacatek);
        if (zacatek2 < nyni) {
          zacatky2.push(0);
          jevStart2.push(0);
        } else {
          zacatky2.push(zacatek2);
          jevStart2.push(zacatek2);
        }
        var konec2 = Normalize(platne2[i].dc_konec);
        konce2.push(konec2);
        jevEnd2.push(konec2);
      }
    }

    jevOrpList2 = removeDuplicates(jevOrpList2);
    jevOrpList2 = jevOrpList2.sort(sortLexAsc);

    sms2 += JEVY_NAZVY[poleJevy2[h]];
    if (vypisOrp) {
      sms2 += ' pro ORP ';

      var seznOrp2 = '';

      for (var t = 0; t < jevOrpList2.length; t++) {
        seznOrp2 += jevOrpList2[t] + ', ';
      }
      seznOrp2 = seznOrp2.substring(0, seznOrp2.length - 2);
      sms2 += seznOrp2;
    }
    if (detailni) {
      var jevStarty2 = Math.min.apply(null, jevStart2);
      var jevZacatek2 = jevStarty2.toString();

      var jevEndy2 = Math.max.apply(null, jevEnd2);
      var jevKonec2 = jevEndy2.toString();

      var zahajeni2 = ZobrazDatumSMS(jevZacatek2);
      var ukonceni2 = ZobrazDatumSMS(jevKonec2, 1);

      sms2 += ' od ' + zahajeni2 + ' do ' + ukonceni2 + oddelovac;
    } else {
      sms2 += oddelovac;
    }
  }

  var starty2 = Math.min.apply(null, zacatky2);
  var start2 = starty2.toString();

  var endy2 = Math.max.apply(null, konce2);
  var end2 = endy2.toString();

  var total_zahajeni2 = ZobrazDatumSMS(start2);
  var total_ukonceni2 = ZobrazDatumSMS(end2, 1);

  if (start2 == 'Infinity' && poleJevy2 && poleJevy2.length > 0) {
    sms2 +=
      'Informace ČHMÚ: byla ukončena platnost vydané výstrahy.' +
      oddelovac;
  } else {
    if (!detailni) {
      sms2 +=
        'Platnost od ' +
        total_zahajeni2 +
        ' do ' +
        total_ukonceni2 +
        oddelovac;
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
  var infoList = [];
  for (var i = 0; i < vystraha.info.length; i++) {
    var orpListArrByInfo = vystraha.info[i].orp_list.toString().split(',');
    for (j = 0; j < mojeUzemi.length; j++) {
      if (orpListArrByInfo.indexOf(mojeUzemi[j].toString()) > -1) {
        infoList.push(vystraha.info[i]);
      }
    }
  }

  infoList = infoList.sort(compareInfoByPriority);
}

if (infoList) {
  var poleJevy = [];
  var platne = [];
  for (var i = 0; i < infoList.length; i++) {
    if (infoList[i].stupen_kod != 'OUTLOOK') {
      var pomKod = '';
      if (infoList[i].jistota_kod == 'Observed') {
        pomKod += '0';
      }
      pomKod += infoList[i].stupen_kod;
      poleJevy.push(pomKod);
      platne.push(infoList[i]);
    }
  }

  poleJevy = removeDuplicates(poleJevy);

  for (var h = 0; h < poleJevy.length; h++) {
    var jevStart = [];
    var jevStarttxt = [];
    var jevEnd = [];
    var jevOrpList = [];
    for (var i = 0; i < platne.length; i++) {
      var pomKodIvnj = '';
      if (platne[i].jistota_kod == 'Observed') {
        pomKodIvnj = '0';
      }
      if (poleJevy[h] == pomKodIvnj + platne[i].stupen_kod) {
        var OrpList = infoList[i].orp_list;
        var OrpListArr = OrpList.toString().split(',');

        for (var k = 0; k < OrpListArr.length; k++) {
          var OrpListSplit = OrpListArr[k].split('[')[0];
          var orpItem = orpById[OrpListSplit];
          for (var m = 0; m < mojeUzemi.length; m++) {
            if (
              orpItem &&
              OrpListSplit == orpItem.id &&
              orpItem.id == mojeUzemi[m]
            ) {
              jevOrpList.push(orpItem.nazev);
            }
          }
        }

        var warn_type = 'SVRS';
        if (platne[i].SIVS == '1') {
          warn_type = 'SIVS';
        }
        if (platne[i].HPPS == '1') {
          warn_type = 'HPPS';
        }
        seznjevu.push(warn_type);
        var zacatek = Normalize(platne[i].dc_zacatek);
        if (zacatek < nyni) {
          jevStart.push(0);
          zacatky.push(0);
        } else {
          jevStart.push(zacatek);
          zacatky.push(zacatek);
        }
        zacatkytxt.push(zacatek);
        jevStarttxt.push(zacatek);

        var konec = Normalize(platne[i].dc_konec);
        konce.push(konec);
        jevEnd.push(konec);
      }
    }

    jevOrpList = removeDuplicates(jevOrpList);
    jevOrpList = jevOrpList.sort(sortLexAsc);

    resultText += JEVY_NAZVY[poleJevy[h]];
    sms1 += JEVY_NAZVY[poleJevy[h]];
    if (vypisOrp) {
      resultText += ' pro ORP ';
      sms1 += ' pro ORP ';

      var seznOrp = '';

      for (var t = 0; t < jevOrpList.length; t++) {
        seznOrp += jevOrpList[t] + ', ';
      }
      seznOrp = seznOrp.substring(0, seznOrp.length - 2);
      resultText += seznOrp;
      sms1 += seznOrp;
    }
    if (detailni) {
      var jevStarty = Math.min.apply(null, jevStart);
      var jevZacatek = jevStarty.toString();

      var jevStartytxt = Math.min.apply(null, jevStarttxt);
      var jevZacatektxt = jevStartytxt.toString();

      var jevEndy = Math.max.apply(null, jevEnd);
      var jevKonec = jevEndy.toString();

      var zahajeni = ZobrazDatumSMS(jevZacatek);
      var zahajenitxt = ZobrazDatumSMS(jevZacatektxt);
      var ukonceni = ZobrazDatumSMS(jevKonec, 1);

      resultText += ' od ' + zahajenitxt + ' do ' + ukonceni + oddelovac;
      sms1 += ' od ' + zahajeni + ' do ' + ukonceni + oddelovac;
    } else {
      resultText += oddelovac;
      sms1 += oddelovac;
    }
  }

  var starty = Math.min.apply(null, zacatky);
  var start = starty.toString();

  var startytxt = Math.min.apply(null, zacatkytxt);
  var starttxt = startytxt.toString();

  var endy = Math.max.apply(null, konce);
  var end = endy.toString();

  var total_zahajeni = ZobrazDatumSMS(start);
  var total_zahajenitxt = ZobrazDatumSMS(starttxt);
  var total_ukonceni = ZobrazDatumSMS(end, 1);

  var rezim = 'SVRS';
  if (seznjevu.indexOf('SIVS') > -1) {
    rezim = 'SIVS';
  }
  if (seznjevu.indexOf('HPPS') > -1) {
    rezim = 'HPPS';
  }

  if (start == 'Infinity' && poleJevy2 && poleJevy2.length > 0) {
    vystupText +=
      'Informace ČHMÚ: byla ukončena platnost vydané výstrahy.' +
      oddelovac;
    sms1 += vystupText;
  } else {
    switch (vystraha.ucel) {
      case 'Exercise':
        var uvod = 'Cvičná zpráva ';
        break;
      case 'System':
        var uvod = 'Systémová zpráva ';
        break;
      case 'Test':
        var uvod = 'Testovací zpráva ';
        break;
      default:
        var uvod = 'Výstraha ';
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

    var poradi_zpravy = vystraha.id.substring(vystraha.id.length - 6);
    uvod += 'č. ' + Number(poradi_zpravy) + ': ';
    vystupText += uvod;

    vystupText += resultText;

    if (!detailni) {
      vystupText +=
        'Platnost od ' +
        total_zahajenitxt +
        ' do ' +
        total_ukonceni +
        oddelovac;
      sms1 +=
        'Platnost od ' +
        total_zahajeni +
        ' do ' +
        total_ukonceni +
        oddelovac;
    }
  }
  vystupText = vystupText.substring(0, vystupText.length - oddelovac.length);
}

if (sms1 == sms2) {
  vystupText = '';
}
