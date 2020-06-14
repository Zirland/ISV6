# Changelog
Popis změn v JavaScript předpisech informačního systému Výjezd 6 udržovaných generálním ředitelstvím.

## verze 64 – 2020-06-14
### [AA/AA-CHMU-EMAIL-OKRES]
#### Odstraněno
- Funkce integrovány do skriptu [AA-CHMU-EMAIL-ORP].

### [AA/AA-CHMU-EMAIL-ORP]
#### Změněno
- Integrace vlastností pro více ORP (okres).
- Změna názvu parametru **omezitNaOrp** -> **mojeUzemi**.
- Přidání parametru **nazevUzemi**.

### [AA/AA-CHMU-SMS-KRAJ-LK]
#### Změněno
- Vzhledem k tomu, že skript je cíleně určen pro Liberecký kraj, byl odstraněn parametr **omezitNaKraj**, jehož hodnota je konstatní.
- Odstraněn číselník krajů.

### [AA/AA-CHMU-SMS-OKRES]
#### Odstraněno
- Funkce integrovány do skriptu [AA-CHMU-SMS-ORP].

### [AA/AA-CHMU-SMS-OKRES-LK]
#### Odstraněno
- Funkce integrovány do skriptu [AA-CHMU-SMS-ORP-LK].

### [AA/AA-CHMU-SMS-OKRES-SKUP]
#### Odstraněno
- Funkce integrovány do skriptu [AA-CHMU-SMS-ORP-SKUP].

### [AA/AA-CHMU-SMS-ORP]
#### Změněno
- Integrace vlastností pro více ORP (okres).
- Změna názvu parametru **omezitNaOrp** -> **mojeUzemi**.
- Přidání parametru **vypisOrp**.

### [AA/AA-CHMU-SMS-ORP-LK]
#### Změněno
- Integrace vlastností pro více ORP (okres).
- Změna názvu parametru **omezitNaOrp** -> **mojeUzemi**.

### [AA/AA-CHMU-SMS-ORP-SKUP]
#### Změněno
- Integrace vlastností pro více ORP (okres).
- Změna názvu parametru **omezitNaOrp** -> **mojeUzemi**.
- Přidání parametru **vypisOrp**.

### [Knihovna/CHMU-CISELNIK]
#### Přidáno
- Přidán číselník krajů.

### [Knihovna/CHMU-EMAIL-OKRES]
#### Odstraněno
- Funkce integrovány do skriptu [CHMU-EMAIL-ORP].

### [Knihovna/CHMU-EMAIL-ORP]
#### Změněno
- Integrace vlastností pro více ORP (okres).
- Úprava zpracování seznamu ORP vymezující území.
- Územní platnost je text definovaný uživatelem.

### [Knihovna/CHMU-MAIL2]
#### Změněno
- Úprava zpracování seznamu ORP vymezující území.
- Řazení jevů podle závažnosti.

### [Knihovna/CHMU-SMS-KRAJ-LK]
#### Přidáno
- Hodnota **omezitNaKraj** je konstanta nastavená na Liberecký kraj.

#### Změněno
- Řazení jevů podle závažnosti.

### [Knihovna/CHMU-SMS-OKRES]
#### Odstraněno
- Funkce integrovány do skriptu [CHMU-SMS-ORP].

### [Knihovna/CHMU-SMS-OKRES-LK]
#### Odstraněno
- Funkce integrovány do skriptu [CHMU-SMS-ORP-LK].

### [Knihovna/CHMU-SMS-OKRES-SKUP]
#### Odstraněno
- Funkce integrovány do skriptu [CHMU-SMS-ORP-SKUP].

### [Knihovna/CHMU-SMS-ORP]
#### Změněno
- Integrace vlastností pro více ORP (okres).
- Úprava zpracování seznamu ORP vymezující území.
- Řazení jevů podle závažnosti.

### [Knihovna/CHMU-SMS-ORP-LK]
#### Změněno
- Integrace vlastností pro více ORP (okres).
- Úprava zpracování seznamu ORP vymezující území.
- Řazení jevů podle závažnosti.

