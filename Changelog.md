# Changelog
Popis změn v JavaScript předpisech informačního systému Výjezd 6 udržovaných generálním ředitelstvím.

## vývoj
### [CHMU-EMAIL]
#### Přidáno
- Vymazání tagu *\<br/>* z popisu, doporučení a hydrologické zprávy.

#### Změněno
- Zkrácení názvu některých jevů ve výpisu.

#### Známé chyby
- Údaj o nadmořské výšce není porovnáván na změny mezi zprávami (SU 37811)
- Při tisku dochází k postupnému zužování šířky stránky (SU 37816)

### [CHMU-SMS]
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

#### Odstraněno
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