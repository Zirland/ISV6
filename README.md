# JavaScript předpisy pro ISV6

## Kategorie Knihovna
Skripty pro úlohy v rámci automatických akcí, úloha IKIS2 "Automatické akce/Knihovna JS".
- Skripty neobsahují žádné konfigurovatelné parametry.
- Název skriptu v knihovně je text před ".js", je třeba zachovat kvůli návaznosti na AA.

### [CHMU-EMAIL-KRAJ]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice. Sestava je koncipována z hlediska území. **Vyžaduje** skript *CHMU-STYL*.

### [CHMU-SMS-KRAJ]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice.

### [CHMU-EMAIL-ORP]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu ORP. Sestava je koncipována z hlediska území. **Vyžaduje** skript *CHMU-STYL*.

### [CHMU-SMS-ORP]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu ORP.

### [CHMU-MAIL-2]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice. Sestava je koncipována z hlediska nebezpečných jevů a je vhodná pro tisk. **Vyžaduje** skript *CHMU-STYL*.

### [CHMU-STYL]
Předpis pro jednotný grafický styl e-mailů.

---
---
## Kategorie AA
Skripty pro automatické akce, úloha IKIS2 "Automatické akce/Evidence automatických akcí".

### [AA-CHMU-EMAIL-KRAJ]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice.

Parametr **hlavniKraj** posunuje zvolený kraj na začátek výpisu, při hodnotě *-1* nedochází ke změně řazení. Číselník území je v proměnné *KRAJE_NAZVY*.

Parametr **zobrazovatVsechnyKraje** může nabývat logických hodnot *false* nebo *true*. Hodnota parametru se zohledňuje pouze v případě, že parametr **hlavniKraj** je nastaven na hodnotu odlišnou od *-1*.

- Při hodnotě *false* jsou zobrazeny pouze jevy týkající se zvoleného hlavního kraje. Záhlaví sestavy (HPPS/SIVS) pak odpovídá situaci ve zvoleném kraji.
- Při hodnotě *true* jsou pod výpisem jevů týkajících se zvoleného hlavního kraje zobrazeny rovněž jevy týkající se ostatních krajů. Záhlaví sestavy (HPPS/SIVS) pak odpovídá situaci v celé ČR.

Parametr **razeniPodleNazvu** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je pořadí ostatních krajů určeno kódem kraje. Tj. Hl. m. Praha, Středočeský, Jihočeský atd.
- Při hodnotě *true* je pořadí ostatních krajů určeno abecedním řazením názvu. Tj. Hl m. Praha, Jihočeský, Jihomoravský atd.

Parametr **zobrazitVyhled** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je jev "Výhled nebezpečných jevů" z tiskové sestavy vyloučen.
- Při hodnotě *true* je jev "Výhled nebezpečných jevů" do tiskové sestavy zahrnut.

Parametr **zobrazitZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* nedochází k porovnávání s předchozí výstrahou. Všechny texty jsou "černé". Zobrazuje se pouze obsah aktuální výstrahy.
- Při hodnotě *true* je obsah výstrahy porovnáván s předchozí výstrahou. Nové texty jsou zeleně, smazané texty červeně. Ukončené jevy jsou zobrazeny jako škrtnuté.

Parametr **pouzeZmeny** může nabývat logických hodnot *false* nebo *true*. Hodnota parametru se uplatňuje pouze v případě, že dochází k porovnávání změn, tj. parametr **zobrazitZmeny** je nastaven na *true*. Pokud k porovnávání změn nedochází, odpovídá chování variantě *false*.

- Při hodnotě *false* je vždy na výstupu tisková sestava obsahující výpis zprávy CAP, a to i v případě, že na zvoleném území nedochází ke změně oproti minulé výstraze.
- Při hodnotě *true* je na výstupu tisková sestava obsahující výpis zprávy CAP pouze v případě, že na zvoleném území dochází ke změně oproti minulé výstraze. Pokud ke změně nedochází, je výstupem prázdná akce.

### [AA-CHMU-SMS-kraj]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice.

Jev "Výhled nebezpečných jevů" je z výstupu vyloučen.

Parametr **omezitNaKraj** obsahuje číselný kód kraje, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v parametru *KRAJE_NAZVY*.

Parametr **detailni** může nabývat hodnot *false* nebo *true*. Hodnota parametru se zohledňuje pouze v případě, že parametr **omezitNaKraj** je nastaven na hodnotu odlišnou od *-1*. Celostátní sestava má hodnotu vždy *false*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů jevů platných pro zvolený kraj. V případě celostátní verze se za názvem jevu uvádí přehled krajů, ve kterých jev platí. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy jevů platných pro zvolený kraj následované rozsahem platnosti tohoto jevu. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.

V celostátní sestavě je poskytován odkaz na stránku výstrahy ve formátu WOCZ59 OPIN na portálu ČHMÚ.