### [Knihovna/CHMU-SMS-ORP-SKUP]
#### Změněno
- Integrace vlastností pro více ORP (okres).
- Úprava zpracování seznamu ORP vymezující území.
- Řazení jevů podle závažnosti.

### [Knihovna/CHMU-PREPARE]
#### Změněno
- Úprava zpracování seznamu ORP vymezující území. (autor: Stratil Petr, RCS Kladno)

### [UVG/CHMU-MAIL2]
#### Změněno
- Úprava zpracování seznamu ORP vymezující území. (autor: Stratil Petr, RCS Kladno)
- Řazení jevů podle závažnosti.

### [UVG/CHMU-SMS]
#### Změněno
- Řazení jevů podle závažnosti.

### [UVG/CHMU-SMS-KRAJ-LK]
#### Změněno
- Řazení jevů podle závažnosti.

### [UVG/CHMU-SMS-SKUP]
#### Změněno
- Řazení jevů podle závažnosti.

## verze 63 – 2020-06-09
### [Knihovna/CHMU-EMAIL-OKRES]
#### Změněno
- Úprava zpracování zpracování seznamu ORP vymezujících území.

## verze 62 – 2019-10-15
### [Knihovna/CHMU-PREPARE]
#### Změněno
- Úprava zpracování prázdné nebo rušící výstrahy.

### [UVG/CHMU-EMAIL]
#### Změněno
- Úprava zpracování prázdné nebo rušící výstrahy.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Úprava zpracování prázdné nebo rušící výstrahy.

### [UVG/CHMU-NOTIF-KRAJ]
#### Změněno
- Úprava zpracování prázdné nebo rušící výstrahy.

### [UVG/CHMU-SMS-KRAJ-LK]
#### Změněno
- Úprava zpracování prázdné nebo rušící výstrahy.
- Úprava a zjednodušení zdrojového kódu.

## verze 61 – 2019-08-29
### [AA/AA-CHMU-SMS-KRAJ-LK]
#### Přidáno
- Na základě upřesněného požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů, specifický pro Liberecký kraj.

### [AA/AA-CHMU-SMS-OKRES-LK]
#### Přidáno
- Na základě upřesněného požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů, specifický pro Liberecký kraj.

### [AA/AA-CHMU-SMS-ORP-LK]
#### Přidáno
- Na základě upřesněného požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů, specifický pro Liberecký kraj.

### [Knihovna/CHMU-CISELNIK]
#### Změněno
- Upraveno jméno pro skupinu I dle požadavku LIK.

### [Knihovna/CHMU-SMS-KRAJ-LK]
#### Přidáno
- Na základě upřesněného požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů, specifický pro Liberecký kraj.

### [Knihovna/CHMU-SMS-OKRES-LK]
#### Přidáno
- Na základě upřesněného požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů, specifický pro Liberecký kraj.

### [Knihovna/CHMU-SMS-ORP-LK]
#### Přidáno
- Na základě upřesněného požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů, specifický pro Liberecký kraj.

### [UVG/CHMU-SMS-KRAJ-LK]
#### Přidáno
- Na základě upřesněného požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů, specifický pro Liberecký kraj.

## verze 60 – 2019-08-22
### [AA/AA-CHMU-SMS-KRAJ-SKUP]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů.

### [AA/AA-CHMU-SMS-OKRES-SKUP]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů.

### [AA/AA-CHMU-SMS-ORP-SKUP]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů.

### [Knihovna/CHMU-CISELNIK]
#### Přidáno
- Vytvořen číselník pro skupiny jevů.

### [Knihovna/CHMU-SMS-KRAJ-SKUP]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů.

### [Knihovna/CHMU-SMS-OKRES-SKUP]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů.

### [Knihovna/CHMU-SMS-ORP-SKUP]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů.

### [UVG/CHMU-SMS-SKUPINY]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro SMS, informace o skupinách jevů.

## verze 59 – 2019-07-30
### [AA/AA-CHMU-EMAIL-OKRES]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro mail, sestava pro územní odbor.

### [AA/AA-CHMU-SMS-OKRES]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro SMS, údaje za územní odbor.

