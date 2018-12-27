
        switch (vystraha.ucel) {
            case 'Exercise' :
                uvod = 'Cvičná zpráva ČHMÚ: '; break;
            case 'System' :
                uvod = 'Systémová zpráva ČHMÚ: '; break;
            case 'Test' :
                uvod = 'Testovací zpráva ČHMÚ: '; break;
            default : 
                switch (rezim) {
                    case "HPPS" :
                        uvod = 'Výstraha HPPS: ';
                    break;
                    case "SIVS" :
                        uvod = 'Výstraha SIVS: ';
                    break;
                    case "SVRS" :
                        uvod = 'Výstraha SVRS: ';
                    break;
                }
        vystupText += uvod;