---

## [AA-CHMU-EMAIL-ORP]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu ORP.

Parametr **omezitNaOrp** obsahuje číselný kód obce s rozšířenou působností, pro který se mají zahrnout jevy. Je možno zadat pouze jedno ORP. Skript neumožňuje tvorbu krajské nebo celostátní sestavy. Číselník území je v samostatném souboru "seznam_ORP.csv".

Parametr **zobrazitVyhled** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je jev "Výhled nebezpečných jevů" z tiskové sestavy vyloučen.
- Při hodnotě *true* je jev "Výhled nebezpečných jevů" do tiskové sestavy zahrnut.

Parametr **zobrazitZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* nedochází k porovnávání s předchozí výstrahou. Všechny texty jsou "černé". Zobrazuje se pouze obsah aktuální výstrahy.
- Při hodnotě *true* je obsah výstrahy porovnáván s předchozí výstrahou. Nové texty jsou zeleně, smazané texty červeně. Ukončené jevy jsou zobrazeny jako škrtnuté.

Parametr **pouzeZmeny** může nabývat logických hodnot *false* nebo *true*. Hodnota parametru se uplatňuje pouze v případě, že dochází k porovnávání změn, tj. parametr **zobrazitZmeny** je nastaven na *true*. Pokud k porovnávání změn nedochází, odpovídá chování variantě *false*.

- Při hodnotě *false* je vždy na výstupu tisková sestava obsahující výpis zprávy CAP, a to i v případě, že na zvoleném území nedochází ke změně oproti minulé výstraze.
- Při hodnotě *true* je na výstupu tisková sestava obsahující výpis zprávy CAP pouze v případě, že na zvoleném území dochází ke změně oproti minulé výstraze. Pokud ke změně nedochází, je výstupem prázdná akce.

Parametr **zobrazovatVsechnyKraje** a parametr **razeniPodleNazvu** byly z kódu vypuštěny, protože skript generuje výstup pouze pro jedno ORP.

Oproti krajské sestavě byl z výstupu rovněž vypuštěn výpis "Distribuce", který v kontextu jednoho ORP nedává smysl.

### [AA-CHMU-SMS-ORP]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu ORP.

Jev "Výhled nebezpečných jevů" je z výstupu vyloučen.

Parametr **omezitNaOrp** obsahuje číselný kód obce s rozšířenou působností, pro který se mají zahrnout jevy. Je možno zadat pouze jedno ORP, případně celou Českou republiku. Číselník území je v samostatném souboru "seznam_ORP.csv".

Parametr **detailni** může nabývat hodnot *false* nebo *true*. Hodnota parametru se zohledňuje pouze v případě, že parametr **omezitNaOrp** je nastaven na hodnotu odlišnou od *-1*. Celostátní sestava má hodnotu vždy *false*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů jevů platných pro zvolený kraj. V případě celostátní verze se za názvem jevu uvádí přehled krajů, ve kterých jev platí. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy jevů platných pro zvolený kraj následované rozsahem platnosti tohoto jevu. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.

V celostátní sestavě je poskytován odkaz na stránku výstrahy ve formátu WOCZ59 OPIN na portálu ČHMÚ.

## [AA-CHMU-MAIL-2]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se k celé republice nebo vybranému kraji. Sestava je koncipována z hlediska jevů.

Parametr **omezitNaKraj** obsahuje číselný kód kraje, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v parametru *KRAJE_NAZVY*.

Parametr **zobrazitVyhled** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je jev "Výhled nebezpečných jevů" z tiskové sestavy vyloučen.
- Při hodnotě *true* je jev "Výhled nebezpečných jevů" do tiskové sestavy zahrnut.

Parametr **zobrazitZmeny** je vždy nastaven na *false*.

Předpis neumožňuje (zatím) porovnávání aktuální výstrahy s předchozí výstrahou, zobrazen je pouze obsah aktuální výstrahy.

---
---
## Kategorie UVG
- Skripty pro akce při zpracování výstrahy ve Spojaři, úloha IKIS2 "Administrace/JS UVG předpisy".

### [CHMU-EMAIL]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů ve výstraze ČHMÚ. Slouží pro náhled výstrahy v okně Spojaře (levý sloupec) při zpracování CAP protokolu.

Parametr **hlavniKraj** posunuje zvolený kraj na začátek výpisu, při hodnotě *-1* nedochází ke změně řazení. Číselník území je v proměnné *KRAJE_NAZVY*.

Parametr **zobrazovatVsechnyKraje** může nabývat logických hodnot *false* nebo *true*. Hodnota parametru se zohledňuje pouze v případě, že parametr **hlavniKraj** je nastaven na hodnotu odlišnou od *-1*.

