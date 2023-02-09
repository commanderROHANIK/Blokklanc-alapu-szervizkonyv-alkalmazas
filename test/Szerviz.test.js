const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/AdattaroloFactory.json");
const compiledSzerviz = require("../ethereum/build/Szerviz.json");

const originalCim = "cim";
const originalGPS = "gps";
const originalEmail = "email";
const originalNyitvatartas = "nyitvatartas";

let accounts;
let factory;
let szervizAddress;
let szerviz;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: "5000000" });

    await factory.methods.createSzerviz(originalCim, originalGPS, originalEmail, originalNyitvatartas).send({
        from: accounts[0],
        gas: "5000000",
    });

    [szervizAddress] = await factory.methods.getSzervizek().call();
    szerviz = await new web3.eth.Contract(compiledSzerviz.abi, szervizAddress);
});

describe("Service center", () => {
    it("deploys a factory and a service center", () => {
        assert.ok(factory.options.address);
        assert.ok(szerviz.options.address);
    });

    it("can modify address as manager", async () => {
        const cim = await szerviz.methods.Cim().call();
        const ujCim = "masikCim";

        await szerviz.methods.setCim(ujCim).send({from: accounts[0]});

        assert.notStrictEqual(
            await szerviz.methods.Cim().call(),
            cim);
        assert.strictEqual(
            await szerviz.methods.Cim().call(),
            ujCim);
    });

    it("only manager can change address", async () => {
        let msg = "";

        try {
            await szerviz.methods.setCim("asdf").send({from: accounts[1]});
        } catch (err) {
            msg = err.message;
        }

        assert.notEqual(msg, "");
    });

    it("can modify gps as manager", async () => {
        const gps = await szerviz.methods.GPS().call();
        const ujGps = "masikCim";

        await szerviz.methods.setGPS(ujGps).send({from: accounts[0]});

        assert.notStrictEqual(
            await szerviz.methods.GPS().call(),
            gps);
        assert.strictEqual(
            await szerviz.methods.GPS().call(),
            ujGps);
    });

    it("only manager can change gps", async () => {
        let msg = "";

        try {
            await szerviz.methods.setGPS("asdf").send({from: accounts[1]});
        } catch (err) {
            msg = err.message;
        }

        assert.notEqual(msg, "");
    });

    it("can modify email as manager", async () => {
        const email = await szerviz.methods.Email().call();
        const ujEmail = "masikCim";

        await szerviz.methods.setEmail(ujEmail).send({from: accounts[0]});

        assert.notStrictEqual(
            await szerviz.methods.Email().call(),
            email);
        assert.strictEqual(
            await szerviz.methods.Email().call(),
            ujEmail);
    });

    it("only manager can change email", async () => {
        let msg = "";

        try {
            await szerviz.methods.setEmail("asdf").send({from: accounts[1]});
        } catch (err) {
            msg = err.message;
        }

        assert.notEqual(msg, "");
    });

    it("can modify open hours as manager", async () => {
        const openHours = await szerviz.methods.Email().call();
        const ujOpenHours = "masikCim";

        await szerviz.methods.setNyitvatartas(ujOpenHours).send({from: accounts[0]});

        assert.notStrictEqual(
            await szerviz.methods.Nyitvatartas().call(),
            openHours);
        assert.strictEqual(
            await szerviz.methods.Nyitvatartas().call(),
            ujOpenHours);
    });

    it("only manager can change open hours", async () => {
        let msg = "";

        try {
            await szerviz.methods.setNyitvatartas("asdf").send({from: accounts[1]});
        } catch (err) {
            msg = err.message;
        }

        assert.notEqual(msg, "");
    });

    it("can get summary as manager", async () => {
        let msg = await szerviz.methods.getSummary().call();

        assert.strictEqual(msg[0], accounts[0]);
        assert.strictEqual(msg[1], originalCim);
        assert.strictEqual(msg[2], originalGPS);
        assert.strictEqual(msg[3], originalEmail);
        assert.strictEqual(msg[4], originalNyitvatartas);
    });
});
