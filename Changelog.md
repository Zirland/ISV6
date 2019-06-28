# Changelog
Popis změn v JavaScript předpisech informačního systému Výjezd 6 udržovaných generálním ředitelstvím.

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

## verze 49 – 2019-06-24
### [Knihovna/CHMU-CISELNIK]
#### Změněno
- Změna kódů výskytů nebezpečných jevů z důvodu řazení na začátek.

### [Knihovna/CHMU-DATUMY]
#### Záplata
- Oprava zaokrouhlování platnosti jevů vydaných přesně v celou.

### [Knihovna/MAIL-2]
#### Přidáno
- Řazení jevů podle začátku platnosti a následně podle kódu jevu.

### [Knihovna/CHMU-PREPARE]
#### Přidáno
- Řazení jevů podle začátku platnosti a následně podle kódu jevu.

### [Knihovna/CHMU-SMS-KRAJ]
#### Přidáno
- Řazení jevů podle začátku platnosti a následně podle kódu jevu.

#### Záplata
- Syntaktická úprava kódu.

### [Knihovna/CHMU-SMS-ORP]
#### Přidáno
- Řazení jevů podle začátku platnosti a následně podle kódu jevu.

#### Záplata
- Syntaktická úprava kódu.

### [UVG/CHMU-EMAIL]
#### Přidáno
- Řazení jevů podle začátku platnosti a následně podle kódu jevu.

#### Změněno
- Změna kódů výskytů nebezpečných jevů z důvodu řazení na začátek.

### [UVG/MAIL-2]
#### Přidáno
- Řazení jevů podle začátku platnosti a následně podle kódu jevu.

#### Změněno
- Změna kódů výskytů nebezpečných jevů z důvodu řazení na začátek.

### [UVG/CHMU-SMS]
#### Přidáno
- Řazení jevů podle začátku platnosti a následně podle kódu jevu.

#### Změněno
- Změna kódů výskytů nebezpečných jevů z důvodu řazení na začátek.

#### Záplata
- Oprava zaokrouhlování platnosti jevů vydaných přesně v celou.
- Syntaktická úprava kódu.

## verze 48 – 2019-06-14
### [UVG/CHMU-MAIL-2]
#### Přidáno
- Vytvořen nový parametr umožňující vrácení prázdné sestavy v případě, kdy na sledovaném území nedojde ke změně.

## verze 47 – 2019-06-12
### [Knihovna/CHMU-PREPARE]
#### Změněno
- Vyjádření stupně nebezpečí v souladu se směrnicí ČHMÚ.

### [UVG/CHMU-EMAIL]
#### Změněno
- Vyjádření stupně nebezpečí v souladu se směrnicí ČHMÚ.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Vyjádření stupně nebezpečí v souladu se směrnicí ČHMÚ.

## verze 46 – 2019-06-10
### [Knihovna/CHMU-PREPARE]
#### Záplata
- Při zrušení všech jevů se v ORP sestavě zobrazí textová informace "Na zvoleném území není v platnosti žádný nebezpečný jev".

### [UVG/CHMU-EMAIL]
#### Záplata
- Při zrušení všech jevů se v ORP sestavě zobrazí textová informace "Na zvoleném území není v platnosti žádný nebezpečný jev".

## verze 45 – 2019-06-06
### [Knihovna/CHMU-DATUMY]
#### Přidáno
- Vytvoření nové funkce pro zaokrouhlení na nejbližší budoucí půlhodinu.

### [Knihovna/CHMU-SMS-KRAJ]
#### Změněno
- Změna způsobu porovnání změn, zohlednění posunutí začátku platnosti.

#### Záplata
- Oprava generování SMS pro kraje.

### [Knihovna/CHMU-SMS-ORP]
#### Změněno
- Změna způsobu porovnání změn, zohlednění posunutí začátku platnosti.

### [UVG/CHMU-SMS]
#### Přidáno
- Vytvoření nové funkce pro zaokrouhlení na nejbližší budoucí půlhodinu.

#### Změněno
- Změna způsobu porovnání změn, zohlednění posunutí začátku platnosti.

#### Záplata
- Oprava generování SMS pro GŘ.
- Oprava generování SMS pro kraje.

## verze 44 – 2019-06-05
### [Knihovna/CHMU-MAIL-2]
#### Změněno
- Úprava výpisu územních prvků pro celostátní sestavu.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Úprava výpisu územních prvků pro celostátní sestavu.

## verze 43 – 2019-05-29
### [Knihovna/CHMU-PREPARE]
#### Změněno
- Úprava načítání zrušených výstrah. (řeší SU 38519; autor: Stratil Petr, RCS Kladno)
- Při zrušení všech jevů se zobrazí textová informace "Na zvoleném území není v platnosti žádný nebezpečný jev".

### [UVG/CHMU-EMAIL]
#### Změněno
- Úprava načítání zrušených výstrah. (řeší SU 38519; autor: Stratil Petr, RCS Kladno)
- Při zrušení všech jevů se zobrazí textová informace "Na zvoleném území není v platnosti žádný nebezpečný jev".

## verze 42 – 2019-05-23
### [Knihovna/CHMU-EMAIL-KRAJ]
#### Změněno
- Formátování situace.

### [Knihovna/CHMU-EMAIL-ORP]
#### Změněno
- Formátování situace.

### [Knihovna/CHMU-MAIL-2]
#### Přidáno
- Nahrazení nesprávného pojmu "hasičská záchranná služba".

### [Knihovna/CHMU-PREPARE]
#### Přidáno
- Nahrazení nesprávného pojmu "hasičská záchranná služba".

### [UVG/CHMU-EMAIL]
#### Přidáno
- Nahrazení nesprávného pojmu "hasičská záchranná služba".

### [UVG/CHMU-MAIL-2]
#### Přidáno
- Nahrazení nesprávného pojmu "hasičská záchranná služba".

## verze 41 – 2019-05-22
### [Knihovna/CHMU-MAIL-2]
#### Změněno
- Formátování hydrologické informační zprávy.

### [Knihovna/CHMU-PREPARE]
#### Změněno
- Formátování hydrologické informační zprávy.

### [UVG/CHMU-EMAIL]
#### Změněno
- Formátování hydrologické informační zprávy.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Formátování hydrologické informační zprávy.

## verze 40 – 2019-05-22
### [Knihovna/CHMU-MAIL-2]
#### Změněno
- Změna formátování HTML tagů pro nový řádek.
- Formátování hydrologické informační zprávy.

### [Knihovna/CHMU-PREPARE]
#### Změněno
- Oprava porovnávání změn. (řeší SU 38470; autor: Stratil Petr, RCS Kladno)
- Změna formátování HTML tagů pro nový řádek.
- Formátování hydrologické informační zprávy.

### [UVG/CHMU-EMAIL]
#### Změněno
- Oprava porovnávání změn. (řeší SU 38470; autor: Stratil Petr, RCS Kladno)
- Změna formátování HTML tagů pro nový řádek.
- Formátování hydrologické informační zprávy.

### [UVG/CHMU-MAIL-2]
#### Změněno
- Změna formátování HTML tagů pro nový řádek.
- Formátování hydrologické informační zprávy.

**Starší změny jsou uvedeny v [archivu změn](Archiv-Changelog.md)**