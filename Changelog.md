# Changelog
Popis změn v JavaScript předpisech informačního systému Výjezd 6 udržovaných generálním ředitelstvím.

## vývoj
### [CHMU-SMS]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [AA-CHMU-SMS-KRAJ]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [AA-CHMU-SMS-ORP]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

## verze 21 – 2019-01-23
### [CHMU-EMAIL]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [AA-CHMU-EMAIL-ORP]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

### [AA-CHMU-EMAIL-KRAJ]
#### Přidáno
- Parametr umožňuje nastavit vytvoření výstupu pouze při změně oproti minulé výstraze.

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
