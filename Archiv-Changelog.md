**Novější změny jsou uvedeny v souboru [Changelog.md](Changelog.md)**

## verze 29 – 2019-02-26
### [Knihovna/CHMU-PREPARE]
#### Změněno
- Formát zobrazení doby platnosti jevu SVRS.

### [Knihovna/CHMU-SMS-KRAJ]
#### Záplata
- Vymazání obsahu pomocných proměnných potřebných pro porovnání změn.

### [Knihovna/CHMU-SMS-ORP]
#### Záplata
- Vymazání obsahu pomocných proměnných potřebných pro porovnání změn.

### [UVG/CHMU-EMAIL]
#### Změněno
- Formát zobrazení doby platnosti jevu SVRS.

### [UVG/CHMU-SMS]
#### Záplata
- Vymazání obsahu pomocných proměnných potřebných pro porovnání změn.

## verze 28 – 2019-02-19
### [Knihovna/CHMU-DATUMY]
#### Záplata
- Ošetření formátování data při rušení jevu.

## verze 27 – 2019-02-17
- Rozčlenění skriptů v Knihovně na funkční bloky bez změny funkčnosti.

## verze 26 – 2019-02-11
### [UVG/CHMU-SMS]
#### Záplata
- Ošetření situace, kdy není odkaz na předchozí výstrahu.

### [Knihovna/CHMU-SMS-KRAJ]
#### Záplata
- Ošetření situace, kdy není odkaz na předchozí výstrahu.

### [Knihovna/CHMU-SMS-ORP]
#### Záplata
- Ošetření situace, kdy není odkaz na předchozí výstrahu.

## verze 25 – 2019-02-04
### [UVG/CHMU-EMAIL]
#### Změněno
- Ukončení jevu o půlnoci se prezentuje jako ukončení ve 24:00 hodin předchozího dne.

### [UVG/CHMU-SMS]
#### Změněno
- Ukončení jevu o půlnoci se prezentuje jako ukončení ve 24:00 hodin předchozího dne.

### [UVG/CHMU-MAIL-2]
#### Přidáno
- Synchronizace funkcionalit tiskové sestavy s ostatními předpisy.

#### Známé chyby
- Sestava neumožňuje porovnávání s předchozí výstrahou.

### [Knihovna/CHMU-EMAIL-KRAJ]
#### Změněno
- Ukončení jevu o půlnoci se prezentuje jako ukončení ve 24:00 hodin předchozího dne.

### [Knihovna/CHMU-EMAIL-ORP]
#### Změněno
- Ukončení jevu o půlnoci se prezentuje jako ukončení ve 24:00 hodin předchozího dne.

### [Knihovna/CHMU-SMS-KRAJ]
#### Změněno
- Ukončení jevu o půlnoci se prezentuje jako ukončení ve 24:00 hodin předchozího dne.

### [Knihovna/CHMU-SMS-ORP]
#### Změněno
- Ukončení jevu o půlnoci se prezentuje jako ukončení ve 24:00 hodin předchozího dne.

### [Knihovna/CHMU-MAIL-2]
#### Přidáno
- Vytvořen skript pro tiskovou sestavu seskupenou po nebezpečných jevech.

#### Známé chyby
- Sestava neumožňuje porovnávání s předchozí výstrahou.

### [AA/AA-CHMU-MAIL-2]
#### Přidáno
- Vytvořena automatická akce pro novou sestavu.

## verze 24 – 2019-02-01
### [UVG/CHMU-EMAIL]
#### Změněno
- Porovnání výstrah je prováděno na úrovni kategorie jevů, změna závažnosti jevů. (autor: Stratil Petr, RCS Kladno; řeší SU 37900)

### [Knihovna/CHMU-EMAIL-KRAJ]
#### Změněno
- Porovnání výstrah je prováděno na úrovni kategorie jevů, změna závažnosti jevů. (autor: Stratil Petr, RCS Kladno; řeší SU 37900)

### [Knihovna/CHMU-EMAIL-ORP]
#### Změněno
- Porovnání výstrah je prováděno na úrovni kategorie jevů, změna závažnosti jevů. (autor: Stratil Petr, RCS Kladno; řeší SU 37900)

## verze 23 – 2019-01-31
### [UVG/CHMU-SMS]
#### Změněno
- Správnou funkčnost neprovedení prázdné akce je nutno zajistit úpravou automatické akce spojené s UVG předpisem, viz *README.md* (autor: Rataj Stanislav, RCS Kladno)

### [UVG/CHMU-EMAIL]
#### Změněno
- Správnou funkčnost neprovedení prázdné akce je nutno zajistit úpravou automatické akce spojené s UVG předpisem, viz *README.md* (autor: Rataj Stanislav, RCS Kladno)

### [AA/AA-CHMU-SMS-KRAJ]
#### Změněno
- Úprava procesu neprovedení prázdné akce. (autor: Rataj Stanislav, RCS Kladno)

