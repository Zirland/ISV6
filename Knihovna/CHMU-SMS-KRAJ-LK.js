// Verze 78

#import "CHMU-DATUMY";
#import "CHMU-CISELNIK";
#import "CHMU-ZVYR-ZMEN";
#import "CHMU-PREPARE";
#import "CHMU-FUNKCE";

var omezitNaKraj = 78;
var zobrazitVyhled = false;
var zobrazitZmeny = true;
var vystupText = '';

var orpTmp = [];

for (var i = 0; i < orp.length; i++) {
  if (omezitNaKraj == orp[i].kraj.id) {
    orpTmp.push(orp[i]);
  }
}

orp = orpTmp;

var resultText = '';
var krajList = [];
var ref_krajList = [];
var info;
var pomoc = '';

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
    for (var l = 0; l < vystraha.info.length; l++) {
      infoList.push(vystraha.info[l]);
    }

    infoList = infoList.sort(compareInfoByPriority);
  }

  if (infoList) {
    var poleJevy = [];
    for (var i = 0; i < infoList.length; i++) {
      if (infoList[i].stupen_kod != 'OUTLOOK') {
        var pomKod = '';
        if (infoList[i].jistota_kod == 'Observed') {
          pomKod += '0';
        }
        pomKod += getJevGroupCode(infoList[i]);
        poleJevy.push(pomKod);
      }
    }

    poleJevy = removeDuplicates(poleJevy);

    for (var h = 0; h < poleJevy.length; h++) {
      var jevKrajeList = [];
      for (var i = 0; i < infoList.length; i++) {
        var pomKodIvnj = '';
        if (infoList[i].jistota_kod == 'Observed') {
          pomKodIvnj = '0';
        }
        if (poleJevy[h] == pomKodIvnj + getJevGroupCode(infoList[i])) {
          var found = false;
          for (
            var j = 0;
            j < infoList[i].kraj.length && !found;
            j++
          ) {
            found = infoList[i].kraj[j].UID == omezitNaKraj;
          }
          for (var j = 0; j < infoList[i].kraj.length; j++) {
            if (found) {
              jevKrajeList.push(infoList[i].kraj[j].UID);
              var zacatek = Normalize(infoList[i].dc_zacatek);
              zacatky.push(zacatek);
            }
          }
        }
      }
      jevKrajeList = removeDuplicates(jevKrajeList);
      jevKrajeList = jevKrajeList.sort(sortNumericAsc);

      if (jevKrajeList.length > 0) {
        resultText += JEVY_SKUPINY[poleJevy[h]] + ', ';
      }
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
