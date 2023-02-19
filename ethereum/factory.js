import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    AdattaroloFactory.abi,
    '0x8464AEEdaF8f7F66c7810aB36186B40F83c59236'
);

export default instance;