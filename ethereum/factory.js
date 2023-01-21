import web3 from "./web3";
import AdattaroloFactory from './build/AdattaroloFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(AdattaroloFactory.interface),
    '0x597C964A91e9e392aCB8bafbb7d3ce516f6c8294'
);

export default instance;