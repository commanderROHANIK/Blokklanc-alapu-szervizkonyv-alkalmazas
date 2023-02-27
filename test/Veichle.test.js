const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/AdattaroloFactory.json");
const compiledVeichle = require("../ethereum/build/Jarmu.json");

const originalAzonosito = "azonosito";
const originalGyarto = "gyarto";
const originalEvjarat = 2023;
const originalUzemanyag = "uzemanyag";
const originalLogCount = 0;
const originalWarrantyKm = 30000;

let accounts;
let factory;
let jarmuAddress;
let jarmu;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: "5000000" });

    await factory.methods.createJarmu(originalAzonosito, originalGyarto, originalEvjarat, originalUzemanyag).send({
        from: accounts[0],
        gas: "5000000",
    });

    [jarmuAddress] = await factory.methods.getJarmuvek().call();
    jarmu = await new web3.eth.Contract(compiledVeichle.abi, jarmuAddress);
});

describe("Veichle", () => {
    it("deploys a factory and a veichle", () => {
        assert.ok(factory.options.address);
        assert.ok(jarmu.options.address);
    });

    it("setGyarto", async () => {
        const gyarto = await jarmu.methods.Gyarto().call();
        const ujGyarto = "masikGyarto";

        await jarmu.methods.setGyarto(ujGyarto).send({from: accounts[0]});

        assert.notStrictEqual(
            await jarmu.methods.Gyarto().call(),
            gyarto);
        assert.strictEqual(
            await jarmu.methods.Gyarto().call(),
            ujGyarto);
    });

    it("setGyarto manager", async () => {
        let msg = "";

        try {
            await jarmu.methods.setGyarto("asdf").send({from: accounts[1]});
        } catch (err) {
            msg = err.message;
        }

        assert.notEqual(msg, "");
    });

    it("setEvjarat", async () => {
        const evjarat = await jarmu.methods.Evjarat().call();
        const ujEvjarat = 2020;

        await jarmu.methods.setEvjarat(ujEvjarat).send({from: accounts[0]});

        assert.notStrictEqual(
            await jarmu.methods.Evjarat().call(),
            evjarat);
        assert.strictEqual(
            parseInt(await jarmu.methods.Evjarat().call()),
            ujEvjarat);
    });

    it("setEvjarat manager", async () => {
        let msg = "";

        try {
            await jarmu.methods.setEvjarat(2020).send({from: accounts[1]});
        } catch (err) {
            msg = err.message;
        }

        assert.notEqual(msg, "");
    });

    it("setUzemanyag", async () => {
        const uzemanyag = await jarmu.methods.Uzemanyag().call();
        const ujUzemanyag = "masikGyarto";

        await jarmu.methods.setUzemanyag(ujUzemanyag).send({from: accounts[0]});

        assert.notStrictEqual(
            await jarmu.methods.Uzemanyag().call(),
            uzemanyag);
        assert.strictEqual(
            await jarmu.methods.Uzemanyag().call(),
            ujUzemanyag);
    });

    it("setUzemanyag manager", async () => {
        let msg = "";

        try {
            await jarmu.methods.setUzemanyag("asdf").send({from: accounts[1]});
        } catch (err) {
            msg = err.message;
        }

        assert.notEqual(msg, "");
    });

    it("setTulajdonos", async () => {
        const tulajdonos = await jarmu.methods.Tulajdonos().call();
        const ujTulajdonso = accounts[2];

        await jarmu.methods.setTulajdonos(ujTulajdonso).send({from: accounts[0]});

        assert.notStrictEqual(
            await jarmu.methods.Tulajdonos().call(),
            tulajdonos);
        assert.strictEqual(
            await jarmu.methods.Tulajdonos().call(),
            ujTulajdonso);
    });

    it("setTulajdonos manager", async () => {
        let msg = "";

        try {
            await jarmu.methods.setTulajdonos(accounts[1]).send({from: accounts[1]});
        } catch (err) {
            msg = err.message;
        }

        assert.notEqual(msg, "");
    });

    it("summary", async () => {
        let msg = await jarmu.methods.getSummary().call();

        assert.strictEqual(msg[0], originalAzonosito);
        assert.strictEqual(msg[1], originalGyarto);
        assert.strictEqual(parseInt(msg[2]), originalEvjarat);
        assert.strictEqual(msg[3], originalUzemanyag);
        assert.strictEqual(msg[4], accounts[0]);
        assert.strictEqual(parseInt(msg[5]), originalLogCount);
        assert.strictEqual(parseInt(msg[6]), originalWarrantyKm);
    });

    it("addSzervizEsemeny rossz ev rossz km", async () => {
        const originalCim = "cim";
        const originalGPS = "gps";
        const originalEmail = "email";
        const originalNyitvatartas = "nyitvatartas";

        let szervizAddress;

        await factory.methods.createSzerviz(originalCim, originalGPS, originalEmail, originalNyitvatartas).send({
            from: accounts[0],
            gas: "5000000",
        });

        [szervizAddress] = await factory.methods.getSzervizek().call();

        await jarmu.methods.addSzervizesemeny(szervizAddress, 2000000, 36254896, "asdf", 200).send({
            from: accounts[0],
            gasLimit: '6000000'
        });

        const summary = await jarmu.methods.getSummary().call();

        assert.strictEqual(parseInt(summary[5]), 1);
        assert.strictEqual(parseInt(summary[6]), 0);
        assert.strictEqual(parseInt(summary[7]), 0);
    });

    it("addSzervizEsemeny jo ev rossz km", async () => {
        const originalCim = "cim";
        const originalGPS = "gps";
        const originalEmail = "email";
        const originalNyitvatartas = "nyitvatartas";

        let szervizAddress;

        await factory.methods.createSzerviz(originalCim, originalGPS, originalEmail, originalNyitvatartas).send({
            from: accounts[0],
            gas: "5000000",
        });

        [szervizAddress] = await factory.methods.getSzervizek().call();

        await jarmu.methods.addSzervizesemeny(szervizAddress, 900000, Math.floor(Date.now()/1000), "asdf", 200).send({
            from: accounts[0],
            gasLimit: '6000000'
        });

        const summary = await jarmu.methods.getSummary().call();

        assert.strictEqual(parseInt(summary[5]), 1);
        assert.strictEqual(parseInt(summary[6]), 0);
        assert.strictEqual(parseInt(summary[7]), 0);
    });

    it("addSzervizEsemeny rossz ev jo km", async () => {
        const originalCim = "cim";
        const originalGPS = "gps";
        const originalEmail = "email";
        const originalNyitvatartas = "nyitvatartas";

        let szervizAddress;

        await factory.methods.createSzerviz(originalCim, originalGPS, originalEmail, originalNyitvatartas).send({
            from: accounts[0],
            gas: "5000000",
        });

        [szervizAddress] = await factory.methods.getSzervizek().call();

        let date = new Date();
        date.setDate(date.getDate() + 365);
        await jarmu.methods.addSzervizesemeny(szervizAddress, 200, Math.floor(date/1000), "asdf", 200).send({
            from: accounts[0],
            gasLimit: '6000000'
        });

        const summary = await jarmu.methods.getSummary().call();

        assert.strictEqual(parseInt(summary[5]), 1);
        assert.strictEqual(parseInt(summary[6]), 0);
        assert.strictEqual(parseInt(summary[7]), 0);
    });

    it("addSzervizEsemeny jo ev jo km", async () => {
        const originalCim = "cim";
        const originalGPS = "gps";
        const originalEmail = "email";
        const originalNyitvatartas = "nyitvatartas";

        let szervizAddress;

        await factory.methods.createSzerviz(originalCim, originalGPS, originalEmail, originalNyitvatartas).send({
            from: accounts[0],
            gas: "5000000",
        });

        [szervizAddress] = await factory.methods.getSzervizek().call();

        await jarmu.methods.addSzervizesemeny(szervizAddress, 200, Math.floor(Date.now()/1000), "asdf", 200).send({
            from: accounts[0],
            gasLimit: '6000000'
        });

        const summary = await jarmu.methods.getSummary().call();

        assert.strictEqual(parseInt(summary[5]), 1);
        assert.strictEqual(parseInt(summary[6]), 60000);
        assert.ok(parseInt(summary[7]));
    });
});
