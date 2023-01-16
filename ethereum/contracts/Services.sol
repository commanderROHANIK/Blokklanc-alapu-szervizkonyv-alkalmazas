pragma solidity ^0.4.17;

contract AdattaroloFactory {
    address[] public szervizek;
    address[] public jarmuvek;

    function createSzerviz() public {
        address newSzerviz = new Szerviz(msg.sender);
        szervizek.push(newSzerviz);
    }

    function createJarmu(string azonosito) public {
        address newJarmu = new Jarmu(msg.sender, azonosito);
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
        uint Vegosszeg;
    }

    string public Id;
    string public Gyarto;
    uint public Evjarat;
    string public Uzemanyag;
    address public Tulajdonos;
    SzervizEsemeny[] public Szervizesemenyek;


    function Jarmu(address owner, string azonosito) public {
        Tulajdonos = owner;
        Id = azonosito;
    }

    function setGyarto(string ujGyarto) public {
        Gyarto = ujGyarto;
    }

    function setEvjarat(uint ujEvjarat) public {
        Evjarat = ujEvjarat;
    }

    function setUzemanyag(string ujUzemanyag) public {
        Uzemanyag = ujUzemanyag;
    }

    function addSzervizesemeny(uint szervizId, uint osszeg) public {
        SzervizEsemeny memory szervizEsemeny = SzervizEsemeny({
        SzervizId: szervizId,
        Vegosszeg: osszeg
        });

        Szervizesemenyek.push(szervizEsemeny);
    }

    function getSummary() public view returns (string , string, uint, string, address, SzervizEsemeny[]) {
        return (
        Id,
        Gyarto,
        Evjarat,
        Uzemanyag,
        Tulajdonos,
        Szervizesemenyek
        );
    }
}