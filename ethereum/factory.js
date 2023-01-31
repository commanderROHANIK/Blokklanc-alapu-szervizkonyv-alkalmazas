import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(AdattaroloFactory.interface),
    '0x77A23fba1d8f0E2461aede270B47330C24426A16'
);

export default instance;