// Verze 77

#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";
#import "CHMU-DATUMY";
#import "CHMU-PREPARE";
#import "CHMU-FUNKCE";

var zobrazitVyhled = false;
var zobrazitZmeny = true;
var resultText = '';
var vystupText = '';

var krajList = [];
var ref_krajList = [];
var info;
var pomoc = '';

var pom_mojeUzemi = [];
if (typeof mojeUzemi != 'object') {
  pom_mojeUzemi.push(mojeUzemi);
  mojeUzemi = pom_mojeUzemi;
}

var orpTmp = [];
for (var i = 0; i < orp.length; i++) {
  for (var j = 0; j < orp.length; j++) {
    if (mojeUzemi[j] == orp[i].id) {
      orpTmp.push(orp[i]);
    }
  }
}

orp = orpTmp;

if (vystraha.info && vystraha.info.length > 0) {
  krajList = PrepareInfo(orp, vystraha);
}

if (
  typeof ref_vystraha !== 'undefined' &&
  ref_vystraha.info &&
  ref_vystraha.info.length > 0
) {
  ref_krajList = PrepareInfo(orp, ref_vystraha);
}

var empty = true;
var zmen = 0;

if (vystraha.info && vystraha.info.length > 0) {
  pomoc = PrintInfoList(krajList, ref_krajList);
  zmen = Number(zmen) + Number(pomoc.split('|')[1]);
} else if (
  typeof ref_vystraha !== 'undefined' &&
  ref_vystraha.info &&
  ref_vystraha.info.length > 0
) {
  pomoc = PrintInfoList(krajList, ref_krajList);
  zmen = Number(zmen) + Number(pomoc.split('|')[1]);
}

if (Number(zmen) != 0) {
  var zacatky = [];
  vystupText += 'Na Váš e-mail byla odeslána ';

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
        pomKod += getJevGroupCode(infoList[i]);
        poleJevy.push(pomKod);
        platne.push(infoList[i]);
      }
    }

    poleJevy = removeDuplicates(poleJevy);

    for (var h = 0; h < poleJevy.length; h++) {
      for (var i = 0; i < platne.length; i++) {
        var pomKodIvnj = '';
        if (platne[i].jistota_kod == 'Observed') {
          pomKodIvnj = '0';
        }
        if (poleJevy[h] == pomKodIvnj + getJevGroupCode(platne[i])) {
          var zacatek = Normalize(platne[i].dc_zacatek);
          zacatky.push(zacatek);
        }
      }
      resultText += JEVY_SKUPINY[poleJevy[h]] + ', ';
    }

    var starty = Math.min.apply(null, zacatky);
    var start = starty.toString();

    if (start == 'Infinity') {
      vystupText += 'informace ČHMÚ - byla ukončena platnost vydané výstrahy.';
      vystupText += ', ';
    } else {
      var uvod = '';
      switch (vystraha.ucel) {
        case 'Exercise':
          uvod = 'cvičná zpráva ČHMÚ - ';
          break;
        case 'System':
          uvod = 'systémová zpráva ČHMÚ - ';
          break;
        case 'Test':
          uvod = 'testovací zpráva ČHMÚ - ';
          break;
        default:
          uvod = 'výstraha ČHMÚ - ';
          break;
      }

      vystupText += uvod;
      vystupText += resultText;
    }
    vystupText = vystupText.substring(0, vystupText.length - 2);
  }
}
