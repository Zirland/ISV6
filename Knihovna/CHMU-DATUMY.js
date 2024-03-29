// Verze 76

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

function ZobrazDatum(datum, format, end) {
    var normDatum = Normalize(datum);
    var format_datum = '';
    if (normDatum == 21000101010000 || normDatum == 'NaNNaNNaNNaNNaNNaN') {
        format_datum = 'do odvolání';
    } else {
        var normDatumRok = normDatum.substring(0, 4);
        var normDatumMesic = normDatum.substring(4, 6);
        var normDatumDen = normDatum.substring(6, 8);
        var normDatumHodina = normDatum.substring(8, 10);
        var normDatumMinuta = normDatum.substring(10, 12);
        var normDatumSekunda = normDatum.substring(12, 14);

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

        switch (format) {
            case 'short':
                format_datum =
                    Number(normDatumDen) +
                    '.' +
                    Number(normDatumMesic) +
                    '. ' +
                    normDatumHodina +
                    ':' +
                    normDatumMinuta;
                break;
            case 'long':
            default:
                format_datum =
                    Number(normDatumDen) +
                    '.' +
                    Number(normDatumMesic) +
                    '.' +
                    normDatumRok +
                    ' ' +
                    normDatumHodina +
                    ':' +
                    normDatumMinuta +
                    ':' +
                    normDatumSekunda;
                break;
        }
    }

    return format_datum;
}

function ZobrazDatumSMS(datum, end) {
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
