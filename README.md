# JavaScript předpisy pro ISV6

## Kategorie Knihovna
Skripty pro úlohy v rámci automatických akcí, úloha IKIS2 "Automatické akce/Knihovna JS".
- Skripty neobsahují žádné konfigurovatelné parametry.
- Název skriptu v knihovně je text před ".js", je třeba zachovat kvůli návaznosti na AA.

### [CHMU-EMAIL-KRAJ]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice. Sestava je koncipována z hlediska území.

**Vyžaduje** skripty: *CHMU-STYL*, *CHMU-CISELNIK*, *CHMU-ZVYR-ZMEN*, *CHMU-DATUMY*, *CHMU-PREPARE*, *CHMU-HLAVICKA*

### [CHMU-SMS-KRAJ]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice.

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-DATUMY*

### [CHMU-EMAIL-ORP]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se k jednomu ORP nebo skupině více ORP (např. okres). Sestava je koncipována z hlediska území. 
> Skript nahrazuje funkci skriptu [CHMU-EMAIL-OKRES], který byl ve verzi 64 odstraněn.

**Vyžaduje** skripty: *CHMU-STYL*, *CHMU-CISELNIK*, *CHMU-ZVYR-ZMEN*, *CHMU-DATUMY*, *CHMU-PREPARE*, *CHMU-HLAVICKA*

### [CHMU-SMS-ORP]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se k jednomu ORP nebo skupině více ORP (např. okres).
> Skript nahrazuje funkci skriptu [CHMU-SMS-OKRES], který byl ve verzi 64 odstraněn.

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-DATUMY*

### [CHMU-MAIL-2]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice. Sestava je koncipována z hlediska nebezpečných jevů a je vhodná pro tisk.

**Vyžaduje** skripty: *CHMU-STYL*, *CHMU-CISELNIK*, *CHMU-DATUMY*, *CHMU-HLAVICKA*, *CHMU-ZVYR-ZMEN*, *CHMU-PREPARE*, *CHMU-DIFF*

### [CHMU-SMS-KRAJ-SKUP]
Předpis pro vytvoření SMS zprávy s přehledem skupin nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice.

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-DATUMY*

### [CHMU-SMS-ORP-SKUP]
Předpis pro vytvoření SMS zprávy s přehledem skupin nebezpečných jevů vztahujících se k jednomu ORP nebo skupině více ORP (např. okres).
> Skript nahrazuje funkci skriptu [CHMU-SMS-OKRES], který byl ve verzi 64 odstraněn.

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-DATUMY*

### [CHMU-NOTIF-KRAJ]
Předpis pro vytvoření notifikační SMS zprávy v případě, kdy byl odeslán krajský e-mail.

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-ZVYR-ZMEN*, *CHMU-DATUMY*, *CHMU-PREPARE*

### [CHMU-NOTIF-ORP]
Předpis pro vytvoření notifikační SMS zprávy v případě, kdy byl odeslán e-mail na ORP.

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-ZVYR-ZMEN*, *CHMU-DATUMY*, *CHMU-PREPARE*

### [CHMU-SMS-KRAJ-LK]
Předpis pro vytvoření notifikační SMS zprávy v případě, kdy byl odeslán krajský e-mail v Libereckém kraji.

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-ZVYR-ZMEN*, *CHMU-DATUMY*, *CHMU-PREPARE*

### [CHMU-SMS-ORP-LK]
Předpis pro vytvoření notifikační SMS zprávy v případě, kdy byl odeslán e-mail pro jedno ORP nebo skupinu ORP (okres) v Libereckém kraji.
> Skript nahrazuje funkci skriptu [CHMU-SMS-OKRES-LK], který byl ve verzi 64 odstraněn.

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-ZVYR-ZMEN*, *CHMU-DATUMY*, *CHMU-PREPARE*

### [CHMU-CISELNIK]
Předpis obsahující potřebné číselníky jevů a území.

### [CHMU-DATUMY]
Předpis pro práci s datumy a časem.

### [CHMU-DIFF]
Procedura pro zjištění zda došlo ke změně oproti předchozí výstraze.

### [CHMU-HLAVICKA]
Předpis pro jednotný úvod tiskové sestavy.

### [CHMU-PREPARE]
Předpis pro přípravu seznamu platných jevů.

### [CHMU-STYL]
Předpis pro jednotný grafický styl e-mailů.

### [CHMU-ZVYR-ZMEN]
Předpis pro zjištění změn a jejich zvýrazenění.

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

