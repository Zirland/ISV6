# JavaScript předpisy pro ISV6


## [CHMU-SMS]
Předpis pro vytvoření SMS zprávy s přehledem nebezpečných jevů ve výstraze ČHMÚ.

Jev "Výhled nebezpečných jevů" je z výstupu vyloučen.

Parametr **omezitNaKraj** obsahuje číselný kód území, pro který se mají zahrnout jevy. Je možno zadat pouze jeden kraj, případně celou Českou republiku. Číselník území je v parametru *KRAJE_NAZVY*

Parametr **detailni** může nabývat hodnot *0* nebo *1*. 

- Při hodnotě 0 je generována souhrnná sestava, která obsahuje pouze přehled názvů jevů platných pro zvolený kraj. V případě celostátní verze se za názvem jevu uvádí přehled krajů, ve kterých jev platí. Na konci souhrnné sestavy je generován rozsah platnosti celé výstrahy tj. začátek prvního jevu až konec posledního jevu.
- Při hodnotě 1 je generována podrobná sestava, která obsahuje názvy jevů platných pro zvolený kraj následované rozsahem platnosti tohoto jevu. Rozsah platnosti celé výstrahy se neuvádí.
- V celostátní sestavě je poskytován odkaz na stránku výstrahy ve formátu WOCZ59 OPIN na portálu ČHMÚ.

