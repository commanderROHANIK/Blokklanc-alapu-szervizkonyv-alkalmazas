import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(AdattaroloFactory.interface),
    '0x2089730b4E8a94E24BE7fc973B33726d4F24d6eA'
);

export default instance;