### [Knihovna/CHMU-EMAIL-OKRES]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro mail, sestava pro územní odbor.

### [Knihovna/CHMU-SMS-OKRES]
#### Přidáno
- Na základě požadavku HZS LIK vytvořen nový skript pro SMS, údaje za územní odbor.

### [Knihovna/CHMU-SMS-KRAJ]
#### Záplata
- Oprava chyby při výpisu ORP.

### [UVG/CHMU-SMS]
#### Záplata
- Oprava chyby při výpisu ORP.

## verze 58 – 2019-07-13
### [AA/AA-CHMU-NOTIF-KRAJ]
#### Záplata
- Oprava zavlečené chyby v názvu proměnné.

### [AA/AA-CHMU-NOTIF-ORP]
#### Záplata
- Oprava zavlečené chyby v názvu proměnné.

### [Knihovna/CISELNIK]
#### Změněno
- Přidána hodnota pro Českou republiku do seznamu kódů.

### [Knihovna/CHMU-NOTIF-KRAJ]
#### Záplata
- Skript vyžaduje knihovnu CHMU-CISELNIK.

### [Knihovna/CHMU-NOTIF-ORP]
#### Záplata
- Skript vyžaduje knihovnu CHMU-CISELNIK.

### [UVG/CHMU-EMAIL]
#### Změněno
- Přidána hodnota pro Českou republiku do seznamu kódů.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Přidána hodnota pro Českou republiku do seznamu kódů.

### [UVG/CHMU-NOTIF-KRAJ]
#### Přidáno
- Na základě požadavku MSK vytvořen nový skript pro notifikaci, zda v datech došlo ke změně nebo ne.

### [UVG/CHMU-SMS]
#### Změněno
- Přidána hodnota pro Českou republiku do seznamu kódů.

## verze 57 – 2019-07-08
### [AA/AA-CHMU-SMS-KRAJ]
#### Přidáno
- Na základě požadavku HZS Plzeňského kraje vytvořen parametr umožňující vypsat seznam ORP v krajské SMS.

### [Knihovna/CHMU-MAIL-2]
#### Změněno
- Úprava způsobu výstupu popisu jevu, ošetření nevyplněné povinné položky.

### [Knihovna/CHMU-PREPARE]
#### Změněno
- Úprava způsobu výstupu popisu jevu, ošetření nevyplněné povinné položky.

### [Knihovna/CHMU-SMS-KRAJ]
#### Přidáno
- Možnost vypsat seznam ORP v krajské SMS.

### [UVG/CHMU-EMAIL]
#### Změněno
- Úprava způsobu výstupu popisu jevu, ošetření nevyplněné povinné položky.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Úprava způsobu výstupu popisu jevu, ošetření nevyplněné povinné položky.

### [UVG/CHMU-SMS]
#### Přidáno
- Možnost vypsat seznam ORP v krajské SMS.

## verze 56 – 2019-07-02
### [AA/AA-CHMU-MAIL-2]
#### Přidáno
- Na základě pořadavku KÚ Stč. kraje vytvořen parametr umožňující vypnout slučování území.

### [Knihovna/CHMU-MAIL-2]
#### Přidáno
- Možnost vypnout slučování území.

### [UVG/CHMU-MAIL-2]
#### Přidáno
- Možnost vypnout slučování území.

## verze 55 – 2019-07-02
### [Knihovna/CHMU-SMS-KRAJ]
#### Změněno
- Oprava kontroly duplicity zpráv.

### [Knihovna/CHMU-SMS-ORP]
#### Změněno
- Oprava kontroly duplicity zpráv.

### [UVG/CHMU-SMS]
#### Změněno
- Oprava kontroly duplicity zpráv.

## verze 54 – 2019-07-01
### [Knihovna/CHMU-MAIL-2]
#### Změněno
- Úprava způsobu řazení jevů, výskyt jevu přednostně.

### [Knihovna/CHMU-PREPARE]
#### Změněno
- Úprava způsobu řazení jevů, výskyt jevu přednostně.

### [Knihovna/CHMU-SMS-KRAJ]
#### Změněno
- Úprava způsobu řazení jevů, výskyt jevu přednostně.

