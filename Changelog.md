# Changelog
Popis změn v JavaScript předpisech informačního systému Výjezd 6 udržovaných generálním ředitelstvím.

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

## verze 23 – 2019-01-31
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

## verze 22 – 2019-01-25
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

**Starší změny jsou uvedeny v [archivu změn](Archiv-Changelog.md)**