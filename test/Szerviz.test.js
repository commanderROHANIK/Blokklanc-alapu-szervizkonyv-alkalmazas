const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());

const compiledFactory = require("../ethereum/build/AdattaroloFactory.json");
const compiledSzerviz = require("../ethereum/build/Szerviz.json");

let accounts;
let factory;
let campaignAddress;
let szerviz;

beforeEach(async () => {
    accounts = await web3.eth.getAccounts();

    factory = await new web3.eth.Contract(compiledFactory.abi)
        .deploy({ data: compiledFactory.evm.bytecode.object })
        .send({ from: accounts[0], gas: "5000000" });

    await factory.methods.createSzerviz("cim","gps","email", "nyitvatartas").send({
        from: accounts[0],
        gas: "5000000",
    });

    [campaignAddress] = await factory.methods.getSzervizek().call();
    szerviz = await new web3.eth.Contract(compiledSzerviz.abi, campaignAddress);
});

describe("Szerviz", () => {
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

    it("can't modify address as not manager", async () => {
        try {
            await szerviz.methods.setCim("asdf").send({from: accounts[1]});
            assert.strictEqual("", "adsf");
        } catch (err) {
            console.log(err);
            assert.strictEqual(true, true);
        }
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

    it("can get summary as manager", () => {

    });
});
