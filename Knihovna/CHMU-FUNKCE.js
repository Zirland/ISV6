// Verze 78

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

function sortNumericAsc(a, b) {
  return a - b;
}

function sortLexAsc(a, b) {
  if (a < b) return -1;
  if (a > b) return 1;
  return 0;
}

function compareByRegionOrder(kraj1, kraj2, okres1, okres2, orp1, orp2) {
  if (kraj1 < kraj2) return -1;
  if (kraj1 > kraj2) return 1;
  if (okres1 < okres2) return -1;
  if (okres1 > okres2) return 1;
  if (orp1 < orp2) return -1;
  if (orp1 > orp2) return 1;
  return 0;
}

function getJevGroupCode(infoItem) {
  var splitkod = infoItem.stupen_kod.split('.');
  var skupina = splitkod[0];
  if (skupina == 'WARN' || skupina == 'REG' || skupina == 'SMOGSIT') {
    skupina = splitkod[1];
  }
  return skupina;
}

function hasAnyInfoForRegion(krajList, ref_krajList, k) {
  var found =
    krajList[k].info.length > 0 ||
    (ref_krajList.length > 0 && ref_krajList[k].info.length > 0);

  for (var o = 0; o < krajList[k].okresList.length && !found; o++) {
    found =
      krajList[k].okresList[o].info.length > 0 ||
      (ref_krajList.length > 0 && ref_krajList[k].okresList[o].info.length > 0);

    for (
      var ol = 0;
      ol < krajList[k].okresList[o].orpList.length && !found;
      ol++
    ) {
      found =
        krajList[k].okresList[o].orpList[ol].info.length > 0 ||
        (ref_krajList.length > 0 &&
          ref_krajList[k].okresList[o].orpList[ol].info.length > 0);
    }
  }

  return found;
}

function hasAnyInfoForRefRegion(ref_krajList, k) {
  var found = ref_krajList[k].info.length > 0;

  for (var o = 0; o < ref_krajList[k].okresList.length && !found; o++) {
    found = ref_krajList[k].okresList[o].info.length > 0;

    for (
      var ol = 0;
      ol < ref_krajList[k].okresList[o].orpList.length && !found;
      ol++
    ) {
      found = ref_krajList[k].okresList[o].orpList[ol].info.length > 0;
    }
  }

  return found;
}

function buildDistributionList(krajList, ref_krajList) {
  var dist = '';

  for (var k = 0; k < krajList.length; k++) {
    if (hasAnyInfoForRegion(krajList, ref_krajList, k)) {
      dist += (dist ? ', ' : '') + KRAJE_KODY[krajList[k].id];
    }
  }

  if (krajList.length == 0) {
    for (var rk = 0; rk < ref_krajList.length; rk++) {
      if (hasAnyInfoForRefRegion(ref_krajList, rk)) {
        dist += (dist ? ', ' : '') + KRAJE_KODY[ref_krajList[rk].id];
      }
    }
  }

  return dist;
}

function pushUniqueOrdered(list, seen, value) {
  if (!value) {
    return;
  }
  if (!seen[value]) {
    seen[value] = true;
    list.push(value);
  }
}