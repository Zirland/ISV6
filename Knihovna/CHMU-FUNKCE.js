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

function pushUniqueOrdered(list, seen, value) {
  if (!seen[value]) {
    seen[value] = true;
    list.push(value);
  }
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
