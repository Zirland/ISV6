# JavaScript předpisy pro ISV6

## [CHMU-EMAIL]
Předpis pro vytvoření e-mailové zprávy s přehledem nebezpečných jevů ve výstraze ČHMÚ.

Jev "Výhled nebezpečných jevů" je do výstupu zahrnut.

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

## [CHMU-SMS]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů ve výstraze ČHMÚ.

Jev "Výhled nebezpečných jevů" je z výstupu vyloučen.

Parametr **omezitNaKraj** obsahuje číselný kód území, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v proměnné *KRAJE_NAZVY*

Parametr **detailni** může nabývat hodnot *false* nebo *true*. Hodnota parametru se zohledňuje pouze v případě, že parametr **hlavniKraj** je nastaven na hodnotu odlišnou od *-1*. Celostátní sestava má hodnotu vždy *false*.

- Při hodnotě *false* je generována souhrnná sestava, která obsahuje pouze přehled názvů jevů platných pro zvolený kraj. V případě celostátní verze se za názvem jevu uvádí přehled krajů, ve kterých jev platí. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě *true* je generována podrobná sestava, která obsahuje názvy jevů platných pro zvolený kraj následované rozsahem platnosti tohoto jevu. Rozsah platnosti celé výstrahy se neuvádí.

V celostátní sestavě je poskytován odkaz na stránku výstrahy ve formátu WOCZ59 OPIN na portálu ČHMÚ.
