pragma solidity ^0.4.17;

contract AdattaroloFactory {
    address[] public szervizek;
    address[] public jarmuvek;

    function createSzerviz() public {
        address newSzerviz = new Szerviz(msg.sender);
        szervizek.push(newSzerviz);
    }

    function createJarmu(string azonosito, string ujGyarto, uint evjarat, string uzemanyag) public {
        address newJarmu = new Jarmu(msg.sender, azonosito, ujGyarto, evjarat, uzemanyag);
        jarmuvek.push(newJarmu);
    }

    function getSzervizek() public view returns (address[]) {
        return szervizek;
    }

    function getJarmuvek() public view returns (address[]) {
        return jarmuvek;
    }
}

contract Szerviz {
    address public Manager;
    string public Cim;

    function Szerviz(address creator) public {
        Manager = creator;
    }

    function setCim(string ujCim) public {
        Cim = ujCim;
    }

    function getSummary() public view returns (address, string) {
        return (
        Manager,
        Cim
        );
    }
}

contract Jarmu {
    struct SzervizEsemeny {
        uint SzervizId;
        uint KilommeterOraAllas;
        string Datum;
        uint Vegosszeg;
    }

    string public Id;
    string public Gyarto;
    uint public Evjarat;
    string public Uzemanyag;
    address public Tulajdonos;
    SzervizEsemeny[] public Szervizesemenyek;
    uint public SzervizesemenyCount;


    function Jarmu(address owner, string azonosito, string ujGyarto, uint evjarat, string uzemanyag) public {
        Tulajdonos = owner;
        Id = azonosito;
        Gyarto = ujGyarto;
        Evjarat = evjarat;
        Uzemanyag = uzemanyag;
        SzervizesemenyCount = 0;
    }

    function addSzervizesemeny(uint szervizId, uint kilommeterOraAllas, string datum, uint vegosszeg) public {
        SzervizEsemeny memory szervizEsemeny = SzervizEsemeny({
        SzervizId: szervizId,
        KilommeterOraAllas: kilommeterOraAllas,
        Datum: datum,
        Vegosszeg: vegosszeg
        });

        Szervizesemenyek.push(szervizEsemeny);
        SzervizesemenyCount++;
    }

    function getSummary() public view returns (string , string, uint, string, address, uint) {
        return (
        Id,
        Gyarto,
        Evjarat,
        Uzemanyag,
        Tulajdonos,
        SzervizesemenyCount
        );
    }
}