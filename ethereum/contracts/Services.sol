pragma solidity ^0.8.9;

contract AdattaroloFactory {
    address payable[] public szervizek;
    address payable[] public jarmuvek;

    function createSzerviz(string memory cim, string memory gps, string memory email, string memory nyitvatartas) public {
        address newSzerviz = address(new Szerviz(msg.sender, cim, gps, email, nyitvatartas));
        szervizek.push(payable(newSzerviz));
    }

    function createJarmu(string memory azonosito, string memory ujGyarto, uint evjarat, string memory uzemanyag) public {
        address newJarmu = address(new Jarmu(msg.sender, azonosito, ujGyarto, evjarat, uzemanyag));
        jarmuvek.push(payable(newJarmu));
    }

    function getSzervizek() public view returns (address payable[] memory) {
        return szervizek;
    }

    function getJarmuvek() public view returns (address payable[] memory) {
        return jarmuvek;
    }
}

contract Szerviz {
    struct Alkalmazott {
        address Azonosito;
        string Nev;
    }

    address public Manager;
    string public Cim;
    string public GPS;
    string public Email;
    string public Nyitvatartas;
    Alkalmazott[] public Alkalmazottak;
    uint public AlkalmazottCount;

    constructor (address creator, string memory cim, string memory gps, string memory email, string memory nyitvatartas){
        Manager = creator;
        Cim = cim;
        GPS = gps;
        Email = email;
        Nyitvatartas = nyitvatartas;
        AlkalmazottCount = 0;
    }

    modifier restricted() {
        require(msg.sender == Manager);
        _;
    }

    function addEmploye(address azonosito, string memory nev) public restricted {
        Alkalmazott memory alkalmazott = Alkalmazott({
        Azonosito : azonosito,
        Nev : nev
        });

        Alkalmazottak.push(alkalmazott);
        AlkalmazottCount++;
    }

    function removeEmploye(uint index) public restricted {
        Alkalmazottak[index] = Alkalmazottak[AlkalmazottCount - 1];
        Alkalmazottak.pop();
        AlkalmazottCount--;
    }

    function setCim(string memory ujCim) public restricted {
        Cim = ujCim;
    }

    function setGPS(string memory ujGPS) public restricted {
        GPS = ujGPS;
    }

    function setEmail(string memory ujEmail) public restricted {
        Email = ujEmail;
    }

    function setNyitvatartas(string memory ujNyitvatartas) public restricted {
        Nyitvatartas = ujNyitvatartas;
    }

    function getSummary() public view returns (address, string memory, string memory, string memory, string memory, uint) {
        return (
        Manager,
        Cim,
        GPS,
        Email,
        Nyitvatartas,
        AlkalmazottCount
        );
    }
}

contract Jarmu {
    struct SzervizEsemeny {
        address SzervizId;
        uint KilommeterOraAllas;
        uint Datum;
        string Alkatreszek;
        uint Vegosszeg;
    }

    string public Id;
    string public Gyarto;
    uint public Evjarat;
    string public Uzemanyag;
    address public Tulajdonos;
    SzervizEsemeny[] public Szervizesemenyek;
    uint public SzervizesemenyCount;
    uint public GarancialisKilometerek;
    uint public GarancialisEvek;
    uint public HosszabitasCounter;
    bool private Jogosult;

    modifier restricted() {
        require(msg.sender == Tulajdonos);
        _;
    }

    constructor (address owner, string memory azonosito, string memory ujGyarto, uint evjarat, string memory uzemanyag) {
        Tulajdonos = owner;
        Id = azonosito;
        Gyarto = ujGyarto;
        Evjarat = evjarat;
        Uzemanyag = uzemanyag;
        SzervizesemenyCount = 0;
        GarancialisKilometerek = 30000;
        GarancialisEvek = block.timestamp + 365 days;
        HosszabitasCounter = 0;
        Jogosult = true;
    }

    function addSzervizesemeny(address szervizId, uint kilommeterOraAllas, uint datum, string memory alkatreszek, uint vegosszeg) public {
        SzervizEsemeny memory szervizEsemeny = SzervizEsemeny({
        SzervizId : szervizId,
        KilommeterOraAllas : kilommeterOraAllas,
        Datum : datum,
        Alkatreszek: alkatreszek,
        Vegosszeg : vegosszeg
        });

        if (datum < GarancialisEvek && kilommeterOraAllas < GarancialisKilometerek && HosszabitasCounter < 6 && Jogosult) {
            GarancialisEvek = GarancialisEvek + 365 days;
            GarancialisKilometerek = GarancialisKilometerek + 30000;
            HosszabitasCounter++;
        } else {
            GarancialisKilometerek = 0;
            GarancialisEvek = 0;
            Jogosult = false;
        }

        Szervizesemenyek.push(szervizEsemeny);
        SzervizesemenyCount++;
    }

    function setGyarto(string memory ujGyarto) public restricted {
        Gyarto = ujGyarto;
    }

    function setEvjarat(uint ujEvjarat) public restricted {
        Evjarat = ujEvjarat;
    }

    function setUzemanyag(string memory ujUzemanyag) public restricted {
        Uzemanyag = ujUzemanyag;
    }

    function setTulajdonos(address ujTulajdonos) public restricted {
        Tulajdonos = ujTulajdonos;
    }

    function getSummary() public view returns (string memory, string memory, uint, string memory, address, uint, uint, uint) {
        return (
        Id,
        Gyarto,
        Evjarat,
        Uzemanyag,
        Tulajdonos,
        SzervizesemenyCount,
        GarancialisKilometerek,
        GarancialisEvek
        );
    }
}