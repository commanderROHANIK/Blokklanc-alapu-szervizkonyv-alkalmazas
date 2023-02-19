const HDWalletProvider = require('@truffle/hdwallet-provider');
const Web3 = require('web3');
const adattaroloFactory = require('./build/AdattaroloFactory.json');

const provider = new HDWalletProvider(
    'smoke squeeze use raise pencil circle midnight super item custom impulse sure',
    // remember to change this to your own phrase!
    'https://goerli.infura.io/v3/8f4c49aaa2724e70b6668b6f273f6659'
    // remember to change this to your own endpoint!
);
const web3 = new Web3(provider);

const deploy = async () => {
    const accounts = await web3.eth.getAccounts();

    console.log("Attempting to deploy from account", accounts[0]);

    const result = await new web3.eth.Contract(adattaroloFactory.abi)
        .deploy({ data: adattaroloFactory.evm.bytecode.object })
        .send({ gas: "5000000", from: accounts[0] });

    console.log("Contract deployed to", result.options.address);
    provider.engine.stop();
};
deploy();