### [AA/AA-CHMU-SMS-ORP]
#### Změněno
- Úprava procesu neprovedení prázdné akce. (autor: Rataj Stanislav, RCS Kladno)

### [AA/AA-CHMU-EMAIL-KRAJ]
#### Změněno
- Úprava procesu neprovedení prázdné akce. (autor: Rataj Stanislav, RCS Kladno)

### [AA/AA-CHMU-EMAIL-ORP]
#### Změněno
- Úprava procesu neprovedení prázdné akce. (autor: Rataj Stanislav, RCS Kladno)

## verze 22 – 2019-01-25
### [UVG/CHMU-SMS]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [UVG/CHMU-EMAIL]
#### Přidáno
- Ošetření případu prázdné výstrahy, při použití parametru **pouzeZmeny** je výsledkem prázdná akce.

### [Knihovna/CHMU-SMS-KRAJ]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [Knihovna/CHMU-SMS-ORP]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [Knihovna/CHMU-EMAIL-ORP]
#### Přidáno
- Ošetření případu prázdné výstrahy, při použití parametru **pouzeZmeny** je výsledkem prázdná akce.

### [Knihovna/CHMU-EMAIL-KRAJ]
#### Přidáno
- Ošetření případu prázdné výstrahy, při použití parametru **pouzeZmeny** je výsledkem prázdná akce.

### [AA/AA-CHMU-SMS-KRAJ]
#### Přidáno
- Podpis se vkládá pouze pokud bylo akcí vygenerovano nějaké tělo zprávy.

### [AA/AA-CHMU-SMS-ORP]
#### Přidáno
- Podpis se vkládá pouze pokud bylo akcí vygenerovano nějaké tělo zprávy.

## verze 21 – 2019-01-24
- Úložiště rozčleněno na kategorie - AA, Knihovna, UVG. Podrobnosti v dokumentaci

### [UVG/CHMU-EMAIL]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [Knihovna/CHMU-EMAIL-ORP]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [Knihovna/CHMU-EMAIL-KRAJ]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [AA/AA-CHMU-EMAIL-ORP]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [AA/AA-CHMU-EMAIL-KRAJ]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [Knihovna/CHMU-STYL]
#### Přidáno
- Vytvoření souboru s definicí jednotného grafického stylu e-mailu.

## verze 20 – 2019-01-21
### [CHMU-MAIL-2]
#### Přidáno
- Příprava porovnávání změny nadmořské výšky platnosti jevu oproti předchozí výstraze. (řeší SU 37811, autor: Stratil Petr, RCS Kladno)

#### Známé chyby
- Sestava neumožňuje vytvoření rozdílové sestavy oproti minulé výstraze.

### [CHMU-EMAIL]
#### Přidáno
- Porovnávání změny nadmořské výšky platnosti jevu oproti předchozí výstraze. (řeší SU 37811, autor: Stratil Petr, RCS Kladno)

### [AA-CHMU-EMAIL-ORP]
#### Přidáno
- Porovnávání změny nadmořské výšky platnosti jevu oproti předchozí výstraze. (řeší SU 37811, autor: Stratil Petr, RCS Kladno)

### [AA-CHMU-EMAIL-KRAJ]
#### Přidáno
- Porovnávání změny nadmořské výšky platnosti jevu oproti předchozí výstraze. (řeší SU 37811, autor: Stratil Petr, RCS Kladno)

## verze 19 – 2019-01-18
### [CHMU-MAIL-2]
#### Záplate
- Ošetření prázdných výstrah

#### Známé chyby
- Sestava neumožňuje vytvoření rozdílové sestavy oproti minulé výstraze.

### [AA-CHMU-SMS-ORP]
#### Záplata
- Ošetření prázdných výstrah.

## verze 18 – 2019-01-16
### [CHMU-MAIL-2]
#### Přidáno
- Vytvoření nové tiskové sestavy podle mimořádných jevů

#### Známé chyby
- Sestava neumožňuje vytvoření rozdílové sestavy oproti minulé výstraze.

## verze 17 – 2019-01-14
### [CHMU-EMAIL]
#### Přidáno
- Pokud je jev v platnosti již od minulé výstrahy, nepovažuje se hodnota "čas začátku" za změněnou.
- Při vydání nové výstrahy se jevy končící v období 30 minut před začátkem nové výstrahy považují již za vypršelé.
- Parametr umožňující vypnutí porovnávání změn.

### [CHMU-SMS]
#### Přidáno
- Zavedení parametru oddělovače pro formátování zprávy.

### [AA-CHMU-SMS-ORP]
#### Přidáno
- Zavedení parametru oddělovače pro formátování zprávy.

### [AA-CHMU-SMS-kraj]
#### Přidáno
- Zavedení parametru oddělovače pro formátování zprávy.

### [AA-CHMU-EMAIL-ORP]
#### Přidáno
- Vytvořen skript pro automatické akce.

### [AA-CHMU-EMAIL-KRAJ]
#### Přidáno
- Vytvořen skript pro automatické akce.