- Při hodnotě *false* není zobrazeno porovnávání s předchozí výstrahou. Všechny texty jsou "černé". Zobrazuje se pouze obsah aktuální výstrahy.
- Při hodnotě *true* je zobrazeno porovnávání aktuální výstrahy s předchozí výstrahou. Nové texty jsou zeleně, smazané texty červeně. Ukončené jevy jsou zobrazeny jako škrtnuté.

Parametr **pouzeZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je vždy na výstupu tisková sestava obsahující výpis zprávy CAP, a to i v případě, že na zvoleném území nedochází ke změně oproti minulé výstraze.
- Při hodnotě *true* je na výstupu tisková sestava obsahující výpis zprávy CAP pouze v případě, že na zvoleném území dochází ke změně oproti minulé výstraze. Pokud ke změně nedochází, je výstupem prázdná akce.

Parametr **distrSeznamNahore** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je seznam distribuce (krajů) zobrazen pod přehledem nebezpečných jevů na posledním řádku sestavy.
- Při hodnotě *true* je seznam distribuce (krajů) zobrazen nad hlavičkou výstražné zprávy na prvním řádku sestavy.

### [AA-CHMU-SMS-KRAJ]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice.

Jev "Výhled nebezpečných jevů" je z výstupu vyloučen.

Parametr **omezitNaKraj** obsahuje číselný kód kraje, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v parametru *KRAJE_NAZVY*.

Parametr **detailni** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů jevů platných pro zvolený kraj. V případě celostátní verze se za názvem jevu uvádí přehled krajů, ve kterých jev platí. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy jevů platných pro zvolený kraj následované rozsahem platnosti tohoto jevu. V případě celostátní verze se za názvem jevu uvádí přehled krajů, ve kterých jev v uvedeném časovém období platí. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **vypisOrp** může nabývat hodnot *false* nebo *true*. Parametr funguje pouze v rámci konkrétního kraje, nelze uplatnit na celostátní SMS.

- Při hodnotě *false* není ve výsledné SMS zprávě vyjmenován seznam ORP v rámci kraje, na jejichž území jev platí.
- Při hodnotě *true* je text SMS zprávy rozšířen o seznam ORP v rámci kraje, na jejichž území jev platí. Je tak možno rozpoznat změnu rozsahu území.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.

V celostátní sestavě je poskytován odkaz na stránku výstrahy ve formátu WOCZ59 OPIN na portálu ČHMÚ.

### [AA-CHMU-SMS-KRAJ-SKUP]
Předpis pro vytvoření SMS zprávy s přehledem skupin nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice.

Skupina "Výhled nebezpečných jevů" je z výstupu vyloučena.

Parametr **omezitNaKraj** obsahuje číselný kód kraje, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v parametru *KRAJE_NAZVY*.

Parametr **detailni** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů skupin jevů platných pro zvolený kraj. V případě celostátní verze se za názvem skupiny jevů uvádí přehled krajů, ve kterých jevy platí. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy skupin jevů platných pro zvolený kraj následované rozsahem platnosti tohoto jevu. V případě celostátní verze se za názvem skupiny jevů uvádí přehled krajů, ve kterých jevy v uvedeném časovém období platí. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **vypisOrp** může nabývat hodnot *false* nebo *true*. Parametr funguje pouze v rámci konkrétního kraje, nelze uplatnit na celostátní SMS.