- Při hodnotě *false* jsou zobrazeny pouze jevy týkající se zvoleného hlavního kraje. Záhlaví sestavy (HPPS/SIVS) pak odpovídá situaci ve zvoleném kraji.
- Při hodnotě *true* jsou pod výpisem jevů týkajících se zvoleného hlavního kraje zobrazeny rovněž jevy týkající se ostatních krajů. Záhlaví sestavy (HPPS/SIVS) pak odpovídá situaci v celé ČR.

Parametr **razeniPodleNazvu** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je pořadí ostatních krajů určeno kódem kraje. Tj. Hl. m. Praha, Středočeský, Jihočeský atd.
- Při hodnotě *true* je pořadí ostatních krajů určeno abecedním řazením názvu. Tj. Hl m. Praha, Jihočeský, Jihomoravský atd.

Parametr **zobrazitVyhled** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je jev "Výhled nebezpečných jevů" z tiskové sestavy vyloučen.
- Při hodnotě *true* je jev "Výhled nebezpečných jevů" do tiskové sestavy zahrnut.

Parametr **zobrazitZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* nedochází k porovnávání s předchozí výstrahou. Všechny texty jsou "černé". Zobrazuje se pouze obsah aktuální výstrahy.
- Při hodnotě *true* je obsah výstrahy porovnáván s předchozí výstrahou. Nové texty jsou zeleně, smazané texty červeně. Ukončené jevy jsou zobrazeny jako škrtnuté.

Parametr **pouzeZmeny** může nabývat logických hodnot *false* nebo *true*. Hodnota parametru se uplatňuje pouze v případě, že dochází k porovnávání změn, tj. parametr **zobrazitZmeny** je nastaven na *true*. Pokud k porovnávání změn nedochází, odpovídá chování variantě *false*.

- Při hodnotě *false* je vždy na výstupu tisková sestava obsahující výpis zprávy CAP, a to i v případě, že na zvoleném území nedochází ke změně oproti minulé výstraze.
- Při hodnotě *true* je na výstupu tisková sestava obsahující výpis zprávy CAP pouze v případě, že na zvoleném území dochází ke změně oproti minulé výstraze. Pokud ke změně nedochází, je výstupem prázdná akce.

Skript současně naplňuje UVG element *N.textEMAIL* a jeho výsledek se odesílá níže uvedenou automatickou akcí.
```javascript
//!JS
if (N !== 'undefined' && N.textEMAIL) {
    print(N.textEMAIL);
}
```

### [CHMU-SMS]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů ve výstraze ČHMÚ. Slouží pro náhled výstrahy v okně Spojaře (pravý sloupec uprostřed) při zpracování CAP protokolu.

Jev "Výhled nebezpečných jevů" je z výstupu vyloučen.

Parametr **omezitNaKraj** obsahuje číselný kód území kraje, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v proměnné *KRAJE_NAZVY*

Parametr **detailni** může nabývat hodnot *false* nebo *true*. Hodnota parametru se zohledňuje pouze v případě, že parametr **omezitNaKraj** je nastaven na hodnotu odlišnou od *-1*. Celostátní sestava má hodnotu vždy *false*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů jevů platných pro zvolený kraj. V případě celostátní verze se za názvem jevu uvádí přehled krajů, ve kterých jev platí. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy jevů platných pro zvolený kraj následované rozsahem platnosti tohoto jevu. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.

V celostátní sestavě je poskytován odkaz na stránku výstrahy ve formátu WOCZ59 OPIN na portálu ČHMÚ.


Skript současně naplňuje UVG element *N.textSMS* a jeho výsledek se odesílá níže uvedenou automatickou akcí.
```javascript
//!JS
if (N !== 'undefined' && N.textSMS) {
    print(N.textSMS);
}
```

### [CHMU-MAIL-2]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů ve výstraze ČHMÚ. Slouží pro náhled výstrahy v okně Spojaře (levý sloupec) při zpracování CAP protokolu. Tisková sestava je organizována podle nebezpečných jevů s vyznačením územní platnosti daného jevu. Je úsporná na tiskové strany, vhodná pro celostátní přehled nebo krajský přehled. Sestava neumožňuje filtrování na ORP.

Parametr **omezitNaKraj** obsahuje číselný kód území kraje, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v proměnné *KRAJE_NAZVY*

Parametr **zobrazitVyhled** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je jev "Výhled nebezpečných jevů" z tiskové sestavy vyloučen.
- Při hodnotě *true* je jev "Výhled nebezpečných jevů" do tiskové sestavy zahrnut.

Parametr **zobrazitZmeny** je vždy nastaven na *false*.

Předpis neumožňuje (zatím) porovnávání aktuální výstrahy s předchozí výstrahou, zobrazen je pouze obsah aktuální výstrahy.

Skript současně naplňuje UVG element *N.textEMAIL* a jeho výsledek se odesílá níže uvedenou automatickou akcí.
```javascript
//!JS
if (N !== 'undefined' && N.textEMAIL) {
    print(N.textEMAIL);
}
```
