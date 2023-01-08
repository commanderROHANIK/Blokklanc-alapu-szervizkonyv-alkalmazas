pragma solidity ^0.4.17;

contract AdattaroloFactory {
    address[] public szervizek;
    address[] public jarmuvek;
    address[] public szervizEsemenyek;

    function createSzerviz() public {
        address newSzerviz = new Szerviz(msg.sender);
        szervizek.push(newSzerviz);
    }

    function createJarmu(string azonosito) public {
        address newJarmu = new Jarmu(msg.sender, azonosito);
        jarmuvek.push(newJarmu);
    }

    function createSzervizEsemeny(uint jarmuAzon, uint szervizAzon, uint vegosszeg) public {
        address newSzervizEsemeny = new SzervizEsemeny(jarmuAzon, szervizAzon, vegosszeg);
        szervizEsemenyek.push(newSzervizEsemeny);
    }

    function getSzervizek() public view returns (address[]) {
        return szervizek;
    }

    function getJarmuvek() public view returns (address[]) {
        return jarmuvek;
    }

    function getSzervizEsemenyek() public view returns (address[]) {
        return szervizEsemenyek;
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
}

contract Jarmu {
    string public Id;
    string public Gyarto;
    uint public Evjarat;
    string public Uzemanyag;
    address public Tulajdonos;

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
}

contract SzervizEsemeny {
    uint public JarmuId;
    uint public SzervizId;
    uint public Osszeg;

    function SzervizEsemeny(uint jarmuAzon, uint szervizAzon, uint vegosszeg) public {
        JarmuId = jarmuAzon;
        SzervizId = szervizAzon;
        Osszeg = vegosszeg;
    }
}