### [Knihovna/CHMU-SMS-ORP]
#### Změněno
- Úprava způsobu řazení jevů, výskyt jevu přednostně.

### [UVG/CHMU-EMAIL]
#### Změněno
- Úprava způsobu řazení jevů, výskyt jevu přednostně.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Úprava způsobu řazení jevů, výskyt jevu přednostně.

### [UVG/CHMU-SMS]
#### Změněno
- Úprava způsobu řazení jevů, výskyt jevu přednostně.

## verze 53 – 2019-06-30
### [Knihovna/CHMU-DATUMY]
#### Změněno
- Úprava způsobu formátování data.
- Ošetření pádu skriptu při jevu do odvolání.

### [Knihovna/CHMU-SMS-KRAJ]
#### Změněno
- Úprava způsobu formátování data.
- Ošetření pádu skriptu při jevu do odvolání.

### [Knihovna/CHMU-SMS-ORP]
#### Změněno
- Úprava způsobu formátování data.
- Ošetření pádu skriptu při jevu do odvolání.

### [UVG/CHMU-EMAIL]
#### Změněno
- Úprava způsobu formátování data.
- Ošetření pádu skriptu při jevu do odvolání.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Úprava způsobu formátování data.
- Ošetření pádu skriptu při jevu do odvolání.

### [UVG/CHMU-SMS]
#### Změněno
- Úprava způsobu formátování data.
- Ošetření pádu skriptu při jevu do odvolání.

## verze 52 – 2019-06-29
### [Knihovna/CHMU-MAIL-2]
#### Změněno
- Úprava způsobu řazení jevů, který způsoboval nesprávné porovnání změn.

### [Knihovna/CHMU-PREPARE]
#### Změněno
- Úprava způsobu řazení jevů, který způsoboval nesprávné porovnání změn.

### [Knihovna/CHMU-SMS-KRAJ]
#### Změněno
- Úprava způsobu řazení jevů, který způsoboval nesprávné porovnání změn.

### [Knihovna/CHMU-SMS-ORP]
#### Změněno
- Úprava způsobu řazení jevů, který způsoboval nesprávné porovnání změn.

### [UVG/CHMU-EMAIL]
#### Změněno
- Úprava způsobu řazení jevů, který způsoboval nesprávné porovnání změn.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Úprava způsobu řazení jevů, který způsoboval nesprávné porovnání změn.

### [UVG/CHMU-SMS]
#### Změněno
- Úprava způsobu řazení jevů, který způsoboval nesprávné porovnání změn.

## verze 51 – 2019-06-28
### [Knihovna/CHMU-PREPARE]
#### Záplata
- Oprava výpisu, skrytí tabulky pro zrušené jevy v případě, kdy je vypnuto zobrazování změn.

### [UVG/CHMU-EMAIL]
#### Záplata
- Oprava výpisu, skrytí tabulky pro zrušené jevy v případě, kdy je vypnuto zobrazování změn.

## verze 50 – 2019-06-27
### [AA/CHMU-NOTIF-KRAJ]
#### Přidáno
- Vytvořena automatická akce na notifikační SMS při odeslání mailu.

### [AA/CHMU-NOTIF-ORP]
#### Přidáno
- Vytvořena automatická akce na notifikační SMS při odeslání mailu.

### [Knihovna/CHMU-NOTIF-KRAJ]
#### Přidáno
- Vytvořen skript, jehož výsledkem je notifikační SMS při odeslání mailu.

### [Knihovna/CHMU-NOTIF-ORP]
#### Přidáno
- Vytvořen skript, jehož výsledkem je notifikační SMS při odeslání mailu.

### [Knihovna/CHMU-PREPARE]
#### Změněno
- Vždy dochází ke zjišťování změn, parametr *zobrazitZmeny* pouze určuje, zda budou změny viditelně vypsány.

### [UVG/CHMU-EMAIL]
#### Změněno
- Vždy dochází ke zjišťování změn, parametr *zobrazitZmeny* pouze určuje, zda budou změny viditelně vypsány.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Zjednodušení kódu pro výpis sestavy.

**Starší změny jsou uvedeny v [archivu změn](Archiv-Changelog.md)**