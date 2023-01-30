import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(AdattaroloFactory.interface),
    '0x1ecF1a0dda89b4De1a54DE7cc6c34AEbbc1be3ee'
);

export default instance;