## verze 16 – 2019-01-11
### [AA-CHMU-SMS-ORP]
#### Záplata
- Úprava práce se zobrazením data.

### [AA-CHMU-SMS-kraj]
#### Záplata
- Úprava práce se zobrazením data.

## verze 15 – 2019-01-10
### [AA-CHMU-SMS-ORP]
#### Změněno
- Úprava práce se zobrazením data.

### [AA-CHMU-SMS-kraj]
#### Změněno
- Úprava práce se zobrazením data.

### [CHMU-SMS]
#### Změněno
- Úprava práce se zobrazením data.

#### Záplata
- Úprava syntaxe pro AA.

## verze 14 – 2019-01-10
### [CHMU-EMAIL]
#### Změněno
- Úprava zpracování datumu a času (autor: Stratil Petr, RCS Kladno)

#### Známé chyby
- Údaj o nadmořské výšce není porovnáván na změny mezi zprávami (SU 37811)

### [AA-CHMU-SMS-ORP]
#### Přidáno
- Vytvořen skript pro automatické akce (upravená syntaxe).
- Využití nové funkcionality ISV6 - Knihovna JS.

### [AA-CHMU-SMS-kraj]
#### Přidáno
- Vytvořen skript pro automatické akce (upravená syntaxe).
- Využití nové funkcionality ISV6 - Knihovna JS.

## verze 13 – 2019-01-08
### [CHMU-EMAIL]
#### Změněno
- Úprava záhlaví SIVS dle videokonference.

#### Známé chyby
- Údaj o nadmořské výšce není porovnáván na změny mezi zprávami (SU 37811)

## verze 12 – 2019-01-08
### [CHMU-EMAIL]
#### Přidáno
- Vymazání tagu *\<br/>* z popisu, doporučení a hydrologické zprávy.

#### Změněno
- Zkrácení názvu některých jevů ve výpisu.

#### Známé chyby
- Údaj o nadmořské výšce není porovnáván na změny mezi zprávami (SU 37811)

### [CHMU-SMS]
#### Přidáno
- Sloučení krajů, ve kterých platí stejný jev, např. v odlišném časovém období.

#### Změněno
- Zkrácení názvu některých jevů ve výpisu.

## verze 11 – 2019-01-07
### [CHMU-EMAIL]
#### Přidáno
- Zobrazení územní platnosti sestavy.
- Zobrazení nadmořských výšek platnosti jevů. (řeší SU 37778)
- Možnost vyloučení jevu Výhled nebezpečných jevů - parametr.
- Odstranění vypršelých jevů. (řeší SU 37795)

#### Změněno
- Úprava textu nadpisů a hlavičky.
- Způsob řazení je možno nastavit parametrem.
- Úprava formátu data a času. (řeší SU 37745)

#### Odstraněno
- Odstraněna pole "Doplňková informace" a výpis měřících profilů na tocích na základě změny směrnice ČHMÚ.

#### Záplata
- Oprava zvýraznění změn.

#### Známé chyby
- Údaj o nadmořské výšce není porovnáván na změny mezi zprávami (SU 37811)

### [CHMU-SMS]
#### Změněno
- Úprava způsobu určení typu zprávy.

## verze 10 – 2019-01-05
### [CHMU-EMAIL]
#### Změněno
- Úprava nadpisů nad tabulkami.
- Distribuce vyjádřena zkratkami krajů.
- Řazení krajů podle číselníkového pořadí.
- Úprava způsobu výpisu informace o výskytu nebezpečného jevu.
- Grafická úprava vzhledu výpisu.

#### Odstraněno
- Odstranění kódů jevů z výstupu.

#### Známé chyby
- Není zobrazena informace o nadmořské výšce platnosti jevu. (SU 37778)
- Jsou zobrazeny vypršelé výstrahy, jejichž platnost skončila před vydáním zobrazené výstrahy. (SU 37795)

## verze 9 – 2019-01-04
### [CHMU-SMS]
#### Změněno
- Úprava názvů krajů.

## verze 8 – 2019-01-02
### [CHMU-SMS]
#### Změněno
- Změna způsobu zjištění typu výstrahy na základě směrnice ČHMÚ.

#### Záplata
- Vynucení souhrnného výpisu pro celou ČR.

## verze 7 – 2018-12-28
### [CHMU-SMS]
#### Změněno
- Zjednodušení číselníku kategorie jevů pro typ výstrahy.

## verze 6 – 2018-12-27
### [CHMU-SMS]
#### Přidáno
- Rozlišení typu výstražné informace HPPS, SIVS a SVRS.
- Odlišení cvičné zprávy.

## verze 5 – 2018-12-21
### [CHMU-SMS]
#### Přidáno
- Vytvoření univerzálního skriptu pro kraje i GŘ.
- Zavedení parametru pro výběr mezi souhrnným a detailním výpisem.
- Odlišení informační zprávy od výstražné informace.