- Při hodnotě *false* není ve výsledné SMS zprávě vyjmenován seznam ORP v rámci kraje, na jejichž území jevy platí.
- Při hodnotě *true* je text SMS zprávy rozšířen o seznam ORP v rámci kraje, na jejichž území jevy platí. Je tak možno rozpoznat změnu rozsahu území.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (skupin jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.

V celostátní sestavě je poskytován odkaz na stránku výstrahy ve formátu WOCZ59 OPIN na portálu ČHMÚ.

### [AA-CHMU-NOTIF-KRAJ]
Předpis pro vytvoření SMS zprávy notifikující odeslání e-mailu s výstrahou vztahující se ke konkrétnímu kraji nebo celé republice.

Parametr **omezitNaKraj** obsahuje číselný kód kraje, pro který se generují maily. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v parametru *KRAJE_NAZVY*.

---

### [AA-CHMU-EMAIL-ORP]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se k jednomu ORP nebo skupině více ORP (např. okres).
> Skript nahrazuje funkci skriptu [AA-CHMU-EMAIL-OKRES], který byl ve verzi 64 odstraněn.

Parametr **mojeUzemi** obsahuje jeden nebo více kódů obce s rozšířenou působností, pro který se mají zahrnout jevy. V případě, kdy je kódů více, je nutno je zadat do hranatých závorek [1996, 1970]. Číselník území je v samostatném souboru "seznam_ORP.csv".

Parametr **nazevUzemi** obsahuje pojmenování vymezeného území. Slouží výhradně pro výpis v hlavičce tiskové sestavy, může obsahovat volný text.

Parametr **zobrazitVyhled** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je jev "Výhled nebezpečných jevů" z tiskové sestavy vyloučen.
- Při hodnotě *true* je jev "Výhled nebezpečných jevů" do tiskové sestavy zahrnut.

Parametr **zobrazitZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* není zobrazeno porovnávání s předchozí výstrahou. Všechny texty jsou "černé". Zobrazuje se pouze obsah aktuální výstrahy.
- Při hodnotě *true* je zobrazeno porovnávání aktuální výstrahy s předchozí výstrahou. Nové texty jsou zeleně, smazané texty červeně. Ukončené jevy jsou zobrazeny jako škrtnuté.

Parametr **pouzeZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je vždy na výstupu tisková sestava obsahující výpis zprávy CAP, a to i v případě, že na zvoleném území nedochází ke změně oproti minulé výstraze.
- Při hodnotě *true* je na výstupu tisková sestava obsahující výpis zprávy CAP pouze v případě, že na zvoleném území dochází ke změně oproti minulé výstraze. Pokud ke změně nedochází, je výstupem prázdná akce.

### [AA-CHMU-SMS-ORP]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se k jednomu ORP nebo skupině více ORP (např. okres).
> Skript nahrazuje funkci skriptu [AA-CHMU-SMS-OKRES], který byl ve verzi 64 odstraněn.

Jev "Výhled nebezpečných jevů" je z výstupu vyloučen.

Parametr **mojeUzemi** obsahuje jeden nebo více kódů obce s rozšířenou působností, pro který se mají zahrnout jevy. V případě, kdy je kódů více, je nutno je zadat do hranatých závorek [1996, 1970]. Číselník území je v samostatném souboru "seznam_ORP.csv".

Parametr **detailni** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů jevů platných pro zvolené ORP. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy jevů platných pro zvolené ORP následované rozsahem platnosti tohoto jevu. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **vypisOrp** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* není ve výsledné SMS zprávě vyjmenován seznam ORP, na jejichž území jev platí.
- Při hodnotě *true* je text SMS zprávy rozšířen o seznam ORP, na jejichž území jev platí. Je tak možno rozpoznat změnu rozsahu území.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.

### [AA-CHMU-SMS-ORP-SKUP]
Předpis pro vytvoření SMS zprávy s přehledem skupin nebezpečných jevů vztahujících se k jednomu ORP nebo skupině více ORP (např. okres).
> Skript nahrazuje funkci skriptu [AA-CHMU-SMS-OKRES-SKUP], který byl ve verzi 64 odstraněn.

Skupina "Výhled nebezpečných jevů" je z výstupu vyloučena.

Parametr **mojeUzemi** obsahuje jeden nebo více kódů obce s rozšířenou působností, pro který se mají zahrnout jevy. V případě, kdy je kódů více, je nutno je zadat do hranatých závorek [1996, 1970]. Číselník území je v samostatném souboru "seznam_ORP.csv".

Parametr **detailni** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů skupin jevů platných pro zvolené ORP. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy skupin jevů platných pro zvolené ORP následované rozsahem platnosti tohoto jevu. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **vypisOrp** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* není ve výsledné SMS zprávě vyjmenován seznam ORP, na jejichž území jev platí.
- Při hodnotě *true* je text SMS zprávy rozšířen o seznam ORP, na jejichž území jev platí. Je tak možno rozpoznat změnu rozsahu území.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (skupin jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.

### [AA-CHMU-NOTIF-ORP]
Předpis pro vytvoření SMS zprávy notifikující odeslání e-mailu s výstrahou vztahujícího se ke konkrétnímu ORP.

Parametr **omezitNaOrp** obsahuje číselný kód obce s rozšířenou působností, pro který se mají zahrnout jevy. Je možno zadat pouze jedno ORP. Číselník území je v samostatném souboru "seznam_ORP.csv".

---

### [AA-CHMU-MAIL-2]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se k celé republice nebo vybranému kraji. Tisková sestava je organizována podle nebezpečných jevů s vyznačením územní platnosti daného jevu. Je úsporná na tiskové strany, vhodná pro celostátní přehled nebo krajský přehled. Sestava neumožňuje filtrování na ORP.

Parametr **omezitNaKraj** obsahuje číselný kód kraje, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v parametru *KRAJE_NAZVY*.

Parametr **zobrazitVyhled** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je jev "Výhled nebezpečných jevů" z tiskové sestavy vyloučen.
- Při hodnotě *true* je jev "Výhled nebezpečných jevů" do tiskové sestavy zahrnut.

Parametr **pouzeZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je vždy na výstupu tisková sestava obsahující výpis zprávy CAP, a to i v případě, že na zvoleném území nedochází ke změně oproti minulé výstraze.
- Při hodnotě *true* je na výstupu tisková sestava obsahující výpis zprávy CAP pouze v případě, že na zvoleném území dochází ke změně oproti minulé výstraze. Pokud ke změně nedochází, je výstupem prázdná akce.

Parametr **distrSeznamNahore** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je seznam distribuce (krajů) zobrazen pod přehledem nebezpečných jevů na posledním řádku sestavy.
- Při hodnotě *true* je seznam distribuce (krajů) zobrazen nad hlavičkou výstražné zprávy na prvním řádku sestavy.

Parametr **slucovat** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* se územní platnost jevu vyjadřuje plným výpisem všech ORP, pro které jev platí.
- Při hodnotě *true* dochází ke slučování území na vyšší prvky (okresy, kraje) pro zkrácení výstupu.

Předpis neumožňuje barevné zvýrazenění rozdílu aktuální výstrahy s předchozí výstrahou, zobrazen je pouze obsah aktuální výstrahy.

---
### [AA-CHMU-SMS-KRAJ-LK]
Předpis pro vytvoření notifikační SMS zprávy v případě, kdy byl odeslán krajský e-mail v Libereckém kraji.

Parametr **omezitNaKraj** obsahuje číselný kód Libereckého kraje. Hodnotu prosím neměňte.

### [AA-CHMU-SMS-ORP-LK]
Předpis pro vytvoření notifikační SMS zprávy v případě, kdy byl odeslán e-mail na jedno ORP nebo skupinu ORP (okres) v Libereckém kraji.
> Skript nahrazuje funkci skriptu [AA-CHMU-SMS-OKRES-LK], který byl ve verzi 64 odstraněn.

Parametr **mojeUzemi** obsahuje číselné kódy ORP, které definují zájmové území. Číselník území je v samostatném souboru "seznam_ORP.csv". Formát zprávy je dle požadavků HZS LIK. Skript neprovádí kontrolu, zda je zájmové území uvnitř Libereckého kraje.

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

- Při hodnotě *false* není zobrazeno porovnávání s předchozí výstrahou. Všechny texty jsou "černé". Zobrazuje se pouze obsah aktuální výstrahy.
- Při hodnotě *true* je zobrazeno porovnávání aktuální výstrahy s předchozí výstrahou. Nové texty jsou zeleně, smazané texty červeně. Ukončené jevy jsou zobrazeny jako škrtnuté.

Parametr **pouzeZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je vždy na výstupu tisková sestava obsahující výpis zprávy CAP, a to i v případě, že na zvoleném území nedochází ke změně oproti minulé výstraze.
- Při hodnotě *true* je na výstupu tisková sestava obsahující výpis zprávy CAP pouze v případě, že na zvoleném území dochází ke změně oproti minulé výstraze. Pokud ke změně nedochází, je výstupem prázdná akce.

Parametr **distrSeznamNahore** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je seznam distribuce (krajů) zobrazen pod přehledem nebezpečných jevů na posledním řádku sestavy.
- Při hodnotě *true* je seznam distribuce (krajů) zobrazen nad hlavičkou výstražné zprávy na prvním řádku sestavy.

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

Parametr **detailni** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů jevů platných pro zvolený kraj. V případě celostátní verze se za názvem jevu uvádí přehled krajů, ve kterých jev platí. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy jevů platných pro zvolený kraj následované rozsahem platnosti tohoto jevu. V případě celostátní verze se za názvem jevu uvádí přehled krajů, ve kterých jev v uvedeném období platí. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **vypisOrp** může nabývat hodnot *false* nebo *true*. Parametr funguje pouze v rámci konkrétního kraje, nelze uplatnit na celostátní SMS.

- Při hodnotě *false* není ve výsledné SMS zprávě vyjmenován seznam ORP v rámci kraje, na jejichž území jev platí.
- Při hodnotě *true* je text SMS zprávy rozšířen o seznam ORP v rámci kraje, na jejichž území jev platí. Je tak možno rozpoznat změnu rozsahu území.

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

Parametr **omezitNaKraj** obsahuje číselný kód území kraje, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v proměnné *KRAJE_NAZVY*.

Parametr **zobrazitVyhled** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je jev "Výhled nebezpečných jevů" z tiskové sestavy vyloučen.
- Při hodnotě *true* je jev "Výhled nebezpečných jevů" do tiskové sestavy zahrnut.

Parametr **pouzeZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je vždy na výstupu tisková sestava obsahující výpis zprávy CAP, a to i v případě, že na zvoleném území nedochází ke změně oproti minulé výstraze.
- Při hodnotě *true* je na výstupu tisková sestava obsahující výpis zprávy CAP pouze v případě, že na zvoleném území dochází ke změně oproti minulé výstraze. Pokud ke změně nedochází, je výstupem prázdná akce.

Parametr **distrSeznamNahore** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je seznam distribuce (krajů) zobrazen pod přehledem nebezpečných jevů na posledním řádku sestavy.
- Při hodnotě *true* je seznam distribuce (krajů) zobrazen nad hlavičkou výstražné zprávy na prvním řádku sestavy.

Parametr **slucovat** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* se územní platnost jevu vyjadřuje plným výpisem všech ORP, pro které jev platí.
- Při hodnotě *true* dochází ke slučování území na vyšší prvky (okresy, kraje) pro zkrácení výstupu.

Předpis neumožňuje porovnávání aktuální výstrahy s předchozí výstrahou, zobrazen je pouze obsah aktuální výstrahy.

Skript současně naplňuje UVG element *N.textEMAIL* a jeho výsledek se odesílá níže uvedenou automatickou akcí.
```javascript
//!JS
if (N !== 'undefined' && N.textEMAIL) {
    print(N.textEMAIL);
}
```

### [CHMU-SMS-KRAJ-SKUP]
Předpis pro vytvoření SMS zprávy s přehledem skupin nebezpečných jevů vztahujících se ke konkrétnímu kraji nebo celé republice.

Skupina "Výhled nebezpečných jevů" je z výstupu vyloučena.

Parametr **omezitNaKraj** obsahuje číselný kód kraje, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v parametru *KRAJE_NAZVY*.

Parametr **detailni** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů skupin jevů platných pro zvolený kraj. V případě celostátní verze se za názvem skupiny jevů uvádí přehled krajů, ve kterých jevy platí. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy skupin jevů platných pro zvolený kraj následované rozsahem platnosti tohoto jevu. V případě celostátní verze se za názvem skupiny jevů uvádí přehled krajů, ve kterých jevy v uvedeném časovém období platí. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **vypisOrp** může nabývat hodnot *false* nebo *true*. Parametr funguje pouze v rámci konkrétního kraje, nelze uplatnit na celostátní SMS.

- Při hodnotě *false* není ve výsledné SMS zprávě vyjmenován seznam ORP v rámci kraje, na jejichž území jevy platí.
- Při hodnotě *true* je text SMS zprávy rozšířen o seznam ORP v rámci kraje, na jejichž území jevy platí. Je tak možno rozpoznat změnu rozsahu území.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (skupin jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.

V celostátní sestavě je poskytován odkaz na stránku výstrahy ve formátu WOCZ59 OPIN na portálu ČHMÚ.

Skript současně naplňuje UVG element *N.textSMS* a jeho výsledek se odesílá níže uvedenou automatickou akcí.
```javascript
//!JS
if (N !== 'undefined' && N.textSMS) {
    print(N.textSMS);
}
```



---
---
ARCHIV verze 63
---

### [CHMU-EMAIL-OKRES]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se ke skupině ORP (typicky okres). Sestava vychází z krajské sestavy.

**Vyžaduje** skripty: *CHMU-STYL*, *CHMU-CISELNIK*, *CHMU-ZVYR-ZMEN*, *CHMU-DATUMY*, *CHMU-PREPARE*, *CHMU-HLAVICKA*

### [CHMU-SMS-OKRES]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se ke skupině ORP (typicky okres).

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-DATUMY*

### [CHMU-SMS-OKRES-SKUP]
Předpis pro vytvoření SMS zprávy s přehledem skupin nebezpečných jevů vztahujících se ke skupině ORP (typicky okres).

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-DATUMY*

### [CHMU-SMS-OKRES-LK]
Předpis pro vytvoření notifikační SMS zprávy v případě, kdy byl odeslán e-mail pro skupinu ORP (okres) v Libereckém kraji.

**Vyžaduje** skripty: *CHMU-CISELNIK*, *CHMU-ZVYR-ZMEN*, *CHMU-DATUMY*, *CHMU-PREPARE*

---

### [AA-CHMU-EMAIL-OKRES]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů vztahujících se ke skupině ORP (typicky okres).

Parametr **mojeUzemi** obsahuje seznam jednotlivých kódů ORP, které pokrývají zájmové území.

Parametr **nazevUzemi** obsahuje pojmenování vymezeného území. Slouží výhradně pro výpis v hlavičce tiskové sestavy, může obsahovat volný text.

Parametr **zobrazitVyhled** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je jev "Výhled nebezpečných jevů" z tiskové sestavy vyloučen.
- Při hodnotě *true* je jev "Výhled nebezpečných jevů" do tiskové sestavy zahrnut.

Parametr **zobrazitZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* není zobrazeno porovnávání s předchozí výstrahou. Všechny texty jsou "černé". Zobrazuje se pouze obsah aktuální výstrahy.
- Při hodnotě *true* je zobrazeno porovnávání aktuální výstrahy s předchozí výstrahou. Nové texty jsou zeleně, smazané texty červeně. Ukončené jevy jsou zobrazeny jako škrtnuté.

Parametr **pouzeZmeny** může nabývat logických hodnot *false* nebo *true*.

- Při hodnotě *false* je vždy na výstupu tisková sestava obsahující výpis zprávy CAP, a to i v případě, že na zvoleném území nedochází ke změně oproti minulé výstraze.
- Při hodnotě *true* je na výstupu tisková sestava obsahující výpis zprávy CAP pouze v případě, že na zvoleném území dochází ke změně oproti minulé výstraze. Pokud ke změně nedochází, je výstupem prázdná akce.

### [AA-CHMU-SMS-OKRES]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů vztahujících se ke skupině ORP (typicky okres).

Jev "Výhled nebezpečných jevů" je z výstupu vyloučen.

Parametr **mojeUzemi** obsahuje seznam jednotlivých kódů ORP, které pokrývají zájmové území.

Parametr **detailni** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů jevů platných pro zvolené území. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy jevů platných pro zvolené území následované rozsahem platnosti tohoto jevu. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **vypisOrp** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* není ve výsledné SMS zprávě vyjmenován seznam ORP, na jejichž území jev platí.
- Při hodnotě *true* je text SMS zprávy rozšířen o seznam ORP, na jejichž území jev platí. Je tak možno rozpoznat změnu rozsahu území.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.

### [AA-CHMU-SMS-OKRES-SKUP]
Předpis pro vytvoření SMS zprávy s přehledem skupin nebezpečných jevů vztahujících se ke skupině ORP (typicky okres).

Skupina "Výhled nebezpečných jevů" je z výstupu vyloučena.

Parametr **mojeUzemi** obsahuje seznam jednotlivých kódů ORP, které pokrývají zájmové území.

Parametr **detailni** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů skupin jevů platných pro zvolené území. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy skupin jevů platných pro zvolené území následované rozsahem platnosti této  skupiny jevů. Rozsah platnosti celé výstrahy se neuvádí.

Parametr **vypisOrp** může nabývat hodnot *false* nebo *true*.

- Při hodnotě *false* není výpis doplněn.
- Při hodnotě *true* je text SMS zprávy rozšířen o seznam ORP, na jejichž území jev platí. Je tak možno rozpoznat změnu rozsahu území.

Parametr **oddelovac** definuje způsob oddělení jednotlivých záznamů (skupin jevů) od sebe. Pro zalomení řádku použijte '\n'. Když tam dáte čárku nebo středník, nezapomeňte za ně dát mezeru.


### [AA-CHMU-SMS-ORP-LK]
Předpis pro vytvoření notifikační SMS zprávy v případě, kdy byl odeslán e-mail pro ORP v Libereckém kraji.

Parametr **omezitNaOrp** obsahuje číselný kód obce s rozšířenou působností, pro který se mají zahrnout jevy. Je možno zadat pouze jedno ORP. Skript neprovádí kontrolu, zda je ORP uvnitř Libereckého kraje. 
