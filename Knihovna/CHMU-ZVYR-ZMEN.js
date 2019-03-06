// Verze 30

// Zjednodušené zobrazení rozdílů (porovnává se celý text)
function SimpleHighlightDiff(newValue, oldValue)
{
    var resultText = '';
    var zmena = 0;
    var newText = newValue ? newValue.toString() : '';
    var oldText = oldValue ? oldValue.toString() : '';

    if (oldText == newText)
    {
        resultText += oldText;
    }
    else
    {
        resultText += '<font color="red"><s>' + oldText + '</s></font>';
        resultText += oldText && newText ? '<br/>' : '';
        resultText += '<font color="green">' + newText + '</font>';
        zmena = 1;
    }

    resultText = resultText + '|' + zmena;
    return resultText;
}

// Zvýraznění rozdílů dvou textů
function HighlightDiff(newValue, oldValue)
{
    var resultText = '';
    var zmena = 0;

    // Převedeme na pole podle mezer
    var newValueSplit = newValue != undefined ? newValue.split(' ') : [];
    var oldValueSplit = oldValue != undefined ? oldValue.split(' ') : [];

    if (newValueSplit.length == 0 || oldValueSplit.length == 0)
    {
        resultText = SimpleHighlightDiff(newValue, oldValue);
    }
    else
    {
        // Spočteme si matici vzdáleností
        var matrix = GetLCSLength(newValueSplit, oldValueSplit);

        var i = newValueSplit.length;
        var j = oldValueSplit.length;

        var changeList = [];

        while (i > 0 && j > 0)
        {
            if (newValueSplit[i - 1] == oldValueSplit[j - 1])
            {
                var changeValue = {};
                changeValue.text = newValueSplit[i - 1];
                changeValue.change = 0;

                changeList.push(changeValue);

                i--;
                j--;
            }
            else if (matrix[i][j - 1] > matrix[i - 1][j])
            {
                var changeValue = {};
                changeValue.text = oldValueSplit[j - 1];
                changeValue.change = -1;

                changeList.push(changeValue);

                j--;
            }
            else
            {
                var changeValue = {};
                changeValue.text = newValueSplit[i - 1];
                changeValue.change = 1;

                changeList.push(changeValue);

                i--;
            }
        }

        while (i > 0)
        {
            var changeValue = {};
            changeValue.text = newValueSplit[i - 1];
            changeValue.change = 1;

            changeList.push(changeValue);

            i--;
        }

        while (j > 0)
        {
            var changeValue = {};
            changeValue.text = oldValueSplit[j - 1];
            changeValue.change = -1;

            changeList.push(changeValue);

            j--;
        }

        var lastChange = 0;

        // Slova máme v seznamu v opačném pořadí
        for (var index = changeList.length; index > 0; index--)
        {
            if (lastChange != changeList[index - 1].change)
            {
                if (index != changeList.length)
                {
                    resultText += (lastChange == -1 ? '</s></font>' : '');
                }

                lastChange = changeList[index - 1].change;

                if (lastChange == 1)
                {
                    resultText += '<font color="green">';
                    zmena = 1;
                }
                else if (lastChange == -1)
                {
                    resultText += '<font color="red"><s>';
                    zmena = 1;
                }
                else
                {
                    resultText += '</s><font color="black">';
                }
            }

            resultText += changeList[index - 1].text + ' ';
        }

        if (changeList.length > 0)
        {
            if (lastChange == 1) {
                resultText += '</font>';
            }
            else if (lastChange == -1) {
                resultText += '</s></font>';
            }
            else {
                resultText += '</font>';
            }
        }
        resultText = resultText + '|' + zmena;
    }

    return resultText;
}

// Metoda pro spočtení vzdálenosti slov (dvou polí)
function GetLCSLength(newValueSplit, oldValueSplit)
{
    // Vytvoříme dvojrozměrné pole a inicializujeme ho nulou
    var matrix = new Array(newValueSplit.length + 1);

    for (var i = 0; i < newValueSplit.length + 1; i++)
    {
        matrix[i] = new Array(oldValueSplit.length + 1);

        for (var j = 0; j < oldValueSplit.length + 1; j++)
        {
            matrix[i][j] = 0;
        }
    }

    // Spočteme vzdálenosti
    for (var i = 1; i < (newValueSplit.length + 1); i++)
    {
        for (var j = 1; j < (oldValueSplit.length + 1); j++)
        {
            if (newValueSplit[i - 1] == oldValueSplit[j - 1])
            {
                matrix[i][j] = matrix[i - 1][j - 1] + 1;
            }
            else
            {
                matrix[i][j] = Math.max(matrix[i][j - 1], matrix[i - 1][j]);
            }
        }
    }

    return matrix;
}
