pragma solidity ^0.4.17;

contract AdattaroloFactory {
    address[] public szervizek;
    address[] public jarmuvek;

    function createSzerviz(string cim, string gps, string email, string nyitvatartas) public {
        address newSzerviz = new Szerviz(msg.sender, cim, gps, email, nyitvatartas);
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
    string public GPS;
    string public Email;
    string public Nyitvatartas;

    function Szerviz(address creator, string cim, string gps, string email, string nyitvatartas) public {
        Manager = creator;
        Cim = cim;
        GPS = gps;
        Email = email;
        Nyitvatartas = nyitvatartas;
    }

    modifier restricted() {
        require(msg.sender == Manager);
        _;
    }

    function setCim(string ujCim) public restricted {
        Cim = ujCim;
    }

    function setGPS(string ujGPS) public restricted {
        GPS = ujGPS;
    }

    function setEmail(string ujEmail) public restricted {
        Email = ujEmail;
    }

    function setNyitvatartas(string ujNyitvatartas) public restricted {
        Nyitvatartas = ujNyitvatartas;
    }

    function getSummary() public view returns (address, string, string, string, string) {
        return (
            Manager,
            Cim,
            GPS,
            Email,
            Nyitvatartas
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
        SzervizId : szervizId,
        KilommeterOraAllas : kilommeterOraAllas,
        Datum : datum,
        Vegosszeg : vegosszeg
        });

        Szervizesemenyek.push(szervizEsemeny);
        SzervizesemenyCount++;
    }

    function getSummary() public view returns (string, string, uint, string, address, uint) {
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